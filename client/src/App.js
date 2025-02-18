import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Box } from '@mui/material';
import { HashRouter, Routes, Route } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import ScriptBox from "./pages/ScriptBox";
import themes from './Theme';
import NutanixBirds from "./nutanixBirds";
import InstructionPage from "./pages/InstructionPage";
import ErrorModal from './components/ErrorModal';
import Game from "./pages/Game";
import { addKBtoLocalStorage, getAllKBfromLocalStorage, editKBtoLocalStorage } from './utils/localStorage';

const VideoBackground = React.lazy(() => import("./components/VideoBackground"));

// Mock data for demo
const DEMO_MODELS = [
  { display_name: "Llama-3.1-8B-Instruct (FP16)", note: "Decent Quality | Fast"},
  { display_name: "Llama-3.3-70B-Instruct (FP16)", note: "High Quality | Slow"},
];

const DEMO_METADATA = {
  url: "https://portal.nutanix.com/page/documents/kbs/details?targetId=kA0320000004H2NCAU",
  title: "Example KB Article",
};

const DEMO_SCRIPT = `Hello! In this video, I'll show you how to use the cvm_shutdown script to safely shutdown or restart a Controller VM, also known as CVM, in your Nutanix environment.

...

This script is the recommended way to handle CVM shutdowns, as it properly signals HA and manages storage traffic, making it safer than using regular \`sudo shutdown\` or \`sudo reboot\` commands.

...

Let's go through the steps:

First, log into the CVM as the "nutanix" user.

...

The basic syntax of the command is:
\`\`\`
cvm_shutdown [OPTIONS] [TIME] [WALL MESSAGE]
\`\`\`

For most cases, you'll want to use the -P option for a clean power-off. The most common command is:
\`\`\`
nutanix@cvm$ cvm_shutdown -P now
\`\`\`

...

This will immediately initiate a clean shutdown of the CVM.

...

A few important things to note:

The script automatically puts the CVM into maintenance mode in AOS 5.17.1 and later versions.

If you're running AOS 5.20.1 or later, the script will check for proper HA routes before proceeding. If these routes aren't available, you may need to use the force_reboot option.

...

You can also schedule the shutdown for later using time formats like:
- "+m" for minutes from now
- "hh:mm" for a specific time

...

The system will notify logged-in users about the impending shutdown, and you can always cancel the scheduled shutdown using the -c option if needed.

That's all you need to know about using the cvm_shutdown script! Remember to always use this script instead of regular shutdown commands to ensure proper handling of your CVM operations.`;

// Function to simulate token streaming
const simulateTokenStreaming = (fullText, setText, onComplete) => {
  let currentIndex = 0;
  const streamInterval = 50; // Adjust this value to control streaming speed

  const streamNextToken = () => {
    if (currentIndex < fullText.length) {
      // Stream a few characters at a time to simulate token streaming
      const nextChunk = fullText.slice(currentIndex, currentIndex + 3);
      setText(prev => (prev || "") + nextChunk);
      currentIndex += 3;
      setTimeout(streamNextToken, streamInterval);
    } else {
      onComplete();
    }
  };

  streamNextToken();
};

