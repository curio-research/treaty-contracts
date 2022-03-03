import { task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-contract-sizer";

// tasks
import "./tasks/port";
import "./tasks/deploy";
import "./tasks/map";
import "./tasks/simulate";
import "./tasks/poll";

// to get the smart contract file sizes, run:
// yarn run hardhat size-contracts

// Add this
const { DEPLOYER_MNEMONIC, ADMIN_PUBLIC_ADDRESS } = process.env;

const opKovan = {
  url: process.env.KOVAN_RPC_URL,
  accounts: {
    mnemonic: DEPLOYER_MNEMONIC,
  },
  chainId: 69,
};

export default {
  solidity: "0.8.4",
  // defaultNetwork: "localhost",

  networks: {
    ...(DEPLOYER_MNEMONIC ? { opKovan } : undefined),
    localhost: {
      url: "http://localhost:8545/",
      accounts: {},
      chainId: 31337,
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

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
