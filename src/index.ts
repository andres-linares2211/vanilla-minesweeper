import { Board } from './Board.js';
import { Chronometer } from './Chronometer.js';

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
    alert('shit');
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
    const buttonElement = document.createElement('button');

    if (tile.status === 'FREE') {
      buttonElement.disabled = true;

      if (tile.value !== 0) {
        buttonElement.appendChild(document.createTextNode(tile.value.toString()));
        buttonElement.classList.add(`value-${tile.value}`);
      }
    }

    if (tile.status === 'MARK') {
      buttonElement.appendChild(document.createTextNode('🚩'));
      buttonElement.classList.add('small');
    }

    if (tile.status === 'QUESTION') {
      buttonElement.appendChild(document.createTextNode('❓'));
      buttonElement.classList.add('small');
    }

    if (tile.status === 'BOMB') {
      buttonElement.appendChild(document.createTextNode('💣'));
      buttonElement.classList.add('small');
    }

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
