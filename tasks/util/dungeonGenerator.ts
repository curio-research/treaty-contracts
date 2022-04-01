// experiment using rot.js for generating dungeons for demo purpose
import ROT, { Map } from 'rot-js';

// ROT.RNG.setSeed(1234);
// var map = new ROT.Map.Digger(10, 10);
// var display = new ROT.Display({ fontSize: 8 });
// SHOW(display.getContainer());
// map.create(display.DEBUG);

// var drawDoor = function (x, y) {
//   display.draw(x, y, '', '', 'red');
// };

// var rooms = map.getRooms();
// for (var i = 0; i < rooms.length; i++) {
//   var room = rooms[i];
//   SHOW(ROT.Util.format('Room #%s: [%s, %s] => [%s, %s]', i + 1, room.getLeft(), room.getTop(), room.getRight(), room.getBottom()));

//   room.getDoors(drawDoor);
// }

export const createCellularMap = (WIDTH: number, HEIGHT: number): number[][] => {
  let worldMap = new Array(WIDTH);
  for (let x = 0; x < WIDTH; x++) {
    worldMap[x] = new Array(HEIGHT);
  }

  var map = new Map.Cellular(WIDTH, HEIGHT); // { connected: true }
  map.randomize(0.5);

  var userCallback = (x: any, y: any, value: any) => {
    if (x === 0 || y === 0 || x === WIDTH - 1 || y === HEIGHT - 1) {
      worldMap[x][y] = 1; // Create walls around edges of map
      return;
    }
    worldMap[x][y] = value === 0 ? 1 : 0;
  };
  map.create(userCallback);
  map.connect(userCallback, 1);

  return worldMap;
};
