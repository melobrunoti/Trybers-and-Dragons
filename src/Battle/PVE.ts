import Battle from './Battle';
import Fighter, { SimpleFighter } from '../Fighter';

export default class PVE extends Battle {
  constructor(
    private _player: Fighter,
    private _enemie: SimpleFighter[] | Fighter[],
  ) { 
    super(_player);
  }

  static aliveEnemies(monsters: SimpleFighter[] | Fighter[]):
  SimpleFighter[] | Fighter[] | undefined {
    return monsters.filter((monster) => monster.lifePoints > 0);
  }

  static enemiesAttack(
    monsters: SimpleFighter[] | Fighter[],
    player: Fighter,
  ): void {
    const aliveEnemies = PVE.aliveEnemies(monsters);
    if (aliveEnemies) {
      aliveEnemies.forEach((enemie) => enemie.attack(player));
    }
  }

  fight(): number {
    while (this._player.lifePoints > 0
       && this._enemie.some((m) => m.lifePoints > 0)) {
      const enemies = PVE.aliveEnemies(this._enemie);
      if (enemies) {
        this.player.attack(enemies[0]);
        PVE.enemiesAttack(this._enemie, this._player); 
      } 
    }
    return super.fight();
  }
}