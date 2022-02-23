/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export type TileWithMetadataStruct = {
  occupier: string;
  blocks: BigNumberish[];
  x: BigNumberish;
  y: BigNumberish;
};

export type TileWithMetadataStructOutput = [
  string,
  BigNumber[],
  BigNumber,
  BigNumber
] & { occupier: string; blocks: BigNumber[]; x: BigNumber; y: BigNumber };

export type ItemWithMetadataStruct = {
  mineable: boolean;
  craftable: boolean;
  occupiable: boolean;
  strength: BigNumberish;
  healthDamage: BigNumberish;
  energyDamage: BigNumberish;
  mineItemIds: BigNumberish[];
  craftItemIds: BigNumberish[];
  craftItemAmounts: BigNumberish[];
};

export type ItemWithMetadataStructOutput = [
  boolean,
  boolean,
  boolean,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber[],
  BigNumber[],
  BigNumber[]
] & {
  mineable: boolean;
  craftable: boolean;
  occupiable: boolean;
  strength: BigNumber;
  healthDamage: BigNumber;
  energyDamage: BigNumber;
  mineItemIds: BigNumber[];
  craftItemIds: BigNumber[];
  craftItemAmounts: BigNumber[];
};

export type PlayerDataStruct = {
  initialized: boolean;
  initTimestamp: BigNumberish;
  playerAddr: string;
  health: BigNumberish;
  energy: BigNumberish;
  reach: BigNumberish;
  position: PositionStruct;
};

export type PlayerDataStructOutput = [
  boolean,
  BigNumber,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  PositionStructOutput
] & {
  initialized: boolean;
  initTimestamp: BigNumber;
  playerAddr: string;
  health: BigNumber;
  energy: BigNumber;
  reach: BigNumber;
  position: PositionStructOutput;
};

export interface GettersInterface extends utils.Interface {
  functions: {
    "GET_MAP_INTERVAL()": FunctionFragment;
    "_getMap((uint256,uint256))": FunctionFragment;
    "bulkGetAllItems()": FunctionFragment;
    "bulkGetAllPlayerData()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "GET_MAP_INTERVAL",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getMap",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "bulkGetAllItems",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bulkGetAllPlayerData",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "GET_MAP_INTERVAL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getMap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bulkGetAllItems",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bulkGetAllPlayerData",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Getters extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GettersInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    GET_MAP_INTERVAL(overrides?: CallOverrides): Promise<[BigNumber]>;

    _getMap(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileWithMetadataStructOutput[]]>;

    bulkGetAllItems(
      overrides?: CallOverrides
    ): Promise<[ItemWithMetadataStructOutput[]]>;

    bulkGetAllPlayerData(
      overrides?: CallOverrides
    ): Promise<[PlayerDataStructOutput[]]>;
  };

  GET_MAP_INTERVAL(overrides?: CallOverrides): Promise<BigNumber>;

  _getMap(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileWithMetadataStructOutput[]>;

  bulkGetAllItems(
    overrides?: CallOverrides
  ): Promise<ItemWithMetadataStructOutput[]>;

  bulkGetAllPlayerData(
    overrides?: CallOverrides
  ): Promise<PlayerDataStructOutput[]>;

  callStatic: {
    GET_MAP_INTERVAL(overrides?: CallOverrides): Promise<BigNumber>;

    _getMap(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileWithMetadataStructOutput[]>;

    bulkGetAllItems(
      overrides?: CallOverrides
    ): Promise<ItemWithMetadataStructOutput[]>;

    bulkGetAllPlayerData(
      overrides?: CallOverrides
    ): Promise<PlayerDataStructOutput[]>;
  };

  filters: {};

  estimateGas: {
    GET_MAP_INTERVAL(overrides?: CallOverrides): Promise<BigNumber>;

    _getMap(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bulkGetAllItems(overrides?: CallOverrides): Promise<BigNumber>;

    bulkGetAllPlayerData(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    GET_MAP_INTERVAL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getMap(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bulkGetAllItems(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bulkGetAllPlayerData(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
