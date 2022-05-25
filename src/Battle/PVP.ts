import Battle from './Battle';
import Fighter from '../Fighter';
import getRandomInt from '../utils';

export default class PVP extends Battle {
  constructor(
    private _player1: Fighter,
    private _player2: Fighter,
  ) { super(_player1); }

  fight(): number {
    const turnOrder = getRandomInt(1, 2);

    while (this._player1.lifePoints > 0 && this._player2.lifePoints > 0) {
      this._player1.attack(this._player2);
      this._player2.attack(this._player1);
    }
    return super.fight();
  }
}