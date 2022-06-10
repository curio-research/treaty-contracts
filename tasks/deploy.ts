import { Util } from './../typechain-types/Util';
import axios from 'axios';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { task } from 'hardhat/config';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy, printDivider } from './util/deployHelper';
import { LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL, TROOP_TYPES, generateTroopTypeIndexToNameMap, getTroopTypeIndexByName, RENDER_CONSTANTS, ADMIN, MAP_INTERVAL, NUM_CITIES, NUM_PORTS, SECONDS_PER_TURN, WORLD_HEIGHT, WORLD_WIDTH } from './util/constants';
import { position } from '../util/types/common';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { MapInput, TILE_TYPE } from './util/types';
import { WorldConstantsStruct } from '../typechain-types/DiamondInit';
import { BigNumber } from 'ethers';
import { generateGameMaps } from './util/mapHelper';

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
    printDivider();

    const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat';
    console.log('Network:', hre.network.name);

    // Set up game configs
    const worldConstants: WorldConstantsStruct = {
      admin: ADMIN,
      worldWidth: BigNumber.from(WORLD_WIDTH),
      worldHeight: BigNumber.from(WORLD_HEIGHT),
      numPorts: BigNumber.from(NUM_PORTS),
      numCities: BigNumber.from(NUM_CITIES),
      mapInterval: BigNumber.from(MAP_INTERVAL),
      secondsPerTurn: BigNumber.from(SECONDS_PER_TURN),
    };
    const { tileMap, colorMap } = generateGameMaps(
      {
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        numPorts: NUM_PORTS,
        numCities: NUM_CITIES,
      } as MapInput,
      RENDER_CONSTANTS
    );

    let player1: SignerWithAddress;
    let player2: SignerWithAddress;
    [player1, player2] = await hre.ethers.getSigners();
    const armyIndex = getTroopTypeIndexByName(TROOP_TYPES, 'ARMY');

    // Deploy util contracts
    const util = await deployProxy<Util>('Util', player1, hre, []);
    console.log(util.address);

    // Deploy diamond and facets
    const diamondAddr = await deployDiamond(hre, [worldConstants]);
    console.log('Diamond deployed and initiated: ', diamondAddr);
    const facets = [
      { name: 'EngineFacet', libraries: { GameUtils: util.address } },
      { name: 'GetterFacet', libraries: { GameUtils: util.address } },
    ];
    await deployFacets(hre, diamondAddr, facets, player1);
    const diamond = await getDiamond(hre, diamondAddr);

    // Initialize map
    console.log('✦ initializing map');
    let regionMap: TILE_TYPE[][];
    for (let x = 0; x < WORLD_WIDTH; x += MAP_INTERVAL) {
      for (let y = 0; y < WORLD_HEIGHT; y += MAP_INTERVAL) {
        regionMap = tileMap.slice(x, x + MAP_INTERVAL).map((col) => col.slice(y, y + MAP_INTERVAL));

        let tx = await util._setMapChunk({ x, y }, regionMap);
        await tx.wait();
      }
    }

    if (isDev) {
      // Randomly initialize players only if we're on localhost
      console.log('✦ initializing players');
      let x: number;
      let y: number;

      let player1Pos: position;
      do {
        x = Math.floor(Math.random() * WORLD_WIDTH);
        y = Math.floor(Math.random() * WORLD_HEIGHT);
        player1Pos = { x, y };
      } while (tileMap[x][y] != TILE_TYPE.PORT);

      let player2Pos: position;
      do {
        x = Math.floor(Math.random() * WORLD_WIDTH);
        y = Math.floor(Math.random() * WORLD_HEIGHT);
        player2Pos = { x, y };
      } while (tileMap[x][y] != TILE_TYPE.PORT);

      let tx = await diamond.connect(player1).initializePlayer(player1Pos, player1.address); // initialize users
      await tx.wait();
    }

    // TODO: bulk initialize ports and cities

    // ---------------------------------
    // generate config files
    // copies files and ports to frontend if it's a localhost, or publishes globally if its a global deployment
    // ---------------------------------

    const currentFileDir = path.join(__dirname);
    const networkRPCs = rpcUrlSelector(hre.network.name);
    const troopTypeIndexToNameMap = generateTroopTypeIndexToNameMap(TROOP_TYPES);

    const configFile = {
      address: diamond.address,
      network: hre.network.name,
      rpcUrl: networkRPCs[0],
      wsRpcUrl: networkRPCs[1],
      troopTypeIndexToNameMap: JSON.stringify(troopTypeIndexToNameMap),
      deploymentId: `${hre.network.name}-${Date.now()}`,
    };

    // Publish the deployment to mongodb
    const publish = args.publish;
    if (publish && !isDev) {
      console.log('Backend URL', BACKEND_URL);
      const { data } = await axios.post(`${BACKEND_URL}/deployments/add`, configFile);

      if (data) {
        console.log('Published successfully');
      }
    }

    // If we're in dev mode, port the files to the frontend.
    if (isDev) {
      const configFileDir = path.join(currentFileDir, 'game.config.json');
      const raw = fs.readFileSync(configFileDir).toString();
      const existingDeployments = raw ? JSON.parse(raw) : [];
      existingDeployments.push(configFile);

      await fsPromise.writeFile(configFileDir, JSON.stringify(existingDeployments));
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
