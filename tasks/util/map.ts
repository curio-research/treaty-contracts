// generate a world with rooms, entrances, and a tower in the middle

interface position {
  x: number;
  y: number;
}

export const GenerateWalls = (width: number, height: number): position[] => {
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

    const filteredCoords = coords.filter((coord) => coord.x <= width && coord.y <= height);
    return filteredCoords;
  };

  let totalPos: position[] = [];

  for (let x = 0; x < width; x += 5) {
    for (let y = 0; y < height; y += 5) {
      const coords = GenerateSingleRoom(x, y, width, height);
      totalPos = totalPos.concat(coords);
    }
  }

  return totalPos;
};

// Generate tower locations in middle of rooms
export const GenerateTowerPos = (width: number, height: number): position[] => {
  let totalPos: position[] = [];

  const ROOM_WIDTH = 6;

  for (let x = ROOM_WIDTH / 2; x < width; x += ROOM_WIDTH) {
    for (let y = ROOM_WIDTH / 2; y < height; y += ROOM_WIDTH) {
      totalPos = totalPos.concat([{ x, y }]);
    }
  }

  return totalPos;
};
