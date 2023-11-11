const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreText");
const reseTbtn = document.getElementById("resetBtn");
const gameWidth = gameBoard.width;
const gameheight = gameBoard.height;

const boardBackground = "white";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false
let xVelocity = unitSize
let yVelocity = 0;
let foodX;
let foodY;
let score = 0
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
] 

window.addEventListener("keydown", changeDirection);
reseTbtn.addEventListener("click" , resetGame)

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()
}
function nextTick(){
    if(running){
        setTimeout(() =>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }else{
        displayGameOver()
    }
}
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0, gameWidth, gameheight)
}
function createFood(){
    function randomFood(min,max){
        const randNum = Math.round(Math.random() * (max-min) / unitSize) * unitSize
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
}
function moveSnake(){
    const head = {x:snake[0].x + xVelocity, y:snake[0].y + yVelocity}
    snake.unshift(head);
    // if food is eatten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1
        scoreText.textContent = score
        createFood()
    }else{
        snake.pop();
    }
}
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}
function changeDirection(event){
    const keyPressed = event.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    const goingUp = (yVelocity == -unitSize)
    const goingDown = (yVelocity == unitSize)
    const goingLeft = (xVelocity == unitSize)
    const goingRight = (yVelocity == -unitSize)

    switch(true){
        case(keyPressed == left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break
        case(keyPressed == up && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break    
        case(keyPressed == right && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break    
        case(keyPressed == down && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break    
    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            running = false
            break
        case(snake[0].x >= gameWidth):
            running = false
            break
        case(snake[0].y < 0):
            running = false
            break
        case(snake[0].y >= gameheight):
            running = false
            break
    }
    for(let i = 1 ;i < snake.length ; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running =  false
        }
    }
}
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game over !", gameWidth / 2, gameheight / 2)
    running = false
}
function resetGame(){
    score = 0
    xVelocity = unitSize
    yVelocity = 0
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ]
    gameStart(); 
}






