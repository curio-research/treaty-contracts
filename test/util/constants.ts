import { ItemMaster } from './../../util/types/getter';
export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

export enum REVERT_MESSAGES {
  ENGINE_INVALID_MOVE = 'engine/invalid-move',
  ENGINE_NOT_STAND_ON_BLOCK = 'engine/cannot-stand-on-block',
  ENGINE_INSUFFICIENT_INVENT = 'engine/insufficient-inventory',
  ENGINE_INVALID_ATTACK = 'engine/invalid-attack',
  ENGINE_INSUFFICIENT_MATERIAL = 'engine/insufficient-material',
  ENGINE_NONEXISTENT_BLOCK = 'engine/nonexistent-block',
  ENGINE_INVALID_Z_INDEX = 'engine/invalid-z-index',
  EPOCH_PREMATURE = 'epoch/premature',
  TOWER_INVALID_OWNER = 'tower/invalid-tower-owner',
  TOWER_INSUFFICIENT_STAKE = 'tower/insufficient-stake',
  TOWER_UNSTAKE_OVERFLOW = 'tower/withdraw-overflow',
}

type ItemWithMetadataInput = {
  mineable: boolean;
  craftable: boolean;
  occupiable: boolean;
  mineItemIds?: number[];
  strength?: number;
  craftItemIds?: number[];
  craftItemAmounts?: number[];
  healthDamage?: number;
};

class ItemWithMetadata {
  readonly mineable: boolean;
  readonly mineItemIds: number[];
  readonly strength: number;
  readonly craftable: boolean;
  readonly craftItemIds: number[];
  readonly craftItemAmounts: number[];
  readonly occupiable: boolean;
  readonly healthDamage: number;

  constructor(attr: ItemWithMetadataInput) {
    this.mineable = attr.mineable;
    this.mineItemIds = attr.mineItemIds ?? [];
    this.strength = attr.strength ?? 0;
    this.craftable = attr.craftable;
    this.craftItemIds = attr.craftItemIds ?? [];
    this.craftItemAmounts = attr.craftItemAmounts ?? [];
    this.occupiable = attr.occupiable;
    this.healthDamage = attr.healthDamage ?? 0;
  }
}

// test world specs
export const WORLD_WIDTH = 6;
export const WORLD_HEIGHT = 6;
export const MAP_INTERVAL = 10;
const ATTACK_RANGE = 1;
const ATTACK_DAMAGE = 5;
const ATTACK_WAITTIME = 5;
const START_PLAYER_HEALTH = 100;
const START_PLAYER_ENERGY = 100;

const GAME_CONSTANTS = {
  worldWidth: WORLD_WIDTH,
  worldHeight: WORLD_HEIGHT,
  startingAttackDamage: ATTACK_DAMAGE,
  startingAttackRange: ATTACK_RANGE,
  startingAttackWaitTime: 0,
  startPlayerHealth: 100,
  startPlayerEnergy: 100,
  startingReach: 2,
  startingPlayerDefaultCurrencyAmount: 0,
};

// tile types for map
const tileTypesSimple = [[], ['Iron']];

// item specs
export const masterItems: ItemMaster[] = [
  {
    name: 'Cactus',
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 25,
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
      strength: 50,
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
    name: 'Sword',
    item: {
      mineable: false,
      mineItemIds: [],
      strength: 10,
      craftable: true,
      craftItemIds: [1],
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
    name: 'Ruby',
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 80,
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

export const generateBlockNameToIdMap = (items: ItemMaster[]): Record<string, number> => {
  const res: Record<string, number> = {};
  items.forEach((item, idx) => {
    res[item.name] = idx;
  });
  return res;
};

const blockNameToIdMap = generateBlockNameToIdMap(masterItems);

export const items = masterItems.map((item) => item.item);

export const generateBlocks = (tileTypes: string[][]) => {
  const worldSize = WORLD_WIDTH * WORLD_HEIGHT;

  let blocks: number[][][] = [];

  let tileIdx, col;
  for (let i = 0; i < WORLD_WIDTH; i++) {
    col = [];
    for (let j = 0; j < WORLD_HEIGHT; j++) {
      tileIdx = i % 2 == 0 && j == 0 ? 1 : 0;
      col.push(tileTypes[tileIdx].map((b) => blockNameToIdMap[b]));
    }
    blocks.push(col);
  }

  return blocks;
};

export const blocks = generateBlocks(tileTypesSimple);

// fix dis
export const GAME_DEPLOY_TEST_ARGS = [GAME_CONSTANTS, items];
