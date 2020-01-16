'use strict';

const isFoodEatenBySnake = (snakeLocation, foodLocation) => {
  return snakeLocation.some(part =>
    part.every((coordinate, index) => coordinate === foodLocation[index])
  );
};

class Game {
  constructor(
    snake,
    ghostSnake,
    food,
    scoreCard,
    { NUM_OF_COLS, NUM_OF_ROWS }
  ) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = scoreCard;
    this.isGameOver = false;
    this.NUM_OF_COLS = NUM_OF_COLS;
    this.NUM_OF_ROWS = NUM_OF_ROWS;
  }

  turnSnakeLeft() {
    this.snake.turnLeft();
  }

  moveSnake() {
    this.snake.move();
    this.isGameOver =
      this.snake.isTouchedItself() || this.isSnakeCrossedBoundaries();
    if (isFoodEatenBySnake(this.snake.location, this.food.position)) {
      this.food.generateNew();
      this.snake.grow();
      this.scoreCard.updateDefault();
    }
  }

  moveGhostSnake() {
    this.ghostSnake.move();
    if (isFoodEatenBySnake(this.ghostSnake.location, this.food.position)) {
      this.food.generateNew();
    }
  }

  isSnakeCrossedBoundaries() {
    const [headX, headY] = this.snake.head;
    const isHeadXOutOfCols = headX < 0 || headX >= this.NUM_OF_COLS;
    const isHeadYOutOfRows = headY < 0 || headY >= this.NUM_OF_ROWS;
    return isHeadXOutOfCols || isHeadYOutOfRows;
  }
}
