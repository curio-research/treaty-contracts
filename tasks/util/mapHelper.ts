import { Curio, WorldConstantsStruct } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { Army, decodeBigNumberishArr, position } from 'curio-vault';
import { Component__factory } from './../../typechain-types/factories/contracts/Component__factory';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { TILE_TYPE, componentNameToId, encodePosition, getImmediateSurroundingPositions, TileMap, Tag, Position, Owner, Health, Speed, Attack, Defense, Load, LastTimestamp, Tags, encodeString, encodeUint256, getRightPos, chainInfo } from 'curio-vault';
import { TILE_WIDTH } from './constants';
import { confirm } from './deployHelper';
import SimplexNoise from 'simplex-noise';
import { MapInput } from './types';
import chalk from 'chalk';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

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

  // add gold mines and barbarians
  const level1GoldMineDensity = 0.1;
  const level1BarbarianDensity = 0.02;
  const level2BarbarianDensity = 0.02;
  const totalTileCount = mapInput.width * mapInput.height;
  for (let i = 0; i < totalTileCount * level1GoldMineDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.GOLDMINE_LV1;
  }
  for (let i = 0; i < totalTileCount * level1BarbarianDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV1;
  }
  for (let i = 0; i < totalTileCount * level2BarbarianDensity; i++) {
    const pos = chooseRandomEmptyLandPosition(tileMap);
    tileMap[pos.x][pos.y] = TILE_TYPE.BARBARIAN_LV2;
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

export const chooseRandomEmptyLandPosition = (tileMap: TileMap): position => {
  const mapWidth = tileMap.length;
  const mapHeight = tileMap[0].length;

  let pos;
  do {
    const x = Math.floor(Math.random() * mapWidth);
    const y = Math.floor(Math.random() * mapHeight);
    if (tileMap[x][y] === TILE_TYPE.LAND) {
      pos = { x, y };
    }
  } while (!pos);

  return pos;
};

export const getPositionFromLargeTilePosition = (position: position, tileWidth: number): position => {
  return { x: position.x * tileWidth, y: position.y * tileWidth };
};

export const getProperTilePosition = (position: position, tileWidth: number): position => {
  return { x: position.x - (position.x % tileWidth), y: position.y - (position.y % tileWidth) };
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
  await confirm(await diamond.connect(player1).initializePlayer(player1Pos, 'A', { gasLimit: gasLimit }), hre);
  await confirm(await diamond.connect(player2).initializePlayer(player2Pos, 'B', { gasLimit: gasLimit }), hre);
  await confirm(await diamond.connect(player3).initializePlayer(player3Pos, 'C', { gasLimit: gasLimit }), hre);
  await confirm(await diamond.connect(player4).initializePlayer(player4Pos, 'D', { gasLimit: gasLimit }), hre);

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

  // spawn armies
  await diamond.createArmy(player1Id, getRightPos(player1Pos));
  let entity = (await diamond.getEntity()).toNumber();
  await confirm(await diamond.setComponentValue(Speed, entity, encodeUint256(5)), hre);

  await diamond.createArmy(player2Id, getRightPos(getRightPos(player1Pos)));
  entity = (await diamond.getEntity()).toNumber();
  await confirm(await diamond.setComponentValue(Speed, entity, encodeUint256(5)), hre);
};

export const addGetEntity = async (diamond: Curio): Promise<number> => {
  await diamond.addEntity();
  return (await diamond.getEntity()).toNumber();
};

export const preparePlayers = async (playerCount: number): Promise<SignerWithAddress[]> => {
  return 1;
};

export const testLoad = async (hre: HardhatRuntimeEnvironment, diamond: Curio, playerCount: number, periodPerTnPerPlayer: number, tnsPerPlayer: number, functionName: string) => {
  // Get more players

  // Fetch players
  const players = await hre.ethers.getSigners(); // players[0] is the game admin
  const admin = players[0];
  console.log(chalk.bgRed.yellow('>>> Signer count:', players.length));
  if (players.length < playerCount) throw new Error('Not enough signers');

  // Fetch gas limit, and necessary components
  const gasLimit = chainInfo[hre.network.name].gasLimit;
  const positionComponentAddr = await diamond.getComponentById(componentNameToId[Position]);
  const positionComponent = Component__factory.connect(positionComponentAddr, admin);
  const tagComponentAddr = await diamond.getComponentById(componentNameToId[Tag]);
  const tagComponent = Component__factory.connect(tagComponentAddr, admin);

  // Initialize each player with a city (sync)
  let startTime = performance.now();
  for (let i = 0; i < playerCount; i++) {
    console.log(chalk.bgRed.yellow.dim(`>>> initializing player with city ${i}`));
    await (await diamond.connect(players[i]).initializePlayer({ x: i * TILE_WIDTH, y: 0 }, `Player ${i}`, { gasLimit: gasLimit })).wait();
    const settlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition({ x: i * TILE_WIDTH, y: 0 }), { gasLimit: gasLimit }))[0];
    if (!settlerId) throw new Error('Settler not initialized yet');
    await confirm(await diamond.connect(players[i]).foundCity(settlerId, [{ x: i * TILE_WIDTH, y: 0 }], `City ${i}`, { gasLimit: gasLimit }), hre);
  }
  console.log(chalk.bgRed.yellow(`>>> Players initialized with city after ${performance.now() - startTime} ms`));
  const playerIds = players.map(async (player) => (await diamond.getPlayerId(player.address)).toNumber());

  // Create an army for each player and log IDs (sync)
  startTime = performance.now();
  console.log(chalk.bgRed.yellow(`>>> Starting to create armies, cities should be founded when this prints`));
  for (let i = 0; i < playerCount; i++) {
    await diamond.connect(admin).createArmy(playerIds[i], { x: i * TILE_WIDTH, y: 0 }, { gasLimit: gasLimit });
  }
  const allArmyIds = decodeBigNumberishArr(await tagComponent.getEntitiesWithValue(encodeString('Army')));
  console.log(chalk.bgRed.yellow(`>>> All armies created after ${performance.now() - startTime} ms`));
  console.log(chalk.bgRed.yellow('>>> all army IDs'), allArmyIds);

  await sleep(5000);

  // Load test begins
  for (let k = 0; k < tnsPerPlayer; k++) {
    // // Wait between batches of transactions
    // await sleep(periodPerTnPerPlayer);

    // Move all armies south by 1 coordinate (async)
    startTime = performance.now();
    let armiesAdded = 0;
    Array.from(Array(playerCount).keys()).forEach(async (i) => {
      console.log(chalk.bgRed.yellow.dim(`>>> Moving army for player ${i}...`));
      await confirm(await diamond.connect(players[i]).move(allArmyIds[i], { x: i * TILE_WIDTH, y: 1 }, { gasLimit: gasLimit }), hre);

      armiesAdded++;
      if (armiesAdded === playerCount) console.log(`>>> All army movements finished after ${performance.now() - startTime} ms`);
    });
  }
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
