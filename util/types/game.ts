// inventory
export interface Inventory {
  itemIds: number[];
  itemAmounts: number[];
}

export interface TileWithMetadata {
  occupier: string;
  blocks: number[];
  x: number;
  y: number;
}
