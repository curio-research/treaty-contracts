import { assert } from 'console';
import { position } from '../../util/types/common';
import { WORLD_WIDTH } from './constants';
import { printDivider } from './deployHelper';
import { PrimsMapOutput } from './types/mapGenerator';

type Position = {
  x: number;
  y: number;
};

enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

const REMOVAL_COUNT = 4;
const GROWTH_COUNT = 2;

const equals = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i]);

/**
 * Generate walls on the world map based on Prim's algorithm.
 * @param width : world width;
 * @param height : world height;
 * @param wallIdx : index of wall in the items array
 * @returns block map together with complete snapshots
 */
export const generatePrimsMap = (width: number, height: number, wallIdx: number = 7): PrimsMapOutput => {
  assert(width > 0 && height > 0, 'invalid map params');

  let map: number[][][] = [];
  let mapSnapshot: number[][][][] = [];
  let col: number[][];

  // set all tiles as walls
  for (let i = 0; i < width; i++) {
    col = [];
    for (let j = 0; j < height; j++) {
      col.push([wallIdx]);
    }
    map.push(col);
  }
  mapSnapshot.push(JSON.parse(JSON.stringify(map)));

  /**
   * Generate a Maze
   */
  // choose random tile with odd x and y coords and clear it
  let x = Math.floor(Math.random() * ((width - 1) / 2)) * 2 + 1;
  let y = Math.floor(Math.random() * ((height - 1) / 2)) * 2 + 1;
  map[x][y] = [];

  // create an array of tiles two spaces away from above tile
  let growableTiles: Position[] = [];
  if (x - 2 >= 0) growableTiles.push({ x: x - 2, y });
  if (x + 2 < width) growableTiles.push({ x: x + 2, y });
  if (y - 2 >= 0) growableTiles.push({ x, y: y - 2 });
  if (y + 2 < height) growableTiles.push({ x, y: y + 2 });

  // repeatedly remove from growable array
  let idx: number;
  let pos: Position;
  let dirs: Direction[];
  while (growableTiles.length > 0) {
    idx = Math.floor(Math.random() * growableTiles.length);
    pos = growableTiles[idx];
    x = pos.x;
    y = pos.y;
    if (!equals(map[x][y], [wallIdx])) {
      // must only remove walls
      growableTiles.splice(idx, 1);
      continue;
    }
    map[x][y] = [];
    growableTiles.splice(idx, 1);

    // connect the tile to a cleared tile
    dirs = [Direction.WEST, Direction.EAST, Direction.NORTH, Direction.SOUTH];
    let dirIdx: number;
    while (dirs.length > 0) {
      dirIdx = Math.floor(Math.random() * dirs.length);
      switch (dirs[dirIdx]) {
        case Direction.WEST:
          if (x - 2 >= 0 && equals(map[x - 2][y], [])) {
            map[x - 1][y] = [];
            dirs = [];
          }
          break;
        case Direction.EAST:
          if (x + 2 < width && equals(map[x + 2][y], [])) {
            map[x + 1][y] = [];
            dirs = [];
          }
          break;
        case Direction.NORTH:
          if (y - 2 >= 0 && equals(map[x][y - 2], [])) {
            map[x][y - 1] = [];
            dirs = [];
          }
          break;
        case Direction.SOUTH:
          if (y + 2 < height && equals(map[x][y + 2], [])) {
            map[x][y + 1] = [];
            dirs = [];
          }
          break;
      }
      dirs.splice(dirIdx, 1);
    }

    // add valid tiles two spaces away from tile just cleared
    if (x - 2 >= 0 && equals(map[x - 2][y], [wallIdx])) {
      growableTiles.push({ x: x - 2, y });
    }
    if (x + 2 < width && equals(map[x + 2][y], [wallIdx])) {
      growableTiles.push({ x: x + 2, y });
    }
    if (y - 2 >= 0 && equals(map[x][y - 2], [wallIdx])) {
      growableTiles.push({ x, y: y - 2 });
    }
    if (y + 2 < height && equals(map[x][y + 2], [wallIdx])) {
      growableTiles.push({ x, y: y + 2 });
    }

    mapSnapshot.push(JSON.parse(JSON.stringify(map)));
  }

  /**
   * Remove Dead Ends
   */
  let deadEnds: Position[];
  let neighbors: number;
  for (let k = 0; k < REMOVAL_COUNT; k++) {
    // obtain list of all dead ends by checking number of neighbors
    deadEnds = [];
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        if (equals(map[w][h], [])) {
          neighbors = 0;
          if (w - 1 >= 0 && equals(map[w - 1][h], [])) neighbors++;
          if (w + 1 < width && equals(map[w + 1][h], [])) neighbors++;
          if (h - 1 >= 0 && equals(map[w][h - 1], [])) neighbors++;
          if (h + 1 < height && equals(map[w][h + 1], [])) neighbors++;
          if (neighbors <= 1) {
            deadEnds.push({ x: w, y: h });
          }
        }
      }
    }

    // remove dead ends
    deadEnds.forEach((pos) => (map[pos.x][pos.y] = [wallIdx]));

    mapSnapshot.push(JSON.parse(JSON.stringify(map)));
  }

  /**
   * Grow Map Using Cellular Automata
   */
  let newTiles: Position[];
  let neighborX: number;
  let neighborY: number;
  for (let k = 0; k < GROWTH_COUNT; k++) {
    newTiles = [];
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        if (equals(map[w][h], [wallIdx])) {
          neighbors = 0;
          for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
              neighborX = w + a;
              neighborY = h + b;
              if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
                if (equals(map[neighborX][neighborY], [])) neighbors++;
              }
            }
          }
          if (neighbors >= 4) {
            newTiles.push({ x: w, y: h });
          }
        }
      }
    }
    newTiles.forEach((pos) => (map[pos.x][pos.y] = []));

    mapSnapshot.push(JSON.parse(JSON.stringify(map)));
  }

  /**
   * Remove Dead Ends (Again)
   */
  for (let k = 0; k < REMOVAL_COUNT; k++) {
    // obtain list of all dead ends by checking number of neighbors
    deadEnds = [];
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        if (equals(map[w][h], [])) {
          neighbors = 0;
          if (w - 1 >= 0 && equals(map[w - 1][h], [])) neighbors++;
          if (w + 1 < width && equals(map[w + 1][h], [])) neighbors++;
          if (h - 1 >= 0 && equals(map[w][h - 1], [])) neighbors++;
          if (h + 1 < height && equals(map[w][h + 1], [])) neighbors++;
          if (neighbors <= 1) {
            deadEnds.push({ x: w, y: h });
          }
        }
      }
    }

    // remove dead ends
    deadEnds.forEach((pos) => (map[pos.x][pos.y] = [wallIdx]));

    mapSnapshot.push(JSON.parse(JSON.stringify(map)));
  }

  return { map, mapSnapshot };
};

