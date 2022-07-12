var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');



var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    }, 
    {
        question: 'What is 5 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '7',
        answer: 4,
    }, 
    {
        question: 'What is 10 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '12',
        choice4: '17',
        answer: 3,
    }, 
    {
        question: 'What is 12 + 2?',
        choice1: '2',
        choice2: '14',
        choice3: '21',
        choice4: '17',
        answer: 2,
    }
]

var SCORE_POINTS = 100;
var MAX_Questions = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_Questions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter ++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_Questions}`
    progressBarFull.style.width = `${(questionCounter/MAX_Questions) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset ['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener ('click', i => {
        if(!acceptingAnswers) {return}

        acceptingAnswers = false
        var selectedChoice = i.target
        var selectedAnswer = selectedChoice.dataset['number']

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestions();
            

    })
})


incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();
