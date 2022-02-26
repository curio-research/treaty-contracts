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

export type WorldConstantsStruct = {
  worldWidth: BigNumberish;
  worldHeight: BigNumberish;
  startingAttackDamage: BigNumberish;
  startingAttackRange: BigNumberish;
  startingAttackWaitTime: BigNumberish;
  startPlayerHealth: BigNumberish;
  startPlayerEnergy: BigNumberish;
  startingReach: BigNumberish;
};

export type WorldConstantsStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  worldWidth: BigNumber;
  worldHeight: BigNumber;
  startingAttackDamage: BigNumber;
  startingAttackRange: BigNumber;
  startingAttackWaitTime: BigNumber;
  startPlayerHealth: BigNumber;
  startPlayerEnergy: BigNumber;
  startingReach: BigNumber;
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

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export interface GameInterface extends utils.Interface {
  functions: {
    "attackItem((uint256,uint256),uint256,address)": FunctionFragment;
    "craft(uint256)": FunctionFragment;
    "initializePlayer((uint256,uint256))": FunctionFragment;
    "mine((uint256,uint256))": FunctionFragment;
    "mineItem((uint256,uint256),uint256,address)": FunctionFragment;
    "move((uint256,uint256))": FunctionFragment;
    "place((uint256,uint256),uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "attackItem",
    values: [PositionStruct, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "craft", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "initializePlayer",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "mine",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "mineItem",
    values: [PositionStruct, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "move",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "place",
    values: [PositionStruct, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "attackItem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "craft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initializePlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mine", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mineItem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "move", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "place", data: BytesLike): Result;

  events: {
    "Attack(address,address)": EventFragment;
    "AttackItem(address,tuple,uint256,uint256)": EventFragment;
    "Craft(address,uint256)": EventFragment;
    "Death(address)": EventFragment;
    "MineItem(address,tuple,uint256,uint256)": EventFragment;
    "Move(address,tuple)": EventFragment;
    "NewPlayer(address,tuple)": EventFragment;
    "Place(address,tuple,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Attack"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AttackItem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Craft"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Death"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MineItem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Move"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPlayer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Place"): EventFragment;
}

export type AttackEvent = TypedEvent<
  [string, string],
  { _player1: string; _player2: string }
>;

export type AttackEventFilter = TypedEventFilter<AttackEvent>;

export type AttackItemEvent = TypedEvent<
  [string, PositionStructOutput, BigNumber, BigNumber],
  {
    _player: string;
    _pos: PositionStructOutput;
    _strength: BigNumber;
    _zIndex: BigNumber;
  }
>;

export type AttackItemEventFilter = TypedEventFilter<AttackItemEvent>;

export type CraftEvent = TypedEvent<
  [string, BigNumber],
  { _player: string; _blockId: BigNumber }
>;

export type CraftEventFilter = TypedEventFilter<CraftEvent>;

export type DeathEvent = TypedEvent<[string], { _player: string }>;

export type DeathEventFilter = TypedEventFilter<DeathEvent>;

export type MineItemEvent = TypedEvent<
  [string, PositionStructOutput, BigNumber, BigNumber],
  {
    _player: string;
    _pos: PositionStructOutput;
    _blockId: BigNumber;
    _zIndex: BigNumber;
  }
>;

export type MineItemEventFilter = TypedEventFilter<MineItemEvent>;

export type MoveEvent = TypedEvent<
  [string, PositionStructOutput],
  { _player: string; _pos: PositionStructOutput }
>;

export type MoveEventFilter = TypedEventFilter<MoveEvent>;

export type NewPlayerEvent = TypedEvent<
  [string, PositionStructOutput],
  { _player: string; _pos: PositionStructOutput }
>;

export type NewPlayerEventFilter = TypedEventFilter<NewPlayerEvent>;

export type PlaceEvent = TypedEvent<
  [string, PositionStructOutput, BigNumber],
  { _player: string; _pos: PositionStructOutput; _blockId: BigNumber }
>;

export type PlaceEventFilter = TypedEventFilter<PlaceEvent>;

export interface Game extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GameInterface;

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
    attackItem(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      _playerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    craft(
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initializePlayer(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mine(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mineItem(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      _playerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    move(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    place(
      _pos: PositionStruct,
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  attackItem(
    _pos: PositionStruct,
    _zIdx: BigNumberish,
    _playerAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  craft(
    _itemId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initializePlayer(
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mine(
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mineItem(
    _pos: PositionStruct,
    _zIdx: BigNumberish,
    _playerAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  move(
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  place(
    _pos: PositionStruct,
    _itemId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    attackItem(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      _playerAddr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    craft(_itemId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    initializePlayer(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    mine(_pos: PositionStruct, overrides?: CallOverrides): Promise<void>;

    mineItem(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      _playerAddr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    move(_pos: PositionStruct, overrides?: CallOverrides): Promise<void>;

    place(
      _pos: PositionStruct,
      _itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Attack(address,address)"(
      _player1?: null,
      _player2?: null
    ): AttackEventFilter;
    Attack(_player1?: null, _player2?: null): AttackEventFilter;

    "AttackItem(address,tuple,uint256,uint256)"(
      _player?: null,
      _pos?: null,
      _strength?: null,
      _zIndex?: null
    ): AttackItemEventFilter;
    AttackItem(
      _player?: null,
      _pos?: null,
      _strength?: null,
      _zIndex?: null
    ): AttackItemEventFilter;

    "Craft(address,uint256)"(_player?: null, _blockId?: null): CraftEventFilter;
    Craft(_player?: null, _blockId?: null): CraftEventFilter;

    "Death(address)"(_player?: null): DeathEventFilter;
    Death(_player?: null): DeathEventFilter;

    "MineItem(address,tuple,uint256,uint256)"(
      _player?: null,
      _pos?: null,
      _blockId?: null,
      _zIndex?: null
    ): MineItemEventFilter;
    MineItem(
      _player?: null,
      _pos?: null,
      _blockId?: null,
      _zIndex?: null
    ): MineItemEventFilter;

    "Move(address,tuple)"(_player?: null, _pos?: null): MoveEventFilter;
    Move(_player?: null, _pos?: null): MoveEventFilter;

    "NewPlayer(address,tuple)"(
      _player?: null,
      _pos?: null
    ): NewPlayerEventFilter;
    NewPlayer(_player?: null, _pos?: null): NewPlayerEventFilter;

    "Place(address,tuple,uint256)"(
      _player?: null,
      _pos?: null,
      _blockId?: null
    ): PlaceEventFilter;
    Place(_player?: null, _pos?: null, _blockId?: null): PlaceEventFilter;
  };

  estimateGas: {
    attackItem(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      _playerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    craft(
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initializePlayer(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mine(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mineItem(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      _playerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    move(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    place(
      _pos: PositionStruct,
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    attackItem(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      _playerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    craft(
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initializePlayer(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mine(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mineItem(
      _pos: PositionStruct,
      _zIdx: BigNumberish,
      _playerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    move(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    place(
      _pos: PositionStruct,
      _itemId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
