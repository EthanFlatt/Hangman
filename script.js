/*----- constants -----*/

const wordsList = ['magnetic', 'eagle', 'champagne', 'heart', 'fragment']

/*----- state variables -----*/

let attempts = 6

/*----- cached elements  -----*/

const initializeButton = document.getElementById('initializeButton')
const hintButton = document.getElementById('hintButton')
const inputLetterBar = document.getElementById('inputLetterBar')
const inputLetterButton = document.getElementById('inputLetterButton')
const inputWordBar = document.getElementById('inputWordBar')
const inputWordButton = document.getElementById('inputWordButton')
const head = document.getElementById('head')
const torso = document.getElementById('torso')
const leftArm = document.getElementById('torso')
const rightArm = document.getElementById('rightArm')
const leftLeg = document.getElementById('leftLeg')
const rightLeg = document.getElementById('rightLeg')
const highScore = document.getElementById('highScore')
const round = document.getElementById('round')
const lettersGuessed = document.getElementById('lettersGuessed')
const word = document.getElementById('word')
/*----- event listeners -----*/

/*----- functions -----*/

function chooseWord() {
    let newWord = wordsList[Math.floor(Math.random() * wordsList.length)]
    word.innerText.appendChild(newWord)
}

chooseWord()

if (inputLetterBar.value.includes())