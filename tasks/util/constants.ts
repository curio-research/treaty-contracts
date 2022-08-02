import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { TroopTypeStruct } from '../../typechain-types/DiamondInit';
import { MapInput, RenderInput, TROOP_NAME } from './types';

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
    initPlayerGoldBalance: mapInput.numPorts > 20 ? 2000 : 750,
    initPlayerOilBalance: 0,
    maxBaseCountPerPlayer: 200,
    maxTroopCountPerPlayer: 100000,
    maxPlayerCount: mapInput.numPorts,
    defaultBaseGoldGenerationPerSecond: 1,
    defaultWellOilGenerationPerSecond: 5,
    debuffFactor: 80,
  };
};

export const TROOP_TYPES: TroopTypeStruct[] = [
  {
    name: TROOP_NAME.INFANTRY,
    maxHealth: 200,
    damagePerHit: 100,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 5,
    largeActionCooldown: 0,
    goldPrice: 400,
    oilConsumptionPerSecond: 0,
  },
  {
    name: TROOP_NAME.DESTROYER,
    maxHealth: 800,
    damagePerHit: 700,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 2,
    largeActionCooldown: 0,
    goldPrice: 800,
    oilConsumptionPerSecond: 2,
  },
  {
    name: TROOP_NAME.CRUISER,
    maxHealth: 1500,
    damagePerHit: 1000,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 2,
    largeActionCooldown: 0,
    goldPrice: 1360,
    oilConsumptionPerSecond: 5,
  },
  {
    name: TROOP_NAME.BATTLESHIP,
    maxHealth: 5500,
    damagePerHit: 3500,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 2,
    largeActionCooldown: 0,
    goldPrice: 4800,
    oilConsumptionPerSecond: 20,
  },
];

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

export const getTroopTypeIndexByName = (troopTypes: TroopTypeStruct[], name: TROOP_NAME): number => {
  return troopTypes.indexOf(troopTypes.filter((item) => item.name === name)[0]);
};
