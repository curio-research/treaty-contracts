import { expect } from "chai";
import { deployGameContract, deployGettersContract } from "./helper";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Game, Getters } from "../../typechain-types";

export interface AllContracts {
  Game: Game;
  Getters: Getters;
}

export interface World {
  contracts: AllContracts;
  user1: SignerWithAddress;
  user2: SignerWithAddress;
  user3: SignerWithAddress;
}

export const initializeWorld = async (): Promise<World> => {
  const [signer1, signer2, signer3] = await ethers.getSigners();

  // initialize contracts
  const GameContract = await deployGameContract();
  const GettersContract = await deployGettersContract(GameContract.address);

  return {
    contracts: {
      Game: GameContract,
      Getters: GettersContract,
    },
    user1: signer1,
    user2: signer2,
    user3: signer3,
  };
};

// helper functions
export const moveAndVerify = async (game: Game, signer: SignerWithAddress, x: number, y: number) => {
  await game.connect(signer).move(x, y);
  await verifyAt(game, signer, x, y);
};

export const verifyAt = async (game: Game, signer: SignerWithAddress, x: number, y: number) => {
  const position = await game.connect(signer)._getPlayerPosition(signer.address);
  expect(position.x).equals(x);
  expect(position.y).equals(y);
};

export const mineAndVerify = async (game: Game, signer: SignerWithAddress, x: number, y: number, z: number, initialInventory: number) => {
  // verify initial inventory
  const blockId = await game.connect(signer)._getBlockAtPosition(x, y, z);
  await expect(await game.connect(signer)._getItemAmountById(signer.address, blockId)).equals(initialInventory);

  await game.connect(signer).mine(x, y, z);

  // verify block adds to player's inventory
  await expect(await game.connect(signer)._getItemAmountById(signer.address, blockId)).equals(initialInventory + 1);

  // verify block is indeed mined
  await expect(game.connect(signer)._getBlockAtPosition(x, y, z)).to.be.revertedWith("engine/invalid-z-index");

  // verify that player cannot mine blocks at same position
  await expect(game.connect(signer).mine(x, y, z)).to.be.revertedWith("engine/no-blocks-available");

  return blockId;
};
