import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { JustDiamond } from './util/types';
import { confirmTx } from './util/deployHelper';

task('stopGame', 'stop game')
  .addParam('diamond', 'game address')
  .setAction(async (args: JustDiamond, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond and parse args
      const { diamond } = args;
      const game = await getDiamond(hre, diamond);

      // Stop game
      const startTime = performance.now();
      await confirmTx(await game.stopGame(), hre);
      console.log(`Successfully stopped game after ${performance.now() - startTime} ms`);
    } catch (err: any) {
      console.log(err.message);
    }
  });
