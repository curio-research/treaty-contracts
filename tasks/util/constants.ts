import { TroopTypeStruct } from '../../typechain-types/DiamondInit';
import { RenderInput, TROOP_NAME } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// Game constants (source of truth)
// ----------------------------------------------------------

export const WORLD_WIDTH = 100;
export const WORLD_HEIGHT = 80;
export const NUM_PORTS = 30;
export const NUM_CITIES = 30;
export const MAP_INTERVAL = 10;
export const SECONDS_PER_TURN = 6;

export const TROOP_TYPES: TroopTypeStruct[] = [
  {
    name: TROOP_NAME.ARMY,
    speed: 1,
    maxHealth: 1,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 6,
    movementCooldown: 1,
    attackCooldown: 0,
    isLandTroop: true,
  },
  {
    name: TROOP_NAME.TROOP_TRANSPORT,
    speed: 2,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 50,
    defenseFactor: 50,
    cargoCapacity: 6,
    epochsToProduce: 14,
    movementCooldown: 1, // FIXME
    attackCooldown: 0,
    isLandTroop: false,
  },
  {
    name: TROOP_NAME.DESTROYER,
    speed: 3,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 20,
    movementCooldown: 1, // FIXME
    attackCooldown: 0,
    isLandTroop: false,
  },
  {
    name: TROOP_NAME.CRUISER,
    speed: 2,
    maxHealth: 8,
    damagePerHit: 2,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 30,
    movementCooldown: 1, // FIXME
    attackCooldown: 0,
    isLandTroop: false,
  },
  {
    name: TROOP_NAME.BATTLESHIP,
    speed: 2,
    maxHealth: 12,
    damagePerHit: 3,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 50,
    movementCooldown: 1, // FIXME
    attackCooldown: 0,
    isLandTroop: false,
  },
];

// ----------------------------------------------------------
// Rendering constants
// ----------------------------------------------------------

export const RENDER_CONSTANTS: RenderInput = {
  sizeFactor: 50,
  numLandColors: 5,
  numWaterColors: 2,
  waterNoiseCutoff: 0.4,
  colorLowestPercent: 40,
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
