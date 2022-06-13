import { World, initializeWorld, AllContracts } from './util/testWorld';
import { fixtureLoader } from './util/helper';

describe('Game', () => {
  let world: World;
  let c: AllContracts;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  before(async () => {
    world = await fixtureLoader(worldFixture);
    c = world.contracts;
  });

  it('Sample', async () => {});
});
