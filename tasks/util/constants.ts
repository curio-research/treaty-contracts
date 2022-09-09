import { CompType } from './types/index';
import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { MapInput, RenderInput, TROOP_NAME, ComponentDataTypes } from './types';
import { cp } from 'fs';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// GAME CONSTANTS
// ----------------------------------------------------------

export const SMALL_MAP_INPUT: MapInput = {
  width: 50,
  height: 50,
  numPorts: 10,
  numCities: 30,
  numOilWells: 15,
};

export const LARGE_MAP_INPUT: MapInput = {
  width: 100,
  height: 100,
  numPorts: 40,
  numCities: 120,
  numOilWells: 60,
};

export const SANDBOX_MAP_INPUT: MapInput = {
  width: 150,
  height: 150,
  numPorts: 150,
  numCities: 150,
  numOilWells: 120,
};

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): WorldConstantsStruct => {
  return {
    admin: adminAddr,
    worldWidth: mapInput.width,
    worldHeight: mapInput.height,
    combatEfficiency: 50,
    numInitTerrainTypes: 6,
    initBatchSize: 50,
    initPlayerGoldBalance: mapInput.numPorts > 20 ? 2000 : 1000,
    initPlayerOilBalance: 0,
    maxBaseCountPerPlayer: 200,
    maxTroopCountPerPlayer: 100000,
    maxPlayerCount: mapInput.numPorts,
    defaultBaseGoldGenerationPerSecond: 1,
    defaultWellOilGenerationPerSecond: 5,
    debuffFactor: 80,
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

export const getTroopNames = (): string[] => {
  return Object.keys(TROOP_NAME).filter((item) => isNaN(Number(item)));
};

export const COMPONENT_SPECS: CompType[] = [
  { name: 'IsComponent', valueType: ComponentDataTypes.BOOL },
  { name: 'Tag', valueType: ComponentDataTypes.STRING },
  { name: 'IsActive', valueType: ComponentDataTypes.BOOL },
  { name: 'InitTimestamp', valueType: ComponentDataTypes.UINT },
  { name: 'Position', valueType: ComponentDataTypes.POSITION },
  { name: 'Positions', valueType: ComponentDataTypes.POSITION_ARRAY },
  { name: 'Owner', valueType: ComponentDataTypes.UINT },
  { name: 'Level', valueType: ComponentDataTypes.UINT },
  { name: 'Name', valueType: ComponentDataTypes.STRING },
  { name: 'CanSettle', valueType: ComponentDataTypes.BOOL },
  { name: 'ResourceType', valueType: ComponentDataTypes.STRING },
  { name: 'BuildingType', valueType: ComponentDataTypes.STRING },
  { name: 'TroopTemplate', valueType: ComponentDataTypes.STRING },
  { name: 'CanProduce', valueType: ComponentDataTypes.BOOL },
  { name: 'TimeToProduce', valueType: ComponentDataTypes.UINT },
  { name: 'BalanceLastUpdated', valueType: ComponentDataTypes.UINT },
  { name: 'MaxHealth', valueType: ComponentDataTypes.UINT },
  { name: 'Health', valueType: ComponentDataTypes.UINT },
  { name: 'Attack', valueType: ComponentDataTypes.UINT },
  { name: 'Defense', valueType: ComponentDataTypes.UINT },
  { name: 'Speed', valueType: ComponentDataTypes.UINT },
  { name: 'CityEntity', valueType: ComponentDataTypes.UINT },
  { name: 'Amount', valueType: ComponentDataTypes.UINT },
  { name: 'AmountPerSecond', valueType: ComponentDataTypes.INT },
];
