import { expect } from "chai";
import { INITIAL_ITEMS, REVERT_MESSAGES } from "./util/constants";
import { Game, Getters } from "../typechain-types";
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
  });

  it("Bulk getter", async () => {
    // single getter test
    const item1 = await contracts.Game._getItemWithMetadata(1);
    expect(serializeBigNumberArr(item1.materialIds)).to.eqls(INITIAL_ITEMS[0].materialIds);
    expect(serializeBigNumberArr(item1.materialAmounts)).to.eqls(INITIAL_ITEMS[0].materialAmounts);

    // bulk getter test
    const allItems = await Getters.bulkGetAllItems();
    expect(serializeBigNumberArr(allItems[0].materialIds)).to.eqls(INITIAL_ITEMS[0].materialIds); // item 1
    expect(serializeBigNumberArr(allItems[0].materialAmounts)).to.eqls(INITIAL_ITEMS[0].materialAmounts);
    expect(serializeBigNumberArr(allItems[1].materialIds)).to.eqls(INITIAL_ITEMS[1].materialIds); // item 2
    expect(serializeBigNumberArr(allItems[1].materialAmounts)).to.eqls(INITIAL_ITEMS[1].materialAmounts);
  });
});
