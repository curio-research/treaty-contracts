import { Attack, Cost, Defense, Duration, encodeString, encodeUint256, Health, InventoryType, InventoryTypeOptions, Speed, Load, Tag, Tags } from 'curio-vault';
import { WorldConstantsStruct, Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { addGetEntity } from './mapHelper';
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
    numInitTerrainTypes: 7,
    initBatchSize: 30,
    maxCityCountPerPlayer: 3,
    maxArmyCountPerPlayer: 2,
    maxPlayerCount: 20,
    cityUpgradeGoldCost: 50,
    cityPackCost: 0,
    maxInventoryCapacity: 1000,
    initCityGold: 100,
    cityHealth: 120,
    cityAttack: 60,
    cityDefense: 120,
    cityAmount: 1000,
  };
};

// ----------------------------------------------------------
// TEMPLATES
// ----------------------------------------------------------

export const createTemplates = async (diamond: Curio) => {
  // Initialize three troop templates
  await (await diamond.addEntity()).wait();
  let entity = (await diamond.getEntity()).toNumber();

  // Horseman
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(InventoryTypeOptions.Horseman))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(5))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(60))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(5))).wait();
  await (await diamond.setComponentValue(Load, entity, encodeUint256(5))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();

  entity = await addGetEntity(diamond);

  // Warrior
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(InventoryTypeOptions.Warrior))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(5))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(60))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(120))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(5))).wait();
  await (await diamond.setComponentValue(Load, entity, encodeUint256(6))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();

  entity = await addGetEntity(diamond);

  // Slinger
  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.TroopTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(InventoryTypeOptions.Slinger))).wait();
  await (await diamond.setComponentValue(Health, entity, encodeUint256(125))).wait();
  await (await diamond.setComponentValue(Speed, entity, encodeUint256(5))).wait();
  await (await diamond.setComponentValue(Attack, entity, encodeUint256(60))).wait();
  await (await diamond.setComponentValue(Defense, entity, encodeUint256(125))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(5))).wait();
  await (await diamond.setComponentValue(Load, entity, encodeUint256(6))).wait();
  await (await diamond.setComponentValue(Cost, entity, encodeUint256(1))).wait();

  // Initialize a resource template
  entity = await addGetEntity(diamond);

  await (await diamond.setComponentValue(Tag, entity, encodeString(Tags.ResourceTemplate))).wait();
  await (await diamond.setComponentValue(InventoryType, entity, encodeString(InventoryTypeOptions.Gold))).wait();
  await (await diamond.setComponentValue(Duration, entity, encodeUint256(1))).wait();
};
