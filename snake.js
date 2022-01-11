let SNAKE_SPEED = 5; // snake moves 5 times every sec.
let newSegments = 0; // counts new segments to add to snakeBody in next refresh
const snakeBody = [{ x: 11, y: 11 }]; // an array of objects => snakeBody array length determines snake length, coordinates determine position of each segment.

//declare updateSnake function
const updateSnake = () => {
  // updates snakeBody
  addSegments(); // the for-loop in this function means that it will only trigger when food is eaten => newSegment > 0
  const inputDirection = getInputDirection(); // activates arrow keys listener
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    //last element, snakeBody.length-1 of the array will be 'destroyed', because that will disappear when snake moves, so we end the loop before it.
    snakeBody[i + 1] = { ...snakeBody[i] }; //last array element, length-1, is set to second last. loops until second element i=1, which will take on position of 1st element i=0.
  } // ... creates a duplicate array object, spreads over existing and replaces relevant properties
  // below is kept outside of loop because we don't want input value to be lost at the end of each loop, for-loop render will refresh based on snake-speed frame rate, snake position will update accordingly based on render refresh.
  snakeBody[0].x += inputDirection.x; // check whether listener has detected any inputs
  snakeBody[0].y += inputDirection.y; // see input.js => +1 will move snake down due to grid numbering convention
};

//declare drawSnake function => this creates the snake and use gridRow/gridColumn to put it in position
const drawSnake = (gameBoard) => {
  //takes in the gameBoard argument as the space to put in the creation based on snakeBody.
  snakeBody.forEach((segment) => {
    //forEach passes in the element(s) of Array i.e. coordinate object. for loop to use, it will run as many times based on length of snakeBody array
    const snakeElement = document.createElement("div"); //create div in HTMl
    snakeElement.style.gridRowStart = segment.y; //sets position, puts a segment on the defined row in snakeBody on our 21x21 grid as defined in css
    snakeElement.style.gridColumnStart = segment.x; //sets position, puts a segment on the defined column in snakeBody on our 21x21 grid as defined in css
    snakeElement.classList.add("snake"); //sets look of element, adds a class to style it based on css class, blue with thin black border
    gameBoard.appendChild(snakeElement); //appends 'div' segment to game-board div
  });
};

const expandSnake = (growthRate) => {
  // activate only when snake eats food, which will update value of newSegments variable so addSegments function can be triggered
  newSegments += growthRate;
};

const onSnake = (position, ignoreHead = false) => {
  //position is higher order argument, position will also be the position of food as onSnake also used in food.js
  return snakeBody.some((segment, index) => {
    // returns boolean if below function has a true result vs segment, i.e. array element
    //passes element of snakeBody as 'segment'
    if (index === 0 && ignoreHead) return false; // ignoreHead will default return false, unless checking for snakeIntersection where 'some' will not check if snakeBody[0] against itself
    return equalPositions(segment, position); // compares 'segment' with positions argument to return boolean value that will be checked by 'some'
  });
};

const getSnakeHead = () => {
  return snakeBody[0]; // return current position of snakeHead to decide whether to announce "game over" condition
};

const snakeIntersection = () => {
  //checks whether snake head is on any part of snake body, but does not check compare snake head with snake head
  return onSnake(snakeBody[0], { ignoreHead: true });
};

const equalPositions = (pos1, pos2) => {
  return pos1.x === pos2.x && pos1.y === pos2.y; //used in onSnake to check whether x and y coordinate of 2 points are the same
};

const addSegments = () => {
  for (let i = 0; i < newSegments; i++) {
    //reviews newSegments and add in additional new segments to snakeBody accordingly, only starts when a food was eaten - newSegment > 0.
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] }); //duplicate last element of snake (object with coordinates) and add to end of snakeBody array
  }
  if (newSegments > 0 && SNAKE_SPEED < 15) SNAKE_SPEED += 1; //increase snakeSpeed whenever food is eaten
  newSegments = 0; // reset newSegments until snake eats food again.

};
