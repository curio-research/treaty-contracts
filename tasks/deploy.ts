import { generateBlockIdToNameMap } from "./../test/util/constants";
import { Epoch } from "./../typechain-types/Epoch";
import { task } from "hardhat/config";
import * as path from "path";
import * as fsPromise from "fs/promises";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployProxy, printDivider } from "./util/deployHelper";
import { generateAllGameArgs, LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL } from "./util/constants";
import { Getters, Game, GameStorage } from "../typechain-types";
import { TowerGame } from "./../typechain-types/TowerGame";
import { Permissions } from "../typechain-types";
import { masterItems } from "../test/util/constants";

// ---------------------------------
// deploy script
// npx hardhat deploy --network localhost
// ---------------------------------

task("deploy", "deploy contracts")
  .addFlag("noport", "Don't port files to frontend") // default is to call port
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    await hre.run("compile");

    let player1: SignerWithAddress;
    let player2: SignerWithAddress;
    [player1, player2] = await hre.ethers.getSigners();

    printDivider();
    console.log("Network:", hre.network.name);

    const gameDeployArgs = generateAllGameArgs();

    const Permissions = await deployProxy<Permissions>("Permissions", player1, hre, [player1.address]);
    const GameStorage = await deployProxy<GameStorage>("GameStorage", player1, hre, [Permissions.address]);
    const GameContract = await deployProxy<Game>("Game", player1, hre, [...gameDeployArgs.gameDeployArgs, GameStorage.address, Permissions.address]);
    const TowerContract = await deployProxy<TowerGame>("TowerGame", player1, hre, [GameStorage.address, Permissions.address]);
    const GettersContract = await deployProxy<Getters>("Getters", player1, hre, [GameContract.address, GameStorage.address]);
    const EpochContract = await deployProxy<Epoch>("Epoch", player1, hre, [10]);

    printDivider();
    console.log("Game:      ", GameContract.address);
    console.log("Getters:   ", GettersContract.address);
    console.log("Epoch:     ", EpochContract.address);
    console.log("Tower:     ", TowerContract.address);
    console.log("Storage:   ", GameStorage.address);
    printDivider();

    await GameContract.connect(player1).initializePlayer({ x: 1, y: 1 }); // initialize users
    await GameContract.connect(player2).initializePlayer({ x: 5, y: 5 });

    await GameStorage.connect(player1)._increaseItemInInventory(player1.address, 0, 10); // give user1 cacti for defense

    await GameStorage.setEpochController(EpochContract.address); // set epoch controller

    // initialize towers
    for (const tower of gameDeployArgs.allTowerArgs) {
      await TowerContract.addTower(tower.location, tower.tower);
    }

    // ---------------------------------
    // porting files to frontend
    // ---------------------------------

    const currentFileDir = path.join(__dirname);

    const configFile = {
      GAME_ADDRESS: GameContract.address,
      TOWER_GAME_ADDRESS: TowerContract.address,
      GETTERS_ADDRESS: GettersContract.address,
      EPOCH_ADDRESS: EpochContract.address,
      RPC_URL: LOCALHOST_RPC_URL,
      WS_RPC_URL: LOCALHOST_WS_RPC_URL,
      BLOCK_ID_TO_NAME_MAP: generateBlockIdToNameMap(masterItems),
    };

    await fsPromise.writeFile(path.join(currentFileDir, "game.config.json"), JSON.stringify(configFile));

    const noPort = args.noport; // port flag
    if (noPort) return;
    await hre.run("port"); // default to porting files
  });
