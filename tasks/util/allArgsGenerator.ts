import { generateItems } from './itemGenerator';
import { generateGameConstants } from './constants';
import { ItemWithMetadata } from '../../util/types/getter';
import { assignDepthColor, generateNoiseMatrix, placePortsAndCities } from './mapUtils';
import { AllGameArgs } from './types';

// This generates all game parameters needed to deploy the GameEngine.sol contract

// FIXME: implement
export const generateAllGameArgs = (allGameItems: ItemWithMetadata[], itemRatio: number[]): AllGameArgs => {
  return { gameConstants: 1, blockMap: [[1]] }; // FIXME
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
