import { HardhatArguments, HardhatRuntimeEnvironment, RunSuperFunction, TaskArguments } from "hardhat/types";
import { task } from "hardhat/config";
import * as path from "path";
import * as fsPromise from "fs/promises";
import * as fs from "fs";

// copy folder
const copyFolderSync = (from: string, to: string) => {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach((element) => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
};

task("port", "compile and port contracts over to frontend repo").setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  console.log("✦ Porting files over ...");

  // read ABI from artifacts folder compiled by Hardhat
  const gameAbi = JSON.stringify((await hre.artifacts.readArtifact("Game")).abi);
  const gettersAbi = JSON.stringify((await hre.artifacts.readArtifact("Getters")).abi);

  const clientAbiDir = path.join(__dirname, "../../frontend/src/network/abi");

  // save contract ABIs to client
  await fsPromise.writeFile(path.join(clientAbiDir, "Game.json"), gameAbi);
  await fsPromise.writeFile(path.join(clientAbiDir, "Getters.json"), gettersAbi);

  // save typechain files
  const clientTypechainDir = path.join(__dirname, "../../frontend/src/network/typechain-types");
  const localTypechainDir = path.join(__dirname, "../typechain-types");

  await fs.rmdirSync(clientTypechainDir, { recursive: true });
  copyFolderSync(localTypechainDir, clientTypechainDir);

  const configFileDir = path.join(__dirname, "/game.config.json");
  const configClientDir = path.join(__dirname, "../../frontend/src/game.config.json");

  await fs.copyFileSync(configFileDir, configClientDir);

  console.log("✦ Porting complete!");
});
