export interface Tower {
  rewardPerEpoch: number;
  itemId: number;
  stakedAmount: number;
  stakedTime: number;
  owner: string;
}

export interface TowerWithLocation {
  location: string;
  tower: Tower;
}
