const button = document.querySelectorAll('button');
const clickDown = new Audio('sounds/click-down.mp3');
const clickUp = new Audio('sounds/click-up.mp3');
const mute = document.getElementById('muted');
const muteContainer = document.querySelector('.mute');
const speaker = document.querySelector('.fas');
const screen = document.querySelector('.screen');

mute.addEventListener('change', fadeIcon);
function fadeIcon() {
    if (mute.checked == true) {
        console.log('muted');
        speaker.classList.add('fa-volume-mute');
        speaker.classList.remove('fa-volume-up');
        speaker.style = 'color:rgba(0,0,0,.3);'
        muteContainer.setAttribute('title', 'Sound off')
    } else {
        console.log('unmuted');
        speaker.classList.add('fa-volume-up');
        speaker.classList.remove('fa-volume-mute');
        speaker.style = 'color:inherit;'
        muteContainer.setAttribute('title', 'Sound on')
    }
}

button.forEach(a => {
    a.addEventListener('mousedown', playClick);
    a.addEventListener('mouseup', playClick);
});

function playClick(e) {
    if (mute.checked) return;
    if (e.type == 'mousedown') clickDown.play();
    else if (e.type == 'mouseup') clickUp.play();
}


// Convert button clicks to digits




// Press key, stored in num array
// Press operator, stored in var

let numbers = [];



// Press key, stored in num2 array
// Press enter, call operate()

// Add, subtract, multiply, divide

function add(arr) {
    let x = arr[0];
    let y = arr[1];
    return x + y; 
}

function subtract(arr) {
    let x = arr[0];
    let y = arr[1];
    return x - y;
}

function multiply(arr) {
    let x = arr[0];
    let y = arr[1];
    return x * y;
}

function divide(arr) {
    let x = arr[0];
    let y = arr[1];
    return x / y;
}

// Operate function takes operator and 2 numbers, calls function on them
// Function populates display on button click
// Operate: store number, store operator, call function on "=", store in temp on other operation
// Show answer in display



// Press number key, stored in digit array
const numKey = document.querySelectorAll('.num-key');
numKey.forEach(a => {
    a.addEventListener('click', logDigit.bind(a));
});

// If digit array includes decimal, return on next decimal press
const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', function(e){
    if (enteredDigits.includes('.')) return;
    else logDigit(e);
});

let enteredDigits = [];

function logDigit(e) {
    enteredDigits.push(e.target.innerText);
    console.log('entered digits: ' + enteredDigits);
}

// Press operator key, stored in operator variable
const operatorKey = document.querySelectorAll('.operator-key');
operatorKey.forEach(a => {
    a.addEventListener('click', logOperator.bind(a));
});

let operator = '';

function logOperator() {
    operator = this.classList[0];
    numbers.push(parseInt(enteredDigits.join('')));
    console.log(operator);
    console.log(numbers);
    enteredDigits = [];
}

// Digit array converted to number, stored in number array
// Digit array cleared
// Next digits entered stored in digit array
// On equals OR next operator, digit array converted to number, stored in number array
// Show answer in display
// Digit array cleared
// Call operate() with number array and operator
// Save answer in answer variable
// clear number array
// If "equals", display answer
// If "operator", answer is stored in number array

// On clear, clear digit array
// On all clear, clear digit array and number array