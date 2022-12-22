import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { UnlockTileArgs } from './util/types';
import { confirmTx } from './util/deployHelper';

task('unlockTiles', 'unlock all tiles')
  .addParam('diamond', 'game address')
  .setAction(async (args: UnlockTileArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond
      const { diamond } = args;
      const game = await getDiamond(hre, diamond);

      // Unlock all tiles
      const startTime = performance.now();
      await confirmTx(await game.unlockAllTiles(), hre);
      console.log(`Successfully unlocked all tiles after ${performance.now() - startTime} ms`);
    } catch (err: any) {
      console.log(err.message);
    }
  });
