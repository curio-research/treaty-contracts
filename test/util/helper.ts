import { ethers, waffle } from "hardhat";
import { Epoch, Game, Getters } from "../../typechain-types";
import { BigNumber } from "@ethersproject/bignumber";
import { GAME_DEPLOY_TEST_ARGS } from "./constants";

export const fixtureLoader = waffle.createFixtureLoader();

// deploy script
export const deployGameContract = async (): Promise<Game> => {
  const _contract: any = await (await ethers.getContractFactory("Game")).deploy(...GAME_DEPLOY_TEST_ARGS);
  console.log("Game Core:", _contract.address);
  return _contract;
};

export const deployGettersContract = async (gameCoreAddress: string): Promise<Getters> => {
  const _contract: any = await (await ethers.getContractFactory("Getters")).deploy(gameCoreAddress);
  console.log("Getters Contract:", _contract.address);
  return _contract;
};

export const deployEpochContract = async (interval: number): Promise<Epoch> => {
  const _contract: any = await (await ethers.getContractFactory("Epoch")).deploy(interval);
  console.log("Epoch contract", _contract.address);
  return _contract;
};

export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

// increase blockchain time in seconds
export async function increaseBlockchainTime(interval: number) {
  await ethers.provider.send("evm_increaseTime", [interval]);
  await ethers.provider.send("evm_mine", []);
}

export const serializeBigNumberArr = (arr: BigNumber[]): number[] => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].toNumber());
  }
  return newArr;
};
