document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("menu1").addEventListener("click", function(event) {
        event.preventDefault();
        sendMessage("Opción 1");
    });

    document.getElementById("menu2").addEventListener("click", function(event) {
        event.preventDefault();
        sendMessage("Opción 2");
    });

    document.getElementById("message-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const messageInput = document.getElementById("message-input");
        const message = messageInput.value.trim();
        if (message !== "") {
            sendMessage(message);
            messageInput.value = "";
        }
    });
});

function sendMessage(message) {
    const chat = document.getElementById("chat");

    // Crear elemento para el mensaje del usuario
    const userMessageElement = document.createElement("div");
    userMessageElement.textContent = "Usuario: " + message;
    userMessageElement.classList.add("message-user"); // Agrega la clase para el mensaje del usuario
    chat.appendChild(userMessageElement);

    fetch('responses.json')
        .then(response => response.json())
        .then(data => {
            const response = data[message.toLowerCase()];
            if (response) {
                // Crear elemento para la respuesta del bot
                const botResponseElement = document.createElement("div");
                botResponseElement.textContent = "Bot: " + response;
                botResponseElement.classList.add("message-bot-response"); // Agrega la clase para la respuesta del bot
                chat.appendChild(botResponseElement);
            } else {
                // En caso de que no haya respuesta del bot
                const errorElement = document.createElement("div");
                errorElement.textContent = "Bot: Lo siento, no tengo una respuesta para eso.";
                errorElement.classList.add("message-bot-response"); // Agrega la clase para la respuesta del bot
                chat.appendChild(errorElement);
            }
        })
        .catch(error => {
            console.error('Error al obtener las respuestas:', error);
        });
}
