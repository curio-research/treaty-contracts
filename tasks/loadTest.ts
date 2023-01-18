import * as path from 'path';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import { createSigners, loadTestMoveArmy, prepareLoadTest, testComputeVsStorage } from './util/loadHelper';
import { Wallet } from 'ethers';
import { initializeGame } from './util/deployHelper';
import { generateWorldConstants, TEST_MAP_INPUT } from './util/constants';
import { generateEmptyMap } from './util/mapHelper';
import chalk from 'chalk';
import { chainInfo } from 'curio-vault';

/**
 * @notice Before load testing, make sure the admin wallet has plenty of tokens for the corresponding number of concurrent players.
 */
task('load-test', 'perform load testing')
  .addOptionalParam('playercount', 'Number of players')
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      // Compile contracts
      await hre.run('compile');

      const provider = new hre.ethers.providers.JsonRpcProvider(chainInfo[hre.network.name].rpcUrl);
      const admin = (await hre.ethers.getSigners())[0];
      console.log('✦ admin address is:', admin.address);
      const playerCount: number = args.playercount ?? 5;
      console.log(chalk.bgRed.yellow(`>>> Load testing on ${hre.network.name}`));

      // Prepare signers
      let players: Wallet[] = [];
      const dir = path.join(path.join(__dirname), 'signers');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      const filePath = path.join(dir, `${hre.network.name}.json`);
      try {
        // Read all existing signers for non-localhost networks
        const fileContent = await fsp.readFile(filePath);
        players = JSON.parse(fileContent.toString())
          .slice(0, playerCount)
          .map((pK: string) => new hre.ethers.Wallet(pK, provider));
        console.log(chalk.bgRed.yellow(`>>> ${players.length} existing signers loaded`));

        // Create and fund more signers if needed
        if (players.length < playerCount) {
          players = players.concat(await createSigners(hre, playerCount - players.length, admin));
          await fsp.writeFile(filePath, JSON.stringify(players.map((w) => w.privateKey)));
        }
      } catch (err: any) {
        // Create and fund all signers from scratch
        players = await createSigners(hre, playerCount, admin);
        await fsp.writeFile(filePath, JSON.stringify(players.map((w) => w.privateKey)));
      }

      console.log(chalk.bgRed.yellow('>>> Admin balance:', (await admin.getBalance()).toString(), 'wei'));
      console.log(chalk.bgRed.yellow('>>> Player balance:', (await players[0].getBalance()).toString(), 'wei'));

      // Initialize game
      const worldConstants = generateWorldConstants(admin.address, TEST_MAP_INPUT);
      const tileMap = generateEmptyMap(TEST_MAP_INPUT);
      const diamond = await initializeGame(hre, worldConstants, tileMap);

      // Prepare load test
      const setupOutput = await prepareLoadTest({ hre, diamond }, players);

      // Perform load test on `move`
      await loadTestMoveArmy(hre, diamond, setupOutput, players, {
        txsPerPlayer: 5,
        periodPerTxBatchInMs: Math.trunc(playerCount * 1.5 * 1000),
        totalTimeoutInMs: Math.trunc(300 * 60 * 1000),
      });

      // Test compute vs. storage durations
      await testComputeVsStorage(diamond, setupOutput.armyIds[0]);
    } catch (err: any) {
      console.log(err.message);
    }
  });
