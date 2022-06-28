import fs from 'fs';
import 'hardhat-diamond-abi';
import { task } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-contract-sizer';
import 'hardhat-preprocessor';
require('dotenv').config();

// tasks
import './tasks/port';
import './tasks/deploy';
import './tasks/epoch';
import './tasks/mapGen';

// to get the smart contract file sizes, run:
// yarn run hardhat size-contracts

// Add this
const { USER1_PK, USER2_PK, KOVAN_RPC_URL, GNOSIS_OPTIMISM_RPC_URL, LOCALHOST_USER1_PK, LOCALHOST_USER2_PK } = process.env;

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
    // This plugin will combine all ABIs from any Smart Contract with `Facet` in the name or path and output it as `Curio.json`
    name: 'Curio',
    include: ['Facet', 'Util'],
    // We explicitly set `strict` to `true` because we want to validate our facets don't accidentally provide overlapping functions
    strict: true,
    // We use our diamond utils to filter some functions we ignore from the combined ABI
    // filter(abiElement, index, abi, fullyQualifiedName) {
    //   const signature = diamondUtils.toSignature(abiElement);
    //   return diamondUtils.isIncluded(fullyQualifiedName, signature);
    // },
  },

  networks: {
    optimismKovan: {
      url: KOVAN_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 69,
    },
    // tailscale: {
    //   url: 'http://100.108.189.54:8545',
    //   accounts: [LOCALHOST_USER1_PK, LOCALHOST_USER2_PK],
    //   chainId: 1337,
    // },
    gnosisOptimism: {
      url: GNOSIS_OPTIMISM_RPC_URL,
      accounts: [USER1_PK, USER2_PK],
      chainId: 300,
    },
    hardhat: {
      chainId: 1337,
      mining: {
        auto: true,
        // interval: 500,
      },
    },
  },

  paths: {
    cache: './cache_hardhat', // Use a different cache for Hardhat than Foundry
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
