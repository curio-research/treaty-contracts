import { MasterGenerateMap } from "./map";
import { generateBlocks } from "./../../test/util/constants";
import { items, constants } from "../../test/util/constants";

export const LOCALHOST_RPC_URL = "http://127.0.0.1:8545/";
export const LOCALHOST_WS_RPC_URL = "ws://localhost:8545";

// tile types for deploy
// keep this simple for now (1 block per grid)
export const tileTypes = [[], ["wood"]];

// generate blocks
// export const blocks = generateBlocks(tileTypes);

export const blocks = MasterGenerateMap();
console.log(blocks);

export const GAME_DEPLOY_ARGS = [...constants, blocks, items];
