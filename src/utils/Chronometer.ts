import { formatTime } from './index.js';

const UPDATE_INTERVAL = 50;

export class Chronometer {
  private chronometer!: number;
  private initialTime!: number;
  private finalTime!: number;

  start(updateCallback: Function) {
    this.initialTime = performance.now();

    this.chronometer = setInterval(() => {
      this.finalTime = performance.now();
      updateCallback(this.displayTime);
    }, UPDATE_INTERVAL);
  }

  stop() {
    clearInterval(this.chronometer);
    this.finalTime = performance.now();
  }

  get time(): number {
    return this.finalTime - this.initialTime;
  }

  get displayTime(): string {
    return formatTime(this.time);
  }
}
