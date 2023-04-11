import fs from 'fs';
import { expect } from 'chai';
import { providers, Contract, Wallet } from 'ethers';
import { artifacts } from 'hardhat';
import { Alchemy, Network } from 'alchemy-sdk';
import { L1NFT, TransferEvent } from './../typechain-types/L1NFT';
import { L2NFT } from './../typechain-types/L2NFT';

interface NFTPair {
  L1NFT: string;
  L2NFT: string;
}

const L1RPC = 'https://eth-mainnet.g.alchemy.com/v2/D3yJ1cYWPCJX4WE2vATcUcyBTaAgEy-A';
const L2RPC = 'http://localhost:8546';
const Account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const Account2 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
const Account3 = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';

const config = {
  apiKey: 'D3yJ1cYWPCJX4WE2vATcUcyBTaAgEy-A',
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const sleep = (t: number = 1000): Promise<void> => {
  return new Promise((r) => {
    setTimeout(() => {
      r();
    }, t);
  });
};

// describe('Local L1 to L2', () => {
//   it('Should change ownership from Null to Account 1', async function () {
//     const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

//     const L1NFT_ABI = await artifacts.readArtifact('L1NFT');
//     const L2NFT_ABI = await artifacts.readArtifact('L2NFT');

//     const L1Provider = new providers.JsonRpcProvider(L1RPC);
//     const L2Provider = new providers.JsonRpcProvider(L2RPC);

//     const L1DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L1Provider);
//     const L2DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L2Provider);

//     const L1NFT = new Contract(myStructFromFile.L1NFT, L1NFT_ABI.abi, L1DeployerSigner) as L1NFT;
//     const L2NFT = new Contract(myStructFromFile.L2NFT, L2NFT_ABI.abi, L2DeployerSigner) as L2NFT;

//     await L1NFT.mint(1);

//     const tokenId = (await L1NFT._currentIndex()).toNumber() - 1;

//     await sleep();
//     const tokenOwnerAddress = await L2NFT.ownerOf(tokenId);

//     expect(tokenOwnerAddress).to.equal(Account1);
//   });

//   it('Should change ownership from Null to Account 2', async function () {
//     const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

//     const L1NFT_ABI = await artifacts.readArtifact('L1NFT');
//     const L2NFT_ABI = await artifacts.readArtifact('L2NFT');

//     const L1Provider = new providers.JsonRpcProvider(L1RPC);
//     const L2Provider = new providers.JsonRpcProvider(L2RPC);

//     const L1DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L1Provider);
//     const L2DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L2Provider);

//     const L1NFT = new Contract(myStructFromFile.L1NFT, L1NFT_ABI.abi, L1DeployerSigner) as L1NFT;
//     const L2NFT = new Contract(myStructFromFile.L2NFT, L2NFT_ABI.abi, L2DeployerSigner) as L2NFT;

//     // mint to account 1
//     await L1NFT.mint(1);
//     const tokenId = (await L1NFT._currentIndex()).toNumber() - 1;

//     // transfer from account 1 to account 2
//     await L1NFT.transferFrom(Account1, Account2, tokenId);

//     await sleep();

//     const tokenOwnerAddress = await L2NFT.ownerOf(tokenId);

//     expect(tokenOwnerAddress).to.equal(Account2);
//   });

//   it('Should change ownership from Null to Account 3', async function () {
//     const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

//     const L1NFT_ABI = await artifacts.readArtifact('L1NFT');
//     const L2NFT_ABI = await artifacts.readArtifact('L2NFT');

//     const L1Provider = new providers.JsonRpcProvider(L1RPC);
//     const L2Provider = new providers.JsonRpcProvider(L2RPC);

//     const L1DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L1Provider);
//     const L2DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L2Provider);

//     const L1NFT = new Contract(myStructFromFile.L1NFT, L1NFT_ABI.abi, L1DeployerSigner) as L1NFT;
//     const L2NFT = new Contract(myStructFromFile.L2NFT, L2NFT_ABI.abi, L2DeployerSigner) as L2NFT;

//     // mint to account 1
//     await L1NFT.mint(1);
//     const tokenId = (await L1NFT._currentIndex()).toNumber() - 1;

//     // transfer from account 1 to account 3
//     await L1NFT.transferFrom(Account1, Account3, tokenId);

//     await sleep();

//     const tokenOwnerAddress = await L2NFT.ownerOf(tokenId);

//     expect(tokenOwnerAddress).to.equal(Account3);
//   });

//   it('Every token ownership should be equal from L1 to L2', async function () {
//     const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

//     const L1NFT_ABI = await artifacts.readArtifact('L1NFT');
//     const L2NFT_ABI = await artifacts.readArtifact('L2NFT');

//     const L1Provider = new providers.JsonRpcProvider(L1RPC);
//     const L2Provider = new providers.JsonRpcProvider(L2RPC);

//     const L1DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L1Provider);
//     const L2DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L2Provider);

//     const L1NFT = new Contract(myStructFromFile.L1NFT, L1NFT_ABI.abi, L1DeployerSigner) as L1NFT;
//     const L2NFT = new Contract(myStructFromFile.L2NFT, L2NFT_ABI.abi, L2DeployerSigner) as L2NFT;

//     const tokenLen = (await L1NFT._currentIndex()).toNumber();

//     for (let i = 0; i < tokenLen; i++) {
//       const tokenId = i;
//       const L1TokenOwnerAddress = await L1NFT.ownerOf(tokenId);
//       const L2TokenOwnerAddress = await L2NFT.ownerOf(tokenId);

//       expect(`${tokenId}-${L2TokenOwnerAddress}`).to.equal(`${tokenId}-${L1TokenOwnerAddress}`);
//     }
//   });
// });

describe('Remote L1 to L2', () => {
  it('Every token ownership should be equal from L1 to L2', async function () {
    const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

    const L1NFT_ABI = await artifacts.readArtifact('L1NFT');
    const L2NFT_ABI = await artifacts.readArtifact('L2NFT');

    const L1Provider = new providers.JsonRpcProvider(L1RPC);
    const L2Provider = new providers.JsonRpcProvider(L2RPC);

    const L1DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L1Provider);
    const L2DeployerSigner = new Wallet(process.env.ADMIN_PK || '', L2Provider);

    const L1NFT = new Contract(myStructFromFile.L1NFT, L1NFT_ABI.abi, L1DeployerSigner) as L1NFT;
    const L2NFT = new Contract(myStructFromFile.L2NFT, L2NFT_ABI.abi, L2DeployerSigner) as L2NFT;

    const BlockBatchSize = 500;

    const fromBlock = 17020519;
    const blockNumber = await L1Provider.getBlockNumber();
    const toBlock = blockNumber;
    let events: Array<TransferEvent> = [];

    // Handle pagination to split block range
    const batchNum = Math.ceil((toBlock - fromBlock) / BlockBatchSize);

    console.log(`-> sync history start from ${fromBlock} to ${toBlock}, ${batchNum} batches`);

    for (let i = 0; i < batchNum; i++) {
      const batchStart = fromBlock + i * BlockBatchSize;
      const batchEnd = Math.min(fromBlock + (i + 1) * BlockBatchSize - 1, toBlock);

      console.log(`-> sync history(${i + 1}/${batchNum}): ${batchStart} - ${batchEnd}`);

      try {
        const transferFilter = L1NFT.filters.Transfer(null, null, null);
        const localEvents = await L1NFT.queryFilter(transferFilter, 17020519);

        console.log('-> batch events', localEvents.length);

        events.concat(localEvents);
      } catch (err) {
        // retry
        console.log('-> fetch error, retry');
        i--;
      }
    }

    const mintEvents = events.filter((event) => {
      return event.args[0] === '0x0000000000000000000000000000000000000000';
    });

    const tokenCount = mintEvents.length;

    console.log(`-> token num: ${tokenCount}`);

    for (let i = 1; i <= tokenCount; i++) {
      const tokenId = i;
      console.log(`-> token ${i} start`);
      const L1CurTokenEvents = events.filter((event) => {
        return +event.args[2]._hex === i;
      });

      // const L1TokenOwnerAddress = await L2NFT.ownerOf(tokenId - 1);
      const L1TokenOwnerAddress = L1CurTokenEvents[L1CurTokenEvents.length - 1].args[1];
      const L2TokenOwnerAddress = await L2NFT.ownerOf(tokenId - 1);
      console.log(`-> token ${i} done`, L1TokenOwnerAddress, L2TokenOwnerAddress);

      expect(`${tokenId}-${L2TokenOwnerAddress}`).to.equal(`${tokenId}-${L1TokenOwnerAddress}`);
    }
  });
});
