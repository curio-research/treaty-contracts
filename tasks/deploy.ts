import { position } from './../util/types/common';
import { utils } from 'ethers';
import chalk from 'chalk';
import { GameLib } from './../typechain-types/libraries/GameLib';
import { ECSLib } from './../typechain-types/libraries/ECSLib';
import { publishDeployment, isConnectionLive } from './../api/deployment';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, HardhatArguments } from 'hardhat/types';
import { deployProxy, printDivider } from './util/deployHelper';
import { createTemplates, generateWorldConstants, SMALL_MAP_INPUT, TILE_WIDTH } from './util/constants';
import { deployDiamond, deployFacets, getDiamond } from './util/diamondDeploy';
import { chooseRandomEmptyLandPosition, encodeTileMap, generateBlankFixmap, generateMap, getPositionFromLargeTilePosition, initializeFixmap } from './util/mapHelper';
import { COMPONENT_SPECS, getRightPos, GameConfig, TILE_TYPE, Speed, encodeUint256, getTopPos, scaleMap } from 'curio-vault';

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

      const tileMap = fixmap ? generateBlankFixmap() : generateMap(SMALL_MAP_INPUT.width, SMALL_MAP_INPUT.height, worldConstants);

      const ecsLib = await deployProxy<ECSLib>('ECSLib', player1, hre, []);

      const gameLib = await deployProxy<GameLib>('GameLib', player1, hre, [], { ECSLib: ecsLib.address });
      const templates = await deployProxy<any>('Templates', player1, hre, [], { ECSLib: ecsLib.address });

      const diamondAddr = await deployDiamond(hre, [worldConstants]);
      const diamond = await getDiamond(hre, diamondAddr);

      const facets = [
        { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
        { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address } },
        { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
      ];
      await deployFacets(hre, diamondAddr, facets, player1);

      printDivider();

      // Batch register components
      let startTime = performance.now();
      const componentUploadBatchSize = 20;
      for (let i = 0; i < COMPONENT_SPECS.length; i += componentUploadBatchSize) {
        console.log(`Registering components ${i} to ${i + componentUploadBatchSize}`);
        await (await diamond.registerComponents(diamond.address, COMPONENT_SPECS.slice(i, i + componentUploadBatchSize))).wait();
      }

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

      // TODO: useful in some testing. Bulk initialize all tiles
      // const tileWidth = Number(worldConstants.tileWidth);
      // const allStartingPositions: position[] = [];
      // for (let i = 0; i < tileMap.length; i++) {
      //   for (let j = 0; j < tileMap[0].length; j++) {
      //     const properTile = { x: i * tileWidth, y: j * tileWidth };
      //     allStartingPositions.push(properTile);
      //   }
      // }

      // initialize 10 at a time
      // const bulkTileUploadSize = 5;
      // for (let i = 0; i < allStartingPositions.length; i += bulkTileUploadSize) {
      //   console.log(`bulk initializing tiles ${i} to ${i + bulkTileUploadSize}`);
      //   await (await diamond.bulkInitializeTiles(allStartingPositions.slice(i, i + bulkTileUploadSize), { gasLimit: 100_000_000 })).wait();
      // }

      if (fixmap) {
        await initializeFixmap(hre, diamond);
      } else {
        // Randomly initialize players if on localhost
        if (isDev) {
          // this is coordinate position
          // console.log(scaleMap(tileMap, TILE_WIDTH));
          const player1Pos = chooseRandomEmptyLandPosition(scaleMap(tileMap, TILE_WIDTH));
          const player2Pos = getRightPos(getRightPos(player1Pos));

          startTime = performance.now();
          await (await diamond.connect(player1).initializePlayer(player1Pos, 'Alice', { gasLimit: 100_000_000 })).wait();
          await (await diamond.connect(player2).initializePlayer(player2Pos, 'Bob', { gasLimit: 100_000_000 })).wait();
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
          // await (await diamond.setComponentValue(Speed, entity, encodeUint256(2))).wait();

          // await diamond.initializeTile(getTopPos(armySpawnPos));
          // await diamond.createArmy(player2ID, getTopPos(armySpawnPos));
          // entity = (await diamond.getEntity()).toNumber();
          // await (await diamond.setComponentValue(Speed, entity, encodeUint256(2))).wait();
        }
      }

      // Generate config files
      const configFile: GameConfig = {
        address: diamond.address,
        network: hre.network.name,
        deploymentId: `deployer=${process.env.DEPLOYER_ID}-${release && 'release-'}${hre.network.name}-${Date.now()}`,
        map: scaleMap(tileMap, Number(worldConstants.tileWidth)),
        time: new Date(),
      };

      await publishDeployment(configFile);

      if (port === undefined || port.toLowerCase() === 'true') {
        hre.run('port'); // if no port flag present, assume always port to Vault
      }

      console.log(chalk.bgGreen.black(' Curio Game Deployed '));
      console.log(chalk.bgRed.white(` Deployed in ${Math.floor(performance.now() - s) / 1000}s `));

      if (isDev) {
        await hre.ethers.provider.send('evm_setNextBlockTimestamp', [Math.floor(new Date().getTime() / 1000)]);
        await hre.ethers.provider.send('evm_mine', []); // syncs the blockchain time to current unix time
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
