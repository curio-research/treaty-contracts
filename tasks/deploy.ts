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

      const gameItemNFT = await deployProxy<GameItem>('GameItem', signer1, hre, []);

      const tokenId = 1;

      // mint NFT #1 to signer 1
      await gameItemNFT.mint(tokenId);

      // transfer ownership from signer 1 to signer 2
      await gameItemNFT.transferFrom(signer1.address, signer2.address, tokenId);

      //   localhost: {
      //     rpcUrl: 'http://127.0.0.1:8545/',
      //     wsRpcUrl: 'ws://localhost:8545',
      //     id: 31337,
      //     gasLimit: 3_000_000_000,
      //   },

      console.log('NFT address: ', gameItemNFT.address);
    } catch (err) {
      console.log(err);
    }
  });
