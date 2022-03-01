const buttons = document.querySelectorAll('button');
const clickDown = new Audio('sounds/click-down.mp3');
const clickUp = new Audio('sounds/click-up.mp3');
const mute = document.getElementById('muted');
const muteContainer = document.querySelector('.mute');
const speaker = document.querySelector('.fas');

// UI Elements
mute.addEventListener('change', fadeIcon);
function fadeIcon() {
    if (mute.checked == true) {
        speaker.classList.add('fa-volume-mute');
        speaker.classList.remove('fa-volume-up');
        speaker.style = 'color:rgba(0,0,0,.3);'
        muteContainer.setAttribute('title', 'Sound off')
    } else {
        speaker.classList.add('fa-volume-up');
        speaker.classList.remove('fa-volume-mute');
        speaker.style = 'color:inherit;'
        muteContainer.setAttribute('title', 'Sound on')
    }
}

buttons.forEach(a => {
    a.addEventListener('mousedown', playClick);
    a.addEventListener('mouseup', playClick);
});

function playClick(e) {
    if (mute.checked) return;
    if (e.type == 'mousedown') clickDown.play();
    else if (e.type == 'mouseup') clickUp.play();
}

/**
// Convert button clicks to digits



// Press key, stored in num array
// Press operator, stored in var

let numbers = [];



// Press key, stored in num2 array
// Press enter, call operate()



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

let displayContents = '';

function logDigit(e) {
    enteredDigits.push(e.target.innerText);
    displayContents += e.target.innerText;
    screen.innerText = displayContents;
    console.log('entered digits: ' + enteredDigits);
}


// Press operator key, stored in operator variable
const operatorKey = document.querySelectorAll('.operator-key');
operatorKey.forEach(a => {
    a.addEventListener('click', logOperator.bind(a));
});

let operator;

function logOperator() {
    if (!enteredDigits.length) return;
    if (operator) {
        operate();
        clearScreen();
    }
    operator = this.dataset.operation;
    document.querySelectorAll('.active-operator').forEach(a=>a.classList.remove('active-operator'));
    this.classList.add('active-operator');
    convertToNumber();
    console.log(operator);
// Digit array cleared, next digits entered stored in digit array
    enteredDigits = [];
    displayContents = '';
}

// Digit array converted to number, stored in number array
function convertToNumber() {
    if (enteredDigits.includes('.')) numbers.push(parseFloat(enteredDigits.join('')));
    else numbers.push(parseInt(enteredDigits.join('')));
    console.log('numbers: ' + numbers);
}

// If operator is not undefined, continue
// On equals OR next operator, call operate() with number array and operator
const equals = document.querySelector('.equals');
equals.addEventListener('click', showAnswer);

let answer;
function operate() {
    convertToNumber();
// Save answer in answer variable
    switch (operator) {
        case 'plus':
            answer = add(numbers);
            break;
        case 'minus':
            answer = subtract(numbers);
            break;
        case 'times':
            answer = multiply(numbers);
            break;
        case'divide':
            answer = divide(numbers);
            break;
        default:
            console.log('no operator');
            return;
    }
    enteredDigits = [];
    document.querySelectorAll('.active-operator').forEach(a=>a.classList.remove('active-operator'));
    operator = '';
    numbers = [answer];
    console.log(numbers);
    return answer;
}

// Show answer in display
function showAnswer() {
    operate();
    console.log(answer);
    displayContents = answer;
    screen.innerText = displayContents;
}

// clear number array
// If "equals", display answer
// If "operator", answer is stored in number array

// On clear, clear digit array

document.querySelector('.clear').addEventListener('click', clear);
document.querySelector('.all-clear').addEventListener('click', allClear);

function clearScreen() {
    displayContents = `​`; // zero-width character
    screen.innerText = displayContents;
}

function clear() {
    enteredDigits = [];
    clearScreen();
}
function allClear() {
    enteredDigits = [];
    numbers = [];
    operator = '';
    answer = null;
    clearScreen();
}
// On all clear, clear digit array and number array
*/

