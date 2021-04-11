import { BoardGenerator } from './BoardGenerator.js';
import { Tile } from './Tile.js';

export class Board {
  private size: number;
  private mines: number;
  private tiles: Tile[];
  private onGameOver: Function;

  constructor(size: number, mines: number, onGameOver: Function) {
    this.size = size;
    this.mines = mines;
    this.tiles = [];
    this.onGameOver = onGameOver;

    this.initialize();
  }

  initialize() {
    this.tiles = new BoardGenerator(this.size, this.mines).generateBoard();
  }

  select({ x, y }: Coordinate) {
    const tile = this.getTile({ x, y });
    if (!tile) return;

    const newStatus = tile?.select();

    if (newStatus === 'BOMB') {
      this.onGameOver();
      this.initialize();
    } else if (newStatus === 'FREE') {
      this.showAdjacentTiles(tile);
    }
  }

  mark({ x, y }: Coordinate) {
    return this.getTile({ x, y })?.mark();
  }

  private showAdjacentTiles(tile: Tile) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const x = tile.x + i;
        const y = tile.y + j;

        this.select({ x, y });
      }
    }
  }

  private getTile({ x, y }: Coordinate) {
    return this.tiles.find((tile) => tile.x === x && tile.y === y);
  }
}

export interface Coordinate {
  x: number;
  y: number;
}

const board = new Board(10, 10, () => {
  alert('shit');
});
