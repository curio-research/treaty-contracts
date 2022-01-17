import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
import { deployProxy } from "./util/deployHelper";
import { GAME_DEPLOY_ARGS } from "../test/util/constants";
import { Getters, Game } from "../typechain-types";

// npx hardhat deploy --network localhost
task("deploy", "deploy contracts").setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  let player1: SignerWithAddress;
  let player2: SignerWithAddress;
  [player1, player2] = await hre.ethers.getSigners();

  console.log("Network:", hre.network.name);

  const GameContract = await deployProxy<Game>("Game", player1, hre, GAME_DEPLOY_ARGS);
  const GettersContract = await deployProxy<Getters>("Getters", player1, hre, [GameContract.address]);

  console.log("Game: ", GameContract.address);
  console.log("Getters:", GettersContract.address);

  // initialize user1 at 1, 1
  await GameContract.connect(player1).initializePlayer(1, 1);
  await GameContract.connect(player2).initializePlayer(2, 2);

  // give user1 items for testing
  await GameContract.connect(player1)._increaseItemInInventory(player1.address, 1, 100);
  await GameContract.connect(player1)._increaseItemInInventory(player1.address, 2, 100);
});
