import { generateMap } from "./mapGenerator";
import { TowerWithLocation } from "./../../util/types/tower";
import { allGameItems } from "./itemGenerator";
import { generateGameConstants, WORLD_WIDTH, WORLD_HEIGHT, ROOM_WIDTH } from "./constants";

// master game deploy args generator
export const generateAllGameArgs = (): allGameArgs => {
  const gameConstants = generateGameConstants();
  const masterGameSpecs = generateMap(WORLD_WIDTH, WORLD_HEIGHT, ROOM_WIDTH);

  return {
    gameDeployArgs: [...gameConstants, masterGameSpecs.blocks, allGameItems],
    allTowerArgs: masterGameSpecs.towers,
  };
};

interface allGameArgs {
  gameDeployArgs: any[];
  allTowerArgs: TowerWithLocation[];
}