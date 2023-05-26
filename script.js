/*----- constants -----*/

const getDictionary = async () => {
    const dictionary = await axios.get('https://random-word-api.vercel.app/api?words=1')
    console.log(dictionary.data[0])
    return dictionary.data[0]
    }

/*----- state variables -----*/

let attempts = 6
let guessedLettersArray = []
let guessedWord = ''
let highScoreHolder = 1
let roundHolder = 1
let selectedWord = ''

/*----- cached elements  -----*/

const startButton = document.getElementById('startButton')
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
const bottomButtons = document.querySelector('.bottomButtons')

/*----- event listeners -----*/

startButton.addEventListener('click', function() {
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

inputLetterBar.addEventListener('keypress', async (e)=> {
    if (e.key === 'Enter') {
        e.preventDefault()
        guessLetter()
        displayWord()
        win()
        inputLetterBar.value = ''
    }   
})

inputWordBar.addEventListener('keypress', async (e)=> {
    if (e.key === 'Enter') {
        e.preventDefault()
        guessWord()
        displayWord()
        win()
        inputWordBar.value = ''
    }   
})

/*----- functions -----*/

// Displays state of word
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

// Evaluates user guess letter
function guessLetter() {
    let guess = inputLetterBar.value.toLowerCase()
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


// Evaluates user guess word
function guessWord() {
    let guess = inputWordBar.value.toLowerCase()
    if (guess === selectedWord) {
        guessedWord = guess
    } else {
        attempts--
        hangman()
    }
}

// Used to make body appear, and used if game is lost
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
        wordDisplay.innerText = `You lose. The word was ${selectedWord}`
        bottomButtons.style.visibility = 'hidden'
        }
}

// Used if game is won
function win() {
    if (guessedWord || wordDisplay.innerText === selectedWord) {
        roundHolder++
        round.innerText = `Round: ${roundHolder}`
        if (roundHolder > highScoreHolder) {
            highScoreHolder++
            highScore.innerText = `High score: ${highScoreHolder}` 
        }
        wordDisplay.innerText = "You win! Next round"
        setTimeout(function() {
            finishRound()
        }, 750)
    }
}

// Used if user clicks start over button
async function reset() {
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
    bottomButtons.style.visibility = 'visible'
    selectedWord = await getDictionary()
    displayWord()

}

// Used if user finishes round
async function finishRound() {
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
    selectedWord = await getDictionary()
    displayWord()
}

// Used to reset the letters guessed on the board
function resetLettersGuessed() {
    guessedLettersArray = []
    lettersGuessed.innerText = 'Letters guessed: '
}

reset()