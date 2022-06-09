import { Interface } from '@ethersproject/abi';
import { artifacts } from 'hardhat';
const hre = require('hardhat');

// code attribution: written by https://github.com/Timidan
// this file is ran by Foundry tests to pipe js input back into solidity files

// interfaces
import TowerFacetInterface from '../../../out/TowerFacet.sol/TowerFacet.json';
import GetterFacetInterface from '../../../out/GetterFacet.sol/GetterFacet.json';
import EngineFacetInterface from '../../../out/EngineFacet.sol/EngineFacet.json';

const nameToAbiMapping: any = {
  TowerFacet: TowerFacetInterface,
  GetterFacet: GetterFacetInterface,
  EngineFacetInterface: EngineFacetInterface,
};

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log('no parameter. please give a contract name');
  process.exit(1);
} else if (args.length > 1) {
  console.log('too many contracts');
  process.exit(1);
}

async function getSelectors(contractName: string) {
  const contractInterface: Interface = new hre.ethers.utils.Interface(nameToAbiMapping[contractName].abi);

  const selectors = Object.keys(contractInterface.functions).map((signature) => contractInterface.getSighash(signature));

  const coded = hre.ethers.utils.defaultAbiCoder.encode(['bytes4[]'], [selectors]);

  process.stdout.write(coded);
}

getSelectors(args[0]);
