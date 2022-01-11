import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
import { task } from "hardhat/config";
import * as path from "path";
import * as fs from "fs/promises";

task("port", "compile and port contracts over to frontend repo").setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
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

  // port typechain files as well
  const clientTypechainDir = path.join(__dirname, "../../frontend/src/network/typechain");
  const localTypechainDir = path.join(__dirname, "../typechain-types");

  await fs.copyFile(path.join(localTypechainDir, "common.ts"), path.join(clientTypechainDir, "common.ts"));
  await fs.copyFile(path.join(localTypechainDir, "Game.ts"), path.join(clientTypechainDir, "Game.ts"));
  await fs.copyFile(path.join(localTypechainDir, "Getters.ts"), path.join(clientTypechainDir, "Getters.ts"));

  console.log("Porting complete!");
});
