// Global variable
let timeLeft = 30;
let score = 0;
let intervalID;
let questionIndex = 0;

// Quiz questions
const questions = [
  {
    question: 'Which year was JavaScript first released?',
    choices: ['1996', '1995', '1991', '2001'],
    correctAnswer: 1
  },
  {
    question: 'What is the DOM?',
    choices: ['Document Online Model', 'Directory Of Models', 'Document Object Model', 'Direct Online Maker'],
    correctAnswer: 2
  },
  {
    question: 'Which method is used to add an element at the end of an array in JavaScript?',
    choices: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0
  },
  {
    question: 'What does the "JSON" acronym stand for in JavaScript?',
    choices: ['JavaScript Operator Numeric', 'JavaScript Output Name', 'JavaScript Option Navigator',
      'JavaScript Object Notation'],
    correctAnswer: 3
  },
  {
    question: 'What is the purpose of the "addEventListener" method in JavaScript?',
    choices: ['To add a new element to the DOM', 'To remove an element from the DOM',
      'To add an event handler function to an HTML element', 'To change the CSS styling of an element'],
    correctAnswer: 2
  }
];



// Start the game
const startQuiz = () => {
  timeLeft = 30;
  score = 0;
  questionIndex = 0;

  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('question-screen').classList.remove('hidden');
  document.getElementById('off-btn').classList.remove('hidden');

  // Start the timer
  intervalID = setInterval(updateTimer, 1000);

  // Load the first question
  loadQuestion();
};


// Update the displayed time
const updateTimer = () => {
  document.getElementById('timer').textContent = `Timer: ${timeLeft}`;
  timeLeft--;

  if (timeLeft < 0) {
    endQuiz();
  }
};

// Load the current question
const loadQuestion = () => {
  let currentQuestion = questions[questionIndex];
  document.getElementById('question-text').textContent = currentQuestion.question;

  let choicesContainer = document.getElementById('choices');
  choicesContainer.innerHTML = '';
  currentQuestion.choices.forEach((choice, index) => {
    let choiceButton = document.createElement('button');
    choiceButton.textContent = choice;
    choiceButton.classList.add('choice-button');
    choiceButton.onclick = () => checkAnswer(index);
    choicesContainer.appendChild(choiceButton);
  });
};

// Check if the selected answer is correct
const checkAnswer = (selectedAnswerIndex) => {
  let correctAnswerIndex = questions[questionIndex].correctAnswer;
  if (selectedAnswerIndex === correctAnswerIndex) {
    score++;
  } else {
    timeLeft -= 5;
  }

  questionIndex++;
  if (questionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
};

// End the quiz
const endQuiz = () => {
  clearInterval(intervalID);
  document.getElementById('question-screen').classList.add('hidden');
  document.getElementById('game-over-screen').classList.remove('hidden');
  document.getElementById('final-score').textContent = score;

/*  let playerName = prompt("Enter your name:", "Player");
  saveScore(playerName);*/
  renderScores();
};

// Save the score to local storage
const saveScore = (playerName) => {
  let savedScores = JSON.parse(localStorage.getItem('scores')) || [];
  if (savedScores.length >= 5) {
    savedScores.shift();
  }

  savedScores.push({ name: playerName, score: score });
  localStorage.setItem('scores', JSON.stringify(savedScores));
};

// Render the scores
const renderScores = () => {
  let scoresContainer = document.getElementById('scores-elements');
  scoresContainer.innerHTML = '';

  let savedScores = JSON.parse(localStorage.getItem('scores')) || [];
  savedScores.forEach((record) => {
    let scoreElement = document.createElement('p');
    scoreElement.textContent = `${record.name} scored ${record.score}`;
    scoresContainer.appendChild(scoreElement);
  });
};

// Quit button logic
document.getElementById('off-btn').addEventListener('click', () => {
  clearInterval(intervalID);
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('start-screen').classList.remove('hidden');
  // Reset variables
  timeLeft = 30;
  score = 0;
  questionIndex = 0;
});

// Start button logic
document.getElementById('start-btn').addEventListener('click', startQuiz);

// Save score button logic
document.getElementById('score-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let playerName = document.getElementById('name').value; // Get the player's name from the form
  saveScore(playerName); // Call saveScore with the player's name

  // Clear the form field and hide the game over screen after saving the score
  document.getElementById('name').value = '';
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('start-screen').classList.remove('hidden');
  document.getElementById('off-btn').classList.add('hidden');
  renderScores();
});

renderScores();