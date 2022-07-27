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

export interface EngineFacetInterface extends utils.Interface {
  functions: {
    "deleteTroop(uint256)": FunctionFragment;
    "initializePlayer((uint256,uint256))": FunctionFragment;
    "march(uint256,(uint256,uint256))": FunctionFragment;
    "purchaseTroop((uint256,uint256),uint256)": FunctionFragment;
    "purchaseTroopNew((uint256,uint256),uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deleteTroop",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initializePlayer",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "march",
    values: [BigNumberish, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseTroop",
    values: [PositionStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseTroopNew",
    values: [PositionStruct, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "deleteTroop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializePlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "march", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseTroop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseTroopNew",
    data: BytesLike
  ): Result;

  events: {};
}

export interface EngineFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EngineFacetInterface;

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
    deleteTroop(
      _troopId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initializePlayer(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    march(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    purchaseTroop(
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    purchaseTroopNew(
      _position: PositionStruct,
      _troopTemplateId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deleteTroop(
    _troopId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initializePlayer(
    _pos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  march(
    _troopId: BigNumberish,
    _targetPos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  purchaseTroop(
    _pos: PositionStruct,
    _troopTypeId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  purchaseTroopNew(
    _position: PositionStruct,
    _troopTemplateId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deleteTroop(
      _troopId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    initializePlayer(
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    march(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    purchaseTroop(
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    purchaseTroopNew(
      _position: PositionStruct,
      _troopTemplateId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    deleteTroop(
      _troopId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initializePlayer(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    march(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    purchaseTroop(
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    purchaseTroopNew(
      _position: PositionStruct,
      _troopTemplateId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deleteTroop(
      _troopId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initializePlayer(
      _pos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    march(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    purchaseTroop(
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    purchaseTroopNew(
      _position: PositionStruct,
      _troopTemplateId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
