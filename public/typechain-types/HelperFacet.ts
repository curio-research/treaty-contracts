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

export interface HelperFacetInterface extends utils.Interface {
  functions: {
    "bulkInitializeTiles((uint256,uint256)[])": FunctionFragment;
    "pauseGame()": FunctionFragment;
    "reactivatePlayer(address)": FunctionFragment;
    "repair((uint256,uint256))": FunctionFragment;
    "resumeGame()": FunctionFragment;
    "spawnTroop((uint256,uint256),address,uint256)": FunctionFragment;
    "storeEncodedColumnBatches(uint256[][])": FunctionFragment;
    "transferBaseOwnership((uint256,uint256),address)": FunctionFragment;
    "updatePlayerBalance(address)": FunctionFragment;
  };

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
    functionFragment: "repair",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "resumeGame",
    values?: undefined
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
    functionFragment: "updatePlayerBalance",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "bulkInitializeTiles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pauseGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "reactivatePlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "repair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "resumeGame", data: BytesLike): Result;
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
    functionFragment: "updatePlayerBalance",
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

    repair(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    resumeGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    spawnTroop(
      _pos: PositionStruct,
      _player: string,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    storeEncodedColumnBatches(
      _colBatches: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferBaseOwnership(
      _pos: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updatePlayerBalance(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

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

  repair(
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  resumeGame(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  spawnTroop(
    _pos: PositionStruct,
    _player: string,
    _troopTypeId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  storeEncodedColumnBatches(
    _colBatches: BigNumberish[][],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferBaseOwnership(
    _pos: PositionStruct,
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updatePlayerBalance(
    _player: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    pauseGame(overrides?: CallOverrides): Promise<void>;

    reactivatePlayer(_player: string, overrides?: CallOverrides): Promise<void>;

    repair(_pos: PositionStruct, overrides?: CallOverrides): Promise<void>;

    resumeGame(overrides?: CallOverrides): Promise<void>;

    spawnTroop(
      _pos: PositionStruct,
      _player: string,
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    storeEncodedColumnBatches(
      _colBatches: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<void>;

    transferBaseOwnership(
      _pos: PositionStruct,
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updatePlayerBalance(
      _player: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
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

    repair(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    resumeGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    spawnTroop(
      _pos: PositionStruct,
      _player: string,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    storeEncodedColumnBatches(
      _colBatches: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferBaseOwnership(
      _pos: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updatePlayerBalance(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
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

    repair(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    resumeGame(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    spawnTroop(
      _pos: PositionStruct,
      _player: string,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    storeEncodedColumnBatches(
      _colBatches: BigNumberish[][],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferBaseOwnership(
      _pos: PositionStruct,
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updatePlayerBalance(
      _player: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}