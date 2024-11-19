const johnSelectorBtn = document.querySelector('#john-selector');
const aliceSelectorBtn = document.querySelector('#alice-selector');
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('#chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

let messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'John'? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
    </div>
`;
window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
})
}

let messageSender = 'John';
const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.textContent = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`

    if (name === 'John') {
        johnSelectorBtn.classList.add('active-person')
        aliceSelectorBtn.classList.remove('active-person')
    }
    if (name === 'Alice') {
        aliceSelectorBtn.classList.add('active-person')
        johnSelectorBtn.classList.remove('active-person')   
    }
    chatInput.focus()
}
johnSelectorBtn.onclick = () => updateMessageSender('John')
aliceSelectorBtn.onclick = () => updateMessageSender('Alice')

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})

    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))
    chatMessages.innerHTML += createChatMessageElement(message);
    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () =>{
    localStorage.clear()
    chatMessages.innerHTML = ''
    messages = []
})