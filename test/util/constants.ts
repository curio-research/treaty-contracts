export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

export enum REVERT_MESSAGES {
  ENGINE_INVALID_MOVE = "engine/invalid-move",
  ENGINE_NOT_STAND_ON_BLOCK = "engine/cannot-stand-on-block",
  ENGINE_INSUFFICIENT_INVENT = "engine/insufficient-inventory",
  ENGINE_INVALID_ATTACK = "engine/invalid-attack",
  ENGINE_INSUFFICIENT_MATERIAL = "engine/insufficient-material",
}

// initial world item and corresponding crafting information
export const INITIAL_ITEMS = [
  { materialIds: [2], materialAmounts: [3] },
  { materialIds: [1], materialAmounts: [1] },
];

// initialize 6 by 6 grid map
const WORLD_WIDTH = 6;
const WORLD_HEIGHT = 6;

// map setup
const MASTER_MAP = [
  [1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0],
];

const TEN_BY_TEN_MINI_MAP = [
  [1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0],
];
const RESOURCE_MAP = {
  0: 'dirt',
  1: 'grass',
  2: 'sand',
  3: 'water',
  10: 'lava',
  1000: 'stone',
  1001: 'wood',
  1002: 'cactus',
  2000: 'apple',
  3000: 'workbench'
}

// list of coordinates
// TODO: Improve map initialization method. This is too tedius
export let positions: unknown[] = [];
for (let i = 0; i < WORLD_WIDTH; i++) {
  for (let j = 0; j < WORLD_HEIGHT; j++) {
    positions.push({ x: i, y: j });
  }
}
// initialize resource types on map
export const blockTypes = MASTER_MAP.flat();

export const GAME_DEPLOY_ARGS = [positions, blockTypes, WORLD_WIDTH, WORLD_HEIGHT, INITIAL_ITEMS];
