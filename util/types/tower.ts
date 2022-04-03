import { position } from './common';

export interface Tower {
  rewardPerEpoch: number;
  itemId: number;
  lastCapturedEpoch: number;
  owner: string;
}

export interface TowerWithLocation {
  location: position;
  tower: Tower;
}
