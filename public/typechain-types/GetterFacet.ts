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

export type TroopStruct = {
  owner: string;
  troopTypeId: BigNumberish;
  lastMoved: BigNumberish;
  lastLargeActionTaken: BigNumberish;
  lastRepaired: BigNumberish;
  health: BigNumberish;
  pos: PositionStruct;
  cargoTroopIds: BigNumberish[];
};

export type TroopStructOutput = [
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  PositionStructOutput,
  BigNumber[]
] & {
  owner: string;
  troopTypeId: BigNumber;
  lastMoved: BigNumber;
  lastLargeActionTaken: BigNumber;
  lastRepaired: BigNumber;
  health: BigNumber;
  pos: PositionStructOutput;
  cargoTroopIds: BigNumber[];
};

export type BaseStruct = {
  name: BigNumberish;
  owner: string;
  attackFactor: BigNumberish;
  defenseFactor: BigNumberish;
  health: BigNumberish;
  goldGenerationPerSecond: BigNumberish;
  pos: PositionStruct;
};

export type BaseStructOutput = [
  number,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  PositionStructOutput
] & {
  name: number;
  owner: string;
  attackFactor: BigNumber;
  defenseFactor: BigNumber;
  health: BigNumber;
  goldGenerationPerSecond: BigNumber;
  pos: PositionStructOutput;
};

export type TroopTypeStruct = {
  name: BigNumberish;
  isLandTroop: boolean;
  maxHealth: BigNumberish;
  damagePerHit: BigNumberish;
  attackFactor: BigNumberish;
  defenseFactor: BigNumberish;
  cargoCapacity: BigNumberish;
  movementCooldown: BigNumberish;
  largeActionCooldown: BigNumberish;
  cost: BigNumberish;
  expensePerSecond: BigNumberish;
};

export type TroopTypeStructOutput = [
  number,
  boolean,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  name: number;
  isLandTroop: boolean;
  maxHealth: BigNumber;
  damagePerHit: BigNumber;
  attackFactor: BigNumber;
  defenseFactor: BigNumber;
  cargoCapacity: BigNumber;
  movementCooldown: BigNumber;
  largeActionCooldown: BigNumber;
  cost: BigNumber;
  expensePerSecond: BigNumber;
};

export type TileStruct = {
  isInitialized: boolean;
  terrain: BigNumberish;
  occupantId: BigNumberish;
  baseId: BigNumberish;
};

export type TileStructOutput = [boolean, number, BigNumber, BigNumber] & {
  isInitialized: boolean;
  terrain: number;
  occupantId: BigNumber;
  baseId: BigNumber;
};

export type PlayerStruct = {
  initTimestamp: BigNumberish;
  active: boolean;
  balance: BigNumberish;
  totalGoldGenerationPerUpdate: BigNumberish;
  totalTroopExpensePerUpdate: BigNumberish;
  balanceLastUpdated: BigNumberish;
  numOwnedBases: BigNumberish;
  numOwnedTroops: BigNumberish;
};

export type PlayerStructOutput = [
  BigNumber,
  boolean,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  initTimestamp: BigNumber;
  active: boolean;
  balance: BigNumber;
  totalGoldGenerationPerUpdate: BigNumber;
  totalTroopExpensePerUpdate: BigNumber;
  balanceLastUpdated: BigNumber;
  numOwnedBases: BigNumber;
  numOwnedTroops: BigNumber;
};

export type WorldConstantsStruct = {
  admin: string;
  worldWidth: BigNumberish;
  worldHeight: BigNumberish;
  numPorts: BigNumberish;
  numCities: BigNumberish;
  combatEfficiency: BigNumberish;
  numInitTerrainTypes: BigNumberish;
  initBatchSize: BigNumberish;
  initPlayerBalance: BigNumberish;
  defaultBaseGoldGenerationPerSecond: BigNumberish;
  maxBaseCountPerPlayer: BigNumberish;
  maxTroopCountPerPlayer: BigNumberish;
  maxPlayerCount: BigNumberish;
};

export type WorldConstantsStructOutput = [
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  admin: string;
  worldWidth: BigNumber;
  worldHeight: BigNumber;
  numPorts: BigNumber;
  numCities: BigNumber;
  combatEfficiency: BigNumber;
  numInitTerrainTypes: BigNumber;
  initBatchSize: BigNumber;
  initPlayerBalance: BigNumber;
  defaultBaseGoldGenerationPerSecond: BigNumber;
  maxBaseCountPerPlayer: BigNumber;
  maxTroopCountPerPlayer: BigNumber;
  maxPlayerCount: BigNumber;
};

