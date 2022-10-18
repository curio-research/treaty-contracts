import { Attack, Cost, Defense, Duration, encodeString, encodeUint256, Health, InventoryType, InventoryTypeOptions, Speed, Load, Tag, Tags, MoveCooldown, BattleCooldown, TILE_TYPE, Amount } from 'curio-vault';
import { WorldConstantsStruct, Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { addGetEntity } from './mapHelper';
import { MapInput } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// GAME CONSTANTS
// ----------------------------------------------------------

export const SMALL_MAP_INPUT: MapInput = {
  width: 9,
  height: 9,
};

export const TILE_WIDTH = 5;
export const NUM_INIT_TERRAIN_TYPES = Object.keys(TILE_TYPE).length - 1;

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): any => {
  return {
    admin: adminAddr,
    worldWidth: mapInput.width * TILE_WIDTH,
    worldHeight: mapInput.height * TILE_WIDTH,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
    initBatchSize: 10,
    maxCityCountPerPlayer: 3,
    maxArmyCountPerPlayer: 2,
    maxTroopCountPerArmy: 1000,
    maxPlayerCount: 20,
    tileWidth: TILE_WIDTH,
    barbarianCooldown: 60, // Fixme
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
  await (await diamond.addTroopTemplate(InventoryTypeOptions.Horseman, 120, 2, 1, 2, 60, 120, 1, 500, 1)).wait();
  templateNames.push(InventoryTypeOptions.Horseman);
  templateIDs.push(entity++);

  // Warrior
  await (await diamond.addTroopTemplate(InventoryTypeOptions.Warrior, 120, 1, 1, 2, 60, 120, 1, 600, 1)).wait();
  templateNames.push(InventoryTypeOptions.Warrior);
  templateIDs.push(entity++);

  // Slinger
  await (await diamond.addTroopTemplate(InventoryTypeOptions.Slinger, 125, 1, 1, 2, 60, 125, 1, 600, 1)).wait();
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

  // Food
  inventoryType = InventoryTypeOptions.Food;
  entity = await addGetEntity(diamond);
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.ResourceTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(1))).wait();
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Placeholder
  inventoryType = InventoryTypeOptions.Placeholder;
  entity = await addGetEntity(diamond);
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Register template names used for shortcuts
  await (await diamond.registerTemplateShortcuts(templateNames, templateIDs)).wait();
};

// ----------------------------------------------------------
// IN-GAME AMOUNTS
// ----------------------------------------------------------

