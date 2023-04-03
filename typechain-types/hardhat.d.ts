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
      name: "Game",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Game__factory>;
    getContractFactory(
      name: "Diamond",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Diamond__factory>;
    getContractFactory(
      name: "AdminFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AdminFacet__factory>;
    getContractFactory(
      name: "DiamondCutFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DiamondCutFacet__factory>;
    getContractFactory(
      name: "DiamondLoupeFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DiamondLoupeFacet__factory>;
    getContractFactory(
      name: "GameFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameFacet__factory>;
    getContractFactory(
      name: "GetterFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GetterFacet__factory>;
    getContractFactory(
      name: "OwnershipFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnershipFacet__factory>;
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
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ECSLib",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ECSLib__factory>;
    getContractFactory(
      name: "GameLib",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameLib__factory>;
    getContractFactory(
      name: "LibDiamond",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibDiamond__factory>;
    getContractFactory(
      name: "GameItem",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameItem__factory>;
    getContractFactory(
      name: "Set",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Set__factory>;
    getContractFactory(
      name: "CurioERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CurioERC20__factory>;
    getContractFactory(
      name: "CurioERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CurioERC721__factory>;
    getContractFactory(
      name: "CurioTreaty",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CurioTreaty__factory>;
    getContractFactory(
      name: "CurioWallet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CurioWallet__factory>;
    getContractFactory(
      name: "Alliance",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Alliance__factory>;
    getContractFactory(
      name: "Bounty",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bounty__factory>;
    getContractFactory(
      name: "CollectiveDefenseFund",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CollectiveDefenseFund__factory>;
    getContractFactory(
      name: "Embargo",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Embargo__factory>;
    getContractFactory(
      name: "HandshakeDeal",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HandshakeDeal__factory>;
    getContractFactory(
      name: "LoanAgreement",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LoanAgreement__factory>;
    getContractFactory(
      name: "MercenaryLeague",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MercenaryLeague__factory>;
    getContractFactory(
      name: "NonAggressionPact",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NonAggressionPact__factory>;
    getContractFactory(
      name: "SimpleOTC",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleOTC__factory>;
    getContractFactory(
      name: "TestTreaty",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestTreaty__factory>;
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
      name: "UintArrayComponent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UintArrayComponent__factory>;
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
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721TokenReceiver__factory>;

    getContractAt(
      name: "Component",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Component>;
    getContractAt(
      name: "Game",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Game>;
    getContractAt(
      name: "Diamond",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Diamond>;
    getContractAt(
      name: "AdminFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AdminFacet>;
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
      name: "GameFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameFacet>;
    getContractAt(
      name: "GetterFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GetterFacet>;
    getContractAt(
      name: "OwnershipFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnershipFacet>;
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
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ECSLib",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ECSLib>;
    getContractAt(
      name: "GameLib",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameLib>;
    getContractAt(
      name: "LibDiamond",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibDiamond>;
    getContractAt(
      name: "GameItem",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameItem>;
    getContractAt(
      name: "Set",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Set>;
    getContractAt(
      name: "CurioERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CurioERC20>;
    getContractAt(
      name: "CurioERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CurioERC721>;
    getContractAt(
      name: "CurioTreaty",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CurioTreaty>;
    getContractAt(
      name: "CurioWallet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CurioWallet>;
    getContractAt(
      name: "Alliance",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Alliance>;
    getContractAt(
      name: "Bounty",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Bounty>;
    getContractAt(
      name: "CollectiveDefenseFund",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CollectiveDefenseFund>;
    getContractAt(
      name: "Embargo",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Embargo>;
    getContractAt(
      name: "HandshakeDeal",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HandshakeDeal>;
    getContractAt(
      name: "LoanAgreement",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LoanAgreement>;
    getContractAt(
      name: "MercenaryLeague",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MercenaryLeague>;
    getContractAt(
      name: "NonAggressionPact",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NonAggressionPact>;
    getContractAt(
      name: "SimpleOTC",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleOTC>;
    getContractAt(
      name: "TestTreaty",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestTreaty>;
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
      name: "UintArrayComponent",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UintArrayComponent>;
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
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721TokenReceiver>;

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
