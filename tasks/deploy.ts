import masterWhitelist from './util/whitelist.json';
import chalk from 'chalk';
import { publishDeployment, isConnectionLive, startGameSync } from './../api/deployment';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { printDivider, indexerUrlSelector, saveMapToLocal, initializeGame } from './util/deployHelper';
import { generateWorldConstants, MAP_INPUT } from './util/constants';
import { generateBlankFixmap, generateMap, initializeFixmap } from './util/mapHelper';
import { GameConfig, GameMode, scaleMap } from 'curio-vault';
import * as rw from 'random-words';
import { saveComponentsToJsonFiles, saveMapToJsonFile, saveWorldConstantsToJsonFile } from '../test/util/saveDataForTests';
import { DeployArgs } from './util/types';

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
  .addOptionalParam('whitelist', 'Whitelist group')
  .addOptionalParam('name', 'Deployment name')
  .setAction(async (args: DeployArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');
      printDivider();

      const s = performance.now();
      const { port, release, fixmap, indexer, name, whitelist } = args;

      // Read variables from run flags
      const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat' || hre.network.name === 'altlayer' || hre.network.name === 'tailscale';
      console.log('Network:', hre.network.name);

      if (fixmap) console.log(chalk.bgRed.black('Using deterministic map'));

      await isConnectionLive();

      // Set up deployer and some local variables
      let [player1] = await hre.ethers.getSigners();
      console.log('✦ player1 address is:', player1.address);

      // Generate world constants and tile map
      const worldConstants = generateWorldConstants(player1.address, MAP_INPUT);
      const tileMap = fixmap ? generateBlankFixmap() : generateMap(MAP_INPUT);
      if (worldConstants.gameMode === GameMode.BATTLE_ROYALE) tileMap[Math.floor(tileMap.length / 2)][Math.floor(tileMap[0].length / 2)] = 0; // set center tile to 0 if battle royale
      saveMapToLocal(tileMap);

      // Save components, world constants, and map to JSON files for Foundry testing
      await saveComponentsToJsonFiles();
      await saveWorldConstantsToJsonFile(player1.address);
      await saveMapToJsonFile(tileMap);
      console.log(`✦ Foundry data loaded`);

      // Initialize game
      const diamond = await initializeGame(hre, worldConstants, tileMap);

      // Whitelist players
      if (whitelist) {
        const whitelistPlayers = (masterWhitelist as any)[whitelist];

        for (const address of whitelistPlayers) {
          await (await diamond.addToGameWhitelist(address)).wait();
        }
      }

      if (fixmap) await initializeFixmap(hre, diamond);

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
