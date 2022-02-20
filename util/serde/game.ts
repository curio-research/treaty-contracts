import { RecipeStructOutput } from "./../../typechain-types/GameStorage";
import { TileWithMetadataStructOutput } from "../../typechain-types/Getters";
import { TileWithMetadata } from "./../types/game";
import { Inventory } from "../types/game";

import { decodeBNArr } from "./common";

export const decodePlayerInventory = (inventory: RecipeStructOutput): Inventory => {
  return {
    itemIds: decodeBNArr(inventory.craftItemIds),
    itemAmounts: decodeBNArr(inventory.craftItemAmounts),
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
