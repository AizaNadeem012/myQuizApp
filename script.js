const question = [
  {
    question: "console.log(typeof null)?",
    answers: [
      { text: "object", correct: true },
      { text: "undefined", correct: false },
      { text: "string", correct: false },
      { text: "null", correct: false },
    ],
  },
  {
    question:
      "Which object in JavaScript contains information about the browser?",
    answers: [
      { text: "window", correct: false },
      { text: "navigator", correct: true },
      { text: "document", correct: false },
      { text: "screen", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a valid JavaScript data type?",
    answers: [
      { text: "Number", correct: false },
      { text: "Boolean", correct: false },
      { text: "Character", correct: true },
      { text: "Object", correct: false },
    ],
  },
  {
    question: "What is the purpose of the isNaN() function in JavaScript?",
    answers: [
      { text: "To check if a value is null", correct: false },
      { text: "To check if a value is undefined", correct: false },
      { text: "To check if a value is not a number", correct: true },
      { text: "To check if a value is a number", correct: false },
    ],
  },
  {
    question:
      "Which method is used to remove the last element from an array in JavaScript?",
    answers: [
      { text: "pop()", correct: true },
      { text: "push()", correct: false },
      { text: "shift()", correct: false },
      { text: "slice()", correct: false },
    ],
  },
  {
    question: "What does the === operator do in JavaScript?",
    answers: [
      { text: "Compares values and types for equality", correct: true },
      { text: " Compares only values for equality", correct: false },
      { text: "Assigns a value", correct: false},
      {
        text: "Checks if two variables reference the same object",
        correct: false,
      },
    ],
  },

  {
    question: "console.log(x === undefined);",
    answers: [
      { text: "true", correct: true },
      { text: " false", correct: false },
      { text: "null", correct: false },
      { text: "error", correct: false },
    ],
  },
  {
    question: "console.log(0.1 + 0.2 === 0.3);",
    answers: [
      { text: "true", correct: false },
      { text: " false", correct: true },
      { text: "undefined", correct: false },
      { text: "TypeError", correct: false },
    ],
  },
  {
    question: "What does the Array.prototype.map() method return?",
    answers: [
      { text: "A new array", correct: false },
      { text: " The modified original array", correct: true },
      { text: "A single value", correct: false },
      { text: "A function", correct: false },
    ],
  }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`; // Corrected "questions" to "question"
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click" , () =>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
        
})

startQuiz();
