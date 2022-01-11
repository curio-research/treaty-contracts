import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
import { deployProxy } from "./util/deployHelper";
import { GAME_DEPLOY_ARGS } from "../test/util/constants";

task("deploy", "deploy contracts").setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  let player1: SignerWithAddress;
  [player1] = await hre.ethers.getSigners();

  console.log(hre.network.name);

  const GameContract = await deployProxy("Game", player1, hre, GAME_DEPLOY_ARGS);
  const GettersContract = await deployProxy("Getters", player1, hre, [GameContract.address]);

  console.log("Game: ", GameContract.address);
  console.log("Getters:", GettersContract.address);

  // initialize user1 at 1, 1
  await GameContract.initializePlayer(1, 1);
});
