import { generateBlocks } from "./../../test/util/constants";
import { items, constants } from "../../test/util/constants";

// tile types for deploy
// keep this simple for now (1 block per grid)
export const tileTypes = [["dirt"], ["wood"]];
export const blocks = generateBlocks(tileTypes);
export const GAME_DEPLOY_ARGS = [...constants, blocks, items];
