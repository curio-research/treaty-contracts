import fs from 'fs-extra';
import path from 'path';
import { HardhatArguments, HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';

task('port', 'compile and port contracts over to frontend repo').setAction(async (args: HardhatArguments, hre: HardhatRuntimeEnvironment) => {
  try {
    // delete items in existing directories
    await fs.emptydirSync(getDir('vault', ''));

    // port entire typechain folder to vault
    await fs.copySync(getDir('local', ''), getDir('vault', ''));

    console.log('✦ Porting complete!');
  } catch (err: any) {
    console.log(err.message);
  }
});

// helpers

const getDir = (repositoryName: string, filePath: string): string => {
  const prefixSelector = (repoName: string) => {
    if (repoName === 'local') return '../typechain-types';
    if (repoName === 'vault') return '../../vault/src/game/typechain-types';
  };
  return path.join(__dirname, `${prefixSelector(repositoryName)}${filePath}`);
};

const portFile = async (filePath: string): Promise<void> => {
  await fs.copyFileSync(getDir('local', filePath), getDir('vault', filePath));
};

// copy folder
const copyFolderSync = (from: string, to: string) => {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach((element) => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
};
