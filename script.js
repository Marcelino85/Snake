//board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//sneke head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = []

//food
let foodX ;
let foodY ;

let gameOver = false;


window.onload = function(){
  board = document.getElementById('board');
  board.height = rows * blockSize;
  board.width = cols * blockSize
  context = board.getContext('2d') //used for drawing on the board
  
  placeFood()
  document.addEventListener('keyup', changeDirection);

  // update();
  setInterval(update, 1000/10); //100 milliseconds

} 

function update(){
  if (gameOver){
    return;
  }


  context.fillStyle = 'black'
  context.fillRect(0,0,board.width, board.height)

  context.fillStyle = 'red'
  context.fillRect(foodX, foodY, blockSize,blockSize)

  if (snakeX == foodX && snakeY == foodY){
    snakeBody.push([foodX,foodY])
    placeFood();
  }
 
 for(let i = snakeBody.length - 1; i > 0;i--){
   snakeBody[i] = snakeBody[i-1]
 }
 if(snakeBody.length){
   snakeBody[0] = [snakeX, snakeY];
 }
 

  context.fillStyle = 'lime' 
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY,blockSize, blockSize)

  for(let i = 0; i < snakeBody.length; i++){
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
  }
  
 //game over conditions
 if(snakeX < 0 || snakeX > cols*blockSize ||snakeY < 0 || snakeY > rows*blockSize){
   gameOver = true
   alert('Game Over!')
 } 

  for(let i = 0; i < snakeBody.length; i++){
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
      gameOver = true;
      alert('Game Over!')
    }
  }
  
}

function changeDirection(e){
  if(e.code == 'ArrowUp' && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
  }

   else if(e.code == 'ArrowDown' && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
  }

   else if(e.code == 'ArrowLeft' && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }

   else if(e.code == 'ArrowRight' && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
  }     
}  
 
function placeFood(){
    //0-1) *cols -> (0-19.9999) -> (0-19) * 25  
    foodX =  Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random()* rows) * blockSize; 
}         

// FUNCTION FOR RELOAD
function recarregar(){
  window.location.reload()
}

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('keydown', changeDirection);
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (event.touches.length === 0) {
    return;
  }

  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Defina um limiar para evitar mudanças de direção acidentais
  const threshold = 20;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Mover horizontalmente
    if (deltaX > threshold && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    } else if (deltaX < -threshold && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    }
  } else {
    // Mover verticalmente
    if (deltaY > threshold && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (deltaY < -threshold && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    }
  }

  // Atualize as coordenadas de início para o próximo movimento
  touchStartX = touchEndX;
  touchStartY = touchEndY;
}


// Controle do game
// ...

// Adicione um listener de clique para cada botão de controle
document.getElementById('upButton').addEventListener('click', () => {
  if (velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  }
});

document.getElementById('downButton').addEventListener('click', () => {
  if (velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
});

document.getElementById('leftButton').addEventListener('click', () => {
  if (velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  }
});

document.getElementById('rightButton').addEventListener('click', () => {
  if (velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
});

// ...
