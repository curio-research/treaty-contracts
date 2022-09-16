import { GameLib } from './../typechain-types/contracts/libraries/GameLib';
import { ECSLib } from './../typechain-types/contracts/libraries/ECSLib';
import { publishDeployment, isConnectionLive } from './../api/deployment';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy, printDivider } from './util/deployHelper';
import { addTemplates, generateWorldConstants, SMALL_MAP_INPUT } from './util/constants';
import { position } from '../util/types/common';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { encodeTileMap } from './util/mapHelper';
import { GameConfig } from '../api/types';
import { COMPONENT_SPECS, TILE_TYPE } from 'curio-vault';

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
      const isDev: boolean = hre.network.name === 'localhost' || hre.network.name === 'hardhat' || hre.network.name === 'constellation' || hre.network.name === 'altlayer';

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
      let startTime = performance.now();
      await (await diamond.registerComponents(diamond.address, COMPONENT_SPECS)).wait();
      console.log(`✦ component registration took ${Math.floor(performance.now() - startTime)} ms`);

      // Initialize map
      startTime = performance.now();
      const encodedTileMap = encodeTileMap(tileMap, 6, 50);
      await (await diamond.storeEncodedColumnBatches(encodedTileMap)).wait();
      console.log(`✦ lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(performance.now() - startTime)} ms`);

      // Initialize templates
      startTime = performance.now();
      await addTemplates(diamond);
      console.log(`✦ template initialization took ${Math.floor(performance.now() - startTime)} ms`);

      // Randomly initialize players if on localhost
      if (isDev) {
        const mapWidth = tileMap.length;
        const mapHeight = tileMap[0].length;
        const player1Pos: position = { x: Math.floor(Math.random() * mapWidth), y: Math.floor(Math.random() * mapHeight) };

        let player2Pos: position;
        do {
          player2Pos = { x: Math.floor(Math.random() * mapWidth), y: Math.floor(Math.random() * mapHeight) };
        } while (player2Pos.x === player1Pos.x || player2Pos.y === player1Pos.y);

        startTime = performance.now();
        await (await diamond.connect(player1).initializePlayer(player1Pos, 'Alice')).wait();
        await (await diamond.connect(player2).initializePlayer(player2Pos, 'Bob')).wait();
        console.log(`✦ player initialization took ${Math.floor(performance.now() - startTime)} ms`);
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
      }
      await publishDeployment(configFile);
    } catch (err: any) {
      console.log(err.message);
    }
  });
