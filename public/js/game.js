'use strict';

const isFoodEatenBySnake = (snakeHead, foodPosition) => {
  const [headX, headY] = snakeHead;
  const [foodX, foodY] = foodPosition;
  return headX === foodX && headY === foodY;
};

const isSnakeCrossedBoundaries = (
  snake,
  NUM_OF_COLS,
  NUM_OF_ROWS,
  startingPoint
) => {
  const [headX, headY] = snake.head;
  const isHeadXOutOfCols = headX < startingPoint || headX >= NUM_OF_COLS;
  const isHeadYOutOfRows = headY < startingPoint || headY >= NUM_OF_ROWS;
  return isHeadXOutOfCols || isHeadYOutOfRows;
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
    const isGhostSnakeAtBoundary = isSnakeCrossedBoundaries(
      this.ghostSnake,
      this.NUM_OF_COLS - 1,
      this.NUM_OF_ROWS - 1,
      1
    );
    if (isGhostSnakeAtBoundary) {
      this.ghostSnake.turnLeft();
      this.ghostSnake.turnLeft();
    }
  }

  isGameOver() {
    const isSnakeCrossedBoundary = isSnakeCrossedBoundaries(
      this.snake,
      this.NUM_OF_COLS,
      this.NUM_OF_ROWS,
      0
    );
    return (
      isSnakeCrossedBoundary ||
      this.snake.isTouchedItself() ||
      this.areSnakesTouchedEachOther()
    );
  }

  areSnakesTouchedEachOther() {
    const snakeBody = this.snake.location;
    const ghostSnakeBody = this.ghostSnake.location;
    return snakeBody.some(([snakeX, snakeY]) => {
      return ghostSnakeBody.some(([ghostSnakeX, ghostSnakeY]) => {
        return snakeX === ghostSnakeX && snakeY === ghostSnakeY;
      });
    });
  }
}
