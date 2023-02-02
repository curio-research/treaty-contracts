import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { UpgradeFacetArgs } from './util/types';
import { confirmTx } from './util/deployHelper';

task('upgradeFacet', 'upgrade diamond facet')
  .addParam('diamond', 'game address')
  .setAction(async (args: UpgradeFacetArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond
      const { diamond } = args;
      const game = await getDiamond(hre, diamond);

      // Deploy new facet
      const facets = [
        { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
        { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
        { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
      ];
    } catch (err: any) {
      console.log(err.message);
    }
  });
