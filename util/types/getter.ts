import { ALL_ITEMS } from "./../../tasks/util/constants";
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
}

export interface ItemMaster {
  name: string;
  item: ItemWithMetadata;
}

export interface Item {
  name: ALL_ITEMS;
  item: ItemWithMetadata;
}