export interface GetterFacetInterface extends utils.Interface {
  functions: {
    "bulkGetAllTroops()": FunctionFragment;
    "getBase(uint256)": FunctionFragment;
    "getBaseAt((uint256,uint256))": FunctionFragment;
    "getBaseNonce()": FunctionFragment;
    "getBulkBase(uint256,uint256)": FunctionFragment;
    "getBulkTroopTypes(uint256,uint256)": FunctionFragment;
    "getMapChunk((uint256,uint256),uint256)": FunctionFragment;
    "getPlayer(address)": FunctionFragment;
    "getPlayerCount()": FunctionFragment;
    "getTileAt((uint256,uint256))": FunctionFragment;
    "getTroop(uint256)": FunctionFragment;
    "getTroopAt((uint256,uint256))": FunctionFragment;
    "getTroopType(uint256)": FunctionFragment;
    "getWorldConstants()": FunctionFragment;
    "isPlayerInitialized(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "bulkGetAllTroops",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBase",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseNonce",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBulkBase",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBulkTroopTypes",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMapChunk",
    values: [PositionStruct, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getPlayer", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getPlayerCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTileAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getTroop",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTroopAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getTroopType",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getWorldConstants",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isPlayerInitialized",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "bulkGetAllTroops",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBase", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBaseAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBaseNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBulkBase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBulkTroopTypes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMapChunk",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPlayer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPlayerCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTileAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTroop", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTroopAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTroopType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWorldConstants",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPlayerInitialized",
    data: BytesLike
  ): Result;

  events: {};
}

export interface GetterFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GetterFacetInterface;

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
    bulkGetAllTroops(overrides?: CallOverrides): Promise<[TroopStructOutput[]]>;

    getBase(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BaseStructOutput]>;

    getBaseAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BaseStructOutput]>;

    getBaseNonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    getBulkBase(
      _startId: BigNumberish,
      _endId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BaseStructOutput[]]>;

    getBulkTroopTypes(
      _startId: BigNumberish,
      _endId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[TroopTypeStructOutput[]]>;

    getMapChunk(
      _startPos: PositionStruct,
      _interval: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput[], PositionStructOutput[]]>;

    getPlayer(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<[PlayerStructOutput]>;

    getPlayerCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput]>;

    getTroop(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[TroopStructOutput]>;

    getTroopAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TroopStructOutput]>;

    getTroopType(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[TroopTypeStructOutput]>;

    getWorldConstants(
      overrides?: CallOverrides
    ): Promise<[WorldConstantsStructOutput]>;

    isPlayerInitialized(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  bulkGetAllTroops(overrides?: CallOverrides): Promise<TroopStructOutput[]>;

  getBase(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BaseStructOutput>;

  getBaseAt(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BaseStructOutput>;

  getBaseNonce(overrides?: CallOverrides): Promise<BigNumber>;

  getBulkBase(
    _startId: BigNumberish,
    _endId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BaseStructOutput[]>;

  getBulkTroopTypes(
    _startId: BigNumberish,
    _endId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<TroopTypeStructOutput[]>;

  getMapChunk(
    _startPos: PositionStruct,
    _interval: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[TileStructOutput[], PositionStructOutput[]]>;

  getPlayer(
    _addr: string,
    overrides?: CallOverrides
  ): Promise<PlayerStructOutput>;

  getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

  getTileAt(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileStructOutput>;

  getTroop(
    _troopId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<TroopStructOutput>;

  getTroopAt(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TroopStructOutput>;

  getTroopType(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<TroopTypeStructOutput>;

  getWorldConstants(
    overrides?: CallOverrides
  ): Promise<WorldConstantsStructOutput>;

  isPlayerInitialized(
    _player: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    bulkGetAllTroops(overrides?: CallOverrides): Promise<TroopStructOutput[]>;

    getBase(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BaseStructOutput>;

    getBaseAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BaseStructOutput>;

    getBaseNonce(overrides?: CallOverrides): Promise<BigNumber>;

    getBulkBase(
      _startId: BigNumberish,
      _endId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BaseStructOutput[]>;

    getBulkTroopTypes(
      _startId: BigNumberish,
      _endId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<TroopTypeStructOutput[]>;

    getMapChunk(
      _startPos: PositionStruct,
      _interval: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput[], PositionStructOutput[]]>;

    getPlayer(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PlayerStructOutput>;

    getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

    getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileStructOutput>;

    getTroop(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<TroopStructOutput>;

    getTroopAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TroopStructOutput>;

    getTroopType(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<TroopTypeStructOutput>;

    getWorldConstants(
      overrides?: CallOverrides
    ): Promise<WorldConstantsStructOutput>;

    isPlayerInitialized(
      _player: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    bulkGetAllTroops(overrides?: CallOverrides): Promise<BigNumber>;

    getBase(_id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    getBaseAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBaseNonce(overrides?: CallOverrides): Promise<BigNumber>;

    getBulkBase(
      _startId: BigNumberish,
      _endId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBulkTroopTypes(
      _startId: BigNumberish,
      _endId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMapChunk(
      _startPos: PositionStruct,
      _interval: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPlayer(_addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

    getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTroop(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTroopAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTroopType(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWorldConstants(overrides?: CallOverrides): Promise<BigNumber>;

    isPlayerInitialized(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bulkGetAllTroops(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBase(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBaseAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBaseNonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBulkBase(
      _startId: BigNumberish,
      _endId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBulkTroopTypes(
      _startId: BigNumberish,
      _endId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMapChunk(
      _startPos: PositionStruct,
      _interval: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPlayer(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPlayerCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTroop(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTroopAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTroopType(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWorldConstants(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isPlayerInitialized(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}