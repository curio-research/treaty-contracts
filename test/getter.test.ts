import { decodeBulkGetAllItems, decodeItemWithMetadata } from "./../util/serde/getter";
import { expect } from "chai";
import { items } from "./util/constants";
import { World, initializeWorld, AllContracts } from "./util/testWorld";
import { fixtureLoader } from "./util/helper";
import { decodePlayerInventory } from "../util/serde/game";

// ------------------------------------------------------------
// Getters
// ------------------------------------------------------------

describe("Getters", () => {
  let world: World;
  let c: AllContracts;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  before(async () => {
    world = await fixtureLoader(worldFixture);
    c = world.contracts;

    await c.Game.connect(world.user1).initializePlayer({ x: 1, y: 1 });
    await c.Game.connect(world.user2).initializePlayer({ x: 2, y: 1 });
  });

  it("Bulk fetch craft items", async () => {
    const item1 = decodeItemWithMetadata(await c.GameStorage._getItem(1)); // single getter test
    expect(item1.craftItemIds).eqls(items[1].craftItemIds);
    expect(item1.craftItemAmounts).eqls(items[1].craftItemAmounts);

    const allItems = decodeBulkGetAllItems(await c.Getters.bulkGetAllItems()); // bulk getter test
    expect(allItems.length).equals(items.length);
    expect(allItems[2].craftItemIds).to.eqls(items[2].craftItemIds); // sword
    expect(allItems[2].craftItemAmounts).to.eqls(items[2].craftItemAmounts);
    expect(allItems[0].craftItemIds).to.eqls(items[0].craftItemIds); // cactus
    expect(allItems[0].craftItemAmounts).to.eqls(items[0].craftItemAmounts);
  });

  it("Inventory getter", async () => {
    await c.GameStorage._increaseItemInInventory(world.user1.address, 1, 100);
    await c.GameStorage._increaseItemInInventory(world.user1.address, 2, 200);
    await c.GameStorage._increaseItemInInventory(world.user1.address, 3, 300);

    let res = decodePlayerInventory(await c.GameStorage._getInventoryByPlayer(world.user1.address));
    expect(res.itemIds).to.eqls([1, 2, 3]);
    expect(res.itemAmounts).to.eqls([100, 200, 300]);

    await c.Game.place({ x: 0, y: 1 }, 1); // place block
    res = decodePlayerInventory(await c.GameStorage._getInventoryByPlayer(world.user1.address));
    expect(res.itemIds).to.eql([1, 2, 3]);
    expect(res.itemAmounts[0]).equals(99);

    const block = await c.GameStorage._getBlockAtPosition({ x: 0, y: 1 }, 0);
    expect(block.toNumber()).equals(1);
  });

  it("Bulk fetch player info", async () => {
    const allPlayerAddresses = await c.GameStorage._getAllPlayerAddresses();
    expect(allPlayerAddresses.length).equals(2);

    const allPlayerData = await c.Getters.bulkGetAllPlayerData();

    expect(allPlayerData[0].position.x).equals(1); // verify player1 and player2 data
    expect(allPlayerData[0].position.y).equals(1);
    expect(allPlayerData[0].playerAddr).equals(allPlayerAddresses[0]);

    expect(allPlayerData[1].position.x).equals(2);
    expect(allPlayerData[1].position.y).equals(1);
    expect(allPlayerData[1].playerAddr).equals(allPlayerAddresses[1]);
  });
});
