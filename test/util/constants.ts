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
