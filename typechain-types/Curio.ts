/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type FacetCutStruct = {
  facetAddress: string;
  action: BigNumberish;
  functionSelectors: BytesLike[];
};

export type FacetCutStructOutput = [string, number, string[]] & {
  facetAddress: string;
  action: number;
  functionSelectors: string[];
};

export type FacetStruct = {
  facetAddress: string;
  functionSelectors: BytesLike[];
};

export type FacetStructOutput = [string, string[]] & {
  facetAddress: string;
  functionSelectors: string[];
};

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export type TroopStruct = {
  owner: string;
  troopTypeId: BigNumberish;
  lastMoved: BigNumberish;
  movesLeftInEpoch: BigNumberish;
  lastAttacked: BigNumberish;
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
  BigNumber,
  PositionStructOutput,
  BigNumber[]
] & {
  owner: string;
  troopTypeId: BigNumber;
  lastMoved: BigNumber;
  movesLeftInEpoch: BigNumber;
  lastAttacked: BigNumber;
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
};

export type BaseStructOutput = [
  number,
  string,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  name: number;
  owner: string;
  attackFactor: BigNumber;
  defenseFactor: BigNumber;
  health: BigNumber;
};

export type TileStruct = {
  terrain: BigNumberish;
  occupantId: BigNumberish;
  baseId: BigNumberish;
};

export type TileStructOutput = [number, BigNumber, BigNumber] & {
  terrain: number;
  occupantId: BigNumber;
  baseId: BigNumber;
};

export type TroopTypeStruct = {
  name: BigNumberish;
  movesPerEpoch: BigNumberish;
  maxHealth: BigNumberish;
  damagePerHit: BigNumberish;
  attackFactor: BigNumberish;
  defenseFactor: BigNumberish;
  cargoCapacity: BigNumberish;
  epochsToProduce: BigNumberish;
  movementCooldown: BigNumberish;
  attackCooldown: BigNumberish;
  isLandTroop: boolean;
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
  BigNumber,
  BigNumber,
  boolean
] & {
  name: number;
  movesPerEpoch: BigNumber;
  maxHealth: BigNumber;
  damagePerHit: BigNumber;
  attackFactor: BigNumber;
  defenseFactor: BigNumber;
  cargoCapacity: BigNumber;
  epochsToProduce: BigNumber;
  movementCooldown: BigNumber;
  attackCooldown: BigNumber;
  isLandTroop: boolean;
};

export type WorldConstantsStruct = {
  admin: string;
  worldWidth: BigNumberish;
  worldHeight: BigNumberish;
  numPorts: BigNumberish;
  numCities: BigNumberish;
  mapInterval: BigNumberish;
  secondsPerTurn: BigNumberish;
};

export type WorldConstantsStructOutput = [
  string,
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
  mapInterval: BigNumber;
  secondsPerTurn: BigNumber;
};

