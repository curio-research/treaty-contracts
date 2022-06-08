import { getSigHashes } from './util/diamond';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment, HardhatArguments } from 'hardhat/types';

task('selector', 'get function selectors and print them').setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  //   hre.run('compile'); // first compile all contracts

  const contracts = ['DiamondLoupeFacet', 'OwnershipFacet'];

  for (const contractName of contracts) {
    const contract = await hre.ethers.getContractFactory(contractName);
    const sigHashes = getSigHashes(contract.interface);
    console.log(contractName);
    console.log(sigHashes);
  }
});
