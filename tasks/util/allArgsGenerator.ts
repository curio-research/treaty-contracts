import { generateMap } from "./mapGenerator";
import { TowerWithLocation } from "./../../util/types/tower";
import { allGameItems, generateItems } from "./itemGenerator";
import { generateGameConstants, WORLD_WIDTH, WORLD_HEIGHT, ROOM_LENGTH } from "./constants";

// master game deploy args generator
export const generateAllGameArgs = (): allGameArgs => {
  const gameConstants = generateGameConstants();
  const masterGameSpecs = generateMap(WORLD_WIDTH, WORLD_HEIGHT, ROOM_LENGTH);
  const mapWithItems = generateItems(masterGameSpecs.blocks);

  return {
    gameDeployArgs: [gameConstants, mapWithItems, allGameItems],
    allTowerArgs: masterGameSpecs.towers,
  };
};

interface allGameArgs {
  gameDeployArgs: any[];
  allTowerArgs: TowerWithLocation[];
}
