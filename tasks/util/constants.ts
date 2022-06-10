import { BigNumber } from 'ethers';
import { TroopTypeStruct } from '../../typechain-types/DiamondInit';
import { RenderInput } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// Game constants
// ----------------------------------------------------------

export const ADMIN = '0xDEADBEEF'; // FIXME
export const WORLD_WIDTH = 300;
export const WORLD_HEIGHT = 240;
export const NUM_PORTS = 300;
export const NUM_CITIES = 300;
export const MAP_INTERVAL = 10;
export const SECONDS_PER_TURN = 6;

export const TROOP_TYPES: TroopTypeStruct[] = [
  {
    name: 'ARMY',
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
    name: 'TROOP_TRANSPORT',
    speed: 2,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 50,
    defenseFactor: 50,
    cargoCapacity: 6,
    epochsToProduce: 14,
    movementCooldown: 0.5, // FIXME
    attackCooldown: 0,
    isLandTroop: false,
  },
  {
    name: 'DESTROYER',
    speed: 3,
    maxHealth: 3,
    damagePerHit: 1,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 20,
    movementCooldown: 0.33, // FIXME
    attackCooldown: 0,
    isLandTroop: false,
  },
  {
    name: 'CRUISER',
    speed: 2,
    maxHealth: 8,
    damagePerHit: 2,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 30,
    movementCooldown: 0.5, // FIXME
    attackCooldown: 0,
    isLandTroop: false,
  },
  {
    name: 'BATTLESHIP',
    speed: 2,
    maxHealth: 12,
    damagePerHit: 3,
    attackFactor: 100,
    defenseFactor: 100,
    cargoCapacity: 0,
    epochsToProduce: 50,
    movementCooldown: 0.5, // FIXME
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

export const generateTroopTypeIndexToNameMap = (troopTypes: TroopTypeStruct[]): Record<number, string> => {
  const res: Record<number, string> = {};
  troopTypes.forEach((troopType, idx) => (res[idx] = troopType.name.toString()));
  return res;
};

export const getTroopTypeIndexByName = (troopTypes: TroopTypeStruct[], name: string): number => {
  return troopTypes.indexOf(troopTypes.filter((item) => item.name.toString() === name)[0]);
};

// ------------------------------------------------
// Some default maps
// ------------------------------------------------
