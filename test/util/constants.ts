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
