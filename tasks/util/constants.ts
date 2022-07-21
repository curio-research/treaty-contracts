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
  numOilWells: 40,
};

export const SANDBOX_MAP_INPUT: MapInput = {
  width: 70,
  height: 70,
  numPorts: 200,
  numCities: 50,
  numOilWells: 10,
};

export const COMBAT_EFFICIENCY = 50;
export const BASE_ATTACK_FACTOR = 1;
export const BASE_DEFENSE_FACTOR = 1;
export const BASE_MAX_HEALTH = 1;
export const NUM_INIT_TERRAIN_TYPES = 6;
export const INIT_BATCH_SIZE = 50;
export const INIT_PLAYER_GOLD_BALANCE = 30;
export const INIT_PLAYER_OIL_BALANCE = 30; // FIXME
export const MAX_BASE_COUNT_PER_PLAYER = 30;
export const MAX_TROOP_COUNT_PER_PLAYER = 100000;
export const MAX_PLAYER_COUNT = 20;
export const DEFAULT_BASE_GOLD_GENERATION_PER_SECOND = 50;
export const DEFAULT_WELL_OIL_GENERATION_PER_SECOND = 5;

export const TROOP_TYPES: TroopTypeStruct[] = [
  {
    name: TROOP_NAME.INFANTRY,
    isLandTroop: true,
    maxHealth: 1,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 6,
    oilConsumptionPerSecond: 1,
  },
  {
    name: TROOP_NAME.TROOP_TRANSPORT,
    isLandTroop: false,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 50,
    defenseFactor: 50,
    cargoCapacity: 6,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 14,
    oilConsumptionPerSecond: 1,
  },
  {
    name: TROOP_NAME.DESTROYER,
    isLandTroop: false,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 20,
    oilConsumptionPerSecond: 1,
  },
  {
    name: TROOP_NAME.CRUISER,
    isLandTroop: false,
    maxHealth: 8,
    damagePerHit: 2,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 30,
    oilConsumptionPerSecond: 1,
  },
  {
    name: TROOP_NAME.BATTLESHIP,
    isLandTroop: false,
    maxHealth: 12,
    damagePerHit: 3,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    movementCooldown: 0,
    largeActionCooldown: 0,
    goldPrice: 50,
    oilConsumptionPerSecond: 2,
  },
];

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): WorldConstantsStruct => {
  return {
    admin: adminAddr,
    worldWidth: mapInput.width,
    worldHeight: mapInput.height,
    combatEfficiency: COMBAT_EFFICIENCY,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
    initBatchSize: INIT_BATCH_SIZE,
    initPlayerGoldBalance: INIT_PLAYER_GOLD_BALANCE,
    initPlayerOilBalance: INIT_PLAYER_OIL_BALANCE,
    maxBaseCountPerPlayer: MAX_BASE_COUNT_PER_PLAYER,
    maxTroopCountPerPlayer: MAX_TROOP_COUNT_PER_PLAYER,
    maxPlayerCount: MAX_PLAYER_COUNT,
    defaultBaseGoldGenerationPerSecond: DEFAULT_BASE_GOLD_GENERATION_PER_SECOND,
    defaultWellOilGenerationPerSecond: DEFAULT_WELL_OIL_GENERATION_PER_SECOND,
  };
};

// ----------------------------------------------------------
// RENDERING CONSTANTS
// ----------------------------------------------------------

export const RENDER_CONSTANTS: RenderInput = {
  sizeFactor: 10,
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
