const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

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
}

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

const isFoodEatenBySnake = (snakeLocation, foodLocation) => {
  return snakeLocation.some(part =>
    part.every((coordinate, index) => coordinate === foodLocation[index])
  );
};

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';
const SCORE_BOARD_ID = 'scoreBoard';

const getGrid = () => document.getElementById(GRID_ID);
const getBoard = () => document.getElementById(SCORE_BOARD_ID);

const getCellId = (colId, rowId) => colId + '_' + rowId;
const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = (grid, colId, rowId) => {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = () => {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const drawSnake = snake => {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const drawFood = food => {
  let [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add('food');
};

const drawScore = score => {
  const scoreCard = document.getElementById('scoreBoard');
  scoreCard.innerText = `Score : ${score}`;
};

const eraseFood = food => {
  let [colId, rowId] = food.previousFoodLocation();
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const eraseTail = snake => {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const handleKeyPress = game => {
  game.snake.turnLeft();
};

const attachEventListeners = game => {
  document.body.onkeydown = () => game.turnSnakeLeft();
};

const setup = game => {
  attachEventListeners(game);
  createGrids();
  drawSnake(game.snake);
  drawFood(game.food);
};

const moveAndDrawSnake = game => {
  game.moveSnake();
  eraseTail(game.snake);
  drawSnake(game.snake);
  drawFood(game.food);
  eraseFood(game.food);
  drawScore(game.scoreCard.points);
};

const runGame = game => {
  moveAndDrawSnake(game);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
};

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const initGhostSnake = () => {
  const ghostSnakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(ghostSnakePosition, new Direction(SOUTH), 'ghost');
};

const main = () => {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(55, 25, [0, 0]);
  const scoreCard = new ScoreCard(0);
  const game = new Game(snake, ghostSnake, food, scoreCard);
  setup(game);

  setInterval(runGame, 50, game);
};
