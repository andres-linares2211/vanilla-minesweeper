const KEY = 'scoreboard';

export class LocalScoreboard {
  private storage;

  constructor() {
    this.storage = window.localStorage;
  }

  saveScore(score: Score) {
    const allScores = [...this.getScores(), score];
    this.storage.setItem(KEY, JSON.stringify(allScores));
  }

  getTopScores(size: number, mines: number, limit: number = 10): Score[] {
    const allScores = this.getScores();
    const scores = allScores.filter((score) => score.size === size && score.mines === mines);
    scores.sort((a, b) => a.time - b.time);

    return scores.slice(0, limit);
  }

  private getScores(): Score[] {
    const scores = this.storage.getItem(KEY);

    return scores ? JSON.parse(scores) : [];
  }
}

export interface Score {
  size: number;
  mines: number;
  time: number;
}
