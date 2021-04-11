import { Board } from './Board.js';

const board = document.getElementById('root');
let game: Board;

initialize();

function initialize() {
  game = new Board(10, 10, () => {
    alert('shit');
  });

  paint();
}

function paint() {
  if (board) board.innerHTML = '';

  game.tiles.forEach((tile) => {
    const buttonElement = document.createElement('button');

    if (tile.status === 'FREE') {
      buttonElement.classList.add('free');
    }

    if (tile.status === 'FREE' && tile.value !== 0) {
      const text = document.createTextNode(tile.value.toString());
      buttonElement.appendChild(text);

      buttonElement.classList.add(`value-${tile.value}`);
    }

    if (tile.hasMine) {
      buttonElement.appendChild(document.createTextNode('B'));
    }

    buttonElement.addEventListener('click', () => {
      game.select({ x: tile.x, y: tile.y });
      paint();
    });

    board?.appendChild(buttonElement);
  });
}
