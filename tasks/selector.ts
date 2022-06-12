import { getSigHashes } from './util/diamondHelper';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, HardhatArguments } from 'hardhat/types';

// interfaces
import GetterFacetInterface from '../out/GetterFacet.sol/GetterFacet.json';
import EngineFacetInterface from '../out/EngineFacet.sol/EngineFacet.json';

task('selector', 'get function selectors and print them').setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  //   hre.run('compile'); // first compile all contracts

  const contracts = [EngineFacetInterface, GetterFacetInterface];
  // const contracts = ['EngineFacet', 'GetterFacet', 'TowerFacet'];

  for (const contract of contracts) {
    // const abi = hre.artifacts.readArtifactSync(contract);
    // const contractInterface = new hre.ethers.utils.Interface(abi.abi);
    // const sigHashes = getSigHashes(contractInterface);

    // const formattedHashes = sigHashes.map((hash: string) => hash);
    // console.log(formattedHashes);

    await printSelectors(contract);
    // console.log(res);
  }

  async function printSelectors(contractInterface: any) {
    const ct = new hre.ethers.utils.Interface(contractInterface.abi);
    const signatures = getSigHashes(ct);
    // const signatures = Object.keys(contractInterface.functions);

    const selectors = signatures.reduce((acc: any, val: string) => {
      if (val !== 'init(bytes)') {
        acc.push(ct.getSighash(val));
      }
      return acc;
    }, []);

    const iface = ct;

    interface FacetCut {
      facetAddress: string;
      action: number | string;
      functionSelectors: string[];
    }
    const dataOut: FacetCut = {
      facetAddress: hre.ethers.constants.AddressZero,
      action: 1,
      functionSelectors: selectors,
    };

    const encoded = iface.encodeFunctionData('diamondCut', [[dataOut], hre.ethers.constants.AddressZero, '0x']);

    console.log('here');
    console.log('0x' + encoded.slice(10));

    return '0x' + encoded.slice(10);
  }
});
