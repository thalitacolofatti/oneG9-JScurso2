let secretNumbersArray = [];
let limit = 10;
let secretNumber = createRandomNumber();
let attempts = 1;

function showTextInInterface(tag, text) {
    let content = document.querySelector(tag);
    content.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female', {rate:1.2} );
}

function showInitialMessage(){
    showTextInInterface('h1', 'Secret Number Game');
        showTextInInterface('p', `Choose a number between 1 and ${limit}`);
}

function createRandomNumber() {
    let chosenNumber = parseInt(Math.random() * limit + 1);
    let arrayElements = secretNumbersArray.length;
    
    if (arrayElements == limit) {
        secretNumbersArray = [];
    } if (secretNumbersArray.includes(chosenNumber)) {
        return createRandomNumber();
    } else {
        secretNumbersArray.push(chosenNumber);
        return chosenNumber;
    }
}

showInitialMessage();

function checkGuess() {
    let guess = document.querySelector('input').value;
    if (guess == secretNumber) {
        showTextInInterface('h1', 'Awesome!!!');
        let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
        let attempsMessage = `You guessed the secret number with ${attempts} ${attemptWord}!`;
        showTextInInterface('p', attempsMessage);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            showTextInInterface('p', 'The secret number is smaller!');
        } else {
            showTextInInterface('p', 'The secret number is bigger!');
        }
        attempts++;
        cleanContent();
    }
}

function cleanContent() {
    guess = document.querySelector('input');
    guess.value = '';
}

function restartGame() {
    secretNumber = createRandomNumber();
    cleanContent();
    attempts = 1;
    showInitialMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}
