import { TowerWithLocation } from "./../../util/types/tower";
import { EMPTY_ADDRESS } from "./../../util/network/common";

export const tower1: TowerWithLocation = {
  location: {
    x: 1,
    y: 1,
  },
  tower: {
    rewardPerEpoch: 100,
    itemId: 1,
    stakedAmount: 0,
    stakedTime: 0,
    owner: EMPTY_ADDRESS,
  },
};

export const tower2: TowerWithLocation = {
  location: {
    x: 2,
    y: 2,
  },
  tower: {
    rewardPerEpoch: 200,
    itemId: 2,
    stakedAmount: 0,
    stakedTime: 0,
    owner: EMPTY_ADDRESS,
  },
};
