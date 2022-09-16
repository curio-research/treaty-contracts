import { Curio } from 'curio-vault';
import { ethers } from 'ethers';
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

export const TAGS = [
  'Army',
  'ArmyConstituent',
  'Battle',
  'Building',
  'City',
  'Guard',
  'Player',
  'Resource',
  'ResourceInventory',
  'ResourceTemplate',
  'Settler',
  'Signature',
  'Tile',
  'TroopInventory',
  'TroopProduction',
  'TroopTemplate', //
];

// ----------------------------------------------------------
// TEMPLATES
// ----------------------------------------------------------

export const createTemplates = async (diamond: Curio) => {
  const abiCoder = new ethers.utils.AbiCoder();

  // Initialize three troop templates
  await (await diamond.addEntity()).wait();
  let entity = (await diamond.getEntity()).toNumber();
  await (await diamond.setComponentValue('Tag', entity, abiCoder.encode(['string'], ['TroopTemplate']))).wait();
  await (await diamond.setComponentValue('InventoryType', entity, abiCoder.encode(['string'], ['Cavalry']))).wait();
  await (await diamond.setComponentValue('Health', entity, abiCoder.encode(['uint256'], [10]))).wait();
  await (await diamond.setComponentValue('Speed', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Attack', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Defense', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Duration', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Cost', entity, abiCoder.encode(['uint256'], [1]))).wait();

  await (await diamond.addEntity()).wait();
  entity = (await diamond.getEntity()).toNumber();
  await (await diamond.setComponentValue('Tag', entity, abiCoder.encode(['string'], ['TroopTemplate']))).wait();
  await (await diamond.setComponentValue('InventoryType', entity, abiCoder.encode(['string'], ['Infantry']))).wait();
  await (await diamond.setComponentValue('Health', entity, abiCoder.encode(['uint256'], [10]))).wait();
  await (await diamond.setComponentValue('Speed', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Attack', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Defense', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Duration', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Cost', entity, abiCoder.encode(['uint256'], [1]))).wait();

  await (await diamond.addEntity()).wait();
  entity = (await diamond.getEntity()).toNumber();
  await (await diamond.setComponentValue('Tag', entity, abiCoder.encode(['string'], ['TroopTemplate']))).wait();
  await (await diamond.setComponentValue('InventoryType', entity, abiCoder.encode(['string'], ['Archer']))).wait();
  await (await diamond.setComponentValue('Health', entity, abiCoder.encode(['uint256'], [10]))).wait();
  await (await diamond.setComponentValue('Speed', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Attack', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Defense', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Duration', entity, abiCoder.encode(['uint256'], [1]))).wait();
  await (await diamond.setComponentValue('Cost', entity, abiCoder.encode(['uint256'], [1]))).wait();

  // Initialize a resource template
  await (await diamond.addEntity()).wait();
  entity = (await diamond.getEntity()).toNumber();
  await (await diamond.setComponentValue('Tag', entity, abiCoder.encode(['string'], ['ResourceTemplate']))).wait();
  await (await diamond.setComponentValue('InventoryType', entity, abiCoder.encode(['string'], ['Gold']))).wait();
  await (await diamond.setComponentValue('Duration', entity, abiCoder.encode(['uint256'], [1]))).wait();
};
