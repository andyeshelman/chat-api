from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = "gate gate paragate parasamgate bodhi svaha"

socketio = SocketIO(app)

users = {}
messages = []

@socketio.on('login')
def handle_connect(new_user):
    emit('welcome', {'users': [*users.values()], 'messages': messages})
    users.update({request.sid: new_user})
    emit('addUser', new_user, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    users.pop(request.sid)
    emit('updateUsers', [*users.values()], broadcast=True)

@socketio.on('newMessage')
def handle_new_message(new_message):
    messages.append(new_message)
    emit('addMessage', new_message, broadcast=True)

@app.route('/')
def index():
    return render_template('index.html')