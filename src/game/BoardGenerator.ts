import { Coordinate } from './Board.js';
import { Tile } from './Tile.js';

export class BoardGenerator {
  private size: number;
  private mines: number;
  private tiles: Tile[];

  constructor(size: number, mines: number) {
    this.size = size;
    this.mines = mines;
    this.tiles = [];
  }

  generateBoard() {
    this.generateTiles();
    this.plantBombs();
    this.setTileValues();

    return this.tiles;
  }

  private generateTiles() {
    for (let i = 0; i < this.size * this.size; i++) {
      const { x, y } = this.getXandYPosition(i);
      this.tiles.push(new Tile(x, y));
    }
  }

  private plantBombs() {
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

  private setTileValues() {
    for (let tile of this.tiles) {
      if (tile.hasMine) continue;

      const minesAround = this.getMinesAround(tile);
      tile.value = minesAround;
    }
  }

  private getMinesAround(tile: Tile): number {
    let mines = 0;
    const { x, y } = tile;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const nextX = x + i;
        const nextY = y + j;

        if (nextX < 1 || nextX > this.size) continue;
        if (nextY < 1 || nextY > this.size) continue;
        if (i === 0 && j === 0) continue;

        const closeTile = this.tiles.find((tile) => tile.x === nextX && tile.y === nextY);

        if (closeTile?.hasMine) mines++;
      }
    }

    return mines;
  }

  private getXandYPosition(index: number): Coordinate {
    const x = (index % this.size) + 1;
    const y = Math.floor(index / this.size) + 1;

    return { x, y };
  }
}
