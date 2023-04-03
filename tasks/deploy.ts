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

      const [signer1] = await hre.ethers.getSigners();

      const gameItemNFT = await deployProxy<GameItem>('GameItem', signer1, hre, []);

      console.log('NFT address: ', gameItemNFT.address);
    } catch (err) {
      console.log(err);
    }
  });
