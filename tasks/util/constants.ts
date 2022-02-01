import { MasterGenerateMap } from "./map";
import { items } from "./../../test/util/constants";

export const LOCALHOST_RPC_URL = "http://127.0.0.1:8545/";
export const LOCALHOST_WS_RPC_URL = "ws://localhost:8545";

// game specs
const WORLD_WIDTH = 7;
const WORLD_HEIGHT = 7;

export const gameConstants = [
  WORLD_WIDTH, // worldWidth
  WORLD_HEIGHT, // worldHeight
  2, // moveRange
  1, // attackRange
  5, // attackDamage
  5, // attackWaitTime
  100, // startPlayerHealth
  100, // startPlayerEnergy
];

export const blocks = MasterGenerateMap(WORLD_WIDTH, WORLD_HEIGHT);

export const GAME_DEPLOY_ARGS = [...gameConstants, blocks, items];
