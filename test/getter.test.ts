import { expect } from "chai";
import { items, constants, blocks } from "./util/constants";
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

  // it("Bulk fetch map info", async () => {
  //   const [worldWidth, worldHeight, map] = await Getters.bulkGetAllMapInfo();
  //   expect(worldWidth).equals(constants[0]);
  //   expect(worldHeight).equals(constants[1]);

  //   let blockIdx;
  //   for (let i = 0; i < worldWidth.toNumber(); i++) {
  //     for (let j = 0; j < worldHeight.toNumber(); j++) {
  //       blockIdx = i * worldWidth.toNumber() + j;
  //       for (let z = 0; z < blocks[blockIdx].length; z++) {
  //         expect(map[blockIdx].blocks[z]).equals(blocks[blockIdx][z]); // FIXME
  //       }
  //       console.log("ha");
  //     }
  //   }
  // });
});
