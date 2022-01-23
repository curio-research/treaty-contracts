import { task } from "hardhat/config";
import * as path from "path";
import * as fsPromise from "fs/promises";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
import { deployProxy } from "./util/deployHelper";
import { GAME_DEPLOY_ARGS, LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL } from "./util/constants";
import { Getters, Game } from "../typechain-types";

// npx hardhat deploy --network localhost
task("deploy", "deploy contracts")
  .addFlag("port", "Port files to frontend")
  .setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
    let player1: SignerWithAddress;
    let player2: SignerWithAddress;
    [player1, player2] = await hre.ethers.getSigners();

    console.log("Network:", hre.network.name);

    const GameContract = await deployProxy<Game>("Game", player1, hre, GAME_DEPLOY_ARGS);
    const GettersContract = await deployProxy<Getters>("Getters", player1, hre, [GameContract.address]);

    console.log("Game: ", GameContract.address);
    console.log("Getters:", GettersContract.address);

    await GameContract.connect(player1).initializePlayer(1, 1); // initialize users
    await GameContract.connect(player2).initializePlayer(5, 5);

    await GameContract.connect(player1)._increaseItemInInventory(player1.address, 1, 100); // give user1 items for testing
    await GameContract.connect(player1)._increaseItemInInventory(player1.address, 2, 100);

    // save config file
    const currentFileDir = path.join(__dirname);

    const configFile = {
      GAME_ADDRESS: GameContract.address,
      GETTERS_ADDRESS: GettersContract.address,
      RPC_URL: LOCALHOST_RPC_URL,
      WS_RPC_URL: LOCALHOST_WS_RPC_URL,
    };

    await fsPromise.writeFile(path.join(currentFileDir, "game.config.json"), JSON.stringify(configFile));

    console.log("Porting complete!");
  })
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    const isPort = args.port;
    if (!isPort) return;
    await hre.run("port");
  });