export const registerConstants = async (diamond: Curio) => {
  // TODO: change some of the "Amount" to more descriptive words

  const NULL = 0; // indicator: not related to level

  // `initializePlayer`
  await (await diamond.addConstant('initializePlayer', Amount, InventoryTypeOptions.Gold, NULL, 0)).wait();
  await (await diamond.addConstant('initializePlayer', Amount, InventoryTypeOptions.Food, NULL, 0)).wait();
  await (await diamond.addConstant('initializePlayer', Load, InventoryTypeOptions.Gold, NULL, 10000000)).wait();
  await (await diamond.addConstant('initializePlayer', Load, InventoryTypeOptions.Food, NULL, 10000000)).wait();

  // `initializeTile`
  await (await diamond.addConstant('initializeTile', Amount, InventoryTypeOptions.Guard, 0, 200)).wait();
  await (await diamond.addConstant('initializeTile', Amount, InventoryTypeOptions.Guard, 1, 1000)).wait(); // level 1 barbarian
  await (await diamond.addConstant('initializeTile', Amount, InventoryTypeOptions.Guard, 2, 2000)).wait(); // level 2 barbarian
  await (await diamond.addConstant('initializeTile', Load, InventoryTypeOptions.Gold, 0, 1000)).wait();
  await (await diamond.addConstant('initializeTile', Load, InventoryTypeOptions.Food, 0, 1000)).wait();

  // `foundCity`
  await (await diamond.addConstant('foundCity', Amount, InventoryTypeOptions.Guard, 0, 1500)).wait();

  // `packCity`
  await (await diamond.addConstant('packCity', Cost, InventoryTypeOptions.Gold, 0, 1000000000000000)).wait();
  await (await diamond.addConstant('packCity', Health, InventoryTypeOptions.Placeholder, 0, 1000000000000000)).wait();

  // `upgradeTile`
  await (await diamond.addConstant('upgradeTile', Cost, InventoryTypeOptions.Gold, NULL, 10 * 200)).wait();
  await (await diamond.addConstant('upgradeTile', Cost, InventoryTypeOptions.Food, NULL, 50 * 200)).wait();
  for (let i = 0; i <= 9; i++) {
    await (await diamond.addConstant('upgradeTile', Amount, InventoryTypeOptions.Guard, i, Math.pow(3, i) * 200)).wait();
  }

  // `upgradeCityInventory`
  await (await diamond.addConstant('upgradeCityInventory', Cost, InventoryTypeOptions.Gold, NULL, 3000)).wait();
  for (let i = 1; i <= 9; i++) {
    await (await diamond.addConstant('upgradeCityInventory', Load, InventoryTypeOptions.Gold, i, 10000000 * i)).wait();
    await (await diamond.addConstant('upgradeCityInventory', Load, InventoryTypeOptions.Food, i, 10000000 * i)).wait();
    await (await diamond.addConstant('upgradeCityInventory', Load, InventoryTypeOptions.Horseman, i, 2000 * i)).wait();
    await (await diamond.addConstant('upgradeCityInventory', Load, InventoryTypeOptions.Warrior, i, 2000 * i)).wait();
    await (await diamond.addConstant('upgradeCityInventory', Load, InventoryTypeOptions.Slinger, i, 2000 * i)).wait();
  }

  // `upgradeResource`
  for (let i = 0; i <= 9; i++) {
    await (await diamond.addConstant('upgradeResource', Cost, InventoryTypeOptions.Gold, 1, 50000)).wait();
    await (await diamond.addConstant('upgradeResource', Cost, InventoryTypeOptions.Food, 1, 16000)).wait();
  }
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 1, 5500)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 2, 6000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 3, 6500)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 4, 7000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 5, 7500)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 6, 8000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 7, 8500)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 8, 9000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Gold, 9, 9500)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 1, 100000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 2, 110000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 3, 120000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 4, 130000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 5, 140000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 6, 150000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 7, 160000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 8, 170000)).wait();
  await (await diamond.addConstant('upgradeResource', Load, InventoryTypeOptions.Food, 9, 180000)).wait();

  // `upgradeCity`
  await (await diamond.addConstant('upgradeCity', Cost, InventoryTypeOptions.Gold, 0, 100000)).wait();
  for (let i = 1; i <= 3; i++) {
    await (await diamond.addConstant('upgradeCity', Amount, InventoryTypeOptions.Guard, i, 1500 * i)).wait();
  }

  // `startTroopProduction`
  await (await diamond.addConstant('startTroopProduction', Cost, InventoryTypeOptions.Gold, 0, 10)).wait();
  await (await diamond.addConstant('startTroopProduction', Cost, InventoryTypeOptions.Food, 0, 50)).wait();

  // `harvestResource`
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 1, 160)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 2, 200)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 3, 240)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 4, 260)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 5, 280)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 6, 300)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 7, 320)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 8, 340)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Gold, 9, 360)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 1, 200)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 2, 220)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 3, 240)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 4, 250)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 5, 260)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 6, 270)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 7, 280)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 8, 290)).wait();
  await (await diamond.addConstant('harvestResource', Amount, InventoryTypeOptions.Food, 9, 300)).wait();

  // `harvestResourceFromCity`
  await (await diamond.addConstant('harvestResourcesFromCity', Amount, InventoryTypeOptions.Gold, NULL, 180)).wait();
  await (await diamond.addConstant('harvestResourcesFromCity', Amount, InventoryTypeOptions.Food, NULL, 180)).wait();
  for (let i = 1; i <= 5; i++) {
    await (await diamond.addConstant('harvestResourcesFromCity', Load, InventoryTypeOptions.Gold, i, 100000000)).wait();
    await (await diamond.addConstant('harvestResourcesFromCity', Load, InventoryTypeOptions.Food, i, 100000000)).wait();
  }

  // `distributeBarbarianReward`
  await (await diamond.addConstant('distributeBarbarianReward', Amount, InventoryTypeOptions.Gold, 1, 180000)).wait();
  await (await diamond.addConstant('distributeBarbarianReward', Amount, InventoryTypeOptions.Gold, 2, 480000)).wait();
  await (await diamond.addConstant('distributeBarbarianReward', Amount, InventoryTypeOptions.Food, 1, 60000)).wait();
  await (await diamond.addConstant('distributeBarbarianReward', Amount, InventoryTypeOptions.Food, 2, 150000)).wait();
};
