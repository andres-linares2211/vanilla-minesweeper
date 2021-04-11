import { Tile } from '../game/Tile.js';

export function paintTile(tile: Tile): HTMLButtonElement {
  const button = document.createElement('button');

  switch (tile.status) {
    case 'FREE':
      return paintFreeTile(tile, button);
    case 'MARK':
      return paintEmojiTile(button, '🚩');
    case 'QUESTION':
      return paintEmojiTile(button, '❓');
    case 'BOMB':
      return paintBombTile(button);
  }

  return button;
}

function paintFreeTile(tile: Tile, button: HTMLButtonElement) {
  button.disabled = true;

  if (tile.value !== 0) {
    button.innerHTML = tile.value.toString();
    button.classList.add(`value-${tile.value}`);
  }

  return button;
}

function paintEmojiTile(button: HTMLButtonElement, emoji: string) {
  button.innerHTML = emoji;
  button.classList.add('small');

  return button;
}

function paintBombTile(button: HTMLButtonElement) {
  const paintedButton = paintEmojiTile(button, '💣');
  paintedButton.disabled = true;
  paintedButton.classList.add('exploded');

  return paintedButton;
}
