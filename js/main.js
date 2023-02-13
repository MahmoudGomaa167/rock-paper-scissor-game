const normalRulesButton = document.querySelector('.rules-button')
const closeModalButton = document.querySelector('.close')
const normalModal = document.querySelector('.normal-rules-modal')
const gameBoard = document.querySelector('.game-board');
const gameBeginElement = document.querySelector('.game-begin')
const userChoiceButtons = document.querySelectorAll('.user-button');
const userChoiceElement = document.querySelector('.user-choice')
const hostChoiceElement = document.querySelector('.house-choice')
const resultElement = document.querySelector('.result')
const resetButton = document.querySelector('.reset-button')
const scoreElement = document.querySelector('.score')
const normalMoves = ['paper', 'scissors', 'rock']
let userChoice, hostChoice, score = 0;
scoreElement.textContent = 0

normalRulesButton.addEventListener('click', () => {
    normalModal.classList.add('show')
})

closeModalButton.addEventListener('click', () => {
    normalModal.classList.remove('show')
})

const createHTMLElement = (parentElement, choice) => {
    parentElement.children[1].innerHTML = `
    <span class="choice-button ${choice}">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <img src="images/icon-${choice}.svg" alt="${choice}" />
    </span>
`
}

userChoiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        gameBoard.classList.add('start')
        gameBeginElement.classList.add('start')
        userChoice = button.dataset.choice

        createHTMLElement(userChoiceElement, userChoice)

        const interval = setInterval(() => {
            hostChoice = normalMoves[Math.floor(Math.random() * normalMoves.length)]
            createHTMLElement(hostChoiceElement, hostChoice)
        }, 100)

        setTimeout(() => {
            hostChoice = normalMoves[Math.floor(Math.random() * normalMoves.length)]
            createHTMLElement(hostChoiceElement, hostChoice)
            clearInterval(interval)
            gameBeginElement.classList.add('end-game')
            checkWinner()
        }, 2000)
    })
})

const checkWinner = () => {
    if (userChoice === 'paper' && hostChoice === 'scissors') {
        hostChoiceElement.classList.add('winner')
        resultElement.textContent = 'you lose'
        configureScore('lose')
    } else if (userChoice === 'scissors' && hostChoice === 'paper') {
        userChoiceElement.classList.add('winner')
        resultElement.textContent = 'you win'
        configureScore('winner')
    } else if (userChoice === 'rock' && hostChoice === 'scissors') {
        userChoiceElement.classList.add('winner')
        resultElement.textContent = 'you win'
        configureScore('winner')
    } else if (userChoice === 'scissors' && hostChoice === 'rock') {
        hostChoiceElement.classList.add('winner')
        resultElement.textContent = 'you lose'
        configureScore('lose')
    } else if (userChoice === 'paper' && hostChoice === 'rock') {
        userChoiceElement.classList.add('winner')
        resultElement.textContent = 'you win'
        configureScore('winner')
    } else if (userChoice === 'rock' && hostChoice === 'paper') {
        hostChoiceElement.classList.add('winner')
        resultElement.textContent = 'you lose'
        configureScore('lose')
    } else {
        resultElement.textContent = `it's a draw`
    }
}

const configureScore = (playerResult) => {
    if (playerResult === 'winner') {
        score++
    } else if (playerResult === 'lose') {
        if (score <= 0) {
            score = 0;
        } else {
            score--
        }
    } else {
        score = score
    }

    scoreElement.textContent = score
}

const resetGame = () => {
    userChoice = '';
    hostChoice = '';
    gameBeginElement.classList.remove('end-game')
    gameBoard.classList.remove('start')
    gameBeginElement.classList.remove('start')
    hostChoiceElement.children[1].innerHTML = ''
    userChoiceElement.children[1].innerHTML = ''
    hostChoiceElement.classList.remove('winner')
    userChoiceElement.classList.remove('winner')
}

resetButton.addEventListener('click', resetGame)