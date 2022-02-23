import { Item } from "../../util/types/getter";


export const LOCALHOST_RPC_URL = "http://127.0.0.1:8545/";
export const LOCALHOST_WS_RPC_URL = "ws://localhost:8545";

// ------------------------------------------------
// General constants
// ------------------------------------------------

// game specs - manual
export const ROOM_LENGTH = 7;
export const ROOMS_PER_DIMENSION = 3;
export const ATTACK_RANGE = 1;
export const ATTACK_DAMAGE = 5;
export const ATTACK_WAITTIME = 5;
export const START_PLAYER_HEALTH = 100;
export const START_PLAYER_ENERGY = 100;

// game specs - auto
export const WORLD_WIDTH = (ROOM_LENGTH - 1) * ROOMS_PER_DIMENSION + 1; // due to shared walls
export const WORLD_HEIGHT = (ROOM_LENGTH - 1) * ROOMS_PER_DIMENSION + 1

export const generateGameConstants = () => {
  return [WORLD_WIDTH, WORLD_HEIGHT, ATTACK_RANGE, ATTACK_DAMAGE, ATTACK_WAITTIME, START_PLAYER_HEALTH, START_PLAYER_ENERGY];
};


// ------------------------------------------------
// Item constants for game deployment
// ------------------------------------------------

export enum ALL_ITEMS {
  IRON = "Iron",
  SILVER = "Silver",
  FENCE = "Fence",
  WALL = "Wall",
  TOWER = "Tower",
  TURBO = "Turbo",
  BLOCK = "Block",
}

export const masterItems: Item[] = [
  {
    name: ALL_ITEMS.IRON,
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      healthDamage: 0,
      energyDamage: 0,
    },
  },
  {
    name: ALL_ITEMS.SILVER,
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      healthDamage: 0,
      energyDamage: 0,
    },
  },
  {
    name: ALL_ITEMS.FENCE,
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 20,
      craftable: true,
      craftItemIds: [0],
      craftItemAmounts: [5],
      occupiable: false,
      healthDamage: 0,
      energyDamage: 0,
    },
  },
  {
    name: ALL_ITEMS.WALL,
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 40,
      craftable: true,
      craftItemIds: [0],
      craftItemAmounts: [10],
      occupiable: false,
      healthDamage: 0,
      energyDamage: 0,
    },
  },
  {
    name: ALL_ITEMS.TOWER,
    item: {
      mineable: false,
      mineItemIds: [],
      strength: 0,
      craftable: false,
      craftItemIds: [],
      craftItemAmounts: [],
      occupiable: false,
      healthDamage: 0,
      energyDamage: 0,
    },
  },
  {
    name: ALL_ITEMS.TURBO,
    item: {
      mineable: true,
      mineItemIds: [],
      strength: 0,
      craftable: true,
      craftItemIds: [0, 1],
      craftItemAmounts: [10, 1],
      occupiable: false,
      healthDamage: 0,
      energyDamage: 0,
    },
  },
  {
    name: ALL_ITEMS.BLOCK,
    item: {
      mineable: false,
      mineItemIds: [],
      strength: 0,
      craftable: true,
      craftItemIds: [0, 1],
      craftItemAmounts: [20, 3],
      occupiable: false,
      healthDamage: 0,
      energyDamage: 0,
    },
  },
];

// number of each item to generate every 100 tiles
export const ITEM_RATIO = [
  12,
  3,
  0,
  0,
  0,
  0,
  0
];
console.assert(masterItems.length == ITEM_RATIO.length);