import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Cost, Duration, encodeString, encodeUint256, Health, InventoryType, InventoryTypeOptions, Load, Tag, Tags, BattleCooldown, TILE_TYPE, Amount } from 'curio-vault';
import { Curio, ConstantSpecStruct } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { addGetEntity } from './mapHelper';
import { MapInput } from './types';
import { confirm } from './deployHelper';

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
    // todo: different across center level
    maxTroopCountPerArmy: 16542,
    maxPlayerCount: 20,
    tileWidth: TILE_WIDTH,
    maxCityCenterLevel: 3,
    cityCenterLevelToEntityLevelRatio: 3,
    cityCenterLevelToTileCounts: 31,
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

  let inventoryType = InventoryTypeOptions.Horseman;

  let entity = Number(await diamond.getEntity());

  // Horseman
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Horseman, 120, 2, 1, 2, 60, 120, 1, 500, 1), hre);
  templateNames.push(InventoryTypeOptions.Horseman);
  templateIDs.push(entity++);

  // Warrior
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Warrior, 120, 1, 1, 2, 60, 120, 1, 600, 1), hre);
  templateNames.push(InventoryTypeOptions.Warrior);
  templateIDs.push(entity++);

  // Slinger
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Slinger, 125, 1, 1, 2, 60, 125, 1, 600, 1), hre);
  templateNames.push(InventoryTypeOptions.Slinger);
  templateIDs.push(entity++);

  // Guard
  await confirm(await diamond.addTroopTemplate(InventoryTypeOptions.Guard, 120, 0, 0, 0, 60, 120, 0, 0, 0), hre);
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

// ----------------------------------------------------------
// IN-GAME CONSTANTS
// ----------------------------------------------------------

const NULL = 0;

export const CONSTANT_SPECS: ConstantSpecStruct[] = [];

// `initializePlayer`
CONSTANT_SPECS.push({ functionName: 'initializePlayer', componentName: Amount, entityName: InventoryTypeOptions.Gold, level: NULL, value: 0 });
CONSTANT_SPECS.push({ functionName: 'initializePlayer', componentName: Amount, entityName: InventoryTypeOptions.Food, level: NULL, value: 0 });
// TODO: I haven't calculate this in god_os yet
CONSTANT_SPECS.push({ functionName: 'initializePlayer', componentName: Load, entityName: InventoryTypeOptions.Gold, level: NULL, value: 100000000 });
CONSTANT_SPECS.push({ functionName: 'initializePlayer', componentName: Load, entityName: InventoryTypeOptions.Food, level: NULL, value: 100000000 });

// `initializeTile`
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 0, value: 300 });
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 1, value: 60 }); // level 1 barbarian
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 2, value: 101 }); // level 2 barbarian
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 0, value: 0 });
CONSTANT_SPECS.push({ functionName: 'initializeTile', componentName: Load, entityName: InventoryTypeOptions.Food, level: 0, value: 0 });

// `foundCity`
CONSTANT_SPECS.push({ functionName: 'foundCity', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 0, value: 1500 });

// `packCity`
CONSTANT_SPECS.push({ functionName: 'packCity', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 0, value: 1000000000000000 });
CONSTANT_SPECS.push({ functionName: 'packCity', componentName: Health, entityName: 'Settler', level: 0, value: 1000000000000000 });

// `upgradeTile`
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 1, value: 12000 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 1, value: 48000 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 1, value: 300 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 2, value: 20300 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 2, value: 81500 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 2, value: 509 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 3, value: 30000 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 3, value: 120200 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 3, value: 751 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 4, value: 41200 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 4, value: 164800 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 4, value: 1030 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 5, value: 54000 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 5, value: 216300 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 5, value: 1351 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 6, value: 68900 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 6, value: 275700 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 6, value: 1723 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 7, value: 86000 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 7, value: 344200 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 7, value: 2151 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 8, value: 105800 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 8, value: 423200 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 8, value: 2645 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 9, value: 9999999999 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 9, value: 9999999999 });
CONSTANT_SPECS.push({ functionName: 'upgradeTile', componentName: Amount, entityName: InventoryTypeOptions.Guard, level: 9, value: 3214 });

