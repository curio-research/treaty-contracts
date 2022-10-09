import { Attack, Cost, Defense, Duration, encodeString, encodeUint256, Health, InventoryType, InventoryTypeOptions, Speed, Load, Tag, Tags, MoveCooldown, BattleCooldown } from 'curio-vault';
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

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): WorldConstantsStruct => {
  return {
    admin: adminAddr,
    worldWidth: mapInput.width * TILE_WIDTH,
    worldHeight: mapInput.height * TILE_WIDTH,
    numInitTerrainTypes: 7,
    initBatchSize: 30,
    maxCityCountPerPlayer: 3,
    maxArmyCountPerPlayer: 3,
    maxPlayerCount: 20,
    tileUpgradeGoldCost: 150,
    buildingUpgradeGoldCost: 3000, // internal buildings
    cityUpgradeGoldCost: 1000000000000000, // temporarily disabled
    cityPackCost: 1000000000000000, // temporarily disabled
    initCityCenterGoldLoad: 5000,
    initCityCenterTroopLoad: 1000,
    initCityGold: 1000,
    tileWidth: TILE_WIDTH,
    battleRange: TILE_WIDTH,
    tileGuardAmount: 1,
    cityGuardAmount: 1000,
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

  // Horseman
  let inventoryType = InventoryTypeOptions.Horseman;
  let entity = await addGetEntity(diamond);
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(2))).wait(); // how many tiles it can skip
  await (await diamond.setComponentValue(MoveCooldown, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(BattleCooldown, entity, encodeUint256(2))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(60))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(0))).wait();
  await (await diamond.setComponentValue(Load, entity, encodeUint256(5))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Warrior
  inventoryType = InventoryTypeOptions.Warrior;
  entity = await addGetEntity(diamond);
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(MoveCooldown, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(BattleCooldown, entity, encodeUint256(2))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(60))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(0))).wait();
  await (await diamond.setComponentValue(Load, entity, encodeUint256(6))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Slinger
  inventoryType = InventoryTypeOptions.Slinger;
  entity = await addGetEntity(diamond);
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(125))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(MoveCooldown, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(BattleCooldown, entity, encodeUint256(2))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(60))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(125))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(0))).wait();
  await (await diamond.setComponentValue(Load, entity, encodeUint256(6))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Guard
  inventoryType = InventoryTypeOptions.Guard;
  entity = await addGetEntity(diamond);
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(60))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(120))).wait();
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Gold
  inventoryType = InventoryTypeOptions.Gold;
  entity = await addGetEntity(diamond);
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.ResourceTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(inventoryType))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(1))).wait();
  templateNames.push(inventoryType);
  templateIDs.push(entity);

  // Register template names
  await (await diamond.registerTemplateShortcuts(templateNames, templateIDs)).wait();
};
