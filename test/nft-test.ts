import fs from 'fs';
import { expect } from 'chai';
import { providers, Contract, Wallet } from 'ethers';
import { artifacts } from 'hardhat';
import { L1NFT, TransferEvent } from './../typechain-types/L1NFT';
import { L2NFT } from './../typechain-types/L2NFT';

interface NFTPair {
  L1NFT: string;
  L2NFT: string;
}

const { CONSTELLATION_RPC_URL, ALCHEMY_RPC_URL, NFT_BLOCK_NUMBER_L1 } = process.env;

const L1RPC = ALCHEMY_RPC_URL;
const L2RPC = CONSTELLATION_RPC_URL;

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

    const fromBlock = +(NFT_BLOCK_NUMBER_L1 || '');
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
        const localEvents = await L1NFT.queryFilter(transferFilter, batchStart, batchEnd);

        console.log('-> batch events', localEvents.length);

        events = events.concat(localEvents);
      } catch (err) {
        // retry
        console.log('-> fetch error, retry', err);
        i--;
      }
    }

    console.log('-> events', events);

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