const getFIndexFromCoord = (coord: position): number => {
  return coord.x * WORLD_WIDTH + coord.y;
};

const getCoordFromFIndex = (fIndex: number): position => {
  return { x: Math.floor(fIndex / WORLD_WIDTH), y: fIndex % WORLD_WIDTH };
};

/**
 * Add additional corridors to a Prim's map to increase connectivity.
 * @param map : map generated from Prim's algorithm.
 * @param maxCorridorLen : maximal length of a corridor to cut
 * @param minPeninsularPerimToCut : minimal perimeter for a peninsular to cut
 * @returns map with additional corridors
 */
export const addConnectivity = (
  map: number[][][],
  maxCorridorLen: number = 5,
  minPeninsularPerimToCut: number = 100
): number[][][] => {
  /**
   * TODO:
   * 1. Add corridor-perimeter pairs rather than a single pair for more flexibility.
   * 2. Fix adjacent multicut problem.
   */

  const width = map.length;
  const height = map[0].length;

  let yRange: number;
  let coords: position[];
  let lastCoord: position = { x: 0, y: 0 };

  printDivider();
  console.log('✦ adding connectivity to map');

  /**
   * Iterate through all empty tiles
   */
  for (let x = maxCorridorLen; x < width - maxCorridorLen; x++) {
    for (let y = maxCorridorLen; y < height - maxCorridorLen; y++) {
      if (map[x][y].length > 0) continue; // ignore walls

      /**
       * Find coordinates close enough for potential corridors
       */
      coords = [];
      for (let xDiff = -maxCorridorLen + 1; xDiff < maxCorridorLen; xDiff++) {
        yRange = maxCorridorLen - Math.abs(xDiff);
        for (let yDiff = -yRange + 1; yDiff < yRange; yDiff++) {
          if (xDiff === 0 && yDiff === 0) continue; // skip current coordinate

          // only track empty tiles
          if (map[x + xDiff][y + yDiff].length === 0) {
            coords.push({ x: x + xDiff, y: y + yDiff });
          }
        }
      }

      /**
       * Run shortest path algorithm until all coordinates are visited
       */
      let visited: Set<number> = new Set();
      let border: Set<number> = new Set();
      let temp: Set<number>;
      let travelDist = 0;
      let neighbor: number;
      let c: position;
      border.add(getFIndexFromCoord({ x, y }));

      while (coords) {
        if (travelDist > 1000) throw 'timeout';

        temp = new Set();

        // from every point on the border, take a step in every four directions
        border.forEach((fIndex) => {
          c = getCoordFromFIndex(fIndex);

          neighbor = getFIndexFromCoord({ x: c.x - 1, y: c.y });
          if (map[c.x - 1][c.y].length === 0 && !visited.has(neighbor)) {
            temp.add(neighbor);
          }
          neighbor = getFIndexFromCoord({ x: c.x + 1, y: c.y });
          if (map[c.x + 1][c.y].length === 0 && !visited.has(neighbor)) {
            temp.add(neighbor);
          }
          neighbor = getFIndexFromCoord({ x: c.x, y: c.y - 1 });
          if (map[c.x][c.y - 1].length === 0 && !visited.has(neighbor)) {
            temp.add(neighbor);
          }
          neighbor = getFIndexFromCoord({ x: c.x, y: c.y + 1 });
          if (map[c.x][c.y + 1].length === 0 && !visited.has(neighbor)) {
            temp.add(neighbor);
          }
        });

        if (temp.size === 0) break; // finished exploring map

        border = new Set(temp);
        for (let i = 0; i < coords.length; i++) {
          if (border.has(getFIndexFromCoord(coords[i]))) {
            if (coords.length == 1) lastCoord = coords[i]; // found the last visited coordinate
            coords.splice(i, 1);
            i--;
          }
        }

        border.forEach((c) => visited.add(c));
        travelDist++;
      }

      /**
       * Slice corridor
       */
      if (travelDist > minPeninsularPerimToCut) {
        console.log('slicing a corridor from (' + x + ', ' + y + ') to (' + lastCoord.x + ', ' + lastCoord.y + ')...');

        if (lastCoord.x === 0 && lastCoord.y === 0) throw 'logic error';

        const xS = Math.min(lastCoord.x, x);
        const xL = Math.max(lastCoord.x, x);
        const yS = Math.min(lastCoord.y, y);
        const yL = Math.max(lastCoord.y, y);

        // dig in x-direction
        for (let xTrans = xS; xTrans <= xL; xTrans++) {
          map[xTrans][yS] = [];
        }

        // dig in y-direction depending on how the two coordinates are laid out
        const xDig = (xS === x && yS === y) || (xS === lastCoord.x && yS === lastCoord.y) ? xS : xL;
        for (let yTrans = yS; yTrans <= yL; yTrans++) {
          map[xDig][yTrans] = [];
        }
      }
    }
  }

  printDivider();
  return map;
};
