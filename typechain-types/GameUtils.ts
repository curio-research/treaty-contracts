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

export type BlockDataStruct = {
  blockId: BigNumberish;
  health: BigNumberish;
  owner: string;
  lastAttacked: BigNumberish;
  lastMoved: BigNumberish;
  occupiable: boolean;
};

export type BlockDataStructOutput = [
  BigNumber,
  BigNumber,
  string,
  BigNumber,
  BigNumber,
  boolean
] & {
  blockId: BigNumber;
  health: BigNumber;
  owner: string;
  lastAttacked: BigNumber;
  lastMoved: BigNumber;
  occupiable: boolean;
};

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export type RecipeStruct = {
  craftItemIds: BigNumberish[];
  craftItemAmounts: BigNumberish[];
};

export type RecipeStructOutput = [BigNumber[], BigNumber[]] & {
  craftItemIds: BigNumber[];
  craftItemAmounts: BigNumber[];
};

export type ItemStruct = {
  mineable: boolean;
  craftable: boolean;
  occupiable: boolean;
  health: BigNumberish;
  mineItemIds: BigNumberish[];
  craftItemIds: BigNumberish[];
  craftItemAmounts: BigNumberish[];
  moveCooldown: BigNumberish;
  attackDamage: BigNumberish;
  attackRange: BigNumberish;
  attackCooldown: BigNumberish;
  programmable: boolean;
  abiEncoding: string;
  contractAddr: string;
};

export type ItemStructOutput = [
  boolean,
  boolean,
  boolean,
  BigNumber,
  BigNumber[],
  BigNumber[],
  BigNumber[],
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean,
  string,
  string
] & {
  mineable: boolean;
  craftable: boolean;
  occupiable: boolean;
  health: BigNumber;
  mineItemIds: BigNumber[];
  craftItemIds: BigNumber[];
  craftItemAmounts: BigNumber[];
  moveCooldown: BigNumber;
  attackDamage: BigNumber;
  attackRange: BigNumber;
  attackCooldown: BigNumber;
  programmable: boolean;
  abiEncoding: string;
  contractAddr: string;
};

export type PlayerDataStruct = {
  initialized: boolean;
  initTimestamp: BigNumberish;
  playerAddr: string;
  health: BigNumberish;
  reach: BigNumberish;
  lastMoved: BigNumberish;
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
  reach: BigNumber;
  lastMoved: BigNumber;
  position: PositionStructOutput;
};

export type TileStruct = {
  occupier: string;
  worldBlockId: BigNumberish;
  tileType: BigNumberish;
  lastOccupied: BigNumberish;
  tileContractId: BigNumberish;
};

export type TileStructOutput = [
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  occupier: string;
  worldBlockId: BigNumber;
  tileType: BigNumber;
  lastOccupied: BigNumber;
  tileContractId: BigNumber;
};

export type TowerStruct = {
  rewardPerEpoch: BigNumberish;
  itemId: BigNumberish;
  lastCapturedEpoch: BigNumberish;
  owner: string;
};

export type TowerStructOutput = [BigNumber, BigNumber, BigNumber, string] & {
  rewardPerEpoch: BigNumber;
  itemId: BigNumber;
  lastCapturedEpoch: BigNumber;
  owner: string;
};

