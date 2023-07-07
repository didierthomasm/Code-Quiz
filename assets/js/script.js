// Quiz object
var quiz = {
  currentQuestionIndex: 0,
  timeLeft: 60,
  timerInterval: null,
  score: 0,
  questions: [
    {
      question: "What is the capital city of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0
    },
    {
      question: "Which year was JavaScript first released?",
      choices: ["1996", "1995", "2001", "2005"],
      correctAnswer: 1
    },
    // Add more questions...
  ],
  startQuiz: function () {
    // Hide the start screen and show the question screen
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("question-screen").classList.remove("hidden");
    // Start the timer
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();
      if (this.timeLeft <= 0) {
        this.endQuiz();
      }
    }, 1000);
    // Load the first question
    this.loadQuestion();
  },
  loadQuestion: function () {
    var questionTextElement = document.getElementById("question-text");
    var choicesElement = document.getElementById("choices");
    var currentQuestion = this.questions[this.currentQuestionIndex];
    questionTextElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    // Create choice buttons for each option
    currentQuestion.choices.forEach((choice, index) => {
      var choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", this.checkAnswer.bind(this));
      choicesElement.appendChild(choiceButton);
    });
  },
  checkAnswer: function (event) {
    var selectedAnswer = event.target.textContent;
    var currentQuestion = this.questions[this.currentQuestionIndex];
    if (selectedAnswer === currentQuestion.choices[currentQuestion.correctAnswer]) {
      // Correct answer
      this.score++;
    } else {
      // Incorrect answer
      this.timeLeft -= 10; // Deduct 10 seconds for incorrect answer
      this.updateTimer();
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === this.questions.length) {
      // End the quiz if all questions are answered
      this.endQuiz();
    } else {
      // Load the next question
      this.loadQuestion();
    }
  },
  endQuiz: function () {
    clearInterval(this.timerInterval);
    this.updateTimer();
    // Hide the question screen and show the game over screen
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("game-over-screen").classList.remove("hidden");
    // Display the final score
    document.getElementById("final-score").textContent = this.score.toString();
  },
  updateTimer: function () {
    document.getElementById("timer").textContent = "Time: " + this.timeLeft;
  }
};
// Event listener for starting the quiz
document.getElementById("start-btn").addEventListener("click", quiz.startQuiz.bind(quiz));
// Event listener for saving the score
document.getElementById("score-form").addEventListener("submit", function (event) {
  event.preventDefault();
  var initials = document.getElementById("initials").value;
  // Save the initials and score to localStorage or a backend server
});