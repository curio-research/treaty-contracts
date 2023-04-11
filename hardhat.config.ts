import 'hardhat-diamond-abi';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import fs from 'fs';
import { task } from 'hardhat/config';
import 'hardhat-contract-sizer';
import 'hardhat-preprocessor';
import dotenv from 'dotenv';

// tasks
import './tasks/deploy';

// configure dotenv so it can read .env file
dotenv.config();

// to get the file size of each smart contract, run:
// yarn run hardhat size-contracts

const { USER1_PK, USER2_PK, LOCALHOST_USER1_PK, LOCALHOST_USER2_PK, CONSTELLATION_RPC_URL, CONSTELLATION_FAST_RPC_URL, ALTLAYER_RPC_URL, EXFAC_RPC_URL } = process.env;

export default {
  defaultNetwork: 'localhost',

  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  diamondAbi: {
    name: 'Curio',
    include: ['Facet', 'Util', 'ECSLib'],
    strict: true, // check for overlapping function names
  },

  networks: {
    constellation: {
      url: CONSTELLATION_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 2938,
    },
    constellationFast: {
      url: CONSTELLATION_FAST_RPC_URL,
      accounts: [LOCALHOST_USER1_PK, LOCALHOST_USER2_PK],
      chainId: 2938,
    },
    altlayer: {
      url: ALTLAYER_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 9992,
    },
    exfac: {
      url: EXFAC_RPC_URL,
      accounts: [LOCALHOST_USER1_PK, LOCALHOST_USER2_PK],
      chainId: 888,
    },
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
      blockGasLimit: 300_000_000_000_000,
      // mining: {
      //   auto: false,
      //   interval: 200,
      // },
    },
    anvil2: {
      url: 'http://localhost:8546',
      chainId: 31337,
      allowUnlimitedContractSize: true,
      blockGasLimit: 300_000_000_000_000,
    },
  },

  paths: {
    cache: './cache_hardhat', // Use a different cache for Hardhat than Foundry
    sources: './contracts',
    artifacts: './artifacts',
  },

  preprocess: {
    eachLine: (hre: any) => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match('"' + find)) {
              line = line.replace('"' + find, '"' + replace);
            }
          });
        }
        return line;
      },
      settings: {},
    }),
  },

  mocha: {
    timeout: 100000000000000,
  },
};

// script copy pasta'd from Foundry book

function getRemappings() {
  return fs
    .readFileSync('remappings.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => line.trim().split('='));
}

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
