import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name: string;

  constructor(
    name: string,
    race: Race = new Elf(name, 10),
    archetype: Archetype = new Mage(name),
  ) {
    this._name = name;
    this._race = race;
    this._archetype = archetype;
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._dexterity = this._race.dexterity;
    this._energy = { type_: archetype.energyType, amount: getRandomInt(1, 10) };
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  attack(enemy: SimpleFighter): void {
    const atackPoints = this.strength;
    enemy.receiveDamage(atackPoints);
  }

  receiveDamage(atackPoints: number): number {
    const damage = atackPoints - this.defense;

    if (damage > 0) this._lifePoints -= damage;
    if (this._lifePoints < 0) this._lifePoints = -1;
    return this._lifePoints;
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._lifePoints = this._maxLifePoints;
    this._energy.amount = 10;
  }

  special(enemy: Fighter): void {
    this._lifePoints = this._maxLifePoints;
    enemy.receiveDamage(this.strength * 3);
  }
}