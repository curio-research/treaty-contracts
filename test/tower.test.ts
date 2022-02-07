import { expect } from "chai";
import { decodePlayerInventory } from "./../util/serde/game";
import { decodeTower } from "./../util/serde/tower";
import { Game } from "./../typechain-types/Game";
import { Epoch } from "./../typechain-types/Epoch";
import { EMPTY_ADDRESS, REVERT_MESSAGES } from "./util/constants";
import { World, initializeWorld } from "./util/testWorld";
import { fixtureLoader, increaseBlockchainTime } from "./util/helper";
import { TowerWithLocation } from "../util/types/tower";

// ------------------------------------------------------------
// Tower test
// ------------------------------------------------------------

const tower1: TowerWithLocation = {
  location: {
    x: 0,
    y: 0,
  },
  tower: {
    rewardPerEpoch: 100,
    itemId: 1,
    stakedAmount: 0,
    stakedTime: 0,
    owner: EMPTY_ADDRESS,
  },
};

const tower2: TowerWithLocation = {
  location: {
    x: 1,
    y: 1,
  },
  tower: {
    rewardPerEpoch: 200,
    itemId: 2,
    stakedAmount: 0,
    stakedTime: 0,
    owner: EMPTY_ADDRESS,
  },
};

describe("Tower", () => {
  let world: World;
  let epoch: Epoch;
  let game: Game;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  before(async () => {
    world = await fixtureLoader(worldFixture);
    game = world.contracts.Game;
    epoch = world.contracts.Epoch;
  });

  it("Setup", async () => {
    await game.connect(world.user1).initializePlayer(2, 1);
    await game.connect(world.user2).initializePlayer(4, 3);

    await game.setEpochController(epoch.address);
  });

  it("Initialize towers", async () => {
    await game.addTower(tower1.location, tower1.tower);
    await game.addTower(tower2.location, tower2.tower);

    const tower_1 = decodeTower(await game.getTowerById(tower1.location));
    const tower_2 = decodeTower(await game.getTowerById(tower2.location));
    expect(tower_1).eqls(tower1.tower);
    expect(tower_2).eqls(tower2.tower);
  });

  it("Stake", async () => {
    await game.connect(world.user1).stake(tower1.location, 10); // user1 stakes 10 points to tower1
    const tower_1 = decodeTower(await game.getTowerById(tower1.location));
    expect(tower_1.owner).equals(world.user1.address);
  });

  it("Claim reward", async () => {
    await increaseBlockchainTime(30); // increase 1 epoch

    await epoch.updateEpoch();
    expect(await epoch.epoch()).equals(1);

    await game.connect(world.user1).claimReward(tower1.location); // user1 claims reward

    const player1_inventory = decodePlayerInventory(await game._getInventoryByPlayer(world.user1.address)); // check player1 inventory
    expect(player1_inventory.itemIds).eqls([1]);
    expect(player1_inventory.itemAmounts).eqls([tower1.tower.rewardPerEpoch]);
  });

  it("Faulty claim", async () => {
    expect(game.connect(world.user2).claimReward(tower1.location)).to.be.revertedWith(REVERT_MESSAGES.TOWER_INVALID_OWNER); // user2 tries to claim the tower user1 owns
  });

  it("Tower overtake and claim reward", async () => {
    await increaseBlockchainTime(30); // increase 1 epoch
    await epoch.updateEpoch();

    expect(game.connect(world.user2).stake(tower1.location, 9)).to.be.revertedWith(REVERT_MESSAGES.TOWER_INSUFFICIENT_STAKE); // user2 fails to try to stake 9 points (less than 10)

    await game.connect(world.user2).stake(tower1.location, 11); // successful stake. 11 is greater than 1 points (what user1 staked previously)

    const tower_1 = decodeTower(await game.getTowerById(tower1.location));
    expect(tower_1.stakedTime).equals(2); // user2 staked at 2nd epoch
    expect(tower_1.stakedAmount).equals(11); // user2 staked 11 points
    expect(tower_1.owner).equals(world.user2.address); // user2 is the owner of tower1

    const increase_epochs = 2; // increase

    for (let i = 0; i < increase_epochs; i++) {
      await increaseBlockchainTime(30);
      await epoch.updateEpoch();
    }

    expect(await epoch.epoch()).equals(4); // game is at 4th epoch

    await game.connect(world.user2).claimReward(tower1.location); // user2 claims reward
    const player2_inventory = decodePlayerInventory(await game._getInventoryByPlayer(world.user2.address)); // check player2 inventory
    expect(player2_inventory.itemIds).eqls([1]);
    expect(player2_inventory.itemAmounts).eqls([increase_epochs * tower1.tower.rewardPerEpoch]);
  });

  it("Unstake", async () => {
    expect(game.connect(world.user1).unstake(tower1.location, 10)).to.be.revertedWith(REVERT_MESSAGES.TOWER_INVALID_OWNER); // player1 tries to unstake tower
    expect(game.connect(world.user2).unstake(tower1.location, 100)).to.be.revertedWith(REVERT_MESSAGES.TOWER_UNSTAKE_OVERFLOW); // player2 tries to withdraw too many points

    await game.connect(world.user2).unstake(tower1.location, 10); // user2 unstakes partial amount
    let tower_1 = decodeTower(await game.getTowerById(tower1.location));
    expect(tower_1.stakedAmount).equals(1); // check how many points tower has staked now

    await game.connect(world.user2).unstake(tower1.location, 1); // user2 unstakes all their points left
    tower_1 = decodeTower(await game.getTowerById(tower1.location));
    expect(tower_1.stakedAmount).equals(0); // check how many points tower has staked now
    expect(tower_1.owner).equals(EMPTY_ADDRESS); // tower1 should have no owner left
  });
});
