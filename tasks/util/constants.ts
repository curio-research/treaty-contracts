import { CompType } from './types/index';
import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { MapInput, RenderInput, ComponentDataTypes } from './types';

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

// ------------------------------------------------
// FUNCTIONS
// ------------------------------------------------

export const COMPONENT_SPECS: CompType[] = [
  { name: 'IsComponent', valueType: ComponentDataTypes.BOOL },
  { name: 'Tag', valueType: ComponentDataTypes.STRING },
  { name: 'IsActive', valueType: ComponentDataTypes.BOOL },
  { name: 'InitTimestamp', valueType: ComponentDataTypes.UINT },
  { name: 'Position', valueType: ComponentDataTypes.POSITION },
  { name: 'Owner', valueType: ComponentDataTypes.UINT },
  { name: 'Level', valueType: ComponentDataTypes.UINT },
  { name: 'Name', valueType: ComponentDataTypes.STRING },
  { name: 'CanSettle', valueType: ComponentDataTypes.BOOL },
  { name: 'ResourceType', valueType: ComponentDataTypes.STRING },
  { name: 'BuildingType', valueType: ComponentDataTypes.STRING },
  { name: 'Template', valueType: ComponentDataTypes.UINT },
  { name: 'Templates', valueType: ComponentDataTypes.UINT_ARRAY },
  { name: 'CanProduce', valueType: ComponentDataTypes.BOOL },
  { name: 'Duration', valueType: ComponentDataTypes.UINT },
  { name: 'BalanceLastUpdated', valueType: ComponentDataTypes.UINT },
  { name: 'MaxHealth', valueType: ComponentDataTypes.UINT },
  { name: 'Health', valueType: ComponentDataTypes.UINT },
  { name: 'Attack', valueType: ComponentDataTypes.UINT },
  { name: 'Defense', valueType: ComponentDataTypes.UINT },
  { name: 'Speed', valueType: ComponentDataTypes.UINT },
  { name: 'City', valueType: ComponentDataTypes.UINT },
  { name: 'Building', valueType: ComponentDataTypes.UINT },
  { name: 'Amount', valueType: ComponentDataTypes.UINT },
  { name: 'Amounts', valueType: ComponentDataTypes.UINT_ARRAY },
  { name: 'InventoryType', valueType: ComponentDataTypes.STRING },
  { name: 'LastMoved', valueType: ComponentDataTypes.UINT },
  { name: 'Source', valueType: ComponentDataTypes.UINT },
  { name: 'Target', valueType: ComponentDataTypes.UINT },
  { name: 'Inventory', valueType: ComponentDataTypes.UINT },
];
