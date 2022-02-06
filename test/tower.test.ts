import { Epoch } from "./../typechain-types/Epoch";
import { expect } from "chai";
import { REVERT_MESSAGES } from "./util/constants";
import { World, initializeWorld } from "./util/testWorld";
import { fixtureLoader, increaseBlockchainTime } from "./util/helper";

// ------------------------------------------------------------
// Tower test
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

  it("Staking", async () => {});
});
