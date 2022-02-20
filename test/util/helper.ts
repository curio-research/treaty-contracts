import { Contract } from "ethers";
import { ethers, waffle } from "hardhat";
import { FactoryOptions } from "hardhat/types";
import { Epoch, Game, Getters } from "../../typechain-types";
import { GAME_DEPLOY_TEST_ARGS } from "./constants";

export const fixtureLoader = waffle.createFixtureLoader();

export const deployContract = async <C extends Contract>(contractName: string, contractArgs: unknown[], libs?: FactoryOptions["libraries"]): Promise<C> => {
  const _factory = libs 
    ? await ethers.getContractFactory(contractName, {libraries: libs})
    : await ethers.getContractFactory(contractName);
  
  const _contract: any = await (_factory).deploy(...contractArgs);
  console.log(`${contractName}: ${_contract.address}`);
  return _contract as C;
};

// increase blockchain time in seconds
export async function increaseBlockchainTime(interval: number) {
  await ethers.provider.send("evm_increaseTime", [interval]);
  await ethers.provider.send("evm_mine", []);
}
