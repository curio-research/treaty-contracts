import { ContractTransaction } from '@ethersproject/contracts';
import { Signer, Contract } from 'ethers';
import { FactoryOptions, HardhatRuntimeEnvironment } from 'hardhat/types';

// deploy proxy used in hre
export const deployProxy = async <C extends Contract>(contractName: string, signer: Signer, hre: HardhatRuntimeEnvironment, contractArgs: unknown[], libs?: FactoryOptions['libraries']): Promise<C> => {
  const factory = await hre.ethers.getContractFactory(contractName, libs ? { libraries: libs } : signer);
  const contract = await factory.deploy(...contractArgs);

  await contract.deployTransaction.wait();

  console.log(`✦ ${contractName}`, contract.address);

  return contract as C;
};

export const printDivider = () => {
  console.log('------------------------------------');
};

export const confirm = async (contractTx: ContractTransaction, hre: HardhatRuntimeEnvironment) => {
  // we assume that localhost anvil has automine / instant block confirmation
  if (hre.network.name === 'localhost' || hre.network.name === 'tailscale') return;

  await contractTx.wait();
};
