import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { AddTreatyTemplateArgs } from './util/types';
import { deployTreatyTemplate } from './util/deployHelper';
import { chainInfo } from 'curio-vault';

task('addTreatyTemplate', 'add a new treaty template')
  .addParam('diamond', 'game address')
  .addParam('name', 'contract name of treaty template')
  .setAction(async (args: AddTreatyTemplateArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond and parse args
      const { diamond, name } = args;
      const game = await getDiamond(hre, diamond);
      const admin = (await hre.ethers.getSigners())[0];
      const gasLimit = chainInfo[hre.network.name].gasLimit;

      // Set game parameter
      const startTime = performance.now();
      await deployTreatyTemplate(name, admin, hre, game, gasLimit);
      console.log(`Successfully added new treaty template after ${performance.now() - startTime} ms`);
    } catch (err: any) {
      console.log(err.message);
    }
  });
