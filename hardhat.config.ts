import { task } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-contract-sizer';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { generateAllGameArgs } from './tasks/util/allArgsGenerator';
import { gameItems } from './tasks/util/itemGenerator';
import { ITEM_RATIO } from './tasks/util/constants';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
require('dotenv').config();

// tasks
import './tasks/port';
import './tasks/deploy';
import './tasks/map';
import './tasks/simulate';
import './tasks/poll';
import { deployProxy } from './tasks/util/deployHelper';

// to get the smart contract file sizes, run:
// yarn run hardhat size-contracts

// Add this
const { USER1_PK, USER2_PK, KOVAN_RPC_URL } = process.env;

export default {
  defaultNetwork: 'localhost',
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  networks: {
    optimismKovan: {
      url: KOVAN_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 69,
    },
    hardhat: {
      chainId: 1337,
      mining: {
        auto: false,
        interval: 500,
      },
    },
  },
};

////////////////////////////

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('mapgen', 'Ports the map to render on frontend', async (args: any, hre: HardhatRuntimeEnvironment) => {
  // ---------------------------------
  // porting files to frontend
  // ---------------------------------
  let blocks = generateAllGameArgs(gameItems, ITEM_RATIO).blockMap;
  await fsPromise.writeFile(path.join(path.join(__dirname), 'map.json'), JSON.stringify(blocks));

  console.log('✦ Porting map file over ...');
  const mapFileDir = path.join(__dirname, '/map.json');
  const mapClientDir = path.join(__dirname, '../frontend/src/map.json');

  await fs.copyFileSync(mapFileDir, mapClientDir);

  console.log('✦ Porting complete!');
});
