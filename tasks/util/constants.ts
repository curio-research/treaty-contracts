import { ItemMaster, ItemWithMetadata } from '../../util/types/getter';
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
export const START_PLAYER_ENERGY = 100;
export const MAP_INTERVAL = 10;
export enum MAP_MODE {
  DEFAULT,
  PRIMS,
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
      strength: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
  {
    name: 'Iron',
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 10,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
  {
    name: 'Silver',
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 10,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
  {
    name: 'Fence',
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 20,
      craftable: true,
      craftItemIds: [0],
      craftItemAmounts: [5],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
  {
    name: 'Wall',
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 40,
      craftable: true,
      craftItemIds: [0],
      craftItemAmounts: [10],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
  {
    name: 'Tower',
    item: {
      mineable: false,
      mineItemIds: [],
      strength: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
  {
    name: 'Turbo',
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 50,
      craftable: true,
      craftItemIds: [0, 1],
      craftItemAmounts: [20, 10],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
  {
    name: 'Block',
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 50,
      craftable: true,
      craftItemIds: [0, 1],
      craftItemAmounts: [40, 20],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
  {
    name: 'Indestructible Wall',
    item: {
      mineable: false,
      mineItemIds: [],
      strength: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      healthDamage: 0,
      programmable: false,
      abiEncoding: '',
      contractAddr: '',
    },
  },
];

export var programmableBlockMetadata: ItemWithMetadata = {
  mineable: true,
  mineItemIds: [],
  strength: 0,
  craftable: true,
  craftItemIds: [],
  craftItemAmounts: [],
  occupiable: false,
  healthDamage: 0,
  programmable: true,
  abiEncoding: '',
  contractAddr: '',
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
export const ITEM_RATIO = [0, 10, 3, 0, 0, 0, 0, 0, 0];
console.assert(masterItems.length == ITEM_RATIO.length);
