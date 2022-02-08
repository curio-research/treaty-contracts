import { generateMap } from "./map";
import { ItemWithMetadata } from "../../util/types/getter";

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

// item specs
const items: ItemWithMetadata[] = [
  { // cactus
    mineable: true,
    mineItemIds: [],
    strength: 25,
    craftable: false,
    craftItemIds: [],
    craftItemAmounts: [],
    occupiable: false,
    healthDamage: 0,
    energyDamage: 0
  },
  { // iron
    mineable: true,
    mineItemIds: [],
    strength: 50,
    craftable: false,
    craftItemIds: [],
    craftItemAmounts: [],
    occupiable: false,
    healthDamage: 0,
    energyDamage: 0
  },
  { // sword
    mineable: false,
    mineItemIds: [],
    strength: 10, // playerAttack += 10 => mining wood takes 2 turns not 5
    craftable: true,
    craftItemIds: [1],
    craftItemAmounts: [5],
    occupiable: false,
    healthDamage: 0,
    energyDamage: 0
  }
]

export const gameConstants = [WORLD_WIDTH, WORLD_HEIGHT, MOVE_RANGE, ATTACK_RANGE, ATTACK_DAMAGE, ATTACK_WAITTIME, START_PLAYER_HEALTH, START_PLAYER_ENERGY];

// master game deploy args generator
export const generateAllGameArgs = () => {
  const masterGameSpecs = generateMap(WORLD_WIDTH, WORLD_HEIGHT, ROOM_WIDTH);

  return {
    gameDeployArgs: [...gameConstants, masterGameSpecs.blocks, items],
    allTowerArgs: masterGameSpecs.towers,
  };
};
