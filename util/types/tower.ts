import { position } from "../../types/common";

export interface Tower {
  rewardPerEpoch: number;
  itemId: number;
  stakedAmount: number;
  stakedTime: number;
  owner: string;
}

export interface TowerWithLocation {
  location: position;
  tower: Tower;
}
