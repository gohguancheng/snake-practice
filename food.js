const getRandomFoodPosition = () => {
    let newFoodPosition;
    //while loop rejects newFoodPosition if it is null or onSnake
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

//declare updateSnake function
const updateFood = () => {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }
};

//declare drawSnake function - use gridRow to put it in position
const drawFood = (gameBoard) => {
    const foodElement = document.createElement("div"); //create div in HTMl
    foodElement.style.gridRowStart = food.y; //sets position, puts a segment on the defined row in snakeBody on our 21x21 grid as defined in css
    foodElement.style.gridColumnStart = food.x; //sets position, puts a segment on the defined column in snakeBody on our 21x21 grid as defined in css
    foodElement.classList.add("food"); //sets look of element, adds a class to style it based on css class, blue with thin black border
    gameBoard.appendChild(foodElement); //appends new div to game-board div
  
};

