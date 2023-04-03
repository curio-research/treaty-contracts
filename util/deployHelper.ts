import chalk from 'chalk';
import { Signer, Contract } from 'ethers';
import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';
import { FactoryOptions, HardhatRuntimeEnvironment } from 'hardhat/types';

export const deployProxy = async <C extends Contract>(contractName: string, signer: Signer, hre: HardhatRuntimeEnvironment, contractArgs: unknown[], libs?: FactoryOptions['libraries']): Promise<C> => {
  const factory = await hre.ethers.getContractFactory(contractName, libs ? { libraries: libs } : signer);
  //   const gasLimit = chainInfo[hre.network.name].gasLimit;
  const contract = await factory.deploy(...contractArgs);

  await confirmTx(contract.deployTransaction, hre);

  console.log(chalk.dim(`✦ ${contractName}: `, contract.address));

  return contract as C;
};

export const confirmTx = async (contractTx: ContractTransaction, hre: HardhatRuntimeEnvironment): Promise<ContractReceipt | undefined> => {
  // we assume that localhost anvil has automine / instant block confirmation
  if (hre.network.name === 'localhost') return;

  const receipt = await contractTx.wait();
  return receipt;
};
