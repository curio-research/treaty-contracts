import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

export interface World {
  contracts: AllContracts;
  user1: SignerWithAddress;
  user2: SignerWithAddress;
  user3: SignerWithAddress;
}

export interface AllContracts {}

export const EPOCH_INTERVAL = 30;

// initialize a world fixture
export const initializeWorld = async (): Promise<any> => {
  const [signer1, signer2, signer3] = await ethers.getSigners();

  // initialize diamond, set map region, initialize players
};
