import { Game__factory } from "./../typechain-types/factories/Game__factory";
import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
import { task } from "hardhat/config";
import { providers } from "ethers";
import { Wallet } from "@ethersproject/wallet";
import GAME_CONFIG from "./game.config.json";

export const provider = new providers.StaticJsonRpcProvider(GAME_CONFIG.RPC_URL);
export const batchProvider = new providers.JsonRpcBatchProvider(GAME_CONFIG.RPC_URL);

export const fetchLogs = async (startBlock: number, endBlock: number) => {
  const res = await batchProvider.getLogs({
    fromBlock: startBlock,
    toBlock: endBlock,
  });

  console.log(res);
};

task("poll", "fetch logs").setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  console.log("Fetching logs ...");
  await fetchLogs(1341292, 1341292);
});

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
