import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { TroopTypeStruct } from '../../typechain-types/DiamondInit';
import { MapInput, RenderInput, TROOP_NAME } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// GAME CONSTANTS
// ----------------------------------------------------------

export const LOCAL_MAP_INPUT: MapInput = {
  width: 30,
  height: 30,
  numPorts: 10,
  numCities: 10,
  numOilWells: 20,
};

export const SANDBOX_MAP_INPUT: MapInput = {
  width: 150,
  height: 150,
  numPorts: 300,
  numCities: 300,
  numOilWells: 150,
};

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): WorldConstantsStruct => {
  return {
    admin: adminAddr,
    worldWidth: mapInput.width,
    worldHeight: mapInput.height,
    combatEfficiency: 50,
    numInitTerrainTypes: 6,
    initBatchSize: 50,
    initPlayerGoldBalance: 30,
    initPlayerOilBalance: 30,
    maxBaseCountPerPlayer: 30,
    maxTroopCountPerPlayer: 100000,
    maxPlayerCount: 20,
    defaultBaseGoldGenerationPerSecond: 1,
    defaultWellOilGenerationPerSecond: 5,
    debuffFactor: 80,
  };
};

export const TROOP_TYPES: TroopTypeStruct[] = [
  {
    name: TROOP_NAME.INFANTRY,
    maxHealth: 100,
    damagePerHit: 100,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 6,
    oilConsumptionPerSecond: 1,
  },
  {
    name: TROOP_NAME.DESTROYER,
    maxHealth: 300,
    damagePerHit: 100,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 20,
    oilConsumptionPerSecond: 1,
  },
  {
    name: TROOP_NAME.CRUISER,
    maxHealth: 800,
    damagePerHit: 200,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 30,
    oilConsumptionPerSecond: 1,
  },
  {
    name: TROOP_NAME.BATTLESHIP,
    maxHealth: 1200,
    damagePerHit: 300,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 50,
    oilConsumptionPerSecond: 2,
  },
];

// ----------------------------------------------------------
// RENDERING CONSTANTS
// ----------------------------------------------------------

export const RENDER_CONSTANTS: RenderInput = {
  sizeFactor: 15,
  numLandColors: 5,
  numWaterColors: 2,
  waterNoiseCutoff: 0.5,
  colorLowestPercent: 40,
  plateSizeMultiplier: 6,
  superpositionRatio: [0.7, 0.3],
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
