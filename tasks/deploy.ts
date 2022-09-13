import { Curio__factory } from './../typechain-types/factories/Curio__factory';
import { ethers } from 'ethers';
import { GameLib } from './../typechain-types/GameLib';
import { ECSLib } from './../typechain-types/ECSLib';
import { publishDeployment, isConnectionLive } from './../api/deployment';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy, printDivider } from './util/deployHelper';
import { generateWorldConstants, SMALL_MAP_INPUT, COMPONENT_SPECS } from './util/constants';
import { position } from '../util/types/common';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { TILE_TYPE } from './util/types';
import { encodeTileMap } from './util/mapHelper';
import { GameConfig } from '../api/types';

/**
 * Deploy game instance and port configs to frontend.
 *
 * Examples:
 * `npx hardhat deploy --savemap`: randomly generate small map, deploy on localhost, and save map to local
 * `npx hardhat deploy --network OptimismKovan --fixmap --name MAP-0`: deploy on Optimism Kovan and use the first saved random map
 * `npx hardhat deploy --noport --fixmap --name MEDITERRAINEAN`: deploy on localhost, use the hardcoded Mediterrainean map, and do not port files to frontend
 * `npx hardhat deploy --name SANDBOX --network constellation`: randomly generate sandbox map and deploy on Constellation
 */

