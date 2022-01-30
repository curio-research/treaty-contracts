import { RecipeStructOutput } from "./../typechain-types/Minigame";
import { expect } from "chai";
import { items, constants, blocks } from "./util/constants";
import { Getters } from "../typechain-types";
import { World, initializeWorld, AllContracts, verifyAt, moveAndVerify, mineAndVerify } from "./util/testWorld";
import { fixtureLoader, serializeBigNumberArr } from "./util/helper";

// testing data getters, ones including but not limited to Getters.sol

describe("Getters", () => {
  let world: World;
  let contracts: AllContracts;
  let Getters: Getters;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  // load world fixture
  before(async () => {
    world = await fixtureLoader(worldFixture);
    contracts = world.contracts;
    Getters = world.contracts.Getters;

    // initialize players
    await contracts.Game.connect(world.user1).initializePlayer(1, 1);
    await contracts.Game.connect(world.user2).initializePlayer(2, 1);
  });

  it("Bulk fetch craft items", async () => {
    // single getter test
    const item1 = await contracts.Game._getItemWithMetadata(12); // pickaxe
    expect(serializeBigNumberArr(item1.craftItemIds)).to.eqls(items[12].craftItemIds);
    expect(serializeBigNumberArr(item1.craftItemAmounts)).to.eqls(items[12].craftItemAmounts);

    // bulk getter test
    const allItems = await Getters.bulkGetAllItems();
    expect(allItems.length).equals(items.length);
    expect(serializeBigNumberArr(allItems[9].craftItemIds)).to.eqls(items[9].craftItemIds); // workbench
    expect(serializeBigNumberArr(allItems[9].craftItemAmounts)).to.eqls(items[9].craftItemAmounts);
    expect(serializeBigNumberArr(allItems[10].craftItemIds)).to.eqls(items[10].craftItemIds); // shovel
    expect(serializeBigNumberArr(allItems[10].craftItemAmounts)).to.eqls(items[10].craftItemAmounts);
  });

  it("Inventory getter", async () => {
    await contracts.Game._increaseItemInInventory(world.user1.address, 1, 100);
    await contracts.Game._increaseItemInInventory(world.user1.address, 2, 200);
    await contracts.Game._increaseItemInInventory(world.user1.address, 3, 300);

    let res = await contracts.Game._getInventoryByPlayer(world.user1.address);
    expect(serializeBigNumberArr(res.craftItemIds)).to.eqls([1, 2, 3]);
    expect(serializeBigNumberArr(res.craftItemAmounts)).to.eqls([100, 200, 300]);

    // place block
    await contracts.Game.place(0, 1, 1);
    res = await contracts.Game._getInventoryByPlayer(world.user1.address);
    expect(serializeBigNumberArr(res.craftItemIds)).to.eql([1, 2, 3]);
    expect(serializeBigNumberArr(res.craftItemAmounts)[0]).equals(99);

    const block = await contracts.Game._getBlockAtPosition(0, 1, 0);
    expect(block.toNumber()).equals(1);
  });

  it("Bulk fetch player info", async () => {
    const allPlayerAddresses = await contracts.Game._getAllPlayerAddresses();
    expect(allPlayerAddresses.length).equals(2);

    const allPlayerData = await Getters.bulkGetAllPlayerData();

    // verify player1 and player2 data
    expect(allPlayerData[0].position.x).equals(1);
    expect(allPlayerData[0].position.y).equals(1);
    expect(allPlayerData[0].playerAddr).equals(allPlayerAddresses[0]);

    expect(allPlayerData[1].position.x).equals(2);
    expect(allPlayerData[1].position.y).equals(1);
    expect(allPlayerData[1].playerAddr).equals(allPlayerAddresses[1]);
  });
});
