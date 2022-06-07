import SimplexNoise from 'simplex-noise';
import { ColorInput, ColorsAndCutoffs, TileMapOutput, TILE_TYPE } from './types';

//////////////////////////////////////////////////////////////////////
///////////////////////////// CONSTANTS //////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Larger values correspond to smaller continent sizes. Held constant.
 */
const INCREMENT = 1;

const xIncrement = INCREMENT;
const yIncrement = INCREMENT;

//////////////////////////////////////////////////////////////////////
///////////////////////////// FUNCTIONS //////////////////////////////
//////////////////////////////////////////////////////////////////////

export const generateEmptyMatrix = (mapWidth: number, mapHeight: number, defaultValue: any): any[][] => {
  const result: number[][] = [];
  for (let i = 0; i < mapHeight; i++) {
    const row: number[] = [];
    for (let j = 0; j < mapWidth; j++) {
      row.push(defaultValue);
    }
    result.push(row);
  }
  return result;
};

/**
 * Generate noise matrix from Perlin noise.
 * @param mapWidth
 * @param mapHeight
 * @param sizeFactor determines average sizes of continents and oceans
 * @returns a 2d matrix of numbers between 0 and 1
 */
export const generateNoiseMatrix = (mapWidth: number, mapHeight: number, sizeFactor: number): number[][] => {
  const noise = new SimplexNoise();

  const scale = (val: number, min: number, max: number) => {
    return (val - min) / (max - min);
  };

  const _noiseMatrix: number[][] = [];

  for (let x = 0; x < mapHeight * xIncrement; x += xIncrement) {
    const row = [];
    for (let y = 0; y < mapWidth * yIncrement; y += yIncrement) {
      const val = noise.noise2D(x / sizeFactor, y / sizeFactor);
      row.push(Math.abs(scale(val, 0, 1)));
    }
    _noiseMatrix.push(row);
  }
  return _noiseMatrix;
};

/**
 * Populate list of color cutoffs and corresponding colors.
 * @param colorInput
 * @returns an array of noise level cutoffs and an array of corresponding RGB values
 */
export const getColorsAndCutoffs = (colorInput: ColorInput): ColorsAndCutoffs => {
  const { numLandColors, numWaterColors, waterNoiseCutoff, colorLowestPercent } = colorInput;

  const noiseCutoffs: number[] = [];
  const colors: number[][] = [];
  const waterNoiseIncrement = waterNoiseCutoff / numWaterColors;
  const landNoiseIncrement = (1 - waterNoiseCutoff) / numLandColors;
  const waterColorIncrement = (100 - colorLowestPercent) / numWaterColors;
  const landColorIncrement = (100 - colorLowestPercent) / numLandColors;

  for (let i = 1; i <= numWaterColors; i++) {
    // land is green
    noiseCutoffs.push(waterNoiseIncrement * i);
    colors.push([0, 0, 100 - colorLowestPercent + waterColorIncrement * (i - 1)]);
  }
  for (let i = 1; i <= numLandColors; i++) {
    // water is blue
    noiseCutoffs.push(waterNoiseCutoff + landNoiseIncrement * i);
    colors.push([0, 100 - landColorIncrement * i, 0]);
  }

  return { noiseCutoffs, colors };
};

/**
 * Automatically assign colors to a tile according to cutoffs.
 * @param noiseValue
 * @param colorsAndCutoffs
 * @returns a color array in the form of [R, G, B]
 */
export const assignDepthColor = (noiseValue: number, colorsAndCutoffs: ColorsAndCutoffs): number[] => {
  const { noiseCutoffs, colors } = colorsAndCutoffs;

  for (let i = 0; i < noiseCutoffs.length; i++) {
    if (noiseValue < noiseCutoffs[i]) return colors[i];
  }

  return [100, 0, 0]; // should not see any red on map
};

/**
 * Parse an [R, G, B] array to string.
 * @param rgbArray
 * @returns a CSS-format color string
 */
export const rgbArrayToString = (rgbArray: number[]): string => {
  const [r, g, b] = rgbArray;
  return `rgb(${r}%, ${g}%, ${b}%)`;
};

/**
 * Given an RGB color map, place random ports and cities.
 * @param colorMap
 * @param numPorts
 * @param numCities
 * @returns a 2d matrix of tile types
 */
export const placePortsAndCities = (colorMap: number[][][], numPorts: number, numCities: number): TileMapOutput => {
  let tileMap: TILE_TYPE[][] = generateEmptyMatrix(colorMap[0].length, colorMap.length, TILE_TYPE.WATER);

  // 1. Identify coastlines and inland areas.
  const coastlineTiles: number[][] = [];
  const inlandTiles: number[][] = [];
  const portTiles: number[][] = [];
  const cityTiles: number[][] = [];

  for (let x = 0; x < colorMap.length * xIncrement; x += xIncrement) {
    for (let y = 0; y < colorMap[0].length * yIncrement; y += yIncrement) {
      if (colorMap[x][y][1] > 0) {
        // land
        if ((x > 0 && colorMap[x - 1][y][1] == 0) || (x < colorMap.length - 1 && colorMap[x + 1][y][1] == 0) || (y > 0 && colorMap[x][y - 1][1] == 0) || (y < colorMap[0].length - 1 && colorMap[x][y + 1][1] == 0)) {
          tileMap[x][y] = TILE_TYPE.COASTLINE;
          coastlineTiles.push([x, y]);
        } else {
          tileMap[x][y] = TILE_TYPE.INLAND;
          inlandTiles.push([x, y]);
        }
      }
    }
  }

  // 2. Randomly place ports and cities.
  let tileIndex: number;
  let tile: number[];

  while (numPorts) {
    if (!coastlineTiles) throw new Error('Out of tiles for ports');

    tileIndex = Math.floor(Math.random() * coastlineTiles.length);
    tile = coastlineTiles[tileIndex];
    tileMap[tile[0]][tile[1]] = TILE_TYPE.PORT;

    portTiles.push(tile);
    coastlineTiles.splice(tileIndex, 1);
    numPorts--;
  }

  while (numCities) {
    if (!inlandTiles) throw new Error('Out of tiles for cities');

    tileIndex = Math.floor(Math.random() * inlandTiles.length);
    tile = inlandTiles[tileIndex];
    tileMap[tile[0]][tile[1]] = TILE_TYPE.CITY;

    cityTiles.push(tile);
    inlandTiles.splice(tileIndex, 1);
    numCities--;
  }

  return { tileMap, portTiles, cityTiles };
};
