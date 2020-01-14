'use strict';

class Food {
  constructor(colId, rowId, previousLocation) {
    this.colId = colId;
    this.rowId = rowId;
    this.previousLocation = previousLocation;
  }

  get position() {
    return [this.colId, this.rowId];
  }

  generateNew() {
    this.previousLocation = this.position;
    this.colId = Math.floor(Math.random() * NUM_OF_COLS);
    this.rowId = Math.floor(Math.random() * NUM_OF_ROWS);
  }

  previousFoodLocation() {
    return this.previousLocation;
  }
}
