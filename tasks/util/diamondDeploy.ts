import { DiamondInit } from './../../typechain-types/upgradeInitializers/DiamondInit';
import { DiamondCutFacet } from './../../typechain-types/facets/DiamondCutFacet';
import { Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { Signer } from 'ethers';
import { deployProxy } from './deployHelper';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { getSelectors, FacetCutAction } from './diamondHelper';
import { chainInfo } from 'curio-vault';

export async function deployDiamond(hre: HardhatRuntimeEnvironment, signer: Signer, deployArgs: [any]) {
  const contractOwner = await signer.getAddress();

  // deploy DiamondCutFacet
  const diamondCutFacet = await deployProxy<DiamondCutFacet>('DiamondCutFacet', signer, hre, []);

  // deploy Diamond
  const diamond = await deployProxy<Curio>('Diamond', signer, hre, [contractOwner, diamondCutFacet.address]);

  // deploy DiamondInit
  const diamondInit = await deployProxy<DiamondInit>('DiamondInit', signer, hre, []);

  // deploy facets
  const FacetNames = ['DiamondLoupeFacet', 'OwnershipFacet'];
  const cut = [];
  for (const FacetName of FacetNames) {
    const facet = await deployProxy<any>(FacetName, signer, hre, []);

    cut.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    });
  }

  // upgrade diamond with facets
  const diamondCut = await hre.ethers.getContractAt('IDiamondCut', diamond.address);
  let receipt;

  // call to init function. add initial state setting parameters. this acts as the constructor essentially
  let functionCall = diamondInit.interface.encodeFunctionData('init', deployArgs); // encodes data functions into bytes i believe
  const tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall);

  // if (receipt && !receipt.status) {
  //   throw Error(`Diamond upgrade failed: ${tx.hash}`);
  // }

  return diamond.address;
}

interface Facet {
  name: string;
  libraries?: any;
}

export const deployFacets = async (hre: HardhatRuntimeEnvironment, diamondAddress: string, facets: Facet[], signer: Signer) => {
  const facetContracts = [];

  for (let i = 0; i < facets.length; i++) {
    const facetName: string = facets[i].name;
    const facet = await deployProxy<any>(facetName, signer, hre, [], facets[i].libraries);

    facetContracts.push(facet);
  }

  const diamond = await hre.ethers.getContractAt('Curio', diamondAddress);
  const addresses = [];

  // loop through all facets
  for (let i = 0; i < facetContracts.length; i++) {
    const currentFacet = facetContracts[i];

    addresses.push(currentFacet.address);
    const selectors = getSelectors(currentFacet); // get all selectors and upload

    const gasLimit = chainInfo[hre.network.name].gasLimit;

    const tx = await diamond.diamondCut(
      [
        {
          facetAddress: currentFacet.address,
          action: FacetCutAction.Add,
          functionSelectors: selectors,
        },
      ],
      hre.ethers.constants.AddressZero,
      '0x',
      { gasLimit: gasLimit }
    );

    // const receipt = await confirm(tx, hre);

    // if (receipt && !receipt.status) {
    //   throw Error(`Diamond upgrade failed: ${tx.hash}`);
    // }

    // const receipt = await tx.wait();
    // if (!receipt.status) {
    //   throw Error(`Diamond upgrade failed: ${tx.hash}`);
    // }
  }
};

export const getDiamond = async (hre: HardhatRuntimeEnvironment, diamondAddress: string): Promise<Curio> => {
  const res: any = await hre.ethers.getContractAt('Curio', diamondAddress);
  return res;
};
