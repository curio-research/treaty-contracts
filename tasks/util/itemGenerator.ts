import { masterItems } from "../../test/util/constants";
import { ITEM_RATIO, WORLD_HEIGHT, WORLD_WIDTH } from "./constants";

export const allGameItems = masterItems.map((item) => item.item);

// ------------------------------------------------
// Randomized item generation across map
// ------------------------------------------------

const worldSize = WORLD_WIDTH * WORLD_HEIGHT;
const getRandomCoordinate = (): number => Math.floor(Math.random() * worldSize);

/**
 * Generate items based on their ratio for empty map.
 * @param map Block map with only towers and no other items
 * @returns Block map with all items
 */
export const generateItems = (map: number[][]): number[][] => {
  const itemCounts = ITEM_RATIO.map((r) => r * Math.round(worldSize / 100));

  for (let i = 0; i < itemCounts.length; i++) {
    for (let k = 0; k < itemCounts[i]; k++) {
      let coord;
      do {
        coord = getRandomCoordinate();
      } while (map[coord].length > 0);

      map[coord].push(i);
    }
  }

  return map;
}