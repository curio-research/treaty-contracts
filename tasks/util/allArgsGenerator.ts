import { generateMap } from "./mapGenerator";
import { TowerWithLocation } from "./../../util/types/tower";
import { allGameItems, generateItems } from "./itemGenerator";
import { deployGameConstants, WORLD_WIDTH, WORLD_HEIGHT, ROOM_LENGTH } from "./constants";

// This generates all game parameters needed to deploy the GameEngine.sol contract

export const generateAllGameArgs = (): allGameArgs => {
  const gameConstants = deployGameConstants;
  const masterGameSpecs = generateMap(WORLD_WIDTH, WORLD_HEIGHT, ROOM_LENGTH);
  const mapWithItems = generateItems(masterGameSpecs.map);

  return {
    gameDeployArgs: [gameConstants, allGameItems],
    allTowerArgs: masterGameSpecs.towers,
    blockMap,
  };
};

interface allGameArgs {
  gameDeployArgs: any[];
  allTowerArgs: TowerWithLocation[];
  blockMap: number[][][];
}
