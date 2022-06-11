import { Signer, Contract } from 'ethers';
import { FactoryOptions, HardhatRuntimeEnvironment } from 'hardhat/types';
import { LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL } from './constants';

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

export const rpcUrlSelector = (networkName: string): string[] => {
  if (networkName === 'localhost') {
    return [LOCALHOST_RPC_URL, LOCALHOST_WS_RPC_URL];
  } else if (networkName === 'optimismKovan') {
    return [process.env.KOVAN_RPC_URL!, process.env.KOVAN_WS_RPC_URL!];
  }
  return [];
};
