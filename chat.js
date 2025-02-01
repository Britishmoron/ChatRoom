const socket = io('https://your-public-signaling-server.com'); // Use a public signaling server

const chatWindow = document.getElementById('chatWindow');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let username;

sendButton.addEventListener('click', () => {
    if (!username) {
        username = usernameInput.value;
        if (!username) {
            alert('Please enter a username');
            return;
        }
    }

    const message = messageInput.value;
    if (message) {
        const messageData = {
            username,
            message
        };

        // Send message to the signaling server
        socket.emit('chat-message', messageData);
        messageInput.value = '';
    }
});

// Listen for incoming messages
socket.on('chat-message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<span class="username">${data.username}:</span> ${data.message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
