import { SimpleFighter } from './Fighter';

export default class Monster implements SimpleFighter {
  private _lifePoints: number;
  private _strength: number;

  constructor() {
    this._lifePoints = 85;
    this._strength = 63;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  attack(enemy: SimpleFighter): void {
    const atackPoints = this._strength;
    enemy.receiveDamage(atackPoints);
  }

  receiveDamage(atackPoints: number): number {
    if (atackPoints > 0) this._lifePoints -= atackPoints;
    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this.lifePoints;
  }
}