import { Epoch } from "./../typechain-types/Epoch";
import { expect } from "chai";
import { REVERT_MESSAGES } from "./util/constants";
import { World, initializeWorld } from "./util/testWorld";
import { fixtureLoader, increaseBlockchainTime } from "./util/helper";

// ------------------------------------------------------------
// Epoch test
// ------------------------------------------------------------

describe("Epoch", () => {
  let world: World;
  let epoch: Epoch;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  before(async () => {
    world = await fixtureLoader(worldFixture);
    epoch = world.contracts.Epoch;
  });

  it("Epoch", async () => {
    expect(await epoch.epoch()).equals(0);
    expect(await epoch.interval()).equals(30);

    await expect(epoch.updateEpoch()).to.be.revertedWith(REVERT_MESSAGES.EPOCH_PREMATURE);

    increaseBlockchainTime(30);

    await epoch.updateEpoch();
    expect(await epoch.epoch()).equals(1);
  });
});
