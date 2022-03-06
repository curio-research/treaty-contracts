import { assert } from "console";

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

export const generatePrimsMap = (
  width: number,
  height: number
) => {
  assert(width > 0 && height > 0, "invalid map params");
  
  let map: number[][][];
  let col;

  // set all tiles as walls
  for (let i = 0; i < width; i++) {
    col = [];
    for (let j = 0; j < height; j++) {
      col.push([7]);
    }
  }

  // choose random tile with odd x and y coords and clear it
  let x = Math.floor(Math.random() * ((width-1)/2)) * 2 + 1;
  let y = Math.floor(Math.random() * ((height-1)/2)) * 2 + 1;
  map[x][y] = [];

  // create an array of tiles two spaces away from above tile
  let growableTiles: Position[] = [];
  if (x - 2 >= 0) growableTiles.push({x: x-2, y});
  if (x + 2 < width) growableTiles.push({x: x+2, y});
  if (y - 2 >= 0) growableTiles.push({x, y: y-2});
  if (y + 2 < height) growableTiles.push({x, y: y+2});

  // repeatedly remove from growable array
  let idx: number;
  let tile: Position;
  let dirs: Direction[];
  while (growableTiles.length > 0) {
    idx = Math.floor(Math.random() * growableTiles.length);
    tile = growableTiles[idx];
    map[tile.x][tile.y] = [];
    growableTiles.splice(idx, 1);

    // connect another tile
    dirs = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];
    // TODO: left here
  }
}