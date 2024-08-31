// Define possible user inputs and corresponding bot responses
const responses = {
    "hi": ["Hello!", "Hi there!", "Hi, how are you?"],
    "how are you": ["I'm doing well, thanks for asking!", "I'm fine, how about you?"],
    "what's your name": ["My name is Chatbot.", "You can call me Chatbot."],
    "bye": ["Goodbye!", "Bye!", "See you later!"],
    "we have problem with roads": ['<a href="https://transport.karnataka.gov.in/" target="_blank">Road Transport Information</a>'],
    "i want to place a complaint": ['<a href="https://ksp.karnataka.gov.in/" target="_blank">Place a Complaint</a>'],
    "i want to know about labour department": ['<a href="https://labour.karnataka.gov.in/" target="_blank">Labour Department Info</a>'],
    "i want to get news about education department": ['<a href="https://primaryedu.karnataka.gov.in/" target="_blank">Education Department News</a>'],
    "i want transportation information of karnataka": ['<a href="https://transport.karnataka.gov.in/" target="_blank">Transportation Info</a>'],
    "i want to know about medical info of karnataka": ['<a href="https://dme.karnataka.gov.in/" target="_blank">Medical Information</a>'],
    "i want to know about agriculture information": ['<a href="https://raitamitra.karnataka.gov.in/" target="_blank">Agriculture Information</a>'],
    "i want to know about horticulture": ['<a href="https://horticulturedir.karnataka.gov.in/" target="_blank">Horticulture Information</a>'],
    "emergency": ["Call 112"],
    "more": ['<a href="https://karnataka.gov.in/department" target="_blank">More Information</a>'],
    "default": ["Sorry, I didn't understand that.", "Could you please rephrase that?", "I'm not sure I follow."]
};

// Function to add a message to the chat box
function addMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('p');
    messageElement.classList.add(sender);
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to add options buttons
function addOptions(options) {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.innerText = option;
        button.addEventListener('click', () => {
            handleUserInput(option);
        });
        optionsContainer.appendChild(button);
    });
}

// Function to handle user input
function handleUserInput(input) {
    addMessage('user', input);
    fetch('/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: input })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.response;
        addMessage('bot', botResponse[Math.floor(Math.random() * botResponse.length)]);
        if (input.toLowerCase() === 'bye') {
            addOptions([]);
        } else {
            addOptions(Object.keys(responses));
        }
    });
}

// Function to handle sending a message
function sendMessage() {
    const userInputElement = document.getElementById('user-input');
    const userInput = userInputElement.value.trim();
    if (userInput !== "") {
        handleUserInput(userInput);
        userInputElement.value = "";
    }
}

// Add event listener for the send button
document.getElementById('send-btn').addEventListener('click', sendMessage);

// Add event listener for pressing Enter in the input field
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Greet the user and show options when the page loads
window.onload = function() {
    addMessage('bot', "Hi, how can I help you today?");
    addOptions(Object.keys(responses));
};
