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
  position: PositionStruct;
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
  position: PositionStructOutput;
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

export interface UtilInterface extends utils.Interface {
  functions: {
    "_canTransportTroop((bool,uint8,uint256,uint256))": FunctionFragment;
    "_getAttackFactor(uint256)": FunctionFragment;
    "_getBase(uint256)": FunctionFragment;
    "_getBaseHealth(uint256)": FunctionFragment;
    "_getBaseOwner(uint256)": FunctionFragment;
    "_getCargoCapacity(uint256)": FunctionFragment;
    "_getDamagePerHit(uint256)": FunctionFragment;
    "_getDefenseFactor(uint256)": FunctionFragment;
    "_getExpensePerSecond(uint256)": FunctionFragment;
    "_getLargeActionCooldown(uint256)": FunctionFragment;
    "_getMaxHealth(uint256)": FunctionFragment;
    "_getMovementCooldown(uint256)": FunctionFragment;
    "_getPlayer(address)": FunctionFragment;
    "_getPlayerBalance(address)": FunctionFragment;
    "_getPlayerCount()": FunctionFragment;
    "_getTileAt((uint256,uint256))": FunctionFragment;
    "_getTotalGoldGenerationPerUpdate(address)": FunctionFragment;
    "_getTroop(uint256)": FunctionFragment;
    "_getTroopCost(uint256)": FunctionFragment;
    "_hasPort((bool,uint8,uint256,uint256))": FunctionFragment;
    "_inBound((uint256,uint256))": FunctionFragment;
    "_isLandTroop(uint256)": FunctionFragment;
    "_isPlayerActive(address)": FunctionFragment;
    "_isPlayerInitialized(address)": FunctionFragment;
    "_random(uint256,uint256)": FunctionFragment;
    "_samePos((uint256,uint256),(uint256,uint256))": FunctionFragment;
    "_strike(uint256,uint256)": FunctionFragment;
    "_withinDist((uint256,uint256),(uint256,uint256),uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_canTransportTroop",
    values: [TileStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getAttackFactor",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getBase",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getBaseHealth",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getBaseOwner",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getCargoCapacity",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getDamagePerHit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getDefenseFactor",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getExpensePerSecond",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getLargeActionCooldown",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getMaxHealth",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getMovementCooldown",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "_getPlayer", values: [string]): string;
  encodeFunctionData(
    functionFragment: "_getPlayerBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getPlayerCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getTileAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTotalGoldGenerationPerUpdate",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTroop",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTroopCost",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_hasPort",
    values: [TileStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_inBound",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_isLandTroop",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_isPlayerActive",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_isPlayerInitialized",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_random",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_samePos",
    values: [PositionStruct, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_strike",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_withinDist",
    values: [PositionStruct, PositionStruct, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "_canTransportTroop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getAttackFactor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getBase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getBaseHealth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getBaseOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getCargoCapacity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getDamagePerHit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getDefenseFactor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getExpensePerSecond",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getLargeActionCooldown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getMaxHealth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getMovementCooldown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getPlayer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getPlayerBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getPlayerCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getTileAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getTotalGoldGenerationPerUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getTroop", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getTroopCost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_hasPort", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_inBound", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_isLandTroop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isPlayerActive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isPlayerInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_random", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_samePos", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_strike", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_withinDist",
    data: BytesLike
  ): Result;

  events: {
    "AttackedBase(address,uint256,tuple,uint256,tuple)": EventFragment;
    "AttackedTroop(address,uint256,tuple,uint256,tuple)": EventFragment;
    "BaseCaptured(address,uint256,uint256)": EventFragment;
    "Death(address,uint256)": EventFragment;
    "GamePaused()": EventFragment;
    "GameResumed()": EventFragment;
    "Moved(address,uint256,uint256,tuple,tuple)": EventFragment;
    "NewPlayer(address,tuple)": EventFragment;
    "NewTroop(address,uint256,tuple,tuple)": EventFragment;
    "PlayerInfo(address,tuple)": EventFragment;
    "PlayerReactivated(address)": EventFragment;
    "Recovered(address,uint256)": EventFragment;
    "Repaired(address,uint256,uint256)": EventFragment;
    "UpdatePlayerBalance(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AttackedBase"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AttackedTroop"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BaseCaptured"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Death"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GamePaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameResumed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Moved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPlayer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewTroop"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PlayerInfo"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PlayerReactivated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Recovered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Repaired"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatePlayerBalance"): EventFragment;
}

export type AttackedBaseEvent = TypedEvent<
  [string, BigNumber, TroopStructOutput, BigNumber, BaseStructOutput],
  {
    _player: string;
    _troopId: BigNumber;
    _troopInfo: TroopStructOutput;
    _targetBaseId: BigNumber;
    _targetBaseInfo: BaseStructOutput;
  }
>;

export type AttackedBaseEventFilter = TypedEventFilter<AttackedBaseEvent>;

export type AttackedTroopEvent = TypedEvent<
  [string, BigNumber, TroopStructOutput, BigNumber, TroopStructOutput],
  {
    _player: string;
    _troopId: BigNumber;
    _troopInfo: TroopStructOutput;
    _targetTroopId: BigNumber;
    _targetTroopInfo: TroopStructOutput;
  }
>;

export type AttackedTroopEventFilter = TypedEventFilter<AttackedTroopEvent>;

export type BaseCapturedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { _player: string; _troopId: BigNumber; _baseId: BigNumber }
>;

export type BaseCapturedEventFilter = TypedEventFilter<BaseCapturedEvent>;

export type DeathEvent = TypedEvent<
  [string, BigNumber],
  { _player: string; _troopId: BigNumber }
>;

export type DeathEventFilter = TypedEventFilter<DeathEvent>;

export type GamePausedEvent = TypedEvent<[], {}>;

export type GamePausedEventFilter = TypedEventFilter<GamePausedEvent>;

export type GameResumedEvent = TypedEvent<[], {}>;

export type GameResumedEventFilter = TypedEventFilter<GameResumedEvent>;

export type MovedEvent = TypedEvent<
  [string, BigNumber, BigNumber, PositionStructOutput, PositionStructOutput],
  {
    _player: string;
    _troopId: BigNumber;
    _timestamp: BigNumber;
    _startPos: PositionStructOutput;
    _targetPos: PositionStructOutput;
  }
>;

export type MovedEventFilter = TypedEventFilter<MovedEvent>;

export type NewPlayerEvent = TypedEvent<
  [string, PositionStructOutput],
  { _player: string; _pos: PositionStructOutput }
>;

export type NewPlayerEventFilter = TypedEventFilter<NewPlayerEvent>;

export type NewTroopEvent = TypedEvent<
  [string, BigNumber, TroopStructOutput, PositionStructOutput],
  {
    _player: string;
    _troopId: BigNumber;
    _troop: TroopStructOutput;
    _pos: PositionStructOutput;
  }
>;

export type NewTroopEventFilter = TypedEventFilter<NewTroopEvent>;

export type PlayerInfoEvent = TypedEvent<
  [string, PlayerStructOutput],
  { _addr: string; _player: PlayerStructOutput }
>;

export type PlayerInfoEventFilter = TypedEventFilter<PlayerInfoEvent>;

export type PlayerReactivatedEvent = TypedEvent<[string], { _player: string }>;

export type PlayerReactivatedEventFilter =
  TypedEventFilter<PlayerReactivatedEvent>;

export type RecoveredEvent = TypedEvent<
  [string, BigNumber],
  { _player: string; _troopId: BigNumber }
>;

export type RecoveredEventFilter = TypedEventFilter<RecoveredEvent>;

export type RepairedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { _player: string; _troopId: BigNumber; _health: BigNumber }
>;

export type RepairedEventFilter = TypedEventFilter<RepairedEvent>;

export type UpdatePlayerBalanceEvent = TypedEvent<
  [string, BigNumber],
  { _player: string; _amount: BigNumber }
>;

export type UpdatePlayerBalanceEventFilter =
  TypedEventFilter<UpdatePlayerBalanceEvent>;

export interface Util extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UtilInterface;

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
    _canTransportTroop(
      _tile: TileStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _getAttackFactor(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getBase(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BaseStructOutput]>;

    _getBaseHealth(
      _baseId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getBaseOwner(
      _baseId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    _getCargoCapacity(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getDamagePerHit(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getDefenseFactor(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getExpensePerSecond(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getLargeActionCooldown(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getMaxHealth(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getMovementCooldown(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[PlayerStructOutput]>;

    _getPlayerBalance(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getPlayerCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    _getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput]>;

    _getTotalGoldGenerationPerUpdate(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getTroop(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[TroopStructOutput]>;

    _getTroopCost(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _hasPort(_tile: TileStruct, overrides?: CallOverrides): Promise<[boolean]>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<[boolean]>;

    _isLandTroop(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _isPlayerActive(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _isPlayerInitialized(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _samePos(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _strike(
      _strikeFactor: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _withinDist(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  _canTransportTroop(
    _tile: TileStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _getAttackFactor(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getBase(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BaseStructOutput>;

  _getBaseHealth(
    _baseId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getBaseOwner(
    _baseId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  _getCargoCapacity(
    _troopId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getDamagePerHit(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getDefenseFactor(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getExpensePerSecond(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getLargeActionCooldown(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getMaxHealth(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getMovementCooldown(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getPlayer(
    _player: string,
    overrides?: CallOverrides
  ): Promise<PlayerStructOutput>;

  _getPlayerBalance(
    _player: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

  _getTileAt(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileStructOutput>;

  _getTotalGoldGenerationPerUpdate(
    _player: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getTroop(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<TroopStructOutput>;

  _getTroopCost(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _hasPort(_tile: TileStruct, overrides?: CallOverrides): Promise<boolean>;

  _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<boolean>;

  _isLandTroop(
    _troopTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _isPlayerActive(_player: string, overrides?: CallOverrides): Promise<boolean>;

  _isPlayerInitialized(
    _player: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _random(
    _max: BigNumberish,
    _salt: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _samePos(
    _p1: PositionStruct,
    _p2: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _strike(
    _strikeFactor: BigNumberish,
    _salt: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _withinDist(
    _p1: PositionStruct,
    _p2: PositionStruct,
    _dist: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    _canTransportTroop(
      _tile: TileStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _getAttackFactor(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBase(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BaseStructOutput>;

    _getBaseHealth(
      _baseId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBaseOwner(
      _baseId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    _getCargoCapacity(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getDamagePerHit(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getDefenseFactor(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getExpensePerSecond(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getLargeActionCooldown(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMaxHealth(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMovementCooldown(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PlayerStructOutput>;

    _getPlayerBalance(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

    _getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileStructOutput>;

    _getTotalGoldGenerationPerUpdate(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTroop(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<TroopStructOutput>;

    _getTroopCost(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _hasPort(_tile: TileStruct, overrides?: CallOverrides): Promise<boolean>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<boolean>;

    _isLandTroop(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _isPlayerActive(
      _player: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _isPlayerInitialized(
      _player: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _samePos(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _strike(
      _strikeFactor: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _withinDist(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "AttackedBase(address,uint256,tuple,uint256,tuple)"(
      _player?: null,
      _troopId?: null,
      _troopInfo?: null,
      _targetBaseId?: null,
      _targetBaseInfo?: null
    ): AttackedBaseEventFilter;
    AttackedBase(
      _player?: null,
      _troopId?: null,
      _troopInfo?: null,
      _targetBaseId?: null,
      _targetBaseInfo?: null
    ): AttackedBaseEventFilter;

    "AttackedTroop(address,uint256,tuple,uint256,tuple)"(
      _player?: null,
      _troopId?: null,
      _troopInfo?: null,
      _targetTroopId?: null,
      _targetTroopInfo?: null
    ): AttackedTroopEventFilter;
    AttackedTroop(
      _player?: null,
      _troopId?: null,
      _troopInfo?: null,
      _targetTroopId?: null,
      _targetTroopInfo?: null
    ): AttackedTroopEventFilter;

    "BaseCaptured(address,uint256,uint256)"(
      _player?: null,
      _troopId?: null,
      _baseId?: null
    ): BaseCapturedEventFilter;
    BaseCaptured(
      _player?: null,
      _troopId?: null,
      _baseId?: null
    ): BaseCapturedEventFilter;

    "Death(address,uint256)"(_player?: null, _troopId?: null): DeathEventFilter;
    Death(_player?: null, _troopId?: null): DeathEventFilter;

    "GamePaused()"(): GamePausedEventFilter;
    GamePaused(): GamePausedEventFilter;

    "GameResumed()"(): GameResumedEventFilter;
    GameResumed(): GameResumedEventFilter;

    "Moved(address,uint256,uint256,tuple,tuple)"(
      _player?: null,
      _troopId?: null,
      _timestamp?: null,
      _startPos?: null,
      _targetPos?: null
    ): MovedEventFilter;
    Moved(
      _player?: null,
      _troopId?: null,
      _timestamp?: null,
      _startPos?: null,
      _targetPos?: null
    ): MovedEventFilter;

    "NewPlayer(address,tuple)"(
      _player?: null,
      _pos?: null
    ): NewPlayerEventFilter;
    NewPlayer(_player?: null, _pos?: null): NewPlayerEventFilter;

    "NewTroop(address,uint256,tuple,tuple)"(
      _player?: null,
      _troopId?: null,
      _troop?: null,
      _pos?: null
    ): NewTroopEventFilter;
    NewTroop(
      _player?: null,
      _troopId?: null,
      _troop?: null,
      _pos?: null
    ): NewTroopEventFilter;

    "PlayerInfo(address,tuple)"(
      _addr?: null,
      _player?: null
    ): PlayerInfoEventFilter;
    PlayerInfo(_addr?: null, _player?: null): PlayerInfoEventFilter;

    "PlayerReactivated(address)"(_player?: null): PlayerReactivatedEventFilter;
    PlayerReactivated(_player?: null): PlayerReactivatedEventFilter;

    "Recovered(address,uint256)"(
      _player?: null,
      _troopId?: null
    ): RecoveredEventFilter;
    Recovered(_player?: null, _troopId?: null): RecoveredEventFilter;

    "Repaired(address,uint256,uint256)"(
      _player?: null,
      _troopId?: null,
      _health?: null
    ): RepairedEventFilter;
    Repaired(
      _player?: null,
      _troopId?: null,
      _health?: null
    ): RepairedEventFilter;

    "UpdatePlayerBalance(address,uint256)"(
      _player?: null,
      _amount?: null
    ): UpdatePlayerBalanceEventFilter;
    UpdatePlayerBalance(
      _player?: null,
      _amount?: null
    ): UpdatePlayerBalanceEventFilter;
  };

  estimateGas: {
    _canTransportTroop(
      _tile: TileStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getAttackFactor(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBase(_id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    _getBaseHealth(
      _baseId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBaseOwner(
      _baseId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getCargoCapacity(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getDamagePerHit(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getDefenseFactor(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getExpensePerSecond(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getLargeActionCooldown(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMaxHealth(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMovementCooldown(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayer(_player: string, overrides?: CallOverrides): Promise<BigNumber>;

    _getPlayerBalance(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

    _getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTotalGoldGenerationPerUpdate(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTroop(_id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    _getTroopCost(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _hasPort(_tile: TileStruct, overrides?: CallOverrides): Promise<BigNumber>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<BigNumber>;

    _isLandTroop(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _isPlayerActive(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _isPlayerInitialized(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _samePos(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _strike(
      _strikeFactor: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _withinDist(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _canTransportTroop(
      _tile: TileStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getAttackFactor(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBase(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBaseHealth(
      _baseId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBaseOwner(
      _baseId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getCargoCapacity(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getDamagePerHit(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getDefenseFactor(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getExpensePerSecond(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getLargeActionCooldown(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getMaxHealth(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getMovementCooldown(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPlayerBalance(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPlayerCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTotalGoldGenerationPerUpdate(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTroop(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTroopCost(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _hasPort(
      _tile: TileStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _inBound(
      _p: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isLandTroop(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isPlayerActive(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isPlayerInitialized(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _samePos(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _strike(
      _strikeFactor: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _withinDist(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
