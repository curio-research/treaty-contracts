import * as path from 'path';
import * as fsPromise from 'fs/promises';
import { COMPONENT_SPECS, TILE_TYPE } from 'curio-vault';
import { generateWorldConstants } from '../../tasks/util/constants';

export const saveComponentsToJsonFiles = async () => {
  for (let i = 0; i < COMPONENT_SPECS.length; i++) {
    await fsPromise.writeFile(path.join(path.join(__dirname), '..', 'data', `component_${i}.json`), JSON.stringify(COMPONENT_SPECS[i]));
  }
};

export const saveWorldConstantsToJsonFile = async (admin: string) => {
  let worldConstants = generateWorldConstants(admin);
  worldConstants = orderByKey(worldConstants);
  await fsPromise.writeFile(path.join(path.join(__dirname), '..', 'data', `world_constants.json`), JSON.stringify(worldConstants));
};

export const saveMapToJsonFile = async (tileMap: TILE_TYPE[][]) => {
  await fsPromise.writeFile(path.join(path.join(__dirname), '..', 'data', `map.json`), JSON.stringify(tileMap));
};

const orderByKey = (unordered: any) =>
  Object.keys(unordered)
    .sort()
    .reduce((obj: any, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
