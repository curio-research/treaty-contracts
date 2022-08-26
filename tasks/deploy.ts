import { EngineModules } from './../typechain-types/EngineModules';
import { publishDeployment, isConnectionLive } from './../api/deployment';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { Util } from './../typechain-types/Util';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy, loadLocalMapConfig, LOCAL_MAP_PREFIX, printDivider, saveMapToLocal } from './util/deployHelper';
import { TROOP_TYPES, RENDER_CONSTANTS, generateWorldConstants, SMALL_MAP_INPUT, LARGE_MAP_INPUT, SANDBOX_MAP_INPUT } from './util/constants';
import { position } from '../util/types/common';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { Position, GameMapConfig, TILE_TYPE, MapInput } from './util/types';
import { encodeTileMap, generateGameMaps } from './util/mapHelper';
import { GameConfig } from '../api/types';
import { MEDITERRAINEAN_MAP_CONFIG, testingMapConfig } from './util/mapLibrary';
import { WorldConstantsStruct } from '../typechain-types/Curio';
import { ethers } from 'ethers';

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
  .addFlag('noport', "Don't port files to frontend") // default is to call port
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
      const infantryTroopTypeId = 1; // FIXME
      const destroyerTroopTypeId = 3; // FIXME

      // Set up game and map configs
      let gameMapConfig: GameMapConfig;
      let tileMap: TILE_TYPE[][];
      let portTiles: Position[];
      let cityTiles: Position[];
      let oilWellTiles: Position[];
      let worldConstants: WorldConstantsStruct;

      if (fixMap) {
        if (mapName.toLowerCase() === 'mediterranean') {
          // hardcoded map: Mediterrainean 42x20
          gameMapConfig = MEDITERRAINEAN_MAP_CONFIG;
        } else if (mapName.length > LOCAL_MAP_PREFIX.length && mapName.substring(0, LOCAL_MAP_PREFIX.length) === LOCAL_MAP_PREFIX) {
          // saved maps from random generation
          const index = Number(mapName.substring(LOCAL_MAP_PREFIX.length, mapName.length));
          gameMapConfig = loadLocalMapConfig(index);
        } else {
          mapName = 'testingMap';
          gameMapConfig = testingMapConfig;
        }
        tileMap = gameMapConfig.tileMap;
        portTiles = gameMapConfig.portTiles;
        cityTiles = gameMapConfig.cityTiles;
        oilWellTiles = gameMapConfig.oilWellTiles;
        worldConstants = generateWorldConstants(player1.address, { width: tileMap.length, height: tileMap[0].length, numPorts: portTiles.length, numCities: cityTiles.length, numOilWells: oilWellTiles.length });
      } else {
        // three modes of randomly-generated maps: small, large, or sandbox
        let mapInput: MapInput = SMALL_MAP_INPUT;
        if (mapName.toLowerCase() === 'large') mapInput = LARGE_MAP_INPUT;
        if (mapName.toLowerCase() === 'sandbox') mapInput = SANDBOX_MAP_INPUT;
        const gameMapConfigWithColor = generateGameMaps(mapInput, RENDER_CONSTANTS);
        tileMap = gameMapConfigWithColor.tileMap;
        portTiles = gameMapConfigWithColor.portTiles;
        cityTiles = gameMapConfigWithColor.cityTiles;
        oilWellTiles = gameMapConfigWithColor.oilWellTiles;
        worldConstants = generateWorldConstants(player1.address, mapInput);
      }

      if (saveMap) saveMapToLocal({ tileMap, portTiles, cityTiles, oilWellTiles });

      // Deploy helper contracts
      const util = await deployProxy<Util>('Util', player1, hre, []);
      console.log('✦ Util:', util.address);

      const engineModules = await deployProxy<EngineModules>('EngineModules', player1, hre, [], { Util: util.address });
      console.log('✦ EngineModules:', engineModules.address);

      // Deploy diamond and facets
      const diamondAddr = await deployDiamond(hre, [worldConstants, TROOP_TYPES]);
      const facets = [
        { name: 'EngineFacet', libraries: { Util: util.address, EngineModules: engineModules.address } },
        { name: 'GetterFacet', libraries: { Util: util.address } },
        { name: 'HelperFacet', libraries: { Util: util.address, EngineModules: engineModules.address } },
      ];
      await deployFacets(hre, diamondAddr, facets, player1);
      const diamond = await getDiamond(hre, diamondAddr);
      printDivider();

      // Register components
      const time0 = performance.now();
      await (await diamond.registerDefaultComponents(diamond.address)).wait();
      const time1 = performance.now();
      console.log(`✦ component registration took ${Math.floor(time1 - time0)} ms`);

      // Initialize map
      const encodedTileMap = encodeTileMap(tileMap, 6, 50);
      await (await diamond.storeEncodedColumnBatches(encodedTileMap)).wait();
      const time2 = performance.now();
      console.log(`✦ lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(time2 - time1)} ms`);

      const baseTiles = [...portTiles, ...cityTiles, ...oilWellTiles];
      for (let i = 0; i < baseTiles.length; i += 20) {
        await (await diamond.bulkInitializeTiles(baseTiles.slice(i, i + 20))).wait();
      }
      const time3 = performance.now();
      console.log(`✦ initializing ${baseTiles.length} bases took ${Math.floor(time3 - time2)} ms`);

      // Randomly initialize players if on localhost
      if (isDev) {
        let x: number;
        let y: number;

        if (fixMap && mapName === 'testingMap') {
          const player1Pos = { x: 2, y: 4 };
          const player2Pos = { x: 4, y: 2 };
          const abiCoder = new ethers.utils.AbiCoder();

          let ecsTime = performance.now();

          // Initialize a troop template (destroyer)
          const destroyerTemplateId = 1;
          await (await diamond.addEntity()).wait();
          await (await diamond.setComponentValue('IsActive', destroyerTemplateId, abiCoder.encode(['bool'], [true]))).wait();
          await (await diamond.setComponentValue('CanMove', destroyerTemplateId, abiCoder.encode(['bool'], [true]))).wait();
          await (await diamond.setComponentValue('CanAttack', destroyerTemplateId, abiCoder.encode(['bool'], [true]))).wait();
          await (await diamond.setComponentValue('Name', destroyerTemplateId, abiCoder.encode(['string'], ['Destroyer']))).wait();
          await (await diamond.setComponentValue('MaxHealth', destroyerTemplateId, abiCoder.encode(['uint256'], [3]))).wait();
          await (await diamond.setComponentValue('DamagePerHit', destroyerTemplateId, abiCoder.encode(['uint256'], [1]))).wait();
          await (await diamond.setComponentValue('AttackFactor', destroyerTemplateId, abiCoder.encode(['uint256'], [100]))).wait();
          await (await diamond.setComponentValue('DefenseFactor', destroyerTemplateId, abiCoder.encode(['uint256'], [100]))).wait();
          await (await diamond.setComponentValue('MovementCooldown', destroyerTemplateId, abiCoder.encode(['uint256'], [1]))).wait();
          await (await diamond.setComponentValue('LargeActionCooldown', destroyerTemplateId, abiCoder.encode(['uint256'], [1]))).wait();
          await (await diamond.setComponentValue('Gold', destroyerTemplateId, abiCoder.encode(['uint256'], [19]))).wait();
          await (await diamond.setComponentValue('OilPerSecond', destroyerTemplateId, abiCoder.encode(['uint256'], [1]))).wait();
          console.log(`✦ troop template created after ${performance.now() - ecsTime} ms`);
          ecsTime = performance.now();

          // Initialize players
          await (await diamond.connect(player1).initializePlayer(player1Pos, 'Alice')).wait();
          await (await diamond.connect(player2).initializePlayer(player2Pos, 'Bob')).wait();
          console.log(`✦ players initialized after ${performance.now() - ecsTime} ms`);
          ecsTime = performance.now();

          // Purchase a destroyer for player1
          await (await diamond.connect(player1).purchaseTroop(player1Pos, destroyerTemplateId)).wait();
          console.log(`✦ destroyer purchased after ${performance.now() - ecsTime} ms`);
          ecsTime = performance.now();
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
          } while (tileMap[x][y] != TILE_TYPE.PORT);

          do {
            x = Math.floor(Math.random() * mapWidth);
            y = Math.floor(Math.random() * mapHeight);
            player2Pos = { x, y };
          } while (tileMap[x][y] !== TILE_TYPE.PORT || player2Pos.x === player1Pos.x || player2Pos.y === player1Pos.y);

          // Give each player a port to start with
          await (await diamond.connect(player1).initializePlayer(player1Pos, 'Eve')).wait();
          await (await diamond.connect(player2).initializePlayer(player2Pos, 'Felix')).wait();
        }
      }

      // Generate config files
      const configFile: GameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: ` ${mapName ? `${mapName}-` : ''} ${isRelease ? 'release-' : ''}${hre.network.name}-${Date.now()}`,
        map: tileMap,
        // componentNames: COMPONENT_NAMES,
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
