from playwright.sync_api import sync_playwright
import ollama_parse as op
import time
import re
from flask_socketio import emit
from ollama_parse import models as ollama_models_dict

def is_login_page(page_content):
    if "Log in with your Email" in page_content:
        return True
    return False

def scrape_title_and_text(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto(url)
            
            # Auto-scroll to load dynamic content
            last_height = page.evaluate('document.body.scrollHeight')
            while True:
                time.sleep(1)
                new_height = page.evaluate('document.body.scrollHeight')
                if new_height == last_height:
                    break
                last_height = new_height
                
            content = page.evaluate('document.body.innerText')

            if is_login_page(content):
                raise ValueError("This KB Article is not available for Public Access. Try uploading a PDF.")
            
            return page.title(), content
        except Exception as e:
            emit("error", {"error": f"Website cannot be scraped: {str(e)}"})
            return None, None
        finally:
            browser.close()

def parse(text):
    if not text:
        return None
    try:
        res = text.split("Try Now")[1].strip()
    except IndexError:
        res = text
    return res

def scrape_kb_id(text):
    if not text:
        return None
    
    match = re.search(r"KB-[0-9]*", text)
    if not match:
        return "KB-????"
    else:
        return match.group()

def generate(url, model_idx):
    title, text = scrape_title_and_text(url)

    if title is None:
        return

    parsed_text = parse(text)
    kb_id = scrape_kb_id(parsed_text)

    # Step 2 of protocol: return metadata for creating local storage on frontend
    emit("metadata", {"kb_id": kb_id, "title": title, "model": ollama_models_dict[model_idx]['display_name']})

    # Step 3 of protocol: stream back tokens as they are generated.
    script = op.generate(parsed_text, model_idx)
