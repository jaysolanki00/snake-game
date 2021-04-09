import { snakeSpeed, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { onSideGrid } from './grid.js';

let lastRenderTime = null;
let gameOver = false;
let gamePaused = false
const gameCanvas = document.getElementById('game-canvas')

function main(currentTime) {
    if (gameOver) {
        gameCanvas.innerText = '';
        'YOU LOOSE'.split('').forEach((letter, i) => {
            const lEl = document.createElement('div');
            lEl.style.gridRowStart = 10;
            lEl.style.gridColumnStart = i+7;
            lEl.style.fontWeight = 'bold';
            lEl.innerText = letter
            gameCanvas.appendChild(lEl); 
        })
        gameCanvas.classList.add('game-over')
        return;
    }
    
    window.requestAnimationFrame(main);
    if(gamePaused) {
        return;
    }
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed ) { return }
    lastRenderTime = currentTime;
    update();
    draw();
}

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}
function draw() {
    gameCanvas.innerHTML = ''
    drawSnake(gameCanvas);
    drawFood(gameCanvas);
}

function checkDeath() {
    gameOver = onSideGrid(getSnakeHead()) || snakeIntersection()
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    if(['Escape', ' '].includes(e.key)) {
        gamePaused = !gamePaused;
    }
})
