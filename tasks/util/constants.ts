import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { TroopTypeStruct } from '../../typechain-types/DiamondInit';
import { Position, RenderInput, TileMapOutput, TILE_TYPE, TROOP_NAME } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// Game constants (souhardrce of truth)
// ----------------------------------------------------------

export const WORLD_WIDTH = 30;
export const WORLD_HEIGHT = 30;
export const NUM_PORTS = 50;
export const NUM_CITIES = 0;
export const MAP_INTERVAL = 10;
export const COMBAT_EFFICIENCY = 50;
export const BASE_ATTACK_FACTOR = 1;
export const BASE_DEFENSE_FACTOR = 1;
export const BASE_MAX_HEALTH = 1;
export const NUM_INIT_TERRAIN_TYPES = 5;
export const INIT_BATCH_SIZE = 100;
export const INIT_PLAYER_BALANCE = 20;
export const DEFAULT_BASE_GOLD_GENERATION_PER_SECOND = 1;

export const TROOP_TYPES: TroopTypeStruct[] = [
  {
    name: TROOP_NAME.ARMY,
    isLandTroop: true,
    maxHealth: 1,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    movementCooldown: 1,
    largeActionCooldown: 1,
    cost: 6,
    expensePerSecond: 0,
  },
  {
    name: TROOP_NAME.TROOP_TRANSPORT,
    isLandTroop: false,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 50,
    defenseFactor: 50,
    cargoCapacity: 6,
    movementCooldown: 1,
    largeActionCooldown: 1,
    cost: 14,
    expensePerSecond: 0,
  },
  {
    name: TROOP_NAME.DESTROYER,
    isLandTroop: false,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    movementCooldown: 1,
    largeActionCooldown: 1,
    cost: 20,
    expensePerSecond: 0,
  },
  {
    name: TROOP_NAME.CRUISER,
    isLandTroop: false,
    maxHealth: 8,
    damagePerHit: 2,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    movementCooldown: 1,
    largeActionCooldown: 1,
    cost: 30,
    expensePerSecond: 0,
  },
  {
    name: TROOP_NAME.BATTLESHIP,
    isLandTroop: false,
    maxHealth: 12,
    damagePerHit: 3,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    movementCooldown: 1,
    largeActionCooldown: 1,
    cost: 50,
    expensePerSecond: 0,
  },
];

export const generateWorldConstants = (adminAddr: string): WorldConstantsStruct => {
  return {
    admin: adminAddr,
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    numPorts: NUM_PORTS,
    numCities: NUM_CITIES,
    mapInterval: MAP_INTERVAL,
    combatEfficiency: COMBAT_EFFICIENCY,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
    initBatchSize: INIT_BATCH_SIZE,
    initPlayerBalance: INIT_PLAYER_BALANCE,
    defaultBaseGoldGenerationPerSecond: DEFAULT_BASE_GOLD_GENERATION_PER_SECOND,
  };
};

// ----------------------------------------------------------
// Rendering constants
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
// Functions
// ------------------------------------------------

export const getTroopNames = (): string[] => {
  return Object.keys(TROOP_NAME).filter((item) => isNaN(Number(item)));
};

export const getTroopTypeIndexByName = (troopTypes: TroopTypeStruct[], name: TROOP_NAME): number => {
  return troopTypes.indexOf(troopTypes.filter((item) => item.name === name)[0]);
};

// ------------------------------------------------
// Default maps
// ------------------------------------------------
