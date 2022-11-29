import { chainInfo, componentNameToId, Component__factory, decodeBigNumberishArr, encodePosition, encodeString, Position, Tag } from 'curio-vault';
import { TILE_WIDTH } from './constants';
import chalk from 'chalk';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { LoadTestConfig, LoadTestSetupInput, LoadTestSetupOutput } from './types';
import { Signer, Wallet } from 'ethers';
import * as os from 'os';
import { Curio } from '../../typechain-types/hardhat-diamond-abi/Curio';

export const DRIP_AMOUNT_BY_NETWORK: Record<string, number> = {
  altlayer: 100,
  constellation: 100,
  constellationFast: 100,
  localhost: 1,
  optimismKovan: 0.01,
  tailscale: 100,
};

// ----------------------------------------------------------
// LOAD TEST FNS
// ----------------------------------------------------------

export const createSigners = async (hre: HardhatRuntimeEnvironment, signerCount: number, admin: Signer): Promise<Wallet[]> => {
  const provider = new hre.ethers.providers.JsonRpcProvider(chainInfo[hre.network.name].rpcUrl);

  // Create signers
  const signers: Wallet[] = [];
  for (let i = 0; i < signerCount; i++) {
    const privKey = hre.ethers.Wallet.createRandom();
    const signer = new hre.ethers.Wallet(privKey, provider);
    signers.push(signer);
  }

  const txIntent = (recipient: Wallet) => {
    return {
      to: recipient.address,
      value: hre.ethers.utils.parseEther(String(DRIP_AMOUNT_BY_NETWORK[hre.network.name])),
      gasLimit: chainInfo[hre.network.name].gasLimit,
    };
  };

  // Drip tokens
  for (let i = 0; i < signerCount; i++) {
    await (await admin.sendTransaction(txIntent(signers[i]))).wait();
    await sleep(50); // prevent tx too frequent error
  }

  console.log(chalk.bgRed.yellow(`>>> ${signerCount} signers created and funded`));
  return signers;
};

export const prepareLoadTest = async (input: LoadTestSetupInput, players: Wallet[]): Promise<LoadTestSetupOutput> => {
  // Fetch inputs
  const { hre, diamond } = input;

  // Create players with enough tokens
  const admin = (await hre.ethers.getSigners())[0];

  // Fetch gas limit, and necessary components
  const gasLimit = chainInfo[hre.network.name].gasLimit;
  const positionComponentAddr = await diamond.getComponentById(componentNameToId[Position]);
  const positionComponent = Component__factory.connect(positionComponentAddr, admin);
  const tagComponentAddr = await diamond.getComponentById(componentNameToId[Tag]);
  const tagComponent = Component__factory.connect(tagComponentAddr, admin);

  const numberOfCores = os.cpus().length;
  console.log(chalk.bgRed.yellow(`>>> Number of CPU cores: ${numberOfCores}`));

  // Initialize each player with a city (sync, because player IDs are used for initializing armies in same order as players)
  let startTime = performance.now();
  const playerIds: number[] = [];
  for (let i = 0; i < players.length; i++) {
    console.log(chalk.bgRed.yellow.dim(`>>> Initializing player ${i} with city`));
    await (await diamond.connect(players[i]).initializeNation(i * TILE_WIDTH, 0, `Player ${i}`, { gasLimit })).wait();
    playerIds.push((await diamond.getNationIDByAddress(players[i].address)).toNumber());
  }
  if (
    !(await diamond.playersAndIdsMatch(
      players.map((p) => p.address),
      playerIds
    ))
  )
    throw new Error(chalk.bgWhite.red('⊂(⊙д⊙)つ Players and IDs do not match. Try increase the `offsetInMs` parameter.'));
  console.log(chalk.bgRed.yellow(`>>> Players initialized with city after ${performance.now() - startTime} ms`));

  // Create an army for each player and log IDs (sync, because army IDs are used for sending load test txs)
  startTime = performance.now();
  for (let i = 0; i < players.length; i++) {
    console.log(chalk.bgRed.yellow.dim(`>>> Creating army for player ${i}`));
    await diamond.connect(admin).initializeArmy('TODO', { gasLimit });
  }
  const armyIds = decodeBigNumberishArr(await tagComponent.getEntitiesWithValue(encodeString('Army')));
  console.log(chalk.bgRed.yellow(`>>> Armies created after ${performance.now() - startTime} ms`));

  return { playerIds, armyIds };
};

