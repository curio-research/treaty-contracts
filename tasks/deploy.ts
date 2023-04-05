import { L2NFT__factory } from './../typechain-types/factories/contracts/L2NFT__factory';
import { L1NFT } from './../typechain-types/contracts/L1NFT';
import { GameItem__factory } from './../typechain-types/factories/contracts/NFT.sol/GameItem__factory';
import { GameItem } from './../typechain-types/contracts/NFT.sol/GameItem';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy } from '../util/deployHelper';
import { L2NFT } from '../typechain-types/contracts/L2NFT';

/**
 * Deploy script for publishing games
 *
 * Examples:
 * `yarn deploy:anvil`: starts Anvil instance + deploys a single game
 * `npx hardhat deploy`: deploys game on localhost
 * `npx hardhat deploy --network <network-name>`: deploy game on a specific non-localhost network
 */
task('deploy', 'deploy contracts')
  .addOptionalParam('port', 'Port contract abis and game info to Vault') // default is to call port
  .setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
    try {
      await hre.run('compile');

      const [signer1, signer2] = await hre.ethers.getSigners();

      // deploy NFT on L1
      const L1NFT = await deployProxy<L1NFT>('L1NFT', signer1, hre, []);

      console.log('NFT address: ', L1NFT.address);
    } catch (err) {
      console.log(err);
    }
  });

task('simulate', 'simulate-nft').setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
  const [signer1, signer2] = await hre.ethers.getSigners();

  const nftAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  // deploy NFT on L2
  const gameItemNFT = L2NFT__factory.connect(nftAddress, signer1);

  // mint to a user
  await gameItemNFT.mint(signer1.address, 1);

  // transfer ownership from signer 1 to signer 2
  await gameItemNFT.transferFrom(signer1.address, signer2.address, 1);
});
