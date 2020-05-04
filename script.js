const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumber = document.querySelector(".question-num-value");
const totalQuestions = document.querySelector(".total-questions");
const correctAnswer = document.querySelector(".correct-answers");
const totalQuestion2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
let questionIndex = 1;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;
//Questions,Options & Anwers
const questions = [
    {
        q: "HTML stands for?",
        options: ["HyperText Markup Language","HyperText Makeup Language","Higher Text MarkupLanguage"],
        answer: 1
    },
    {
        q: "CSS stands for?",
        options: ["Cascading Style Sheets","Critical Style Sheets","Cascading Style Shelves"],
        answer: 1
    },
    {
        q: "WWW stands for?",
        options: ["World Wide Window","Web Wide World","World Wide Web"],
        answer: 3
    },
    {
        q: "Which is not a Programming Language?",
        options: ["JavaScript","Python","HTML"],
        answer: 3
    },
    {
        q: "What Tool can be used to ensure code quality",
        options: ["Git","EsLint","ReactJS"],
        answer: 2
    },

]

//Functions
totalQuestions.innerHTML = questions.length;
const load = () => {
    questionNumber.innerHTML = index+1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    index++;
}

const check = (element) => {
    //Checking correct answer
if(element.id==questions[questionIndex].answer){
    element.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
} else{
    element.classList.add("wrong");
    updateAnswerTracker("wrong");
}
disabledOptions()
}

const disabledOptions = () => {
    for(let i = 0;i < options.length;i++){
        options[i].classList.add("disabled");
        if(options[i].id == questions[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }
}

const enabledOptions = () => {
    for(let i=0;i<options.length;i++){
        options[i].classList.remove("disabled","correct","wrong");
    }
}

const validate = () => {
    if(!options[0].classList.contains("disabled")){
        alert("Please select an Option!")
    } else{
        enabledOptions();
        randomQuestion();
    }
}

const next = () => {
    validate();
}

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random()*questions.length);
    let duplicate = 0;
    if(index == questions.length){
        quizOver();
    } else{
        if(myArray.length > 0){
            for(let i=0;i<myArray.length;i++){
                if(myArray[i] == randomNumber){
                    duplicate = 1;
                    break;
                }
            }
            if(duplicate == 1){
                randomQuestion();
            } else {
                questionIndex = randomNumber;
                load();
            }
        }
        if(myArray.length == 0){
            questionIndex = randomNumber;
            load();
            myArr.push(questionIndex);
        }
    }

   console.log("myArr" + myArr);
    myArray.push(randomNumber);
    load();
}

const answerTracker = () => {
    for(let i = 0;i<questions.length;i++){
        const div = document.createElement("div");
        div.classList.add("circle");
        answerTrackerContainer.appendChild(div);
    }
}
const updateAnswerTracker = (classNam) => {
    answerTrackerContainer.children[index-1].classList.add(classNam);
}

const quizOver = () => {
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswer.innerHTML = score;
    totalQuestion2.innerHTML = questions.length;
    percentage.innerHTML = (score/questions.length) * 100 + "%";
}

const tryAgain = () => {
    window.location.reload();
}

window.onload = function(){
    randomQuestion();
    answerTracker();
}
