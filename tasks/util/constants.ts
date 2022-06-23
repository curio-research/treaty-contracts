import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { TroopTypeStruct } from '../../typechain-types/DiamondInit';
import { RenderInput, TROOP_NAME } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// Game constants (source of truth)
// ----------------------------------------------------------

export const WORLD_WIDTH = 30;
export const WORLD_HEIGHT = 20;
export const NUM_PORTS = 10;
export const NUM_CITIES = 10;
export const MAP_INTERVAL = 10;
export const SECONDS_PER_EPOCH = 2;
export const COMBAT_EFFICIENCY = 50;
export const BASE_ATTACK_FACTOR = 1;
export const BASE_DEFENSE_FACTOR = 1;
export const BASE_MAX_HEALTH = 1;
export const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229];

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
    movesPerEpoch: 2,
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
    movesPerEpoch: 3,
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
    movesPerEpoch: 2,
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
    movesPerEpoch: 2,
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
    primes: PRIMES,
  };
};

// export const generateBaseConstants = (): BaseConstantsStruct => {};

// ----------------------------------------------------------
// Rendering constants
// ----------------------------------------------------------

export const RENDER_CONSTANTS: RenderInput = {
  sizeFactor: 10,
  numLandColors: 5,
  numWaterColors: 2,
  waterNoiseCutoff: 0.55,
  colorLowestPercent: 40,
  plateSizeMultiplier: 6,
  superpositionRatio: [0.4, 0.6],
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
