'use strict';

const isHeadOutOfBoundary = function([headX, headY]) {
  const isHeadXOutOfCols = headX < 0 || headX >= NUM_OF_COLS;
  const isHeadYOutOfRows = headY < 0 || headY >= NUM_OF_ROWS;
  return isHeadXOutOfCols || isHeadYOutOfRows;
};

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  grow() {
    this.positions.unshift(this.previousTail);
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  hasCrossedBoundaries() {
    const head = this.positions[this.positions.length - 1];
    return isHeadOutOfBoundary(head);
  }
}
