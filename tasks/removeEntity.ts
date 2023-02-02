import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { RemoveEntityArgs } from './util/types';
import { confirmTx } from './util/deployHelper';

task('removeEntity', 'remove idle players')
  .addParam('diamond', 'game address')
  .addParam('id', 'entity id')
  .setAction(async (args: RemoveEntityArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond and parse args
      const { diamond, id } = args;
      const game = await getDiamond(hre, diamond);

      // Remove entity
      const startTime = performance.now();
      await confirmTx(await game.removeEntity(id), hre);
      console.log(`Successfully removed entity ${id} after ${performance.now() - startTime} ms`);
    } catch (err: any) {
      console.log(err.message);
    }
  });
