import { serializeBigNumberArr } from "./helper";
import { TileWithMetadataStructOutput } from "./../../typechain-types/Game";

// serialize return results from smart contracts to numbers

export interface TileWithMetadata {
  occupier: string;
  blocks: number[];
  x: number;
  y: number;
}

export const serializeTileWithMetadata = (data: TileWithMetadataStructOutput): TileWithMetadata => {
  return {
    occupier: data.occupier,
    blocks: serializeBigNumberArr(data.blocks),
    x: data.x.toNumber(),
    y: data.y.toNumber(),
  };
};
