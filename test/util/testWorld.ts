import { TowerGame } from './../../typechain-types/TowerGame';
import { GameStorage } from './../../typechain-types/GameStorage';
import { Epoch } from './../../typechain-types/Epoch';
import { expect } from 'chai';
import { deployContract } from './helper';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Game, Getters, Helper, Permissions } from '../../typechain-types';
import { blocks, GAME_DEPLOY_TEST_ARGS, MAP_INTERVAL, REVERT_MESSAGES, WORLD_HEIGHT, WORLD_WIDTH } from './constants';
import { position } from '../../util/types/common';

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

export const EPOCH_INTERVAL = 30;

export const initializeWorld = async (): Promise<World> => {
  const [signer1, signer2, signer3] = await ethers.getSigners();

  // initialize contracts
  const GameHelper = await deployContract<Helper>('Helper', []);
  const Permissions = await deployContract<Permissions>('Permissions', [signer1.address]);
  const GameStorage = await deployContract<GameStorage>('GameStorage', [Permissions.address]);
  const GameContract = await deployContract<Game>('Game', [...GAME_DEPLOY_TEST_ARGS, GameStorage.address, Permissions.address]);
  const TowerContract = await deployContract<TowerGame>('TowerGame', [GameStorage.address, Permissions.address], { Helper: GameHelper.address });
  const GettersContract = await deployContract<Getters>('Getters', [GameContract.address, GameStorage.address]);
  const EpochContract = await deployContract<Epoch>('Epoch', [EPOCH_INTERVAL]);

  // initialize blocks
  let regionMap: number[][][];
  for (let x = 0; x < WORLD_WIDTH; x += MAP_INTERVAL) {
    for (let y = 0; y < WORLD_HEIGHT; y += MAP_INTERVAL) {
      regionMap = blocks.slice(x, x + MAP_INTERVAL).map((col) => col.slice(y, y + MAP_INTERVAL));

      GameStorage._setMapRegion({ x, y }, regionMap);
    }
  }

  // add contract permissions
  await Permissions.connect(signer1).setPermission(GameContract.address, true);
  await Permissions.connect(signer1).setPermission(TowerContract.address, true);

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
