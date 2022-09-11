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

export interface GameFacetInterface extends utils.Interface {
  functions: {
    "endProduction(uint256,uint256)": FunctionFragment;
    "foldCity(uint256)": FunctionFragment;
    "foundCity(uint256,(uint256,uint256)[],(uint256,uint256),string)": FunctionFragment;
    "initializePlayer((uint256,uint256),string)": FunctionFragment;
    "march(uint256,(uint256,uint256))": FunctionFragment;
    "moveSettler(uint256,(uint256,uint256))": FunctionFragment;
    "organizeArmy(uint256,string[],uint256[])": FunctionFragment;
    "startProduction(uint256,uint256,uint256)": FunctionFragment;
    "unfoldCity(uint256)": FunctionFragment;
    "upgradeCity(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "endProduction",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "foldCity",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "foundCity",
    values: [BigNumberish, PositionStruct[], PositionStruct, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initializePlayer",
    values: [PositionStruct, string]
  ): string;
  encodeFunctionData(
    functionFragment: "march",
    values: [BigNumberish, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "moveSettler",
    values: [BigNumberish, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "organizeArmy",
    values: [BigNumberish, string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "startProduction",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unfoldCity",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeCity",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "endProduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "foldCity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "foundCity", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initializePlayer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "march", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "moveSettler",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "organizeArmy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startProduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unfoldCity", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeCity",
    data: BytesLike
  ): Result;

  events: {};
}

export interface GameFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GameFacetInterface;

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
    endProduction(
      _building: BigNumberish,
      _production: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    foldCity(
      _city: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    foundCity(
      _settler: BigNumberish,
      _territory: PositionStruct[],
      _centerPosition: PositionStruct,
      _cityName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initializePlayer(
      _position: PositionStruct,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    march(
      _army: BigNumberish,
      _position: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    moveSettler(
      _settler: BigNumberish,
      _targetPosition: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    organizeArmy(
      _city: BigNumberish,
      _troopTypes: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startProduction(
      _building: BigNumberish,
      _template: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unfoldCity(
      _settler: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradeCity(
      _city: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  endProduction(
    _building: BigNumberish,
    _production: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  foldCity(
    _city: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  foundCity(
    _settler: BigNumberish,
    _territory: PositionStruct[],
    _centerPosition: PositionStruct,
    _cityName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initializePlayer(
    _position: PositionStruct,
    _name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  march(
    _army: BigNumberish,
    _position: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  moveSettler(
    _settler: BigNumberish,
    _targetPosition: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  organizeArmy(
    _city: BigNumberish,
    _troopTypes: string[],
    _amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startProduction(
    _building: BigNumberish,
    _template: BigNumberish,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unfoldCity(
    _settler: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradeCity(
    _city: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    endProduction(
      _building: BigNumberish,
      _production: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    foldCity(
      _city: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    foundCity(
      _settler: BigNumberish,
      _territory: PositionStruct[],
      _centerPosition: PositionStruct,
      _cityName: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializePlayer(
      _position: PositionStruct,
      _name: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { _player: BigNumber; _settler: BigNumber }
    >;

    march(
      _army: BigNumberish,
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    moveSettler(
      _settler: BigNumberish,
      _targetPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    organizeArmy(
      _city: BigNumberish,
      _troopTypes: string[],
      _amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    startProduction(
      _building: BigNumberish,
      _template: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unfoldCity(
      _settler: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeCity(_city: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    endProduction(
      _building: BigNumberish,
      _production: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    foldCity(
      _city: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    foundCity(
      _settler: BigNumberish,
      _territory: PositionStruct[],
      _centerPosition: PositionStruct,
      _cityName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initializePlayer(
      _position: PositionStruct,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    march(
      _army: BigNumberish,
      _position: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    moveSettler(
      _settler: BigNumberish,
      _targetPosition: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    organizeArmy(
      _city: BigNumberish,
      _troopTypes: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startProduction(
      _building: BigNumberish,
      _template: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unfoldCity(
      _settler: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradeCity(
      _city: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    endProduction(
      _building: BigNumberish,
      _production: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    foldCity(
      _city: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    foundCity(
      _settler: BigNumberish,
      _territory: PositionStruct[],
      _centerPosition: PositionStruct,
      _cityName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initializePlayer(
      _position: PositionStruct,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    march(
      _army: BigNumberish,
      _position: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    moveSettler(
      _settler: BigNumberish,
      _targetPosition: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    organizeArmy(
      _city: BigNumberish,
      _troopTypes: string[],
      _amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startProduction(
      _building: BigNumberish,
      _template: BigNumberish,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unfoldCity(
      _settler: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradeCity(
      _city: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
