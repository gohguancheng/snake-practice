let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener(`keydown`, (e) => {
  //'keydown' = if any key is pressed => do anonymous function with arg 'e'.
  switch (e.key) {
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break; // don't do anything if already moving along y-coordinate.
      inputDirection = { x: 0, y: 1 } // positive-y is downwards based on css grid
      break; // break to move into the function below
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break // don't do anything if already moving along y-coordinate.
      inputDirection = { x: 0, y: -1 } // positive-y is downwards based on css grid
      break; // break to move into the function below
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break; // don't do anything if already moving along x-coordinate.
      inputDirection = { x: -1, y: 0 } // css grid start from top-left corner.
      break; // break to move into the function below
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break; // don't do anything if already moving along x-coordinate.
      inputDirection = { x: 1, y: 0 } // css grid start from top-left corner.
      break; // break to move into the function below
  }
});

const getInputDirection = () => {
  lastInputDirection = inputDirection; // store last input based on what 'input.js' detected last
  return inputDirection;
};
