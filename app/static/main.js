const socket = io()

const chatDisplay = document.getElementById('chatDisplay')
const chatForm = document.getElementById('chatForm')
const chatTitle = document.getElementById('chatTitle')
const header = document.getElementById('header')
const currentUsers = document.getElementById('currentUsers')
const messageArea = document.getElementById('messageArea')
const sendButton = document.getElementById('sendButton')

let username = null

function handleLogin(event) {
    event.preventDefault()
    username = event.target.elements.username.value
    socket.emit('login', username)
}

function handleSubmit(event) {
    event.preventDefault()
    body = event.target.elements.message.value
    socket.emit('newMessage', {username, body})
    chatForm.reset()
}

socket.on('welcome', data => {
    header.innerHTML = "<h3>Currently Online</h3>"
    chatTitle.innerText = `Posting as ${username}`
    messageArea.removeAttribute('disabled')
    sendButton.removeAttribute('disabled')
    data.users.forEach(user => {
        const newUser = document.createElement("div")
        newUser.className = 'list-group-item'
        newUser.innerText = user
        currentUsers.append(newUser)
    })
    data.messages.forEach(message => {
        const newMes = document.createElement("div")
        newMes.className = 'list-group-item'
        newMes.innerText = `${message.username}: ${message.body}`
        chatDisplay.append(newMes)
    })
})

socket.on('addUser', user => {
    if (username != null) {
        const newUser = document.createElement("div")
        newUser.className = 'list-group-item'
        newUser.innerText = user
        currentUsers.append(newUser)
    }
})

socket.on('updateUsers', users => {
    if (username != null) {
        currentUsers.innerHTML = ''
        users.forEach(user => {
            const newUser = document.createElement("div")
            newUser.className = 'list-group-item'
            newUser.innerText = user
            currentUsers.append(newUser)
        })
    }
})

socket.on('addMessage', message => {
    if (username != null) {
        const newMes = document.createElement("div")
        newMes.className = 'list-group-item'
        newMes.innerText = `${message.username}: ${message.body}`
        chatDisplay.append(newMes)
    }
})