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
