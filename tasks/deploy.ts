import { GameUtils } from './../typechain-types/GameUtils';
import axios from 'axios';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { task } from 'hardhat/config';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy, getItemIndexByName, printDivider } from './util/deployHelper';
import { LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL, MAP_INTERVAL, masterItems, WORLD_HEIGHT, WORLD_WIDTH, generateBlockIdToNameMap, ITEM_RATIO, generateAllBlocks } from './util/constants';
import { generateAllGameArgs } from './util/allArgsGenerator';
import { position } from '../util/types/common';
import { gameItems } from './util/itemGenerator';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';

const { BACKEND_URL } = process.env;

// ---------------------------------
// deploy script
// npx hardhat deploy --network NETWORK_NAME_HERE
// ---------------------------------

task('deploy', 'deploy contracts')
  .addFlag('noport', "Don't port files to frontend") // default is to call port
  .addFlag('publish', 'Publish deployment to game launcher') // default is to call publish
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    await hre.run('compile');
    const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat';

    printDivider();
    console.log('Network:', hre.network.name);

    let player1: SignerWithAddress;
    let player2: SignerWithAddress;
    [player1, player2] = await hre.ethers.getSigners();
    const ironIdx = getItemIndexByName(masterItems, 'Iron');

    const allGameArgs = generateAllGameArgs(gameItems, ITEM_RATIO);

    const diamondAddress = await deployDiamond(hre, [allGameArgs.gameConstants]);
    console.log('Diamond deployed and initiated: ', diamondAddress);

    // deploy util contracts
    const gameUtil = await deployProxy<GameUtils>('GameUtils', player1, hre, []);
    console.log(gameUtil.address);

    // all facets
    const facets = [
      { name: 'EngineFacet', libraries: { GameUtils: gameUtil.address } },
      { name: 'GetterFacet', libraries: { GameUtils: gameUtil.address } },
      { name: 'TowerFacet', libraries: { GameUtils: gameUtil.address } },
    ];

    // deploy all facets
    await deployFacets(hre, diamondAddress, facets, player1);

    const diamond = await getDiamond(hre, diamondAddress);

    const blocks = allGameArgs.blockMap;

    // initialize map
    console.log('✦ initializing map');
    let regionMap: number[][];
    for (let x = 0; x < WORLD_WIDTH; x += MAP_INTERVAL) {
      for (let y = 0; y < WORLD_HEIGHT; y += MAP_INTERVAL) {
        regionMap = blocks.slice(x, x + MAP_INTERVAL).map((col) => col.slice(y, y + MAP_INTERVAL));

        let tx = await diamond.setMapRegion({ x, y }, regionMap);
        tx.wait();
      }
    }

    // randomly initialize players only if we're on localhost
    if (isDev) {
      console.log('✦ initializing players');
      let x: number;
      let y: number;

      let player1Pos: position;
      do {
        x = Math.floor(Math.random() * WORLD_WIDTH);
        y = Math.floor(Math.random() * WORLD_HEIGHT);
        player1Pos = { x, y };
      } while (blocks[x][y] != 0);

      let player2Pos: position;
      do {
        x = Math.floor(Math.random() * WORLD_WIDTH);
        y = Math.floor(Math.random() * WORLD_HEIGHT);
        player2Pos = { x, y };
      } while (blocks[x][y] != 0);

      let tx;
      tx = await diamond.connect(player1).initializePlayer(player1Pos, ironIdx); // initialize users
      tx.wait();

      await tx.wait();
    }

    // TODO: bulk initialize ports and cities

    // // ---------------------------------
    // // generate config files
    // // copies files and ports to frontend if it's a localhost, or publishes globally if its a global deployment
    // // ---------------------------------

    const currentFileDir = path.join(__dirname);

    const networkRPCs = rpcUrlSelector(hre.network.name);

    // perhaps this can also be on chain. lemme think - kevin
    const blockIdToNameMapping = generateBlockIdToNameMap(generateAllBlocks());

    const configFile = {
      address: diamond.address,
      //   addresses: JSON.stringify({
      //     GAME_ADDRESS: GameContract.address,
      //     TOWER_GAME_ADDRESS: TowerContract.address,
      //     GAME_STORAGE_CONTRACT: GameStorage.address,
      //     GETTERS_ADDRESS: GettersContract.address,
      //     EPOCH_ADDRESS: EpochContract.address,
      //   }),
      network: hre.network.name,
      rpcUrl: networkRPCs[0],
      wsRpcUrl: networkRPCs[1],
      blockIdToNameMapping: JSON.stringify(blockIdToNameMapping),
      deploymentId: `${hre.network.name}-${Date.now()}`,
    };

    const publish = args.publish;

    // publish the deployment to mongodb
    if (publish && !isDev) {
      console.log('Backend URL', BACKEND_URL);

      // publish
      const { data } = await axios.post(`${BACKEND_URL}/deployments/add`, configFile);

      if (data) {
        console.log('Published successfully');
      }
    }

    // if we're in dev mode, port the files to the frontend.
    if (isDev) {
      const configFileDir = path.join(currentFileDir, 'game.config.json');

      const existingDeployments = await fs.readFileSync(configFileDir).toString();

      const existingDeploymentsArray = existingDeployments ? JSON.parse(existingDeployments) : [];

      existingDeploymentsArray.push(configFile);

      await fsPromise.writeFile(configFileDir, JSON.stringify(existingDeploymentsArray));

      await hre.run('port'); // default to porting files
    }
  });

export const rpcUrlSelector = (networkName: string): string[] => {
  if (networkName === 'localhost') {
    return [LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL];
  } else if (networkName === 'optimismKovan') {
    return [process.env.KOVAN_RPC_URL!, process.env.KOVAN_WS_RPC_URL!];
  }
  return [];
};
