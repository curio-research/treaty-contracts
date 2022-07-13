import { publishDeployment, isConnectionLive } from './../api/deployment';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { Util } from './../typechain-types/Util';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy, loadLocalMap, LOCAL_MAP_PREFIX, printDivider, saveMapToLocal } from './util/deployHelper';
import { TROOP_TYPES, getTroopTypeIndexByName, RENDER_CONSTANTS, NUM_CITIES, NUM_PORTS, WORLD_HEIGHT, WORLD_WIDTH, generateWorldConstants } from './util/constants';
import { position } from '../util/types/common';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { MapInput, Position, TILE_TYPE, TROOP_NAME } from './util/types';
import { encodeTileMap, generateGameMaps } from './util/mapHelper';
import { GameConfig } from '../api/types';
import { MEDITERRAINEAN_MAP, ligmapTileOutput } from './util/mapLibrary';

// ---------------------------------
// deploy script
// npx hardhat deploy --network NETWORK_NAME_HERE
// ---------------------------------

/**
 * Deploy game instance and port configs to frontend.
 *
 * Examples:
 * `npx hardhat deploy --savemap`: deploy on localhost and save map to local
 * `npx hardhat deploy --network OptimismKovan --fixmap --name MAP-0`: deploy on Optimism Kovan and use the first saved random map
 * `npx hardhat deploy --noport --fixmap --name MEDITERRAINEAN`: deploy on localhost, use the hardcoded Mediterrainean map, and do not port files to frontend
 */
