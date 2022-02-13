import { blocks, REVERT_MESSAGES } from "./util/constants";
import { expect } from "chai";
import { Game } from "../typechain-types";
import { World, initializeWorld, AllContracts, verifyAt, moveAndVerify, mineAndVerify } from "./util/testWorld";
import { fixtureLoader } from "./util/helper";
import { decodePlayerInventory, decodeTileWithMetadata } from "../util/serde/game";
import { decodeBNArr } from "../util/serde/common";

describe("Game", () => {
  let world: World;
  let contracts: AllContracts;
  let GameContract: Game;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  before(async () => {
    world = await fixtureLoader(worldFixture);
    contracts = world.contracts;
    GameContract = world.contracts.Game;
  });

  it("Player Initialization", async () => {
    await GameContract.connect(world.user1).initializePlayer({ x: 2, y: 1 });
    await GameContract.connect(world.user2).initializePlayer({ x: 4, y: 3 });
    await GameContract.connect(world.user3).initializePlayer({ x: 1, y: 0 });

    await GameContract.connect(world.user1)._increaseItemInInventory(world.user1.address, 1, 10); // start with 10 iron for player 1

    await verifyAt(GameContract, world.user1, 2, 1);
    await verifyAt(GameContract, world.user2, 4, 3);
    await verifyAt(GameContract, world.user3, 1, 0);
  });

  it("Verify map", async () => {
    const mapChunk0 = await GameContract._getMap({ x: 0, y: 0 });
    expect(blocks[0]).eqls(decodeTileWithMetadata(mapChunk0[0]).blocks);
  });

  it("Move", async () => {
    await moveAndVerify(GameContract, world.user1, 3, 2);
    await moveAndVerify(GameContract, world.user1, 5, 3);
  });

  it("Failed move", async () => {
    await verifyAt(GameContract, world.user1, 5, 3); // make sure starting at (5, 3)
    await expect(GameContract.connect(world.user1).move({ x: 4, y: 0 })).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE); // failed move due to distance
    await verifyAt(GameContract, world.user1, 5, 3);
    await expect(GameContract.connect(world.user1).move({ x: 6, y: 3 })).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE); // failed move due to out of bound
    await verifyAt(GameContract, world.user1, 5, 3);
    await expect(GameContract.connect(world.user1).move({ x: 4, y: 3 })).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE); // failed move due to occupied by player2
  });

  it("Place", async () => {
    let player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([1]);
    expect(player1Inventory.itemAmounts).eqls([10]);

    await GameContract.connect(world.user1).place({ x: 2, y: 2 }, 1);
    await GameContract.connect(world.user1).place({ x: 2, y: 0 }, 1);
    player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([1]);
    expect(player1Inventory.itemAmounts).eqls([8]);

    expect(await GameContract._getBlockAtPosition({ x: 2, y: 2 }, 0)).equals(1);
    await expect(GameContract._getBlockAtPosition({ x: 1, y: 1 }, 0)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_Z_INDEX);
  });

  it("Repeated Mine", async () => {
    let player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([1]);
    expect(player1Inventory.itemAmounts).eqls([8]);
    expect(await GameContract._getTopLevelStrengthAtPosition({ x: 2, y: 2 })).equals(50);

    // player attack is 5 and block strength is 50 => expect exactly 10 mines
    // the first 9 mines only decrease strength
    for (let i = 0; i < 9; i++) {
      await GameContract.connect(world.user1).mine({ x: 2, y: 2 });
    }
    player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([1]);
    expect(player1Inventory.itemAmounts).eqls([8]);
    expect(await GameContract._getTopLevelStrengthAtPosition({ x: 2, y: 2 })).equals(5);

    // the last mine successfully mines the item
    await GameContract.connect(world.user1).mine({ x: 2, y: 2 });
    player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([1]);
    expect(player1Inventory.itemAmounts).eqls([9]);

    // no more mines should be possible
    await expect(GameContract.connect(world.user1).mine({ x: 2, y: 2 })).to.be.revertedWith(REVERT_MESSAGES.ENGINE_NONEXISTENT_BLOCK);
  });

  /**
   * Below are tests for mine, place, and craft based on a different item list.
   * FIXME: restore later
   */

  // it("Mine and Place", async () => {
  //   await mineAndVerify(GameContract, world.user1, 0, 0, 0, 0); // mine block at (0, 0)

  //   const player1Inventory = await GameContract._getInventoryByPlayer(world.user1.address);
  //   expect(decodeBNArr(player1Inventory.craftItemIds)).eqls([6]);
  //   expect(decodeBNArr(player1Inventory.craftItemAmounts)).eqls([1]);
  // });

  // it("Craft", async () => {
  //   expect(await GameContract._getItemAmountById(world.user1.address, 6)).to.be.equals(1);

  //   await GameContract.connect(world.user1).craft(12); // craft 1 block2
  //   expect(await GameContract._getItemAmountById(world.user1.address, 6)).equals(0); // check inventory post-crafting
  //   expect(await GameContract._getItemAmountById(world.user1.address, 12)).equals(1);

  //   await expect(GameContract.connect(world.user1).craft(100)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_NONEXISTENT_BLOCK);
  //   await expect(GameContract.connect(world.user1).craft(12)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INSUFFICIENT_MATERIAL);
  // });

  // it("Attack", async () => {
  //   // this takes extra long for some reason (5000 ms). probably nothing but noting here
  //   // verify that player starts with 100 health
  //   let user2Data = await GameContract._getAllPlayerData(world.user2.address);
  //   expect(user2Data.health).equals(100);

  //   // user1 attacks user2
  //   await GameContract.connect(world.user1).attack(world.user2.address);
  //   user2Data = await GameContract._getAllPlayerData(world.user2.address);
  //   expect(user2Data.health).equals(95);

  //   // invalid attack because 5 seconds have not passed
  //   await expect(GameContract.connect(world.user1).attack(world.user2.address)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_ATTACK);

  //   // invalid attack because of distance
  //   await expect(GameContract.connect(world.user1).attack(world.user3.address)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_ATTACK);

  //   // TODO: There's a native way for the local blockchain to speed up x seconds using hardhat library. ideally switch to that for accuracy
  // increaseBlockchainTime(5000)

  //   await GameContract.connect(world.user1).attack(world.user2.address);
  //   user2Data = await GameContract._getAllPlayerData(world.user2.address);
  //   expect(user2Data.health).equals(90);
  // });
});
