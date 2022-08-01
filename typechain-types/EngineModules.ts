/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from 'ethers';
import { FunctionFragment, Result } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

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

export type ArmyStructOutput = [string, BigNumber[], BigNumber, BigNumber, PositionStructOutput] & {
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

export interface EngineModulesInterface extends utils.Interface {
  functions: {
    '_geographicCheckArmy(uint256,(bool,uint8,uint256,uint256))': FunctionFragment;
    '_geographicCheckTroop(uint256,(bool,uint8,uint256,uint256))': FunctionFragment;
    'getArmyAndTroops(uint256)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: '_geographicCheckArmy', values: [BigNumberish, TileStruct]): string;
  encodeFunctionData(functionFragment: '_geographicCheckTroop', values: [BigNumberish, TileStruct]): string;
  encodeFunctionData(functionFragment: 'getArmyAndTroops', values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: '_geographicCheckArmy', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: '_geographicCheckTroop', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getArmyAndTroops', data: BytesLike): Result;

  events: {};
}

export interface EngineModules extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EngineModulesInterface;

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
    _geographicCheckArmy(_armyId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<[boolean]>;

    _geographicCheckTroop(_troopTypeId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<[boolean]>;

    getArmyAndTroops(_armyId: BigNumberish, overrides?: CallOverrides): Promise<[ArmyStructOutput, TroopStructOutput[]]>;
  };

  _geographicCheckArmy(_armyId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<boolean>;

  _geographicCheckTroop(_troopTypeId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<boolean>;

  getArmyAndTroops(_armyId: BigNumberish, overrides?: CallOverrides): Promise<[ArmyStructOutput, TroopStructOutput[]]>;

  callStatic: {
    _geographicCheckArmy(_armyId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<boolean>;

    _geographicCheckTroop(_troopTypeId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<boolean>;

    getArmyAndTroops(_armyId: BigNumberish, overrides?: CallOverrides): Promise<[ArmyStructOutput, TroopStructOutput[]]>;
  };

  filters: {};

  estimateGas: {
    _geographicCheckArmy(_armyId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<BigNumber>;

    _geographicCheckTroop(_troopTypeId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<BigNumber>;

    getArmyAndTroops(_armyId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _geographicCheckArmy(_armyId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _geographicCheckTroop(_troopTypeId: BigNumberish, _tile: TileStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getArmyAndTroops(_armyId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
