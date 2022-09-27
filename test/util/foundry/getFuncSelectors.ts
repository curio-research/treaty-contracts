import { Interface } from '@ethersproject/abi';
const hre = require('hardhat');

// this file is ran by Foundry tests to pipe js input back into solidity files

// interfaces
import AdminFacetInterface from '../../../out/AdminFacet.sol/AdminFacet.json';
import GetterFacetInterface from '../../../out/GetterFacet.sol/GetterFacet.json';
import GameFacetInterface from '../../../out/GameFacet.sol/GameFacet.json';
import DiamondInitInterface from '../../../out/upgradeInitializers/DiamondInit.sol/DiamondInit.json';

const nameToAbiMapping: any = {
  DiamondInit: DiamondInitInterface,
  GameFacet: GameFacetInterface,
  GetterFacet: GetterFacetInterface,
  AdminFacet: AdminFacetInterface,
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

// code attribution: inspired by https://github.com/Timidan
