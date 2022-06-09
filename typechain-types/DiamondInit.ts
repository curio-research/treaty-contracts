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
  worldWidth: BigNumberish;
  worldHeight: BigNumberish;
  startPlayerHealth: BigNumberish;
  startingReach: BigNumberish;
  startingPlayerDefaultCurrencyAmount: BigNumberish;
  playerMoveCooldown: BigNumberish;
  getMapInterval: BigNumberish;
};

export type WorldConstantsStructOutput = [
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
  startPlayerHealth: BigNumber;
  startingReach: BigNumber;
  startingPlayerDefaultCurrencyAmount: BigNumber;
  playerMoveCooldown: BigNumber;
  getMapInterval: BigNumber;
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

export interface DiamondInitInterface extends utils.Interface {
  functions: {
    "init((uint256,uint256,uint256,uint256,uint256,uint256,uint256),(bool,bool,bool,uint256,uint256[],uint256[],uint256[],uint256,uint256,uint256,uint256,bool,string,string)[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "init",
    values: [WorldConstantsStruct, ItemStruct[]]
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
      constants: WorldConstantsStruct,
      _items: ItemStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  init(
    constants: WorldConstantsStruct,
    _items: ItemStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    init(
      constants: WorldConstantsStruct,
      _items: ItemStruct[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    init(
      constants: WorldConstantsStruct,
      _items: ItemStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    init(
      constants: WorldConstantsStruct,
      _items: ItemStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}