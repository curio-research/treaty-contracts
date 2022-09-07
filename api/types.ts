import { TILE_TYPE } from './../tasks/util/types/index';

export interface gameConfig {
  address: string;
  network: string;
  deploymentId: string;
  map: TILE_TYPE[][];
  time: Date | string;
}
