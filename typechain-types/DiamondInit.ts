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

export type WorldConstantsStruct = {
  admin: string;
  worldWidth: BigNumberish;
  worldHeight: BigNumberish;
  numPorts: BigNumberish;
  numCities: BigNumberish;
  mapInterval: BigNumberish;
  secondsPerEpoch: BigNumberish;
  combatEfficiency: BigNumberish;
  numInitTerrainTypes: BigNumberish;
};

export type WorldConstantsStructOutput = [
  string,
  BigNumber,
  BigNumber,
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
  secondsPerEpoch: BigNumber;
  combatEfficiency: BigNumber;
  numInitTerrainTypes: BigNumber;
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

export interface DiamondInitInterface extends utils.Interface {
  functions: {
    "init((address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256),(uint8,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "init",
    values: [WorldConstantsStruct, TroopTypeStruct[]]
  ): string;

  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;

  events: {};
}

export interface DiamondInit extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DiamondInitInterface;

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
    init(
      _worldConstants: WorldConstantsStruct,
      _troopTypes: TroopTypeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  init(
    _worldConstants: WorldConstantsStruct,
    _troopTypes: TroopTypeStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    init(
      _worldConstants: WorldConstantsStruct,
      _troopTypes: TroopTypeStruct[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    init(
      _worldConstants: WorldConstantsStruct,
      _troopTypes: TroopTypeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    init(
      _worldConstants: WorldConstantsStruct,
      _troopTypes: TroopTypeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
