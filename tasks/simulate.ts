// import { Game__factory } from "./../typechain-types/factories/Game__factory";
// import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
// import { task } from "hardhat/config";
// import { providers } from "ethers";
// import { Wallet } from "@ethersproject/wallet";
// import GAME_CONFIG from "./game.config.json";

// const PLAYER_1_PK = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
// export const provider = new providers.StaticJsonRpcProvider(GAME_CONFIG.RPC_URL);

// export const playSimulation = async () => {
//   const signer = new Wallet(PLAYER_1_PK, provider);

//   const gameContract = Game__factory.connect(GAME_CONFIG.GAME_ADDRESS, signer);

//   for (let i = 0; i < 1000; i++) {
//     await gameContract.move({ x: 1, y: 1 });
//     console.log("Moved to 1, 1");
//     await delay(1000);
//     await gameContract.move({ x: 1, y: 2 });
//     console.log("Moved to 1, 2");
//     await delay(1000);
//   }
//   // await gameContract.move({x: 1, y: 1})
// };

// task("simulate", "simulate player agents").setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
//   console.log("simulate");
//   await playSimulation();
// });

// export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
// */
