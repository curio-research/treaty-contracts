import { chainInfo, componentNameToId, Component__factory, Curio, decodeBigNumberishArr, encodePosition, encodeString, Position, Tag } from 'curio-vault';
import { TILE_WIDTH } from './constants';
import chalk from 'chalk';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { LoadTestConfig, LoadTestSetupInput, LoadTestSetupOutput } from './types';
import { Signer, Wallet } from 'ethers';
import { confirmTx } from './deployHelper';
import * as os from 'os';

export const DRIP_AMOUNT_BY_NETWORK: Record<string, number> = {
  altlayer: 100,
  constellation: 100,
  constellationFast: 100,
  localhost: 1000,
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

  // Initialize each player with a city (async)
  let startTime = performance.now();
  const playerIds: number[] = [];
  let playersInitialized = 0;
  const intervalInMs = 800; // FIXME: softcode
  players.forEach(async (p, i) => {
    setTimeout(async () => {
      console.log(chalk.bgRed.yellow.dim(`>>> Initializing player ${i} with city`));
      await (await diamond.connect(p).initializePlayer({ x: i * TILE_WIDTH, y: 0 }, `Player ${i}`, { gasLimit })).wait();
      playerIds.push((await diamond.getPlayerId(p.address)).toNumber());

      const settlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition({ x: i * TILE_WIDTH, y: 0 }), { gasLimit }))[0];
      if (!settlerId) throw new Error('Settler not initialized yet');
      await confirmTx(await diamond.connect(p).foundCity(settlerId, [{ x: i * TILE_WIDTH, y: 0 }], `City ${i}`, { gasLimit }), hre);
      playersInitialized++;
    }, i * intervalInMs);
  });

  while (true) {
    await sleep(100);
    if (playersInitialized === players.length) {
      console.log(chalk.bgRed.yellow(`>>> Players initialized with city after ${performance.now() - startTime} ms`));
      break;
    }
  }

  // Create an army for each player and log IDs (sync)
  startTime = performance.now();
  for (let i = 0; i < players.length; i++) {
    console.log(chalk.bgRed.yellow.dim(`>>> Creating army for player ${i}`));
    await diamond.connect(admin).createArmy(playerIds[i], { x: i * TILE_WIDTH, y: 0 }, { gasLimit });
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
    const intervalInMs = 180; // FIXME: softcode
    players.forEach(async (p, i) => {
      // setTimeout(async () => {
      console.log(chalk.bgRed.yellow.dim(`>>> [batch ${k}] Moving army for player ${i}...`));
      const receipt = await (await diamond.connect(p).move(armyIds[i], { x: i * TILE_WIDTH, y: nextMoveUp ? 0 : 1 }, { gasLimit })).wait();
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

async function processArray(items: Array<any>, process: any) {
  var todo = items.concat();

  setTimeout(function () {
    process(todo.shift());
    if (todo.length > 0) {
      setTimeout(arguments.callee, 25);
    }
  }, 25);
}
