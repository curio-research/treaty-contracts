export interface ItemWithMetadata {
  mineable: boolean;
  craftable: boolean;
  strength: number;
  mineItemIds: number[];
  craftItemIds: number[];
  craftItemAmounts: number[];
  programmable: boolean;
  abiEncoding: string;
  contractAddr: string;
}

export interface ItemMaster {
  name: string;
  item: ItemWithMetadata;
}
