import { serializeTileWithMetadata } from "./util/serializer";
import { blocks, REVERT_MESSAGES } from "./util/constants";
import { Game } from "../typechain-types";
import { expect } from "chai";
import { World, initializeWorld, AllContracts, verifyAt, moveAndVerify, mineAndVerify } from "./util/testWorld";
import { fixtureLoader, serializeBigNumberArr } from "./util/helper";
import { decodePlayerInventory } from "../util/serde/game";

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
    await GameContract.connect(world.user1).initializePlayer(2, 1);
    await GameContract.connect(world.user2).initializePlayer(4, 3);
    await GameContract.connect(world.user3).initializePlayer(1, 0);

    await GameContract.connect(world.user1)._increaseItemInInventory(world.user1.address, 6, 10); // start with 10 woods for player 1

    await verifyAt(GameContract, world.user1, 2, 1);
    await verifyAt(GameContract, world.user2, 4, 3);
    await verifyAt(GameContract, world.user3, 1, 0);
  });

  it("Verify map", async () => {
    const mapChunk0 = await GameContract._getMap(0, 0);
    expect(blocks[0]).eqls(serializeTileWithMetadata(mapChunk0[0]).blocks);
  });

  it("Move", async () => {
    await moveAndVerify(GameContract, world.user1, 3, 2);
    await moveAndVerify(GameContract, world.user1, 5, 3);
  });

  it("Failed move", async () => {
    await verifyAt(GameContract, world.user1, 5, 3); // make sure starting at (5, 3)
    await expect(GameContract.connect(world.user1).move(4, 0)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE); // failed move due to distance
    await verifyAt(GameContract, world.user1, 5, 3);
    await expect(GameContract.connect(world.user1).move(6, 3)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE); // failed move due to out of bound
    await verifyAt(GameContract, world.user1, 5, 3);
    await expect(GameContract.connect(world.user1).move(4, 3)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE); // failed move due to occupied by player2
  });

  it("Place", async () => {
    let player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([6]);
    expect(player1Inventory.itemAmounts).eqls([10]);

    await GameContract.connect(world.user1).place(2, 2, 6);
    await GameContract.connect(world.user1).place(2, 0, 6);
    player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([6]);
    expect(player1Inventory.itemAmounts).eqls([8]);

    expect(await GameContract._getBlockAtPosition(2, 2, 0)).equals(6);
    await expect(GameContract._getBlockAtPosition(1, 1, 0)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_Z_INDEX);
  });

  it("Repeated Mine", async () => {
    let player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([6]);
    expect(player1Inventory.itemAmounts).eqls([8]);
    expect(await GameContract._getTopLevelStrengthAtPosition(2, 2)).equals(50);

    // player attack is 5 and block strength is 50 => expect exactly 10 mines
    // the first 9 mines only decrease strength
    for (let i = 0; i < 9; i++) {
      await GameContract.connect(world.user1).mine(2, 2, 0);
    }
    player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([6]);
    expect(player1Inventory.itemAmounts).eqls([8]);
    expect(await GameContract._getTopLevelStrengthAtPosition(2, 2)).equals(5);

    // the last mine successfully mines the item
    await GameContract.connect(world.user1).mine(2, 2, 0);
    player1Inventory = decodePlayerInventory(await GameContract._getInventoryByPlayer(world.user1.address));
    expect(player1Inventory.itemIds).eqls([6]);
    expect(player1Inventory.itemAmounts).eqls([9]);

    // no more mines should be possible
    await expect(GameContract.connect(world.user1).mine(2, 2, 0)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_NONEXISTENT_BLOCK);
  });

  /**
   * Below are tests for mine, place, and craft based on a different item list.
   * FIXME: restore later
   */

  // it("Mine and Place", async () => {
  //   await mineAndVerify(GameContract, world.user1, 0, 0, 0, 0); // mine block at (0, 0)

  //   const player1Inventory = await GameContract._getInventoryByPlayer(world.user1.address);
  //   expect(serializeBigNumberArr(player1Inventory.craftItemIds)).eqls([6]);
  //   expect(serializeBigNumberArr(player1Inventory.craftItemAmounts)).eqls([1]);
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
  //   await delay(5000);

  //   await GameContract.connect(world.user1).attack(world.user2.address);
  //   user2Data = await GameContract._getAllPlayerData(world.user2.address);
  //   expect(user2Data.health).equals(90);
  // });
});
