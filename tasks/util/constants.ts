

export const LOCALHOST_RPC_URL = "http://127.0.0.1:8545/";
export const LOCALHOST_WS_RPC_URL = "ws://localhost:8545";

// game specs
export const ROOM_WIDTH = 7;
export const WORLD_WIDTH = 20;
export const WORLD_HEIGHT = 20;
export const ATTACK_RANGE = 1;
export const ATTACK_DAMAGE = 5;
export const ATTACK_WAITTIME = 5;
export const START_PLAYER_HEALTH = 100;
export const START_PLAYER_ENERGY = 100;

export const generateGameConstants = () => {
  return [WORLD_WIDTH, WORLD_HEIGHT, ATTACK_RANGE, ATTACK_DAMAGE, ATTACK_WAITTIME, START_PLAYER_HEALTH, START_PLAYER_ENERGY];
};