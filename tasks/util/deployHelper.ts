import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';
import { Signer, Contract } from 'ethers';
import { FactoryOptions, HardhatRuntimeEnvironment } from 'hardhat/types';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { chainInfo, COMPONENT_SPECS, position, TILE_TYPE } from 'curio-vault';
import { ECSLib } from '../../typechain-types/contracts/libraries/ECSLib';
import { GameLib } from '../../typechain-types/contracts/libraries/GameLib';
import { CurioERC20 } from '../../typechain-types/contracts/tokens/CurioERC20';
import { createTemplates } from './constants';
import { deployDiamond, getDiamond, deployFacets } from './diamondDeploy';
import { encodeTileMap } from './mapHelper';
import GAME_PARAMETERS from '../game_parameters.json';
import chalk from 'chalk';
import { Curio } from '../../typechain-types/hardhat-diamond-abi/Curio';
import pinataSDK from '@pinata/sdk';

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
  console.log(`✦ Map saved locally at: ${mapPath}`);
};

export const uploadABIToIPFS = async (hre: HardhatRuntimeEnvironment, contractName: string): Promise<string> => {
  const pinata = pinataSDK(process.env.PINATA_API_KEY!, process.env.PINATA_API_SECRET!);
  try {
    await pinata.testAuthentication();
    const abi = (await hre.artifacts.readArtifact(contractName)).abi;
    const response = await pinata.pinJSONToIPFS(abi);
    return response.IpfsHash;
  } catch (error) {
    console.log(chalk.bgRed('✦ Pinata error: ' + error));
    return '';
  }
};

// Retrieve at https://gateway.pinata.cloud/ipfs/<hash>
export const deployTreaty = async (name: string, admin: Signer, hre: HardhatRuntimeEnvironment, diamond: Curio, gasLimit: number) => {
  const treaty = await deployProxy<any>(name, admin, hre, [diamond.address]);
  const abiHash = await uploadABIToIPFS(hre, name);
  console.log(chalk.dim(`✦ Treaty ${name} deployed and ABI uploaded to IPFS at hash=${abiHash}`));
  diamond.connect(admin).addTreaty(treaty.address, name, abiHash, { gasLimit });
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
  const templates = await deployProxy<any>('Templates', admin, hre, [], { ECSLib: ecsLib.address }); // FIXME: type
  const gameLib = await deployProxy<GameLib>('GameLib', admin, hre, [], { ECSLib: ecsLib.address, Templates: templates.address });
  const diamondAddr = await deployDiamond(hre, admin, [worldConstants]);
  const diamond = await getDiamond(hre, diamondAddr);
  const facets = [
    { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
    { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
    { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
  ]; // FIXME: GameFacet for some reason does not like to be linked to GameLib, and neither does GetterFacet
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

  // Deploy and authorize token contracts
  startTime = performance.now();
  const tokenNames = ['Gold', 'Food', 'Horseman', 'Warrior', 'Slinger', 'Guard'];
  const tokenAddrs: string[] = [];
  for (const name of tokenNames) {
    const token = await deployProxy<CurioERC20>('CurioERC20', admin, hre, [name, name.toUpperCase(), 0, diamond.address]);
    tokenAddrs.push(token.address);
    await confirmTx(await diamond.addAuthorized(token.address, { gasLimit }), hre);
  }
  console.log(`✦ Token contract deployment and authorization took ${Math.floor(performance.now() - startTime)} ms`);

  // Create templates
  startTime = performance.now();
  await createTemplates(diamond, tokenAddrs, gasLimit, hre);
  console.log(`✦ Template creation took ${Math.floor(performance.now() - startTime)} ms`);

  // Initialize map
  startTime = performance.now();
  const encodedTileMap = encodeTileMap(tileMap, worldConstants.numInitTerrainTypes, Math.floor(200 / worldConstants.numInitTerrainTypes));
  await confirmTx(await diamond.storeEncodedColumnBatches(encodedTileMap, { gasLimit }), hre);
  console.log(`✦ Lazy setting ${tileMap.length}x${tileMap[0].length} map took ${Math.floor(performance.now() - startTime)} ms`);

  // Bulk initialize special tiles
  const tileWidth = Number(worldConstants.tileWidth);
  // const specialTilePositions: position[] = [];
  const allTilePositions: position[] = [];
  tileMap.forEach((col, i) =>
    col.forEach((val, j) => {
      // if (val !== TILE_TYPE.LAND) specialTilePositions.push({ x: i * tileWidth, y: j * tileWidth });
      allTilePositions.push({ x: i * tileWidth, y: j * tileWidth });
    })
  );
  startTime = performance.now();
  const bulkTileUploadSize = 100;
  for (let i = 0; i < allTilePositions.length; i += bulkTileUploadSize) {
    console.log(chalk.dim(`✦ Initializing special tiles ${i} to ${i + bulkTileUploadSize}`));
    await confirmTx(await diamond.bulkInitializeTiles(allTilePositions.slice(i, i + bulkTileUploadSize), { gasLimit }), hre);
  }
  console.log(`✦ Special tile bulk initialization took ${Math.floor(performance.now() - startTime)} ms`);

  // Deploy treaties
  startTime = performance.now();
  const treatyNames = ['FTX', 'NATO'];
  for (const name of treatyNames) {
    await deployTreaty(name, admin, hre, diamond, gasLimit);
  }
  console.log(`✦ Treaty deployment took ${Math.floor(performance.now() - startTime)} ms`);

  return diamond;
};
