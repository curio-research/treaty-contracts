import { Item } from "./../../util/types/getter";

// ------------------------------------------------
// Item sheet for game deployment
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

export const allGameItems = masterItems.map((item) => item.item);
