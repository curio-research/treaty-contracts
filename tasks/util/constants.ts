import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { MapInput, RenderInput } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// GAME CONSTANTS
// ----------------------------------------------------------

export const SMALL_MAP_INPUT: MapInput = {
  width: 50,
  height: 50,
};

export const LARGE_MAP_INPUT: MapInput = {
  width: 100,
  height: 100,
};

export const SANDBOX_MAP_INPUT: MapInput = {
  width: 150,
  height: 150,
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
    maxInventoryCapacity: 80,
    cityUpgradeGoldCost: 500,
    cityHealth: 500,
    cityAttack: 50,
    cityDefense: 10,
  };
};

export const TAGS = ['Player', 'Settler', 'TroopTemplate', 'City', 'Building', 'Resource', 'ResourceInventory', 'TroopInventory', 'Army'];

// ----------------------------------------------------------
// RENDERING CONSTANTS
// ----------------------------------------------------------

export const RENDER_CONSTANTS: RenderInput = {
  sizeFactor: 30,
  numLandColors: 5,
  numWaterColors: 2,
  waterNoiseCutoff: 0.45,
  colorLowestPercent: 40,
  plateSizeMultiplier: 6,
  superpositionRatio: [0.6, 0.4],
};
