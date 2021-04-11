export class Tile {
  x: number;
  y: number;
  value: number;
  status: 'INITIAL' | 'FREE' | 'BOMB' | 'MARK' | 'QUESTION';
  hasMine: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  select() {
    if (this.status !== 'INITIAL') return this.status;

    this.status = this.hasMine ? 'BOMB' : 'FREE';
    return this.status;
  }

  mark() {
    if (this.status === 'INITIAL') this.status = 'MARK';
    else if (this.status === 'MARK') this.status = 'QUESTION';
    else if (this.status === 'QUESTION') this.status = 'INITIAL';

    return this.status;
  }
}
