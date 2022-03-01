import { generateAllGameArgs } from "./util/allArgsGenerator";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";

task("map", "generate maps").setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
  const isDev = hre.network.name === "localhost" || hre.network.name === "hardhat";
  //   await hre.run("compile");

  const allGameArgs = generateAllGameArgs();
  console.log(allGameArgs.allTowerArgs);
});
