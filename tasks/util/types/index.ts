export enum TILE_TYPE {
  PLAIN = 0,
}

export enum ComponentDataTypes {
  UINT,
  STRING,
  BOOL,
  INT,
  ADDRESS,
  POSITION,
  UINT_ARRAY,
  STRING_ARRAY,
  OTHER,
}

export interface MapInput {
  width: number;
  height: number;
}

export interface CompType {
  name: string;
  valueType: ComponentDataTypes;
}

export interface RenderInput {
  /**
   * Higher values correspond to larger continents and oceans.
   */
  sizeFactor: number;

  numLandColors: number;
  numWaterColors: number;

  /**
   * Higher values correspond to more water in the map.
   * Must be in the interval (0, 1). Default is 0.55.
   */
  waterNoiseCutoff: number;

  /**
   * Lower values allow for darker colors, allowing more variation in map colors.
   * Must be in the interval [0, 100]. Default is 40.
   */
  colorLowestPercent: number;

  /**
   * Size multiplier for Perlin matrix responsible for plate tectonics versus that for granular details.
   */
  plateSizeMultiplier: number;

  /**
   * A ratio array for superposing multiple Perlin noise matrices.
   * Numbers in ratio must sum up to 1.
   */
  superpositionRatio: number[];
}

export interface ColorsAndCutoffs {
  noiseCutoffs: number[];
  colors: number[][];
}

export interface GameMapConfig {
  tileMap: TILE_TYPE[][];
  portTiles: Position[];
  cityTiles: Position[];
  oilWellTiles: Position[];
}

export interface GameMapConfigWithColor {
  tileMap: TILE_TYPE[][];
  portTiles: Position[];
  cityTiles: Position[];
  oilWellTiles: Position[];
  colorMap: number[][][];
}

export interface Position {
  x: number;
  y: number;
}
