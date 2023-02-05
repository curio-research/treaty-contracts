import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { UpgradeFacetArgs } from './util/types';
import { confirmTx, deployProxy } from './util/deployHelper';
import { ECSLib } from '../typechain-types/contracts/libraries/ECSLib';
import { GameLib } from '../typechain-types/contracts/libraries/GameLib';
import { FacetCutAction, getSelectors } from './util/diamondHelper';
import { getDiamond } from './util/diamondDeploy';
import { chainInfo } from 'curio-vault';

/**
 * @notice This task is currently only used for testing
 */
task('upgradeFacet', 'upgrade diamond facet')
  .addParam('diamond', 'game address')
  .setAction(async (args: UpgradeFacetArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      const admin = (await hre.ethers.getSigners())[0];
      const gasLimit = chainInfo[hre.network.name].gasLimit;

      // Log network
      console.log('Network:', hre.network.name);

      // Get diamond
      const { diamond } = args;
      const game = await getDiamond(hre, diamond);

      // Deploy libraries
      const ecsLib = await deployProxy<ECSLib>('ECSLib', admin, hre, []);
      const templates = await deployProxy<any>('Templates', admin, hre, [], { ECSLib: ecsLib.address });
      const gameLib = await deployProxy<GameLib>('GameLib', admin, hre, [], { ECSLib: ecsLib.address, Templates: templates.address });

      // Get diamond facets
      const diamondLoupeFacet = await hre.ethers.getContractAt('DiamondLoupeFacet', diamond);
      const existingFacetAddrs: any[] = [];
      for (const address of await diamondLoupeFacet.facetAddresses()) {
        existingFacetAddrs.push(address);
      }
      console.log(`✦ Diamond has ${existingFacetAddrs.length} facets`);

      // Deploy new facets and populate cut
      const facets = [
        { name: 'GameFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
        // { name: 'GetterFacet', libraries: { ECSLib: ecsLib.address, Templates: templates.address } },
        // { name: 'AdminFacet', libraries: { ECSLib: ecsLib.address, GameLib: gameLib.address, Templates: templates.address } },
      ];
      const cut: any[] = [];
      for (let i = 0; i < facets.length; i++) {
        const facetName: string = facets[i].name;
        const facet = await deployProxy<any>(facetName, admin, hre, [], facets[i].libraries as any);
        cut.push({
          facetAddress: existingFacetAddrs[0],
          action: FacetCutAction.Replace,
          functionSelectors: getSelectors(facet).get(['harvestResourcesFromCapital(uint256)']),
        });
      }

      // Upgrade diamond with facets
      const receipt = await confirmTx(await game.diamondCut(cut, hre.ethers.constants.AddressZero, '0x', { gasLimit }), hre);
      if (receipt && !receipt.status) {
        throw Error(`Diamond upgrade failed: ${receipt.transactionHash}`);
      } else {
        console.log('✦ Diamond upgrade successful');
      }
    } catch (err: any) {
      console.log(err.message);
    }
  });