export interface CurioInterface extends utils.Interface {
  functions: {
    "diamondCut((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
    "facetAddress(bytes4)": FunctionFragment;
    "facetAddresses()": FunctionFragment;
    "facetFunctionSelectors(address)": FunctionFragment;
    "facets()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "battle(uint256,(uint256,uint256))": FunctionFragment;
    "captureBase(uint256,(uint256,uint256))": FunctionFragment;
    "endProduction((uint256,uint256))": FunctionFragment;
    "initializePlayer((uint256,uint256),address)": FunctionFragment;
    "move(uint256,(uint256,uint256))": FunctionFragment;
    "repair((uint256,uint256))": FunctionFragment;
    "setMapChunk((uint256,uint256),uint256[][])": FunctionFragment;
    "spawnTroop((uint256,uint256),address,uint256)": FunctionFragment;
    "startProduction((uint256,uint256),uint256)": FunctionFragment;
    "updateEpoch()": FunctionFragment;
    "bulkGetAllTroops()": FunctionFragment;
    "getBaseAt((uint256,uint256))": FunctionFragment;
    "getBaseById(uint256)": FunctionFragment;
    "getEpoch()": FunctionFragment;
    "getMapChunk((uint256,uint256))": FunctionFragment;
    "getTileAt((uint256,uint256))": FunctionFragment;
    "getTroopAt((uint256,uint256))": FunctionFragment;
    "getTroopById(uint256)": FunctionFragment;
    "getTroopType(uint256)": FunctionFragment;
    "getWorldConstants()": FunctionFragment;
    "owner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "diamondCut",
    values: [FacetCutStruct[], string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "facetAddress",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "facetAddresses",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "facetFunctionSelectors",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "facets", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "battle",
    values: [BigNumberish, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "captureBase",
    values: [BigNumberish, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "endProduction",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "initializePlayer",
    values: [PositionStruct, string]
  ): string;
  encodeFunctionData(
    functionFragment: "move",
    values: [BigNumberish, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "repair",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "setMapChunk",
    values: [PositionStruct, BigNumberish[][]]
  ): string;
  encodeFunctionData(
    functionFragment: "spawnTroop",
    values: [PositionStruct, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "startProduction",
    values: [PositionStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateEpoch",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bulkGetAllTroops",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getEpoch", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getMapChunk",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getTileAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getTroopAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getTroopById",
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
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "diamondCut", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "facetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "facetAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "facetFunctionSelectors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "facets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "battle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "captureBase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endProduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializePlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "move", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "repair", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMapChunk",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "spawnTroop", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startProduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateEpoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bulkGetAllTroops",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBaseAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBaseById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getEpoch", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMapChunk",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTileAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTroopAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTroopById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTroopType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWorldConstants",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "DiamondCut(tuple[],address,bytes)": EventFragment;
    "Attacked(address,uint256,address,uint256)": EventFragment;
    "BaseCaptured(address,uint256,uint256)": EventFragment;
    "Death(address,uint256)": EventFragment;
    "EpochUpdate(uint256,uint256)": EventFragment;
    "Moved(address,uint256,tuple)": EventFragment;
    "NewPlayer(address,tuple)": EventFragment;
    "NewTroop(address,uint256,tuple)": EventFragment;
    "ProductionStarted(address,uint256,uint256)": EventFragment;
    "Recovered(address,uint256)": EventFragment;
    "Repaired(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DiamondCut"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Attacked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BaseCaptured"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Death"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EpochUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Moved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPlayer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewTroop"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProductionStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Recovered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Repaired"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type DiamondCutEvent = TypedEvent<
  [FacetCutStructOutput[], string, string],
  { _diamondCut: FacetCutStructOutput[]; _init: string; _calldata: string }
>;

export type DiamondCutEventFilter = TypedEventFilter<DiamondCutEvent>;

export type AttackedEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  {
    _player: string;
    _troopId: BigNumber;
    _targetPlayer: string;
    _targetId: BigNumber;
  }
>;

export type AttackedEventFilter = TypedEventFilter<AttackedEvent>;

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

export type EpochUpdateEvent = TypedEvent<
  [BigNumber, BigNumber],
  { _epoch: BigNumber; _time: BigNumber }
>;

export type EpochUpdateEventFilter = TypedEventFilter<EpochUpdateEvent>;

export type MovedEvent = TypedEvent<
  [string, BigNumber, PositionStructOutput],
  { _player: string; _troopId: BigNumber; _pos: PositionStructOutput }
>;

export type MovedEventFilter = TypedEventFilter<MovedEvent>;

export type NewPlayerEvent = TypedEvent<
  [string, PositionStructOutput],
  { _player: string; _pos: PositionStructOutput }
>;

export type NewPlayerEventFilter = TypedEventFilter<NewPlayerEvent>;

export type NewTroopEvent = TypedEvent<
  [string, BigNumber, PositionStructOutput],
  { _player: string; _troopId: BigNumber; _pos: PositionStructOutput }
>;

export type NewTroopEventFilter = TypedEventFilter<NewTroopEvent>;

export type ProductionStartedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { _player: string; _baseId: BigNumber; _troopTypeId: BigNumber }
>;

export type ProductionStartedEventFilter =
  TypedEventFilter<ProductionStartedEvent>;

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

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface Curio extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CurioInterface;

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
    diamondCut(
      _diamondCut: FacetCutStruct[],
      _init: string,
      _calldata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    facetAddress(
      _functionSelector: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { facetAddress_: string }>;

    facetAddresses(
      overrides?: CallOverrides
    ): Promise<[string[]] & { facetAddresses_: string[] }>;

    facetFunctionSelectors(
      _facet: string,
      overrides?: CallOverrides
    ): Promise<[string[]] & { _facetFunctionSelectors: string[] }>;

    facets(
      overrides?: CallOverrides
    ): Promise<[FacetStructOutput[]] & { facets_: FacetStructOutput[] }>;

    supportsInterface(
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    battle(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    captureBase(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endProduction(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initializePlayer(
      _pos: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    move(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    repair(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMapChunk(
      _startPos: PositionStruct,
      _chunk: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    spawnTroop(
      _pos: PositionStruct,
      _player: string,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startProduction(
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateEpoch(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bulkGetAllTroops(overrides?: CallOverrides): Promise<[TroopStructOutput[]]>;

    getBaseAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BaseStructOutput]>;

    getBaseById(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BaseStructOutput]>;

    getEpoch(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMapChunk(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput[], PositionStructOutput[]]>;

    getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput]>;

    getTroopAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TroopStructOutput]>;

    getTroopById(
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

    owner(overrides?: CallOverrides): Promise<[string] & { owner_: string }>;

    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  diamondCut(
    _diamondCut: FacetCutStruct[],
    _init: string,
    _calldata: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  facetAddress(
    _functionSelector: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  facetAddresses(overrides?: CallOverrides): Promise<string[]>;

  facetFunctionSelectors(
    _facet: string,
    overrides?: CallOverrides
  ): Promise<string[]>;

  facets(overrides?: CallOverrides): Promise<FacetStructOutput[]>;

  supportsInterface(
    _interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  battle(
    _troopId: BigNumberish,
    _targetPos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  captureBase(
    _troopId: BigNumberish,
    _targetPos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endProduction(
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initializePlayer(
    _pos: PositionStruct,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  move(
    _troopId: BigNumberish,
    _targetPos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  repair(
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMapChunk(
    _startPos: PositionStruct,
    _chunk: BigNumberish[][],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  spawnTroop(
    _pos: PositionStruct,
    _player: string,
    _troopTypeId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startProduction(
    _pos: PositionStruct,
    _troopTypeId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateEpoch(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bulkGetAllTroops(overrides?: CallOverrides): Promise<TroopStructOutput[]>;

  getBaseAt(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BaseStructOutput>;

  getBaseById(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BaseStructOutput>;

  getEpoch(overrides?: CallOverrides): Promise<BigNumber>;

  getMapChunk(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<[TileStructOutput[], PositionStructOutput[]]>;

  getTileAt(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileStructOutput>;

  getTroopAt(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TroopStructOutput>;

  getTroopById(
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

  owner(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    _newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    diamondCut(
      _diamondCut: FacetCutStruct[],
      _init: string,
      _calldata: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    facetAddress(
      _functionSelector: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    facetAddresses(overrides?: CallOverrides): Promise<string[]>;

    facetFunctionSelectors(
      _facet: string,
      overrides?: CallOverrides
    ): Promise<string[]>;

    facets(overrides?: CallOverrides): Promise<FacetStructOutput[]>;

    supportsInterface(
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    battle(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    captureBase(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    endProduction(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    initializePlayer(
      _pos: PositionStruct,
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;

    move(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    repair(_pos: PositionStruct, overrides?: CallOverrides): Promise<void>;

    setMapChunk(
      _startPos: PositionStruct,
      _chunk: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<void>;

    spawnTroop(
      _pos: PositionStruct,
      _player: string,
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    startProduction(
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateEpoch(overrides?: CallOverrides): Promise<void>;

    bulkGetAllTroops(overrides?: CallOverrides): Promise<TroopStructOutput[]>;

    getBaseAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BaseStructOutput>;

    getBaseById(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BaseStructOutput>;

    getEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    getMapChunk(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput[], PositionStructOutput[]]>;

    getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileStructOutput>;

    getTroopAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TroopStructOutput>;

    getTroopById(
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

    owner(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      _newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "DiamondCut(tuple[],address,bytes)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutEventFilter;
    DiamondCut(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutEventFilter;

    "Attacked(address,uint256,address,uint256)"(
      _player?: null,
      _troopId?: null,
      _targetPlayer?: null,
      _targetId?: null
    ): AttackedEventFilter;
    Attacked(
      _player?: null,
      _troopId?: null,
      _targetPlayer?: null,
      _targetId?: null
    ): AttackedEventFilter;

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

    "EpochUpdate(uint256,uint256)"(
      _epoch?: null,
      _time?: null
    ): EpochUpdateEventFilter;
    EpochUpdate(_epoch?: null, _time?: null): EpochUpdateEventFilter;

    "Moved(address,uint256,tuple)"(
      _player?: null,
      _troopId?: null,
      _pos?: null
    ): MovedEventFilter;
    Moved(_player?: null, _troopId?: null, _pos?: null): MovedEventFilter;

    "NewPlayer(address,tuple)"(
      _player?: null,
      _pos?: null
    ): NewPlayerEventFilter;
    NewPlayer(_player?: null, _pos?: null): NewPlayerEventFilter;

    "NewTroop(address,uint256,tuple)"(
      _player?: null,
      _troopId?: null,
      _pos?: null
    ): NewTroopEventFilter;
    NewTroop(_player?: null, _troopId?: null, _pos?: null): NewTroopEventFilter;

    "ProductionStarted(address,uint256,uint256)"(
      _player?: null,
      _baseId?: null,
      _troopTypeId?: null
    ): ProductionStartedEventFilter;
    ProductionStarted(
      _player?: null,
      _baseId?: null,
      _troopTypeId?: null
    ): ProductionStartedEventFilter;

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

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    diamondCut(
      _diamondCut: FacetCutStruct[],
      _init: string,
      _calldata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    facetAddress(
      _functionSelector: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    facetAddresses(overrides?: CallOverrides): Promise<BigNumber>;

    facetFunctionSelectors(
      _facet: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    facets(overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    battle(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    captureBase(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endProduction(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initializePlayer(
      _pos: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    move(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    repair(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMapChunk(
      _startPos: PositionStruct,
      _chunk: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    spawnTroop(
      _pos: PositionStruct,
      _player: string,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startProduction(
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateEpoch(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bulkGetAllTroops(overrides?: CallOverrides): Promise<BigNumber>;

    getBaseAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBaseById(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    getMapChunk(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTroopAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTroopById(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTroopType(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWorldConstants(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    diamondCut(
      _diamondCut: FacetCutStruct[],
      _init: string,
      _calldata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    facetAddress(
      _functionSelector: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    facetAddresses(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    facetFunctionSelectors(
      _facet: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    facets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    supportsInterface(
      _interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    battle(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    captureBase(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endProduction(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initializePlayer(
      _pos: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    move(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    repair(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMapChunk(
      _startPos: PositionStruct,
      _chunk: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    spawnTroop(
      _pos: PositionStruct,
      _player: string,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startProduction(
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateEpoch(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bulkGetAllTroops(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBaseAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBaseById(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEpoch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMapChunk(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTileAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTroopAt(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTroopById(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTroopType(
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWorldConstants(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
