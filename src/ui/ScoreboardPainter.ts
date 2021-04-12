import { formatTime } from '../utils/index.js';
import { Score } from '../utils/LocalScoreboard';

const SCOREBOARD_ELEMENT_ID = 'scoreboard';

export class ScoreboardPainter {
  private listElement: HTMLUListElement | null;

  constructor() {
    this.listElement = document.querySelector(`#${SCOREBOARD_ELEMENT_ID} ul`);
  }

  paint(scores: Score[]) {
    if (!this.listElement) return;

    this.listElement.innerHTML = '';

    const itemElements = scores.map((score) => {
      const item = document.createElement('li');
      item.innerHTML = formatTime(score.time);

      return item;
    });

    itemElements.forEach((item) => this.listElement?.appendChild(item));
  }
}
