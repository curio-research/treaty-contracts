import { Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { decodeBigNumberishArr } from './../../util/serde/common';
import { Component__factory } from './../../typechain-types/factories/contracts/Component__factory';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { position } from './../../util/types/common';
import { TILE_TYPE, componentNameToId, encodePosition, getImmediateSurroundingPositions, TileMap, Tag, Position, Owner, Health, Speed, Attack, Defense, Load, LastTimestamp, Tags, encodeString, encodeUint256, Capacity } from 'curio-vault';

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
  for (let i = 0; i < 100; i++) {
    let col: TILE_TYPE[] = [];
    for (let j = 0; j < 100; j++) {
      col.push(TILE_TYPE.LAND);
    }
    tileMap.push(col);
  }

  return tileMap;
};

// main map generator
export const generateMap = (worldWidth: number, worldHeight: number): TileMap => {
  let tileMap: TileMap = [];

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

export const chooseRandomEmptyLandPosition = (tileMap: TileMap): position => {
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

// fixmap helpers

export const initializeFixmap = async (hre: HardhatRuntimeEnvironment, diamond: Curio) => {
  const [player1, player2, player3, player4] = await hre.ethers.getSigners();

  const player1Pos = { x: 2, y: 5 };
  const player2Pos = { x: 2, y: 2 };
  const player3Pos = { x: 5, y: 2 };
  const player4Pos = { x: 8, y: 2 };
  const playerPositions = [player1Pos, player2Pos, player3Pos, player4Pos];

  // initialize 4 players
  await (await diamond.connect(player1).initializePlayer(player1Pos, 'A', { gasLimit: 100_000_000 })).wait();
  await (await diamond.connect(player2).initializePlayer(player2Pos, 'B', { gasLimit: 100_000_000 })).wait();
  await (await diamond.connect(player3).initializePlayer(player3Pos, 'C', { gasLimit: 100_000_000 })).wait();
  await (await diamond.connect(player4).initializePlayer(player4Pos, 'D', { gasLimit: 100_000_000 })).wait();

  const player1Id = (await diamond.getPlayerId(player1.address)).toNumber();
  const player2Id = (await diamond.getPlayerId(player2.address)).toNumber();
  const player3Id = (await diamond.getPlayerId(player3.address)).toNumber();
  const player4Id = (await diamond.getPlayerId(player4.address)).toNumber();

  // fetch all settler Ids by fetching the entities on a given position
  const positionComponentAddr = await diamond.getComponentById(componentNameToId[Position]);
  const positionComponent = await Component__factory.connect(positionComponentAddr, player1);

  const player1SettlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition(player1Pos)))[0];
  const player2SettlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition(player2Pos)))[0];
  const player3SettlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition(player3Pos)))[0];
  const player4SettlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition(player4Pos)))[0];

  // settle on all 4 spots
  await diamond.connect(player1).foundCity(player1SettlerId, getImmediateSurroundingPositions(player1Pos), '');
  await diamond.connect(player2).foundCity(player2SettlerId, getImmediateSurroundingPositions(player2Pos), '');
  await diamond.connect(player3).foundCity(player3SettlerId, getImmediateSurroundingPositions(player3Pos), '');
  await diamond.connect(player4).foundCity(player4SettlerId, getImmediateSurroundingPositions(player4Pos), '');

  const players = [player1Id];

  // spawn armies
  for (let i = 0; i < players.length; i++) {
    const playerID = players[i];
    const playerPosition = playerPositions[i];

    await diamond.createArmy(playerID, playerPosition);
    const entity = (await diamond.getEntity()).toNumber();
    await (await diamond.setComponentValue(Speed, entity, encodeUint256(2))).wait();
  }
};

export const addGetEntity = async (diamond: Curio): Promise<number> => {
  await (await diamond.addEntity()).wait();
  return (await diamond.getEntity()).toNumber();
};
