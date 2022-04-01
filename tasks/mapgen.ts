import { createCellularMap } from './util/dungeonGenerator';
import { gameItems } from './util/itemGenerator';
import { task } from 'hardhat/config';
import { generateAllGameArgs } from './util/allArgsGenerator';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import * as fsPromise from 'fs/promises';
import * as path from 'path';
import * as fs from 'fs';

task('mapgen', 'Ports the map to render on frontend').setAction(async (args: any, hre: HardhatRuntimeEnvironment) => {
  //   let blocks = generateAllGameArgs(gameItems).blockMap;

  const map = createCellularMap(200, 200);

  // port
  await fsPromise.writeFile(path.join(path.join(__dirname), 'map.json'), JSON.stringify(map));
  console.log('✦ Porting map file over ...');
  const mapFileDir = path.join(__dirname, '/map.json');
  const mapClientDir = path.join(__dirname, '../../frontend/src/map.json');
  await fs.copyFileSync(mapFileDir, mapClientDir);
  console.log('✦ Porting complete!');
});
