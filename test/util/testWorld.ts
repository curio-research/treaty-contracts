import { TowerGame } from "./../../typechain-types/TowerGame";
import { GameStorage } from "./../../typechain-types/GameStorage";
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
  GameStorage: GameStorage;
  Getters: Getters;
  Tower: TowerGame;
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
  // const GameContract = await deployContract<Game>("Game", GAME_DEPLOY_TEST_ARGS);
  // const GettersContract = await deployContract<Getters>("Getters", [GameContract.address]);
  // const EpochContract = await deployContract<Epoch>("Epoch", [30]);

  const GameStorage = await deployContract<GameStorage>("GameStorage", []);
  const GameContract = await deployContract<Game>("Game", [...GAME_DEPLOY_TEST_ARGS, GameStorage.address]);
  const TowerContract = await deployContract<TowerGame>("TowerGame", [GameStorage.address]);
  const GettersContract = await deployContract<Getters>("Getters", [GameContract.address, GameStorage.address]);
  const EpochContract = await deployContract<Epoch>("Epoch", [30]);

  return {
    contracts: {
      Game: GameContract,
      GameStorage: GameStorage,
      Getters: GettersContract,
      Tower: TowerContract,
      Epoch: EpochContract,
    },
    user1: signer1,
    user2: signer2,
    user3: signer3,
  };
};

// helper functions
export const moveAndVerify = async (game: Game, gameStorage: GameStorage, signer: SignerWithAddress, position: position) => {
  await game.connect(signer).move(position);
  await verifyAt(gameStorage, signer, position);
};

export const verifyAt = async (gameStorage: GameStorage, signer: SignerWithAddress, position: position) => {
  const pos = (await gameStorage.connect(signer)._getPlayer(signer.address)).position;
  expect(pos.x).equals(position.x);
  expect(pos.y).equals(position.y);
};

export const mineAndVerify = async (game: Game, gameStorage: GameStorage, signer: SignerWithAddress, x: number, y: number, z: number, initialInventory: number) => {
  // TODO: Remove this. initialInventory should be auto fetched instead of a parameter
  // verify initial inventory
  const blockId = await gameStorage.connect(signer)._getBlockAtPosition({ x, y }, z);
  await expect(await gameStorage.connect(signer)._getItemAmountById(signer.address, blockId)).equals(initialInventory);

  await game.connect(signer).mine({ x, y });

  // verify block adds to player's inventory
  await expect(await gameStorage.connect(signer)._getItemAmountById(signer.address, blockId)).equals(initialInventory + 1);

  // verify block is indeed mined
  await expect(gameStorage._getBlockAtPosition({ x, y }, z)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_Z_INDEX);

  // verify that player cannot mine blocks at same position
  await expect(game.connect(signer).mine({ x, y })).to.be.revertedWith(REVERT_MESSAGES.ENGINE_NONEXISTENT_BLOCK);

  return blockId;
};
