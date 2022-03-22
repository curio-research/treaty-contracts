import { generateAllGameArgs } from './util/allArgsGenerator';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { gameItems } from './util/itemGenerator';
import { ITEM_RATIO } from './util/constants';
import { task } from 'hardhat/config';

task('map', 'generate maps').setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
  const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat';
  //   await hre.run("compile");

  const allGameArgs = generateAllGameArgs(gameItems, ITEM_RATIO);
});
