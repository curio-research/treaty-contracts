import { Cost, Duration, encodeString, encodeUint256, Health, InventoryType, InventoryTypeOptions, Load, Tag, Tags, BattleCooldown, TILE_TYPE, Amount } from 'curio-vault';
import { Curio, ConstantSpecStruct } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { addGetEntity } from './mapHelper';
import { MapInput } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// WORLD CONSTANTS
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
    initBatchSize: Math.floor(150 / NUM_INIT_TERRAIN_TYPES),
    maxCityCountPerPlayer: 3,
    maxArmyCountPerPlayer: 2,
    maxTroopCountPerArmy: 1000,
    maxPlayerCount: 20,
    tileWidth: TILE_WIDTH,
    maxCityCenterLevel: 3,
    cityCenterLevelToEntityLevelRatio: 3,
    cityCenterLevelToTileCounts: 20,
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

  // Register template names used for shortcuts
  await (await diamond.registerTemplateShortcuts(templateNames, templateIDs)).wait();
};

// ----------------------------------------------------------
// IN-GAME CONSTANTS
// ----------------------------------------------------------

const NULL = 0;

export const CONSTANT_SPECS: ConstantSpecStruct[] = [];

// `initializePlayer`
CONSTANT_SPECS.push({ functionName: 'initializePlayer', componentName: Amount, entityName: InventoryTypeOptions.Gold, level: NULL, value: 0 });
CONSTANT_SPECS.push({ functionName: 'initializePlayer', componentName: Amount, entityName: InventoryTypeOptions.Food, level: NULL, value: 0 });
CONSTANT_SPECS.push({ functionName: 'initializePlayer', componentName: Load, entityName: InventoryTypeOptions.Gold, level: NULL, value: 10000000 });
CONSTANT_SPECS.push({ functionName: 'initializePlayer', componentName: Load, entityName: InventoryTypeOptions.Food, level: NULL, value: 10000000 });

// `initializeTile`
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 0, value: 200 });
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 1, value: 1000 }); // level 1 barbarian
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 2, value: 2000 }); // level 2 barbarian
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 0, value: 1000 });
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Load, entityName: InventoryTypeOptions.Food, level: 0, value: 1000 });

// `foundCity`
CONSTANT_SPECS.push({ functionName: 'foundCity', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 0, value: 1500 });

// `packCity`
CONSTANT_SPECS.push({ functionName: 'packCity', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 0, value: 1000000000000000 });
CONSTANT_SPECS.push({ functionName: 'packCity', componentName: Health, entityName: 'Settler', level: 0, value: 1000000000000000 });

// `upgradeTile`
// TODO: can we automate so that 9 is not hardcoded?
for (let i = 0; i < 9; i++) {
  CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: i, value: 10 * 200 });
  CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: i, value: 50 * 200 });
  CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: i, value: 200 * i });
}

// `upgradeCityCenter`
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 0, value: 10 * 200 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 0, value: 10 * 200 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 1, value: 10 * 200 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 1, value: 10 * 200 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 2, value: 10 * 200 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 2, value: 10 * 200 });

CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 0, value: 0 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Food, level: 0, value: 0 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 1, value: 10000000 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Food, level: 1, value: 10000000 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 2, value: 20000000 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Food, level: 2, value: 20000000 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 3, value: 30000000 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Food, level: 3, value: 30000000 });

// // `upgradeCityInventory`
// CONSTANT_SPECS.push({ functionName: 'upgradeCityInventory', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: NULL, value: 3000 });
// for (let i = 1; i <= 9; i++) {
//   CONSTANT_SPECS.push({ functionName: 'upgradeCityInventory', componentName: Load, entityName: InventoryTypeOptions.Gold, level: i, value: 10000000 * i });
//   CONSTANT_SPECS.push({ functionName: 'upgradeCityInventory', componentName: Load, entityName: InventoryTypeOptions.Food, level: i, value: 10000000 * i });
//   CONSTANT_SPECS.push({ functionName: 'upgradeCityInventory', componentName: Load, entityName: InventoryTypeOptions.Horseman, level: i, value: 2000 * i });
//   CONSTANT_SPECS.push({ functionName: 'upgradeCityInventory', componentName: Load, entityName: InventoryTypeOptions.Warrior, level: i, value: 2000 * i });
//   CONSTANT_SPECS.push({ functionName: 'upgradeCityInventory', componentName: Load, entityName: InventoryTypeOptions.Slinger, level: i, value: 2000 * i });
// }

