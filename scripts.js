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
const input = document.querySelector("#input");
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
let localArr = [];

startQuizButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputvalue = input.value;
  const localobj = {
    name: inputvalue,
    date: new Date().toLocaleString(),
    score: score,
  };
  localArr.push(localobj);
  localStorage.setItem("localArr", JSON.stringify(localArr));
  input.value = "";
  console.log(localArr);
  

  //   screen1.className = "hidden";
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");

  timerPara.innerText = timer;
  timeline();
  displayQuestionAndOptions();
  userNextBtn();

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
        blinkTimeline();
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

    //MATCH WITH CORRECT ANSWER
    if (typeof questions[questionNumber].answer === "number") {
      userAnswer = Number(userAnswer);
    }

    if (questions[questionNumber].answer === userAnswer) {
      ++score;
      let savedData = JSON.parse(localStorage.getItem("localArr"));
      savedData[savedData.length - 1].score = score;
      localStorage.setItem("localArr", JSON.stringify(savedData));

      // options.style.backgroundColor="green"
      // scoreSpan.innerText++
    }
  });
}

function displayQuestionAndOptions() {
  if (questionNumber >= questions.length - 1) {
    // NO MORE QUESTIONS TO DISPLAY, CLEAR EVERYTHING
    clearInterval(interval);
    screen2.classList.add("hidden");
    screen3.classList.remove("hidden");
    scoreSpan.innerText = score;
    nextDiv.innerText = "";
  } else {
    questionPara.innerText = questions[questionNumber].question;
    for (let i = 0; i < options.length; i++) {
      options[i].innerText = questions[questionNumber].options[i];
    }
  }
}

function userNextBtn() {
  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Submit";
  nextDiv.append(nextBtn);
  nextBtn.addEventListener("click", function () {
    if (questionNumber >= questions.length - 1) {
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

function timeline() {
  const timelineDiv = document.createElement("div");
  timelineDiv.classList.add("timelineDiv");

  for (let i = 0; i < questions.length; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    if (i === 0) circle.classList.add("active");
    circle.innerText = i + 1;
    timelineDiv.append(circle);
  }
  screen2.prepend(timelineDiv);
}

function blinkTimeline() {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => circle.classList.remove("active"));
  circles[questionNumber].classList.add("active");
}
