// questions 
var questions = [
    {
        question: "What does HTML stand for?",
        possibleAnswers: ["HyperMark Text Language", "HyperText Markup Language", "HyperText Match Language", "HeavenlyTexas Made Language"],
        correctAnswer: "HyperText Markup Language"
    },
    {
        question: "What does CSS stand for?",
        possibleAnswers: ["Cascading Style Sheets", "Column Spread Styles", "Colorful Style Sheets", "Computing Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "What does JS stand for?",
        possibleAnswers: ["Java", "JaredScript", "JavaScript", "JavaScience"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What do you use to select an ID in JavaScript?",
        possibleAnswers: ["document.getElementById('id')", "selectId('id')", "document.getElementByClass('id')", "getDocumentElement.id('id')"],
        correctAnswer: "document.getElementById('id')"
    },
    {
        question: "Where does your JS script file go in your HTML file?",
        possibleAnswers: ["In the head", "In the footer", "With your CSS link", "At the bottom of the body"],
        correctAnswer: "At the bottom of the body"
    },
];

var questionsNumber = 0;
var time = 50;
var score = 0;
var highScore = [];
var quizLength = questions.length;

// dom selectors
var startButtonEl = document.getElementById("start-button");
var quizQuestion = document.getElementById("quiz-question");
var allAnswers = document.getElementById("answers");
var hiScoreResults = document.getElementById("high-score-results");
var resultFormEl = document.getElementById("result-form");
var timeEl = document.getElementById("time");
var quizBox = document.getElementById("quiz-box");
var startBox = document.getElementById("start-quiz");
var nextButton = document.getElementById("next-button");
var hiScorePage = document.getElementById("high-score-page");
var hiScoreList = document.getElementById("hi-score-list");
var hiScoreListItem = document.getElementById("hi-score-item");
// function that starts the quiz
function startQuiz() {
    time = 50;
    startBox.classList.add("hide");
    quizBox.classList.remove("hide");
    timeEl.textContent = time;
    setInterval(function(){ // timer
        timeEl.textContent = time;
        if (time > 0) { // while the timer is above 0 the timer will go down
            time--;
        }
        else { // if the timer is not above 0 then the timer will stop running
            clearInterval(time);
        }
    }, 1000);
    getQuestions(0);

}


// function that will show the questions
function getQuestions(questionsIndex) {
    // getting the question onto the page
    questionAsked = '<span class="fw-bold fs-4">' + questions[questionsIndex].question + '</span>';
    quizQuestion.innerHTML = questionAsked;
    // getting the answers onto the page
    differentAnswers = '<button type="button" class="btn btn-dark m-1" id="answer-button">'+ questions[questionsIndex].possibleAnswers[0] +'</button>'
    + '<button type="button" class="btn btn-dark m-1" id="answer-button">'+ questions[questionsIndex].possibleAnswers[1] +'</button>'
    + '<button type="button" class="btn btn-dark m-1" id="answer-button">'+ questions[questionsIndex].possibleAnswers[2] +'</button>'
    + '<button type="button" class="btn btn-dark m-1" id="answer-button">'+ questions[questionsIndex].possibleAnswers[3] +'</button>';
    allAnswers.innerHTML = differentAnswers;
    var answer = allAnswers.querySelectorAll('#answer-button');
    for (i = 0; i < answer.length; i++) {
        answer[i].setAttribute("onclick", "answerChosen(this)");
    }
}

function answerChosen(answer) {
    userAnswer = answer.textContent;
    correctAnswer = questions[questionsNumber].correctAnswer
    allAns = allAnswers.children.length;
    if (userAnswer === correctAnswer) {
        window.confirm("Correct! Hit next to continue :D")
        score = Math.floor(score + 10 + (time*.2));
        console.log(score);
        answer.classList.add("bg-success")
    } else {
        window.confirm("Incorrect! Hit next to continue D:")
        time = time - 10;
        answer.classList.add("bg-danger")
    }

}

nextButton.onclick = function() {
    if (questionsNumber < questions.length - 1) {
        questionsNumber++;
        getQuestions(questionsNumber);
    } else if (questionsNumber = questions.length -1) {
        getResults();
    }
}

function getResults() {
    quizBox.classList.add("hide");
    hiScorePage.classList.remove("hide");
    var printedScore = '<p>Here is your score!</p> '+ score +' <p> Save it by putting in your name.</p>'
    hiScoreResults.innerHTML = printedScore;
}

localStorage.setItem("score", score);
localStorage.setItem("name", resultFormEl);

// function that will save the high score
function setHighScore() {
    var hiScoreScore = localStorage.getItem("score");
    var hiScoreName = localStorage.getItem("name");

    var hiLiistItem = document.createElement("<li>");
    hiLiistItem.setAttribute("#hi-score-item");
    hiScoreList.appendChild(hiListItem);


}

resultFormEl.addEventListener('click', function(event) {
    event.preventDefault();
    
});

// will start the quiz when you hit the start button
startButtonEl.onclick = function() {
    startQuiz();
}

