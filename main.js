// スクリプト全体の厳格モード構文
'use strict';
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});

function startGame() {
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}
function stopGame() {

}
function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}
function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}
function showStopButton() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');

}
function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
}
function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            return;
        }
        updateTimerText(--remainingTimeSec);

    }, 1000);


}
function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNum(x1, x2);
        const y = randomNum(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

