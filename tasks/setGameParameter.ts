import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { SetGameParameterArgs } from './util/types';
import { confirmTx } from './util/deployHelper';

task('setGameParameter', 'set a game parameter')
  .addParam('diamond', 'game address')
  .addParam('identifier', 'game parameter identifier')
  .addParam('value', 'game parameter value')
  .setAction(async (args: SetGameParameterArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond and parse args
      const { diamond, identifier, value } = args;
      const game = await getDiamond(hre, diamond);

      // Set game parameter
      const startTime = performance.now();
      await confirmTx(await game.setGameParameter(identifier, Number(value)), hre);
      console.log(`Successfully set a game parameter after ${performance.now() - startTime} ms`);
    } catch (err: any) {
      console.log(err.message);
    }
  });
