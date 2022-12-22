import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { UnlockTileArgs } from './util/types';
import { confirmTx } from './util/deployHelper';

task('unlockTiles', 'unlock all tiles')
  .addParam('diamond', 'game address')
  .setAction(async (args: UnlockTileArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Read variables from run flags
      const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat' || hre.network.name === 'altlayer' || hre.network.name === 'tailscale';
      console.log('Network:', hre.network.name);

      // Get diamond
      const { diamond } = args;
      const game = await getDiamond(hre, diamond);

      // Unlock all tiles
      await confirmTx(await game.unlockAllTiles(), hre);
    } catch (err: any) {
      console.log(err.message);
    }
  });