export interface GameUtilsInterface extends utils.Interface {
  functions: {
    "_encodePos((uint256,uint256))": FunctionFragment;
    "_getAllPlayerAddresses()": FunctionFragment;
    "_getBlockAtPos((uint256,uint256))": FunctionFragment;
    "_getBlockDataAtPos((uint256,uint256))": FunctionFragment;
    "_getCurrentEpoch()": FunctionFragment;
    "_getIndexFromPosition((uint256,uint256))": FunctionFragment;
    "_getInventoryByPlayer(address)": FunctionFragment;
    "_getItem(uint256)": FunctionFragment;
    "_getItemAmountById(address,uint256)": FunctionFragment;
    "_getPlayer(address)": FunctionFragment;
    "_getPositionFromIndex(uint256)": FunctionFragment;
    "_getTileData((uint256,uint256))": FunctionFragment;
    "_getTower(string)": FunctionFragment;
    "_getWorldBlockData(uint256)": FunctionFragment;
    "_getWorldBlockDataOnPos((uint256,uint256))": FunctionFragment;
    "_isMoveCooled(address)": FunctionFragment;
    "_isOccupied((uint256,uint256))": FunctionFragment;
    "_isValidMove(address,(uint256,uint256))": FunctionFragment;
    "_withinDistance((uint256,uint256),(uint256,uint256),uint256)": FunctionFragment;
    "getWorldBlockNonce()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_encodePos",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getAllPlayerAddresses",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getBlockAtPos",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getBlockDataAtPos",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getCurrentEpoch",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getIndexFromPosition",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getInventoryByPlayer",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getItem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getItemAmountById",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "_getPlayer", values: [string]): string;
  encodeFunctionData(
    functionFragment: "_getPositionFromIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTileData",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(functionFragment: "_getTower", values: [string]): string;
  encodeFunctionData(
    functionFragment: "_getWorldBlockData",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getWorldBlockDataOnPos",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_isMoveCooled",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_isOccupied",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_isValidMove",
    values: [string, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_withinDistance",
    values: [PositionStruct, PositionStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getWorldBlockNonce",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "_encodePos", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getAllPlayerAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getBlockAtPos",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getBlockDataAtPos",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getCurrentEpoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getIndexFromPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getInventoryByPlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getItem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getItemAmountById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getPlayer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getPositionFromIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getTileData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getTower", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getWorldBlockData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getWorldBlockDataOnPos",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isMoveCooled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isOccupied",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isValidMove",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_withinDistance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWorldBlockNonce",
    data: BytesLike
  ): Result;

  events: {
    "ChangeBlockProperty(uint256,tuple)": EventFragment;
    "Transfer(address,address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChangeBlockProperty"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ChangeBlockPropertyEvent = TypedEvent<
  [BigNumber, BlockDataStructOutput],
  { _worldBlockId: BigNumber; _worldBlockData: BlockDataStructOutput }
>;

export type ChangeBlockPropertyEventFilter =
  TypedEventFilter<ChangeBlockPropertyEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  { _player: string; _recipient: string; _id: BigNumber; _amount: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface GameUtils extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GameUtilsInterface;

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
    _encodePos(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    _getAllPlayerAddresses(overrides?: CallOverrides): Promise<[string[]]>;

    _getBlockAtPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getBlockDataAtPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BlockDataStructOutput]>;

    _getCurrentEpoch(overrides?: CallOverrides): Promise<[BigNumber]>;

    _getIndexFromPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getInventoryByPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[RecipeStructOutput]>;

    _getItem(
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[ItemStructOutput]>;

    _getItemAmountById(
      _player: string,
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<
      [PlayerDataStructOutput] & { playerData: PlayerDataStructOutput }
    >;

    _getPositionFromIndex(
      k: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput]>;

    _getTileData(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput]>;

    _getTower(
      _towerId: string,
      overrides?: CallOverrides
    ): Promise<[TowerStructOutput]>;

    _getWorldBlockData(
      _worldBlockIdx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BlockDataStructOutput]>;

    _getWorldBlockDataOnPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BlockDataStructOutput]>;

    _isMoveCooled(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _isOccupied(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _isValidMove(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _withinDistance(
      p1: PositionStruct,
      p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getWorldBlockNonce(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  _encodePos(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  _getAllPlayerAddresses(overrides?: CallOverrides): Promise<string[]>;

  _getBlockAtPos(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getBlockDataAtPos(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BlockDataStructOutput>;

  _getCurrentEpoch(overrides?: CallOverrides): Promise<BigNumber>;

  _getIndexFromPosition(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getInventoryByPlayer(
    _player: string,
    overrides?: CallOverrides
  ): Promise<RecipeStructOutput>;

  _getItem(
    _blockId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<ItemStructOutput>;

  _getItemAmountById(
    _player: string,
    _blockId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getPlayer(
    _player: string,
    overrides?: CallOverrides
  ): Promise<PlayerDataStructOutput>;

  _getPositionFromIndex(
    k: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput>;

  _getTileData(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileStructOutput>;

  _getTower(
    _towerId: string,
    overrides?: CallOverrides
  ): Promise<TowerStructOutput>;

  _getWorldBlockData(
    _worldBlockIdx: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BlockDataStructOutput>;

  _getWorldBlockDataOnPos(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BlockDataStructOutput>;

  _isMoveCooled(_player: string, overrides?: CallOverrides): Promise<boolean>;

  _isOccupied(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _isValidMove(
    _player: string,
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _withinDistance(
    p1: PositionStruct,
    p2: PositionStruct,
    _dist: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getWorldBlockNonce(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    _encodePos(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    _getAllPlayerAddresses(overrides?: CallOverrides): Promise<string[]>;

    _getBlockAtPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBlockDataAtPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BlockDataStructOutput>;

    _getCurrentEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    _getIndexFromPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getInventoryByPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<RecipeStructOutput>;

    _getItem(
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<ItemStructOutput>;

    _getItemAmountById(
      _player: string,
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PlayerDataStructOutput>;

    _getPositionFromIndex(
      k: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput>;

    _getTileData(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileStructOutput>;

    _getTower(
      _towerId: string,
      overrides?: CallOverrides
    ): Promise<TowerStructOutput>;

    _getWorldBlockData(
      _worldBlockIdx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BlockDataStructOutput>;

    _getWorldBlockDataOnPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BlockDataStructOutput>;

    _isMoveCooled(_player: string, overrides?: CallOverrides): Promise<boolean>;

    _isOccupied(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _isValidMove(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _withinDistance(
      p1: PositionStruct,
      p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getWorldBlockNonce(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "ChangeBlockProperty(uint256,tuple)"(
      _worldBlockId?: null,
      _worldBlockData?: null
    ): ChangeBlockPropertyEventFilter;
    ChangeBlockProperty(
      _worldBlockId?: null,
      _worldBlockData?: null
    ): ChangeBlockPropertyEventFilter;

    "Transfer(address,address,uint256,uint256)"(
      _player?: null,
      _recipient?: null,
      _id?: null,
      _amount?: null
    ): TransferEventFilter;
    Transfer(
      _player?: null,
      _recipient?: null,
      _id?: null,
      _amount?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    _encodePos(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getAllPlayerAddresses(overrides?: CallOverrides): Promise<BigNumber>;

    _getBlockAtPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBlockDataAtPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getCurrentEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    _getIndexFromPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getInventoryByPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getItem(
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getItemAmountById(
      _player: string,
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayer(_player: string, overrides?: CallOverrides): Promise<BigNumber>;

    _getPositionFromIndex(
      k: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTileData(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTower(_towerId: string, overrides?: CallOverrides): Promise<BigNumber>;

    _getWorldBlockData(
      _worldBlockIdx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getWorldBlockDataOnPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _isMoveCooled(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _isOccupied(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _isValidMove(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _withinDistance(
      p1: PositionStruct,
      p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWorldBlockNonce(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _encodePos(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getAllPlayerAddresses(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBlockAtPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBlockDataAtPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getCurrentEpoch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getIndexFromPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getInventoryByPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getItem(
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getItemAmountById(
      _player: string,
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPositionFromIndex(
      k: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTileData(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTower(
      _towerId: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getWorldBlockData(
      _worldBlockIdx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getWorldBlockDataOnPos(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isMoveCooled(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isOccupied(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isValidMove(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _withinDistance(
      p1: PositionStruct,
      p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWorldBlockNonce(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