task('deploy', 'deploy contracts')
  .addFlag('noport', "Don't port files to frontend") // default is to call port
  .addFlag('publish', 'Publish deployment to game launcher') // default is to call publish
  .addFlag('fixmap', 'Use deterministic map') // default is non-deterministic maps; deterministic maps are mainly used for client development
  .addOptionalParam('name', 'Name of fixed map', 'Hello, World!')
  .addFlag('savemap', 'Save map to local') // default is not to save
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      // Compile contracts
      await hre.run('compile');
      printDivider();

      // Read variables from run flags
      const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat';
      console.log('Network:', hre.network.name);
      const fixMap = args.fixmap;
      if (fixMap) console.log('Using deterministic map');
      const publish = args.publish;
      let mapName = args.name;
      const saveMap = args.savemap;

      // Check connection with faucet to make sure deployment will post
      if (!isDev) {
        await isConnectionLive();
      }

      // Set up deployer and some local variables
      let [player1, player2] = await hre.ethers.getSigners();
      const armyTroopTypeId = getTroopTypeIndexByName(TROOP_TYPES, TROOP_NAME.ARMY) + 1;
      const troopTransportTroopTypeId = getTroopTypeIndexByName(TROOP_TYPES, TROOP_NAME.TROOP_TRANSPORT) + 1;
      const destroyerTroopTypeId = getTroopTypeIndexByName(TROOP_TYPES, TROOP_NAME.DESTROYER) + 1;

      // Set up game configs and map
      const worldConstants = generateWorldConstants(player1.address);

      let tileMap: TILE_TYPE[][];
      let portTiles: Position[];
      let cityTiles: Position[];

      if (fixMap) {
        if (mapName === 'MEDITERRAINEAN') {
          // hardcoded map: Mediterrainean 42x18
          tileMap = MEDITERRAINEAN_MAP.tileMap;
          portTiles = MEDITERRAINEAN_MAP.portTiles;
          cityTiles = MEDITERRAINEAN_MAP.cityTiles;
        } else if (mapName.length > LOCAL_MAP_PREFIX.length && mapName.substring(0, LOCAL_MAP_PREFIX.length) === LOCAL_MAP_PREFIX) {
          // saved maps from random generation
          const index = Number(mapName.substring(LOCAL_MAP_PREFIX.length, mapName.length));
          const tileMapOutput = loadLocalMap(index);
          tileMap = tileMapOutput.tileMap;
          portTiles = tileMapOutput.portTiles;
          cityTiles = tileMapOutput.cityTiles;
        } else {
          // default: ligmap 10x10
          mapName = 'LIGMAP';
          tileMap = ligmapTileOutput.tileMap;
          portTiles = ligmapTileOutput.portTiles;
          cityTiles = ligmapTileOutput.cityTiles;
        }
      } else {
        const gameMapOutput = generateGameMaps(
          {
            width: WORLD_WIDTH,
            height: WORLD_HEIGHT,
            numPorts: NUM_PORTS,
            numCities: NUM_CITIES,
          } as MapInput,
          RENDER_CONSTANTS
        );
        tileMap = gameMapOutput.tileMap;
        portTiles = gameMapOutput.portTiles;
        cityTiles = gameMapOutput.cityTiles;
      }

      if (saveMap) saveMapToLocal({ tileMap, portTiles, cityTiles });

      // Deploy util contracts
      const util = await deployProxy<Util>('Util', player1, hre, []);
      console.log('✦ Util:', util.address);

      // Deploy diamond and facets
      const diamondAddr = await deployDiamond(hre, [worldConstants, TROOP_TYPES]);
      const facets = [
        { name: 'EngineFacet', libraries: { Util: util.address } },
        { name: 'GetterFacet', libraries: { Util: util.address } },
        { name: 'HelperFacet', libraries: { Util: util.address } },
      ];
      await deployFacets(hre, diamondAddr, facets, player1);
      const diamond = await getDiamond(hre, diamondAddr);
      printDivider();

      // Initialize map
      console.log('✦ initializing map');
      const time1 = performance.now();
      const encodedTileMap = encodeTileMap(tileMap);
      await (await diamond.storeEncodedColumnBatches(encodedTileMap)).wait();
      const time2 = performance.now();
      console.log(`✦ lazy setting ${tileMap.length}x${tileMap[0].length} map took ${time2 - time1} ms`);

      console.log('✦ initializing bases');
      const baseTiles = [...portTiles, ...cityTiles];
      for (let i = 0; i < baseTiles.length; i += 100) {
        await (await diamond.bulkInitializeTiles(baseTiles.slice(i, i + 100))).wait();
      }
      const time3 = performance.now();
      console.log(`✦ initializing ${baseTiles.length} bases took ${time3 - time2} ms`);

      // Randomly initialize players if on localhost
      if (isDev) {
        console.log('✦ initializing players');
        let x: number;
        let y: number;

        if (fixMap && mapName === 'LIGMAP') {
          // Primary setting for client development
          const player1Pos = { x: 2, y: 4 };
          const player2Pos = { x: 4, y: 2 };
          const player1ArmyPos = { x: 3, y: 3 };
          const player1ArmyPos2 = { x: 2, y: 3 };
          const player1ArmyPos3 = { x: 1, y: 3 };
          const player2ArmyPos = { x: 3, y: 2 };
          const player2ArmyPos2 = { x: 2, y: 2 };
          const player2ArmyPos3 = { x: 1, y: 2 };
          const player1TroopTransportPos = { x: 5, y: 3 };
          const player2DestroyerPos = { x: 5, y: 4 };

          await (await diamond.connect(player1).initializePlayer(player1Pos, player1.address)).wait();
          await (await diamond.connect(player1).initializePlayer(player2Pos, player2.address)).wait();
          await (await diamond.connect(player1).spawnTroop(player1ArmyPos, player1.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player1ArmyPos2, player1.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player1ArmyPos3, player1.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player2ArmyPos, player2.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player2ArmyPos2, player2.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player2ArmyPos3, player2.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player1TroopTransportPos, player1.address, troopTransportTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player2DestroyerPos, player2.address, destroyerTroopTypeId)).wait();
        } else {
          // Primary setting for local playtesting
          let player1Pos: position;
          let player2Pos: position;
          do {
            x = Math.floor(Math.random() * WORLD_WIDTH);
            y = Math.floor(Math.random() * WORLD_HEIGHT);
            player1Pos = { x, y };
          } while (tileMap[x][y] != TILE_TYPE.PORT);

          do {
            x = Math.floor(Math.random() * WORLD_WIDTH);
            y = Math.floor(Math.random() * WORLD_HEIGHT);
            player2Pos = { x, y };
          } while (tileMap[x][y] !== TILE_TYPE.PORT || player2Pos.x === player1Pos.x || player2Pos.y === player1Pos.y);

          // Give each player a port to start with
          await (await diamond.connect(player1).initializePlayer(player1Pos, player1.address)).wait();
          await (await diamond.connect(player1).initializePlayer(player2Pos, player2.address)).wait();
        }
      }

      // Generate config files
      const configFile: GameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: `${hre.network.name}-${Date.now()}`,
        map: tileMap,
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
        await hre.run('port'); // default to porting files
      }

      // Publish deployment if on network
      if (publish || !isDev) {
        await publishDeployment(configFile);
      }
    } catch (err) {
      console.log(err);
    }
  });
