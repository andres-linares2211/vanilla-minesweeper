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
    return this.formatTime(this.time);
  }

  /**
   * Transforms a given time in millisecond to the format: xx:xx.xxx
   */
  private formatTime(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const fraction = Math.floor(milliseconds % 1000);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedFraction = fraction.toString().padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}.${formattedFraction}`;
  }
}
