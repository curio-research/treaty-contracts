import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { WhitelistArgs } from './util/types';
import { getDiamond } from './util/diamondDeploy';

task('whitelist', 'compile and port contracts over to frontend repo')
  .addParam('diamond', 'diamond address')
  .addParam('address', 'address to whitelist')
  .setAction(async (args: WhitelistArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get args and diamond
      const { diamond, address, network } = args;
      const game = await getDiamond(hre, diamond);

      // Whitelist address
      await (await game.addToGameWhitelist(address)).wait();
      console.log(`✦ Whitelist player with address=${address} for game with address=${diamond}`);
    } catch (err: any) {
      console.log(err.message);
    }
  });