// `upgradeResource`
for (let i = 0; i <= 9; i++) {
  if (i == 0) {
    CONSTANT_SPECS.push({ functionName: 'upgradeResource', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 0, value: 0 });
    CONSTANT_SPECS.push({ functionName: 'upgradeResource', componentName: Load, entityName: InventoryTypeOptions.Food, level: 0, value: 0 });
    CONSTANT_SPECS.push({ functionName: 'upgradeResource', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 0, value: 10 * 200 });
    CONSTANT_SPECS.push({ functionName: 'upgradeResource', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 0, value: 10 * 200 });
  } else {
    CONSTANT_SPECS.push({ functionName: 'upgradeResource', componentName: Load, entityName: InventoryTypeOptions.Gold, level: i, value: 1000000 });
    CONSTANT_SPECS.push({ functionName: 'upgradeResource', componentName: Load, entityName: InventoryTypeOptions.Food, level: i, value: 1000000 });
    CONSTANT_SPECS.push({ functionName: 'upgradeResource', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: i, value: 10 * 200 });
    CONSTANT_SPECS.push({ functionName: 'upgradeResource', componentName: Cost, entityName: InventoryTypeOptions.Food, level: i, value: 10 * 200 });
  }
}

// // `upgradeCity`
// CONSTANT_SPECS.push({ functionName: 'upgradeCity', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 0, value: 100000 });
// for (let i = 1; i <= 3; i++) {
//   CONSTANT_SPECS.push({ functionName: 'upgradeCity', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: i, value: 1500 * i });
// }

// `startTroopProduction`
CONSTANT_SPECS.push({ functionName: 'startTroopProduction', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 0, value: 10 });
CONSTANT_SPECS.push({ functionName: 'startTroopProduction', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 0, value: 50 });

// `harvestResource`
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 1, value: 160 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 2, value: 200 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 3, value: 240 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 4, value: 260 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 5, value: 280 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 6, value: 300 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 7, value: 320 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 8, value: 340 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 9, value: 360 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 1, value: 200 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 2, value: 220 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 3, value: 240 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 4, value: 250 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 5, value: 260 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 6, value: 270 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 7, value: 280 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 8, value: 290 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 9, value: 300 });

// `harvestResourceFromCity`
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: NULL, value: 180 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: NULL, value: 180 });
for (let i = 1; i <= 5; i++) {
  CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Gold, level: i, value: 10000000 });
  CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Food, level: i, value: 10000000 });
}

// `battleTile`
CONSTANT_SPECS.push({ functionName: 'battleTile', componentName: BattleCooldown, entityName: 'Barbarian', level: 1, value: 60 });
CONSTANT_SPECS.push({ functionName: 'battleTile', componentName: BattleCooldown, entityName: 'Barbarian', level: 2, value: 60 });

// `distributeBarbarianReward`
CONSTANT_SPECS.push({ functionName: 'distributeBarbarianReward', componentName: Amount, entityName: InventoryTypeOptions.Gold, level: 1, value: 180000 });
CONSTANT_SPECS.push({ functionName: 'distributeBarbarianReward', componentName: Amount, entityName: InventoryTypeOptions.Gold, level: 2, value: 480000 });
CONSTANT_SPECS.push({ functionName: 'distributeBarbarianReward', componentName: Amount, entityName: InventoryTypeOptions.Food, level: 1, value: 60000 });
CONSTANT_SPECS.push({ functionName: 'distributeBarbarianReward', componentName: Amount, entityName: InventoryTypeOptions.Food, level: 2, value: 150000 });
