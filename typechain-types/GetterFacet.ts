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

export type ArmyStruct = {
  owner: string;
  troopIds: BigNumberish[];
  lastMoved: BigNumberish;
  lastLargeActionTaken: BigNumberish;
  pos: PositionStruct;
};

export type ArmyStructOutput = [
  string,
  BigNumber[],
  BigNumber,
  BigNumber,
  PositionStructOutput
] & {
  owner: string;
  troopIds: BigNumber[];
  lastMoved: BigNumber;
  lastLargeActionTaken: BigNumber;
  pos: PositionStructOutput;
};

export type TroopStruct = {
  armyId: BigNumberish;
  troopTypeId: BigNumberish;
  health: BigNumberish;
};

export type TroopStructOutput = [BigNumber, BigNumber, BigNumber] & {
  armyId: BigNumber;
  troopTypeId: BigNumber;
  health: BigNumber;
};

export type BaseStruct = {
  name: BigNumberish;
  owner: string;
  attackFactor: BigNumberish;
  defenseFactor: BigNumberish;
  health: BigNumberish;
  goldGenerationPerSecond: BigNumberish;
  oilGenerationPerSecond: BigNumberish;
  pos: PositionStruct;
};

export type BaseStructOutput = [
  number,
  string,
  BigNumber,
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
  oilGenerationPerSecond: BigNumber;
  pos: PositionStructOutput;
};

export type TroopTypeStruct = {
  name: BigNumberish;
  maxHealth: BigNumberish;
  damagePerHit: BigNumberish;
  attackFactor: BigNumberish;
  defenseFactor: BigNumberish;
  movementCooldown: BigNumberish;
  largeActionCooldown: BigNumberish;
  goldPrice: BigNumberish;
  oilConsumptionPerSecond: BigNumberish;
};

export type TroopTypeStructOutput = [
  number,
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
  maxHealth: BigNumber;
  damagePerHit: BigNumber;
  attackFactor: BigNumber;
  defenseFactor: BigNumber;
  movementCooldown: BigNumber;
  largeActionCooldown: BigNumber;
  goldPrice: BigNumber;
  oilConsumptionPerSecond: BigNumber;
};

export type TileStruct = {
  isInitialized: boolean;
  isInitializedECS: boolean;
  terrain: BigNumberish;
  occupantId: BigNumberish;
  baseId: BigNumberish;
};

export type TileStructOutput = [
  boolean,
  boolean,
  number,
  BigNumber,
  BigNumber
] & {
  isInitialized: boolean;
  isInitializedECS: boolean;
  terrain: number;
  occupantId: BigNumber;
  baseId: BigNumber;
};

export type PlayerStruct = {
  initTimestamp: BigNumberish;
  active: boolean;
  goldBalance: BigNumberish;
  totalGoldGenerationPerUpdate: BigNumberish;
  totalOilGenerationPerUpdate: BigNumberish;
  totalOilConsumptionPerUpdate: BigNumberish;
  balanceLastUpdated: BigNumberish;
  numOwnedBases: BigNumberish;
  numOwnedTroops: BigNumberish;
  isDebuffed: boolean;
};

export type PlayerStructOutput = [
  BigNumber,
  boolean,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean
] & {
  initTimestamp: BigNumber;
  active: boolean;
  goldBalance: BigNumber;
  totalGoldGenerationPerUpdate: BigNumber;
  totalOilGenerationPerUpdate: BigNumber;
  totalOilConsumptionPerUpdate: BigNumber;
  balanceLastUpdated: BigNumber;
  numOwnedBases: BigNumber;
  numOwnedTroops: BigNumber;
  isDebuffed: boolean;
};

