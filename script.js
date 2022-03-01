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
    if (e.type == 'mousedown' || e.type == 'keydown') clickDown.play();
    else if (e.type == 'mouseup' || e.type == 'keyup') clickUp.play();
}

// Calculator code

const screen = document.querySelector('.screen');
let currentNum = '';
let numbers = [];
let operator = '';
let answer = 0;


// Function to take in numbers
// turn key presses into digits
document.querySelectorAll('.num-key').forEach(a => a.addEventListener('click', logDigit));
function logDigit(e) {
    // Check if equals was pressed, clears numbers
    if (pressedEquals) {
        clearNumbers();
        pressedEquals = false;
    }
    // Clear highlighted operator on next key press
    removeActiveOperator();
    // Include decimal
    if (e.target.value == '.' && currentNum.indexOf('.') >= 0) return;
    // Cancel if too long    
    if (screen.offsetWidth >= 170) return showTooLongPopup();
    updateScreen(currentNum);
    // turn digits into numbers
    currentNum += e.target.value;
    // Display on screen
    if (currentNum == '.') currentNum = '0.';
    updateScreen(currentNum);
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
    if (!currentNum && currentNum != 0) return;
    setNumbers();
    if (numbers.length >= 2) operate();
    operator = e.target.value;
    // Highlight active operator
    removeActiveOperator();
    e.target.classList.add('active-operator');
}
function removeActiveOperator() {
    operatorKeys.forEach(a => a.classList.remove('active-operator'));
}
function setNumbers() {
    if (!currentNum && currentNum != 0) return;
    console.log(currentNum);
    numbers.push(parseFloat(currentNum));
    currentNum = '';
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

let divideByZero = 0;
let pressedEquals = false;
function operate(e) {
    console.log(numbers);//test
    if (numbers.length < 1) return;
    setNumbers();
    if (numbers.length < 2) return;
    switch (operator) {
        case '+':
            answer = add(numbers);
            break;
        case '-':
            answer = subtract(numbers);
            break;
        case '*':
            answer = multiply(numbers);
            break;
        case '/':
            if (numbers[1] == 0) {
                updateScreen('No can do, babes.');
                ++divideByZero;
                if (divideByZero >= 3) {
                    updateScreen('Seriously? Come on, pal.');
                }
                if (divideByZero == 42) updateScreen('Persistent, aren\'t we?');
                return allClear();
            }
            answer = divide(numbers);
            break;
        default:
            console.log('no operator');
            return;
    }
// set answer as new number 1
    currentNum = answer;
// Function to display answer on screen
    updateScreen(currentNum);
    clearNumbers();
    setNumbers();
    currentNum = '';
    if (e.target.value == 'equals') {
        pressedEquals = true;
    }
}

// Set up fn keys
    // % => divide current number by 100
document.querySelector('.percent').addEventListener('click', percent);
function percent() {
    if (!currentNum) return;
    currentNum /= 100;
    console.log(currentNum);
    updateScreen(currentNum);
}
    // sqrt => math sqrt on current number
document.querySelector('.sqrt').addEventListener('click', sqrt);
function sqrt() {
    if (!currentNum) return;
    currentNum = Math.sqrt(currentNum);
    console.log(currentNum);
    updateScreen(currentNum);
}
    //pi 
document.querySelector('.pi').addEventListener('click', pi);
function pi() {
    currentNum = Math.PI;
    updateScreen(currentNum);
}

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
    operator = null;
}

// Allow keyboard input
document.addEventListener('keydown', registerKeyboard);
document.addEventListener('keyup', registerKeyboard);
function registerKeyboard(e) {
    // Find corresponding key on calculator
    const findKey = query => {
       return Array
            .from(document.querySelectorAll(query))
            .find(a => a.value == e.key);
    }
    // Number keys
    if (e.keyCode >= 48 && e.keyCode <= 57 
        || e.keyCode >= 96 && e.keyCode <= 105) {
        simulateClick(e, findKey('.num-key'));
    }
    // Operation keys
    const operationKeyCodes = ['+','-','*','/'];
    if (operationKeyCodes.includes(e.key)) {
        simulateClick(e, findKey('.operator-key'));
    }
    if (e.key == '=' || e.key == 'Enter') {
        simulateClick(e, document.querySelector('.equals'));
    }
}
function simulateClick(e, target) {
    if (e.repeat) return;
    if (e.type == 'keydown') {
        target.classList.add('button-active');
    } else if (e.type == 'keyup') {
        target.classList.remove('button-active');
    }
    playClick(e);
}