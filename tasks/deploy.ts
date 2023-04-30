import { L1NFT__factory } from './../typechain-types/factories/L1NFT__factory';
import { L2NFT } from './../typechain-types/L2NFT';
import { L1NFT } from './../typechain-types/L1NFT';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy } from '../util/deployHelper';
import fs from 'fs';
import chalk from 'chalk';

task('deploy', 'deploy contracts')
  .addOptionalParam('port', 'Port contract abis and game info to Vault') // default is to call port
  .addOptionalParam('l1', 'L1 network name') // default is to call port
  .addOptionalParam('l2', 'l2 network name') // default is to call port
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');
    } catch (err) {
      console.log(err);
    }
  });
