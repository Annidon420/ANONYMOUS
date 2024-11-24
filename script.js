const setUsernameContainer = document.getElementById('set-username');
const chatArea = document.getElementById('chat-area');
const chatBox = document.getElementById('chat-box');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const fileInput = document.getElementById('file-input');

// Store username and color
let username = '';
let userColor = '';

// Generate a random color
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Add a message to the chat
function addMessage(content, sender, color, isImage = false) {
  const message = document.createElement('div');
  message.classList.add('chat-message');
  message.style.backgroundColor = color || '#e4e6eb';

  if (sender) {
    message.innerHTML = `<strong>${sender}:</strong> `;
  }

  if (isImage) {
    const img = document.createElement('img');
    img.src = content;
    message.appendChild(img);
  } else {
    message.innerHTML += content;
  }

  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// Set username
document.getElementById('set-username-button').addEventListener('click', () => {
  username = usernameInput.value.trim();
  if (username) {
    userColor = getRandomColor();
    setUsernameContainer.classList.add('hidden');
    chatArea.classList.remove('hidden');
  }
});

// Send message
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    addMessage(message, username, userColor);
    messageInput.value = '';
  }
});

// Handle file upload
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      addMessage(e.target.result, username, userColor, true);
    };
    reader.readAsDataURL(file); // Convert file to Base64
  }
});
