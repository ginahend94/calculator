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


document.querySelectorAll('.num-key').forEach(a => {
    a.addEventListener('click', logDigit.bind(a))
})

// Convert button clicks to digits

let enteredDigits = [];

function logDigit() {
    enteredDigits.push(parseInt(this.innerText));
    console.log(enteredDigits);
}

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
function operate(arr, operator) {

}

// Function populates display on button click
// Operate: store number, store operator, call function on "="
// Show answer in display