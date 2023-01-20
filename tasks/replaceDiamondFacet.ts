import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { getDiamond } from './util/diamondDeploy';
import { ReplaceDiamondFacetArgs } from './util/types';

task('replaceDiamondFacet', 'replace a diamond facet')
  .addParam('diamond', 'game address')
  .addParam('facetname', 'name of facet to replace')
  .setAction(async (args: ReplaceDiamondFacetArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond and parse args
      const { diamond, facetname } = args;
      const game = await getDiamond(hre, diamond);

      // TODO: replace diamond facet
    } catch (err: any) {
      console.log(err.message);
    }
  });
