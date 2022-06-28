import { BigNumberish, BigNumber } from 'ethers';
import SimplexNoise from 'simplex-noise';
import { RenderInput, ColorsAndCutoffs, TileMapOutput, TILE_TYPE, AllGameMapsOutput, MapInput } from './types';

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
  for (let x = 0; x < mapWidth; x++) {
    const col: number[] = [];
    for (let y = 0; y < mapHeight; y++) {
      col.push(defaultValue);
    }
    result.push(col);
  }
  return result;
};

// This generates all game parameters needed to deploy the GameEngine.sol contract
export const getValue = (v: BigNumberish) => (v as BigNumber).toNumber();

/**
 * Generate two 2d maps of tiles, one representing tile types and the other representing colors in RGB.
 * @param mapInput
 * @param renderInput
 * @returns a 2d matrix of tile types and a 2d matrix of RGB values
 */
export const generateGameMaps = (mapInput: MapInput, renderInput: RenderInput): AllGameMapsOutput => {
  // Use multiple layers of Perlin noise to generate randomized continents and oceans with plate tectonics
  const microNoiseMap: number[][] = generateNoiseMap(mapInput.width, mapInput.height, renderInput.sizeFactor);
  const plateNoiseMap: number[][] = generateNoiseMap(mapInput.width, mapInput.height, renderInput.sizeFactor * renderInput.plateSizeMultiplier);
  const noiseMap: number[][] = superpose([microNoiseMap, plateNoiseMap], renderInput.superpositionRatio);

  // Generate colors, cutoffs, and tile map
  const colorsAndCutoffs: ColorsAndCutoffs = getColorsAndCutoffs(renderInput);
  const colorMap: number[][][] = noiseMap.map((row: number[]) => {
    return row.map((val: number) => assignDepthColor(val, colorsAndCutoffs));
  });

  console.log(colorMap);

  const { tileMap, portTiles, cityTiles } = placePortsAndCities(colorMap, mapInput.numPorts, mapInput.numCities);

  // Update colorMap with ports and cities
  let tile: number[];
  for (let k = 0; k < portTiles.length; k++) {
    tile = portTiles[k];
    colorMap[tile[0]][tile[1]] = [100, 0, 0];
  }
  for (let k = 0; k < cityTiles.length; k++) {
    tile = cityTiles[k];
    colorMap[tile[0]][tile[1]] = [100, 100, 100];
  }

  // run bfs
  console.log(tileMap);

  numberOfIslands(tileMap);

  return { tileMap, colorMap };
};

const validLand = [1, 2, 4, 5];

const numberOfIslands = (map: number[][]) => {
  let count = 0; // the counted islands
  //Go though each cell of the 2d array/grid
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (validLand.includes(map[row][col])) {
        count++;
        explore(row, col, map);
      }
    }
  }
  console.log('Number of islands: ', count);
  return count;
};
// Takes a cell in a grid with a “1” , turns it into a “0” and explores (DFS) any of the left, right, up, down 1’s
const explore = (row: any, col: any, grid: any) => {
  //Let's return IF
  // row < 0 OR col < 0 OR row is out of bounds(meaning the row is larger than the number of arrays in the 2d array) OR col is at/out of bounds (meaning the current col is at/over the number of elements a row has.)
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[row].length || grid[row][col] === 3 || grid[row][col] === 0 || grid[row][col] === 69) {
    return;
  }

  //Otherwise, we should explore it!
  //First let's set the current spot to "0"
  grid[row][col] = 69;

  //Possibilites:
  // 1) 1 to the right, left, top, bottom
  //right
  explore(row, col + 1, grid);
  //Left
  explore(row, col - 1, grid);
  //Down
  explore(row + 1, col, grid);
  //Up
  explore(row - 1, col, grid);
};

/**
 * Generate noise matrix from Perlin noise.
 * @param mapWidth
 * @param mapHeight
 * @param sizeFactor determines average sizes of continents and oceans
 * @returns a 2d matrix of numbers between 0 and 1
 */
export const generateNoiseMap = (mapWidth: number, mapHeight: number, sizeFactor: number): number[][] => {
  const noise = new SimplexNoise();

  const scale = (val: number, min: number, max: number) => {
    return (val - min) / (max - min);
  };

  const _noiseMatrix: number[][] = [];

  for (let x = 0; x < mapWidth * xIncrement; x += xIncrement) {
    const col = [];
    for (let y = 0; y < mapHeight * yIncrement; y += yIncrement) {
      const val = noise.noise2D(x / sizeFactor, y / sizeFactor);
      col.push(Math.abs(scale(val, 0, 1)));
    }
    _noiseMatrix.push(col);
  }
  return _noiseMatrix;
};

/**
 * Populate list of color cutoffs and corresponding colors.
 * @param colorInput
 * @returns an array of noise level cutoffs and an array of corresponding RGB values
 */
export const getColorsAndCutoffs = (colorInput: RenderInput): ColorsAndCutoffs => {
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
    colors.push([0, 0, colorLowestPercent + waterColorIncrement * (i - 1)]);
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
  let tileMap: TILE_TYPE[][] = generateEmptyMatrix(colorMap.length, colorMap[0].length, TILE_TYPE.WATER);

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
          tileMap[x][y] = TILE_TYPE.COAST;
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

//////////////////////////////////////////////////////////////////////
////////////////////////////// HELPERS ///////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Superpose an array of 2d matrices based on a given ratio.
 * @param matrices
 * @param ratio
 * @returns a 2d matrix as the superposition result
 */
export const superpose = (matrices: number[][][], ratio: number[]): number[][] => {
  if (ratio.reduce((a, b) => a + b, 0) !== 1) throw new Error('Ratio must sum up to 1');

  const sum: number[][] = [];
  for (let i = 0; i < matrices[0].length; i++) {
    const col: number[] = [];
    for (let j = 0; j < matrices[0][0].length; j++) {
      let val = 0;
      for (let k = 0; k < matrices.length; k++) {
        val += matrices[k][i][j] * ratio[k];
      }
      col.push(val);
    }
    sum.push(col);
  }

  return sum;
};
