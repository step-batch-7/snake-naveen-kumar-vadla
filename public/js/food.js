'use strict';

class Food {
  constructor(colId, rowId, previousLocation, type) {
    this.colId = colId;
    this.rowId = rowId;
    this.previousLocation = previousLocation;
    this.type = type;
  }

  get position() {
    return [this.colId, this.rowId];
  }

  generateNew(NUM_OF_COLS, NUM_OF_ROWS) {
    this.previousLocation = this.position;
    this.colId = Math.floor(Math.random() * NUM_OF_COLS);
    this.rowId = Math.floor(Math.random() * NUM_OF_ROWS);
  }

  previousFoodLocation() {
    return this.previousLocation;
  }
}
