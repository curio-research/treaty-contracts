import { HardhatRuntimeEnvironment } from "hardhat/types";
import pinataSDK from "@pinata/sdk";

// deploy proxy used in hre
export const deployToIPFS = async (
  hre: HardhatRuntimeEnvironment,
  contract: string
): Promise<any> => {
  const pinata = pinataSDK(
    process.env.PINATA_API_KEY!,
    process.env.PINATA_API_SECRET!
  );
  try {
    await pinata.testAuthentication();
    const doorAbi = (await hre.artifacts.readArtifact(contract)).abi;
    const res = await pinata.pinJSONToIPFS(doorAbi);
    return res;
  } catch (error) {
    console.log(error);
  }
};
