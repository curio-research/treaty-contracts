import * as path from 'path';
import { HardhatArguments, HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import * as fsp from 'fs/promises';
import { createSigners, loadTestMoveArmy, prepareLoadTest } from './util/loadHelper';
import { Wallet } from 'ethers';
import { initializeGame } from './util/deployHelper';
import { generateWorldConstants, TEST_MAP_INPUT } from './util/constants';
import { generateEmptyMap } from './util/mapHelper';
import chalk from 'chalk';
import { chainInfo } from 'curio-vault';

task('load-test', 'perform load testing').setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  try {
    // Compile contracts
    await hre.run('compile');

    const provider = new hre.ethers.providers.JsonRpcProvider(chainInfo[hre.network.name].rpcUrl);
    const admin = (await hre.ethers.getSigners())[0];
    const playerCount = 5;
    console.log(chalk.bgRed.yellow(`>>> Load testing on ${hre.network.name}`));

    // Initialize game
    const worldConstants = generateWorldConstants(admin.address);
    const tileMap = generateEmptyMap(TEST_MAP_INPUT);
    const diamond = await initializeGame(hre, worldConstants, tileMap);

    // Read from existing addresses, or if none exist, create new ones and save locally
    let players: Wallet[];
    const filePath = path.join(path.join(__dirname), 'signers', `${hre.network.name}.json`);
    try {
      const fileContent = await fsp.readFile(filePath);
      players = JSON.parse(fileContent.toString())
        .slice(0, playerCount)
        .map((pK: string) => new hre.ethers.Wallet(pK, provider));
      console.log(chalk.bgRed.yellow(`>>> ${players.length} existing signers loaded`));
      if (players.length < playerCount) {
        players = players.concat(await createSigners(hre, playerCount - players.length, admin));
        await fsp.writeFile(filePath, JSON.stringify(players.map((w) => w.privateKey)));
      }
    } catch (err: any) {
      players = await createSigners(hre, playerCount, admin);
      await fsp.writeFile(filePath, JSON.stringify(players.map((w) => w.privateKey)));
    }

    // Prepare load test
    const setupOutput = await prepareLoadTest({ hre, diamond }, players);

    // Perform load test on `move`
    await loadTestMoveArmy(hre, diamond, setupOutput, players, {
      txsPerPlayer: 10,
      periodPerTxBatchInMs: 6 * 1000,
      totalTimeoutInMs: 3 * 60 * 1000,
    });
  } catch (err: any) {
    console.log(err.message);
  }
});
