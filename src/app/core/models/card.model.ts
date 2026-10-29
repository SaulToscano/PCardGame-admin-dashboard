export interface Card {
  tid: string;
  type: string;
  team: string;
  rarity: string;
  mana: number;
  attack: number;
  hp: number;
  cost: number;
  packs: string[];
}