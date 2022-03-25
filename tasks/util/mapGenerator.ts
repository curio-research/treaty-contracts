import { EMPTY_ADDRESS } from './../../util/network/common';
import { position } from './../../util/types/common';
import { MasterGameSpecs } from './types/mapGenerator';
import _ from 'lodash';
import { TowerWithLocation } from '../../util/types/tower';
import { MAP_MODE } from './constants';
import { generatePrimsMap } from './primsMap';
import { ItemMaster } from '../../util/types/getter';

let visualizeNonce = 0;

// map helpers are used to generate a world with rooms, entrances, and a tower in the middle

// Generate single room with starting coordinate
const GenerateSingleRoom = (x: number, y: number, width: number, height: number, roomWidth: number): position[] => {
  // left wall
  const leftWalls = [
    { x: x, y: y + 2 },
    { x: x, y: y + 3 },
    { x: x, y: y + 4 },
  ];

  // right wall
  const rightWalls = [
    { x: x + 6, y: y + 2 },
    { x: x + 6, y: y + 3 },
    { x: x + 6, y: y + 4 },
  ];

  // top wall
  const topWalls = [
    { x: x + 2, y: y },
    { x: x + 3, y: y },
    { x: x + 4, y: y },
  ];

  // bottom wall
  const bottomWalls = [
    { x: x + 2, y: y + 6 },
    { x: x + 3, y: y + 6 },
    { x: x + 4, y: y + 6 },
  ];

  const generateCoords = () => {
    let coords = [
      { x: x, y: y },
      { x: x + 1, y: y },
      { x: x + 5, y: y },
      { x: x + 6, y: y },
      { x: x, y: y + 1 },
      { x: x + 6, y: y + 1 },
      { x: x, y: y + 5 },
      { x: x + 6, y: y + 5 },
      { x: x, y: y + 6 },
      { x: x + 1, y: y + 6 },
      { x: x + 5, y: y + 6 },
      { x: x + 6, y: y + 6 },
    ];

    // select top walls and left walls for now to avoid overlap
    const shuffledLeft = _.shuffle(leftWalls);
    const shuffledTop = _.shuffle(topWalls);

    coords = coords.concat(shuffledLeft.slice(0, 1));
    coords = coords.concat(shuffledTop.slice(0, 1));

    return coords;
  };

  return generateCoords().filter((coord) => coord.x < width && coord.y < height); // remove coords outside of map
};

export const generateWalls = (width: number, height: number, roomWidth: number): position[] => {
  let totalPos: position[] = [];

  for (let x = 0; x < width; x += roomWidth - 1) {
    for (let y = 0; y < height; y += roomWidth - 1) {
      const coords = GenerateSingleRoom(x, y, width, height, roomWidth);
      totalPos = totalPos.concat(coords);
    }
  }

  return removeDupPosFromArr(totalPos); // remove duplicates
};

// generate empty map
export const generateEmptyMap = (worldWidth: number, worldHeight: number): number[][][] => {
  const map = [];
  let col;
  for (let i = 0; i < worldWidth; i++) {
    col = [];
    for (let j = 0; j < worldHeight; j++) col.push([]);
    map.push(col);
  }
  return map;
};

// generate a list of indices to apply to the map
export const generateWallCoords = (worldWidth: number, worldHeight: number, roomWidth: number): position[] => {
  const walls = generateWalls(worldWidth, worldHeight, roomWidth);

  return walls;
};

// Generate tower locations in middle of rooms
export const GenerateTowerPos = (width: number, height: number, roomWidth: number): position[] => {
  let totalPos: position[] = [];

  // assume room width is even
  for (let x = (roomWidth - 1) / 2; x < width; x += roomWidth - 1) {
    for (let y = (roomWidth - 1) / 2; y < height; y += roomWidth - 1) {
      totalPos = totalPos.concat([{ x, y }]);
    }
  }

  return totalPos;
};

