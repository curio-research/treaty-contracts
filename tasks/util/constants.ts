import { generateMap } from "./mapGenerator";
import { TowerWithLocation } from "./../../util/types/tower";
import { items } from "../../test/util/constants";

export const LOCALHOST_RPC_URL = "http://127.0.0.1:8545/";
export const LOCALHOST_WS_RPC_URL = "ws://localhost:8545";

// game specs
const WORLD_WIDTH = 20;
const WORLD_HEIGHT = 20;
const ROOM_WIDTH = 7;
const ATTACK_RANGE = 1;
const ATTACK_DAMAGE = 5;
const ATTACK_WAITTIME = 5;
const START_PLAYER_HEALTH = 100;
const START_PLAYER_ENERGY = 100;

const generateGameConstants = () => {
  return [WORLD_WIDTH, WORLD_HEIGHT, ATTACK_RANGE, ATTACK_DAMAGE, ATTACK_WAITTIME, START_PLAYER_HEALTH, START_PLAYER_ENERGY];
};

// master game deploy args generator
export const generateAllGameArgs = (): allGameArgs => {
  const gameConstants = generateGameConstants();
  const masterGameSpecs = generateMap(WORLD_WIDTH, WORLD_HEIGHT, ROOM_WIDTH);

  return {
    gameDeployArgs: [...gameConstants, masterGameSpecs.blocks, items],
    allTowerArgs: masterGameSpecs.towers,
  };
};

interface allGameArgs {
  gameDeployArgs: any[];
  allTowerArgs: TowerWithLocation[];
}