task('deploy', 'deploy contracts')
  .addFlag('port', 'Port contract abis and game info to Vault') // default is to call port
  .addFlag('publish', 'Publish deployment to game launcher') // default is to call publish
  .addFlag('release', 'Publish deployment to official release') // default is to call publish
  .addFlag('fixmap', 'Use deterministic map') // default is non-deterministic maps; deterministic maps are mainly used for client development
  .addOptionalParam('name', 'Name of fixed map', 'Hello, World!')
  .addFlag('savemap', 'Save map to local') // default is not to save
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      // Compile contracts
      await hre.run('compile');
      printDivider();

      // Read variables from run flags
      const isDev: boolean = hre.network.name === 'localhost' || hre.network.name === 'hardhat' || hre.network.name === 'constellation';

      console.log('Network:', hre.network.name);
      const fixMap: boolean = args.fixmap;
      if (fixMap) console.log('Using deterministic map');
      const publish: boolean = args.publish;
      const isRelease: boolean = args.release;
      let mapName: string = args.name;
      const saveMap: boolean = args.savemap;

      // Check connection with faucet to make sure deployment will post
      if (!isDev) {
        await isConnectionLive();
      }

      // Set up deployer and some local variables
      let [player1, player2] = await hre.ethers.getSigners();
      console.log('✦ player1 address is:', player1.address);

      // Set up game and map configs
      let tileMap: TILE_TYPE[][] = [];
      const worldConstants = generateWorldConstants(player1.address, SMALL_MAP_INPUT);
      for (let i = 0; i < worldConstants.worldWidth; i++) {
        let col: TILE_TYPE[] = [];
        for (let j = 0; j < worldConstants.worldHeight; j++) {
          col.push(0);
        }
        tileMap.push(col);
      }

      // if (fixMap) {
      //   if (mapName.toLowerCase() === 'mediterranean') {
      //     // hardcoded map: Mediterrainean 42x20
      //     gameMapConfig = MEDITERRAINEAN_MAP_CONFIG;
      //   } else if (mapName.length > LOCAL_MAP_PREFIX.length && mapName.substring(0, LOCAL_MAP_PREFIX.length) === LOCAL_MAP_PREFIX) {
      //     // saved maps from random generation
      //     const index = Number(mapName.substring(LOCAL_MAP_PREFIX.length, mapName.length));
      //     gameMapConfig = loadLocalMapConfig(index);
      //   } else {
      //     mapName = 'testingMap';
      //     gameMapConfig = testingMapConfig;
      //   }
      //   tileMap = gameMapConfig.tileMap;
      //   portTiles = gameMapConfig.portTiles;
      //   cityTiles = gameMapConfig.cityTiles;
      //   oilWellTiles = gameMapConfig.oilWellTiles;
      //   worldConstants = generateWorldConstants(player1.address, { width: tileMap.length, height: tileMap[0].length, numPorts: portTiles.length, numCities: cityTiles.length, numOilWells: oilWellTiles.length });
      // } else {
      //   // three modes of randomly-generated maps: small, large, or sandbox
      //   let mapInput: MapInput = SMALL_MAP_INPUT;
      //   if (mapName.toLowerCase() === 'large') mapInput = LARGE_MAP_INPUT;
      //   if (mapName.toLowerCase() === 'sandbox') mapInput = SANDBOX_MAP_INPUT;
      //   const gameMapConfigWithColor = generateGameMaps(mapInput, RENDER_CONSTANTS);
      //   tileMap = gameMapConfigWithColor.tileMap;
      //   portTiles = gameMapConfigWithColor.portTiles;
      //   cityTiles = gameMapConfigWithColor.cityTiles;
      //   oilWellTiles = gameMapConfigWithColor.oilWellTiles;
      //   worldConstants = generateWorldConstants(player1.address, mapInput);
      // }

      // if (saveMap) saveMapToLocal({ tileMap, portTiles, cityTiles, oilWellTiles });

      // Deploy helper contracts
      const ecsLib = await deployProxy<ECSLib>('ECSLib', player1, hre, []);
      console.log('✦ ECSLib:', ecsLib.address);

      const gameLib = await deployProxy<GameLib>('GameLib', player1, hre, [], { ECSLib: ecsLib.address });
      console.log('✦ GameLib:', gameLib.address);

      // Deploy diamond and facets
      const diamondAddr = await deployDiamond(hre, [worldConstants]);
      const facets = [
        { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address } },
        { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address } },
        { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address } },
      ];
      await deployFacets(hre, diamondAddr, facets, player1);
      const diamond = await getDiamond(hre, diamondAddr);
      printDivider();

      // Register components
      const time0 = performance.now();
      await (await diamond.registerComponents(diamond.address, COMPONENT_SPECS)).wait();
      const time1 = performance.now();
      console.log(`✦ component registration took ${Math.floor(time1 - time0)} ms`);

      // Initialize map
      const encodedTileMap = encodeTileMap(tileMap, 6, 50);
      await (await diamond.storeEncodedColumnBatches(encodedTileMap)).wait();
      const time2 = performance.now();
      console.log(`✦ lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(time2 - time1)} ms`);

      // Initialize a troop template
      const abiCoder = new ethers.utils.AbiCoder();

      await (await diamond.addEntity()).wait();
      const entityCount = (await diamond.getEntity()).toNumber();
      await (await diamond.setComponentValue('Tag', entityCount, abiCoder.encode(['string'], ['TroopTemplate']))).wait();
      await (await diamond.setComponentValue('InventoryType', entityCount, abiCoder.encode(['string'], ['Cavalry']))).wait();
      await (await diamond.setComponentValue('Health', entityCount, abiCoder.encode(['uint256'], [10]))).wait();
      await (await diamond.setComponentValue('Speed', entityCount, abiCoder.encode(['uint256'], [1]))).wait();
      await (await diamond.setComponentValue('Attack', entityCount, abiCoder.encode(['uint256'], [1]))).wait();
      await (await diamond.setComponentValue('Defense', entityCount, abiCoder.encode(['uint256'], [0]))).wait();
      await (await diamond.setComponentValue('Duration', entityCount, abiCoder.encode(['uint256'], [1]))).wait();
      const time3 = performance.now();
      console.log(`✦ troop template creation took ${Math.floor(time3 - time2)} ms`);

      // Initialize a resource template
      await (await diamond.addEntity()).wait();
      await (await diamond.setComponentValue('Tag', entityCount + 1, abiCoder.encode(['string'], ['ResourceTemplate']))).wait();
      await (await diamond.setComponentValue('InventoryType', entityCount + 1, abiCoder.encode(['string'], ['Gold']))).wait();
      await (await diamond.setComponentValue('Duration', entityCount + 1, abiCoder.encode(['uint256'], [1]))).wait();
      const time4 = performance.now();
      console.log(`✦ resource template creation took ${Math.floor(time4 - time3)} ms`);

      // Randomly initialize players if on localhost
      if (isDev) {
        let x: number;
        let y: number;

        if (fixMap && mapName === 'testingMap') {
          const player1Pos = { x: 2, y: 4 };
          const player2Pos = { x: 4, y: 2 };

          let ecsTime = performance.now();

          // Initialize players
          await (await diamond.connect(player1).initializePlayer(player1Pos, 'Alice')).wait();
          await (await diamond.connect(player2).initializePlayer(player2Pos, 'Bob')).wait();
          console.log(`✦ players initialized after ${performance.now() - ecsTime} ms`);
          ecsTime = performance.now();

          // // Purchase a destroyer for player1
          // await (await diamond.connect(player1).purchaseTroop(player1Pos, destroyerTemplateId)).wait();
          // console.log(`✦ destroyer purchased after ${performance.now() - ecsTime} ms`);
          // ecsTime = performance.now();
        } else {
          // Primary setting for local playtesting
          const mapWidth = tileMap.length;
          const mapHeight = tileMap[0].length;
          let player1Pos: position;
          let player2Pos: position;
          do {
            x = Math.floor(Math.random() * mapWidth);
            y = Math.floor(Math.random() * mapHeight);
            player1Pos = { x, y };
          } while (false);

          do {
            x = Math.floor(Math.random() * mapWidth);
            y = Math.floor(Math.random() * mapHeight);
            player2Pos = { x, y };
          } while (player2Pos.x === player1Pos.x || player2Pos.y === player1Pos.y);

          await (await diamond.connect(player1).initializePlayer(player1Pos, 'Eve')).wait();
          await (await diamond.connect(player2).initializePlayer(player2Pos, 'Felix')).wait();
          console.log(`✦ player initialization took ${Math.floor(performance.now() - time4)} ms`);
        }
      }

      // Generate config files
      const configFile: GameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: `deployer=${process.env.DEPLOYER_ID}-${mapName ? `${mapName}-` : ''}${isRelease ? 'release-' : ''}${hre.network.name}-${Date.now()}`,
        map: tileMap,
        time: new Date(),
      };

      // Port files to frontend if on localhost
      if (isDev) {
        const configFilePath = path.join(path.join(__dirname), 'game.config.json');
        let existingDeployments = [];
        if (fs.existsSync(configFilePath)) {
          const raw = fs.readFileSync(configFilePath).toString();
          existingDeployments = raw ? JSON.parse(raw) : [];
        }
        existingDeployments.push(configFile);

        await fsPromise.writeFile(configFilePath, JSON.stringify(existingDeployments));
        // await hre.run('port'); // default to porting files
      }

      // Publish deployment
      if (publish || !isDev) {
        await publishDeployment(configFile);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  });
