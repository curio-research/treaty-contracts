import { expect } from "chai";
import { INITIAL_ITEMS } from "./util/constants";
import { Getters } from "../typechain-types";
import { World, initializeWorld, AllContracts, verifyAt, moveAndVerify, mineAndVerify } from "./util/testWorld";
import { fixtureLoader, serializeBigNumberArr } from "./util/helper";

describe("Getter Contract", () => {
  let world: World;
  let contracts: AllContracts;
  let Getters: Getters;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);

    // fixtures are "snapshots" of the world at a certain moment
    // here we can add fixtures such as player movements etc for advanced testing in the near future

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
    const item1 = await contracts.Game._getItemWithMetadata(1);
    expect(serializeBigNumberArr(item1.materialIds)).to.eqls(INITIAL_ITEMS[0].materialIds);
    expect(serializeBigNumberArr(item1.materialAmounts)).to.eqls(INITIAL_ITEMS[0].materialAmounts);

    // bulk getter test
    const allItems = await Getters.bulkGetAllItems();
    expect(allItems.length).equals(INITIAL_ITEMS.length);
    expect(serializeBigNumberArr(allItems[0].materialIds)).to.eqls(INITIAL_ITEMS[0].materialIds); // item 1
    expect(serializeBigNumberArr(allItems[0].materialAmounts)).to.eqls(INITIAL_ITEMS[0].materialAmounts);
    expect(serializeBigNumberArr(allItems[1].materialIds)).to.eqls(INITIAL_ITEMS[1].materialIds); // item 2
    expect(serializeBigNumberArr(allItems[1].materialAmounts)).to.eqls(INITIAL_ITEMS[1].materialAmounts);
  });

  it("Bulk fetch player info", async () => {
    const allPlayerAddresses = await contracts.Game._getAllPlayerAddresses();
    expect(allPlayerAddresses.length).equals(2);

    const allPlayerData = await Getters.bulkGetAllPlayerData();

    // verify player1 and player2 data
    expect(allPlayerData[0].position.x).equals(1);
    expect(allPlayerData[0].position.y).equals(1);
    expect(allPlayerData[0].a).equals(allPlayerAddresses[0]);

    expect(allPlayerData[1].position.x).equals(2);
    expect(allPlayerData[1].position.y).equals(1);
    expect(allPlayerData[1].a).equals(allPlayerAddresses[1]);
  });
});
