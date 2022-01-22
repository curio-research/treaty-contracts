import { serializeTileWithMetadata } from "./util/serializer";
import { blocks, EMPTY_ADDRESS, REVERT_MESSAGES } from "./util/constants";
import { Game } from "../typechain-types";
import { expect } from "chai";
import { World, initializeWorld, AllContracts, verifyAt, moveAndVerify, mineAndVerify } from "./util/testWorld";
import { delay, fixtureLoader, serializeBigNumberArr } from "./util/helper";

describe("Game", () => {
  let world: World;
  let contracts: AllContracts;
  let GameContract: Game;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  before(async () => {
    // load world fixture
    world = await fixtureLoader(worldFixture);
    contracts = world.contracts;
    GameContract = world.contracts.Game;
  });

  it("Game Initialization", async () => {
    expect(await GameContract.gameName()).to.be.equal("blocky");
  });

  it("Player Initialization", async () => {
    await GameContract.connect(world.user1).initializePlayer(2, 1);
    await GameContract.connect(world.user2).initializePlayer(4, 3);
    await GameContract.connect(world.user3).initializePlayer(1, 0);

    await verifyAt(GameContract, world.user1, 2, 1);
    await verifyAt(GameContract, world.user2, 4, 3);
    await verifyAt(GameContract, world.user3, 1, 0);
  });

  it("Verify map", async () => {
    // TODO: Add more complex map checkers (perhaps random data sampling. check random locations of map and see if they match)
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

  it("Mine and Place", async () => {
    await mineAndVerify(GameContract, world.user1, 0, 0, 0, 0); // mine block at (0, 0)

    const player1Inventory = await GameContract._getInventoryByPlayer(world.user1.address);
    // TODO: Add dynamic fetcher for blocks. blockId 6 should not be hardcoded
    expect(serializeBigNumberArr(player1Inventory.craftItemIds)).eqls([6]);
    expect(serializeBigNumberArr(player1Inventory.craftItemAmounts)).eqls([1]);
  });

  it("Craft", async () => {
    // await GameContract._getItemAmountById(world.user1.address, 6);
    expect(await GameContract._getItemAmountById(world.user1.address, 6)).to.be.equals(1);

    // craft 1 block2
    await GameContract.connect(world.user1).craft(12);

    const woodAmount = await GameContract._getItemAmountById(world.user1.address, 6);
    const pickaxeAmount = await GameContract._getItemAmountById(world.user1.address, 12);

    expect(woodAmount).equals(0);
    expect(pickaxeAmount).equals(1);

    await expect(GameContract.connect(world.user1).craft(100)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_NONEXISTENT_BLOCK);
    await expect(GameContract.connect(world.user1).craft(12)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INSUFFICIENT_MATERIAL);

    // TODO: Add more advanced crafting tests here
  });

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
