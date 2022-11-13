import * as path from 'path';
import { HardhatArguments, HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import * as fsp from 'fs/promises';
import { createSigners, loadTestMoveArmy, prepareLoadTest } from './util/loadHelper';
import { Signer } from 'ethers';
import { initializeGame } from './util/deployHelper';
import { generateWorldConstants, TEST_MAP_INPUT } from './util/constants';
import { chainInfo } from 'curio-vault';
import { generateEmptyMap } from './util/mapHelper';

task('load-test', 'perform load testing').setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  try {
    const admin = (await hre.ethers.getSigners())[0];
    const playerCount = 100;
    const gasLimit = chainInfo[hre.network.name].gasLimit;

    // Initialize game
    const worldConstants = generateWorldConstants(admin.address);
    const tileMap = generateEmptyMap(TEST_MAP_INPUT);
    const diamond = await initializeGame(hre, worldConstants, tileMap);

    // Read from existing addresses, or if none exist, create new ones and save locally
    let players: Signer[];
    const filePath = path.join(path.join(__dirname), 'signers', hre.network.name);
    try {
      const fileContent = await fsp.readFile(filePath);
      players = JSON.parse(fileContent.toString());
      if (players.length < playerCount) {
        players = await createSigners(hre, playerCount - players.length, admin);
        await fsp.writeFile(filePath, JSON.stringify(players));
      }
    } catch (err: any) {
      players = await createSigners(hre, playerCount, admin);
      await fsp.writeFile(filePath, JSON.stringify(players));
    }

    // Prepare load test
    const setupOutput = await prepareLoadTest({ hre, diamond }, players);

    // Perform load test on `move`
    loadTestMoveArmy(hre, diamond, setupOutput, players, {
      txsPerPlayer: 10,
      periodPerTxBatchInMs: 1500,
    });
  } catch (err: any) {
    console.log(err.message);
  }
});

task('create-wallets').setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  try {
    console.log('MUAHAHAHAHAHA');
  } catch (err: any) {
    console.log(err.message);
  }
});

function getDir(arg0: string, arg1: string): string {
  throw new Error('Function not implemented.');
}
