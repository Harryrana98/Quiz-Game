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
const leaderDiv = document.querySelector(".leader");
const option = document.querySelector(".option");

let questionNumber = 0;
let timer = 5;
let score = 0;
let interval;
let localobj = {};
let randomOrder=[]
let temp=[]

for(let i=0;i<questions.length;i++){
  randomOrder.push(getrandomvalue())
}
function getrandomvalue(){
  let randomvalue=Math.floor(Math.random()*questions.length)
  if(temp.includes(randomvalue))return getrandomvalue()
    else{
  temp.push(randomvalue)
   return randomvalue
  }
}


let localArr =
  localStorage.getItem("localArr") !== null
    ? JSON.parse(localStorage.getItem("localArr"))
    : [];

startQuizButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value != "") {
    // questionNumber = 0;
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
    // console.log(localArr);

    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");

    timerPara.innerText = timer;
    timeline();
    displayQuestionAndOptions();
    userNextBtn();
    removeBackgroundColor()

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
          removeBackgroundColor()

          setTimeout(() => {
            screen1.classList.remove("hidden");
            screen3.classList.add("hidden");
            randomOrder[ questionNumber++];
            removeBackgroundColor()
            // screen2.classList.remove("hidden")
          }, 5000);
        } else {
          //RESET TIMER
          timer =   5;
          timerPara.innerText = timer;
          //CHANGE QUESTION
          randomOrder[ questionNumber++];
          displayQuestionAndOptions();
          blinkTimeline();
          removeBackgroundColor();
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

function removeBackgroundColor() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("red");
    options[i].classList.remove("green");
    options[i].disabled = false;
  }
}

// OPTION CLICK MECHANISM

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", (e) => {
    let userAnswer = e.target.innerText;

    for (let j = 0; j < options.length; j++) 
    {
      options[j].disabled = true;
    }
   
    // options[i].disabled=true
    console.log(userAnswer);

    //MATCH WITH CORRECT ANSWER
    if (typeof questions[randomOrder[questionNumber]].answer === "number") {
      userAnswer = Number(userAnswer);
    }
    if (questions[randomOrder[questionNumber]].answer === userAnswer) {
      options[i].classList.add("green");
    } else {
      options[i].classList.add("red");
    }

    if (questions[randomOrder[questionNumber]].answer === userAnswer) {
      ++score;
      localobj.score = score;
      let savedData = JSON.parse(localStorage.getItem("localArr"));
      savedData[savedData.length - 1].score = score;
      localStorage.setItem("localArr", JSON.stringify(savedData));
      
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

    // let randmQuiz=getRandomValue()
    questionPara.innerText = questions[randomOrder[questionNumber]].question;
    for (let i = 0; i < options.length; i++) {
      options[i].innerText = questions[randomOrder[questionNumber]].options[i];
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
    removeBackgroundColor()
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
  } else {
    const circles = document.querySelectorAll(".circle");
    circles.forEach((circle) => circle.classList.remove("active"));
    circles[questionNumber].classList.add("active");
  }
}

kbc.addEventListener("click", function () {
  screen1.classList.remove("hidden");
  screen2.classList.add("hidden");
  leaderDiv.style.display = "none";
});

leader.addEventListener("click", function () {
  
  leaderDiv.innerText = "";
  let getData = JSON.parse(localStorage.getItem("localArr"));
  if (!getData || getData.length === 0) {
    alert("Please play the quiz first!");
    return;
  }
  else{

  
  leaderDiv.style.display = "block";

  getData.sort((a, b) => b.score - a.score);

  let table = document.createElement("table");
  table.className = "table";
  table.style.fontSize = "20px";
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  let tableHead = document.createElement("thead");
  let tableRow = document.createElement("tr");

  let header = ["Name", "Date", "Score"];

  header.forEach((deta) => {
    let th = document.createElement("th");
    th.innerText = deta;
    th.style.border = "1px solid black";
    th.style.padding = "8px";
    th.className = "th";
    tableRow.append(th);
  });
  tableHead.appendChild(tableRow);

  let tbody = document.createElement("tbody");
  tbody.className = "tbody";
  tbody.style.textAlign = "center";

  getData.forEach((ArrData) => {
    let dataRow = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.innerText = ArrData.name;
    cell1.style.textTransform="capitalize"
    cell1.style.border = "1px solid black";
    cell1.style.padding = "8px";

    let cell2 = document.createElement("td");
    cell2.innerText = ArrData.date;
    cell2.style.padding = "8px";
    cell2.style.border = "1px solid black";

    let cell3 = document.createElement("td");
    cell3.innerText = ArrData.score;
    cell3.style.border = "1px solid black";
    cell3.style.padding = "8px";

    dataRow.append(cell1, cell2, cell3);
    tbody.appendChild(dataRow);
  });
  table.append(tableHead, tbody);
  leaderDiv.append(table);
}
});


leader.addEventListener("dblclick", function () {
  const confirmReset = confirm("Do you want to reset the leaderboard?");
  if (confirmReset) {
    localStorage.removeItem("localArr");
    alert("Leaderboard has been reset!");
    leaderDiv.style.display = "none";
  }
});

window.addEventListener("load", function () {
  localStorage.clear();
});

