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
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export type ComponentSpecStruct = { name: string; valueType: BigNumberish };

export type ComponentSpecStructOutput = [string, number] & {
  name: string;
  valueType: number;
};

export interface HelperFacetInterface extends utils.Interface {
  functions: {
    "addEntity()": FunctionFragment;
    "bulkInitializeTiles((uint256,uint256)[])": FunctionFragment;
    "pauseGame()": FunctionFragment;
    "reactivatePlayer(address)": FunctionFragment;
    "registerComponents(address,(string,uint8)[])": FunctionFragment;
    "registerDefaultComponents(address)": FunctionFragment;
    "resumeGame()": FunctionFragment;
    "setComponentValue(string,uint256,bytes)": FunctionFragment;
    "spawnTroop((uint256,uint256),address,uint256)": FunctionFragment;
    "storeEncodedColumnBatches(uint256[][])": FunctionFragment;
    "transferBaseOwnership((uint256,uint256),address)": FunctionFragment;
    "updatePlayerBalances(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addEntity", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "bulkInitializeTiles",
    values: [PositionStruct[]]
  ): string;
  encodeFunctionData(functionFragment: "pauseGame", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "reactivatePlayer",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerComponents",
    values: [string, ComponentSpecStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "registerDefaultComponents",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "resumeGame",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setComponentValue",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "spawnTroop",
    values: [PositionStruct, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "storeEncodedColumnBatches",
    values: [BigNumberish[][]]
  ): string;
  encodeFunctionData(
    functionFragment: "transferBaseOwnership",
    values: [PositionStruct, string]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePlayerBalances",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "addEntity", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bulkInitializeTiles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pauseGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "reactivatePlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerComponents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerDefaultComponents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resumeGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setComponentValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "spawnTroop", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "storeEncodedColumnBatches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferBaseOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePlayerBalances",
    data: BytesLike
  ): Result;

  events: {};
}

export interface HelperFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: HelperFacetInterface;

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
    addEntity(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pauseGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reactivatePlayer(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registerComponents(
      _gameAddr: string,
      _componentSpecs: ComponentSpecStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registerDefaultComponents(
      _gameAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    resumeGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setComponentValue(
      _componentName: string,
      _entity: BigNumberish,
      _value: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    spawnTroop(
      _position: PositionStruct,
      _player: string,
      _troopTemplateEntity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    storeEncodedColumnBatches(
      _colBatches: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferBaseOwnership(
      _position: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updatePlayerBalances(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addEntity(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bulkInitializeTiles(
    _positions: PositionStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pauseGame(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reactivatePlayer(
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registerComponents(
    _gameAddr: string,
    _componentSpecs: ComponentSpecStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registerDefaultComponents(
    _gameAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  resumeGame(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setComponentValue(
    _componentName: string,
    _entity: BigNumberish,
    _value: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  spawnTroop(
    _position: PositionStruct,
    _player: string,
    _troopTemplateEntity: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  storeEncodedColumnBatches(
    _colBatches: BigNumberish[][],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferBaseOwnership(
    _position: PositionStruct,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updatePlayerBalances(
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addEntity(overrides?: CallOverrides): Promise<BigNumber>;

    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    pauseGame(overrides?: CallOverrides): Promise<void>;

    reactivatePlayer(_player: string, overrides?: CallOverrides): Promise<void>;

    registerComponents(
      _gameAddr: string,
      _componentSpecs: ComponentSpecStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    registerDefaultComponents(
      _gameAddr: string,
      overrides?: CallOverrides
    ): Promise<ComponentSpecStructOutput[]>;

    resumeGame(overrides?: CallOverrides): Promise<void>;

    setComponentValue(
      _componentName: string,
      _entity: BigNumberish,
      _value: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    spawnTroop(
      _position: PositionStruct,
      _player: string,
      _troopTemplateEntity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    storeEncodedColumnBatches(
      _colBatches: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<void>;

    transferBaseOwnership(
      _position: PositionStruct,
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updatePlayerBalances(
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addEntity(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pauseGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reactivatePlayer(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registerComponents(
      _gameAddr: string,
      _componentSpecs: ComponentSpecStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registerDefaultComponents(
      _gameAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    resumeGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setComponentValue(
      _componentName: string,
      _entity: BigNumberish,
      _value: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    spawnTroop(
      _position: PositionStruct,
      _player: string,
      _troopTemplateEntity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    storeEncodedColumnBatches(
      _colBatches: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferBaseOwnership(
      _position: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updatePlayerBalances(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addEntity(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pauseGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reactivatePlayer(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registerComponents(
      _gameAddr: string,
      _componentSpecs: ComponentSpecStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registerDefaultComponents(
      _gameAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    resumeGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setComponentValue(
      _componentName: string,
      _entity: BigNumberish,
      _value: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    spawnTroop(
      _position: PositionStruct,
      _player: string,
      _troopTemplateEntity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    storeEncodedColumnBatches(
      _colBatches: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferBaseOwnership(
      _position: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updatePlayerBalances(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
