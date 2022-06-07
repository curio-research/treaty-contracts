import { generateItems } from './itemGenerator';
import { generateGameConstants } from './constants';
import { ItemWithMetadata } from '../../util/types/getter';
import { assignDepthColor, generateNoiseMatrix, getColorsAndCutoffs, placePortsAndCities } from './mapUtils';
import { AllGameArgs, ColorInput, ColorsAndCutoffs, MapInput } from './types';

// This generates all game parameters needed to deploy the GameEngine.sol contract

// FIXME: implement
export const generateAllGameArgs = (allGameItems: ItemWithMetadata[], itemRatio: number[]): AllGameArgs => {
  const mapInput: MapInput = {
    width: 300,
    height: 240,
    sizeFactor: 50,
    numPorts: 300,
    numCities: 300,
  };
  const colorInput: ColorInput = {
    numLandColors: 5,
    numWaterColors: 2,
    waterNoiseCutoff: 0.4,
    colorLowestPercent: 40,
  };
  return {
    gameConstants: 1,
    blockMap: [[1]], // FIXME
    colorMap: generateColorMap(mapInput, colorInput),
  };
};

/**
 * (4X) From a number of basic map configurations, generate a 2d matrix of RGB values showing different tile types.
 * @param mapInput
 * @param colorInput
 * @returns a 2d matrix of RGB values showing oceans, coastlines, inland areas, ports, and cities
 */
export const generateColorMap = (mapInput: MapInput, colorInput: ColorInput): number[][][] => {
  const noiseMap: number[][] = generateNoiseMatrix(mapInput.width, mapInput.height, mapInput.sizeFactor);
  const colorsAndCutoffs: ColorsAndCutoffs = getColorsAndCutoffs(colorInput);
  const colorMap: number[][][] = noiseMap.map((row: number[]) => {
    return row.map((val: number) => assignDepthColor(val, colorsAndCutoffs));
  });
  const { tileMap, portTiles, cityTiles } = placePortsAndCities(colorMap, mapInput.numPorts, mapInput.numCities);

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