export const generateTowerCoords = (worldWidth: number, worldHeight: number, roomWidth: number): position[] => {
  const towers = GenerateTowerPos(worldWidth, worldHeight, roomWidth);

  return towers;
};

// get a random outcome based a list of probability distributions and list of outcomes. they must be the same length
const getRandom = (weights: number[], results: number[]) => {
  const num = Math.random();
  let s = 0;
  let lastIndex = weights.length - 1;

  for (let i = 0; i < lastIndex; ++i) {
    s += weights[i];
    if (num < s) {
      return results[i];
    }
  }

  return results[lastIndex];
};

const itemWeights = [0.7, 0.3];
const itemResults = [0, 1];

const rewardWeights = [0.1, 0.2, 0.3, 0.4];
const rewardResults = [1, 2, 3, 4];

const generateTowerSpecs = (towerLocations: position[]): TowerWithLocation[] => {
  return towerLocations.map((location) => {
    return {
      location: {
        x: location.x,
        y: location.y,
      },
      tower: {
        rewardPerEpoch: getRandom(rewardWeights, rewardResults),
        itemId: getRandom(itemWeights, itemResults),
        stakedAmount: 0,
        stakedTime: 0,
        owner: EMPTY_ADDRESS,
      },
    };
  });
};

// ---------------------------------
// master map generation function
// ---------------------------------

export const generateMap = (worldWidth: number, worldHeight: number, roomWidth: number, masterItems: ItemMaster[], mapMode?: MAP_MODE): MasterGameSpecs => {
  let map: number[][][];
  if (mapMode === MAP_MODE.PRIMS) {
    let primsMapOutput = generatePrimsMap(worldWidth, worldHeight);
    map = primsMapOutput.map;
    // primsMapOutput.mapSnapshot.forEach((m) => visualizeMap(m, true, "maps/"));
  } else {
    map = generateEmptyMap(worldWidth, worldHeight); // generate empty map

    const walls = generateWallCoords(worldWidth, worldHeight, roomWidth); // generate wall blocks
    // apply block coordinates to master map;
    walls.forEach((pos) => {
      map[pos.x][pos.y].push(7);
    });
  }

  const towers = generateTowerCoords(worldWidth, worldHeight, roomWidth); // generate tower locations
  const towerSpecs = generateTowerSpecs(towers);
  let pos: position;
  let x: number;
  let y: number;
  for (let k = 0; k < towers.length; k++) {
    pos = towers[k];
    x = pos.x;
    y = pos.y;

    // check no indestructible wall exists at tower coordinate
    if (map[x][y].length === 0 || map[x][y][0] !== 7) {
      // clear tower surroundings
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x + i >= 0 && x + i < worldWidth && y + j >= 0 && y + j < worldHeight) {
            if (map[x + i][y + j].length > 0) map[x + i][y + j] = [];
          }
        }
      }

      // set tower
      const TOWER_INDEX = masterItems.indexOf(masterItems.filter((im) => im.name === 'Tower')[0]);
      map[x][y] = [TOWER_INDEX];
    } else {
      // remove one from towers and towerSpecs arrays
      towers.splice(k, 1);
      towerSpecs.splice(k, 1);
      k--;
    }
  }

  return {
    blocks: map,
    towers: towerSpecs,
  };
};

// ---------------------------------
// misc helpers
// ---------------------------------

const includeArrPos = (arr: position[], element: position): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (_.isEqual(arr[i], element)) {
      return true;
    }
  }
  return false;
};

const removeDupPosFromArr = (arr: position[]): position[] => {
  const res: position[] = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!includeArrPos(res, element)) {
      res.push(arr[i]);
    }
  }

  return res;
};

export const flatten3dMapArray = (map: number[][][]): number[][] => {
  let res: number[][] = [];
  map.forEach((row) => {
    let resRow: number[] = [];
    row.forEach((blockArr) => {
      if (blockArr.length === 0) {
        resRow.push(0);
      } else {
        resRow.push(blockArr[0]);
      }
    });
    res.push(resRow);
  });
  return res;
};
