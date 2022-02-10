import { position } from "../../../util/types/common";
import { TowerWithLocation } from "../../../util/types/tower";

export interface MasterGameSpecs {
  blocks: number[][];
  towers: TowerWithLocation[];
}

export interface TowerCoordsProps {
  gridCoords: position[];
  indices: number[];
}

export interface GenerateWallCoordsProps {
  gridCoords: position[];
  indices: number[];
}
