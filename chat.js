// Base de conocimiento sobre la agencia de viajes
const travelKnowledge = {
    'mision': {
        info: 'En Viajes Gustov, nos dedicamos a crear experiencias de viaje memorables que conecten a las personas con el mundo y entre sí.',
    },
    'vision': {
        info: 'Ser la agencia de viajes líder en experiencias de aventura únicas y sostenibles, reconocida por nuestra excelencia en atención al cliente.',
    },
    'valores': {
        info: 'Nos centramos en la satisfacción del cliente, promovemos la sostenibilidad y valoramos el respeto y la diversidad.',
    },
    'servicios premium': {
        info: 'Ofrecemos servicios premium como Gustov Gold, bienestar personal, experiencias gastronómicas y traslados de lujo.',
    },
    'ofertas relampago': {
        info: 'Aprovecha nuestras ofertas relámpago, incluyendo paquetes todo incluido a destinos como París, Cancún y Dubái.',
    },
    'articulos': {
        info: 'Consulta nuestros artículos sobre destinos, consejos de viaje y tendencias en turismo. ¡Siempre hay algo nuevo que aprender!',
    },
    'salidas': {
        info: 'Ofrecemos salidas programadas a destinos populares. Puedes consultar nuestro sitio web para más detalles sobre fechas y precios.',
    },
    'tours': {
        info: 'Disponemos de una variedad de tours locales que te permitirán explorar y disfrutar de cada destino de manera única y emocionante.',
    },
    'alojamiento': {
        info: 'Ofrecemos opciones de alojamiento en hoteles de lujo y resorts, adaptándonos a tus necesidades y presupuesto.',
    },
    'contacto': {
        info: 'Puedes contactarnos al teléfono 322-768-6636 o por email a info@salidasgustov.com. Estamos aquí para ayudarte.'
    }
};

// Respuestas generales
const generalResponses = {
    saludo: [
        "¡Hola! Bienvenido a Viajes Gustov. ¿En qué puedo ayudarte hoy?",
        "¡Saludos! Estoy aquí para asistirte con información sobre nuestros servicios de viaje. ¿Qué necesitas saber?"
    ],
    despedida: [
        "¡Gracias por contactarnos! Si tienes más preguntas, aquí estaré para ayudarte.",
        "Ha sido un placer asistirte. ¡Vuelve pronto si necesitas más información!"
    ],
    noEntiendo: [
        "Lo siento, no entendí tu pregunta. ¿Podrías reformularla? Estoy aquí para ayudarte con información sobre nuestros servicios.",
        "Disculpa, no comprendí completamente. ¿Podrías preguntar de otra manera? Puedo ayudarte con información sobre viajes."
    ]
};

// Función para procesar la entrada del usuario y generar una respuesta
function processUserInput(userInput) {
    const input = userInput.toLowerCase();
    
    // Verificar saludos
    if (input.match(/hola|buenos días|buenas tardes|buenas noches|saludos/)) {
        return getRandomResponse(generalResponses.saludo);
    }
    
    // Verificar despedidas
    if (input.match(/adiós|hasta luego|chao|gracias|bye/)) {
        return getRandomResponse(generalResponses.despedida);
    }
    
    // Buscar información de la agencia
    for (const key in travelKnowledge) {
        if (input.includes(key)) {
            return travelKnowledge[key].info;
        }
    }
    
    // Respuesta general si no se identifica ninguna intención específica
    return getRandomResponse(generalResponses.noEntiendo);
}

// Función para obtener una respuesta aleatoria de un array
function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Funciones para el funcionamiento del chatbot en la interfaz
function toggleChat() {
    const chatContainer = document.getElementById('chat');
    chatContainer.classList.toggle('chat-open');
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    
    if (userInput.value.trim() === '') return;
    
    // Agregar mensaje del usuario al chat
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput.value;
    chatBox.appendChild(userMessage);
    
    // Procesar la entrada y obtener respuesta
    const botResponse = processUserInput(userInput.value);
    
    // Simular tiempo de respuesta del bot
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = botResponse;
        chatBox.appendChild(botMessage);
        
        // Scroll al final del chat
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
    
    // Limpiar input y enfocar
    userInput.value = '';
    userInput.focus();
}

// Permitir enviar mensaje con Enter
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Estilos CSS para el chatbot
const chatbotStyles = `
.chat-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color:hsl(242, 100.00%, 50.00%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: transform 0.3s, background-color 0.3s;
}

.chat-toggle-btn:hover {
    transform: scale(1.1);
}

.chat-container {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 450px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 999;
    transform: scale(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
    max-height: 80vh;
}

.chat-container.chat-open {
    transform: scale(1);
}

.chat-header {
    background-color: #00aaff;
    color: white;
    padding: 15px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.chat-box {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background-color: #f5f5f5;
}

.chat-input-container {
    display: flex;
    padding: 10px;
    border-top: 1px solid #e0e0e0;
    background-color: white;
}

.chat-input-container input {
    flex: 1;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    margin-right: 10px;
    outline: none;
}

.chat-input-container button {
    background-color: #00aaff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.chat-input-container button:hover {
    background-color: #333333;
}

.user-message, .bot-message {
    margin-bottom: 15px;
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 80%;
    word-wrap: break-word;
}

.user-message {
    background-color: #000000;
    color: white;
    margin-left: auto;
    border-bottom-right-radius: 5px;
}

.bot-message {
    background-color: white;
    border: 1px solid #e0e0e0;
    margin-right: auto;
    border-bottom-left-radius: 5px;
}
`;

// Agregar estilos de chatbot al documento
const chatStyleSheet = document.createElement("style");
chatStyleSheet.type = "text/css";
chatStyleSheet.innerText = chatbotStyles;
document.head.appendChild(chatStyleSheet);

// Inicializar el chatbot al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    // Ya existe el HTML del chatbot en la página original
});
