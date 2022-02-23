import { position } from "./../util/types/common";
import { expect } from "chai";
import { decodePlayerInventory } from "./../util/serde/game";
import { decodeTower } from "./../util/serde/tower";
import { REVERT_MESSAGES } from "./util/constants";
import { World, initializeWorld, AllContracts, EPOCH_INTERVAL } from "./util/testWorld";
import { fixtureLoader, increaseBlockchainTime } from "./util/helper";
import { EMPTY_ADDRESS } from "../util/network/common";
import { tower1, tower2 } from "./util/tower";

// ------------------------------------------------------------
// Towerzzzzz
// ------------------------------------------------------------

describe("Tower", () => {
  let c: AllContracts;
  let world: World;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  before(async () => {
    world = await fixtureLoader(worldFixture);
    c = world.contracts;
  });

  it("Initialize player and towers", async () => {
    await c.Game.connect(world.user1).initializePlayer({ x: 1, y: 1 });
    await c.Game.connect(world.user2).initializePlayer({ x: 1, y: 2 });

    await c.Tower.addTower(tower1.location, tower1.tower);
    await c.Tower.addTower(tower2.location, tower2.tower);

    await c.GameStorage.setEpochController(c.Epoch.address);
  });

  it("Stake", async () => {
    await c.Tower.connect(world.user1).stake(tower1.location, 10); // user1 stakes 10 points to tower1
    expect(decodeTower(await c.Tower.getTowerById(tower1.location)).owner).equals(world.user1.address);
  });

  it("Claim reward", async () => {
    await increaseBlockchainTime(EPOCH_INTERVAL);

    await c.Epoch.updateEpoch();
    expect(await c.Epoch.epoch()).equals(1);

    await c.Tower.connect(world.user1).claimReward(tower1.location); // user1 claims reward

    const player1_inventory = decodePlayerInventory(await c.GameStorage._getInventoryByPlayer(world.user1.address)); // check player1 inventory
    expect(player1_inventory.itemIds).eqls([1]);
    expect(player1_inventory.itemAmounts).eqls([tower1.tower.rewardPerEpoch]);
  });

  it("Faulty claim", async () => {
    expect(c.Tower.connect(world.user2).claimReward(tower1.location)).to.be.revertedWith(REVERT_MESSAGES.TOWER_INVALID_OWNER); // user2 tries to claim the tower user1 owns
  });

  it("Tower overtake and claim reward", async () => {
    await increaseBlockchainTime(EPOCH_INTERVAL);
    await c.Epoch.updateEpoch();

    expect(c.Tower.connect(world.user2).stake(tower1.location, 9)).to.be.revertedWith(REVERT_MESSAGES.TOWER_INSUFFICIENT_STAKE); // user2 fails to try to stake 9 points (less than 10)

    const STAKE_AMOUNT = 11;
    await c.Tower.connect(world.user2).stake(tower1.location, STAKE_AMOUNT); // successful stake. 11 is greater than 10 points (what user1 staked previously)

    const tower_1 = decodeTower(await c.Tower.getTowerById(tower1.location));
    expect(tower_1.stakedTime).equals(2); // user2 staked at 2nd epoch
    expect(tower_1.stakedAmount).equals(STAKE_AMOUNT); // user2 staked 11 points
    expect(tower_1.owner).equals(world.user2.address); // user2 is the owner of tower1

    const INCREASE_EPOCHS = 2; // increase

    for (let i = 0; i < 2; i++) {
      await increaseBlockchainTime(EPOCH_INTERVAL);
      await c.Epoch.updateEpoch();
    }

    expect(await c.Epoch.epoch()).equals(4); // game is at 4th epoch

    await c.Tower.connect(world.user2).claimReward(tower1.location); // user2 claims reward
    const player2_inventory = decodePlayerInventory(await c.GameStorage._getInventoryByPlayer(world.user2.address)); // check player2 inventory
    expect(player2_inventory.itemIds).eqls([1]);
    expect(player2_inventory.itemAmounts).eqls([INCREASE_EPOCHS * tower1.tower.rewardPerEpoch]);
  });

  it("Unstake", async () => {
    expect(c.Tower.connect(world.user1).unstake(tower1.location, 10)).to.be.revertedWith(REVERT_MESSAGES.TOWER_INVALID_OWNER); // player1 tries to unstake tower
    expect(c.Tower.connect(world.user2).unstake(tower1.location, 100)).to.be.revertedWith(REVERT_MESSAGES.TOWER_UNSTAKE_OVERFLOW); // player2 tries to withdraw too many points

    await c.Tower.connect(world.user2).unstake(tower1.location, 10); // user2 unstakes partial amount
    let tower_1 = decodeTower(await c.Tower.getTowerById(tower1.location));
    expect(tower_1.stakedAmount).equals(1); // check how many points tower has staked now

    await c.Tower.connect(world.user2).unstake(tower1.location, 1); // user2 unstakes all their points left: ;
    tower_1 = decodeTower(await c.Tower.getTowerById(tower1.location));
    expect(tower_1.stakedAmount).equals(0); // check how many points tower has staked now
    expect(tower_1.owner).equals(EMPTY_ADDRESS); // tower1 should have no owner left
  });

  it("Add add boost effect", async () => {
    let player2_inventory = decodePlayerInventory(await c.GameStorage._getInventoryByPlayer(world.user2.address)); // check player1 inventory

    const blockLeftOfTower: position = { x: tower1.location.x - 1, y: tower1.location.y };
    await c.GameStorage._place(blockLeftOfTower, 5);

    await c.Tower.connect(world.user2).stake(tower1.location, 1);
    const tower_1 = decodeTower(await c.Tower.getTowerById(tower1.location));
    expect(tower_1.owner).equals(world.user2.address);

    await increaseBlockchainTime(EPOCH_INTERVAL);
    await c.Epoch.updateEpoch();

    await c.Tower.connect(world.user2).claimReward(tower1.location); // user2 claims reward

    player2_inventory = decodePlayerInventory(await c.GameStorage._getInventoryByPlayer(world.user2.address));
    expect(player2_inventory.itemAmounts).eqls([tower1.tower.rewardPerEpoch * 4]);
  });

  it("Add block effect", async () => {
    const blockRightOfTower: position = { x: tower1.location.x + 1, y: tower1.location.y };
    await c.GameStorage._place(blockRightOfTower, 6);

    await c.Tower.connect(world.user2).stake(tower1.location, 20);

    await increaseBlockchainTime(EPOCH_INTERVAL);
    await c.Epoch.updateEpoch();

    const inventoryBeforeStake = decodePlayerInventory(await c.GameStorage._getInventoryByPlayer(world.user2.address));
    await c.Tower.connect(world.user2).claimReward(tower1.location); // user2 claims reward

    const player2_inventory = decodePlayerInventory(await c.GameStorage._getInventoryByPlayer(world.user2.address)); // check player2 inventory
    expect(player2_inventory.itemAmounts).eqls(inventoryBeforeStake.itemAmounts);
  });
});
