import { ethers, waffle } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Game, Getters } from "../../typechain-types";
import { BigNumber } from "@ethersproject/bignumber";
import { INITIAL_ITEMS } from "./constants";

export const fixtureLoader = waffle.createFixtureLoader();

// initialize 6 by 6 grid map
const WORLD_WIDTH = 6;
const WORLD_HEIGHT = 6;

// map setup
const MASTER_MAP = [
  [1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0],
];

// list of coordinates
// TODO: Improve map initialization method. This is too tedius
export let positions: unknown[] = [];
for (let i = 0; i < WORLD_WIDTH; i++) {
  for (let j = 0; j < WORLD_HEIGHT; j++) {
    positions.push({ x: i, y: j });
  }
}
// initialize resource types on map
export const blockTypes = MASTER_MAP.flat();

// deploy script
export const deployGameContract = async (): Promise<Game> => {
  let player1: SignerWithAddress;
  [player1] = await ethers.getSigners();

  const _contract: any = await (await ethers.getContractFactory("Game")).deploy(positions, blockTypes, WORLD_WIDTH, WORLD_HEIGHT, INITIAL_ITEMS);

  console.log("Game Core:", _contract.address);
  return _contract;
};

export const deployGettersContract = async (gameCoreAddress: string): Promise<Getters> => {
  const _contract: any = await (await ethers.getContractFactory("Getters")).deploy(gameCoreAddress);
  console.log("Getters Contract:", _contract.address);
  return _contract;
};

export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const serializeBigNumberArr = (arr: BigNumber[]): number[] => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].toNumber());
  }
  return newArr;
};
