import { task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-contract-sizer";

// tasks
import "./tasks/port";
import "./tasks/deploy";
import "./tasks/map";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// to get the smart contract file sizes, run:
// yarn run hardhat size-contracts

export default {
  solidity: "0.8.4",
  // defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337,
      // mining: {
      //   auto: false,
      //   interval: 1000,
      // },
    },
  },
};
