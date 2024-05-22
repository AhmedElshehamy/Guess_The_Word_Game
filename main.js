// Setting Game Name
const guessName = 'Guess The Word Game';
document.title = guessName
document.querySelector('h1').innerHTML = guessName
document.querySelector("footer span").innerHTML = `${guessName}`
document.querySelector("footer").appendChild(document.createTextNode("Created by Ahmed Ali Mohamed An Idea by Engineer Osama Elzero"))


// Setting Game Mode

let numbersOfTrees = 6
let numbersOfLetter = 6
let currentTrees = 1
let numberOfHint = 2

// Manage Words
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()
let messageArea = document.querySelector('.message')


// Mange Hints

document.querySelector('.hint span').innerHTML = numberOfHint

const getHintButton = document.querySelector('.hint')

getHintButton.addEventListener('click', handleHint)


function generateInput() {
    const inputContainer = document.querySelector('.inputs')
    // Create Main Div
    for (let i = 1; i <= numbersOfTrees; i++) {
        const tryDiv = document.createElement('div')
        tryDiv.classList.add(`try-${i}`)
        tryDiv.innerHTML = `<span>Try ${i}</span>`

        if (i !== 1) tryDiv.classList.add('disabled-input')

        // Create Inputs

        for (let j = 1; j <= numbersOfLetter; j++) {
            const input = document.createElement('input')
            input.type = 'text'
            input.id = `guess-${i}-letter-${j}`
            input.setAttribute('maxLength', "1")
            tryDiv.appendChild(input)
        }
        inputContainer.appendChild(tryDiv)
    }

    // Focus On First Input In First Try Element
    inputContainer.children[0].children[1].focus()
    const inputDisabledDiv = document.querySelectorAll('.disabled-input input')
    inputDisabledDiv.forEach((input) => {
        input.disabled = true
    })

    const inputs = document.querySelectorAll('input')
    inputs.forEach((input, index) => {
        // Convert Letter To UpperCase
        input.addEventListener('input', function () {
            this.value = this.value.toUpperCase()
        })

        input.addEventListener('keydown', function (event) {
            // console.log(event)

            const currentIndex = Array.from(inputs).indexOf(event.target) // Or This
            if (event.key == 'ArrowRight') {
                const nextInput = currentIndex + 1
                if (nextInput < inputs.length) inputs[nextInput].focus()
            }
            if (event.key == 'ArrowLeft') {
                const preInput = currentIndex - 1
                if (preInput >= 0) inputs[preInput].focus()
            }
        })

    })

}

const buttonGuess = document.querySelector('.check')
buttonGuess.addEventListener('click', handleGuess)

function handleGuess() {
    let successGuess = true
    console.log(wordToGuess)
    for (let i = 1; i <= numbersOfLetter; i++) {

        const inputField = document.querySelector(`#guess-${currentTrees}-letter-${i}`)
        const inputValue = inputField.value.toLowerCase()
        const actualLetter = wordToGuess[i - 1]

        // Logic Game

        if (inputValue === actualLetter) {

            inputField.classList.add('yes-in-place')

        } else if (wordToGuess.includes(inputValue) && inputValue !== '') {
            inputField.classList.add('no-in-place')
            successGuess = false
        } else {
            inputField.classList.add('no')
            successGuess = false
        }
    }

    if (successGuess) {
        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`

        if (numberOfHint === 2) {
            messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
        }
        // Add Disabled Class On All Try Divs
        let allTries = document.querySelectorAll('.inputs > div')
        allTries.forEach((input) => {
            input.classList.add('disabled-input')
        })

        buttonGuess.disabled = true
        getHintButton.disabled = true
    } else {
        document.querySelector(`.try-${currentTrees}`).classList.add('disabled-input')
        const currentTryInputs = document.querySelectorAll(`.try-${currentTrees} input`)
        currentTryInputs.forEach((input) => {
            input.disabled = true
        })
        currentTrees++

        const nextTryInputs = document.querySelectorAll(`.try-${currentTrees} input`)
        nextTryInputs.forEach((input) => {
            input.disabled = false
        })

        let el = document.querySelector(`.try-${currentTrees}`)
        if (el) {
            document.querySelector(`.try-${currentTrees}`).classList.remove('disabled-input')
            el.children[1].focus()
        } else {
            buttonGuess.disabled = true
            getHintButton.disabled = true
            messageArea.innerHTML = `You Loose The Word Is <span>${wordToGuess}</span>`
        }

    }
}

function handleHint() {

    if (numberOfHint > 0) {
        numberOfHint--
        document.querySelector('.hint span').innerHTML = numberOfHint
    }
    if (numberOfHint == 0) {
        document.querySelector('.hint span').innerHTML = ' '
        getHintButton.disabled = true
    }

    const enableInput = document.querySelectorAll('input:not([disabled])')
    console.log(enableInput)

    const emptyEnableInput = Array.from(enableInput).filter((input) => input.value == '')
    // console.log(emptyEnableInput)

    if (emptyEnableInput.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnableInput.length)
        // console.log(randomIndex)
        const randomInput = emptyEnableInput[randomIndex]
        // console.log(randomInput)
        const indexToFill = Array.from(enableInput).indexOf(randomInput)
        // console.log(indexToFill)

        if (indexToFill != -1) {
            randomInput.value = wordToGuess[indexToFill].toUpperCase()
        }
    }

}

function handleBackSpace(event) {

    if (event.key == 'Backspace') {
        const inputs = document.querySelectorAll('input:not([disabled])')
        const currentIndex = Array.from(inputs).indexOf(document.activeElement)

        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex]
            const preInput = inputs[currentIndex - 1]
            currentInput.value = ''
            preInput.value = ''
            preInput.focus()
        }
    }

}

document.addEventListener('keydown', handleBackSpace)
console.log(wordToGuess)
window.onload = () => {
    generateInput()
}

