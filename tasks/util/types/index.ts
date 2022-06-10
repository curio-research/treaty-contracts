export enum TILE_TYPE {
  WATER = 0,
  COASTLINE = 1,
  INLAND = 2,
  PORT = 3,
  CITY = 4,
}

export interface MapInput {
  width: number;
  height: number;
  numPorts: number;
  numCities: number;
}

export interface RenderInput {
  sizeFactor: number; // larger values correspond to larger continents and oceans
  numLandColors: number;
  numWaterColors: number;
  waterNoiseCutoff: number; // must be in the interval (0, 1)
  colorLowestPercent: number; // must be in the interval [0, 100]
}

export interface ColorsAndCutoffs {
  noiseCutoffs: number[];
  colors: number[][];
}

export interface TileMapOutput {
  tileMap: TILE_TYPE[][];
  portTiles: number[][];
  cityTiles: number[][];
}

// FIXME: implement
export interface AllGameMapsOutput {
  tileMap: TILE_TYPE[][];
  colorMap: number[][][];
}
