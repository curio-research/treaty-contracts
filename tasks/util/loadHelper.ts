import { chainInfo, componentNameToId, Component__factory, Curio, decodeBigNumberishArr, encodePosition, encodeString, Position, Tag } from 'curio-vault';
import { TILE_WIDTH } from './constants';
import chalk from 'chalk';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { LoadTestConfig, LoadTestSetupInput, LoadTestSetupOutput } from './types';
import { Signer } from 'ethers';
import { confirmTx } from './deployHelper';

export const DRIP_AMOUNT_BY_NETWORK: Record<string, number> = {
  optimismKovan: 0.01,
  localhost: 100,
  constellation: 2,
  altlayer: 2,
  tailscale: 100,
};

// ----------------------------------------------------------
// LOAD TEST FNS
// ----------------------------------------------------------

export const createSigners = async (hre: HardhatRuntimeEnvironment, signerCount: number, admin: Signer): Promise<Signer[]> => {
  // Create signers
  const signers: Signer[] = [];
  for (let i = 0; i < signerCount; i++) {
    signers.push(hre.ethers.Wallet.createRandom());
  }

  const txIntent = (recipient: Signer) => {
    return {
      to: recipient.getAddress(),
      value: hre.ethers.utils.parseEther(String(DRIP_AMOUNT_BY_NETWORK[hre.network.name])),
      gasLimit: chainInfo[hre.network.name].gasLimit,
    };
  };

  // Drip tokens
  for (let i = 0; i < signerCount; i++) {
    await (await admin.sendTransaction(txIntent(signers[i]))).wait();
    await sleep(50);
  }

  return signers;
};

export const prepareLoadTest = async (input: LoadTestSetupInput, players: Signer[]): Promise<LoadTestSetupOutput> => {
  // Fetch inputs
  const { hre, diamond } = input;

  // Create players with enough tokens
  const admin = (await hre.ethers.getSigners())[0];
  console.log(chalk.bgRed.yellow(`>>> ${players.length} signers created and funded`));

  // Fetch gas limit, and necessary components
  const gasLimit = chainInfo[hre.network.name].gasLimit;
  const positionComponentAddr = await diamond.getComponentById(componentNameToId[Position]);
  const positionComponent = Component__factory.connect(positionComponentAddr, admin);
  const tagComponentAddr = await diamond.getComponentById(componentNameToId[Tag]);
  const tagComponent = Component__factory.connect(tagComponentAddr, admin);

  // Initialize each player with a city (sync)
  let startTime = performance.now();
  const playerIds: number[] = [];
  for (let i = 0; i < players.length; i++) {
    console.log(chalk.bgRed.yellow.dim(`>>> initializing player with city ${i}`));
    await (await diamond.connect(players[i]).initializePlayer({ x: i * TILE_WIDTH, y: 0 }, `Player ${i}`, { gasLimit: gasLimit })).wait();
    playerIds.push((await diamond.getPlayerId(players[i].getAddress())).toNumber());

    const settlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition({ x: i * TILE_WIDTH, y: 0 }), { gasLimit: gasLimit }))[0];
    if (!settlerId) throw new Error('Settler not initialized yet');
    await confirmTx(await diamond.connect(players[i]).foundCity(settlerId, [{ x: i * TILE_WIDTH, y: 0 }], `City ${i}`, { gasLimit: gasLimit }), hre);
  }
  console.log(chalk.bgRed.yellow(`>>> Players initialized with city after ${performance.now() - startTime} ms`));

  // Create an army for each player and log IDs (sync)
  startTime = performance.now();
  console.log(chalk.bgRed.yellow(`>>> Starting to create armies, cities should be founded when this prints`));
  for (let i = 0; i < players.length; i++) {
    await diamond.connect(admin).createArmy(playerIds[i], { x: i * TILE_WIDTH, y: 0 }, { gasLimit: gasLimit });
  }
  const armyIds = decodeBigNumberishArr(await tagComponent.getEntitiesWithValue(encodeString('Army')));
  console.log(chalk.bgRed.yellow(`>>> All armies created after ${performance.now() - startTime} ms`));
  console.log(chalk.bgRed.yellow('>>> Army IDs:'), armyIds);

  return { playerIds, armyIds };
};

export const loadTestMoveArmy = async (hre: HardhatRuntimeEnvironment, diamond: Curio, setupOutput: LoadTestSetupOutput, players: Signer[], config: LoadTestConfig): Promise<void> => {
  // Fetch inputs
  const { armyIds } = setupOutput;
  const { txsPerPlayer, periodPerTxBatchInMs } = config;
  const gasLimit = chainInfo[hre.network.name].gasLimit;

  // Load test begins
  let nextMoveUp = false;
  let startTime: number;
  for (let k = 0; k < txsPerPlayer; k++) {
    // Wait between batches of transactions
    console.log(chalk.bgRed.yellow(`>>> Starting tx batch count ${k}...`));
    await sleep(periodPerTxBatchInMs);

    // Move all armies south by 1 coordinate (async)
    startTime = performance.now();
    let armiesMoved = 0;
    players.forEach(async (p, i) => {
      console.log(chalk.bgRed.yellow.dim(`>>> Moving army for player ${i}...`));
      await confirmTx(await diamond.connect(p).move(armyIds[i], { x: i * TILE_WIDTH, y: nextMoveUp ? 0 : 1 }, { gasLimit }), hre);

      armiesMoved++;
      if (armiesMoved === players.length) {
        nextMoveUp = !nextMoveUp;
        console.log(chalk.bgRed.yellow(`>>> All army movements finished after ${performance.now() - startTime} ms`));
      }
    });
  }
};

// ----------------------------------------------------------
// TS HELPERS
// ----------------------------------------------------------

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
