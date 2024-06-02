// Select Elements in HTML
var startButton = document.getElementById('btn-start');
var welcomePage = document.getElementById('welcomePage');
var questionPage = document.getElementById("questionPage");
var questionText = document.getElementById("questionText");
var answerOptions = document.getElementById("answerOptions");


function startQuiz() {
    welcomePage.classList.add("hide");
    questionPage.classList.remove("hide");

    for(var i=0; i < questions.length; i++){
        var currentQuestions = questions[i].question;
        if(currentQuestions == questions[i].answerOptions) {
            score++;
            alert("correct!");
        } else {
            alert("wrong");
        }
    }
    // questionText.textContent=questions[0].question;
    // answerOptions.textContent=questions[0].answerOptions;
    // console.log(questions[0]);
    // console.log(questions[0].question);
    // console.log(questions[0].answerOptions);
}




// Utilizing Array Method to organize questions - Creating an array of question objects
var score = 0;
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answerOptions: {
            1: "Strings",
            2: "Booleans",
            3: "alerts",
            4: "numbers"
        },
        correctAnswer: '3'
    },
    {
        question: "The condition if an if/else statement is enclosed within ______.",
        answerOptions: {
            1: "Quotes",
            2: "Curly Brackets",
            3: "Parenthesis",
            4: "Square Brackets"
        },
        correctAnswer: '2'
    },
    {
        question: "Arrays in JavaScript can be used to store______.",
        answerOptions: {
            1: "Numbers and strings",
            2: "Other Arrays",
            3: "Booleans",
            4: "All of the above"
        },
        correctAnswer: '4'
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answerOptions: {
            1: "Commas",
            2: "Curly Brackets",
            3: "Quotes",
            4: "Parenthesis"
        },
        correctAnswer: '3'
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerOptions: {
            1: "JavaScript",
            2: "Terminal/bash",
            3: "For Loops",
            4: "Console.log"
        },
        correctAnswer: '4'
    },
];


// Element tag to manipulate
startButton.addEventListener('click', startQuiz);
