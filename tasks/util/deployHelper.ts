import { Signer, Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// deploy proxy used in hre
export const deployProxy = async <C extends Contract>(contractName: string, signer: Signer, hre: HardhatRuntimeEnvironment, contractArgs: unknown[]): Promise<C> => {
  // add compile task to ensure artifacts are generated
  const factory = await hre.ethers.getContractFactory(contractName, signer);
  const contract = await factory.deploy(...contractArgs);
  return contract as C;
};

export const printDivider = () => {
  console.log("------------------------------------");
};