// CLEAN SLATE

const screen = document.querySelector('.screen');
let currentNum = '';
let numbers = [];
let operator = '';
let answer = 0;


// Function to take in numbers
// turn key presses into digits
document.querySelectorAll('.num-key').forEach(a => a.addEventListener('click', logDigit));
function logDigit(e) {
    console.log('(logDigit) the current number is \'' + currentNum + '\'');
    // Clear highlighted operator on next key press
    removeActiveOperator();
    // Include decimal
    if (e.target.innerText == '.' && currentNum.indexOf('.') >= 0) return;
    // Cancel if too long    
    if (screen.offsetWidth >= 170) return showTooLongPopup();
    console.log('updating screen...');
    updateScreen(currentNum);
    // turn digits into numbers
    console.log(currentNum);
    currentNum += e.target.innerText; 
    console.log(currentNum);
    // Display on screen
    if (currentNum == '.') currentNum = '0.';
    console.log('updating screen AGAIN...');
    updateScreen(currentNum);
    console.log('(logDigit) the current number is \'' + currentNum + '\''); //test
}
function updateScreen(text) {
    let screenText = text;
    screen.innerText = screenText;
}
function showTooLongPopup() {
    document.querySelector('.too-long-popup').classList.add('show-popup');
    setTimeout(() => {
        document.querySelector('.too-long-popup').classList.remove('show-popup');
    }, 1000);
}
const operatorKeys = document.querySelectorAll('.operator-key');
// Function to take operator
operatorKeys.forEach(a => a.addEventListener('click', setOperator));
// turn key press into operation
function setOperator(e) {
    console.log('setting operator'); //test
    if (!currentNum) return;
    setNumbers();
    if (numbers.length >= 2) operate();
    operator = e.target.dataset.operation;
    console.log(operator);
    // Highlight active operator
    removeActiveOperator();
    e.target.classList.add('active-operator');
}
function removeActiveOperator() {
    operatorKeys.forEach(a => a.classList.remove('active-operator'));
}
function setNumbers() {
    console.log('setnumbers: the current num is \'' + currentNum + '\'');
    if (!currentNum) return;
    numbers.push(parseFloat(currentNum));
    currentNum = '';
    console.log('setnumbers: the current num is now \'' + currentNum + '\'');
}
function clearNumbers() {
    numbers = [];
}
// Function to calculate from two numbers and operator
document.querySelector('.equals').addEventListener('click', operate);
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

function operate() {
    console.log(numbers);//test
    console.log(numbers.length);//test
    if (numbers.length < 1) return;
    setNumbers();
    if (numbers.length < 2) return;
    console.log(numbers);
    switch (operator) {
        case 'plus':
            answer = add(numbers);
            break;
        case 'minus':
            answer = subtract(numbers);
            break;
        case 'times':
            answer = multiply(numbers);
            break;
        case'divide':
            answer = divide(numbers);
            break;
        default:
            console.log('no operator');
            return;
    }
// set answer as new number 1
console.log('setting currentnum to answer');//test
    currentNum = answer;
// Function to display answer on screen
    updateScreen(currentNum);
    clearNumbers();
    setNumbers();
    currentNum = '';
}

// Set up fn keys
    // % => divide current number by 100
    // sqrt => math sqrt on current number
// delete => slice screen contents
document.querySelector('.delete').addEventListener('click', backspace);
function backspace() {
    currentNum = currentNum.slice(0, -1);
    if (!currentNum)  return updateScreen('0');
    updateScreen(currentNum);
}
// clear screen
document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelector('.all-clear').addEventListener('click', allClear);
function clearScreen() {
    currentNum = '';
    updateScreen('0');
}
function allClear() {
    currentNum = '';
    updateScreen('0');
    clearNumbers();
}