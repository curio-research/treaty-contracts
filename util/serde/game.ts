import { Inventory } from "../types/game";
import { RecipeStructOutput } from "./../../typechain-types/Game";
import { decodeBNArr } from "./common";

export const decodePlayerInventory = (recipe: RecipeStructOutput): Inventory => {
  return {
    itemIds: decodeBNArr(recipe.craftItemIds),
    itemAmounts: decodeBNArr(recipe.craftItemAmounts),
  };
};
