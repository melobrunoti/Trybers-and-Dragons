import { Ranger, Warrior } from './Archetypes';
import Battle, { PVE, PVP } from './Battle';
import Character from './Character';
import Dragon from './Dragon';
import Monster from './Monster';
import { Dwarf, Elf } from './Races';

const player1 = new Character(
  'Dork',
  new Dwarf('Anao Ferro Negro', 10),
  new Warrior('Berserker'),
);

player1.levelUp();
player1.levelUp();
player1.levelUp();
player1.levelUp();

const player2 = new Character(
  'Geraldo',
  new Elf('Anao Ferro Negro', 20),
  new Ranger('Grand Archer'),
);

const player3 = new Character('Gambs');

const monster1 = new Monster();
const monster2 = new Dragon();

const pvp = new PVP(player2, player3);

const pve = new PVE(player1, [monster1, monster2]);

function runBattles(battles: Battle[]) {
  battles.forEach((battle) => battle.fight());
}

export { player1, player2, player3, monster1, monster2, pvp, pve, runBattles };
