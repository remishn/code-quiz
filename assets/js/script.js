var startBtnEl = document.querySelector("#start-quiz")
var quizContentEl = document.querySelector("#quiz-content")

var questionIndex = 0
var questionBank = [
    {
        question: "question 1 from bank", 
        choices: [
            {
                text: "option 1",
                correct: false,
            },
            {
                text: "option 2",
                correct: true
            }
        ]
    },
    {
        question: "question 2 from bank", 
        choices: [
            {
                text: "option 1",
                correct: false,
            },
            {
                text: "option 2",
                correct: true
            },
            {
                text: "option 3",
                correct: false
            }
        ]
    }
]

var processAnswer = function(event) {
    console.log(event.target.dataset.correct)
}

var createQuestionElement = function(questionData) {
    var questionContentEl = document.createElement("div")
    questionContentEl.classList.add("question-content")

    var questionEl = document.createElement("div")
    questionEl.classList.add("question")
    questionEl.textContent = questionData.question

    var choicesEl = document.createElement("div")
    choicesEl.classList.add("choices")

    choicesEl.addEventListener("click", processAnswer)

    for(var i = 0; i < questionData.choices.length; i++) {
        var choice = questionData.choices[i]

        var choiceEl = document.createElement("button")
        choiceEl.classList.add("choice")
        choiceEl.dataset.correct = choice.correct
        choiceEl.textContent = choice.text

        choicesEl.appendChild(choiceEl)
    }

    
    questionContentEl.appendChild(questionEl)
    questionContentEl.appendChild(choicesEl)

    return questionContentEl
}

var startQuiz = function() {
    // remove information
    quizContentEl.innerHTML = ""

    var questionData = questionBank[questionIndex]

    // add questions
    var questionContentEl = createQuestionElement(questionData)

    quizContentEl.appendChild(questionContentEl)
}

startBtnEl.addEventListener("click", startQuiz)