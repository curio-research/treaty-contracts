import * as path from 'path';
import * as fsPromise from 'fs/promises';
import { COMPONENT_SPECS } from 'curio-vault';

export const saveComponentsToJsonFile = async () => {
  for (let i = 0; i < COMPONENT_SPECS.length; i++) {
    await fsPromise.writeFile(path.join(path.join(__dirname), '..', 'data', `component_${i}.json`), JSON.stringify(COMPONENT_SPECS[i]));
  }
};
