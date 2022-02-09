import { EMPTY_ADDRESS } from "./../../util/network/common";
import { position } from "./../../util/types/common";
import { GenerateWallCoordsProps, MasterGameSpecs, TowerCoordsProps } from "./types/mapGenerator";
import _ from "lodash";
import { TowerWithLocation } from "../../util/types/tower";

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
export const generateEmptyMap = (worldWidth: number, worldHeight: number): number[][] => {
  const map = [];
  for (let i = 0; i < worldWidth * worldHeight; i++) map.push([]);
  return map;
};

// generate a list of indices to apply to the map
export const generateWallCoords = (worldWidth: number, worldHeight: number, roomWidth: number): GenerateWallCoordsProps => {
  const walls = generateWalls(worldWidth, worldHeight, roomWidth);
  const indexedCoords = walls.map((wall) => wall.y * worldWidth + wall.x);

  return {
    gridCoords: walls,
    indices: indexedCoords,
  };
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

export const generateTowerCoords = (worldWidth: number, worldHeight: number, roomWidth: number): TowerCoordsProps => {
  const towers = GenerateTowerPos(worldWidth, worldHeight, roomWidth);
  const indices = towers.map((pos) => pos.y * worldWidth + pos.x);

  return {
    gridCoords: towers,
    indices: indices,
  };
};

const generateTowerSpecs = (towerLocations: position[]): TowerWithLocation[] => {
  return towerLocations.map((location) => {
    return {
      location: {
        x: location.x,
        y: location.y,
      },
      tower: {
        rewardPerEpoch: 100,
        itemId: 1,
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

  const towerSpecs = generateTowerSpecs(towers.gridCoords);

  // apply block coordinates to master map;
  walls.indices.forEach((idx) => {
    map[idx].push(3);
  });

  towers.indices.forEach((idx) => {
    map[idx].push(4);
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