export const loadTestMoveArmy = async (hre: HardhatRuntimeEnvironment, diamond: Curio, setupOutput: LoadTestSetupOutput, players: Signer[], config: LoadTestConfig, outputFilePath?: string): Promise<void> => {
  // Fetch inputs
  const { armyIds } = setupOutput;
  const { txsPerPlayer, periodPerTxBatchInMs, totalTimeoutInMs } = config;
  const gasLimit = chainInfo[hre.network.name].gasLimit;

  const hashes = '#'.repeat(100);
  console.log(chalk.bgRed.yellow(`${hashes}\nLoad testing begins with ${players.length} concurrent players each over ${txsPerPlayer} repeated transactions separated by ${periodPerTxBatchInMs} ms\n${hashes}`));

  // Begin load testing
  let nextMoveUp = false;
  let startTime = performance.now();
  let lastTime: number;
  let gasConsumptionsByTx: number[] = [];
  let timeByBatchInMs: number[] = [];
  for (let k = 0; k < txsPerPlayer; k++) {
    console.log(chalk.bgRed.yellow(`>>> [batch ${k}] Starting to move armies...`));

    // Move all armies south by 1 coordinate (async)
    lastTime = performance.now();
    let armiesMoved = 0;
    players.forEach(async (p, i) => {
      console.log(chalk.bgRed.yellow.dim(`>>> [batch ${k}] Moving army for player ${i}...`));
      const receipt = await (await diamond.connect(p).move(armyIds[i], i * TILE_WIDTH, nextMoveUp ? 0 : 1, { gasLimit })).wait();
      gasConsumptionsByTx.push(receipt.gasUsed.toNumber());

      armiesMoved++;
    });

    while (true) {
      await sleep(50);
      if (armiesMoved === players.length) {
        nextMoveUp = !nextMoveUp;
        timeByBatchInMs.push(performance.now() - lastTime);
        console.log(chalk.bgRed.yellow(`>>> [batch ${k}] All army movements finished after ${performance.now() - lastTime} ms`));
        break;
      }
    }
  }

  // Check for completion or timeout
  while (performance.now() - startTime < totalTimeoutInMs) {
    await sleep(100);
    if (timeByBatchInMs.length === txsPerPlayer) {
      console.log(chalk.bgRed.yellow(`${hashes}\nLoad testing complete`));
      console.log(chalk.bgRed.yellow(`Average gas per transaction: ${avg(gasConsumptionsByTx)}`));
      console.log(chalk.bgRed.yellow(`Average time per transaction batch: ${avg(timeByBatchInMs)} ms`));
      console.log(chalk.bgRed.yellow(`Result: ${(players.length / avg(timeByBatchInMs)) * 1000} TPS`));
      break;
    }
  }
};

export const testComputeVsStorage = async (diamond: Curio, arbitraryArmyId: number) => {
  let startTime = performance.now();
  for (let i = 0; i < 20; i++) await diamond.onlyQuery({ x: 0, y: 0 });
  console.log(chalk.bgGreen.blue(`20 Queries took ${performance.now() - startTime} ms`));

  startTime = performance.now();
  for (let i = 0; i < 20; i++) await diamond.onlySet(arbitraryArmyId, i);
  console.log(chalk.bgGreen.blue(`20 Sets took ${performance.now() - startTime} ms`));
};

// ----------------------------------------------------------
// TS HELPERS
// ----------------------------------------------------------

const sleep = async (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const avg = (arr: number[]): number => {
  let sum = 0;
  arr.forEach((e) => (sum += e));
  return sum / arr.length;
};