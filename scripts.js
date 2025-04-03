const questions = [
  {
    question: "2+2",
    answer: 4,
    options: [1, 2, 3, 4],
  },
  {
    question: "2+2+2",
    answer: 6,
    options: [2, 4, 6, 8],
  },
  {
    question: "2+2+2-2",
    answer: 4,
    options: [4, 6, 0, 2],
  },
  {
    question: "What is the capital of China?",
    answer: "Beijing",
    options: ["New Delhi", "Beijing", "Kathmandu", "Islamabad"],
  },
  {
    question: "Which of the following is NOT a neighbour of India?",
    answer: "Australia",
    options: ["Pakistan", "China", "Australia", "Bhutan"],
  },
];

const startQuizButton = document.querySelector(".screen1 button");
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const screen3 = document.querySelector(".screen3");
const questionPara = document.querySelector(".question");
const timerPara = document.querySelector(".timer");
const options = document.querySelectorAll(".options button");
const scoreSpan = document.querySelector(".screen3 span");
const nextDiv = document.querySelector(".nextDiv");
let questionNumber = 0;
let timer = 5;
let score = 0;
let interval;

startQuizButton.addEventListener("click", () => {
  //   screen1.className = "hidden";
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");

  timerPara.innerText = timer;
  displayQuestionAndOptions();
  userNextBtn()
 

  interval = setInterval(() => {
    if (timer === 1) {
      if (questionNumber >= questions.length - 1) {
        // NO MORE QUESTIONS TO DISPLAY, CLEAR EVERYTHING
        clearInterval(interval);
        screen2.classList.add("hidden");
        screen3.classList.remove("hidden");
        scoreSpan.innerText = score;
        nextDiv.innerText = "";
      } else {
        //RESET TIMER
        timer = 5;
        timerPara.innerText = timer;
        //CHANGE QUESTION
        questionNumber++;
        displayQuestionAndOptions();
      }
    } else {
      timerPara.innerText = --timer;
    }
  }, 1000);
});

// OPTION CLICK MECHANISM

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", (e) => {
    let userAnswer = e.target.innerText;
    console.log(userAnswer);

    //MATCH WITH CORRECT ANSWER
    if (typeof questions[questionNumber].answer === "number") {
      userAnswer = Number(userAnswer);
    }

    if (questions[questionNumber].answer === userAnswer) {
      console.log("answer sahi hai");
      score++;
      // options.style.backgroundColor="green"
      // scoreSpan.innerText++
    }
  });
}

function displayQuestionAndOptions() {
  questionPara.innerText = questions[questionNumber].question;
  for (let i = 0; i < options.length; i++) {
    options[i].innerText = questions[questionNumber].options[i];
    
  }
}

function userNextBtn() {
  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Submit";
  nextDiv.append(nextBtn);
  nextBtn.addEventListener("click",function(){

    if (questionNumber >= questions.length - 1){
      clearInterval(interval);
        screen2.classList.add("hidden");
        screen3.classList.remove("hidden");
        scoreSpan.innerText = score;
        nextDiv.innerText = "";
    }
    timer = 5;
    timerPara.innerText = timer;
    questionNumber++;
    displayQuestionAndOptions();
  });
}

// function backColorOpt{
// if()
// }
