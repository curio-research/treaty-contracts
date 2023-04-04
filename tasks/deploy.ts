import { GameItem__factory } from './../typechain-types/factories/contracts/NFT.sol/GameItem__factory';
import { Contract } from 'ethers';
import { GameItem } from './../typechain-types/contracts/NFT.sol/GameItem';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployProxy } from '../util/deployHelper';

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
      const gameItemNFT = await deployProxy<GameItem>('GameItem', signer1, hre, []);

      console.log('NFT address: ', gameItemNFT.address);
    } catch (err) {
      console.log(err);
    }
  });

task('simulate', 'simulate-nft').setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
  const [signer1, signer2] = await hre.ethers.getSigners();

  const nftAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  const gameItemNFT = GameItem__factory.connect(nftAddress, signer1);

  const tokenId = 1;
  // mint NFT

  await gameItemNFT.mint(tokenId);

  // transfer ownership from signer 1 to signer 2
  await gameItemNFT.transferFrom(signer1.address, signer2.address, tokenId);
});
