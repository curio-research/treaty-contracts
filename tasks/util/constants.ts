import { ItemWithMetadata } from './../../util/types/getter';
import { ItemMaster } from '../../util/types/getter';
import { getItemIndexByName } from './deployHelper';
export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ------------------------------------------------
// General constants
// ------------------------------------------------

// game specs - manual
export const ROOM_LENGTH = 7;
export const ROOMS_PER_DIMENSION = 2;
export const ATTACK_RANGE = 1;
export const ATTACK_DAMAGE = 5;
export const ATTACK_WAITTIME = 5;
export const START_PLAYER_HEALTH = 100;
export const PLAYER_MOVE_COOLDOWN = 1; // player can move every x seconds
export const MAP_INTERVAL = 10;
export enum MAP_MODE {
  DEFAULT,
  PRIMS,
  PRIMS_CONNECTED,
  ROOMS_1,
  CELLULAR,
}

// game specs - auto
export const WORLD_WIDTH = (ROOM_LENGTH - 1) * ROOMS_PER_DIMENSION + 1; // due to shared walls
export const WORLD_HEIGHT = (ROOM_LENGTH - 1) * ROOMS_PER_DIMENSION + 1;

export const generateGameConstants = () => {
  return {
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    startPlayerHealth: START_PLAYER_HEALTH,
    startingReach: 2,
    startingPlayerDefaultCurrencyAmount: 100,
    playerMoveCooldown: PLAYER_MOVE_COOLDOWN,
  };
};

// ------------------------------------------------
// Item constants for game deployment
// ------------------------------------------------

export var masterItems: ItemMaster[] = [
  {
    name: 'Space',
    item: {
      mineable: false,
      mineItemIds: [],
      health: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      moveCooldown: 0,
    },
  },
  {
    name: 'Iron',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 10,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      contractAddr: '',
      moveCooldown: 0,
    },
  },
  {
    name: 'Silver',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 10,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      contractAddr: '',
      moveCooldown: 0,
    },
  },
  {
    name: 'Minion',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 40,
      craftable: true,
      craftItemIds: [1],
      craftItemAmounts: [10],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 5,
      attackRange: 1,
      attackCooldown: 10,
      contractAddr: '',
      moveCooldown: 10,
    },
  },
  {
    name: 'Archer',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 40,
      craftable: true,
      craftItemIds: [1, 2],
      craftItemAmounts: [20, 5],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 5,
      attackRange: 2,
      attackCooldown: 5,
      contractAddr: '',
      moveCooldown: 10,
    },
  },
  {
    name: 'Tower',
    item: {
      mineable: false,
      mineItemIds: [],
      health: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      contractAddr: '',
      moveCooldown: 0,
    },
  },
  {
    name: 'Turbo',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 50,
      craftable: true,
      craftItemIds: [1, 2],
      craftItemAmounts: [20, 10],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      contractAddr: '',
      moveCooldown: 0,
    },
  },
  {
    name: 'Block',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 50,
      craftable: true,
      craftItemIds: [1, 2],
      craftItemAmounts: [40, 20],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      contractAddr: '',
      moveCooldown: 0,
    },
  },
  {
    name: 'Indestructible Wall',
    item: {
      mineable: false,
      mineItemIds: [],
      health: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      contractAddr: '',
      moveCooldown: 0,
    },
  },
];

// ------------------------------------------------
// programmable blocks
// ------------------------------------------------

// door metadata
export const doorBlockMetadata: ItemWithMetadata = {
  mineable: false,
  mineItemIds: [],
  health: 0,
  craftable: true,
  craftItemIds: [1],
  craftItemAmounts: [5],
  occupiable: false,
  programmable: true,
  abiEncoding: '',
  contractAddr: '',
  attackDamage: 0,
  attackRange: 0,
  attackCooldown: 0,
  moveCooldown: 0,
};

const doorProgrammableBlock: ItemMaster = {
  name: 'Door',
  item: { ...doorBlockMetadata },
};

export const allProgrammableBlocks: ItemMaster[] = [doorProgrammableBlock];

export const generateAllBlocks = (): ItemMaster[] => {
  return [...masterItems, ...allProgrammableBlocks];
};

export const generateBlockIdToNameMap = (items: ItemMaster[]): Record<number, string> => {
  const res: Record<number, string> = {};
  items.forEach((item, idx) => {
    res[idx] = item.name;
  });
  return res;
};

// number of each item to generate every 100 tiles
// determines the rarity of items
export const ITEM_RATIO = [0, 0, 0, 0, 0, 0, 0, 0];
export const DOOR_RATIO = 0; // variable
console.assert(masterItems.length == ITEM_RATIO.length);

// ------------------------------------------------
// Some default maps
// ------------------------------------------------

const W = getItemIndexByName(masterItems, 'Indestructible Wall');
const O = getItemIndexByName(masterItems, 'Space');
const T = getItemIndexByName(masterItems, 'Tower');
const D = masterItems.length; // because door will be next item

export const MAP_ROOMS_1 = [
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W],
  [W, O, O, O, O, W, W, W, W, O, O, W, W, W],
  [W, O, T, O, O, O, O, W, W, O, O, O, O, W],
  [W, O, O, O, O, T, O, O, O, O, O, O, O, W],
  [W, O, O, O, O, O, O, O, O, T, O, W, O, W],
  [W, W, W, O, W, O, O, O, O, O, O, W, O, W],
  [W, W, W, O, W, O, O, T, O, O, W, W, O, W],
  [W, W, O, O, O, O, O, O, O, O, O, O, O, W],
  [W, W, O, T, O, O, O, W, W, W, W, D, W, W],
  [W, W, O, O, O, O, W, W, O, O, O, O, O, W],
  [W, W, W, W, W, W, W, W, O, T, O, O, O, W],
  [W, W, W, W, W, W, W, W, O, O, O, T, O, W],
  [W, W, W, W, W, W, W, W, W, O, O, O, O, W],
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W],
];

export var customMapMapping: Record<MAP_MODE, number[][]> = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
};

customMapMapping[MAP_MODE.ROOMS_1] = MAP_ROOMS_1;
