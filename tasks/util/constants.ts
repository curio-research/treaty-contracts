import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { InventoryTypeOptions, TILE_TYPE, GameMode } from 'curio-vault';
import { Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { MapInput } from './types';
import { confirmTx } from './deployHelper';
import worldConstants from '../world_parameters.json';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// WORLD CONSTANTS
// ----------------------------------------------------------

export const MAP_INPUT: MapInput = {
  width: 15,
  height: 15,
};

export const TEST_MAP_INPUT: MapInput = {
  width: 1000,
  height: 2,
};

export const TILE_WIDTH = 5;
export const NUM_INIT_TERRAIN_TYPES = Math.floor((Object.keys(TILE_TYPE).length + 1) / 2);

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): any => {
  return {
    // admin info
    admin: adminAddr,
    // map info
    tileWidth: TILE_WIDTH,
    worldWidth: mapInput.width * TILE_WIDTH,
    worldHeight: mapInput.height * TILE_WIDTH,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
    // manual configs
    maxArmyCountPerNation: 2,
    maxNationCount: 1000,
    gameMode: GameMode.REGULAR,
    gameLengthInSeconds: 2000000000,
    // maxTransferDistance: 100,
    // generated constants
    ...worldConstants,
  };
};

// ----------------------------------------------------------
// TEMPLATES
// ----------------------------------------------------------

/**
 * @dev Initialize 5 battle templates and 1 resource template
 * @param diamond diamond address
 */
export const createTemplates = async (diamond: Curio, tokenAddrs: string[], gasLimit: number, hre: HardhatRuntimeEnvironment) => {
  const templateNames: string[] = [];
  const templateIDs: number[] = [];
  const tokenAddrIter = tokenAddrs[Symbol.iterator]();

  let entity = Number(await diamond.getEntity()) + 1;

  // Gold
  await confirmTx(await diamond.addResourceTemplate(tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Gold);
  templateIDs.push(entity++);

  // Food
  await confirmTx(await diamond.addResourceTemplate(tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Food);
  templateIDs.push(entity++);

  // Horseman
  await confirmTx(await diamond.addTroopTemplate(120, 60, 120, 95, tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Horseman);
  templateIDs.push(entity++);

  // Warrior
  await confirmTx(await diamond.addTroopTemplate(120, 60, 120, 95, tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Warrior);
  templateIDs.push(entity++);

  // Slinger
  await confirmTx(await diamond.addTroopTemplate(120, 60, 120, 95, tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Slinger);
  templateIDs.push(entity++);

  // Guard
  await confirmTx(await diamond.addTroopTemplate(120, 60, 120, 0, tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Guard);
  templateIDs.push(entity++);

  // Register template names used for shortcuts
  await confirmTx(await diamond.registerTemplateShortcuts(templateNames, templateIDs, { gasLimit }), hre);
};
