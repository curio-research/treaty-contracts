// import { WorldConstantsStruct } from './../../typechain-types/Game';
import { generateMap } from './deprecated/mapGenerator';
import { TowerWithLocation } from './../../util/types/tower';
import { generateItems } from './itemGenerator';
import { generateGameConstants, WORLD_WIDTH, WORLD_HEIGHT, ROOM_LENGTH, ITEM_RATIO, masterItems, MAP_MODE } from './constants';
import { ItemWithMetadata } from '../../util/types/getter';
import { assignDepthColor, generateNoiseMatrix, placePortsAndCities } from './mapUtils';

// This generates all game parameters needed to deploy the GameEngine.sol contract

export const generateAllGameArgs = (allGameItems: ItemWithMetadata[], itemRatio: number[]): AllGameArgs => {
  const gameConstants: any = generateGameConstants();
  const masterGameSpecs = generateMap(WORLD_WIDTH, WORLD_HEIGHT, ROOM_LENGTH, masterItems, MAP_MODE.DEFAULT);
  const blockMap = generateItems(masterGameSpecs.blocks, itemRatio);
  return {
    gameConstants: gameConstants,
    allGameItems: allGameItems,
    allTowerArgs: masterGameSpecs.towers,
    blockMap,
  };
};

/**
 * (4X) From a number of basic map configurations, generate a 2d matrix of RGB values showing different tile types.
 * @param mapWidth
 * @param mapHeight
 * @param numPorts
 * @param numCities
 * @returns a 2d matrix of RGB values showing oceans, coastlines, inland areas, ports, and cities
 */
export const generateColorMap = (mapWidth: number, mapHeight: number, numPorts: number, numCities: number): number[][][] => {
  const noiseMap: number[][] = generateNoiseMatrix(mapWidth, mapHeight);
  const colorMap: number[][][] = noiseMap.map((row: number[]) => {
    return row.map((val: number) => assignDepthColor(val));
  });
  const { tileMap, portTiles, cityTiles } = placePortsAndCities(colorMap, numPorts, numCities);

  let tile: number[];
  for (let k = 0; k < portTiles.length; k++) {
    tile = portTiles[k];
    colorMap[tile[0]][tile[1]] = [100, 0, 0];
  }
  for (let k = 0; k < cityTiles.length; k++) {
    tile = cityTiles[k];
    colorMap[tile[0]][tile[1]] = [100, 100, 100];
  }

  return colorMap;
};

interface AllGameArgs {
  gameConstants: any;
  allGameItems: ItemWithMetadata[];
  allTowerArgs: TowerWithLocation[];
  blockMap: number[][];
}
