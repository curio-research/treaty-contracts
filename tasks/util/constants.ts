import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Duration, encodeString, encodeUint256, InventoryType, InventoryTypeOptions, Tag, Tags, TILE_TYPE } from 'curio-vault';
import { Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { addGetEntity } from './mapHelper';
import { MapInput } from './types';
import { confirm } from './deployHelper';
import manualParameters from '../manual_parameters.json';
import worldParameters from '../world_parameters.json';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// WORLD CONSTANTS
// ----------------------------------------------------------

export const SMALL_MAP_INPUT: MapInput = {
  width: 19,
  height: 19,
};

export const TILE_WIDTH = 5;
export const NUM_INIT_TERRAIN_TYPES = Object.keys(TILE_TYPE).length - 1;

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): any => {
  return {
    // admin info
    admin: adminAddr,
    // map info
    tileWidth: TILE_WIDTH,
    worldWidth: mapInput.width * TILE_WIDTH,
    worldHeight: mapInput.height * TILE_WIDTH,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
    initBatchSize: Math.floor(150 / NUM_INIT_TERRAIN_TYPES),
    // manual configs
    maxCityCountPerPlayer: 3,
    maxArmyCountPerPlayer: 2,
    maxPlayerCount: 20,
    maxTroopCountPerArmy: 16542,
    // generated constants
    ...worldParameters,
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

  let inventoryType = InventoryTypeOptions.Horseman;

  let entity = Number(await diamond.getEntity());

  // Horseman
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Horseman, 120, 2, 1, 2, 60, 120, 1, 95), hre);
  templateNames.push(InventoryTypeOptions.Horseman);
  templateIDs.push(entity++);

  // Warrior
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Warrior, 120, 1, 1, 2, 60, 120, 1, 95), hre);
  templateNames.push(InventoryTypeOptions.Warrior);
  templateIDs.push(entity++);

  // Slinger
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Slinger, 125, 1, 1, 2, 60, 125, 1, 95), hre);
  templateNames.push(InventoryTypeOptions.Slinger);
  templateIDs.push(entity++);

  // Guard
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Guard, 120, 0, 0, 0, 60, 120, 0, 0), hre);
  templateNames.push(InventoryTypeOptions.Guard);
  templateIDs.push(entity++);

  // Gold
  inventoryType = InventoryTypeOptions.Gold;
  entity = await addGetEntity(diamond);
  await confirm(await diamond.setComponentValue(Tag, entity, encodeString(Tags.ResourceTemplate)), hre);
  await confirm(await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType)), hre);
  await confirm(await diamond.setComponentValue(Duration, entity, encodeUint256(1)), hre);
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Food
  inventoryType = InventoryTypeOptions.Food;
  entity = await addGetEntity(diamond);
  await confirm(await diamond.setComponentValue(Tag, entity, encodeString(Tags.ResourceTemplate)), hre);
  await confirm(await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType)), hre);
  await confirm(await diamond.setComponentValue(Duration, entity, encodeUint256(1)), hre);
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Register template names used for shortcuts
  await confirm(await diamond.registerTemplateShortcuts(templateNames, templateIDs), hre);
};
