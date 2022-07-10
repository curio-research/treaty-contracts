// Contains fixed maps for game

interface Position {
  x: number;
  y: number;
}
interface Stronghold {
  name: string;
  position: Position;
}

const W = 2;
const L = 1;
const C = 0;
const B = 3;
const I = 4;

const MEDITERRAINEAN_GEOGRAPHY = [
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, L],
  [W, W, W, W, L, L, L, L, L, L, L, W, W, W, W, L, L, L],
  [W, W, W, W, L, L, L, L, L, L, L, W, W, W, L, L, L, L],
  [W, W, W, W, L, L, L, L, L, L, L, W, L, L, L, L, L, L],
  [W, W, W, W, L, L, L, L, L, L, L, W, W, L, L, L, L, L],
  [W, W, W, W, L, L, L, L, L, L, L, W, W, L, L, L, L, L],
  [L, L, L, L, L, L, L, L, L, L, W, W, L, L, L, L, L, L],
  [L, L, L, L, L, L, L, W, W, W, W, W, L, L, L, L, L, L],
  [L, L, L, L, L, L, W, W, W, W, W, L, L, L, L, L, L, L],
  [L, L, L, L, W, W, W, W, W, W, W, L, L, L, L, L, L, L],
  [L, L, L, L, W, W, W, W, W, W, W, L, L, L, L, L, L, L],
  [L, L, L, L, W, W, W, W, W, W, W, L, L, L, L, L, L, L],
  [L, L, L, L, W, W, W, W, W, W, W, L, L, L, L, L, L, L],
  [L, L, L, W, W, L, W, L, L, W, W, L, L, L, L, L, L, L],
  [L, L, L, W, W, W, W, W, W, W, W, L, L, W, L, L, L, L],
  [L, L, L, L, L, W, W, W, W, W, W, W, W, W, W, L, L, L],
  [L, L, W, L, L, L, W, W, W, W, W, W, W, W, W, L, L, L],
  [L, L, W, W, L, L, L, W, W, W, L, W, W, W, W, L, L, L],
  [L, L, L, W, W, L, L, L, W, W, L, W, W, W, W, W, L, L],
  [L, L, L, L, W, W, L, L, L, L, W, W, W, W, W, W, W, L],
  [L, L, L, L, L, W, W, L, W, W, W, W, W, W, W, W, W, L],
  [L, L, L, L, L, W, W, W, W, W, W, W, W, W, W, W, W, L],
  [L, L, L, L, L, L, L, L, W, W, W, W, W, W, W, W, W, L],
  [L, L, L, L, L, L, L, L, L, L, W, W, W, W, W, L, L, L],
  [L, L, L, L, L, L, L, L, L, L, L, W, W, W, W, L, L, L],
  [L, L, L, L, L, L, L, W, W, L, W, W, W, W, W, W, L, L],
  [L, L, L, L, L, L, L, W, W, W, W, W, L, W, W, W, L, L],
  [L, L, L, L, L, L, L, W, W, W, W, W, W, W, W, W, L, L],
  [L, L, L, L, W, W, L, W, L, L, L, W, W, W, W, W, W, L],
  [L, L, W, W, W, W, W, W, L, L, L, W, W, W, W, W, W, L],
  [L, W, W, W, W, W, W, L, L, L, L, W, W, W, W, W, L, L],
  [L, W, W, W, W, W, W, L, L, L, L, W, W, W, W, W, L, L],
  [L, W, W, W, W, W, L, L, L, L, L, L, W, L, W, W, W, L],
  [L, L, L, W, W, W, L, L, L, L, L, W, W, W, W, W, L, L],
  [L, W, L, W, W, W, L, L, L, L, L, W, W, W, L, L, L, L],
  [W, W, W, W, W, W, W, L, L, L, L, L, L, L, L, L, L, L],
  [W, W, L, W, W, W, W, L, L, L, L, L, L, L, L, L, L, L],
  [L, L, L, L, W, W, W, L, L, L, L, L, L, L, L, L, L, L],
  [L, L, L, L, L, W, W, L, L, L, L, L, L, L, L, L, L, L],
  [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
  [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
];
const tier1Strongholds: Stronghold[] = [
  { name: 'Madrid', position: { x: 5, y: 7 } },
  { name: 'Carthage', position: { x: 16, y: 11 } },
  { name: 'Rome', position: { x: 18, y: 5 } },
  { name: 'Athens', position: { x: 27, y: 9 } },
  { name: 'Constantinople', position: { x: 30, y: 6 } },
  { name: 'Cairo', position: { x: 33, y: 16 } },
];
const tier2Strongholds: Stronghold[] = [
  { name: 'Rabat', position: { x: 3, y: 14 } },
  { name: 'Barcelona', position: { x: 10, y: 5 } },
  { name: 'Algeris', position: { x: 11, y: 11 } },
  { name: 'Geneva', position: { x: 13, y: 1 } },
  { name: 'Florence', position: { x: 17, y: 3 } },
  { name: 'Palermo', position: { x: 19, y: 10 } },
  { name: 'Vienna', position: { x: 20, y: 0 } },
  { name: 'Bucharest', position: { x: 28, y: 2 } },
  { name: 'Crete', position: { x: 28, y: 12 } },
  { name: 'Ankara', position: { x: 34, y: 8 } },
  { name: 'Jerusalem', position: { x: 36, y: 15 } },
  { name: 'Damascus', position: { x: 38, y: 13 } },
];
const addCoasts = (map: number[][]): number[][] => {
  // TODO: implement
  return [];
};
const addStrongholds = (map: number[][], strongholds: Stronghold[]): number[][] => {
  strongholds.forEach((s) => (map[s.position.x][s.position.y] = map[s.position.x][s.position.y] === C ? B : I));
  return map;
};

export const MEDITERRAINERAN_MAP = addStrongholds(addCoasts(MEDITERRAINEAN_GEOGRAPHY), [...tier1Strongholds, ...tier2Strongholds]);
