//Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const questions = [
    {
        question : "1. Who invented Javascript",
        answers : {
            a: "Douglas Crocford",
            b: "Sheryl Sandberg",
            c: "Brendan Eich"
        },
        correctAnswer: "c" 
    },
    {
        question : "2. What does HTML mean",
        answers : {
            a: "Hyper Text Markup Language",
            b: "Hypo Text MakeUp Language",
            c: "Hyper Text Makeup Language"
        },
        correctAnswer: "a"
    },
    {
        question : "3. Which is a Javascript package manager?",
        answers : {
            a: "Node JS",
            b: "npm",
            c: "Typescript"
        },
        correctAnswer: "b"
    },
    {
        question : "4. Which tool can be used to ensure code quality?",
        answers: {
            a: "JQuery",
            b: "Angular",
            c: "EsLint"
        },
        correctAnswer: "c"
    },
    {
        question: "5. Which is not a Programming Language?",
        answers: {
            a: "Python",
            b: "React",
            c: "PHP"
        },
        correctAnswer: "b"
    }
];
//Functions
const quiz = () => {
    const output = [];
    questions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input class = "mx-2 my-3" type = "radio" name = "question${questionNumber}" value = "${letter}">
                        ${letter}: ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="slide">
                    <div class ="question">${currentQuestion.question}</div>
                    <div class = "answers">${answers.join('')}</div>
                </div>
              `
            );
    })

    quizContainer.innerHTML = output.join('');

};
const results = () => {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    questions.forEach((currentQuestion, questionNumber) => {
        
        //Find selected answers
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        
        //if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        } else {
            answerContainers[questionNumber].style.color ='red';
        }
    });
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
};
const showSlide = (n) => {
    
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    
    if(currentSlide === 0){
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display ='none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}
const showNextSlide = () => {
    showSlide(currentSlide + 1);
}
const showPreviousSlide = () => {
    showSlide(currentSlide - 1);
}


quiz();
//Pagination
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
//Show first Slide
showSlide(currentSlide);

//Event Listeners
submitButton.addEventListener('click',results);
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);


