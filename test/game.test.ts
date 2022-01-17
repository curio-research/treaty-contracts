import { serializeTileWithMetadata } from "./util/serializer";
import { blocks, REVERT_MESSAGES } from "./util/constants";
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

    // fixtures are "snapshots" of the world at a certain moment
    // here we can add fixtures such as player movements etc for advanced testing in the near future

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
    const mapChunk0 = await GameContract._getMap(0, 0);
    expect(blocks[0]).eqls(serializeTileWithMetadata(mapChunk0[0]).blocks);
  });

  it("Move", async () => {
    await moveAndVerify(GameContract, world.user1, 3, 2);
    await moveAndVerify(GameContract, world.user1, 5, 3);
  });

  it("Failed move", async () => {
    // make sure starting at (5, 3)
    await verifyAt(GameContract, world.user1, 5, 3);

    // failed move due to distance
    await expect(GameContract.connect(world.user1).move(4, 0)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE);

    // make sure still at (5, 3)
    await verifyAt(GameContract, world.user1, 5, 3);

    // failed move due to out of bound
    await expect(GameContract.connect(world.user1).move(6, 3)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE);

    await verifyAt(GameContract, world.user1, 5, 3);

    // failed move due to occupied by player2
    await expect(GameContract.connect(world.user1).move(4, 3)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_MOVE);
  });

  it("Mine and Place", async () => {
    // mine resource blocks (z = 0)
    await mineAndVerify(GameContract, world.user1, 2, 0, 3, 0);
    const blockId = await mineAndVerify(GameContract, world.user1, 4, 0, 3, 1);

    // check inventory
    const player1Inventory = await GameContract._getInventoryByPlayer(world.user1.address);
    expect(serializeBigNumberArr(player1Inventory.craftItemIds)).eqls([6]);
    expect(serializeBigNumberArr(player1Inventory.craftItemAmounts)).eqls([2]);

    // place block and verify
    await GameContract.connect(world.user1).place(2, 2, blockId);
    expect(await GameContract._getBlockAtPosition(2, 2, 3)).equals(blockId);
    await expect(GameContract.place(5, 3, blockId)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_NOT_STAND_ON_BLOCK);
    await expect(GameContract.place(2, 3, 12)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INSUFFICIENT_INVENT);

    // pick up the block again
    await mineAndVerify(GameContract, world.user1, 2, 2, 3, 1);
  });

  it("Attack", async () => {
    // this takes extra long for some reason (5000 ms). probably nothing but noting here
    // verify that player starts with 100 health
    let user2Data = await GameContract._getAllPlayerData(world.user2.address);
    expect(user2Data.health).equals(100);

    // user1 attacks user2
    await GameContract.connect(world.user1).attack(world.user2.address);
    user2Data = await GameContract._getAllPlayerData(world.user2.address);
    expect(user2Data.health).equals(95);

    // invalid attack because 5 seconds have not passed
    await expect(GameContract.connect(world.user1).attack(world.user2.address)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_ATTACK);

    // invalid attack because of distance
    await expect(GameContract.connect(world.user1).attack(world.user3.address)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INVALID_ATTACK);

    // TODO: There's a native way for the local blockchain to speed up x seconds using hardhat library. ideally switch to that for accuracy
    await delay(5000);

    await GameContract.connect(world.user1).attack(world.user2.address);
    user2Data = await GameContract._getAllPlayerData(world.user2.address);
    expect(user2Data.health).equals(90);
  });

  it("Craft", async () => {
    let woodAmount = await GameContract._getItemAmountById(world.user1.address, 6);
    const stoneAmount = await GameContract._getItemAmountById(world.user1.address, 5);

    expect(woodAmount).equals(2);
    expect(stoneAmount).equals(0);

    // craft 1 block2
    await GameContract.connect(world.user1).craft(12);

    woodAmount = await GameContract._getItemAmountById(world.user1.address, 6);
    const pickaxeAmount = await GameContract._getItemAmountById(world.user1.address, 12);

    expect(woodAmount).equals(0);
    expect(pickaxeAmount).equals(1);

    // TODO: Add "nonexistant block ID" error
    await expect(GameContract.connect(world.user1).craft(12)).to.be.revertedWith(REVERT_MESSAGES.ENGINE_INSUFFICIENT_MATERIAL);

    //  TODO: Add more advanced crafting tests here
  });
});
