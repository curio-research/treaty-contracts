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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export type TileStruct = {
  isInitialized: boolean;
  terrain: BigNumberish;
  city: BigNumberish;
};

export type TileStructOutput = [boolean, number, BigNumber] & {
  isInitialized: boolean;
  terrain: number;
  city: BigNumber;
};

export interface GameLibInterface extends utils.Interface {
  functions: {
    "_coincident((uint256,uint256),(uint256,uint256))": FunctionFragment;
    "_euclidean((uint256,uint256),(uint256,uint256))": FunctionFragment;
    "_getNeighbors((uint256,uint256))": FunctionFragment;
    "_getPlayer(address)": FunctionFragment;
    "_getTileAt((uint256,uint256))": FunctionFragment;
    "_inBound((uint256,uint256))": FunctionFragment;
    "_random(uint256,uint256)": FunctionFragment;
    "_strEq(string,string)": FunctionFragment;
    "_withinDistance((uint256,uint256),(uint256,uint256),uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_coincident",
    values: [PositionStruct, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_euclidean",
    values: [PositionStruct, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getNeighbors",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(functionFragment: "_getPlayer", values: [string]): string;
  encodeFunctionData(
    functionFragment: "_getTileAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_inBound",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_random",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_strEq",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "_withinDistance",
    values: [PositionStruct, PositionStruct, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "_coincident",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_euclidean", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getNeighbors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getPlayer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_getTileAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_inBound", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_random", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_strEq", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_withinDistance",
    data: BytesLike
  ): Result;

  events: {
    "GamePaused()": EventFragment;
    "GameResumed()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GamePaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameResumed"): EventFragment;
}

export type GamePausedEvent = TypedEvent<[], {}>;

export type GamePausedEventFilter = TypedEventFilter<GamePausedEvent>;

export type GameResumedEvent = TypedEvent<[], {}>;

export type GameResumedEventFilter = TypedEventFilter<GameResumedEvent>;

export interface GameLib extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GameLibInterface;

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
    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _euclidean(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput[]]>;

    _getPlayer(
      _address: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput]>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<[boolean]>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _strEq(
      _s1: string,
      _s2: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  _coincident(
    _p1: PositionStruct,
    _p2: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _euclidean(
    _p1: PositionStruct,
    _p2: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getNeighbors(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput[]>;

  _getPlayer(_address: string, overrides?: CallOverrides): Promise<BigNumber>;

  _getTileAt(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileStructOutput>;

  _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<boolean>;

  _random(
    _max: BigNumberish,
    _salt: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _strEq(_s1: string, _s2: string, overrides?: CallOverrides): Promise<boolean>;

  _withinDistance(
    _p1: PositionStruct,
    _p2: PositionStruct,
    _dist: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _euclidean(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput[]>;

    _getPlayer(_address: string, overrides?: CallOverrides): Promise<BigNumber>;

    _getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileStructOutput>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<boolean>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _strEq(
      _s1: string,
      _s2: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "GamePaused()"(): GamePausedEventFilter;
    GamePaused(): GamePausedEventFilter;

    "GameResumed()"(): GameResumedEventFilter;
    GameResumed(): GameResumedEventFilter;
  };

  estimateGas: {
    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _euclidean(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayer(_address: string, overrides?: CallOverrides): Promise<BigNumber>;

    _getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<BigNumber>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _strEq(
      _s1: string,
      _s2: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _euclidean(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPlayer(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _inBound(
      _p: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _strEq(
      _s1: string,
      _s2: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
