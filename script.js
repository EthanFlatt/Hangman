/*----- constants -----*/

const wordsList = ['magnetic', 'eagle', 'champagne', 'heart', 'fragment']

/*----- state variables -----*/

let attempts = 6
let guessedLettersArray = []
let guessedWord = ''
let highScoreHolder = 1
let roundHolder = 1
let selectedWord = ''

/*----- cached elements  -----*/

const initializeButton = document.getElementById('initializeButton')
const hintButton = document.getElementById('hintButton')
const inputLetterBar = document.getElementById('inputLetterBar')
const inputLetterButton = document.getElementById('inputLetterButton')
const inputWordBar = document.getElementById('inputWordBar')
const inputWordButton = document.getElementById('inputWordButton')
const head = document.getElementById('head')
const torso = document.getElementById('torso')
const leftArm = document.getElementById('leftArm')
const rightArm = document.getElementById('rightArm')
const leftLeg = document.getElementById('leftLeg')
const rightLeg = document.getElementById('rightLeg')
const highScore = document.getElementById('highScore')
const round = document.getElementById('round')
const lettersGuessed = document.getElementById('lettersGuessed')
const wordDisplay = document.getElementById('wordDisplay')

/*----- event listeners -----*/

initializeButton.addEventListener('click', function() {
    reset()
})

inputLetterButton.addEventListener('click', function() {
    guessLetter()
    displayWord()
    win()
    inputLetterBar.value = ''
})

inputWordButton.addEventListener('click', function() {
    guessWord()
    displayWord()
    win()
    inputWordBar.value = ''
})

/*----- functions -----*/

// display state of word
function displayWord() {
    console.log('displayWord')
    let word = ''
    if (attempts > 0) {
        for (let i = 0; i <selectedWord.length; i++) {
            if (guessedLettersArray.includes(selectedWord[i])) {
                word += selectedWord[i]
            } else { 
                word += "_"
            }
        }  
        if (guessedWord === selectedWord) {
            word  = selectedWord
        }  

        wordDisplay.innerText = word
        console.log('h2', wordDisplay.innerText)
    }
}

// Evaluate user guess letter
function guessLetter() {
    let guess = inputLetterBar.value
    if (guessedLettersArray.includes(guess)) {
        alert('You already guessed that letter.')
        return
    } else if (!selectedWord.includes(guess)) {
        attempts--
        hangman()
    } 
    guessedLettersArray.push(guess)
    lettersGuessed.innerText = `Letters guessed: ${guessedLettersArray.join(' ')}`
}


// evaluate user guess word
function guessWord() {
    let guess = inputWordBar.value
    if (guess === selectedWord) {
        guessedWord = guess
    } else {
        attempts--
        hangman()
    }
}

// make body appear
function hangman() {
    if (attempts === 5) {head.style.opacity = '1'
        head.style.transition = '0.5s'}
    if (attempts === 4) {torso.style.opacity = '1' 
        torso.style.transition = '0.5s'}
    if (attempts === 3) {leftArm.style.opacity = '1'
        leftArm.style.transition = '0.5s'}
    if (attempts === 2) {rightArm.style.opacity = '1'
        rightArm.style.transition = '0.5s'}
    if (attempts === 1) {leftLeg.style.opacity = '1'
        leftLeg.style.transition = '0.5s'}
    if (attempts === 0) {rightLeg.style.opacity = '1'
        rightLeg.style.transition = '0.5s'
        wordDisplay.innerText = "You lose"
        }
}
function win() {
    console.log('win')
    if (guessedWord || wordDisplay.innerText === selectedWord) {
        roundHolder++
        round.innerText = `Round: ${roundHolder}`
        if (roundHolder > highScoreHolder) {
            highScoreHolder++
            highScore.innerText = `High score: ${highScoreHolder}` 
        }
        wordDisplay.innerText = "You win! Next round"
        console.log('h1', wordDisplay.innerText)
        setTimeout(function() {
            finishRound()
        }, 500)
        
    }
    
    
}

function reset() {
    attempts = 6
    resetLettersGuessed()
    guessedWord = ''
    roundHolder = 1
    round.innerText = `Round: ${roundHolder}`
    head.style.opacity = '0'
    torso.style.opacity = '0'
    leftArm.style.opacity = '0'
    rightArm.style.opacity = '0'
    leftLeg.style.opacity = '0'
    rightLeg.style.opacity = '0'
    selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)]
    displayWord()

}

function finishRound() {
    attempts = 6
    resetLettersGuessed()
    guessedWord = ''
    round.innerText = `Round: ${roundHolder}`
    head.style.opacity = '0'
    torso.style.opacity = '0'
    leftArm.style.opacity = '0'
    rightArm.style.opacity = '0'
    leftLeg.style.opacity = '0'
    rightLeg.style.opacity = '0'
    selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)]
    displayWord()
}

function resetLettersGuessed() {
    guessedLettersArray = []
    lettersGuessed.innerText = 'Letters guessed: '
}

reset()