export type WorldConstantsStruct = {
  admin: string;
  worldWidth: BigNumberish;
  worldHeight: BigNumberish;
  combatEfficiency: BigNumberish;
  numInitTerrainTypes: BigNumberish;
  initBatchSize: BigNumberish;
  initPlayerGoldBalance: BigNumberish;
  initPlayerOilBalance: BigNumberish;
  maxBaseCountPerPlayer: BigNumberish;
  maxTroopCountPerPlayer: BigNumberish;
  maxPlayerCount: BigNumberish;
  defaultBaseGoldGenerationPerSecond: BigNumberish;
  defaultWellOilGenerationPerSecond: BigNumberish;
  debuffFactor: BigNumberish;
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
  BigNumber,
  BigNumber
] & {
  admin: string;
  worldWidth: BigNumber;
  worldHeight: BigNumber;
  combatEfficiency: BigNumber;
  numInitTerrainTypes: BigNumber;
  initBatchSize: BigNumber;
  initPlayerGoldBalance: BigNumber;
  initPlayerOilBalance: BigNumber;
  maxBaseCountPerPlayer: BigNumber;
  maxTroopCountPerPlayer: BigNumber;
  maxPlayerCount: BigNumber;
  defaultBaseGoldGenerationPerSecond: BigNumber;
  defaultWellOilGenerationPerSecond: BigNumber;
  debuffFactor: BigNumber;
};

export interface GetterFacetInterface extends utils.Interface {
  functions: {
    "bulkGetAllArmies()": FunctionFragment;
    "bulkGetAllTroops()": FunctionFragment;
    "getArmy(uint256)": FunctionFragment;
    "getArmyAt((uint256,uint256))": FunctionFragment;
    "getBase(uint256)": FunctionFragment;
    "getBaseAt((uint256,uint256))": FunctionFragment;
    "getBaseNonce()": FunctionFragment;
    "getBulkBase(uint256,uint256)": FunctionFragment;
    "getBulkTroopTypes(uint256,uint256)": FunctionFragment;
    "getComponent(string)": FunctionFragment;
    "getMapChunk((uint256,uint256),uint256)": FunctionFragment;
    "getPlayer(address)": FunctionFragment;
    "getPlayerCount()": FunctionFragment;
    "getTileAt((uint256,uint256))": FunctionFragment;
    "getTroop(uint256)": FunctionFragment;
    "getTroopType(uint256)": FunctionFragment;
    "getWorldConstants()": FunctionFragment;
    "isPlayerInitialized(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "bulkGetAllArmies",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bulkGetAllTroops",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getArmy",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getArmyAt",
    values: [PositionStruct]
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
    functionFragment: "getComponent",
    values: [string]
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
    functionFragment: "bulkGetAllArmies",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bulkGetAllTroops",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getArmy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getArmyAt", data: BytesLike): Result;
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
    functionFragment: "getComponent",
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
    bulkGetAllArmies(overrides?: CallOverrides): Promise<[ArmyStructOutput[]]>;

    bulkGetAllTroops(overrides?: CallOverrides): Promise<[TroopStructOutput[]]>;

    getArmy(
      _armyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[ArmyStructOutput]>;

    getArmyAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[ArmyStructOutput]>;

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

    getComponent(_name: string, overrides?: CallOverrides): Promise<[string]>;

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

  bulkGetAllArmies(overrides?: CallOverrides): Promise<ArmyStructOutput[]>;

  bulkGetAllTroops(overrides?: CallOverrides): Promise<TroopStructOutput[]>;

  getArmy(
    _armyId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<ArmyStructOutput>;

  getArmyAt(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<ArmyStructOutput>;

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

  getComponent(_name: string, overrides?: CallOverrides): Promise<string>;

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
    bulkGetAllArmies(overrides?: CallOverrides): Promise<ArmyStructOutput[]>;

    bulkGetAllTroops(overrides?: CallOverrides): Promise<TroopStructOutput[]>;

    getArmy(
      _armyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<ArmyStructOutput>;

    getArmyAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<ArmyStructOutput>;

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

    getComponent(_name: string, overrides?: CallOverrides): Promise<string>;

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
    bulkGetAllArmies(overrides?: CallOverrides): Promise<BigNumber>;

    bulkGetAllTroops(overrides?: CallOverrides): Promise<BigNumber>;

    getArmy(
      _armyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getArmyAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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

    getComponent(_name: string, overrides?: CallOverrides): Promise<BigNumber>;

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
    bulkGetAllArmies(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bulkGetAllTroops(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getArmy(
      _armyId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getArmyAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

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

    getComponent(
      _name: string,
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
