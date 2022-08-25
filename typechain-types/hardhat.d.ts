/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Component",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Component__factory>;
    getContractFactory(
      name: "AddressComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AddressComponent__factory>;
    getContractFactory(
      name: "BoolComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BoolComponent__factory>;
    getContractFactory(
      name: "IntComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IntComponent__factory>;
    getContractFactory(
      name: "PositionComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PositionComponent__factory>;
    getContractFactory(
      name: "StringComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StringComponent__factory>;
    getContractFactory(
      name: "UintComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UintComponent__factory>;
    getContractFactory(
      name: "Diamond",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Diamond__factory>;
    getContractFactory(
      name: "DiamondCutFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DiamondCutFacet__factory>;
    getContractFactory(
      name: "DiamondLoupeFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DiamondLoupeFacet__factory>;
    getContractFactory(
      name: "EngineFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EngineFacet__factory>;
    getContractFactory(
      name: "GetterFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GetterFacet__factory>;
    getContractFactory(
      name: "HelperFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HelperFacet__factory>;
    getContractFactory(
      name: "OwnershipFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnershipFacet__factory>;
    getContractFactory(
      name: "PolicyFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PolicyFacet__factory>;
    getContractFactory(
      name: "IDiamondCut",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDiamondCut__factory>;
    getContractFactory(
      name: "IDiamondLoupe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDiamondLoupe__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IERC173",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC173__factory>;
    getContractFactory(
      name: "Util",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Util__factory>;
    getContractFactory(
      name: "LibDiamond",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibDiamond__factory>;
    getContractFactory(
      name: "Set",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Set__factory>;
    getContractFactory(
      name: "AddressComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AddressComponent__factory>;
    getContractFactory(
      name: "BoolComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BoolComponent__factory>;
    getContractFactory(
      name: "IntComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IntComponent__factory>;
    getContractFactory(
      name: "PositionComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PositionComponent__factory>;
    getContractFactory(
      name: "StringComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StringComponent__factory>;
    getContractFactory(
      name: "UintComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UintComponent__factory>;
    getContractFactory(
      name: "DiamondInit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DiamondInit__factory>;
    getContractFactory(
      name: "Curio",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Curio__factory>;

    getContractAt(
      name: "Component",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Component>;
    getContractAt(
      name: "AddressComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AddressComponent>;
    getContractAt(
      name: "BoolComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BoolComponent>;
    getContractAt(
      name: "IntComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IntComponent>;
    getContractAt(
      name: "PositionComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PositionComponent>;
    getContractAt(
      name: "StringComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StringComponent>;
    getContractAt(
      name: "UintComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UintComponent>;
    getContractAt(
      name: "Diamond",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Diamond>;
    getContractAt(
      name: "DiamondCutFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DiamondCutFacet>;
    getContractAt(
      name: "DiamondLoupeFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DiamondLoupeFacet>;
    getContractAt(
      name: "EngineFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EngineFacet>;
    getContractAt(
      name: "GetterFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GetterFacet>;
    getContractAt(
      name: "HelperFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HelperFacet>;
    getContractAt(
      name: "OwnershipFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnershipFacet>;
    getContractAt(
      name: "PolicyFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PolicyFacet>;
    getContractAt(
      name: "IDiamondCut",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDiamondCut>;
    getContractAt(
      name: "IDiamondLoupe",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDiamondLoupe>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IERC173",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC173>;
    getContractAt(
      name: "Util",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Util>;
    getContractAt(
      name: "LibDiamond",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibDiamond>;
    getContractAt(
      name: "Set",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Set>;
    getContractAt(
      name: "AddressComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AddressComponent>;
    getContractAt(
      name: "BoolComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BoolComponent>;
    getContractAt(
      name: "IntComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IntComponent>;
    getContractAt(
      name: "PositionComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PositionComponent>;
    getContractAt(
      name: "StringComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StringComponent>;
    getContractAt(
      name: "UintComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UintComponent>;
    getContractAt(
      name: "DiamondInit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DiamondInit>;
    getContractAt(
      name: "Curio",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Curio>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
