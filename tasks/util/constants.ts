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
export const MAP_INTERVAL = 10;
export enum MAP_MODE {
  DEFAULT,
  PRIMS,
  PRIMS_CONNECTED,
  ROOMS_1,
}

// game specs - auto
export const WORLD_WIDTH = (ROOM_LENGTH - 1) * ROOMS_PER_DIMENSION + 1; // due to shared walls
export const WORLD_HEIGHT = (ROOM_LENGTH - 1) * ROOMS_PER_DIMENSION + 1;

export const generateGameConstants = () => {
  return {
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    startingAttackDamage: ATTACK_DAMAGE,
    startingAttackRange: ATTACK_RANGE,
    startingAttackWaitTime: 0,
    startPlayerHealth: 100,
    startPlayerEnergy: 100,
    startingReach: 2,
    startingPlayerDefaultCurrencyAmount: 100,
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
    },
  },
  {
    name: 'Minion',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 40,
      craftable: true,
      craftItemIds: [0],
      craftItemAmounts: [10],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 5,
      attackRange: 1,
      attackCooldown: 10,
      contractAddr: '',
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
    },
  },
  {
    name: 'Turbo',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 50,
      craftable: true,
      craftItemIds: [0, 1],
      craftItemAmounts: [20, 10],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      contractAddr: '',
    },
  },
  {
    name: 'Block',
    item: {
      mineable: true,
      mineItemIds: [],
      health: 50,
      craftable: true,
      craftItemIds: [0, 1],
      craftItemAmounts: [40, 20],
      occupiable: false,
      programmable: false,
      abiEncoding: '',
      attackDamage: 0,
      attackRange: 0,
      attackCooldown: 0,
      contractAddr: '',
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
    },
  },
];

// door metadata
export const blockMetadata: ItemWithMetadata = {
  mineable: true,
  mineItemIds: [],
  health: 0,
  craftable: true,
  craftItemIds: [],
  craftItemAmounts: [],
  occupiable: false,
  programmable: true,
  abiEncoding: '',
  contractAddr: '',
  attackDamage: 0,
  attackRange: 0,
  attackCooldown: 0,
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
export const ITEM_RATIO = [0, 10, 3, 0, 0, 0, 0, 0];
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
};
customMapMapping[MAP_MODE.ROOMS_1] = MAP_ROOMS_1;
