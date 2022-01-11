let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
gameOver = false;


const checkDeath = () => {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

const update = () => {
  updateSnake();
  updateFood();
  checkDeath();
}

const draw = () => {
  gameBoard.innerHTML = ''; // removes all previous renders when reloading each frame
  drawSnake(gameBoard); //passes in game-board div to allow snake div to appended to it by function.
  drawFood(gameBoard);
}

const main = (currentTime) => {
  if (gameOver) {
    if (confirm("You lost. Press ok to restart.")) {
      window.location = '/'; //refreshes page
    }
  }

  // first parameter for the callback of window.requestAnimationFrame(callback) is always sent to timestamp of the execution.
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  // main will call on 'requestAnimationFrame method again' setting up a loop.
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; // snake moves every (1/SNAKE_SPEED) seconds.

  lastRenderTime = currentTime;


  update(); //updates location of each segment of snakeBody
  draw(); //calls draw function as declared in line 5.

};

window.requestAnimationFrame(main); //initialises loop, subsequent loops are called recursively inside main.
// window.requestAnimationFrame(main) will auto pass a timestamp into main as first parameter.
