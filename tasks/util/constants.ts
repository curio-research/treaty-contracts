import { Attack, Cost, Defense, Duration, encodeString, encodeUint256, Health, InventoryType, InventoryTypeOptions, Speed, Load, Tag, Tags, MoveCooldown, BattleCooldown, TILE_TYPE } from 'curio-vault';
import { WorldConstantsStruct, Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { addGetEntity } from './mapHelper';
import { MapInput } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// GAME CONSTANTS
// ----------------------------------------------------------

export const SMALL_MAP_INPUT: MapInput = {
  width: 10,
  height: 10,
};

export const TILE_WIDTH = 5;
export const NUM_INIT_TERRAIN_TYPES = Object.keys(TILE_TYPE).length;

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): any => {
  return {
    admin: adminAddr,
    worldWidth: mapInput.width * TILE_WIDTH,
    worldHeight: mapInput.height * TILE_WIDTH,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
    initBatchSize: Math.floor(100 / NUM_INIT_TERRAIN_TYPES),
    maxCityCountPerPlayer: 3,
    maxArmyCountPerPlayer: 5,
    maxPlayerCount: 20,
    tileUpgradeGoldCost: 850,
    buildingUpgradeGoldCost: 3000, // internal buildings
    cityUpgradeGoldCost: 100000,
    cityPackCost: 1000000000000000, // temporarily disabled
    initCityCenterGoldLoad: 5000,
    initCityCenterTroopLoad: 1000,
    initCityGold: 1000,
    tileWidth: TILE_WIDTH,
    tileGuardAmount: 40,
    cityGuardAmount: 40,
  };
};

// ----------------------------------------------------------
// TEMPLATES
// ----------------------------------------------------------

/**
 * @dev Initialize 5 battle templates and 1 resource template
 * @param diamond diamond address
 */
export const createTemplates = async (diamond: Curio) => {
  const templateNames: string[] = [];
  const templateIDs: number[] = [];

  let inventoryType = InventoryTypeOptions.Horseman;

  let entity = Number(await diamond.getEntity());

  // Horseman
  await (await diamond.addTroopTemplate(InventoryTypeOptions.Horseman, 120, 2, 1, 2, 60, 120, 0, 5, 1)).wait();
  templateNames.push(InventoryTypeOptions.Horseman);
  templateIDs.push(entity++);

  // Warrior
  await (await diamond.addTroopTemplate(InventoryTypeOptions.Warrior, 120, 1, 1, 2, 60, 120, 0, 6, 1)).wait();
  templateNames.push(InventoryTypeOptions.Warrior);
  templateIDs.push(entity++);

  // Slinger
  await (await diamond.addTroopTemplate(InventoryTypeOptions.Slinger, 125, 1, 1, 2, 60, 125, 0, 6, 1)).wait();
  templateNames.push(InventoryTypeOptions.Slinger);
  templateIDs.push(entity++);

  // Guard
  await (await diamond.addTroopTemplate(InventoryTypeOptions.Guard, 120, 0, 0, 0, 60, 120, 0, 0, 0)).wait();
  templateNames.push(InventoryTypeOptions.Guard);
  templateIDs.push(entity++);

  // Gold
  inventoryType = InventoryTypeOptions.Gold;
  entity = await addGetEntity(diamond);
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.ResourceTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(1))).wait();
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Register template names used for shortcuts
  await (await diamond.registerTemplateShortcuts(templateNames, templateIDs)).wait();
};
