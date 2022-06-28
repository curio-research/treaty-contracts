import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { TroopTypeStruct } from '../../typechain-types/DiamondInit';
import { RenderInput, TILE_TYPE, TROOP_NAME } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// Game constants (source of truth)
// ----------------------------------------------------------

export const WORLD_WIDTH = 20;
export const WORLD_HEIGHT = 20;
export const NUM_PORTS = 0;
export const NUM_CITIES = 0;
export const MAP_INTERVAL = 10;
export const SECONDS_PER_EPOCH = 5;
export const COMBAT_EFFICIENCY = 50;
export const BASE_ATTACK_FACTOR = 1;
export const BASE_DEFENSE_FACTOR = 1;
export const BASE_MAX_HEALTH = 1;
export const NUM_INIT_TERRAIN_TYPES = Object.keys(TILE_TYPE).length;

export const TROOP_TYPES: TroopTypeStruct[] = [
  {
    name: TROOP_NAME.ARMY,
    movesPerEpoch: 1,
    maxHealth: 1,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 6,
    movementCooldown: 1,
    attackCooldown: 1,
    isLandTroop: true,
  },
  {
    name: TROOP_NAME.TROOP_TRANSPORT,
    movesPerEpoch: 1,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 50,
    defenseFactor: 50,
    cargoCapacity: 6,
    epochsToProduce: 14,
    movementCooldown: 1, // FIXME
    attackCooldown: 1,
    isLandTroop: false,
  },
  {
    name: TROOP_NAME.DESTROYER,
    movesPerEpoch: 1,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 20,
    movementCooldown: 1, // FIXME
    attackCooldown: 1,
    isLandTroop: false,
  },
  {
    name: TROOP_NAME.CRUISER,
    movesPerEpoch: 1,
    maxHealth: 8,
    damagePerHit: 2,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 30,
    movementCooldown: 1, // FIXME
    attackCooldown: 1,
    isLandTroop: false,
  },
  {
    name: TROOP_NAME.BATTLESHIP,
    movesPerEpoch: 1,
    maxHealth: 12,
    damagePerHit: 3,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 50,
    movementCooldown: 1, // FIXME
    attackCooldown: 1,
    isLandTroop: false,
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
    secondsPerEpoch: SECONDS_PER_EPOCH,
    combatEfficiency: COMBAT_EFFICIENCY,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
  };
};

// ----------------------------------------------------------
// Rendering constants
// ----------------------------------------------------------

export const RENDER_CONSTANTS: RenderInput = {
  sizeFactor: 5,
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

export const ligmap: number[][] = [
  [1, 1, 4, 1, 3, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
  [4, 1, 1, 1, 3, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
  [3, 1, 3, 1, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
