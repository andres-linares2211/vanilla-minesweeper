export class Chronometer {
  private chronometer: number;
  private initialTime: number;
  private finalTime: number;

  constructor() {
    this.chronometer = -1;
    this.initialTime = -1;
    this.finalTime = -1;
  }

  start(updateCallback: Function) {
    this.initialTime = performance.now();

    this.chronometer = setInterval(() => {
      this.finalTime = performance.now();
      updateCallback(this.displayTime);
    }, 50);
  }

  stop() {
    this.finalTime = performance.now();
    clearInterval(this.chronometer);
  }

  get displayTime(): string {
    return this.formatTime(this.finalTime - this.initialTime);
  }

  private formatTime(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.floor(milliseconds / 1000);
    const fraction = Math.floor(milliseconds % 1000);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedFraction = fraction.toString().padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}.${formattedFraction}`;
  }
}
