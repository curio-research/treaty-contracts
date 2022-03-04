import { position } from "../../../util/types/common";
import { TowerWithLocation } from "../../../util/types/tower";

export interface MasterGameSpecs {
  blocks: number[][][];
  towers: TowerWithLocation[];
}

export interface CoordsProps {
  gridCoords: position[];
  indices: number[][];
}
