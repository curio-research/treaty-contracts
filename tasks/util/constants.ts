import { Attack, Cost, Curio, Defense, Duration, encodeString, encodeUint256, Health, InventoryType, InventoryTypeOptions, Speed, Tag, Tags } from 'curio-vault';
import { WorldConstantsStruct } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { MapInput } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// GAME CONSTANTS
// ----------------------------------------------------------

export const SMALL_MAP_INPUT: MapInput = {
  width: 50,
  height: 50,
};

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): WorldConstantsStruct => {
  return {
    admin: adminAddr,
    worldWidth: mapInput.width,
    worldHeight: mapInput.height,
    numInitTerrainTypes: 1,
    initBatchSize: 100,
    maxCityCountPerPlayer: 3,
    maxArmyCountPerPlayer: 3,
    maxPlayerCount: 20,
    maxInventoryCapacity: 5000,
    cityUpgradeGoldCost: 500,
    initCityGold: 1000,
    cityHealth: 500,
    cityAttack: 50,
    cityDefense: 10,
  };
};

// ----------------------------------------------------------
// TEMPLATES
// ----------------------------------------------------------

export const createTemplates = async (diamond: Curio) => {
  // Initialize three troop templates
  await (await diamond.addEntity()).wait();
  let entity = (await diamond.getEntity()).toNumber();

  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(InventoryTypeOptions.Cavalry))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(10))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();

  await (await diamond.addEntity()).wait();
  entity = (await diamond.getEntity()).toNumber();

  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(InventoryTypeOptions.Infantry))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(10))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();

  await (await diamond.addEntity()).wait();
  entity = (await diamond.getEntity()).toNumber();

  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(InventoryTypeOptions.Archer))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(10))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(1))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();

  // Initialize a resource template
  await (await diamond.addEntity()).wait();
  entity = (await diamond.getEntity()).toNumber();

  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.ResourceTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(InventoryTypeOptions.Gold))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(1))).wait();
};
