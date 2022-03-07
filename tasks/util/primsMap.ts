import { assert } from "console";
import { PrimsMapOutput } from "./types/mapGenerator";

type Position = {
  x: number;
  y: number;
}

enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST
}

const REMOVAL_COUNT = 4;
const GROWTH_COUNT = 2;

const equals = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i]);

export const generatePrimsMap = (
  width: number,
  height: number,
  wallIdx: number = 7
): PrimsMapOutput => {
  assert(width > 0 && height > 0, "invalid map params");

  let map: number[][][] = [];
  let mapSnapshot: number[][][][] = [];
  let col: number[][];

  // set all tiles as walls
  for (let i = 0; i < width; i++) {
    col = [];
    for (let j = 0; j < height; j++) {
      col.push([wallIdx]);
    }
    map.push(col)
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
    if (!equals(map[x][y], [wallIdx])) { // must only remove walls
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
          if (x - 2 >= 0 && equals(map[x-2][y], [])) {
            map[x-1][y] = [];
            dirs = [];
          }
          break;
        case Direction.EAST:
            if (x + 2 < width && equals(map[x+2][y], [])) {
              map[x+1][y] = [];
              dirs = [];
            }
            break;
        case Direction.NORTH:
          if (y - 2 >= 0 && equals(map[x][y-2], [])) {
            map[x][y-1] = [];
            dirs = [];
          }
          break;
        case Direction.SOUTH:
          if (y + 2 < height && equals(map[x][y+2], [])) {
            map[x][y+1] = [];
            dirs = [];
          }
          break;
      }
      dirs.splice(dirIdx, 1);
    }

    // add valid tiles two spaces away from tile just cleared
    if (x - 2 >= 0 && equals(map[x-2][y], [wallIdx])) {
      growableTiles.push({ x: x - 2, y });
    }
    if (x + 2 < width && equals(map[x+2][y], [wallIdx])) {
      growableTiles.push({ x: x + 2, y });
    }
    if (y - 2 >= 0 && equals(map[x][y-2], [wallIdx])) {
      growableTiles.push({ x, y: y - 2 });
    }
    if (y + 2 < height && equals(map[x][y+2], [wallIdx])) {
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
          if (w - 1 >= 0 && equals(map[w-1][h], [])) neighbors++;
          if (w + 1 < width && equals(map[w+1][h], [])) neighbors++;
          if (h - 1 >= 0 && equals(map[w][h-1], [])) neighbors++;
          if (h + 1 < height && equals(map[w][h+1], [])) neighbors++;
          if (neighbors <= 1) {
            deadEnds.push({ x: w, y: h });
          }
        }
      }
    }

    // remove dead ends
    deadEnds.forEach((pos) => map[pos.x][pos.y] = [wallIdx])

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
              if (neighborX >= 0 && neighborX < width 
                  && neighborY >= 0 && neighborY < height) {
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
    newTiles.forEach((pos) => map[pos.x][pos.y] = []);

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
          if (w - 1 >= 0 && equals(map[w-1][h], [])) neighbors++;
          if (w + 1 < width && equals(map[w+1][h], [])) neighbors++;
          if (h - 1 >= 0 && equals(map[w][h-1], [])) neighbors++;
          if (h + 1 < height && equals(map[w][h+1], [])) neighbors++;
          if (neighbors <= 1) {
            deadEnds.push({ x: w, y: h });
          }
        }
      }
    }

    // remove dead ends
    deadEnds.forEach((pos) => map[pos.x][pos.y] = [wallIdx])

    mapSnapshot.push(JSON.parse(JSON.stringify(map)));
  }

  return { map, mapSnapshot };
}