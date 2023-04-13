import { L1NFT__factory } from './../typechain-types/factories/L1NFT__factory';
import { L2NFT } from './../typechain-types/L2NFT';
import { L1NFT } from './../typechain-types/L1NFT';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy } from '../util/deployHelper';
import fs from 'fs';
import chalk from 'chalk';

interface NFTPair {
  L1NFT: string;
  L2NFT: string;
}

const L1RPC = 'http://localhost:8545';
const L2RPC = 'https://curiov3.constellationchain.xyz/http';

task('deploy', 'deploy contracts')
  .addOptionalParam('port', 'Port contract abis and game info to Vault') // default is to call port
  .addOptionalParam('l1', 'L1 network name') // default is to call port
  .addOptionalParam('l2', 'l2 network name') // default is to call port
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');

      // TODO: make sure those 2 network RPCs are live
      const L1Provider = new hre.ethers.providers.JsonRpcProvider(L1RPC);
      const L2Provider = new hre.ethers.providers.JsonRpcProvider(L2RPC);

      // use same admin private key for both chains
      const L1DeployerSigner = new hre.ethers.Wallet(process.env.ADMIN_PK || '', L1Provider);
      const L2DeployerSigner = new hre.ethers.Wallet(process.env.ADMIN_PK || '', L2Provider);

      // deploy NFT on L1
      const L1NFT = await deployProxy<L1NFT>('L1NFT', L1DeployerSigner, hre, []);

      // deploy NFT on L2
      const L2NFT = await deployProxy<L2NFT>('L2NFT', L2DeployerSigner, hre, []);

      const nfts: NFTPair = {
        // L1NFT: L1NFT.address,
        L1NFT: '0x7c9f47c616f9630b63eecedf4ddae6964a405e47',
        L2NFT: L2NFT.address,
      };

      // write the latest deployed NFT addresses into a file
      // when running simulate, it will use the latest deployed addresses from this file
      fs.writeFileSync('./RecentNFTPair.json', JSON.stringify(nfts));
    } catch (err) {
      console.log(err);
    }
  });

task('deployL2', 'deploy contracts')
  .addOptionalParam('port', 'Port contract abis and game info to Vault') // default is to call port
  .addOptionalParam('l1', 'L1 network name') // default is to call port
  .addOptionalParam('l2', 'l2 network name') // default is to call port
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');

      const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

      const L2Provider = new hre.ethers.providers.JsonRpcProvider(L2RPC);
      const L2DeployerSigner = new hre.ethers.Wallet(process.env.ADMIN_PK || '', L2Provider);

      // deploy NFT on L2
      const L2NFT = await deployProxy<L2NFT>('L2NFT', L2DeployerSigner, hre, []);

      const nfts: NFTPair = {
        L1NFT: myStructFromFile.L1NFT,
        L2NFT: L2NFT.address,
      };

      // write the latest deployed NFT addresses into a file
      // when running simulate, it will use the latest deployed addresses from this file
      fs.writeFileSync('./RecentNFTPair.json', JSON.stringify(nfts));
    } catch (err) {
      console.log(err);
    }
  });

// simulate from L1
task('simulate', 'simulate nft minting').setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
  const [signer1, signer2] = await hre.ethers.getSigners();

  const myStructFromFile: NFTPair = JSON.parse(fs.readFileSync('./RecentNFTPair.json', 'utf-8'));

  const L1NFT = L1NFT__factory.connect(myStructFromFile.L1NFT, signer1);

  // mint NFT to a user
  await L1NFT.mint(1);

  // transfer ownership from signer 1 to signer 2
  const tokenId = (await L1NFT._currentIndex()).toNumber();
  await L1NFT.transferFrom(signer1.address, signer2.address, tokenId - 1);

  console.log(chalk.dim('Simulation complete'));
});
