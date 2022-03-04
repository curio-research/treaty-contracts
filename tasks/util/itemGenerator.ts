import { PositionStruct } from "../../typechain-types/Game";
import { ITEM_RATIO, masterItems, WORLD_HEIGHT, WORLD_WIDTH } from "./constants";

export const allGameItems = masterItems.map((item) => item.item);

// ------------------------------------------------
// Randomized item generation across map
// ------------------------------------------------

const worldSize = WORLD_WIDTH * WORLD_HEIGHT;
const getRandomPosition = (): PositionStruct => {
  const x = Math.floor(Math.random() * WORLD_WIDTH);
  const y = Math.floor(Math.random() * WORLD_HEIGHT);
  return {x, y};
}

/**
 * Generate items based on their ratio for empty map.
 * @param map Block map with only towers and no other items
 * @returns Block map with all items
 */
export const generateItems = (map: number[][][]): number[][][] => {
  const itemCounts = ITEM_RATIO.map((r) => r * Math.round(worldSize / 100));

  for (let i = 0; i < itemCounts.length; i++) {
    for (let k = 0; k < itemCounts[i]; k++) {
      let pos, x, y;

      // iterate until an empty position is found; place the item there
      do {
        pos = getRandomPosition();
        x = Number(pos.x);
        y = Number(pos.y);
      } while (map[x][y].length > 0);

      map[x][y].push(i);
    }
  }

  return map;
};
