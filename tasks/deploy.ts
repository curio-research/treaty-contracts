import { GameLib } from './../typechain-types/contracts/libraries/GameLib';
import { ECSLib } from './../typechain-types/contracts/libraries/ECSLib';
import chalk from 'chalk';
import { publishDeployment, isConnectionLive, startGameSync } from './../api/deployment';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, HardhatArguments } from 'hardhat/types';
import { confirm, deployProxy, printDivider, indexerUrlSelector } from './util/deployHelper';
import { createTemplates, generateWorldConstants, SMALL_MAP_INPUT } from './util/constants';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { encodeTileMap, generateBlankFixmap, generateMap, initializeFixmap } from './util/mapHelper';
import { COMPONENT_SPECS, GameConfig, TILE_TYPE, position, scaleMap, chainInfo } from 'curio-vault';
import gameConstants from '../game_parameters.json';

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
  .addFlag('indexer', 'Use production indexer') //
  .setAction(async (args: DeployArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');
      printDivider();
      const s = performance.now();

      const gasLimit = chainInfo[hre.network.name].gasLimit;

      const { port, release, fixmap, indexer } = args;

      // Read variables from run flags
      const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat' || hre.network.name === 'constellation' || hre.network.name === 'altlayer' || hre.network.name === 'tailscale';
      console.log('Network:', hre.network.name);

      if (fixmap) console.log('Using deterministic map');

      await isConnectionLive();

      // Set up deployer and some local variables
      let [player1] = await hre.ethers.getSigners();
      console.log('✦ player1 address is:', player1.address);

      const worldConstants = generateWorldConstants(player1.address, SMALL_MAP_INPUT);

      const tileMap = fixmap ? generateBlankFixmap() : generateMap(SMALL_MAP_INPUT.width, SMALL_MAP_INPUT.height, worldConstants);

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

      // Register constants
      startTime = performance.now();
      const constantUploadBatchSize = 200;
      for (let i = 0; i < gameConstants.length; i += constantUploadBatchSize) {
        console.log(chalk.dim(`✦ registering constants ${i} to ${i + constantUploadBatchSize}`));
        const identifiers = gameConstants.map((c) => c.subject + '-' + c.object + '-' + c.componentName + '-' + c.functionName + '-' + Math.trunc(c.level).toString());
        const values = gameConstants.map((c) => Math.trunc(c.value));
        await confirm(await diamond.bulkAddConstants(identifiers, values, { gasLimit: gasLimit }), hre);
      }
      console.log(`✦ constant registration took ${Math.floor(performance.now() - startTime)} ms`);

      // Initialize map
      startTime = performance.now();
      const encodedTileMap = encodeTileMap(tileMap, worldConstants.numInitTerrainTypes, worldConstants.initBatchSize);
      await confirm(await diamond.storeEncodedColumnBatches(encodedTileMap), hre);
      console.log(`✦ lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(performance.now() - startTime)} ms`);

      // Create templates
      startTime = performance.now();
      await createTemplates(diamond, hre);
      console.log(`✦ template creation took ${Math.floor(performance.now() - startTime)} ms`);

      // TODO: useful in some testing. Bulk initialize all tiles
      const tileWidth = Number(worldConstants.tileWidth);
      const allStartingPositions: position[] = [];
      const harvestableLocations: position[] = [];
      for (let i = 0; i < tileMap.length; i++) {
        for (let j = 0; j < tileMap[0].length; j++) {
          const properTile = { x: i * tileWidth, y: j * tileWidth };
          allStartingPositions.push(properTile);
          if (tileMap[i][j] === TILE_TYPE.BARBARIAN_LV1 || tileMap[i][j] === TILE_TYPE.BARBARIAN_LV2 || tileMap[i][j] === TILE_TYPE.GOLDMINE_LV1 || tileMap[i][j] === TILE_TYPE.FARM_LV1) {
            harvestableLocations.push(properTile);
          }
        }
      }

      // TODO: think about whether initializing all tiles / more than barbarian tiles is necessary
      // initialize tiles that include barbarians, farms, gold mine
      const bulkTileUploadSize = 20;
      for (let i = 0; i < harvestableLocations.length; i += bulkTileUploadSize) {
        console.log(`✦ initializing harvestable tiles ${i} to ${i + bulkTileUploadSize}`);
        await confirm(await diamond.bulkInitializeTiles(harvestableLocations.slice(i, i + bulkTileUploadSize), { gasLimit: gasLimit }), hre);
      }

      if (fixmap) {
        await initializeFixmap(hre, diamond);
      }

      // Each deployment has a unique deploymentId
      const deploymentId = `deployer=${process.env.DEPLOYER_ID}-${release && 'release-'}${hre.network.name}-${Date.now()}`;

      let indexerUrl = indexerUrlSelector(hre);
      if (indexer) indexerUrl = process.env.INDEXER_URL || '';

      // Generate config file
      const configFile: GameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: deploymentId,
        indexerUrl: indexerUrl,
        map: scaleMap(tileMap, Number(worldConstants.tileWidth)),
        time: new Date(),
      };

      await publishDeployment(configFile);

      // TODO: for now, only sync game state with middleware in dev mode
      if (isDev || hre.network.name === 'constellationNew') {
        await startGameSync(configFile);
      }

      if (isDev || hre.network.name === 'tailscale') {
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
  port: string | undefined;
  indexer: boolean;
}
