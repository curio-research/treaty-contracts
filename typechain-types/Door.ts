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
  programmable: boolean;
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
  BigNumber[],
  boolean
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
  programmable: boolean;
};

export interface DoorInterface extends utils.Interface {
  functions: {
    "isWhitelisted(address)": FunctionFragment;
    "item()": FunctionFragment;
    "setWhitelistPlayer(address,bool)": FunctionFragment;
    "whitelist(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "isWhitelisted",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "item", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setWhitelistPlayer",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "whitelist", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "isWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "item", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setWhitelistPlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "whitelist", data: BytesLike): Result;

  events: {};
}

export interface Door extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DoorInterface;

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
    isWhitelisted(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    item(
      overrides?: CallOverrides
    ): Promise<
      [boolean, boolean, boolean, BigNumber, BigNumber, BigNumber, boolean] & {
        mineable: boolean;
        craftable: boolean;
        occupiable: boolean;
        strength: BigNumber;
        healthDamage: BigNumber;
        energyDamage: BigNumber;
        programmable: boolean;
      }
    >;

    setWhitelistPlayer(
      _player: string,
      _isWhitelisted: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    whitelist(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;
  };

  isWhitelisted(_player: string, overrides?: CallOverrides): Promise<boolean>;

  item(
    overrides?: CallOverrides
  ): Promise<
    [boolean, boolean, boolean, BigNumber, BigNumber, BigNumber, boolean] & {
      mineable: boolean;
      craftable: boolean;
      occupiable: boolean;
      strength: BigNumber;
      healthDamage: BigNumber;
      energyDamage: BigNumber;
      programmable: boolean;
    }
  >;

  setWhitelistPlayer(
    _player: string,
    _isWhitelisted: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  whitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    isWhitelisted(_player: string, overrides?: CallOverrides): Promise<boolean>;

    item(
      overrides?: CallOverrides
    ): Promise<
      [boolean, boolean, boolean, BigNumber, BigNumber, BigNumber, boolean] & {
        mineable: boolean;
        craftable: boolean;
        occupiable: boolean;
        strength: BigNumber;
        healthDamage: BigNumber;
        energyDamage: BigNumber;
        programmable: boolean;
      }
    >;

    setWhitelistPlayer(
      _player: string,
      _isWhitelisted: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    whitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    isWhitelisted(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    item(overrides?: CallOverrides): Promise<BigNumber>;

    setWhitelistPlayer(
      _player: string,
      _isWhitelisted: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    whitelist(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    isWhitelisted(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    item(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setWhitelistPlayer(
      _player: string,
      _isWhitelisted: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    whitelist(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
