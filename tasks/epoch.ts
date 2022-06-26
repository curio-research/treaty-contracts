import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { setTaskActiveMode } from '../api/deployment';

task('epoch', 'deploy contracts')
  .addParam('chain', 'which chain') // default is to call port
  .addParam('address', 'which address') // default is to call publish
  .addParam('active', 'Use deterministic map') // default is non-deterministic maps
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      const network = args.chain;
      const address = args.address;
      const active = args.active;

      await setTaskActiveMode(network, address, active);
    } catch (err) {
      console.log(err);
    }
  });
