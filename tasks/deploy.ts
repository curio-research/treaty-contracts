import { GameLib } from './../typechain-types/contracts/libraries/GameLib';
import { ECSLib } from './../typechain-types/contracts/libraries/ECSLib';
import chalk from 'chalk';
import { publishDeployment, isConnectionLive, startGameSync } from './../api/deployment';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, HardhatArguments } from 'hardhat/types';
import { confirm, deployProxy, printDivider, indexerUrlSelector, saveMapToLocal } from './util/deployHelper';
import { createTemplates, generateWorldConstants, MAP_INPUT, TEST_MAP_INPUT } from './util/constants';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { encodeTileMap, generateBlankFixmap, generateEmptyMap, generateMap, initializeFixmap, testLoad } from './util/mapHelper';
import { COMPONENT_SPECS, GameConfig, TILE_TYPE, position, scaleMap, chainInfo, GameMode } from 'curio-vault';
import gameParameters from './game_parameters.json';
import * as rw from 'random-words';
import { saveComponentsToJsonFiles, saveMapToJsonFile, saveWorldConstantsToJsonFile } from '../test/util/saveComponents';

/**
 * Deploy script for publishing games
 *
 * Examples:
 * `yarn deploy:anvil`: starts Anvil instance + deploys a single game
 * `npx hardhat deploy`: deploys game on localhost
 * `npx hardhat deploy --network constellationNew`: deploy game on constellationNew network
 */

