import Battle from './Battle';
import Fighter, { SimpleFighter } from '../Fighter';

export default class PVE extends Battle {
  constructor(
    private _player: Fighter,
    private _enemie: SimpleFighter[] | Fighter[],
  ) { 
    super(_player);
  }

  aliveEnemies(enemies: SimpleFighter[] | Fighter[]):
  SimpleFighter[] | Fighter[] | undefined {
    return enemies.filter((enemie) => enemie.lifePoints > 0);
  }

  enemiesAttack(
    enemies: SimpleFighter[] | Fighter[],
    player: Fighter,
  ): void {
    const aliveEnemies = this.aliveEnemies(enemies);
    if (aliveEnemies) {
      aliveEnemies.forEach((enemie) => enemie.attack(player));
    }
  }

  fight(): number {
    while (this._player.lifePoints > 0
       && this._enemie.some((m) => m.lifePoints > 0)) {
      const enemies = this.aliveEnemies(this._enemie);
      if (enemies) {
        this.player.attack(enemies[0]);
        this.enemiesAttack(this._enemie, this._player); 
      } 
    }
    return super.fight();
  }
}