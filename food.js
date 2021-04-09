import { getRandomGridPosition } from "./grid.js";
import { expandSnake, onSnake } from "./snake.js";

let food = getRandomFoodPos();
const expansionRate = 1;
let isVisible = false;

export function update() {
    if(onSnake(food)) {
        expandSnake(expansionRate);
        food = getRandomFoodPos();
    }
}
export function draw(gameBoard) {
    if(!isVisible) {
        const foodEle = document.createElement('div');
        foodEle.style.gridRowStart = food.y;
        foodEle.style.gridColumnStart = food.x;
        foodEle.classList.add('food');
        gameBoard.appendChild(foodEle);    
    }
    isVisible = !isVisible;
}

function getRandomFoodPos() {
    let newFoodPos;
    while(newFoodPos == null || onSnake(newFoodPos)) {
        newFoodPos = getRandomGridPosition();
    }
    return newFoodPos;
}
