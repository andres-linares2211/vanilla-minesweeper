import { Board } from './game/Board.js';
import { Chronometer } from './Chronometer.js';
import { paintTile } from './ui/TilePainter.js';

const board = document.getElementById('root');
const counter = document.getElementById('counter');
const boardSizeInput = document.getElementById('size') as HTMLInputElement;
const minesInput = document.getElementById('mines') as HTMLInputElement;

boardSizeInput.addEventListener('change', () => {
  initialize();
  board?.style.setProperty('--size', boardSizeInput.value);
});
minesInput.addEventListener('change', () => initialize());

let isTimeRunning = false;
let gameOver = false;

let game: Board;
let chronometer: Chronometer;

initialize();

function initialize() {
  const boardSize = boardSizeInput.value;
  const mines = minesInput.value;

  game = new Board(+boardSize, +mines, () => {
    chronometer.stop();
    isTimeRunning = false;
    gameOver = true;

    if (counter) counter.innerHTML = chronometer.displayTime;
  });

  paint();
}

function startCounter() {
  isTimeRunning = true;
  chronometer = new Chronometer();

  chronometer.start((time: string) => {
    if (counter) counter.innerHTML = time;
  });
}

function paint() {
  if (board) board.innerHTML = '';

  game.tiles.forEach((tile) => {
    const buttonElement = paintTile(tile);

    buttonElement.addEventListener('click', () => {
      if (!isTimeRunning) startCounter();
      game.select({ x: tile.x, y: tile.y });
      paint();
    });

    buttonElement.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      game.mark({ x: tile.x, y: tile.y });
      paint();
    });

    board?.appendChild(buttonElement);
  });
}
