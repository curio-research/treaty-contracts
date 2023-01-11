import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { WhitelistPlayerArgs } from './util/types';
import { confirmTx } from './util/deployHelper';

task('whitelistPlayer', 'whitelist a player for a specific game instance')
  .addParam('diamond', 'game address')
  .addParam('player', 'player address to whitelist')
  .setAction(async (args: WhitelistPlayerArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond
      const { diamond, player } = args;
      const game = await getDiamond(hre, diamond);

      // Whitelist player
      const startTime = performance.now();
      await confirmTx(await game.addToGameWhitelist(player), hre);
      console.log(`Successfully whitelisted player with address ${player} after ${performance.now() - startTime} ms`);
    } catch (err: any) {
      console.log(err.message);
    }
  });