function App() {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [demoWarningOpen, setDemoWarningOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [queuePos, setQueuePos] = useState(-1);
  const [brainRot, setBrainRot] = useState(false);
  const [theme, setTheme] = useState(themes.default);
  const [protState, setProtState] = useState(0);
  const [metadata, setMetadata] = useState(null);
  const [scriptText, setScriptText] = useState(null);
  const [editing, setEditing] = useState(false);
  const [models] = useState(DEMO_MODELS);

  useEffect(() => {
    setTheme(brainRot ? themes.brainrot : themes.default);
  }, [brainRot]);

  const metadataRef = useRef(metadata);
  useEffect(() => {
    metadataRef.current = metadata;
  }, [metadata]);

  const scriptTextRef = useRef(scriptText);
  useEffect(() => {
    scriptTextRef.current = scriptText;
  }, [scriptText]);

  const [savedKbs, setSavedKbs] = useState(getAllKBfromLocalStorage());
  const [selectedKB, setSelectedKB] = useState(null);
  const [selectedKBIndex, setSelectedKBIndex] = useState(null);
  
  const selectedKBIndexRef = useRef(selectedKBIndex);
  useEffect(() => {
    selectedKBIndexRef.current = selectedKBIndex;
  }, [selectedKBIndex]);

  const viewSavedKB = (idx, history = savedKbs) => {
    history[idx].resetCurrentIndex();
    setSelectedKB(history[idx]);
    setSelectedKBIndex(idx);
    setScriptText(history[idx].getCurrentData().data);
  };

  const nextHistItm = () => {
    selectedKB.goToNextData();
    setScriptText(selectedKB.getCurrentData().data);
  }

  const prevHistItm = () => {
    selectedKB.goToPreviousData();
    setScriptText(selectedKB.getCurrentData().data);
  }

  const editKB = () => {
    editKBtoLocalStorage(selectedKBIndexRef.current, scriptTextRef.current);
    const newKbs = getAllKBfromLocalStorage();
    setSavedKbs(newKbs);
    viewSavedKB(selectedKBIndexRef.current, newKbs);
  }

  const clearHistory = () => {
    localStorage.removeItem("KBs");
    setSavedKbs([]);
    setSelectedKB(null);
  }

  const initiateProtocol = (url, fileObj, modelIdx) => {
    setMetadata(null);
    setScriptText(null);
    setQueuePos(-1);

    // Simulate the protocol states with timeouts
    setTimeout(() => {
      setProtState(2); // WAITING_FOR_METADATA
    }, 1000);

    setTimeout(() => {
      setProtState(3); // METADATA_RECV
      setMetadata(DEMO_METADATA);
    }, 2000);

    setTimeout(() => {
      setProtState(4); // WAITING_FIRST_TOKEN
      setScriptText("");
    }, 2000);

    setTimeout(() => {
      setProtState(5); // WAITING_TOKENS
      // Start token streaming simulation
      simulateTokenStreaming(DEMO_SCRIPT, setScriptText, () => {
        setProtState(0); // IDLE
        addKBtoLocalStorage(DEMO_METADATA, DEMO_SCRIPT);
        const newKbs = getAllKBfromLocalStorage();
        setSavedKbs(newKbs);
        viewSavedKB(0, newKbs);
        setIsLoading(false);
      });
    }, 4000);
  };

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline />
          <Box sx={{ minHeight: '100vh', position: 'relative', backgroundColor: 'transparent' }}>
            <Navbar
              brainRot={brainRot}
              setBrainRot={setBrainRot}
              isLoading={isLoading}
              savedKbs={savedKbs}
              editing={editing}
              setMetadata={setMetadata}
              selectSavedKB={viewSavedKB}
              clearHistory={clearHistory}
            />

            {brainRot ? 
              <Suspense fallback={<div></div>}>
                <VideoBackground />
              </Suspense>
              : <NutanixBirds />
            }

            <Routes>
              <Route path="/" element={
                <MainPage
                  models={models}
                  brainRot={brainRot}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  initiateProtocol={initiateProtocol}
                  protState={protState}
                  queuePos={queuePos}
                />
              }/>
              <Route path="/result" element={
                <ScriptBox
                  brainRot={brainRot}
                  editing={editing}
                  setEditing={setEditing}
                  protState={protState}
                  metadata={metadata}
                  scriptText={scriptText}
                  setScriptText={setScriptText}
                  setIsLoading={setIsLoading}
                  nextHistItm={nextHistItm}
                  prevHistItm={prevHistItm}
                  nextHistAvail={selectedKB && selectedKB.currentIndex < selectedKB.data.length - 1}
                  prevHistAvail={selectedKB && selectedKB.currentIndex > 0}
                  editKB={editKB}
                />
              }/>
              <Route path="/game" element={<Game />} />
              <Route path="/instructions" element={<InstructionPage/>} />
            </Routes>
          </Box>
          <ErrorModal
            open={errorModalOpen}
            onClose={() => setErrorModalOpen(false)}
            message={errorMessage}
          />
          <ErrorModal
            open={demoWarningOpen}
            isWarning={true}
            onClose={() => setDemoWarningOpen(false)}
            message={`This is a DEMO version of the application. 
              
              It is not connected to any backend services because we cannot give the public access to the locally hosted LLMs.
              
              It uses simulated responses to demonstrate functionality and has a pre-filled example URL.`}
          />
        </>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;