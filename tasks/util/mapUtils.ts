import SimplexNoise from 'simplex-noise';
import { TileMapOutput, TILE_TYPE } from './types';

//////////////////////////////////////////////////////////////////////
///////////////////////////// PARAMETERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Larger values correspond to smaller continent sizes.
 */
const INCREMENT = 1;

const xIncrement = INCREMENT;
const yIncrement = INCREMENT;

/**
 * Larger values correspond to larger continent sizes.
 * Scales exactly with value of $INCREMENT; can therefore hold $INCREMENT fixed.
 */
const DIV_FACTOR = 50;

// Color-related variables.
const NUM_LAND_COLOR = 5;
const NUM_OCEAN_COLOR = 2;
const OCEAN_NOISE_CUTOFF = 0.4;
const COLOR_LOWEST_PERCENT = 40;

// populate list of color cutoffs and corresponding colors
const noiseCutoffs: number[] = [];
const colors: number[][] = [];
const oceanNoiseIncrement = OCEAN_NOISE_CUTOFF / NUM_OCEAN_COLOR;
const landNoiseIncrement = (1 - OCEAN_NOISE_CUTOFF) / NUM_LAND_COLOR;
const oceanColorIncrement = (100 - COLOR_LOWEST_PERCENT) / NUM_OCEAN_COLOR;
const landColorIncrement = (100 - COLOR_LOWEST_PERCENT) / NUM_LAND_COLOR;
for (let i = 1; i <= NUM_OCEAN_COLOR; i++) {
  // land is green
  noiseCutoffs.push(oceanNoiseIncrement * i);
  colors.push([0, 0, 100 - COLOR_LOWEST_PERCENT + oceanColorIncrement * (i - 1)]);
}
for (let i = 1; i <= NUM_LAND_COLOR; i++) {
  // ocean is blue
  noiseCutoffs.push(OCEAN_NOISE_CUTOFF + landNoiseIncrement * i);
  colors.push([0, 100 - landColorIncrement * i, 0]);
}

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
 * @returns a 2d matrix of numbers between 0 and 1
 */
export const generateNoiseMatrix = (mapWidth: number, mapHeight: number): number[][] => {
  const noise = new SimplexNoise();

  const scale = (val: number, min: number, max: number) => {
    return (val - min) / (max - min);
  };

  const _noiseMatrix: number[][] = [];

  for (let x = 0; x < mapHeight * xIncrement; x += xIncrement) {
    const row = [];
    for (let y = 0; y < mapWidth * yIncrement; y += yIncrement) {
      const value = noise.noise2D(x / DIV_FACTOR, y / DIV_FACTOR);
      row.push(Math.abs(scale(value, 0, 1)));
    }
    _noiseMatrix.push(row);
  }
  return _noiseMatrix;
};

export const assignDepthColor = (_noiseValue: number): number[] => {
  if (OCEAN_NOISE_CUTOFF < 0 || OCEAN_NOISE_CUTOFF > 1) throw new Error("That's not what cutoff means, brother.");

  for (let i = 0; i < noiseCutoffs.length; i++) {
    if (_noiseValue < noiseCutoffs[i]) return colors[i];
  }

  return [100, 0, 0]; // should not see any red on map
};

/**
 * Parse an RGB array to string.
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
  let tileMap: TILE_TYPE[][] = generateEmptyMatrix(colorMap[0].length, colorMap.length, TILE_TYPE.OCEAN);

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
