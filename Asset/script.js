// Initialise object for questions 
var questions = [{
    text: "Commonly used data types DO NOT include?",
    options: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
},
{
    text: "The condition if/else statement is enclosed within _____.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
},
{
    text: "Arrays in JavaScript can be used to store _____.",
    options: ["numbers and strings", "other arrays", "booleans", "all of these"],
    correctAnswer: "all of these"
},
{
    text: "String values must be enclosed within _____ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
},
{
    text: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log"
}
];

// The index of the current question
var currentQuestionIndex = 0;
// The timer for the quiz
var timer = 0;
// The ID of the timer interval
var timerId = 0;
// The function to start the quiz
function startQuiz() {
    // Reset the quiz variables
    currentQuestionIndex = 0;
    // Set the timer to 15 seconds per question
    timer = questions.length * 15;
    // Show the timer and hide the start page, start button, end screen, start again button, and clear scores button
    document.getElementById("timer-display").style.display = "block";
    document.getElementById("start-page").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("start-again-button").style.display = "none";
    document.getElementById("clear-scores-button").style.display = "none";

    // Clear the highscores div and the message
    document.getElementById("highscores").innerHTML = "";
    document.getElementById("message").textContent = "";

    // Show the quiz container
    document.getElementById("quiz-container").style.display = "block";

    // Start the timer and display the first question
    timerId = setInterval(function() {
        timer--;
        document.getElementById("timer-display").textContent = "Time left: " + timer + " seconds";
        if (timer <= 0) {
            // End the quiz if the timer reaches 0
            endQuiz();
        }
    }, 1000);
    // Display the first question
    displayQuestion();
}

// The function to display a question
function displayQuestion() {
    // Get the current question
    var question = questions[currentQuestionIndex];
    // Display the question text
    document.getElementById("question").textContent = question.text;
    // Get the options div
    var optionsDiv = document.getElementById("options");
    // Clear the options div
    optionsDiv.innerHTML = "";
    // For each option...
    question.options.forEach(function(option, i) {
        // Create a button
        var optionButton = document.createElement("button");
        // Add a number before each option
        optionButton.textContent = (i + 1) + ". " + option;
        // Set the button class to "option"
        optionButton.setAttribute("class", "option");
        // Set the button value to the option
        optionButton.setAttribute("value", option);
        // Set the button click handler
        optionButton.onclick = handleOptionClick;
        // Add the button to the options div
        optionsDiv.appendChild(optionButton);
    });
}
// The function to handle an option click
function handleOptionClick(event) {
    // Check if the selected option is correct
    var isCorrect = event.target.value === questions[currentQuestionIndex].correctAnswer;
    // Display a message based on whether the answer is correct
    document.getElementById("message").textContent = isCorrect ? "Correct!" : "Wrong!";

    if(isCorrect) {
        event.target.classList.remove('normal');
        event.target.classList.add('correct');
      
      } else {
        event.target.classList.remove('normal');
        event.target.classList.add('wrong');
      }
    // If the answer is wrong and the timer is greater than 10...
    if (!isCorrect && timer > 10) {
        timer -= 10;
    // If the answer is wrong and the timer is less than or equal to 10...
    } else if (!isCorrect) { 
        // Set the timer to 0
        timer = 0;
        // End the quiz
        endQuiz();
        // Exit the function
        return;
    }
    // If the timer is greater than 0...
    if (timer > 0) {
        // Move to the next question
        currentQuestionIndex++;
        // If there are no more questions...
        if (currentQuestionIndex === questions.length) {
            // End the quiz after 1 second
            setTimeout(endQuiz, 1000);
        } else {
            // Display the next question after 1 second
            setTimeout(displayQuestion, 1000);
        }
    }
}

// The function to end the quiz
function endQuiz() {
    // Clear the timer interval
    clearInterval(timerId);
    // Hide the quiz container
    document.getElementById("quiz-container").style.display = "none";
    // Show the end screen
    document.getElementById("end-screen").style.display = "block";
    // Show the clear scores button
    document.getElementById("clear-scores-button").style.display = "block";
    // Display the final score
    document.getElementById("score").textContent = timer;
    // Set the save score button click handler
    document.getElementById("save-score").onclick = saveScore;
    displayHighscores();
    // Show the start again button
    document.getElementById("start-again-button").style.display = "block";
}



// The function to save a score
function saveScore() {
    // Get the initials input
    var initialsInput = document.getElementById("initials");
    // Get the initials
    var initials = initialsInput.value;
    // If the initials are empty...
    if (!initials) {
        // Show an alert
        alert("Please enter your initials before saving.");
        // Exit the function
        return;
    }
    // Get the score
    var score = timer;
    // Get the high scores from local storage
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    // Create a new score object
    var newScore = {
        score: score,
        initials: initials
    };
    // Add the new score to the high scores
    highscores.push(newScore);
    // Save the high scores to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Clear the initials input field
    initialsInput.value = "";

    // Display high scores after saving the new score
    displayHighscores();
}


function clearScores() {
    // Clear the highscores from local storage
    localStorage.removeItem("highscores");

    // Clear the highscores div
    document.getElementById("highscores").innerHTML = "";
}

document.getElementById("start-button").onclick = startQuiz;
document.getElementById("start-again-button").onclick = startQuiz;
document.getElementById("clear-scores-button").onclick = clearScores;

// Event listener for the View High Scores button
document.getElementById("view-highscores-button").onclick = function() {
    // Hide the start page and start button
    document.getElementById("start-page").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    // Hide the quiz container
    document.getElementById("quiz-container").style.display = "none";
    // Hide the end screen
    document.getElementById("end-screen").style.display = "none";
    // Hide the button container
    document.getElementById("button-container").style.display = "none";
    // Show the highscores and back button
    document.getElementById("highscores").style.display = "block";
    document.getElementById("start-again-button").style.display = "none"; // Hide the start again button
    document.getElementById("back-button").style.display = "block"; // Show the back button
    // Display high scores
    displayHighscores();
}

// Event listener for the Back button
document.getElementById("back-button").onclick = function() {
    // Show the start page and start button
    document.getElementById("start-page").style.display = "block";
    document.getElementById("start-button").style.display = "block";
    // Hide the highscores and back button
    document.getElementById("highscores").style.display = "none";
    document.getElementById("back-button").style.display = "block";
}

// Event listener for the Start Again button
document.getElementById("start-again-button").onclick = function() {
    // Hide the highscores and start again button
    document.getElementById("highscores").style.display = "none";
    document.getElementById("start-again-button").style.display = "none";
    // Start the quiz
    startQuiz();
}