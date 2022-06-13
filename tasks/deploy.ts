import { Util } from './../typechain-types/Util';
import axios from 'axios';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy, printDivider } from './util/deployHelper';
import { TROOP_TYPES, getTroopTypeIndexByName, RENDER_CONSTANTS, MAP_INTERVAL, NUM_CITIES, NUM_PORTS, SECONDS_PER_EPOCH, WORLD_HEIGHT, WORLD_WIDTH, getTroopNames, generateWorldConstants } from './util/constants';
import { position } from '../util/types/common';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { MapInput, TILE_TYPE, TROOP_NAME } from './util/types';
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

    let [player1, player2] = await hre.ethers.getSigners();
    const armyTypeId = getTroopTypeIndexByName(TROOP_TYPES, TROOP_NAME.ARMY) + 1;

    // Set up game configs
    const worldConstants = generateWorldConstants(player1.address);

    const { tileMap, colorMap } = generateGameMaps(
      {
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        numPorts: NUM_PORTS,
        numCities: NUM_CITIES,
      } as MapInput,
      RENDER_CONSTANTS
    );

    // Deploy util contracts
    const util = await deployProxy<Util>('Util', player1, hre, []);
    console.log('✦ Util deployed:', util.address);

    // Deploy diamond and facets
    const diamondAddr = await deployDiamond(hre, [worldConstants, TROOP_TYPES]);
    console.log('✦ Diamond deployed and initiated:', diamondAddr);
    const facets = [
      { name: 'EngineFacet', libraries: { Util: util.address } },
      { name: 'GetterFacet', libraries: { Util: util.address } },
    ];
    await deployFacets(hre, diamondAddr, facets, player1);
    const diamond = await getDiamond(hre, diamondAddr);
    printDivider();

    // Initialize map
    console.log('✦ initializing map');
    let mapChunk: TILE_TYPE[][];
    for (let x = 0; x < WORLD_WIDTH; x += MAP_INTERVAL) {
      for (let y = 0; y < WORLD_HEIGHT; y += MAP_INTERVAL) {
        mapChunk = tileMap.slice(x, x + MAP_INTERVAL).map((col: TILE_TYPE[]) => col.slice(y, y + MAP_INTERVAL));

        let tx = await diamond.setMapChunk({ x, y }, mapChunk);
        tx.wait();
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
      } while (tileMap[x][y] != TILE_TYPE.PORT && player2Pos.x !== player1Pos.x && player2Pos.y !== player1Pos.y);

      // Give each player a port and an army to start with
      let tx = await diamond.connect(player1).initializePlayer(player1Pos, player1.address);
      await tx.wait();
      tx = await diamond.connect(player1).initializePlayer(player2Pos, player2.address);
      await tx.wait();
      tx = await diamond.connect(player1).spawnTroop(player1Pos, player1.address, armyTypeId);
      await tx.wait();
      tx = await diamond.connect(player1).spawnTroop(player2Pos, player2.address, armyTypeId);
      await tx.wait();

      // Basic checks
      const player1Army = await diamond.getTroopAt(player1Pos);
      if (player1Army.owner !== player1.address) throw new Error('Something is wrong');
      const player2Army = await diamond.getTroopAt(player2Pos);
      if (player2Army.troopTypeId.toNumber() !== armyTypeId) throw new Error('Something went wrong');
    }

    // ---------------------------------
    // generate config files
    // copies files and ports to frontend if it's a localhost, or publishes globally if its a global deployment
    // ---------------------------------

    const configFile = {
      address: diamond.address,
      network: hre.network.name,
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
      const configFileDir = path.join(path.join(__dirname), 'game.config.json');
      const raw = fs.readFileSync(configFileDir).toString();
      const existingDeployments = raw ? JSON.parse(raw) : [];
      existingDeployments.push(configFile);

      await fsPromise.writeFile(configFileDir, JSON.stringify(existingDeployments));
      await hre.run('port'); // default to porting files
    }
  });
