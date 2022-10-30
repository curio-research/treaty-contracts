import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';
import { Signer, Contract } from 'ethers';
import { FactoryOptions, HardhatRuntimeEnvironment } from 'hardhat/types';
import * as path from 'path';
import * as fsPromise from 'fs/promises';
import * as fs from 'fs';

// deploy proxy used in hre
export const deployProxy = async <C extends Contract>(contractName: string, signer: Signer, hre: HardhatRuntimeEnvironment, contractArgs: unknown[], libs?: FactoryOptions['libraries']): Promise<C> => {
  const factory = await hre.ethers.getContractFactory(contractName, libs ? { libraries: libs } : signer);
  const contract = await factory.deploy(...contractArgs);

  await confirm(contract.deployTransaction, hre);

  console.log(`✦ ${contractName}: `, contract.address);

  return contract as C;
};

export const printDivider = () => {
  console.log('------------------------------------');
};

export const confirm = async (contractTx: ContractTransaction, hre: HardhatRuntimeEnvironment): Promise<ContractReceipt | undefined> => {
  // we assume that localhost anvil has automine / instant block confirmation
  if (hre.network.name === 'localhost' || hre.network.name === 'tailscale') return;

  let receipt = await contractTx.wait();
  return receipt;
};

export const indexerUrlSelector = (hre: HardhatRuntimeEnvironment): string => {
  if (hre.network.name === 'localhost') {
    return process.env.BACKEND_URL || '';
  }
  if (hre.network.name === 'tailscale') {
    return `${process.env.TAILSCALE_MAIN}:8080`;
  }

  if (hre.network.name === 'constellation') {
    return process.env.INDEXER_URL || '';
  }

  // TODO: add production indexer url cases
  return '';
};

export const saveMapToLocal = async (tileMap: any) => {
  console.log('saving map to local...');

  const mapsDir = path.join(path.join(__dirname), '..', 'maps');
  if (!fs.existsSync(mapsDir)) fs.mkdirSync(mapsDir);

  let mapIndex = (await fsPromise.readdir(mapsDir)).length;
  let mapPath: string;
  do {
    mapPath = path.join(mapsDir, `map-${mapIndex}.json`);
    mapIndex++;
  } while (fs.existsSync(mapPath));

  await fsPromise.writeFile(mapPath, JSON.stringify(tileMap));
};
