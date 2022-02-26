const button = document.querySelectorAll('button');
const clickDown = new Audio('sounds/click-down.mp3');
const clickUp = new Audio('sounds/click-up.mp3');
const mute = document.getElementById('muted');
const muteContainer = document.querySelector('.mute');
const speaker = document.querySelector('.fas');

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

button.forEach(a=> {
    a.addEventListener('mousedown', playClick);
    a.addEventListener('mouseup', playClick);
});

function playClick(e) {
    console.log(mute.checked);
    if (mute.checked) return;
    if (e.type == 'mousedown') clickDown.play();
    else if (e.type == 'mouseup') clickUp.play();
}