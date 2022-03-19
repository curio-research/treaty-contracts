// import { Game__factory } from "./../typechain-types/factories/Game__factory";
// import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
// import { task } from "hardhat/config";
// import { providers } from "ethers";
// import { Wallet } from "@ethersproject/wallet";
// import GAME_CONFIG from "./game.config.json";

// export const provider = new providers.StaticJsonRpcProvider(GAME_CONFIG.RPC_URL);
// export const batchProvider = new providers.JsonRpcBatchProvider(GAME_CONFIG.RPC_URL);

// export const fetchLogs = async (startBlock: number, endBlock: number) => {
//   const res = await batchProvider.getLogs({
//     fromBlock: startBlock,
//     toBlock: endBlock,
//   });

//   console.log(res);
// };

// task("poll", "fetch logs").setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
//   console.log("Fetching logs ...");

//   // uncomment to run function. Enter a start block and end block to get the logs from
//   // await fetchLogs(_startBlock, _endBlock);
// });

// export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
