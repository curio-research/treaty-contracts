import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Duration, encodeString, encodeUint256, InventoryType, InventoryTypeOptions, Tag, Tags, TILE_TYPE, GameMode } from 'curio-vault';
import { Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { addGetEntity } from './mapHelper';
import { MapInput } from './types';
import { confirm } from './deployHelper';
import worldConstants from '../world_parameters.json';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// WORLD CONSTANTS
// ----------------------------------------------------------

export const MAP_INPUT: MapInput = {
  width: 14,
  height: 14,
};

export const TILE_WIDTH = 5;
export const NUM_INIT_TERRAIN_TYPES = Math.floor((Object.keys(TILE_TYPE).length + 1) / 2);

export const generateWorldConstants = (adminAddr: string): any => {
  return {
    // admin info
    admin: adminAddr,
    // map info
    tileWidth: TILE_WIDTH,
    worldWidth: MAP_INPUT.width * TILE_WIDTH,
    worldHeight: MAP_INPUT.height * TILE_WIDTH,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
    // manual configs
    maxCityCountPerPlayer: 3,
    maxArmyCountPerPlayer: 2,
    maxPlayerCount: 20,
    gameMode: GameMode.BATTLE_ROYALE,
    gameLengthInSeconds: 2000000000,
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
export const createTemplates = async (diamond: Curio, hre: HardhatRuntimeEnvironment) => {
  const templateNames: string[] = [];
  const templateIDs: number[] = [];
  // TODO: automate this just like the game constants

  let entity = Number(await diamond.getEntity()) + 1;

  // Horseman
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Horseman, 120, 5, 1, 2, 60, 120, 95), hre);
  templateNames.push(InventoryTypeOptions.Horseman);
  templateIDs.push(entity++);

  // Warrior
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Warrior, 120, 1, 1, 2, 60, 120, 95), hre);
  templateNames.push(InventoryTypeOptions.Warrior);
  templateIDs.push(entity++);

  // Slinger
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Slinger, 125, 2, 1, 2, 60, 125, 95), hre);
  templateNames.push(InventoryTypeOptions.Slinger);
  templateIDs.push(entity++);

  // Guard
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Guard, 120, 0, 0, 0, 60, 120, 0), hre);
  templateNames.push(InventoryTypeOptions.Guard);
  templateIDs.push(entity++);

  // Gold
  await confirm(await diamond.addResourceTemplate(InventoryTypeOptions.Gold), hre);
  templateNames.push(InventoryTypeOptions.Gold);
  templateIDs.push(entity++);

  // Food
  await confirm(await diamond.addResourceTemplate(InventoryTypeOptions.Food), hre);
  templateNames.push(InventoryTypeOptions.Food);
  templateIDs.push(entity++);

  // Register template names used for shortcuts
  await confirm(await diamond.registerTemplateShortcuts(templateNames, templateIDs), hre);
};
