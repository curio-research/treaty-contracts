import { TileWithMetadataStructOutput } from "./../../typechain-types/GameStorage";
import { TileWithMetadata } from "./../types/game";
import { Inventory } from "../types/game";
import { RecipeStructOutput } from "./../../typechain-types/Game";
import { decodeBNArr } from "./common";

export const decodePlayerInventory = (recipe: RecipeStructOutput): Inventory => {
  return {
    itemIds: decodeBNArr(recipe.craftItemIds),
    itemAmounts: decodeBNArr(recipe.craftItemAmounts),
  };
};

export const decodeTileWithMetadata = (data: TileWithMetadataStructOutput): TileWithMetadata => {
  return {
    occupier: data.occupier,
    blocks: decodeBNArr(data.blocks),
    x: data.x.toNumber(),
    y: data.y.toNumber(),
  };
};
