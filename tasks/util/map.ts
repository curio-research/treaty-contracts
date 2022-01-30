// generate a world with rooms, entrances, and a tower in the middle

interface position {
  x: number;
  y: number;
}

export const GenerateWalls = (): position[] => {
  // Generate single room with starting coordinate
  const GenerateSingleRoom = (x: number, y: number): position[] => {
    return [
      { x: x, y: y },
      { x: x + 1, y: y },
      { x: x + 5, y: y },
      { x: x + 6, y: y },
      { x: x, y: y + 1 },
      { x: x + 6, y: y + 1 },
      { x: x, y: y + 6 },
      { x: x + 6, y: y + 6 },
      { x: x, y: y + 6 },
      { x: x + 1, y: y + 6 },
      { x: x + 5, y: y + 6 },
      { x: x + 6, y: y + 6 },
    ];
  };

  let totalPos: position[] = [];

  for (let x = 0; x < 6; x + 6) {
    for (let y = 0; y < 6; y + 6) {
      totalPos.concat(GenerateSingleRoom(x, y));
    }
  }

  return totalPos;
};

// Generate tower locations in middle of rooms
export const GenerateTowerPos = (): position[] => {
  let totalPos: position[] = [];

  const STARTING_X = 3;
  const STARTING_Y = 3;

  for (let x = STARTING_X; x < 6; x + 6) {
    for (let y = STARTING_Y; y < 6; y + 6) {
      totalPos.concat([{ x, y }]);
    }
  }

  return totalPos;
};
