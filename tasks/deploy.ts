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
import { generateMap, visualizeMap } from "./util/mapGenerator";
import { position } from "../util/types/common";
import { generateItems } from "./util/itemGenerator";

// ---------------------------------
// deploy script
// npx hardhat deploy --network localhost
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
    visualizeMap(blocks, true);

    // initialize contracts
    const GameHelper = await deployProxy<Helper>("Helper", player1, hre, []);
    const Permissions = await deployProxy<Permissions>("Permissions", player1, hre, [player1.address]);
    const GameStorage = await deployProxy<GameStorage>("GameStorage", player1, hre, [Permissions.address]);
    const GameContract = await deployProxy<Game>("Game", player1, hre, [...allGameArgs.gameDeployArgs, GameStorage.address, Permissions.address]);
    const TowerContract = await deployProxy<TowerGame>("TowerGame", player1, hre, [GameStorage.address, Permissions.address], { Helper: GameHelper.address });
    const GettersContract = await deployProxy<Getters>("Getters", player1, hre, [GameContract.address, GameStorage.address]);
    const EpochContract = await deployProxy<Epoch>("Epoch", player1, hre, [10]);

    const GET_MAP_INTERVAL = (await GettersContract.GET_MAP_INTERVAL()).toNumber();

    // add contract permissions
    await Permissions.connect(player1).setPermission(GameContract.address, true);
    await Permissions.connect(player1).setPermission(TowerContract.address, true);

    printDivider();
    console.log("Game:      ", GameContract.address);
    console.log("Getters:   ", GettersContract.address);
    console.log("Epoch:     ", EpochContract.address);
    console.log("Tower:     ", TowerContract.address);
    console.log("Storage:   ", GameStorage.address);
    printDivider();

    // initialize blocks
    const blockMap = allGameArgs.blockMap;
    let regionMap: number[][][];
    for (let x = 0; x < WORLD_WIDTH; x += MAP_INTERVAL) {
      for (let y = 0; y < WORLD_HEIGHT; y += MAP_INTERVAL) {
        regionMap = blockMap.slice(x, x + MAP_INTERVAL).map((col) => col.slice(y, y + MAP_INTERVAL));

        GameContract.setMapRegion({ x, y }, regionMap);
      }
    }

    // initialize players
    let player1Pos: position = { x: 1, y: 1 };
    let player2Pos: position = { x: 5, y: 5 };
    // positions may be occupied by randomized blocks; remove block if that is the case
    if (await GameStorage._isOccupied(player1Pos)) {
      await GameStorage._mine(player1Pos);
    }
    if (await GameStorage._isOccupied(player2Pos)) {
      await GameStorage._mine(player2Pos);
    }
    await GameContract.connect(player1).initializePlayer(player1Pos); // initialize users
    await GameContract.connect(player2).initializePlayer(player2Pos);

    if (isDev) {
      await GameStorage.connect(player1)._increaseItemInInventory(player1.address, 0, 100);
    }

    await GameStorage.setEpochController(EpochContract.address); // set epoch controller

    // bulk initialize towers
    const allTowerLocations: position[] = [];
    const allTowers: Tower[] = [];
    for (const tower of allGameArgs.allTowerArgs) {
      allTowerLocations.push(tower.location);
      allTowers.push(tower.tower);
    }

    await TowerContract.addTowerBulk(allTowerLocations, allTowers);

    // ---------------------------------
    // porting files to frontend
    // ---------------------------------

    const currentFileDir = path.join(__dirname);

    const configFile = {
      GAME_ADDRESS: GameContract.address,
      TOWER_GAME_ADDRESS: TowerContract.address,
      GAME_STORAGE_CONTRACT: GameStorage.address,
      GETTERS_ADDRESS: GettersContract.address,
      EPOCH_ADDRESS: EpochContract.address,
      RPC_URL: LOCALHOST_RPC_URL,
      WS_RPC_URL: LOCALHOST_WS_RPC_URL,
      GET_MAP_INTERVAL: GET_MAP_INTERVAL,
      BLOCK_ID_TO_NAME_MAP: generateBlockIdToNameMap(masterItems),
    };

    await fsPromise.writeFile(path.join(currentFileDir, "game.config.json"), JSON.stringify(configFile));

    const noPort = args.noport; // port flag
    if (noPort) return;
    await hre.run("port"); // default to porting files
  });
