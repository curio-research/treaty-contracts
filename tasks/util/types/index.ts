export enum TILE_TYPE {
  OCEAN = 0,
  COASTLINE = 1,
  INLAND = 2,
  PORT = 3,
  CITY = 4,
}

export interface TileMapOutput {
  tileMap: TILE_TYPE[][];
  portTiles: number[][];
  cityTiles: number[][];
}
