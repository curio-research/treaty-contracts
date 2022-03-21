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
      name: "Epoch",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Epoch__factory>;
    getContractFactory(
      name: "Game",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Game__factory>;
    getContractFactory(
      name: "Helper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Helper__factory>;
    getContractFactory(
      name: "GameStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameStorage__factory>;
    getContractFactory(
      name: "Getters",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Getters__factory>;
    getContractFactory(
      name: "IGameEngine",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGameEngine__factory>;
    getContractFactory(
      name: "Permissions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Permissions__factory>;
    getContractFactory(
      name: "Door",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Door__factory>;
    getContractFactory(
      name: "TowerGame",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TowerGame__factory>;

    getContractAt(
      name: "Epoch",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Epoch>;
    getContractAt(
      name: "Game",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Game>;
    getContractAt(
      name: "Helper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Helper>;
    getContractAt(
      name: "GameStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameStorage>;
    getContractAt(
      name: "Getters",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Getters>;
    getContractAt(
      name: "IGameEngine",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGameEngine>;
    getContractAt(
      name: "Permissions",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Permissions>;
    getContractAt(
      name: "Door",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Door>;
    getContractAt(
      name: "TowerGame",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TowerGame>;

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
