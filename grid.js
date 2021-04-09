const gridSize = 21;
export function getRandomGridPosition(params) {
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random()* gridSize) + 1
    }
}
export function onSideGrid(snakeHead) {
    return (
        snakeHead.x < 1 || snakeHead.x > gridSize ||
        snakeHead.y < 1 || snakeHead.y > gridSize 
    )
}
