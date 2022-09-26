import { position } from './../../util/types/common';
import { TILE_TYPE } from 'curio-vault';

const MAX_UINT256 = BigInt(Math.pow(2, 256)) - BigInt(1);

/**
 * Encode columns of a tile map using unique prime factorization.
 * @param tileMap
 * @param numInitTerrainTypes
 * @param batchSize
 * @returns a 2d array of encoded columns, each in batches
 */
export const encodeTileMap = (tileMap: TILE_TYPE[][], numInitTerrainTypes: any, batchSize: any): string[][] => {
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

// main map generator
export const generateMap = (worldWidth: number, worldHeight: number): TILE_TYPE[][] => {
  let tileMap: TILE_TYPE[][] = [];

  // assign a blank map
  for (let i = 0; i < worldWidth; i++) {
    let col: TILE_TYPE[] = [];
    for (let j = 0; j < worldHeight; j++) {
      col.push(TILE_TYPE.LAND);
    }
    tileMap.push(col);
  }

  const totalGoldMineDensity = 0.02;
  const totalBarbarianDensity = 0.02;

  // distribution of gold mines
  const level1GoldMineDensity = 0.6;
  const level2GoldMineDensity = 0.3;
  const level3GoldMineDensity = 0.1;

  // distribution of barbarians
  const level1BarbarianDensity = 0.6;
  const level2BarbarianDensity = 0.3;
  const level3BarbarianDensity = 0.1;

  const totalGoldmineCount = worldWidth * worldHeight * totalGoldMineDensity;

  for (let i = 0; i < totalGoldmineCount * level1GoldMineDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.GOLDMINE_LV1;
  }

  for (let i = 0; i < totalGoldmineCount * level2GoldMineDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.GOLDMINE_LV2;
  }

  for (let i = 0; i < totalGoldmineCount * level3GoldMineDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.GOLDMINE_LV3;
  }

  for (let i = 0; i < totalBarbarianDensity * level1BarbarianDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV1;
  }

  for (let i = 0; i < totalBarbarianDensity * level2BarbarianDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV2;
  }

  for (let i = 0; i < totalBarbarianDensity * level3BarbarianDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV3;
  }

  return tileMap;
};

export const chooseRandomEmptyLandPosition = (tileMap: TILE_TYPE[][]): position => {
  const mapWidth = tileMap.length;
  const mapHeight = tileMap[0].length;

  let pos;
  do {
    const x = Math.floor(Math.random() * mapWidth);
    const y = Math.floor(Math.random() * mapHeight);
    if (tileMap[x][y] === 0) {
      pos = { x, y };
    }
  } while (!pos);

  return pos;
};
