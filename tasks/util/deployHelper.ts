import { putObject } from '../../api/api';
import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';
import { Signer, Contract } from 'ethers';
import { FactoryOptions, HardhatRuntimeEnvironment } from 'hardhat/types';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import { chainInfo, COMPONENT_SPECS, GameMode, position, TILE_TYPE } from 'curio-vault';
import { ECSLib } from '../../typechain-types/contracts/libraries/ECSLib';
import { GameLib } from '../../typechain-types/contracts/libraries/GameLib';
import { CurioERC20 } from '../../typechain-types/contracts/standards/CurioERC20';
import { createTemplates, INNER_REGION_RADIUS_BY_TILE_COUNT, treatyDescriptions } from './constants';
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

  console.log(chalk.dim(`✦ ${contractName}: `, contract.address));

  return contract as C;
};

export const printDivider = () => {
  console.log('------------------------------------');
};

export const confirmTx = async (contractTx: ContractTransaction, hre: HardhatRuntimeEnvironment): Promise<ContractReceipt | undefined> => {
  // we assume that localhost anvil has automine / instant block confirmation
  if (hre.network.name === 'localhost') return;

  const receipt = await contractTx.wait();
  return receipt;
};

export const indexerUrlSelector = (hre: HardhatRuntimeEnvironment): string => {
  if (hre.network.name === 'localhost') {
    return process.env.BACKEND_URL || '';
  }

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

export const uploadABI = async (hre: HardhatRuntimeEnvironment, contractName: string): Promise<string> => {
  try {
    const abi = (await hre.artifacts.readArtifact(contractName)).abi;

    const objectId = await putObject(JSON.stringify(abi));

    return objectId;
  } catch (error) {
    console.log(chalk.bgRed('✦ Upload ABI error: ' + error));
    return '';
  }
};

export const deployTreatyTemplate = async (name: string, admin: Signer, hre: HardhatRuntimeEnvironment, diamond: Curio, gasLimit: number) => {
  // Deploy treaty template
  const treaty = await deployProxy<any>(name, admin, hre, []);
  await (await treaty.init(diamond.address)).wait();

  // Upload contract ABI and metadata (contract descriptions)
  const abiHash = await uploadABI(hre, name);
  const metadataUrl = await putObject(JSON.stringify(treatyDescriptions[name] || {}));

  // Register treaty template
  await (await diamond.connect(admin).registerTreatyTemplate(treaty.address, abiHash, metadataUrl, { gasLimit })).wait();

  console.log(chalk.dim(`✦ Treaty ${name} deployed and ABI uploaded to IPFS at hash=${abiHash}`));
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
  const templates = await deployProxy<any>('Templates', admin, hre, [], { ECSLib: ecsLib.address });
  const gameLib = await deployProxy<GameLib>('GameLib', admin, hre, [], { ECSLib: ecsLib.address, Templates: templates.address });
  const diamondAddr = await deployDiamond(hre, admin, [worldConstants]);
  const diamond = await getDiamond(hre, diamondAddr);
  const facets = [
    { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
    { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
    { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
  ];
  await deployFacets(hre, diamondAddr, facets, admin);
  console.log(`✦ Diamond deployment took ${Math.floor(performance.now() - startTime)} ms`);

  // Register function names
  startTime = performance.now();

  const functionNames = [
    'JoinGame',
    'UpgradeCapital',
    'MoveCapital',
    'ClaimTile',
    'UpgradeTile',
    'RecoverTile',
    'DisownTile',
    'StartTroopProduction',
    'StopTroopProduction',
    'EndTroopProduction',
    'Move',
    'OrganizeArmy',
    'DisbandArmy',
    'StartGather',
    'EndGather',
    'UnloadResources',
    'HarvestResource',
    'HarvestResourcesFromCapital',
    'UpgradeResource',
    'Battle',
    'DelegateGameFunction',
    'DeployTreaty', // FORMATTING: DO NOT REMOVE THIS COMMENT
  ];

  await confirmTx(await diamond.registerFunctionNames(functionNames, { gasLimit }), hre);
  console.log(`✦ Function name registration took ${Math.floor(performance.now() - startTime)} ms`);

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

  // Bulk initialize tiles
  const tileWidth = Number(worldConstants.tileWidth);
  const allTilePositions: position[] = [];
  tileMap.forEach((col, i) =>
    col.forEach((val, j) => {
      allTilePositions.push({ x: i * tileWidth, y: j * tileWidth });
    })
  );
  startTime = performance.now();
  const bulkTileUploadSize = 20; // Note: if part or all of the map is not initialized, make this smaller
  for (let i = 0 * bulkTileUploadSize; i < allTilePositions.length; i += bulkTileUploadSize) {
    console.log(chalk.dim(`✦ Initializing tiles ${i} to ${i + bulkTileUploadSize}`));
    await confirmTx(await diamond.bulkInitializeTiles(allTilePositions.slice(i, i + bulkTileUploadSize), { gasLimit }), hre);
    await sleep(20);
  }
  console.log(`✦ Special tile bulk initialization took ${Math.floor(performance.now() - startTime)} ms`);

  // Deploy treaty templates
  startTime = performance.now();
  const treatyTemplateNames = ['Alliance', 'NonAggressionPact', 'Embargo', 'CollectiveDefenseFund', 'SimpleOTC', 'HandshakeDeal', 'MercenaryLeague', 'LoanAgreement'];
  for (const name of treatyTemplateNames) {
    await deployTreatyTemplate(name, admin, hre, diamond, gasLimit);
  }
  console.log(`✦ Treaty template deployment took ${Math.floor(performance.now() - startTime)} ms`);

  // Battle royale setup
  if (worldConstants.gameMode === GameMode.BATTLE_ROYALE) {
    startTime = performance.now();
    const regionWidth = INNER_REGION_RADIUS_BY_TILE_COUNT * worldConstants.tileWidth;
    const centerTilePos = { x: Math.floor(tileMap.length / 2) * worldConstants.tileWidth, y: Math.floor(tileMap[0].length / 2) * worldConstants.tileWidth };
    const region = { xMin: centerTilePos.x - regionWidth, xMax: centerTilePos.x + regionWidth, yMin: centerTilePos.y - regionWidth, yMax: centerTilePos.y + regionWidth };
    const regionTiles = allTilePositions.filter((pos) => pos.x >= region.xMin && pos.x <= region.xMax && pos.y >= region.yMin && pos.y <= region.yMax);
    await confirmTx(await diamond.disallowHostCapital(regionTiles, { gasLimit }), hre);
    await confirmTx(await diamond.lockTiles(regionTiles, { gasLimit }), hre);
    console.log(`✦ Battle royale setup took ${Math.floor(performance.now() - startTime)} ms`);
  }

  return diamond;
};

const sleep = async (timeInMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
};
