import { Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// deploy proxy used in hre
export const deployProxy = async (contractName: string, signer: Signer, hre: HardhatRuntimeEnvironment, contractArgs: unknown[]) => {
  // add compile task to ensure artifacts are generated
  const factory = await hre.ethers.getContractFactory(contractName, signer);
  const contract = await factory.deploy(...contractArgs);
  return contract;
};
