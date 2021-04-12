/**
 * Transforms a given time in millisecond to the format: xx:xx.xxx
 */
export function formatTime(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const fraction = Math.floor(milliseconds % 1000);

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedFraction = fraction.toString().padStart(3, '0');

  return `${formattedMinutes}:${formattedSeconds}.${formattedFraction}`;
}