task('deploy', 'deploy contracts')
  .addOptionalParam('port', 'Port contract abis and game info to Vault') // default is to call port
  .addFlag('release', 'Publish deployment to official release') // default is to call publish
  .addFlag('fixmap', 'Use deterministic map') // default is non-deterministic maps; deterministic maps are mainly used for client development
  .addFlag('test', 'For load testing') // default is no
  .addFlag('indexer', 'Use production indexer') // whether to use indexer or not
  .addOptionalParam('name', 'Deployment name')
  .setAction(async (args: DeployArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');
      printDivider();
      const s = performance.now();

      const gasLimit = chainInfo[hre.network.name].gasLimit;

      const { port, release, fixmap, test, indexer, name } = args;

      // Read variables from run flags
      const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat' || hre.network.name === 'altlayer' || hre.network.name === 'tailscale';
      console.log('Network:', hre.network.name);

      if (fixmap) console.log(chalk.bgRed.black('Using deterministic map'));
      if (test) console.log(chalk.bgRed.black('######### LOAD TESTING #########'));

      await isConnectionLive();

      // Set up deployer and some local variables
      console.log('NUM SIGNERS', (await hre.ethers.getSigners()).length);
      let [player1] = await hre.ethers.getSigners();
      console.log('✦ player1 address is:', player1.address);

      const worldConstants = generateWorldConstants(player1.address);

      let tileMap;
      if (fixmap) {
        tileMap = generateBlankFixmap();
      } else if (test) {
        tileMap = generateEmptyMap(TEST_MAP_INPUT);
      } else {
        tileMap = generateMap(MAP_INPUT);
      }
      saveMapToLocal(tileMap);

      // Save components, world constants, and map to JSON files for Foundry testing
      await saveComponentsToJsonFiles();
      await saveWorldConstantsToJsonFile(player1.address);
      await saveMapToJsonFile(tileMap);
      console.log(`✦ Foundry data loaded`);

      const ecsLib = await deployProxy<ECSLib>('ECSLib', player1, hre, []);
      const gameLib = await deployProxy<GameLib>('GameLib', player1, hre, [], { ECSLib: ecsLib.address });
      const templates = await deployProxy<any>('Templates', player1, hre, [], { ECSLib: ecsLib.address });
      const diamondAddr = await deployDiamond(hre, player1, [worldConstants]);
      const diamond = await getDiamond(hre, diamondAddr);

      const facets = [
        { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
        { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address } },
        { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
      ];
      await deployFacets(hre, diamondAddr, facets, player1);

      printDivider();

      // Batch register components
      let startTime = performance.now();
      const componentUploadBatchSize = 40;
      for (let i = 0; i < COMPONENT_SPECS.length; i += componentUploadBatchSize) {
        console.log(chalk.dim(`✦ registering components ${i} to ${i + componentUploadBatchSize}`));
        await confirm(await diamond.registerComponents(diamond.address, COMPONENT_SPECS.slice(i, i + componentUploadBatchSize)), hre);
      }

      console.log(`✦ component registration took ${Math.floor(performance.now() - startTime)} ms`);

      // Add game entity
      await diamond.addGame();

      // Register game parameters
      startTime = performance.now();
      const gameParamUploadBatchSize = 200;
      for (let i = 0; i < gameParameters.length; i += gameParamUploadBatchSize) {
        console.log(chalk.dim(`✦ registering game parameters ${i} to ${i + gameParamUploadBatchSize}`));
        const identifiers = gameParameters.map((c) => c.subject + '-' + c.object + '-' + c.componentName + '-' + c.functionName + '-' + Math.trunc(c.level).toString());
        const values = gameParameters.map((c) => Math.trunc(c.value));
        await confirm(await diamond.bulkAddGameParameters(identifiers, values, { gasLimit: gasLimit }), hre);
      }
      console.log(`✦ constant registration took ${Math.floor(performance.now() - startTime)} ms`);

      // Initialize map
      startTime = performance.now();
      if (worldConstants.gameMode == GameMode.BATTLE_ROYALE) tileMap[Math.floor(tileMap.length / 2)][Math.floor(tileMap[0].length / 2)] = TILE_TYPE.LAND;
      const encodedTileMap = encodeTileMap(tileMap, worldConstants.numInitTerrainTypes, Math.floor(200 / worldConstants.numInitTerrainTypes));
      await confirm(await diamond.storeEncodedColumnBatches(encodedTileMap, { gasLimit: gasLimit }), hre);
      console.log(`✦ lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(performance.now() - startTime)} ms`);

      // Create templates
      startTime = performance.now();
      await createTemplates(diamond, hre);
      console.log(`✦ template creation took ${Math.floor(performance.now() - startTime)} ms`);

      // Bulk initialize special tiles
      const tileWidth = Number(worldConstants.tileWidth);
      const allStartingPositions: position[] = [];
      const specialTilePositions: position[] = [];
      for (let i = 0; i < tileMap.length; i++) {
        for (let j = 0; j < tileMap[0].length; j++) {
          const properTile = { x: i * tileWidth, y: j * tileWidth };
          allStartingPositions.push(properTile);
          // if (tileMap[i][j] !== TILE_TYPE.LAND) {
          specialTilePositions.push(properTile); // FIXME: restore when not load testing
          // }
        }
      }

      // TODO: think about whether initializing all tiles / more than barbarian tiles is necessary
      // initialize tiles that include barbarians, farms, gold mine
      const bulkTileUploadSize = 100;
      for (let i = 0; i < specialTilePositions.length; i += bulkTileUploadSize) {
        console.log(chalk.dim(`✦ initializing special tiles ${i} to ${i + bulkTileUploadSize}`));
        await confirm(await diamond.bulkInitializeTiles(specialTilePositions.slice(i, i + bulkTileUploadSize), { gasLimit: gasLimit }), hre);
      }

      if (fixmap) {
        await initializeFixmap(hre, diamond);
      } else if (test) {
        console.log('✦ testing load...');
        await testLoad(hre, diamond, 10, 100, 1, 'move');
      }

      // Each deployment has a unique deploymentId
      const deploymentId = `deployer=${process.env.DEPLOYER_ID}-${release && 'release-'}${hre.network.name}-${Date.now()}`;

      let indexerUrl = indexerUrlSelector(hre);
      if (indexer) indexerUrl = process.env.INDEXER_URL || '';

      // Generate config file
      const configFile: GameConfig = {
        name: name || rw.default(3).join('-'),
        address: diamond.address,
        network: hre.network.name,
        deploymentId: deploymentId,
        indexerUrl: indexerUrl,
        map: scaleMap(tileMap, Number(worldConstants.tileWidth)),
        time: new Date(),
      };

      await publishDeployment(configFile);

      // TODO: for now, only sync game state with middleware in dev mode
      if (isDev || hre.network.name === 'constellation') {
        await startGameSync(configFile);
      }

      if (isDev) {
        await hre.ethers.provider.send('evm_setNextBlockTimestamp', [Math.floor(new Date().getTime() / 1000)]);
        await hre.ethers.provider.send('evm_mine', []); // syncs the blockchain time to current unix time
      }

      if (port === undefined || port.toLowerCase() === 'true') {
        hre.run('port'); // if no port flag present, assume always port to Vault
      }

      console.log(chalk.bgGreen.black(` Curio Game deployed (${Math.floor(performance.now() - s) / 1000}s) `));
    } catch (err: any) {
      console.log(err.message);
    }
  });

interface DeployArgs extends HardhatArguments {
  fixmap: boolean;
  release: boolean;
  test: boolean;
  port: string | undefined;
  indexer: boolean;
  name: string | undefined;
}
