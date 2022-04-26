import 'hardhat-diamond-abi';
import { task } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-contract-sizer';
require('dotenv').config();

// tasks
import './tasks/mapgen';
import './tasks/port';
import './tasks/deploy';
import './tasks/simulate';
import './tasks/poll';

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
  diamondAbi: {
    // This plugin will combine all ABIs from any Smart Contract with `Facet` in the name or path and output it as `Curio.json`
    name: 'Curio',
    include: ['Facet'],
    // We explicitly set `strict` to `true` because we want to validate our facets don't accidentally provide overlapping functions
    // strict: true,
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
