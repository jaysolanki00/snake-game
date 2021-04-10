import { getInputDirection } from "./input.js";

// 1 meaning 1 movement per second
export let snakeSpeed = 5;
// -ve y moves up +ve y moves down
export let snakeBody = [
    { x: 11, y:11 }
];

let newSegments = 0;

export function resetSnake() {
    snakeBody = [
        { x: 11, y:11 }
    ];
    newSegments = 0;
}

export function update() {
    addSegments();
    const direction = getInputDirection()
    for (let i = (snakeBody.length - 2); i >= 0; i--) {
        snakeBody[i+1] =  { ...snakeBody[i]}
    }
    snakeBody[0].x += direction.x;
    snakeBody[0].y += direction.y;
}
export function draw(gameBoard) {
    snakeBody.forEach((rib, i) => {
        const snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = rib.y;
        snakeEle.style.gridColumnStart = rib.x;
        snakeEle.classList.add('snake');
        snakeEle.classList.add('bg-success');
        if(i === 0) {
            snakeEle.classList.add('head');
        }
        gameBoard.appendChild(snakeEle);
    });
    document.getElementById('high-score').innerText = 'Score: ' + (snakeBody.length - 1) ;
}

export function expandSnake(amount) {
    newSegments = amount;
}

export function onSnake(foodPosition, { ignoreHead = false } = {}) {
    return snakeBody.some((rib, i) => {
        if(ignoreHead && i === 0) {
            return false;
        }
        return foodPosition.x === rib.x && foodPosition.y === rib.y
    })
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody , length-1 ]})
    }
    newSegments = 0;
}

export function getSnakeSpeed() {
    return snakeSpeed;
}

export function setSnakeSpeed(newSpeed) {
    snakeSpeed = newSpeed;
}
