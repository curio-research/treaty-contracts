import { publishDeployment, addTask } from './../api/deployment';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { Util } from './../typechain-types/Util';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy, printDivider } from './util/deployHelper';
import { TROOP_TYPES, getTroopTypeIndexByName, RENDER_CONSTANTS, NUM_CITIES, NUM_PORTS, WORLD_HEIGHT, WORLD_WIDTH, generateWorldConstants, ligmap } from './util/constants';
import { position } from '../util/types/common';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { MapInput, TILE_TYPE, TROOP_NAME } from './util/types';
import { encodeTileMap, generateGameMaps } from './util/mapHelper';
import { gameConfig } from '../api/types';

// ---------------------------------
// deploy script
// npx hardhat deploy --network NETWORK_NAME_HERE
// ---------------------------------

task('deploy', 'deploy contracts')
  .addFlag('noport', "Don't port files to frontend") // default is to call port
  .addFlag('publish', 'Publish deployment to game launcher') // default is to call publish
  .addFlag('fixmap', 'Use deterministic map') // default is non-deterministic maps
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');
      printDivider();

      const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat';
      console.log('Network:', hre.network.name);

      const fixMap = args.fixmap;
      if (fixMap) console.log('Using deterministic map');

      let [player1, player2] = await hre.ethers.getSigners();
      const armyTroopTypeId = getTroopTypeIndexByName(TROOP_TYPES, TROOP_NAME.ARMY) + 1;
      const troopTransportTroopTypeId = getTroopTypeIndexByName(TROOP_TYPES, TROOP_NAME.TROOP_TRANSPORT) + 1;
      const destroyerTroopTypeId = getTroopTypeIndexByName(TROOP_TYPES, TROOP_NAME.DESTROYER) + 1;

      // Set up game configs
      const worldConstants = generateWorldConstants(player1.address);

      let deployMap: TILE_TYPE[][];
      const { tileMap, portTiles, cityTiles } = generateGameMaps(
        {
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          numPorts: NUM_PORTS,
          numCities: NUM_CITIES,
        } as MapInput,
        RENDER_CONSTANTS
      );

      if (fixMap) {
        deployMap = ligmap;
      } else {
        deployMap = tileMap;
      }

      // Deploy util contracts
      const util = await deployProxy<Util>('Util', player1, hre, []);
      // const marchHelper = await deployProxy<MarchHelper>('MarchHelper', player1, hre, []);
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
      // console.log(`✦ direct set ${WORLD_WIDTH}x${WORLD_HEIGHT} map took ${time2 - time1} milliseconds`);
      const encodedTileMap = encodeTileMap(tileMap);
      await (await diamond.storeEncodedRawMapCols(encodedTileMap)).wait();
      const time2 = performance.now();
      console.log(`✦ lazy set ${WORLD_WIDTH}x${WORLD_HEIGHT} map took ${time2 - time1} milliseconds`);

      const portTilePositions = portTiles.map((portTile) => ({ x: portTile[0], y: portTile[1] }));
      const cityTilePositions = cityTiles.map((cityTile) => ({ x: cityTile[0], y: cityTile[1] }));

      // initialize bases
      await await diamond.bulkInitializeTiles([...portTilePositions, ...cityTilePositions]);

      if (isDev) {
        // Randomly initialize players only if we're on localhost
        console.log('✦ initializing players');
        let x: number;
        let y: number;

        if (fixMap) {
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

          // spawn testing troops
          await (await diamond.connect(player1).spawnTroop(player1ArmyPos, player1.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player1ArmyPos2, player1.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player1ArmyPos3, player1.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player2ArmyPos, player2.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player2ArmyPos2, player2.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player2ArmyPos3, player2.address, armyTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player1TroopTransportPos, player1.address, troopTransportTroopTypeId)).wait();
          await (await diamond.connect(player1).spawnTroop(player2DestroyerPos, player2.address, destroyerTroopTypeId)).wait();
        } else {
          let player1Pos: position;
          let player2Pos: position;
          do {
            x = Math.floor(Math.random() * WORLD_WIDTH);
            y = Math.floor(Math.random() * WORLD_HEIGHT);
            player1Pos = { x, y };
          } while (deployMap[x][y] != TILE_TYPE.PORT);

          do {
            x = Math.floor(Math.random() * WORLD_WIDTH);
            y = Math.floor(Math.random() * WORLD_HEIGHT);
            player2Pos = { x, y };
          } while (deployMap[x][y] !== TILE_TYPE.PORT || player2Pos.x === player1Pos.x || player2Pos.y === player1Pos.y);

          // Give each player a port and an army to start with
          let tx = await diamond.connect(player1).initializePlayer(player1Pos, player1.address);
          await tx.wait();
          tx = await diamond.connect(player1).initializePlayer(player2Pos, player2.address);
          await tx.wait();
        }
      }

      // ---------------------------------
      // generate config files
      // copies files and ports to frontend if it's a localhost, or publishes globally if its a global deployment
      // ---------------------------------

      const configFile: gameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: `${hre.network.name}-${Date.now()}`,
        map: deployMap,
      };

      const publish = args.publish;

      // publish deployment
      if (publish || !isDev) {
        await publishDeployment(configFile);
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

      // // start the epoch increaser
      // const task = { type: 'interval', time: 0, interval: Number(1) + 1, functionSig: 'updateEpoch', network: hre.network.name, address: diamond.address, params: [], status: 'inactive', lastExecuted: 0 };
      // await addTask(task);
    } catch (err) {
      console.log(err);
    }
  });
