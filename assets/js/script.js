// Global variable
let timeLeft = 30;
let score = 0;


// Quiz questions
let questions = [
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

let questionIndex = questions.length - 1;

// Start the game
const startQuiz = () => {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('question-screen').classList.remove('hidden');
  document.getElementById('off-btn').classList.remove('hidden');
  // Start the timer
  const intervalID = setInterval(function () {
    // Call the function that update the displayed time
    updateTimer();
    // When the interval reach zero call the function that ends the game and pass as parameter the id of the interval
    if (timeLeft === 0) {
      endQuiz(intervalID);
    }

    timeLeft--;
  }, 1000);
  // Load the first question
  loadQuestion();
}

// Update the displayed time
const updateTimer = () => {
  document.getElementById('timer').textContent = `Timer: ${timeLeft}`;
}

const loadQuestion = () => {
  let question = document.getElementById('question-text');
  let choices = document.getElementById('choices');
  let currentQuestion = questions[questionIndex];

  question.textContent = currentQuestion.question;
  // Cleans the choice buttons in each interaction
  choices.innerHTML = '';

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choiceButton = document.createElement('button');
    choiceButton.textContent = currentQuestion.choices[i];
    choiceButton.classList.add('choice-button')
    choices.appendChild(choiceButton);
    choiceButton.addEventListener('click', checkAnswer);

  }
};

const checkAnswer = (event) => {
  let buttonAnswer = event.target.textContent;
  let correctAnswer = questions[questionIndex].choices[questions[questionIndex].correctAnswer];


  if (buttonAnswer === correctAnswer) {
    score++;
    
  } else {
    timeLeft = timeLeft - 5;
  }

  questionIndex--;

  if (questionIndex === -1) {
    endQuiz();
  } else {
    loadQuestion();
  }
}

const endQuiz = (intervalID) => {
  document.getElementById('question-screen').classList.add('hidden');
  document.getElementById('off-btn').classList.add('hidden');
  document.getElementById('game-over-screen').classList.remove('hidden');
  document.getElementById('final-score').textContent = score.toString();

  clearInterval(intervalID);
}

const renderScore = () => {
  let nameScore = JSON.parse(localStorage.getItem('nameScore'));

if (nameScore !== null) {
  document.getElementById('scores-name').textContent = `${nameScore.name} scored ${nameScore.score}`;
}
}

renderScore();

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('off-btn').addEventListener('click', endQuiz);
document.getElementById('score-form').addEventListener('submit', function (event) {
  event.preventDefault();

  let nameScore = {
    name: document.getElementById('name').value,
    score: score
  }
  console.log(nameScore.name, nameScore.score)
  localStorage.setItem('nameScore',  JSON.stringify(nameScore));

  console.log(name)
})