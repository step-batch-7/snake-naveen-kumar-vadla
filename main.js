'use strict';

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);

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

const handleKeyPress = ({ snake }) => {
  snake.turnLeft();
};

const attachEventListeners = game => {
  document.body.onkeydown = () => game.turnSnakeLeft();
};

const setup = game => {
  attachEventListeners(game);
  createGrids();
  const { snake, food } = game;
  drawSnake(snake);
  drawFood(food);
};

const updateSnake = snake => {
  eraseTail(snake);
  drawSnake(snake);
};

const updateFood = food => {
  drawFood(food);
  eraseFood(food);
};

const gameOver = () => {
  clearInterval(gameAnimation);
  clearInterval(randomTurn);
  const gameOver = document.createElement('div');
  gameOver.innerText = 'Game Over';
  gameOver.className = 'gameOver';
  document.body.appendChild(gameOver);
};

const runGame = game => {
  game.moveSnake();
  game.moveGhostSnake();
  const { snake, ghostSnake, food, scoreCard } = game;
  if (game.isGameOver()) {
    gameOver();
    return;
  }
  updateSnake(snake);
  updateSnake(ghostSnake);
  updateFood(food);
  drawScore(scoreCard.points);
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

let gameAnimation, randomTurn;

const main = () => {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(55, 25, [0, 0]);
  const scoreCard = new ScoreCard(0);
  const game = new Game(
    snake,
    ghostSnake,
    food,
    scoreCard,
    NUM_OF_COLS,
    NUM_OF_ROWS
  );
  setup(game);

  gameAnimation = setInterval(runGame, 100, game);
  randomTurn = setInterval(randomlyTurnSnake, 200, game.ghostSnake);
};
