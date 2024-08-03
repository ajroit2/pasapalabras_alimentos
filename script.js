const questions = [
    {"letter": "A", "question": "Líquido esencial que debemos beber 8 vasos al día", "answers": ["Agua"]},
    {"letter": "B", "question": "Componentes fundamentales de los seres vivos como carbohidratos, proteínas y lípidos", "answers": ["Biomateriales"]},
    {"letter": "C", "question": "Nutrientes que proporcionan energía rápida al cuerpo, como el azúcar", "answers": ["Carbohidratos"]},
    {"letter": "D", "question": "Tipo de alimentación que incluye todos los nutrientes necesarios en las proporciones adecuadas", "answers": ["Dieta"]},
    {"letter": "E", "question": "Se mide en kilocalorías y la obtenemos de los alimentos", "answers": ["Energia"]},
    {"letter": "F", "question": "Grupo de alimentos que incluye manzanas, naranjas y plátanos", "answers": ["Frutas"]},
    {"letter": "G (contiente)", "question": "¿Que clase de alimentos son las lentejas? (en plural)", "answers": ["Legumbres"]},
    {"letter": "H", "question": "Compuestos orgánicos presentes en el pan y la pasta", "answers": ["Hidratos"]},
    {"letter": "I", "question": "Datos sobre el contenido nutricional que encontramos en los envases de alimentos", "answers": ["Informacion"]},
    {"letter": "K", "question": "Unidad en la que se mide la energía de los alimentos (abreviatura)", "answers": ["Kcal"]},
    {"letter": "L", "question": "Nutrientes que proporcionan más energía por gramo", "answers": ["Lipidos"]},
    {"letter": "M", "question": "Nutrientes inorgánicos necesarios en pequeñas cantidades, como el calcio o el hierro", "answers": ["Minerales"]},
    {"letter": "N", "question": "Proceso de obtener y utilizar los nutrientes de los alimentos", "answers": ["Nutricion"]},
    {"letter": "Ñ (contiene)", "question": "Etapa de la vida en la que los requerimientos nutricionales son muy altos", "answers": ["Niñez"]},
    {"letter": "O (contiene)", "question": "Nombre de la comida del mediodía", "answers": ["Almuerzo"]},
    {"letter": "P", "question": "Nutrientes esenciales para el crecimiento y reparación de tejidos", "answers": ["Proteinas"]},
    {"letter": "Q", "question": "Producto lácteo rico en calcio", "answers": ["Queso"]},
    {"letter": "R (contiene)", "question": "Cereal base de la alimentación en muchas culturas", "answers": ["Arroz"]},
    {"letter": "S", "question": "Mineral que se recomienda reducir en la dieta", "answers": ["Sal"]},
    {"letter": "T (contiene)", "question": "Materiales que nuestro organismo utiliza para realizar sus funciones, obtener energía, etc", "answers": ["Nutrientes"]},
    {"letter": "U (contiene)", "question": "Grupo de alimentos que incluye zanahorias, tomates y lechugas", "answers": ["Verduras"]},
    {"letter": "V", "question": "Nutrientes esenciales que el cuerpo necesita en pequeñas cantidades", "answers": ["Vitaminas"]},
    {"letter": "W (contiene)", "question": "Comida popular que se hace colocando alimentos entre dos panes", "answers": ["Sandwich"]},
    {"letter": "Y", "question": "Producto lácteo fermentado rico en probióticos", "answers": ["Yogurth", "Yogurt", "Yogur"]},
    {"letter": "Z", "question": "Verdura naranja rica en betacarotenos", "answers": ["Zanahoria"]}
];

let currentQuestionIndex = 0;
let score = 0;
let playerName = '';
let skippedQuestions = [];

const startButton = document.getElementById('start-button');
const playerNameInput = document.getElementById('player-name');
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const questionLetter = document.getElementById('question-letter');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const skipButton = document.getElementById('skip-button');
const scoreDisplay = document.getElementById('score');

startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', submitAnswer);
skipButton.addEventListener('click', skipQuestion);

function startGame() {
    playerName = playerNameInput.value;
    if (playerName.trim() === '') {
        alert('Por favor, ingresa tu nombre.');
        return;
    }
    welcomeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionLetter.textContent = `Letra ${question.letter}`;
        questionText.textContent = question.question;
    } else {
        endGame();
    }
}

// Función para normalizar cadenas, eliminando las tildes
function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function isAnswerCorrect(answer, correctAnswers) {
    const normalizedAnswer = normalizeString(answer);
    return correctAnswers.some(correctAnswer => normalizedAnswer === normalizeString(correctAnswer));
}

function submitAnswer() {
    const answer = answerInput.value.trim();
    const question = questions[currentQuestionIndex];

    if (isAnswerCorrect(answer, question.answers)) {
        alert('¡Correcto!');
        score++;
    } else {
        alert(`Incorrecto. Las respuestas correctas son: ${question.answers.join(', ')}`);
    }

    scoreDisplay.textContent = score;
    answerInput.value = '';
    currentQuestionIndex++;
    showQuestion();
}

function skipQuestion() {
    const question = questions[currentQuestionIndex];
    skippedQuestions.push(question);
    answerInput.value = '';
    currentQuestionIndex++;
    showQuestion();
}

function endGame() {
    if (skippedQuestions.length > 0) {
        alert('Vamos a repetir las preguntas que saltaste.');
        questions.length = 0;
        questions.push(...skippedQuestions);
        skippedQuestions = [];
        currentQuestionIndex = 0;
        showQuestion();
    } else {
        alert(`¡Juego terminado, ${playerName}! Sos un capo en temas de alimentación, con un puntaje final de: ${score} `);
        location.reload();
    }
}
