import { GameLib } from './../typechain-types/contracts/libraries/GameLib';
import { ECSLib } from './../typechain-types/contracts/libraries/ECSLib';
import { publishDeployment, isConnectionLive } from './../api/deployment';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, HardhatArguments } from 'hardhat/types';
import { deployProxy, printDivider } from './util/deployHelper';
import { createTemplates, generateWorldConstants, SMALL_MAP_INPUT } from './util/constants';
import { position } from '../util/types/common';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { encodeTileMap } from './util/mapHelper';
import { GameConfig } from '../api/types';
import { COMPONENT_SPECS, TILE_TYPE } from 'curio-vault';

/**
 * Deploy game instance and port configs to frontend.
 *
 * Examples:
 * `npx hardhat deploy`: deploys game on localhost
 * `npx hardhat deploy --network constellationNew`: deploy game on constellationNew network
 */

task('deploy', 'deploy contracts')
  .addOptionalParam('port', 'Port contract abis and game info to Vault') // default is to call port
  .addFlag('release', 'Publish deployment to official release') // default is to call publish
  .addFlag('fixmap', 'Use deterministic map') // default is non-deterministic maps; deterministic maps are mainly used for client development
  .setAction(async (args: DeployArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');
      printDivider();

      const { port, release, fixmap } = args;

      // Read variables from run flags
      const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat' || hre.network.name === 'constellation' || hre.network.name === 'altlayer';
      console.log('Network:', hre.network.name);

      if (fixmap) console.log('Using deterministic map');

      // Check connection with faucet to make sure deployment will post
      await isConnectionLive();

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
      for (let i = 0; i < COMPONENT_SPECS.length; i++) {
        await (await diamond.registerComponents(diamond.address, [COMPONENT_SPECS[i]])).wait();
      }

      // Initialize map
      startTime = performance.now();
      const encodedTileMap = encodeTileMap(tileMap, 6, 50);
      await (await diamond.storeEncodedColumnBatches(encodedTileMap)).wait();
      console.log(`✦ lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(performance.now() - startTime)} ms`);

      // Create templates
      startTime = performance.now();
      await createTemplates(diamond);
      console.log(`✦ template creation took ${Math.floor(performance.now() - startTime)} ms`);

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
        await (await diamond.connect(player1).initializePlayer(player1Pos, 'Alice', { gasLimit: 15_000_000 })).wait();
        await (await diamond.connect(player2).initializePlayer(player2Pos, 'Bob', { gasLimit: 15_000_000 })).wait();
        console.log(`✦ player initialization took ${Math.floor(performance.now() - startTime)} ms`);
      }

      // Generate config files
      const configFile: GameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: `deployer=${process.env.DEPLOYER_ID}-${release && 'release-'}${hre.network.name}-${Date.now()}`,
        map: tileMap,
        time: new Date(),
      };

      await publishDeployment(configFile); // publish deployment

      if (port === undefined || port.toLowerCase() === 'true') {
        hre.run('port'); // if no port flag present, assume always port to Vault
      }
    } catch (err: any) {
      console.log(err.message);
    }
  });

interface DeployArgs extends HardhatArguments {
  fixmap: boolean;
  release: boolean;
  port: string | undefined;
}