// `upgradeCityCenter`
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 1, value: 16617 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 1, value: 1514851 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 2, value: 39136 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 2, value: 1218168 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 3, value: 999999999999 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 3, value: 999999999999 });

CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 1, value: 12000 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Food, level: 1, value: 192000 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 2, value: 14450 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Food, level: 2, value: 231300 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 3, value: 16350 });
CONSTANT_SPECS.push({ functionName: 'upgradeCityCenter', componentName: Load, entityName: InventoryTypeOptions.Food, level: 3, value: 261783 });

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
// TODO: Right now numbers are just placeholder; no difference btw goldmine & farms
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
CONSTANT_SPECS.push({ functionName: 'startTroopProduction', componentName: Cost, entityName: InventoryTypeOptions.Gold, level: 0, value: 20 });
CONSTANT_SPECS.push({ functionName: 'startTroopProduction', componentName: Cost, entityName: InventoryTypeOptions.Food, level: 0, value: 80 });

// `harvestResource`
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 1, value: 20 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 2, value: 24 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 3, value: 27 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 4, value: 30 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 5, value: 32 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 6, value: 34 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 7, value: 36 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 8, value: 37 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 9, value: 38 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 1, value: 320 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 2, value: 385 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 3, value: 436 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 4, value: 478 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 5, value: 513 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 6, value: 543 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 7, value: 570 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 8, value: 594 });
CONSTANT_SPECS.push({ functionName: 'harvestResource', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 9, value: 616 });

// `harvestResourceFromCity`
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 1, value: 20 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 1, value: 320 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 2, value: 24 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 2, value: 385 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: 'Rate', entityName: InventoryTypeOptions.Gold, level: 3, value: 27 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: 'Rate', entityName: InventoryTypeOptions.Food, level: 3, value: 436 });

CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 1, value: 12000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Food, level: 1, value: 192000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 2, value: 14500 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Food, level: 2, value: 138780 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Gold, level: 3, value: 16350 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Food, level: 3, value: 261783 });

// note: right now there's no troop load limit
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Horseman, level: 1, value: 1000000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Warrior, level: 1, value: 10000000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Slinger, level: 1, value: 10000000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Horseman, level: 2, value: 1000000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Warrior, level: 2, value: 10000000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Slinger, level: 2, value: 10000000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Horseman, level: 3, value: 1000000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Warrior, level: 3, value: 10000000 });
CONSTANT_SPECS.push({ functionName: 'harvestResourcesFromCity', componentName: Load, entityName: InventoryTypeOptions.Slinger, level: 3, value: 10000000 });

// `battleTile`
// TODO: shoudn't mix up barbarians with tiles
CONSTANT_SPECS.push({ functionName: 'battleTile', componentName: BattleCooldown, entityName: 'Barbarian', level: 1, value: 10 });
CONSTANT_SPECS.push({ functionName: 'battleTile', componentName: BattleCooldown, entityName: 'Barbarian', level: 2, value: 10 });

// `distributeBarbarianReward`
// TODO: 9 levels of barbarians
CONSTANT_SPECS.push({ functionName: 'distributeBarbarianReward', componentName: Amount, entityName: InventoryTypeOptions.Gold, level: 1, value: 7714 });
CONSTANT_SPECS.push({ functionName: 'distributeBarbarianReward', componentName: Amount, entityName: InventoryTypeOptions.Gold, level: 2, value: 24126 });
CONSTANT_SPECS.push({ functionName: 'distributeBarbarianReward', componentName: Amount, entityName: InventoryTypeOptions.Food, level: 1, value: 24000 });
CONSTANT_SPECS.push({ functionName: 'distributeBarbarianReward', componentName: Amount, entityName: InventoryTypeOptions.Food, level: 2, value: 40767 });
