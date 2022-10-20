import { position } from './../util/types/common';
import chalk from 'chalk';
import { GameLib } from './../typechain-types/libraries/GameLib';
import { ECSLib } from './../typechain-types/libraries/ECSLib';
import { publishDeployment, isConnectionLive, startGameSync } from './../api/deployment';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, HardhatArguments } from 'hardhat/types';
import { confirm, deployProxy, printDivider } from './util/deployHelper';
import { CONSTANT_SPECS, createTemplates, generateWorldConstants, SMALL_MAP_INPUT, TILE_WIDTH } from './util/constants';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { chooseRandomEmptyLandPosition, encodeTileMap, generateBlankFixmap, generateMap, getPositionFromLargeTilePosition, initializeFixmap } from './util/mapHelper';
import { COMPONENT_SPECS, getRightPos, GameConfig, TILE_TYPE, Speed, encodeUint256, getTopPos, scaleMap, chainInfo } from 'curio-vault';

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
      const s = performance.now();

      const gasLimit = chainInfo[hre.network.name].gasLimit;

      const { port, release, fixmap } = args;

      // Read variables from run flags
      const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat' || hre.network.name === 'constellation' || hre.network.name === 'altlayer';
      console.log('Network:', hre.network.name);

      if (fixmap) console.log('Using deterministic map');

      await isConnectionLive();

      // Set up deployer and some local variables
      let [player1, player2, player3] = await hre.ethers.getSigners();
      console.log('✦ player1 address is:', player1.address);

      const worldConstants = generateWorldConstants(player1.address, SMALL_MAP_INPUT);

      const tileMap = fixmap ? generateBlankFixmap() : generateMap(SMALL_MAP_INPUT.width, SMALL_MAP_INPUT.height, worldConstants);

      const ecsLib = await deployProxy<ECSLib>('ECSLib', player1, hre, []);

      const gameLib = await deployProxy<GameLib>('GameLib', player1, hre, [], { ECSLib: ecsLib.address });
      const templates = await deployProxy<any>('Templates', player1, hre, [], { ECSLib: ecsLib.address });

      const diamondAddr = await deployDiamond(hre, [worldConstants]);
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
        console.log(`Registering components ${i} to ${i + componentUploadBatchSize}`);
        await confirm(await diamond.registerComponents(diamond.address, COMPONENT_SPECS.slice(i, i + componentUploadBatchSize)), hre);
      }

      console.log(`✦ component registration took ${Math.floor(performance.now() - startTime)} ms`);

      // Register constants
      startTime = performance.now();
      const constantUploadBatchSize = 10;
      for (let i = 0; i < CONSTANT_SPECS.length; i += constantUploadBatchSize) {
        console.log(`  ✦ Registering constants ${i} to ${i + constantUploadBatchSize}`);
        await confirm(await diamond.bulkAddConstants(CONSTANT_SPECS.slice(i, i + constantUploadBatchSize), { gasLimit: gasLimit }), hre);
      }
      console.log(chalk.bgRed.white(` constant registration took ${Math.floor(performance.now() - constantUploadBatchSize) / 1000}s `));

      // console.log(`✦ constant registration took ${Math.floor(performance.now() - startTime)} ms`);

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

      // initialize tiles that include barbarians, farms, gold mine
      const bulkTileUploadSize = 20;
      for (let i = 0; i < harvestableLocations.length; i += bulkTileUploadSize) {
        console.log(`Initializing harvestable tiles ${i} to ${i + bulkTileUploadSize}`);
        await confirm(await diamond.bulkInitializeTiles(harvestableLocations.slice(i, i + bulkTileUploadSize), { gasLimit: gasLimit }), hre);
      }

      // TODO: think about whether initializing all tiles / more than barbarian tiles is necessary

      if (fixmap) {
        await initializeFixmap(hre, diamond);
      } else {
        // Randomly initialize players if on localhost
        if (isDev) {
          // this is coordinate position
          const player1Pos = chooseRandomEmptyLandPosition(scaleMap(tileMap, TILE_WIDTH));
          const player2Pos = getRightPos(getRightPos(player1Pos));
          const player3Pos = getTopPos(getTopPos(player1Pos));

          startTime = performance.now();
          await confirm(await diamond.connect(player1).initializePlayer(player1Pos, 'Alice', { gasLimit: gasLimit }), hre);
          await confirm(await diamond.connect(player2).initializePlayer(player2Pos, 'Bob', { gasLimit: gasLimit }), hre);
          await confirm(await diamond.connect(player3).initializePlayer(player3Pos, 'Bob', { gasLimit: gasLimit }), hre);
          console.log(`✦ player initialization took ${Math.floor(performance.now() - startTime)} ms`);

          // const player1ID = (await diamond.getPlayerId(player1.address)).toNumber();
          // const player2ID = (await diamond.getPlayerId(player2.address)).toNumber();

          // let armySpawnPos = { x: -1, y: -1 };
          // for (let i = 0; i < worldConstants.worldWidth; i++) {
          //   for (let j = 0; j < worldConstants.worldHeight; j++) {
          //     if (tileMap[i][j] === TILE_TYPE.GOLDMINE_LV1 || tileMap[i][j] === TILE_TYPE.GOLDMINE_LV2 || tileMap[i][j] === TILE_TYPE.GOLDMINE_LV3) {
          //       armySpawnPos = { x: i, y: j };
          //     }
          //   }
          // }

          // armySpawnPos = getPositionFromLargeTilePosition(armySpawnPos, TILE_WIDTH);

          // // add an army on a gold mine (easy for testing gather resource)
          // await diamond.initializeTile(armySpawnPos);
          // await diamond.createArmy(player1ID, armySpawnPos);
          // let entity = (await diamond.getEntity()).toNumber();
          // await confirm (await diamond.setComponentValue(Speed, entity, encodeUint256(2)), hre);

          // await diamond.initializeTile(getTopPos(armySpawnPos));
          // await diamond.createArmy(player2ID, getTopPos(armySpawnPos));
          // entity = (await diamond.getEntity()).toNumber();
          // await confirm (await diamond.setComponentValue(Speed, entity, encodeUint256(2)), hre);
        }
      }

      const deploymentId = `deployer=${process.env.DEPLOYER_ID}-${release && 'release-'}${hre.network.name}-${Date.now()}`;

      // Generate config files
      const configFile: GameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: deploymentId,
        map: scaleMap(tileMap, Number(worldConstants.tileWidth)),
        time: new Date(),
      };

      await publishDeployment(configFile);

      if (port === undefined || port.toLowerCase() === 'true') {
        hre.run('port'); // if no port flag present, assume always port to Vault
      }

      if (isDev || hre.network.name === 'tailscale') {
        await hre.ethers.provider.send('evm_setNextBlockTimestamp', [Math.floor(new Date().getTime() / 1000)]);
        await hre.ethers.provider.send('evm_mine', []); // syncs the blockchain time to current unix time
      }

      // TODO: for now, only sync in dev mode
      if (isDev) {
        // sync game state with middleware
        await startGameSync(deploymentId);
      }

      console.log(chalk.bgRed.white(` Deployed in ${Math.floor(performance.now() - s) / 1000}s `));
      console.log(chalk.bgGreen.black(' Curio Game Deployed '));
    } catch (err: any) {
      console.log(err.message);
    }
  });

interface DeployArgs extends HardhatArguments {
  fixmap: boolean;
  release: boolean;
  port: string | undefined;
}
