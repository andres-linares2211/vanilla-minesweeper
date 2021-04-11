import { BoardGenerator } from './BoardGenerator.js';
import { Tile } from './Tile.js';

export class Board {
  private size: number;
  private mines: number;
  tiles: Tile[];
  private onGameOver: Function;
  private firstExplosionSet: boolean;

  constructor(size: number, mines: number, onGameOver: Function) {
    this.size = size;
    this.mines = mines;
    this.tiles = [];
    this.onGameOver = onGameOver;
    this.firstExplosionSet = false;

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
      if (!this.firstExplosionSet) {
        this.firstExplosionSet = true;
        tile.firstExplosion = true;
      }

      this.onGameOver();
      this.tiles
        .filter((tile) => tile.hasMine && tile.status === 'INITIAL')
        .forEach((tile) => this.select({ x: tile.x, y: tile.y }));
    } else if (newStatus === 'FREE' && tile.value === 0) {
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

        if (x < 1 || x > this.size) continue;
        if (y < 1 || y > this.size) continue;
        if (i === 0 && j === 0) continue;

        const adjacentTile = this.getTile({ x, y });

        if (adjacentTile?.status === 'INITIAL') this.select({ x, y });
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
