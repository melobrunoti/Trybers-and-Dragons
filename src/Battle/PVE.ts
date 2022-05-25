import Battle from './Battle';
import Fighter, { SimpleFighter } from '../Fighter';

export default class PVE extends Battle {
  constructor(
    private _player: Fighter,
    private _monster: SimpleFighter[] | Fighter[],
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
       && this._monster.some((m) => m.lifePoints > 0)) {
      const monsters = PVE.aliveEnemies(this._monster);
      if (monsters) {
        this.player.attack(monsters[0]);
        PVE.enemiesAttack(this._monster, this._player); 
      } 
    }
    return super.fight();
  }
}