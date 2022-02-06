export interface ItemWithMetadata {
  mineable: boolean;
  craftable: boolean;
  occupiable: boolean;
  strength: number;
  healthDamage: number;
  energyDamage: number;
  mineItemIds: number[];
  craftItemIds: number[];
  craftItemAmounts: number[];
}
