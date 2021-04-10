import { snakeSpeed, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, resetSnake, getSnakeSpeed, setSnakeSpeed } from './snake.js'
import { update as updateFood, draw as drawFood, resetFood, getExpansionRate, setExpansionRate } from './food.js'
import { onSideGrid } from './grid.js';
import { resetInputDirection } from './input.js';

let lastRenderTime = null;
let gameOver = false;
let gamePaused = false
const gameCanvas = document.getElementById('game-canvas');
// gameCanvas.classList.add('bg-light')
// gameCanvas.classList.add('border-danger')

window.addEventListener('keydown', e => {
    if(['Escape', ' '].includes(e.key)) {
        gamePaused = !gamePaused;
    }
    if(gamePaused && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        gamePaused = false;
        // startGame();
    }
})

function startGame() {
    function main(currentTime) {
        if (gameOver) {
            gameCanvas.innerText = '';
            printStringOnCanvas('GAME OVER!', 10)
            showNewGame()
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
    
    window.requestAnimationFrame(main);
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

function startNewGame() {
    lastRenderTime = null;
    gameOver = false;
    gamePaused = true;
    resetInputDirection();
    resetSnake();
    resetFood();
    startGame();
};

showNewGame();

function showNewGame() {
    const newGame = document.createElement('button');
    newGame.style.gridRowStart = 13;
    newGame.style.gridColumnStart = 7;
    newGame.style.gridColumnEnd = 16;
    newGame.classList.add('btn');
    newGame.classList.add('btn-success');
    newGame.addEventListener('click', e => {
        if(gameOver) {
            startNewGame();
            update();
            draw();
        } else {
            startGame()
        }
    })
    newGame.style.fontWeight = 'bold';
    newGame.innerText = 'New Game';
    gameCanvas.appendChild(newGame); 
    !gameOver && printStringOnCanvas('__Start__', 10);
    printStringOnCanvas('__Speed__', 14);
    printStringOnCanvas('__Growth_', 16);
    const speed = document.createElement('input');
    speed.type = 'range';
    speed.min = 5;
    speed.max = 10;
    speed.value = getSnakeSpeed();
    speed.style.gridRowStart = 15;
    speed.style.gridColumnStart = 7;
    speed.style.gridColumnEnd = 16;
    speed.addEventListener('change', e => {
        setSnakeSpeed(e.target.value)
    })
    gameCanvas.appendChild(speed); 
    const growth = document.createElement('input');
    growth.type = 'range';
    growth.min = 1;
    growth.max = 5;
    growth.value = getExpansionRate();
    growth.style.gridRowStart = 17;
    growth.style.gridColumnStart = 7;
    growth.style.gridColumnEnd = 16;
    growth.addEventListener('change', e => {
        setExpansionRate(e.target.value)
    })
    gameCanvas.appendChild(growth); 

}

function printStringOnCanvas(str, rowStart) {
    str.split('').forEach((letter, i) => {
        const lEl = document.createElement('div');
        lEl.style.gridRowStart = rowStart;
        lEl.style.gridColumnStart = i+7;
        lEl.style.fontWeight = 'bold';
        lEl.innerText = letter
        gameCanvas.appendChild(lEl); 
    })
    gameCanvas.classList.add('game-over')
}
