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
const round = document.getElementById('round')
const lettersGuessed = document.getElementById('lettersGuessed')
const wordDisplay = document.getElementById('wordDisplay')

/*----- event listeners -----*/

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
    // wordDisplay.innerText = selectedWord
    // wordDisplay.style.opacity = 1


// display state of word
function displayWord() {
    let word = ''
    for (let i = 0; i <selectedWord.length; i++) {
        if (guessedLettersArray.includes(selectedWord[i])) {
            word += selectedWord[i]
        } else if (guessedWord === selectedWord) {
            word += selectedWord
        } else { 
            word += "_"
        }
    }   
    wordDisplay.innerText = word
}

displayWord()

// Evaluate user guess letter
function guessLetter() {
    let guess = inputLetterBar.value
    if (guessedLettersArray.includes(guess)) {
        alert('You already guessed that letter.')
        return
    }
    guessedLettersArray.push(guess)

    if (!selectedWord.includes(guess)) {
        attempts--
        hangman()
    }
    
}

// evaluate user guess word
function guessWord() {
    let guess = inputWordBar.value
    if (guess === selectedWord) {
        guessedWord += guess
    }
}

function hangman() {
    if (attempts === 5) {head.style.opacity = '1'}
    if (attempts === 4) {torso.style.opacity = '1'}
    if (attempts === 3) {leftArm.style.opacity = '1'}
    if (attempts === 2) {rightArm.style.opacity = '1'}
    if (attempts === 1) {leftLeg.style.opacity = '1'}
    if (attempts === 0) {rightLeg.style.opacity = '1'}
}

// when word is complete
// function win() {
//     if ()
// }



// Game over
// if (attempts === 0) {
    // display game over
// }