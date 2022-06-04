var startBtnEl = document.querySelector("#start-quiz")
var quizContentEl = document.querySelector("#quiz-content")
var highScoreBtnEl = document.querySelector("#high-score")
var timerEl = document.querySelector("#time-left")


var questionIndex = 0
var timeLeft = 75;
var intervalId 
var timerInterval;
var score = 0;
var correct;
var questionBank = [
    {
        question: "Inside which HTML element do we put the JavaScript?", 
        choices: [
            {
                text: "<js>",
                correct: false    
            },
            {
                text: "<script>",
                correct: true
            }
        ]
    },
    {
        question: "What does HTML stand for?", 
        choices: [
            {
                text: "Home Tool Markup Language",
                correct: false
                
            },
            {
                text: "Hyper Text Markup Language",
                correct: true
            }
            
        ]
    },
   
    {
        question: "What does CSS stand for?", 
        choices: [
            {
                text: "Creative Style Sheets",
                correct: false,
            },
            {
                text: "Cascading Style Sheets",
                correct: true
            }
            
        ]
    },

]

function submitScore() {
    // find element 
    var initialInputEl = document.querySelector("#initial")
    
    // read initials
    var user = initialInputEl.value
    console.log(user)

    // save initials
    localStorage.setItem(user, timeLeft)

    // show highscore
}

function monitorTime() {
    timeLeft = timeLeft - 1
    timerEl.innerText = "" + timeLeft

    if (timeLeft < 1) {
        clearInterval(intervalId)
        quizContentEl.innerHTML = ""
    
        var element = createResultElement(timeLeft)
        
        quizContentEl.appendChild(element)
    }
}

// create questions in cycles

function createQuestionElement(questionData) {

    var questionContentEl = document.createElement("div");
    questionContentEl.classList.add("question-content");

    var questionEl = document.createElement("div");
    questionEl.classList.add("question");
    questionEl.textContent = questionData.question;

    var choicesEl = document.createElement("div");
    choicesEl.classList.add("choices");

    choicesEl.addEventListener("click", processAnswer);

    for (var i = 0; i < questionData.choices.length; i++) {
        var choice = questionData.choices[i];

        var choiceEl = document.createElement("button");
        choiceEl.classList.add("choice");
        choiceEl.dataset.correct = choice.correct;
        choiceEl.textContent = choice.text;

        choicesEl.appendChild(choiceEl);
    }

    questionContentEl.appendChild(questionEl);
    questionContentEl.appendChild(choicesEl);

    return questionContentEl;
}

// check selection with correct answer 

var processAnswer = function(answer) { 
    console.log(answer.target.dataset.correct)

    var correct = answer.target.dataset.correct

    if (correct !== "true") {
        timeLeft = timeLeft - 5
    }
  
    quizContentEl.innerHTML = ""

    questionIndex = questionIndex + 1

    var element = null
    if (questionIndex === questionBank.length) {
        clearInterval(intervalId)
        element = createResultElement(timeLeft)
    } else {
        var questionData = questionBank[questionIndex]
        element = createQuestionElement(questionData)
    }
    
    quizContentEl.appendChild(element)
}
   
// remove "start quiz" & display highscore 
function showHighscore() {
    quizContentEl.innerHTML =""

}

// users can view result and highscore

function createResultElement(result) {

   var resultEl = document.createElement("div");
   resultEl.classList.add("result-content");

   var AllDoneEl = document.createElement("div");
   AllDoneEl.classList.add("all-done");
   
   AllDoneEl.textContent = "All Done"

   var finalResultEl = document.createElement("div");
   finalResultEl.classList.add("final-result");

   finalResultEl.textContent = "Final Score: " + result

   var initialInputEl = document.createElement("input")
   initialInputEl.classList.add("initial")
   initialInputEl.id = "initial"
   
   var submitEl = document.createElement("button");
   submitEl.classList.add("submit");
   submitEl.textContent = "Submit"

   submitEl.addEventListener("click", submitScore)

   var enterInitialEl = document.createElement("div")
   enterInitialEl.classList.add("enter-initials")
   enterInitialEl.textContent = "enter-initials"

   var aEl = document.createElement("div")
   aEl.appendChild(enterInitialEl)
   aEl.appendChild(initialInputEl)
   aEl.appendChild(submitEl)
   

   resultEl.appendChild(AllDoneEl);
   resultEl.appendChild(finalResultEl);
   resultEl.appendChild(aEl)

   return resultEl;
}

var startQuiz = function() {
    // remove information
    quizContentEl.innerHTML = ""
    
    var questionData = questionBank[questionIndex]

    // add questions
    var questionContentEl = createQuestionElement(questionData)
    
    quizContentEl.appendChild(questionContentEl)

    // add timer div  
    intervalId = setInterval(monitorTime, 1000);
}

startBtnEl.addEventListener("click", startQuiz)

