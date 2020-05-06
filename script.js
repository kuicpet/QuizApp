const container = document.querySelector(".quiz");
const question = document.querySelector(".question");
const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answer-tracker");
const opt1 = document.querySelector(".option1");
const opt2 = document.querySelector(".option2");
const opt3 = document.querySelector(".option3");
const nextButton = document.querySelector(".next");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const questionNumberSpan = document.querySelector(".question-num");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");

const questions = [
  {
    q : "HTML stands for what?",
    options: ["HyporText Markup language","HyperText Makeup Language","HyperText Markup Language"],
    answer: 2
  },
  {
    q : "CSS stands for?",
    options: ["Cascade Style Sheet","Cascading Style Sheets","Cascading Style Shelves"],
    answer: 1
  },
  {
    q : "Which is not a programming language",
    options: ["PHP", "Python", "HTML"],
    answer: 2
  },
  {
    q : "WWW stands for",
    options: ["World Wide Web","World Web Wide","West World Web"],
    answer: 0
  },
  {
    q : "Which is a variable",
    options: ["let i = 8","const i = 8","function(8)"],
    answer: 0
  }
]


let questionIndex = 0;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;



totalQuestionSpan.innerHTML = questions.length;
function loadQuestion (){
  questionNumberSpan.innerHTML = index + 1;
  question.innerHTML = questions[questionIndex].q;
  opt1.innerHTML = questions[questionIndex].options[0];
  opt2.innerHTML = questions[questionIndex].options[1];
  opt3.innerHTML = questions[questionIndex].options[2];
  index++;
}
function check(element) {
  if(element.id == questions[questionIndex].answer){
      element.classList.add("correct");
      //updateAnswerTracker("correct");
     score++;
     console.log("score: " + score)
  } else {
    element.classList.add("wrong");
    //updateAnswerTracker("wrong");
  }
  disabledOptions();
}
 function disabledOptions(){
    for(let i = 0;i<options.length;i++){
      options[i].classList.add("disabled");
      if(options[i].id==questions[questionIndex].answer){
        options[i].classList.add("correct")
      }
    }
 } 
function enabledOptions(){
  for(let i = 0;i<options.length;i++){
    options[i].classList.remove("disabled","correct","wrong");
  }
}

 function validate (){
  if(!options[0].classList.contains("disabled")){
      alert("Please select an Option");
  }else{
    enabledOptions();
    randomQuestion();
  }
 }
 function next (){
   validate();
 }

function randomQuestion(){
  let randomNumber = Math.floor(Math.random()*questions.length);
  let hitDuplicate = 0;
  if(index==questions.length){
    quizOver();
  }else {
      if(myArray.length>0){
          for(let i= 0;i<myArray.length;i++){
            if(myArray[i]==randomNumber){
              hitDuplicate = 1;
              break;
            }
          }
          if(hitDuplicate==1){
            randomQuestion();
          } else {
            questionIndex = randomNumber;
            loadQuestion();
          }
      }
      if(myArray.length==0){
        questionIndex = randomNumber;
        loadQuestion();
        myArr.push(questionIndex);
      }
  
  myArray.push(randomNumber);
  //console.log("myArray :" + myArray);

  };
}

function answerTracker(){
  for(let i = 0;i<questions.length;i++){
    const div = document.createElement("div");
    div.classList.add("tracker");
    answerTrackerContainer.appendChild(div);
  }
}
/*function updateAnswerTracker(){
  answerTrackerContainer.children[questionIndex+1].classList.add();
}*/

function quizOver(){
  document.querySelector(".quiz-over").classList.add("show");
  correctAnswerSpan.innerHTML = score;
  totalQuestionSpan2.innerHTML = questions.length;
  percentage.innerHTML=(score/questions.length)*100 + " % ";
}

function tryAgain(){
  window.location.reload();
}
 

window.onload=function(){
  randomQuestion();
  answerTracker();
}