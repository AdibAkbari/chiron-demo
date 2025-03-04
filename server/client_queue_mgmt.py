# Internal queue functions
from flask_socketio import emit
from flask import current_app as app

# Client queue
# array of dict:
# {
#     sid: string,
# }
client_queue = []

def refresh_queue_to_all():
    global client_queue

    app.logger.debug("refresh_queue_to_all")
    app.logger.debug(client_queue)
    for i, client_state in enumerate(client_queue):
        sid = client_state["sid"]
        app.logger.debug(f"sending queue pos of {str(i + 1)} back to {sid}")
        emit("queue", {"queue_pos": i + 1}, to=sid)

def dequeue():
    global client_queue
    
    app.logger.debug("dequeue")
    app.logger.debug(client_queue)
    if len(client_queue) == 0:
        pass
    else:
        del client_queue[0]

    refresh_queue_to_all()