import _ from "lodash";
import { position } from "../../types/common";

// map helpers are used to generate a world with rooms, entrances, and a tower in the middle

// Generate single room with starting coordinate
const GenerateSingleRoom = (x: number, y: number, width: number, height: number): position[] => {
  const coords = [
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

  return coords.filter((coord) => coord.x < width && coord.y < height); // remove coords outside of map
};

export const GenerateWalls = (width: number, height: number, roomWidth: number): position[] => {
  let totalPos: position[] = [];

  for (let x = 0; x < width; x += roomWidth - 1) {
    for (let y = 0; y < height; y += roomWidth - 1) {
      const coords = GenerateSingleRoom(x, y, width, height);
      totalPos = totalPos.concat(coords);
    }
  }

  // remove duplicates
  return removeDupPosFromArr(totalPos);
};

// generate empty map
export const GenerateEmptyMap = (worldWidth: number, worldHeight: number): number[][] => {
  const map = [];
  for (let i = 0; i < worldWidth * worldHeight; i++) map.push([]);
  return map;
};

// generate a list of indices to apply to the map
export const GenerateWallCoords = (worldWidth: number, worldHeight: number, roomWidth: number): number[] => {
  const walls = GenerateWalls(worldWidth, worldHeight, roomWidth);

  const coords: number[] = [];
  walls.forEach((wall) => {
    const idx = wall.y * worldWidth + wall.x; // calculate idx in array
    coords.push(idx);
  });
  return coords;
};

// master map generation function
export const MasterGenerateMap = (worldWidth: number, worldHeight: number, roomWidth: number): number[][] => {
  const map = GenerateEmptyMap(worldWidth, worldHeight); // generate empty map

  const walls = GenerateWallCoords(worldWidth, worldHeight, roomWidth); // generate wall blocks
  const towers = GenerateTowerCoords(worldWidth, worldHeight, roomWidth); // generate tower locations

  // apply block coordinates to master map;
  walls.forEach((idx) => {
    map[idx].push(14);
  });

  towers.forEach((idx) => {
    map[idx].push(15);
  });

  return map;
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

export const GenerateTowerCoords = (worldWidth: number, worldHeight: number, roomWidth: number) => {
  const towers = GenerateTowerPos(worldWidth, worldHeight, roomWidth);

  const coords: number[] = [];
  towers.forEach((pos) => {
    const idx = pos.y * worldWidth + pos.x; // calculate idx in array
    coords.push(idx);
  });
  return coords;
};

// helper functions //
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
