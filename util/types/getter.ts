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
  programmable: boolean;
  abiEncoding: string;
  contractAddr: string;
  attackDamage: number;
}
export interface ItemMaster {
  name: string;
  item: ItemWithMetadata;
}
