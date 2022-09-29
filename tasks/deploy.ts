import { GameLib } from './../typechain-types/libraries/GameLib';
import { ECSLib } from './../typechain-types/libraries/ECSLib';
import { publishDeployment, isConnectionLive } from './../api/deployment';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, HardhatArguments } from 'hardhat/types';
import { deployProxy, printDivider } from './util/deployHelper';
import { createTemplates, generateWorldConstants, SMALL_MAP_INPUT } from './util/constants';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { chooseRandomEmptyLandPosition, encodeTileMap, generateBlankFixmap, generateMap, initializeFixmap } from './util/mapHelper';
import { GameConfig } from '../api/types';
import { COMPONENT_SPECS } from 'curio-vault';

/**
 * Deploy script for publishing games
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

      await isConnectionLive();

      // Set up deployer and some local variables
      let [player1, player2] = await hre.ethers.getSigners();
      console.log('✦ player1 address is:', player1.address);

      const worldConstants = generateWorldConstants(player1.address, SMALL_MAP_INPUT);

      const tileMap = fixmap ? generateBlankFixmap() : generateMap(SMALL_MAP_INPUT.width, SMALL_MAP_INPUT.height);

      const ecsLib = await deployProxy<ECSLib>('ECSLib', player1, hre, []);
      const gameLib = await deployProxy<GameLib>('GameLib', player1, hre, [], { ECSLib: ecsLib.address });
      const templates = await deployProxy<GameLib>('Templates', player1, hre, [], { GameLib: gameLib.address, ECSLib: ecsLib.address });

      const diamondAddr = await deployDiamond(hre, [worldConstants]);
      const diamond = await getDiamond(hre, diamondAddr);

      const facets = [
        { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
        { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address } },
        { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address } },
      ];
      await deployFacets(hre, diamondAddr, facets, player1);

      printDivider();

      // Register components
      let startTime = performance.now();
      await (await diamond.registerComponents(diamond.address, COMPONENT_SPECS)).wait();
      console.log(`✦ component registration took ${Math.floor(performance.now() - startTime)} ms`);

      // Initialize map
      startTime = performance.now();
      const encodedTileMap = encodeTileMap(tileMap, worldConstants.numInitTerrainTypes, worldConstants.initBatchSize);
      await (await diamond.storeEncodedColumnBatches(encodedTileMap)).wait();
      console.log(`✦ lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(performance.now() - startTime)} ms`);

      // Create templates
      startTime = performance.now();
      await createTemplates(diamond);
      console.log(`✦ template creation took ${Math.floor(performance.now() - startTime)} ms`);

      if (fixmap) {
        await initializeFixmap(hre, diamond);
      } else {
        // Randomly initialize players if on localhost
        if (isDev) {
          const player1Pos = chooseRandomEmptyLandPosition(tileMap);
          const player2Pos = chooseRandomEmptyLandPosition(tileMap);

          startTime = performance.now();
          await (await diamond.connect(player1).initializePlayer(player1Pos, 'Alice', { gasLimit: 100_000_000 })).wait();
          await (await diamond.connect(player2).initializePlayer(player2Pos, 'Bob', { gasLimit: 100_000_000 })).wait();
          console.log(`✦ player initialization took ${Math.floor(performance.now() - startTime)} ms`);
        }
      }

      // Generate config files
      const configFile: GameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: `deployer=${process.env.DEPLOYER_ID}-${release && 'release-'}${hre.network.name}-${Date.now()}`,
        map: tileMap,
        time: new Date(),
      };

      await publishDeployment(configFile);

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
