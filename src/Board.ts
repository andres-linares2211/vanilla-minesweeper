import { Tile } from './Tile.js';

export class Board {
  size: number;
  mines: number;
  tiles: Tile[];

  constructor(size: number, mines: number) {
    this.size = size;
    this.mines = mines;
    this.tiles = [];

    this.initialize();
  }

  initialize() {
    this.generateTiles();
    this.plantBombs();
    this.setTileValues();
  }

  generateTiles() {
    for (let i = 1; i <= this.size * this.size; i++) {
      const { x, y } = this.getXandYPosition(i);
      this.tiles.push(new Tile(x, y));
    }
  }

  plantBombs() {
    for (let i = 0; i < this.mines; i++) {
      const randomIndex = Math.floor(Math.random() * this.tiles.length);
      const randomTile = this.tiles[randomIndex];

      if (randomTile.hasMine) {
        i--;
        continue;
      }

      randomTile.hasMine = true;
    }
  }

  setTileValues() {
    for (let tile of this.tiles) {
      if (tile.hasMine) continue;

      const minesAround = this.getMinesAround(tile);
      tile.value = minesAround;
    }
  }

  getMinesAround(tile: Tile): number {
    let mines = 0;
    const { x, y } = tile;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const nextX = x + i;
        const nextY = y + j;
        const closeTile = this.tiles.find((tile) => tile.x === nextX && tile.y === nextY);

        if (closeTile?.hasMine) mines++;
      }
    }

    return mines;
  }

  getXandYPosition(index: number): Coordinates {
    const x = index % this.size;
    const y = Math.floor(index / this.size);

    return { x, y };
  }
}

interface Coordinates {
  x: number;
  y: number;
}
