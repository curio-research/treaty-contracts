import { Epoch } from "./../../typechain-types/Epoch";
import { expect } from "chai";
import { deployContract } from "./helper";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Game, Getters } from "../../typechain-types";
import { GAME_DEPLOY_TEST_ARGS, REVERT_MESSAGES } from "./constants";
import { position } from "../../util/types/common";

export interface AllContracts {
  Game: Game;
  Getters: Getters;
  Epoch: Epoch;
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
  const GameContract = await deployContract<Game>("Game", GAME_DEPLOY_TEST_ARGS);
  const GettersContract = await deployContract<Getters>("Getters", [GameContract.address]);
  const EpochContract = await deployContract<Epoch>("Epoch", [30]);

  return {
    contracts: {
      Game: GameContract,
      Getters: GettersContract,
      Epoch: EpochContract,
    },
    user1: signer1,
    user2: signer2,
    user3: signer3,
  };
};

// helper functions
export const moveAndVerify = async (game: Game, signer: SignerWithAddress, position: position) => {
  await game.connect(signer).move(position);
  await verifyAt(game, signer, position);
};

export const verifyAt = async (game: Game, signer: SignerWithAddress, position: position) => {
  const pos = await game.connect(signer)._getPlayerPosition(signer.address);
  expect(pos.x).equals(position.x);
  expect(pos.y).equals(position.y);
};

export const mineAndVerify = async (game: Game, signer: SignerWithAddress, x: number, y: number, z: number, initialInventory: number) => {
  // TODO: Remove this. initialInventory should be auto fetched instead of a parameter
  // verify initial inventory
  const blockId = await game.connect(signer)._getBlockAtPosition({ x, y }, z);
  await expect(await game.connect(signer)._getItemAmountById(signer.address, blockId)).equals(initialInventory);

  await game.connect(signer).mine({ x, y });

  // verify block adds to player's inventory
  await expect(await game.connect(signer)._getItemAmountById(signer.address, blockId)).equals(initialInventory + 1);

  // verify block is indeed mined
  await expect(game._getBlockAtPosition({ x, y }, z)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_Z_INDEX);

  // verify that player cannot mine blocks at same position
  await expect(game.connect(signer).mine({ x, y })).to.be.revertedWith(REVERT_MESSAGES.ENGINE_NONEXISTENT_BLOCK);

  return blockId;
};
