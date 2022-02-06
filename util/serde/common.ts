import { BigNumber as BN } from "ethers";

export const decodeBNArr = (arr: BN[]): number[] => {
  return arr.map((arr) => arr.toNumber());
};
