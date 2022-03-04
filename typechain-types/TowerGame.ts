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

export type TowerStruct = {
  rewardPerEpoch: BigNumberish;
  itemId: BigNumberish;
  stakedAmount: BigNumberish;
  stakedTime: BigNumberish;
  owner: string;
};

export type TowerStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  string
] & {
  rewardPerEpoch: BigNumber;
  itemId: BigNumber;
  stakedAmount: BigNumber;
  stakedTime: BigNumber;
  owner: string;
};

export interface TowerGameInterface extends utils.Interface {
  functions: {
    "_modifyRewardByBlockLocation(uint256,(uint256,uint256))": FunctionFragment;
    "addTower((uint256,uint256),(uint256,uint256,uint256,uint256,address))": FunctionFragment;
    "addTowerBulk((uint256,uint256)[],(uint256,uint256,uint256,uint256,address)[])": FunctionFragment;
    "claimReward((uint256,uint256))": FunctionFragment;
    "getTowerById((uint256,uint256))": FunctionFragment;
    "stake((uint256,uint256),uint256)": FunctionFragment;
    "unstake((uint256,uint256),uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_modifyRewardByBlockLocation",
    values: [BigNumberish, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "addTower",
    values: [PositionStruct, TowerStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "addTowerBulk",
    values: [PositionStruct[], TowerStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getTowerById",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [PositionStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [PositionStruct, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "_modifyRewardByBlockLocation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addTower", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addTowerBulk",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTowerById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;

  events: {
    "ClaimReward(address,tuple,uint256,uint256,uint256)": EventFragment;
    "StakeTower(address,tuple,uint256,uint256)": EventFragment;
    "UnstakeTower(address,tuple,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimReward"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakeTower"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UnstakeTower"): EventFragment;
}

export type ClaimRewardEvent = TypedEvent<
  [string, PositionStructOutput, BigNumber, BigNumber, BigNumber],
  {
    _player: string;
    _towerPos: PositionStructOutput;
    _itemId: BigNumber;
    _itemAmount: BigNumber;
    _epoch: BigNumber;
  }
>;

export type ClaimRewardEventFilter = TypedEventFilter<ClaimRewardEvent>;

export type StakeTowerEvent = TypedEvent<
  [string, PositionStructOutput, BigNumber, BigNumber],
  {
    _player: string;
    _towerPos: PositionStructOutput;
    _playerPoints: BigNumber;
    _towerPoints: BigNumber;
  }
>;

export type StakeTowerEventFilter = TypedEventFilter<StakeTowerEvent>;

export type UnstakeTowerEvent = TypedEvent<
  [string, PositionStructOutput, BigNumber, BigNumber],
  {
    _player: string;
    _towerPos: PositionStructOutput;
    _playerPoints: BigNumber;
    _towerPoints: BigNumber;
  }
>;

export type UnstakeTowerEventFilter = TypedEventFilter<UnstakeTowerEvent>;

export interface TowerGame extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TowerGameInterface;

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
    _modifyRewardByBlockLocation(
      _reward: BigNumberish,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    addTower(
      _position: PositionStruct,
      _tower: TowerStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addTowerBulk(
      _positions: PositionStruct[],
      _towers: TowerStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimReward(
      _position: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getTowerById(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TowerStructOutput]>;

    stake(
      _position: PositionStruct,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unstake(
      _position: PositionStruct,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  _modifyRewardByBlockLocation(
    _reward: BigNumberish,
    _pos: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  addTower(
    _position: PositionStruct,
    _tower: TowerStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addTowerBulk(
    _positions: PositionStruct[],
    _towers: TowerStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimReward(
    _position: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getTowerById(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TowerStructOutput>;

  stake(
    _position: PositionStruct,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unstake(
    _position: PositionStruct,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _modifyRewardByBlockLocation(
      _reward: BigNumberish,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addTower(
      _position: PositionStruct,
      _tower: TowerStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    addTowerBulk(
      _positions: PositionStruct[],
      _towers: TowerStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    claimReward(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    getTowerById(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TowerStructOutput>;

    stake(
      _position: PositionStruct,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    unstake(
      _position: PositionStruct,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ClaimReward(address,tuple,uint256,uint256,uint256)"(
      _player?: null,
      _towerPos?: null,
      _itemId?: null,
      _itemAmount?: null,
      _epoch?: null
    ): ClaimRewardEventFilter;
    ClaimReward(
      _player?: null,
      _towerPos?: null,
      _itemId?: null,
      _itemAmount?: null,
      _epoch?: null
    ): ClaimRewardEventFilter;

    "StakeTower(address,tuple,uint256,uint256)"(
      _player?: null,
      _towerPos?: null,
      _playerPoints?: null,
      _towerPoints?: null
    ): StakeTowerEventFilter;
    StakeTower(
      _player?: null,
      _towerPos?: null,
      _playerPoints?: null,
      _towerPoints?: null
    ): StakeTowerEventFilter;

    "UnstakeTower(address,tuple,uint256,uint256)"(
      _player?: null,
      _towerPos?: null,
      _playerPoints?: null,
      _towerPoints?: null
    ): UnstakeTowerEventFilter;
    UnstakeTower(
      _player?: null,
      _towerPos?: null,
      _playerPoints?: null,
      _towerPoints?: null
    ): UnstakeTowerEventFilter;
  };

  estimateGas: {
    _modifyRewardByBlockLocation(
      _reward: BigNumberish,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addTower(
      _position: PositionStruct,
      _tower: TowerStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addTowerBulk(
      _positions: PositionStruct[],
      _towers: TowerStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimReward(
      _position: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getTowerById(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    stake(
      _position: PositionStruct,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unstake(
      _position: PositionStruct,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _modifyRewardByBlockLocation(
      _reward: BigNumberish,
      _pos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addTower(
      _position: PositionStruct,
      _tower: TowerStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addTowerBulk(
      _positions: PositionStruct[],
      _towers: TowerStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimReward(
      _position: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getTowerById(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stake(
      _position: PositionStruct,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unstake(
      _position: PositionStruct,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
