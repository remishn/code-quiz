var startBtnEl = document.querySelector("#start-quiz")
var quizContentEl = document.querySelector("#quiz-content")
var HighScoreBtnEl = document.querySelector("#high-score")

var questionIndex = 0
var timeLeft = 120;
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


    if (correct === "true") {
        alert("correct");
    
    }
    else {
        alert("wrong")
    }

    quizContentEl.innerHTML = ""

    questionIndex = questionIndex + 1

    var element = null
    if (questionIndex === questionBank.length) {
        alert("end of question")
        element = createResultElement(10)
    } else {
        var questionData = questionBank[questionIndex]
        element = createQuestionElement(questionData)
    }
    
    quizContentEl.appendChild(element)
    
}
    //Timer

  timerInterval = setInterval(function() {

  })

    //result function at the end to show results
function showResult() {

}

// remove "start quiz" & display highscore 
function showHighscore() {
    quizContentEl.innerHTML =""

    displayHighscore();
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

   var submitEl = document.createElement("button");
   submitEl.classList.add("submit");

   resultEl.appendChild(AllDoneEl);
   resultEl.appendChild(finalResultEl);
   resultEl.appendChild(submitEl);

   return resultEl;
}

var startQuiz = function() {
    // remove information
    quizContentEl.innerHTML = ""


    var questionData = questionBank[questionIndex]

    // add questions
    var questionContentEl = createQuestionElement(questionData)
    // var resultEl = createResultElement(10)
    
    // add timer div
    
    
    quizContentEl.appendChild(questionContentEl)
    // quizContentEl.appendChild(resultEl)

}
var timerEl = document.createElement("div")
    timerEl.classList.add("Time")

startBtnEl.addEventListener("click", startQuiz)

