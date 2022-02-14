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

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
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

export type RecipeStruct = {
  craftItemIds: BigNumberish[];
  craftItemAmounts: BigNumberish[];
};

export type RecipeStructOutput = [BigNumber[], BigNumber[]] & {
  craftItemIds: BigNumber[];
  craftItemAmounts: BigNumber[];
};

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

export type TileStruct = {
  occupier: string;
  topLevelStrength: BigNumberish;
  blocks: BigNumberish[];
};

export type TileStructOutput = [string, BigNumber, BigNumber[]] & {
  occupier: string;
  topLevelStrength: BigNumber;
  blocks: BigNumber[];
};

export interface GameStorageInterface extends utils.Interface {
  functions: {
    "_blockOccupier((uint256,uint256))": FunctionFragment;
    "_changeHealth(address,uint256,bool)": FunctionFragment;
    "_changeTopLevelStrengthAtPosition((uint256,uint256),uint256,bool)": FunctionFragment;
    "_decreaseItemInInventory(address,uint256,uint256)": FunctionFragment;
    "_encodePos((uint256,uint256))": FunctionFragment;
    "_getAllPlayerAddresses()": FunctionFragment;
    "_getAllPlayerData(address)": FunctionFragment;
    "_getBlockAtPosition((uint256,uint256),uint256)": FunctionFragment;
    "_getBlockCountAtPosition((uint256,uint256))": FunctionFragment;
    "_getInventoryByPlayer(address)": FunctionFragment;
    "_getItemAmountById(address,uint256)": FunctionFragment;
    "_getItemNonce()": FunctionFragment;
    "_getItemWithMetadata(uint256)": FunctionFragment;
    "_getMap((uint256,uint256))": FunctionFragment;
    "_getPlayerPosition(address)": FunctionFragment;
    "_getPositionFromIndex(uint256)": FunctionFragment;
    "_getTileData((uint256,uint256))": FunctionFragment;
    "_getTopBlockAtPosition((uint256,uint256))": FunctionFragment;
    "_getTopLevelStrengthAtPosition((uint256,uint256))": FunctionFragment;
    "_getWorldSize()": FunctionFragment;
    "_increaseItemInInventory(address,uint256,uint256)": FunctionFragment;
    "_isItemActive(uint256)": FunctionFragment;
    "_isOccupied((uint256,uint256))": FunctionFragment;
    "_isValidAttack(address,address)": FunctionFragment;
    "_isValidMove(address,(uint256,uint256))": FunctionFragment;
    "_mine((uint256,uint256))": FunctionFragment;
    "_modifyItemInInventoryNonce(uint256,bool)": FunctionFragment;
    "_place((uint256,uint256),uint256)": FunctionFragment;
    "_setOccupierAtPosition(address,(uint256,uint256))": FunctionFragment;
    "_setPlayerPosition(address,(uint256,uint256))": FunctionFragment;
    "_transfer(address,uint256,uint256)": FunctionFragment;
    "_withinDistance((uint256,uint256),(uint256,uint256),uint256)": FunctionFragment;
    "s()": FunctionFragment;
    "setEpochController(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_blockOccupier",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_changeHealth",
    values: [string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "_changeTopLevelStrengthAtPosition",
    values: [PositionStruct, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "_decreaseItemInInventory",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_encodePos",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getAllPlayerAddresses",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getAllPlayerData",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getBlockAtPosition",
    values: [PositionStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getBlockCountAtPosition",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getInventoryByPlayer",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getItemAmountById",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getItemNonce",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_getItemWithMetadata",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getMap",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getPlayerPosition",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getPositionFromIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTileData",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTopBlockAtPosition",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTopLevelStrengthAtPosition",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getWorldSize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_increaseItemInInventory",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_isItemActive",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_isOccupied",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_isValidAttack",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "_isValidMove",
    values: [string, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_mine",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_modifyItemInInventoryNonce",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "_place",
    values: [PositionStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_setOccupierAtPosition",
    values: [string, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_setPlayerPosition",
    values: [string, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_transfer",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_withinDistance",
    values: [PositionStruct, PositionStruct, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "s", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setEpochController",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "_blockOccupier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_changeHealth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_changeTopLevelStrengthAtPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_decreaseItemInInventory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_encodePos", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getAllPlayerAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getAllPlayerData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getBlockAtPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getBlockCountAtPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getInventoryByPlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getItemAmountById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getItemNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getItemWithMetadata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getMap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getPlayerPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getPositionFromIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getTileData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getTopBlockAtPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getTopLevelStrengthAtPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getWorldSize",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_increaseItemInInventory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isItemActive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isOccupied",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isValidAttack",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_isValidMove",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_mine", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_modifyItemInInventoryNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_place", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_setOccupierAtPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_setPlayerPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_withinDistance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "s", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setEpochController",
    data: BytesLike
  ): Result;

  events: {
    "Transfer(address,address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type TransferEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  { _player: string; _recipient: string; _id: BigNumber; _amount: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface GameStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GameStorageInterface;

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
    _blockOccupier(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    _changeHealth(
      _player: string,
      _amount: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _changeTopLevelStrengthAtPosition(
      _pos: PositionStruct,
      _attackDamage: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _decreaseItemInInventory(
      _player: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _encodePos(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    _getAllPlayerAddresses(overrides?: CallOverrides): Promise<[string[]]>;

    _getAllPlayerData(
      _player: string,
      overrides?: CallOverrides
    ): Promise<
      [PlayerDataStructOutput] & { playerData: PlayerDataStructOutput }
    >;

    _getBlockAtPosition(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getBlockCountAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getInventoryByPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[RecipeStructOutput]>;

    _getItemAmountById(
      _player: string,
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getItemNonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    _getItemWithMetadata(
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[ItemWithMetadataStructOutput]>;

    _getMap(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileWithMetadataStructOutput[]]>;

    _getPlayerPosition(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput]>;

    _getPositionFromIndex(
      k: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput]>;

    _getTileData(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput]>;

    _getTopBlockAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getTopLevelStrengthAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getWorldSize(overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;

    _increaseItemInInventory(
      _player: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _isItemActive(
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _isOccupied(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _isValidAttack(
      _player: string,
      _target: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _isValidMove(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _mine(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _modifyItemInInventoryNonce(
      _itemId: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _place(
      _pos: PositionStruct,
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setOccupierAtPosition(
      _player: string,
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _setPlayerPosition(
      _player: string,
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _transfer(
      _recipient: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    _withinDistance(
      p1: PositionStruct,
      p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    s(
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        string,
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string
      ] & {
        worldWidth: BigNumber;
        worldHeight: BigNumber;
        admin: string;
        paused: boolean;
        itemNonce: BigNumber;
        attackRange: BigNumber;
        attackDamage: BigNumber;
        attackWaitTime: BigNumber;
        startPlayerHealth: BigNumber;
        startPlayerEnergy: BigNumber;
        epochController: string;
      }
    >;

    setEpochController(
      _addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  _blockOccupier(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  _changeHealth(
    _player: string,
    _amount: BigNumberish,
    dir: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _changeTopLevelStrengthAtPosition(
    _pos: PositionStruct,
    _attackDamage: BigNumberish,
    dir: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _decreaseItemInInventory(
    _player: string,
    _itemId: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _encodePos(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  _getAllPlayerAddresses(overrides?: CallOverrides): Promise<string[]>;

  _getAllPlayerData(
    _player: string,
    overrides?: CallOverrides
  ): Promise<PlayerDataStructOutput>;

  _getBlockAtPosition(
    _pos: PositionStruct,
    _zIdx: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getBlockCountAtPosition(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getInventoryByPlayer(
    _player: string,
    overrides?: CallOverrides
  ): Promise<RecipeStructOutput>;

  _getItemAmountById(
    _player: string,
    _blockId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getItemNonce(overrides?: CallOverrides): Promise<BigNumber>;

  _getItemWithMetadata(
    _itemId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<ItemWithMetadataStructOutput>;

  _getMap(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileWithMetadataStructOutput[]>;

  _getPlayerPosition(
    _player: string,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput>;

  _getPositionFromIndex(
    k: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput>;

  _getTileData(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileStructOutput>;

  _getTopBlockAtPosition(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getTopLevelStrengthAtPosition(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getWorldSize(overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;

  _increaseItemInInventory(
    _player: string,
    _itemId: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _isItemActive(
    _itemId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _isOccupied(
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _isValidAttack(
    _player: string,
    _target: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _isValidMove(
    _player: string,
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _mine(
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _modifyItemInInventoryNonce(
    _itemId: BigNumberish,
    dir: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _place(
    _pos: PositionStruct,
    _itemId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setOccupierAtPosition(
    _player: string,
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _setPlayerPosition(
    _player: string,
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _transfer(
    _recipient: string,
    _itemId: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  _withinDistance(
    p1: PositionStruct,
    p2: PositionStruct,
    _dist: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  s(
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      string,
      boolean,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      string
    ] & {
      worldWidth: BigNumber;
      worldHeight: BigNumber;
      admin: string;
      paused: boolean;
      itemNonce: BigNumber;
      attackRange: BigNumber;
      attackDamage: BigNumber;
      attackWaitTime: BigNumber;
      startPlayerHealth: BigNumber;
      startPlayerEnergy: BigNumber;
      epochController: string;
    }
  >;

  setEpochController(
    _addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _blockOccupier(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    _changeHealth(
      _player: string,
      _amount: BigNumberish,
      dir: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    _changeTopLevelStrengthAtPosition(
      _pos: PositionStruct,
      _attackDamage: BigNumberish,
      dir: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    _decreaseItemInInventory(
      _player: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    _encodePos(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    _getAllPlayerAddresses(overrides?: CallOverrides): Promise<string[]>;

    _getAllPlayerData(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PlayerDataStructOutput>;

    _getBlockAtPosition(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBlockCountAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getInventoryByPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<RecipeStructOutput>;

    _getItemAmountById(
      _player: string,
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getItemNonce(overrides?: CallOverrides): Promise<BigNumber>;

    _getItemWithMetadata(
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<ItemWithMetadataStructOutput>;

    _getMap(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileWithMetadataStructOutput[]>;

    _getPlayerPosition(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput>;

    _getPositionFromIndex(
      k: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput>;

    _getTileData(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileStructOutput>;

    _getTopBlockAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTopLevelStrengthAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getWorldSize(overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;

    _increaseItemInInventory(
      _player: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    _isItemActive(
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _isOccupied(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _isValidAttack(
      _player: string,
      _target: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _isValidMove(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _mine(_pos: PositionStruct, overrides?: CallOverrides): Promise<void>;

    _modifyItemInInventoryNonce(
      _itemId: BigNumberish,
      dir: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    _place(
      _pos: PositionStruct,
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    _setOccupierAtPosition(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    _setPlayerPosition(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    _transfer(
      _recipient: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    _withinDistance(
      p1: PositionStruct,
      p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    s(
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        string,
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string
      ] & {
        worldWidth: BigNumber;
        worldHeight: BigNumber;
        admin: string;
        paused: boolean;
        itemNonce: BigNumber;
        attackRange: BigNumber;
        attackDamage: BigNumber;
        attackWaitTime: BigNumber;
        startPlayerHealth: BigNumber;
        startPlayerEnergy: BigNumber;
        epochController: string;
      }
    >;

    setEpochController(_addr: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
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
    _blockOccupier(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _changeHealth(
      _player: string,
      _amount: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _changeTopLevelStrengthAtPosition(
      _pos: PositionStruct,
      _attackDamage: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _decreaseItemInInventory(
      _player: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _encodePos(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getAllPlayerAddresses(overrides?: CallOverrides): Promise<BigNumber>;

    _getAllPlayerData(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBlockAtPosition(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBlockCountAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getInventoryByPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getItemAmountById(
      _player: string,
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getItemNonce(overrides?: CallOverrides): Promise<BigNumber>;

    _getItemWithMetadata(
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMap(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayerPosition(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPositionFromIndex(
      k: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTileData(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTopBlockAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTopLevelStrengthAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getWorldSize(overrides?: CallOverrides): Promise<BigNumber>;

    _increaseItemInInventory(
      _player: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _isItemActive(
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _isOccupied(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _isValidAttack(
      _player: string,
      _target: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _isValidMove(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _mine(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _modifyItemInInventoryNonce(
      _itemId: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _place(
      _pos: PositionStruct,
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setOccupierAtPosition(
      _player: string,
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _setPlayerPosition(
      _player: string,
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _transfer(
      _recipient: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    _withinDistance(
      p1: PositionStruct,
      p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    s(overrides?: CallOverrides): Promise<BigNumber>;

    setEpochController(
      _addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _blockOccupier(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _changeHealth(
      _player: string,
      _amount: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _changeTopLevelStrengthAtPosition(
      _pos: PositionStruct,
      _attackDamage: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _decreaseItemInInventory(
      _player: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _encodePos(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getAllPlayerAddresses(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getAllPlayerData(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBlockAtPosition(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBlockCountAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getInventoryByPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getItemAmountById(
      _player: string,
      _blockId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getItemNonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _getItemWithMetadata(
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getMap(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPlayerPosition(
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

    _getTopBlockAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTopLevelStrengthAtPosition(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getWorldSize(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _increaseItemInInventory(
      _player: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _isItemActive(
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isOccupied(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isValidAttack(
      _player: string,
      _target: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _isValidMove(
      _player: string,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _mine(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _modifyItemInInventoryNonce(
      _itemId: BigNumberish,
      dir: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _place(
      _pos: PositionStruct,
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setOccupierAtPosition(
      _player: string,
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _setPlayerPosition(
      _player: string,
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _transfer(
      _recipient: string,
      _itemId: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    _withinDistance(
      p1: PositionStruct,
      p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    s(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setEpochController(
      _addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
