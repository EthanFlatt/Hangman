/*----- constants -----*/

const wordsList = ['magnetic', 'eagle', 'champagne', 'heart', 'fragment']

/*----- state variables -----*/

let attempts = 6
let guessedLettersArray = []
let guessedWord = ''

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
const roundSpan = document.getElementById('roundSpan')
const lettersGuessedSpan = document.getElementById('lettersGuessedSpan')
const wordDisplay = document.getElementById('wordDisplay')

/*----- event listeners -----*/

initializeButton.addEventListener('click', function() {
    reset()
})

inputLetterButton.addEventListener('click', function() {
    guessLetter()
    displayWord()
    inputLetterBar.value = ''
})

inputWordButton.addEventListener('click', function() {
    guessWord()
    displayWord()
    inputWordBar.value = ''
})

/*----- functions -----*/

let selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)]

lettersGuessedSpan.innterText = guessedLettersArray

// display state of word
function displayWord() {
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
    }
}

displayWord()

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
    win()
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
    win()
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
        round.innerText = 1
        }
}
function win() {
    if (guessedWord || wordDisplay.innerText === selectedWord) {
        roundSpan.innerText + 1
        if (roundSpan.innerText > highScore.innerText) {
            highScore.innerText + 1
        }
        console.log('I win')
        reset()
    }
    
    
}

function reset() {
    attempts = 6
    guessedLettersArray = []
    guessedWord = ''
    roundSpan === 1
    head.style.opacity = '0'
    torso.style.opacity = '0'
    leftArm.style.opacity = '0'
    rightArm.style.opacity = '0'
    leftLeg.style.opacity = '0'
    rightLeg.style.opacity = '0'
    displayWord()
    selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)]
    
}

