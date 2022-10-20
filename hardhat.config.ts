import 'hardhat-diamond-abi';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import fs from 'fs';
import { task } from 'hardhat/config';
import 'hardhat-contract-sizer';
import 'hardhat-preprocessor';
require('dotenv').config();

// tasks
import './tasks/port';
import './tasks/deploy';
import './tasks/mapGen';

// to get the file size of each smart contract, run:
// yarn run hardhat size-contracts

const { USER1_PK, USER2_PK, OPTIMISM_KOVAN_RPC_URL, GNOSIS_OPTIMISM_RPC_URL, GNOSIS_RPC_URL, LOCALHOST_USER1_PK, LOCALHOST_USER2_PK, CONSTELLATION_RPC_URL, TAILSCALE_MAIN, ALTLAYER_RPC_URL, CONSTELLATIONNEW_RPC_URL, EXFAC_RPC_URL } = process.env;

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
  diamondAbi: {
    name: 'Curio',
    include: ['Facet', 'Util', 'ECSLib'],
    strict: true, // check for overlapping function names
  },

  networks: {
    optimismKovan: {
      url: OPTIMISM_KOVAN_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 69,
    },
    tailscale: {
      url: `${TAILSCALE_MAIN}:8545`,
      accounts: [LOCALHOST_USER1_PK, LOCALHOST_USER2_PK],
      chainId: 31337,
    },
    gnosisOptimism: {
      url: GNOSIS_OPTIMISM_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 300,
    },
    gnosis: {
      url: GNOSIS_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 100,
    },
    constellation: {
      url: CONSTELLATION_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 2901,
    },
    constellationNew: {
      url: CONSTELLATIONNEW_RPC_URL,
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
