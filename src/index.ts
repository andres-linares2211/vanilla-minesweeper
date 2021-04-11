import { Board } from './Board.js';
import { Chronometer } from './Chronometer.js';

const board = document.getElementById('root');
const counter = document.getElementById('counter');
let isTimeRunning = false;

let game: Board;

initialize();

function initialize() {
  game = new Board(10, 10, () => {
    alert('shit');
  });

  paint();
}

function startCounter() {
  isTimeRunning = true;
  const chronometer = new Chronometer();

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
    }

    if (tile.status === 'MARK') {
      buttonElement.appendChild(document.createTextNode('🚩'));
      buttonElement.classList.add('small');
    }

    if (tile.status === 'QUESTION') {
      buttonElement.appendChild(document.createTextNode('❓'));
      buttonElement.classList.add('small');
    }

    if (tile.status === 'FREE' && tile.value !== 0) {
      const text = document.createTextNode(tile.value.toString());
      buttonElement.appendChild(text);

      buttonElement.classList.add(`value-${tile.value}`);
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
