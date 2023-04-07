import fs from 'fs';
import { expect } from 'chai';
import { providers, Contract, Wallet } from 'ethers';
import { L1NFT__factory, L1NFT_ABI } from './../typechain-types/factories/L1NFT__factory';
import { L2NFT__factory, L2NFT_ABI } from './../typechain-types/factories/L2NFT__factory';
import { L1NFT } from './../typechain-types/L1NFT';
import { L2NFT } from './../typechain-types/L2NFT';

interface NFTPair {
  L1NFT: string;
  L2NFT: string;
}

const L1RPC = 'http://localhost:8545';
const L2RPC = 'http://localhost:8546';
const Account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const Account2 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
const Account3 = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';

const sleep = (t: number = 1000): Promise<void> => {
  return new Promise((r) => {
    setTimeout(() => {
      r();
    }, t);
  });
};

describe('Mint', () => {
  it('Should change ownership from Null to Account 1', async function () {
    const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

    const L1Provider = new providers.JsonRpcProvider(L1RPC);
    const L2Provider = new providers.JsonRpcProvider(L2RPC);

    const L1DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L1Provider);
    const L2DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L2Provider);

    const L1NFT = new Contract(myStructFromFile.L1NFT, L1NFT_ABI, L1DeployerSigner) as L1NFT;
    const L2NFT = new Contract(myStructFromFile.L2NFT, L2NFT_ABI, L2Provider) as L2NFT;

    await L1NFT.mint(1);

    const tokenId = (await L1NFT._currentIndex()).toNumber() - 1;

    await sleep();
    const tokenOwnerAddress = await L2NFT.ownerOf(tokenId);

    expect(tokenOwnerAddress).to.equal(Account1);
  });

  it('Should change ownership from Null to Account 2', async function () {
    const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

    const L1Provider = new providers.JsonRpcProvider(L1RPC);
    const L2Provider = new providers.JsonRpcProvider(L2RPC);

    const L1DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L1Provider);
    const L2DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L2Provider);

    const L1NFT = new Contract(myStructFromFile.L1NFT, L1NFT_ABI, L1DeployerSigner) as L1NFT;
    const L2NFT = new Contract(myStructFromFile.L2NFT, L2NFT_ABI, L2DeployerSigner) as L2NFT;

    // mint to account 1
    await L1NFT.mint(1);
    const tokenId = (await L1NFT._currentIndex()).toNumber() - 1;

    // transfer from account 1 to account 2
    await L1NFT.transferFrom(Account1, Account2, tokenId);

    await sleep();

    const tokenOwnerAddress = await L2NFT.ownerOf(tokenId);

    expect(tokenOwnerAddress).to.equal(Account2);
  });

  it('Every token ownership should be equal from L1 to L2', async function () {
    const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

    const L1Provider = new providers.JsonRpcProvider(L1RPC);
    const L2Provider = new providers.JsonRpcProvider(L2RPC);

    const L1DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L1Provider);
    const L2DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L2Provider);

    const L1NFT = new Contract(myStructFromFile.L1NFT, L1NFT_ABI, L1DeployerSigner) as L1NFT;
    const L2NFT = new Contract(myStructFromFile.L2NFT, L2NFT_ABI, L2DeployerSigner) as L2NFT;

    const tokenLen = (await L1NFT._currentIndex()).toNumber();

    for (let i = 0; i < tokenLen; i++) {
      if (i === 1) continue; // magic
      const tokenId = i;
      const L1TokenOwnerAddress = await L1NFT.ownerOf(tokenId);
      const L2TokenOwnerAddress = await L2NFT.ownerOf(tokenId);

      expect(`${tokenId}-${L2TokenOwnerAddress}`).to.equal(`${tokenId}-${L1TokenOwnerAddress}`);
    }
  });
});