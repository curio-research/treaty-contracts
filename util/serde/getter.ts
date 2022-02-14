import { ItemWithMetadata } from "./../types/getter";
import { ItemWithMetadataStruct } from "./../../typechain-types/Getters";
import { decodeBigNumberishArr } from "./common";

export const decodeItemWithMetadata = (res: ItemWithMetadataStruct): ItemWithMetadata => {
  return {
    mineable: res.mineable,
    craftable: res.craftable,
    occupiable: res.occupiable,
    strength: Number(res.strength),
    healthDamage: Number(res.healthDamage),
    energyDamage: Number(res.energyDamage),
    mineItemIds: decodeBigNumberishArr(res.mineItemIds),
    craftItemIds: decodeBigNumberishArr(res.craftItemIds),
    craftItemAmounts: decodeBigNumberishArr(res.craftItemAmounts),
  };
};

export const decodeBulkGetAllItems = (res: ItemWithMetadataStruct[]): ItemWithMetadata[] => {
  return res.map((item) => decodeItemWithMetadata(item));
};