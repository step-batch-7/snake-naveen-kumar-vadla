'use strict';

const isFoodEatenBySnake = (snakeHead, foodPosition) => {
  const [headX, headY] = snakeHead;
  const [foodX, foodY] = foodPosition;
  return headX == foodX && headY == foodY;
};

class Game {
  constructor(snake, ghostSnake, food, scoreCard, NUM_OF_COLS, NUM_OF_ROWS) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = scoreCard;
    this.NUM_OF_COLS = NUM_OF_COLS;
    this.NUM_OF_ROWS = NUM_OF_ROWS;
  }

  turnSnakeLeft() {
    this.snake.turnLeft();
  }

  moveSnake() {
    this.snake.move();
    if (isFoodEatenBySnake(this.snake.head, this.food.position)) {
      this.food.generateNew(this.NUM_OF_COLS, this.NUM_OF_ROWS);
      this.snake.grow();
      this.scoreCard.updateDefault();
    }
  }

  moveGhostSnake() {
    this.ghostSnake.move();
    if (isFoodEatenBySnake(this.ghostSnake.head, this.food.position)) {
      this.food.generateNew(this.NUM_OF_COLS, this.NUM_OF_ROWS);
      this.ghostSnake.grow();
    }
  }

  isGameOver() {
    return (
      this.isSnakeCrossedBoundaries() ||
      this.snake.isTouchedItself() ||
      this.isSnakeTouchedGhostSnake()
    );
  }

  isSnakeCrossedBoundaries() {
    const [headX, headY] = this.snake.head;
    const isHeadXOutOfCols = headX < 0 || headX >= this.NUM_OF_COLS;
    const isHeadYOutOfRows = headY < 0 || headY >= this.NUM_OF_ROWS;
    return isHeadXOutOfCols || isHeadYOutOfRows;
  }

  isSnakeTouchedGhostSnake() {
    const [snakeHeadX, snakeHeadY] = this.snake.head;
    const ghostSnakeBody = this.ghostSnake.location;
    return ghostSnakeBody.some(([partX, partY]) => {
      return partX == snakeHeadX && partY == snakeHeadY;
    });
  }
}
