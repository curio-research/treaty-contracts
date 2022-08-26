/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from 'ethers';
import { FunctionFragment, Result } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export interface EngineFacetInterface extends utils.Interface {
  functions: {
    'deleteTroop(uint256)': FunctionFragment;
    'initializePlayer((uint256,uint256),string)': FunctionFragment;
    'march(uint256,(uint256,uint256))': FunctionFragment;
    'moveTroop(uint256,(uint256,uint256))': FunctionFragment;
    'purchaseTroop((uint256,uint256),uint256)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'deleteTroop', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'initializePlayer', values: [PositionStruct, string]): string;
  encodeFunctionData(functionFragment: 'march', values: [BigNumberish, PositionStruct]): string;
  encodeFunctionData(functionFragment: 'moveTroop', values: [BigNumberish, PositionStruct]): string;
  encodeFunctionData(functionFragment: 'purchaseTroop', values: [PositionStruct, BigNumberish]): string;

  decodeFunctionResult(functionFragment: 'deleteTroop', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initializePlayer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'march', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'moveTroop', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'purchaseTroop', data: BytesLike): Result;

  events: {};
}

export interface EngineFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EngineFacetInterface;

  queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deleteTroop(_troopEntity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    initializePlayer(_position: PositionStruct, _name: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    march(_armyEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    moveTroop(_troopEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    purchaseTroop(_position: PositionStruct, _troopTemplateEntity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;
  };

  deleteTroop(_troopEntity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  initializePlayer(_position: PositionStruct, _name: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  march(_armyEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  moveTroop(_troopEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  purchaseTroop(_position: PositionStruct, _troopTemplateEntity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  callStatic: {
    deleteTroop(_troopEntity: BigNumberish, overrides?: CallOverrides): Promise<void>;

    initializePlayer(_position: PositionStruct, _name: string, overrides?: CallOverrides): Promise<BigNumber>;

    march(_armyEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: CallOverrides): Promise<void>;

    moveTroop(_troopEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: CallOverrides): Promise<void>;

    purchaseTroop(_position: PositionStruct, _troopTemplateEntity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    deleteTroop(_troopEntity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    initializePlayer(_position: PositionStruct, _name: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    march(_armyEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    moveTroop(_troopEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    purchaseTroop(_position: PositionStruct, _troopTemplateEntity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    deleteTroop(_troopEntity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    initializePlayer(_position: PositionStruct, _name: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    march(_armyEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    moveTroop(_troopEntity: BigNumberish, _targetPosition: PositionStruct, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    purchaseTroop(_position: PositionStruct, _troopTemplateEntity: BigNumberish, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;
  };
}
