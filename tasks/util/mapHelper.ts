import { Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { decodeBigNumberishArr, position } from 'curio-vault';
import { Component__factory } from './../../typechain-types/factories/contracts/Component__factory';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { TILE_TYPE, componentNameToId, encodePosition, TileMap, Position, chainInfo } from 'curio-vault';
import { TILE_WIDTH } from './constants';
import { confirmTx } from './deployHelper';
import SimplexNoise from 'simplex-noise';
import { MapInput } from './types';
import chalk from 'chalk';

const MAX_UINT256 = BigInt(Math.pow(2, 256)) - BigInt(1);

/**
 * Encode columns of a tile map using unique prime factorization.
 * @param tileMap
 * @param numInitTerrainTypes
 * @param batchSize
 * @returns a 2d array of encoded columns, each in batches
 */
export const encodeTileMap = (tileMap: TileMap, numInitTerrainTypes: any, batchSize: any): string[][] => {
  const result: string[][] = [];
  const numBatchPerCol = Math.floor(tileMap[0].length / batchSize);
  const lastBatchSize = tileMap[0].length % batchSize;

  let encodedCol: string[];
  let tempBatch: bigint;
  let k: number;

  for (let x = 0; x < tileMap.length; x++) {
    encodedCol = [];
    for (k = 0; k < numBatchPerCol; k++) {
      tempBatch = BigInt(0);
      for (let y = 0; y < batchSize; y++) {
        tempBatch += BigInt(tileMap[x][k * batchSize + y]) * BigInt(numInitTerrainTypes) ** BigInt(y);
        if (tempBatch >= MAX_UINT256) throw new Error('Encoding exceeds uint256 max size');
      }
      encodedCol.push(tempBatch.toString());
    }
    if (lastBatchSize > 0) {
      tempBatch = BigInt(0);
      for (let y = 0; y < lastBatchSize; y++) {
        tempBatch += BigInt(tileMap[x][k * batchSize + y]) * BigInt(numInitTerrainTypes) ** BigInt(y);
        if (tempBatch >= MAX_UINT256) throw new Error('Encoding exceeds uint256 max size');
      }
      encodedCol.push(tempBatch.toString());
    }
    result.push(encodedCol);
  }

  return result;
};

export const generateBlankFixmap = (): TileMap => {
  let tileMap: TileMap = [];

  // assign a blank map
  for (let i = 0; i < 100 * TILE_WIDTH; i++) {
    let col: TILE_TYPE[] = [];
    for (let j = 0; j < 100 * TILE_WIDTH; j++) {
      col.push(TILE_TYPE.LAND);
    }
    tileMap.push(col);
  }

  return tileMap;
};

export const generateMap = (mapInput: MapInput): TileMap => {
  // add mountains
  let tileMap: TileMap = generateMapWithMountains(mapInput);
  const innerRadiusByTileCount = mapInput.innerRadiusByTileCount;
  const innerDiameterByTileCount = innerRadiusByTileCount ? innerRadiusByTileCount * 2 + 1 : 0;

  // specify outer density
  const level1GoldMineDensity = 0.15; // restore to 0.1
  const level1BarbarianDensity = 0.06; // restore to 0.02
  const level2BarbarianDensity = 0.04; // restore to 0.02

  if (!innerRadiusByTileCount) {
    // add gold mines and barbarians
    const totalTileCount = mapInput.width * mapInput.height;
    for (let i = 0; i < totalTileCount * level1GoldMineDensity; i++) {
      const pos = chooseRandomEmptyPosition(tileMap);
      tileMap[pos.x][pos.y] = TILE_TYPE.GOLDMINE_LV1;
    }
    for (let i = 0; i < totalTileCount * level1BarbarianDensity; i++) {
      const pos = chooseRandomEmptyPosition(tileMap);
      tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV1;
    }
    for (let i = 0; i < totalTileCount * level2BarbarianDensity; i++) {
      const pos = chooseRandomEmptyPosition(tileMap);
      tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV2;
    }
  } else {
    // specify inner density
    const level1GoldMineDensityInner = 0.3;
    const level1BarbarianDensityInner = 0.02;
    const level2BarbarianDensityInner = 0.02;

    // add inner gold mines and barbarians
    const totalTileCountInner = innerDiameterByTileCount * innerDiameterByTileCount;
    console.log(chalk.bgBlue(`total tile count inner: ${totalTileCountInner}`));
    for (let i = 0; i < totalTileCountInner * level1GoldMineDensityInner; i++) {
      const pos = chooseRandomEmptyPosition(tileMap, true, innerRadiusByTileCount);
      tileMap[pos.x][pos.y] = TILE_TYPE.GOLDMINE_LV1;
    }
    for (let i = 0; i < totalTileCountInner * level1BarbarianDensityInner; i++) {
      const pos = chooseRandomEmptyPosition(tileMap, true, innerRadiusByTileCount);
      tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV1;
    }
    for (let i = 0; i < totalTileCountInner * level2BarbarianDensityInner; i++) {
      const pos = chooseRandomEmptyPosition(tileMap, true, innerRadiusByTileCount);
      tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV2;
    }

    // add outer gold mines and barbarians
    const totalTileCountOuter = mapInput.height * mapInput.width - totalTileCountInner;
    console.log(chalk.bgBlue(`total tile count outer: ${totalTileCountOuter}`));
    for (let i = 0; i < totalTileCountOuter * level1GoldMineDensity; i++) {
      const pos = chooseRandomEmptyPosition(tileMap, false, innerRadiusByTileCount);
      tileMap[pos.x][pos.y] = TILE_TYPE.GOLDMINE_LV1;
    }
    for (let i = 0; i < totalTileCountOuter * level1BarbarianDensity; i++) {
      const pos = chooseRandomEmptyPosition(tileMap, false, innerRadiusByTileCount);
      tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV1;
    }
    for (let i = 0; i < totalTileCountOuter * level2BarbarianDensity; i++) {
      const pos = chooseRandomEmptyPosition(tileMap, false, innerRadiusByTileCount);
      tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV2;
    }
  }

  return tileMap;
};

export const generateEmptyMap = (mapInput: MapInput): TILE_TYPE[][] => {
  const tileMap: TILE_TYPE[][] = [];
  for (let x = 0; x < mapInput.width; x++) {
    const col: TILE_TYPE[] = [];
    for (let y = 0; y < mapInput.height; y++) {
      col.push(TILE_TYPE.LAND);
    }
    tileMap.push(col);
  }
  return tileMap;
};

/**
 * Generate a 2d map of tile types using Perlin noise.
 * @param mapInput map dimensions
 * @param sizeFactor how large each mountain is
 * @param plateSizeMultiplier how large a large plate is relative to a small plate
 * @param superpositionRatio relative weights of small and large plates
 * @param mountainPercentage how much mountain there is
 * @returns a 2d matrix of tile types
 */
export const generateMapWithMountains = (mapInput: MapInput, mountainPercentage: number = 0.06, sizeFactor: number = 5, plateSizeMultiplier: number = 3, superpositionRatio: number[] = [0.1, 0.9]): TILE_TYPE[][] => {
  // Use multiple layers of Perlin noise to generate randomized continents and oceans with plate tectonics
  const microNoiseMap: number[][] = generateNoiseMap(mapInput.width, mapInput.height, sizeFactor);
  const plateNoiseMap: number[][] = generateNoiseMap(mapInput.width, mapInput.height, sizeFactor * plateSizeMultiplier);
  const noiseMap: number[][] = superpose([microNoiseMap, plateNoiseMap], superpositionRatio);

  const tileMap: TILE_TYPE[][] = noiseMap.map((col) => col.map((val) => (val > mountainPercentage ? TILE_TYPE.LAND : TILE_TYPE.MOUNTAIN)));
  return tileMap;
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

  for (let x = 0; x < mapWidth; x++) {
    const col: number[] = [];
    for (let y = 0; y < mapHeight; y++) {
      const val = noise.noise2D(x / sizeFactor, y / sizeFactor);
      col.push(Math.abs(scale(val, 0, 1)));
    }
    _noiseMatrix.push(col);
  }
  return _noiseMatrix;
};

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

export const chooseRandomEmptyPosition = (tileMap: TileMap, inner: boolean = false, innerWidth: number = 0): position => {
  const mapWidth = tileMap.length;
  const mapHeight = tileMap[0].length;
  const center = { x: Math.floor(mapWidth / 2), y: Math.floor(mapHeight / 2) };

  let pos;
  do {
    const x = Math.floor(Math.random() * mapWidth);
    const y = Math.floor(Math.random() * mapHeight);
    // console.log(x, y);
    if (inner && !isPositionInner({ x, y }, center, innerWidth)) continue;
    if (!inner && isPositionInner({ x, y }, center, innerWidth)) continue;
    if (tileMap[x][y] === TILE_TYPE.LAND) {
      pos = { x, y };
    }
  } while (!pos);

  return pos;
};

export const isPositionInner = (pos: position, center: position, innerWidth: number): boolean => {
  const xDiff = Math.abs(pos.x - center.x);
  const yDiff = Math.abs(pos.y - center.y);
  return xDiff <= innerWidth && yDiff <= innerWidth;
};

export const getPositionFromLargeTilePosition = (pos: position, tileWidth: number): position => {
  return { x: pos.x * tileWidth, y: pos.y * tileWidth };
};

export const getProperTilePosition = (pos: position, tileWidth: number): position => {
  return { x: pos.x - (pos.x % tileWidth), y: pos.y - (pos.y % tileWidth) };
};

// fixmap helpers

export const initializeFixmap = async (hre: HardhatRuntimeEnvironment, diamond: Curio) => {
  const [player1, player2, player3, player4] = await hre.ethers.getSigners();
  const gasLimit = chainInfo[hre.network.name].gasLimit;

  const player1Pos = { x: 25, y: 55 };
  const player2Pos = { x: 25, y: 25 };
  const player3Pos = { x: 55, y: 25 };
  const player4Pos = { x: 85, y: 25 };
  const playerPositions = [player1Pos, player2Pos, player3Pos, player4Pos];

  // initialize 4 players
  await confirmTx(await diamond.connect(player1).joinGame(player1Pos, 'A', { gasLimit: gasLimit }), hre);
  await confirmTx(await diamond.connect(player2).joinGame(player2Pos, 'B', { gasLimit: gasLimit }), hre);
  await confirmTx(await diamond.connect(player3).joinGame(player3Pos, 'C', { gasLimit: gasLimit }), hre);
  await confirmTx(await diamond.connect(player4).joinGame(player4Pos, 'D', { gasLimit: gasLimit }), hre);

  const player1Id = (await diamond.getEntityByAddress(player1.address)).toNumber();
  const player2Id = (await diamond.getEntityByAddress(player2.address)).toNumber();
  const player3Id = (await diamond.getEntityByAddress(player3.address)).toNumber();
  const player4Id = (await diamond.getEntityByAddress(player4.address)).toNumber();

  // fetch all settler Ids by fetching the entities on a given position
  const positionComponentAddr = await diamond.getComponentById(componentNameToId[Position]);
  const positionComponent = await Component__factory.connect(positionComponentAddr, player1);

  const player1SettlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition(player1Pos)))[0];
  const player2SettlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition(player2Pos)))[0];
  const player3SettlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition(player3Pos)))[0];
  const player4SettlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition(player4Pos)))[0];
};

export const addGetEntity = async (diamond: Curio): Promise<number> => {
  await diamond.addEntity();
  return (await diamond.getEntity()).toNumber();
};
