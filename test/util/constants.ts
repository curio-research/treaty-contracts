export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

export enum REVERT_MESSAGES {
  ENGINE_INVALID_MOVE = "engine/invalid-move",
  ENGINE_NOT_STAND_ON_BLOCK = "engine/cannot-stand-on-block",
  ENGINE_INSUFFICIENT_INVENT = "engine/insufficient-inventory",
  ENGINE_INVALID_ATTACK = "engine/invalid-attack",
  ENGINE_INSUFFICIENT_MATERIAL = "engine/insufficient-material",
  ENGINE_NONEXISTENT_BLOCK = "engine/nonexistent-block",
  EPOCH_PREMATURE = "epoch/premature",
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
  energyDamage?: number;
};

// Pretty sure this can be rewritten in some way
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

// TODO: Convert this to more efficient data structure.
// TODO: This should be ported over to frontend as well (?)
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
  ["wall", 14],
  ["tower", 15],
]);

// tile types for map
const tileTypesSimple = [[], ["wood"]];

const tileTypesComplex = [
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

// TODO: Add more sophisticated map for testing
export const blocks = generateBlocks(tileTypesSimple);

const itemInputs: ItemWithMetadataInput[] = [
  {
    // dirt
    mineable: true,
    mineItemIds: [10],
    strength: 1,
    craftable: false,
    occupiable: true,
  },
  {
    // grass
    mineable: true,
    mineItemIds: [10],
    strength: 1,
    craftable: false,
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
  },
  {
    // stone
    mineable: true,
    mineItemIds: [12],
    strength: 20,
    craftable: false,
    occupiable: false,
  },
  {
    // wood
    mineable: true,
    strength: 10,
    craftable: false,
    occupiable: false,
  },
  {
    // cactus
    mineable: true,
    mineItemIds: [13],
    strength: 5,
    craftable: false,
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
    occupiable: false,
  },
  {
    // shovel
    mineable: false,
    craftable: true,
    craftItemIds: [5, 6],
    craftItemAmounts: [5, 5],
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
    craftItemAmounts: [1],
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
