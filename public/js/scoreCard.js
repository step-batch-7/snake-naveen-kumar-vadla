'use strict';

class ScoreCard {
  constructor(score) {
    this.score = score;
  }

  get points() {
    return this.score;
  }

  updateDefault() {
    this.score++;
  }
}
