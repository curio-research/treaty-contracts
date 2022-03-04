import { EMPTY_ADDRESS } from "./../../util/network/common";
import { position } from "./../../util/types/common";
import { MasterGameSpecs, CoordsProps } from "./types/mapGenerator";
import _ from "lodash";
import { TowerWithLocation } from "../../util/types/tower";
import { WORLD_HEIGHT, WORLD_WIDTH } from "./constants";
import fs from "fs";

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

export const generateMap = (worldWidth: number, worldHeight: number, roomWidth: number): MasterGameSpecs => {
  const map = generateEmptyMap(worldWidth, worldHeight); // generate empty map

  const walls = generateWallCoords(worldWidth, worldHeight, roomWidth); // generate wall blocks
  const towers = generateTowerCoords(worldWidth, worldHeight, roomWidth); // generate tower locations

  const towerSpecs = generateTowerSpecs(towers);

  // apply block coordinates to master map;
  walls.forEach((pos) => {
    map[pos.x][pos.y].push(7);
  });

  towers.forEach((pos) => {
    map[pos.x][pos.y].push(4);
  });

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

/**
 * Visualize map blocks of a map.
 * @param blocks A list of positions with their list of blocks
 * @param exportToFile Whether to export output to file or to log
 */
export const visualizeMap = (blocks: number[][], exportToFile?: boolean): void => {
  let visualMap = "";
  for (let i = 0; i < WORLD_WIDTH; i++) {
    for (let j = 0; j < WORLD_HEIGHT; j++) {
      let block;
      if (blocks[i * WORLD_WIDTH + j].length > 0) {
        block = blocks[i * WORLD_WIDTH + j][0] + "";
        if (block.length == 1) block = " " + block;
      } else {
        block = "  ";
      }

      visualMap += "[" + block + "] ";
    }
    visualMap += "\n";
  }

  if (exportToFile) {
    fs.writeFileSync("map.txt", visualMap);
  } else {
    console.log(visualMap);
  }
};
