import internal from "stream";
import { ItemWithMetadataStruct } from "../../typechain-types/Game";

export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

export enum REVERT_MESSAGES {
  ENGINE_INVALID_MOVE = "engine/invalid-move",
  ENGINE_NOT_STAND_ON_BLOCK = "engine/cannot-stand-on-block",
  ENGINE_INSUFFICIENT_INVENT = "engine/insufficient-inventory",
  ENGINE_INVALID_ATTACK = "engine/invalid-attack",
  ENGINE_INSUFFICIENT_MATERIAL = "engine/insufficient-material",
}

type ItemWithMetadataInput = {
  mineable: boolean;
  craftable: boolean;
  occupiable: boolean;
  mineItemIds?: number[];
  strength?: number;
  craftItemIds?: number[];
  craftItemAmounts?: number[];
  // placeItemIds?: number[],
  healthDamage?: number;
  energyDamage?: number;
  // protectItemIds?: number[],
  // protectItemHealths?: number[],
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
  readonly energyDamage: number;

  constructor(attr: ItemWithMetadataInput) {
    this.mineable = attr.mineable;
    this.mineItemIds = attr.mineItemIds ?? [];
    this.strength = attr.strength ?? 0;
    this.craftable = attr.craftable;
    this.craftItemIds = attr.craftItemIds ?? [];
    this.craftItemAmounts = attr.craftItemAmounts ?? [];
    this.occupiable = attr.occupiable;
    this.healthDamage = attr.healthDamage ?? 0;
    this.energyDamage = attr.energyDamage ?? 0;
  }
}

export const constants = [
  6, // worldWidth
  6, // worldHeight
  2, // moveRange
  1, // attackRange
  5, // attackDamage
  5, // attackWaitTime
  100, // startPlayerHealth
  100, // startPlayerEnergy
];

const blockMap = new Map<string, number>([
  ["dirt", 0],
  ["grass", 1],
  ["sand", 2],
  ["water", 3],
  ["lava", 4],
  ["stone", 5],
  ["wood", 6],
  ["cactus", 7],
  ["apple", 8],
  ["workbench", 9],
  ["shovel", 10],
  ["lava suit", 11],
  ["pickaxe", 12],
  ["axe", 13],
]);

// tile types for map
const tileTypes = [
  ["water", "dirt", "grass"],
  ["water", "dirt", "grass", "wood"],
];

export const generateBlocks = (tileTypes: string[][]) => {
  const worldWidth = constants[0];
  const worldHeight = constants[1];
  const worldSize = worldWidth * worldHeight;

  let blocks: number[][] = [];
  let tileIdx;
  for (let i = 0; i < worldSize; i++) {
    // TODO: created a fixed map with real resource
    tileIdx = i % 12 == 0 ? 1 : 0;
    blocks.push(tileTypes[tileIdx].map((b) => blockMap.get(b)!));
  }

  return blocks;
};
export const blocks = generateBlocks(tileTypes);

const itemInputs: ItemWithMetadataInput[] = [
  {
    // dirt
    mineable: true,
    mineItemIds: [10],
    strength: 1,
    craftable: false,
    // placeItemIds: [3],
    occupiable: true,
  },
  {
    // grass
    mineable: true,
    mineItemIds: [10],
    strength: 1,
    craftable: false,
    // placeItemIds: [0],
    occupiable: true,
  },
  {
    // sand
    mineable: false,
    craftable: false,
    occupiable: true,
  },
  {
    // water
    mineable: false,
    craftable: false,
    occupiable: true,
    energyDamage: 1,
  },
  {
    // lava
    mineable: false,
    craftable: false,
    occupiable: true,
    healthDamage: 1,
    energyDamage: 1,
    // protectItemIds: [11],
    // protectItemHealths: [1],
  },
  {
    // stone
    mineable: true,
    mineItemIds: [12],
    strength: 20,
    craftable: false,
    // placeItemIds: [0, 3, 4],
    occupiable: false,
  },
  {
    // wood
    mineable: true,
    // mineItemIds: [13],
    strength: 10,
    craftable: false,
    // placeItemIds: [1],
    occupiable: false,
  },
  {
    // cactus
    mineable: true,
    mineItemIds: [13],
    strength: 5,
    craftable: false,
    // placeItemIds: [2],
    occupiable: false,
  },
  {
    // apple
    mineable: true,
    craftable: false,
    occupiable: false,
  },
  {
    // workbench
    mineable: false,
    craftable: true,
    craftItemIds: [6],
    craftItemAmounts: [15],
    // placeItemIds: [0, 1, 2],
    occupiable: false,
  },
  {
    // shovel
    mineable: false,
    craftable: true,
    craftItemIds: [5, 6],
    craftItemAmounts: [5, 5],
    // placeItemIds: [0, 1, 2],
    occupiable: false,
  },
  {
    // lava suit
    mineable: false,
    craftable: true,
    craftItemIds: [5],
    craftItemAmounts: [2],
    occupiable: false,
  },
  {
    // pickaxe
    mineable: false,
    craftable: true,
    craftItemIds: [6],
    craftItemAmounts: [2],
    occupiable: false,
  },
  {
    // axe
    mineable: false,
    craftable: true,
    craftItemIds: [6],
    craftItemAmounts: [5],
    occupiable: false,
  },
];
export const items = itemInputs.map((i) => new ItemWithMetadata(i));

export const GAME_DEPLOY_TEST_ARGS = [...constants, blocks, items];
