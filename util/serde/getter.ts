import { ItemWithMetadata } from './../types/getter';
import { ItemWithMetadataStruct } from './../../typechain-types/Getters';
import { decodeBigNumberishArr } from './common';

export const decodeItemWithMetadata = (res: ItemWithMetadataStruct): ItemWithMetadata => {
  return {
    mineable: res.mineable,
    craftable: res.craftable,
    occupiable: res.occupiable,
    strength: Number(res.strength),
    healthDamage: Number(res.healthDamage),
    mineItemIds: decodeBigNumberishArr(res.mineItemIds),
    craftItemIds: decodeBigNumberishArr(res.craftItemIds),
    craftItemAmounts: decodeBigNumberishArr(res.craftItemAmounts),
    programmable: res.programmable,
  };
};

export const decodeBulkGetAllItems = (res: ItemWithMetadataStruct[]): ItemWithMetadata[] => {
  return res.map((item) => decodeItemWithMetadata(item));
};
