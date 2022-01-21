import { task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

// tasks
import "./tasks/port";
import "./tasks/deploy";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default {
  solidity: "0.8.4",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: true,
        interval: 1000,
      },
    },
  },
};
