import { Interface } from '@ethersproject/abi';
import ethers, { artifacts } from 'hardhat';
const hre = require('hardhat');

// code attribution: written by https://github.com/Timidan

// interfaces
import TowerFacetInterface from '../../out/TowerFacet.sol/TowerFacet.json';
import GetterFacetInterface from '../../out/GetterFacet.sol/GetterFacet.json';
import EngineFacetInterface from '../../out/EngineFacet.sol/EngineFacet.json';

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
  // const target = await hre.ethers.getContractFactory(contractName);
  const contractInterface: Interface = new hre.ethers.utils.Interface(nameToAbiMapping[contractName].abi);

  const signatures = Object.keys(contractInterface.functions);

  const selectors = signatures.reduce((acc: any, val: any) => {
    if (val !== 'init(bytes)') {
      acc.push(contractInterface.getSighash(val));
    }
    return acc;
  }, []);

  const coder = hre.ethers.utils.defaultAbiCoder;
  const coded = coder.encode(['bytes4[]'], [selectors]);

  process.stdout.write(coded);
}

function getAbi(contractname: any) {
  return artifacts.readArtifactSync(contractname).abi;
}

getSelectors(args[0]);
