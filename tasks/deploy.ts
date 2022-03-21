import { Tower } from "./../util/types/tower";
import { generateBlockIdToNameMap } from "./../test/util/constants";
import { Epoch } from "./../typechain-types/Epoch";
import { task } from "hardhat/config";
import axios from "axios";
import * as path from "path";
import * as fsPromise from "fs/promises";
import * as fs from "fs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployProxy, printDivider } from "./util/deployHelper";
import { LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL, MAP_INTERVAL, masterItems, WORLD_HEIGHT, WORLD_WIDTH } from "./util/constants";
import { generateAllGameArgs } from "./util/allArgsGenerator";
import { Getters, Game, GameStorage, Helper } from "../typechain-types";
import { TowerGame } from "./../typechain-types/TowerGame";
import { Permissions } from "../typechain-types";
import { position } from "../util/types/common";
import { flatten3dMapArray } from "./util/mapGenerator";

const { BACKEND_URL } = process.env;

// ---------------------------------
// deploy script
// npx hardhat deploy --network *NETWORK_NAME_HERE*
// ---------------------------------

task("deploy", "deploy contracts")
  .addFlag("noport", "Don't port files to frontend") // default is to call port
  .addFlag("publish", "Publish deployment to game launcher") // default is to call port
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    const isDev = hre.network.name === "localhost" || hre.network.name === "hardhat";
    await hre.run("compile");

    let player1: SignerWithAddress;
    let player2: SignerWithAddress;
    [player1, player2] = await hre.ethers.getSigners();

    const allGameArgs = generateAllGameArgs();

    let blocks = allGameArgs.blockMap;
    const flattenedMap = flatten3dMapArray(blocks); // flatten 3d map into 2d for change from blocks[] to blockId

    printDivider();
    console.log("Network:", hre.network.name);

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
    p1tx.wait();

    const p2tx = await Permissions.connect(player1).setPermission(TowerContract.address, true);
    p2tx.wait();

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
    console.log("✦ initializing blocks");
    let regionMap: number[][];
    for (let x = 0; x < WORLD_WIDTH; x += MAP_INTERVAL) {
      for (let y = 0; y < WORLD_HEIGHT; y += MAP_INTERVAL) {
        regionMap = flattenedMap.slice(x, x + MAP_INTERVAL).map((col) => col.slice(y, y + MAP_INTERVAL));

        let tx = await GameStorage._setMapRegion({ x, y }, regionMap);
        tx.wait();
      }
    }

    // randomly initialize players only if we're on localhost
    if (isDev) {
      console.log("✦ initializing players");
      let x: number;
      let y: number;

      let player1Pos: position;
      do {
        x = Math.floor(Math.random() * WORLD_WIDTH);
        y = Math.floor(Math.random() * WORLD_HEIGHT);
        player1Pos = { x, y };
      } while (flattenedMap[x][y] != 0);

      let player2Pos: position;
      do {
        x = Math.floor(Math.random() * WORLD_WIDTH);
        y = Math.floor(Math.random() * WORLD_HEIGHT);
        player2Pos = { x, y };
      } while (flattenedMap[x][y] != 0);

      let tx;
      tx = await GameContract.connect(player1).initializePlayer(player1Pos); // initialize users
      tx.wait();

      tx = await GameContract.connect(player2).initializePlayer(player2Pos);
      tx.wait();

      tx = await GameStorage.connect(player1)._increaseItemInInventory(player1.address, 0, 100);
      tx.wait();
    }

    console.log("✦ setting epoch controller");
    const tx = await GameStorage.setEpochController(EpochContract.address); // set epoch controller
    tx.wait();

    // bulk initialize towers
    console.log("✦ initializing towers");
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

    const blockIdToNameMapping = generateBlockIdToNameMap(masterItems);

    const configFile = {
      addresses: JSON.stringify({
        GAME_ADDRESS: GameContract.address,
        TOWER_GAME_ADDRESS: TowerContract.address,
        GAME_STORAGE_CONTRACT: GameStorage.address,
        GETTERS_ADDRESS: GettersContract.address,
        EPOCH_ADDRESS: EpochContract.address,
      }),
      network: hre.network.name,
      rpcUrl: networkRPCs[0],
      wsRpcUrl: networkRPCs[1],
      getMapInterval: GET_MAP_INTERVAL,
      blockIdToNameMapping: JSON.stringify(blockIdToNameMapping),
      deploymentId: `${hre.network.name}-${Date.now()}`,
    };

    const publish = args.publish;

    // publish the deployment to mongodb
    if (publish && !isDev) {
      console.log("Backend URL", BACKEND_URL);

      // publish
      const { data } = await axios.post(`${BACKEND_URL}/deployments/add`, configFile);

      if (data) {
        console.log("Published successfully");
      }
    }

    // if we're in dev mode, port the files to the frontend.
    if (isDev) {
      const configFileDir = path.join(currentFileDir, "game.config.json");

      const existingDeployments = await fs.readFileSync(configFileDir).toString();

      const existingDeploymentsArray = existingDeployments ? JSON.parse(existingDeployments) : [];

      existingDeploymentsArray.push(configFile);

      await fsPromise.writeFile(configFileDir, JSON.stringify(existingDeploymentsArray));

      await hre.run("port"); // default to porting files
    }
  });

export const rpcUrlSelector = (networkName: string): string[] => {
  if (networkName === "localhost") {
    return [LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL];
  } else if (networkName === "optimismKovan") {
    return [process.env.KOVAN_RPC_URL!, process.env.KOVAN_WS_RPC_URL!];
  }
  return [];
};
