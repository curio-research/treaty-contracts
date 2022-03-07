import { Tower } from "./../util/types/tower";
import { generateBlockIdToNameMap } from "./../test/util/constants";
import { Epoch } from "./../typechain-types/Epoch";
import { task } from "hardhat/config";
import * as path from "path";
import * as fsPromise from "fs/promises";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployProxy, printDivider } from "./util/deployHelper";
import { LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL, MAP_INTERVAL, masterItems, ROOM_LENGTH, WORLD_HEIGHT, WORLD_WIDTH } from "./util/constants";
import { generateAllGameArgs } from "./util/allArgsGenerator";
import { Getters, Game, GameStorage, Helper } from "../typechain-types";
import { TowerGame } from "./../typechain-types/TowerGame";
import { Permissions } from "../typechain-types";
import { position } from "../util/types/common";

// ---------------------------------
// deploy script
// npx hardhat deploy --network *NETWORK_NAME_HERE*
// ---------------------------------

task("deploy", "deploy contracts")
  .addFlag("noport", "Don't port files to frontend") // default is to call port
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    const isDev = hre.network.name === "localhost" || hre.network.name === "hardhat";
    await hre.run("compile");

    let player1: SignerWithAddress;
    let player2: SignerWithAddress;
    [player1, player2] = await hre.ethers.getSigners();

    printDivider();
    console.log("Network:", hre.network.name);

    const allGameArgs = generateAllGameArgs();

    const blocks = allGameArgs.gameDeployArgs[allGameArgs.gameDeployArgs.length - 2];
    // visualizeMap(blocks, true);

    // initialize contracts
    const GameHelper = await deployProxy<Helper>("Helper", player1, hre, []);
    console.log("✦ GameHelper deployed");
    const Permissions = await deployProxy<Permissions>("Permissions", player1, hre, [player1.address]);
    console.log("✦ Permissions deployed");
    const GameStorage = await deployProxy<GameStorage>("GameStorage", player1, hre, [Permissions.address]);
    console.log("✦ GameStorage deployed");
    const GameContract = await deployProxy<Game>("Game", player1, hre, [...allGameArgs.gameDeployArgs, GameStorage.address, Permissions.address]);
    console.log("✦ GameContract deployed");
    const TowerContract = await deployProxy<TowerGame>("TowerGame", player1, hre, [GameStorage.address, Permissions.address], { Helper: GameHelper.address });
    console.log("✦ TowerContract deployed");
    const GettersContract = await deployProxy<Getters>("Getters", player1, hre, [GameContract.address, GameStorage.address]);
    console.log("✦ GettersContract deployed");
    const EpochContract = await deployProxy<Epoch>("Epoch", player1, hre, [10]);
    console.log("✦ EpochContract deployed");

    const GET_MAP_INTERVAL = (await GettersContract.GET_MAP_INTERVAL()).toNumber();

    // add contract permissions
    const p1tx = await Permissions.connect(player1).setPermission(GameContract.address, true);
    await p1tx.wait();

    const p2tx = await Permissions.connect(player1).setPermission(TowerContract.address, true);
    await p2tx.wait();

    // make this into a table
    printDivider();
    console.log("Game         ", GameContract.address);
    console.log("Permissions  ", Permissions.address);
    console.log("Getters      ", GettersContract.address);
    console.log("Epoch        ", EpochContract.address);
    console.log("Tower        ", TowerContract.address);
    console.log("Storage      ", GameStorage.address);
    console.log("GameHelper   ", GameHelper.address);
    printDivider();

    // initialize blocks
    const blockMap = allGameArgs.blockMap;
    let regionMap: number[][][];
    for (let x = 0; x < WORLD_WIDTH; x += MAP_INTERVAL) {
      for (let y = 0; y < WORLD_HEIGHT; y += MAP_INTERVAL) {
        regionMap = blockMap.slice(x, x + MAP_INTERVAL).map((col) => col.slice(y, y + MAP_INTERVAL));

        await GameStorage.setMapRegion({ x, y }, regionMap);
      }
    }

    // initialize players only if we're on localhost
    if (isDev) {
      // initialize players
      let player1Pos: position = { x: 5, y: 5 };
      let player2Pos: position = { x: 1, y: 2 };

      let tx;

      // need to act the nonce already been used case
      if (await GameStorage._isOccupied(player1Pos)) {
        tx = await GameStorage._mine(player1Pos);
        await tx.wait();
      }

      if (await GameStorage._isOccupied(player2Pos)) {
        tx = await GameStorage._mine(player2Pos);
        tx.wait();
      }

      tx = await GameContract.connect(player1).initializePlayer(player1Pos); // initialize users
      await tx.wait();

      tx = await GameContract.connect(player2).initializePlayer(player2Pos);
      tx.wait();

      tx = await GameStorage.connect(player1)._increaseItemInInventory(player1.address, 0, 100);
      tx.wait();

      tx = await GameStorage.connect(player1)._increaseItemInInventory(player2.address, 0, 100);
      tx.wait();
    }

    let tx = await GameStorage.setEpochController(EpochContract.address); // set epoch controller
    await tx.wait();

    // bulk initialize towers
    const allTowerLocations: position[] = [];
    const allTowers: Tower[] = [];
    for (const tower of allGameArgs.allTowerArgs) {
      allTowerLocations.push(tower.location);
      allTowers.push(tower.tower);
    }

    const towerTx = await TowerContract.addTowerBulk(allTowerLocations, allTowers);
    await towerTx.wait();

    // ---------------------------------
    // porting files to frontend
    // ---------------------------------

    const currentFileDir = path.join(__dirname);

    const networkRPCs = rpcUrlSelector(hre.network.name);

    const configFile = {
      GAME_ADDRESS: GameContract.address,
      TOWER_GAME_ADDRESS: TowerContract.address,
      GAME_STORAGE_CONTRACT: GameStorage.address,
      GETTERS_ADDRESS: GettersContract.address,
      NETWORK: hre.network.name,
      EPOCH_ADDRESS: EpochContract.address,
      RPC_URL: networkRPCs[0],
      WS_RPC_URL: networkRPCs[1],
      GET_MAP_INTERVAL: GET_MAP_INTERVAL,
      BLOCK_ID_TO_NAME_MAP: generateBlockIdToNameMap(masterItems),
    };

    await fsPromise.writeFile(path.join(currentFileDir, "game.config.json"), JSON.stringify(configFile));

    const noPort = args.noport; // port flag
    if (noPort) return;
    await hre.run("port"); // default to porting files
  });

const rpcUrlSelector = (networkName: string): string[] => {
  if (networkName === "localhost") {
    return [LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL];
  } else if (networkName === "optimismKovan") {
    return [process.env.KOVAN_RPC_URL!, process.env.KOVAN_WS_RPC_URL!];
  }
  return [];
};
