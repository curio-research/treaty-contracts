// import { HardhatRuntimeEnvironment } from 'hardhat/types';
// import { task } from 'hardhat/config';
// import { getDiamond } from './util/diamondDeploy';
// import { AddTreatyTemplateArgs } from './util/types';
// import { confirmTx } from './util/deployHelper';

// task('addTreatyTemplate', 'add a new treaty template')
//   .addParam('diamond', 'game address')
//   .addParam('duration', 'idle duration')
//   .setAction(async (args: AddTreatyTemplateArgs, hre: HardhatRuntimeEnvironment) => {
//     try {
//       // Log network
//       console.log('Network:', hre.network.name);

//       // Get diamond and parse args
//       const { diamond, duration } = args;
//       const game = await getDiamond(hre, diamond);

//       // Set game parameter
//       const startTime = performance.now();
//       await confirmTx(await game.removeIdleNations(duration), hre);
//       console.log(`Successfully removed players idle for ${duration} seconds after ${performance.now() - startTime} ms`);
//     } catch (err: any) {
//       console.log(err.message);
//     }
//   });
