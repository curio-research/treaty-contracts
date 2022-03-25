import { WorldConstantsStruct } from './../../typechain-types/Game';
import { generateMap } from './mapGenerator';
import { TowerWithLocation } from './../../util/types/tower';
import { generateItems } from './itemGenerator';
import { generateGameConstants, WORLD_WIDTH, WORLD_HEIGHT, ROOM_LENGTH, MAP_MODE, masterItems } from './constants';
import { ItemWithMetadata } from '../../util/types/getter';

// This generates all game parameters needed to deploy the GameEngine.sol contract

export const generateAllGameArgs = (allGameItems: ItemWithMetadata[], itemRatio: number[]): AllGameArgs => {
  const gameConstants: WorldConstantsStruct = generateGameConstants();
  const masterGameSpecs = generateMap(WORLD_WIDTH, WORLD_HEIGHT, ROOM_LENGTH, masterItems, MAP_MODE.DEFAULT);
  const blockMap = generateItems(masterGameSpecs.blocks, itemRatio);
  return {
    gameDeployArgs: [gameConstants, allGameItems],
    allTowerArgs: masterGameSpecs.towers,
    blockMap,
  };
};

interface AllGameArgs {
  gameDeployArgs: any[];
  allTowerArgs: TowerWithLocation[];
  blockMap: number[][][];
}
