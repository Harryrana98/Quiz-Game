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
const kbc = document.querySelector("#kbc");
const leader = document.querySelector("#leaderBoard");

let questionNumber = 0;
let timer = 5;
let score = 0;
let interval;
let localobj={}
let localArr = localStorage.getItem("localArr")!==null ? JSON.parse(localStorage.getItem("localArr")): [];



startQuizButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value != "") {

    questionNumber = 0;
    timer = 5;
    score = 0;
    clearInterval(interval);
    nextDiv.innerHTML = "";

    const inputvalue = input.value;
    localobj = {
      name: inputvalue,
      date: new Date().toLocaleString(),
      score: 0,
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
          questionNumber = 0;

          setTimeout(() => {
            screen1.classList.remove("hidden");
            screen3.classList.add("hidden");
            // screen2.classList.remove("hidden")
          }, 5000);
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
  } else {
    startQuizButton.disabled = "";
    alert("please enter your name");
  }
});

// OPTION CLICK MECHANISM

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", (e) => {

    let userAnswer = e.target.innerText;
    
    // option.disabled=true
    //MATCH WITH CORRECT ANSWER
    if (typeof questions[questionNumber].answer === "number") {
      userAnswer = Number(userAnswer);
    }

    if (questions[questionNumber].answer === userAnswer) {
      ++score;
      localobj.score=score
      let savedData = JSON.parse(localStorage.getItem("localArr"));
      savedData[savedData.length - 1].score = score;
      localStorage.setItem("localArr", JSON.stringify(savedData));
      userAnswer.style.backgroundColor="red"  
      // userAnswer.style.backgroundColor="red"


      // options.style.backgroundColor="green"
      // scoreSpan.innerText++
    }
  });
}

function displayQuestionAndOptions() {
  if (questionNumber >= questions.length) {
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
      setTimeout(() => {
        screen1.classList.remove("hidden");
        screen3.classList.add("hidden");
        // screen2.classList.remove("hidden")
      }, 5000);
    }
    timer = 5;
    timerPara.innerText = timer;
    questionNumber++;
    displayQuestionAndOptions();
    blinkTimeline();
  });
}

function timeline() {
  const oldTimeline = document.querySelector(".timelineDiv");
  if (oldTimeline) oldTimeline.remove();

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
if (questionNumber >= questions.length) {
  clearInterval(interval);
      screen2.classList.add("hidden");
      screen3.classList.remove("hidden");
      scoreSpan.innerText = score;
      nextDiv.innerText = ""; 
}else{
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => circle.classList.remove("active"));
  circles[questionNumber].classList.add("active");

}
}

kbc.addEventListener("click",function(){
  screen1.classList.add("visible")
})
