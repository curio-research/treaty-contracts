import { Signer, Contract } from 'ethers';
import { FactoryOptions, HardhatRuntimeEnvironment } from 'hardhat/types';
import { ItemMaster } from '../../util/types/getter';

// deploy proxy used in hre
export const deployProxy = async <C extends Contract>(contractName: string, signer: Signer, hre: HardhatRuntimeEnvironment, contractArgs: unknown[], libs?: FactoryOptions['libraries']): Promise<C> => {
  // add retry ?
  const factory = await hre.ethers.getContractFactory(contractName, libs ? { libraries: libs } : signer);
  const contract = await factory.deploy(...contractArgs);
  await contract.deployTransaction.wait();
  return contract as C;
};

export const printDivider = () => {
  console.log('------------------------------------');
};

export const getItemIndexByName = (masterItems: ItemMaster[], name: string): number => {
  return masterItems.indexOf(masterItems.filter((im) => im.name === name)[0]);
};
