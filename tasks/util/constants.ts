import { generateMap } from "./map";
import { items } from "./../../test/util/constants";

export const LOCALHOST_RPC_URL = "http://127.0.0.1:8545/";
export const LOCALHOST_WS_RPC_URL = "ws://localhost:8545";

// game specs
const WORLD_WIDTH = 20;
const WORLD_HEIGHT = 20;
const ROOM_WIDTH = 7;
const MOVE_RANGE = 2;
const ATTACK_RANGE = 1;
const ATTACK_DAMAGE = 5;
const ATTACK_WAITTIME = 5;
const START_PLAYER_HEALTH = 100;
const START_PLAYER_ENERGY = 100;

export const gameConstants = [WORLD_WIDTH, WORLD_HEIGHT, MOVE_RANGE, ATTACK_RANGE, ATTACK_DAMAGE, ATTACK_WAITTIME, START_PLAYER_HEALTH, START_PLAYER_ENERGY];

export const masterGameSpecs = generateMap(WORLD_WIDTH, WORLD_HEIGHT, ROOM_WIDTH);

// game deploy args
export const GAME_DEPLOY_ARGS = [...gameConstants, masterGameSpecs.blocks, items];
export const ALL_TOWERS = masterGameSpecs.towers;
