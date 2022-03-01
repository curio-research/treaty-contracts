import { Game__factory } from "./../../typechain-types/factories/Game__factory";
import { providers } from "ethers";
import { Wallet } from "@ethersproject/wallet";
import GAME_CONFIG from "../game.config.json";

// simulates a player movement by moving the player back and fourth
// this is the first step towards building simulation infrastructure

const PLAYER_PK = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

export const provider = new providers.StaticJsonRpcProvider(GAME_CONFIG.RPC_URL);

export const playSimulation = async () => {
  const signer = new Wallet(PLAYER_PK, provider);

  const gameContract = Game__factory.connect(GAME_CONFIG.GAME_ADDRESS, signer);

  console.log("Hello");
  console.log(gameContract);

  await delay(1000);
};

playSimulation();

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
