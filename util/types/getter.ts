export interface ItemWithMetadata {
  mineable: boolean;
  craftable: boolean;
  occupiable: boolean;
  health: number;
  mineItemIds: number[];
  craftItemIds: number[];
  craftItemAmounts: number[];
  programmable: boolean;
  abiEncoding: string;
  contractAddr: string;
  attackDamage: number;
  attackRange: number;
  attackCooldown: number;
}
export interface ItemMaster {
  name: string;
  item: ItemWithMetadata;
}
