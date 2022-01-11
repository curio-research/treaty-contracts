import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
import { task } from "hardhat/config";
import * as path from "path";
import * as fs from "fs/promises";

task("port", "compile and port contracts over to frontend repo").setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
  console.log("Porting files over ...");

  // read ABI from artifacts folder compiled by Hardhat
  const gameAbi = JSON.stringify((await hre.artifacts.readArtifact("Game")).abi);
  const gettersAbi = JSON.stringify((await hre.artifacts.readArtifact("Getters")).abi);

  const clientAbiDir = path.join(__dirname, "../../frontend/src/network/abi");

  // create folder if there is none. not needed for now
  // await fs.mkdir(clientAbiDir);

  // save contract ABIs to client
  await fs.writeFile(path.join(clientAbiDir, "Game.json"), gameAbi);
  await fs.writeFile(path.join(clientAbiDir, "Getters.json"), gettersAbi);

  console.log("Porting complete!");
});
