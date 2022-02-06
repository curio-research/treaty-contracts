import { Tower } from "./../types/tower";
import { TowerStructOutput } from "./../../typechain-types/Game";

export const decodeTower = (tower: TowerStructOutput): Tower => {
  return {
    rewardPerEpoch: tower.rewardPerEpoch.toNumber(),
    itemId: tower.itemId.toNumber(),
    stakedAmount: tower.stakedAmount.toNumber(),
    stakedTime: tower.stakedTime.toNumber(),
    owner: tower.owner,
  };
};
