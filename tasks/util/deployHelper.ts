import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';
import { Signer, Contract } from 'ethers';
import { FactoryOptions, HardhatRuntimeEnvironment } from 'hardhat/types';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { chainInfo, COMPONENT_SPECS, position, TILE_TYPE } from 'curio-vault';
import { ECSLib } from '../../typechain-types/contracts/libraries/ECSLib';
import { GameLib } from '../../typechain-types/contracts/libraries/GameLib';
import { createTemplates } from './constants';
import { deployDiamond, getDiamond, deployFacets } from './diamondDeploy';
import { encodeTileMap } from './mapHelper';
import GAME_PARAMETERS from '../game_parameters.json';
import chalk from 'chalk';
import { Curio } from '../../typechain-types/hardhat-diamond-abi/Curio';

// deploy proxy used in hre
export const deployProxy = async <C extends Contract>(contractName: string, signer: Signer, hre: HardhatRuntimeEnvironment, contractArgs: unknown[], libs?: FactoryOptions['libraries']): Promise<C> => {
  const factory = await hre.ethers.getContractFactory(contractName, libs ? { libraries: libs } : signer);
  const gasLimit = chainInfo[hre.network.name].gasLimit;
  const contract = await factory.deploy(...contractArgs, { gasLimit });

  await confirmTx(contract.deployTransaction, hre);

  console.log(`✦ ${contractName}: `, contract.address);

  return contract as C;
};

export const printDivider = () => {
  console.log('------------------------------------');
};

export const confirmTx = async (contractTx: ContractTransaction, hre: HardhatRuntimeEnvironment): Promise<ContractReceipt | undefined> => {
  // we assume that localhost anvil has automine / instant block confirmation
  if (hre.network.name === 'localhost' || hre.network.name === 'tailscale') return;

  const receipt = await contractTx.wait();
  return receipt;
};

export const indexerUrlSelector = (hre: HardhatRuntimeEnvironment): string => {
  if (hre.network.name === 'localhost') {
    return process.env.BACKEND_URL || '';
  }
  if (hre.network.name === 'tailscale') {
    return `${process.env.TAILSCALE_MAIN}:8080`;
  }

  if (hre.network.name === 'constellationNew') {
    return process.env.INDEXER_URL || '';
    return process.env.BACKEND_URL || '';
  }

  // TODO: add production indexer url cases
  return '';
};

export const saveMapToLocal = async (tileMap: any) => {
  const mapsDir = path.join(path.join(__dirname), '..', 'maps');
  if (!fs.existsSync(mapsDir)) fs.mkdirSync(mapsDir);

  let mapIndex = (await fsPromise.readdir(mapsDir)).length;
  let mapPath: string;
  do {
    mapPath = path.join(mapsDir, `map-${mapIndex}.json`);
    mapIndex++;
  } while (fs.existsSync(mapPath));

  await fsPromise.writeFile(mapPath, JSON.stringify(tileMap));
  console.log('✦ map saved to local');
};

/**
 * @dev The megafunction which initializes a fully functional game instance.
 * @param hre
 * @param worldConstants
 * @param tileMap
 * @returns a Curio diamond instance
 */
export const initializeGame = async (hre: HardhatRuntimeEnvironment, worldConstants: any, tileMap: TILE_TYPE[][]): Promise<Curio> => {
  const admin = (await hre.ethers.getSigners())[0];
  const gasLimit = chainInfo[hre.network.name].gasLimit;

  // Deploy diamond
  let startTime = performance.now();
  const ecsLib = await deployProxy<ECSLib>('ECSLib', admin, hre, []);
  const gameLib = await deployProxy<GameLib>('GameLib', admin, hre, [], { ECSLib: ecsLib.address });
  const templates = await deployProxy<any>('Templates', admin, hre, [], { ECSLib: ecsLib.address });
  const diamondAddr = await deployDiamond(hre, admin, [worldConstants]);
  const diamond = await getDiamond(hre, diamondAddr);
  const facets = [
    { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
    { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address } },
    { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
  ];
  await deployFacets(hre, diamondAddr, facets, admin);
  console.log(`✦ Diamond deployment took ${Math.floor(performance.now() - startTime)} ms`);

  // Batch register components
  startTime = performance.now();
  const componentUploadBatchSize = 50;
  for (let i = 0; i < COMPONENT_SPECS.length; i += componentUploadBatchSize) {
    console.log(chalk.dim(`✦ Registering components ${i} to ${i + componentUploadBatchSize}`));
    await confirmTx(await diamond.registerComponents(diamond.address, COMPONENT_SPECS.slice(i, i + componentUploadBatchSize), { gasLimit }), hre);
  }
  console.log(`✦ Component registration took ${Math.floor(performance.now() - startTime)} ms`);

  // Add game entity
  await diamond.addGame({ gasLimit });

  // Register game parameters
  startTime = performance.now();
  const gameParamUploadBatchSize = 200;
  for (let i = 0; i < GAME_PARAMETERS.length; i += gameParamUploadBatchSize) {
    console.log(chalk.dim(`✦ Registering game parameters ${i} to ${i + gameParamUploadBatchSize}`));
    const identifiers = GAME_PARAMETERS.map((c) => c.subject + '-' + c.object + '-' + c.componentName + '-' + c.functionName + '-' + Math.trunc(c.level).toString());
    const values = GAME_PARAMETERS.map((c) => Math.trunc(c.value));
    await confirmTx(await diamond.bulkAddGameParameters(identifiers, values, { gasLimit }), hre);
  }
  console.log(`✦ Game parameter registration took ${Math.floor(performance.now() - startTime)} ms`);

  // Initialize map
  startTime = performance.now();
  const encodedTileMap = encodeTileMap(tileMap, worldConstants.numInitTerrainTypes, Math.floor(200 / worldConstants.numInitTerrainTypes));
  await confirmTx(await diamond.storeEncodedColumnBatches(encodedTileMap, { gasLimit }), hre);
  console.log(`✦ Lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(performance.now() - startTime)} ms`);

  // Create templates
  startTime = performance.now();
  await createTemplates(diamond, gasLimit, hre);
  console.log(`✦ Template creation took ${Math.floor(performance.now() - startTime)} ms`);

  // Bulk initialize special tiles
  const tileWidth = Number(worldConstants.tileWidth);
  const specialTilePositions: position[] = [];
  tileMap.forEach((col, i) =>
    col.forEach((val, j) => {
      if (val !== TILE_TYPE.LAND) specialTilePositions.push({ x: i * tileWidth, y: j * tileWidth });
    })
  );
  startTime = performance.now();
  const bulkTileUploadSize = 100;
  for (let i = 0; i < specialTilePositions.length; i += bulkTileUploadSize) {
    console.log(chalk.dim(`✦ Initializing special tiles ${i} to ${i + bulkTileUploadSize}`));
    await confirmTx(await diamond.bulkInitializeTiles(specialTilePositions.slice(i, i + bulkTileUploadSize), { gasLimit }), hre);
  }
  console.log(`✦ Special tile bulk initialization took ${Math.floor(performance.now() - startTime)} ms`);

  return diamond;
};
