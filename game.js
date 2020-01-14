'use strict';

const isFoodEatenBySnake = (snakeLocation, foodLocation) => {
  return snakeLocation.some(part =>
    part.every((coordinate, index) => coordinate === foodLocation[index])
  );
};

class Game {
  constructor(snake, ghostSnake, food, scoreCard) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = scoreCard;
  }

  turnSnakeLeft() {
    this.snake.turnLeft();
  }

  moveSnake() {
    this.snake.move();
    if (isFoodEatenBySnake(this.snake.location, this.food.position)) {
      this.food.generateNew();
      this.snake.grow();
      this.scoreCard.updateDefault();
    }
  }
}
