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

export interface CurioOSInterface extends utils.Interface {
  functions: {
    "addComponent(string)": FunctionFragment;
    "addEntity()": FunctionFragment;
    "addEntityToComponent(uint256,uint256)": FunctionFragment;
    "addEntityToComponentByName(uint256,string)": FunctionFragment;
    "componentID()": FunctionFragment;
    "componentName(string)": FunctionFragment;
    "components(uint256)": FunctionFragment;
    "difference(uint256,uint256)": FunctionFragment;
    "entityID()": FunctionFragment;
    "intersection(uint256,uint256)": FunctionFragment;
    "moveInBay(uint256)": FunctionFragment;
    "removeEntityFromComponent(uint256,uint256)": FunctionFragment;
    "union(uint256,uint256)": FunctionFragment;
    "upgradeShips()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addComponent",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "addEntity", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "addEntityToComponent",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addEntityToComponentByName",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "componentID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "componentName",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "components",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "difference",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "entityID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "intersection",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "moveInBay",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeEntityFromComponent",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "union",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeShips",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addEntity", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addEntityToComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addEntityToComponentByName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "componentID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "componentName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "components", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "difference", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "entityID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "intersection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "moveInBay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeEntityFromComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "union", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeShips",
    data: BytesLike
  ): Result;

  events: {};
}

export interface CurioOS extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CurioOSInterface;

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
    addComponent(
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addEntity(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addEntityToComponent(
      _entityID: BigNumberish,
      _componentID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addEntityToComponentByName(
      _entityID: BigNumberish,
      _componentName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    componentID(overrides?: CallOverrides): Promise<[BigNumber]>;

    componentName(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    components(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    difference(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    entityID(overrides?: CallOverrides): Promise<[BigNumber]>;

    intersection(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    moveInBay(
      _shipID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeEntityFromComponent(
      _entityID: BigNumberish,
      _componentID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    union(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    upgradeShips(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addComponent(
    _name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addEntity(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addEntityToComponent(
    _entityID: BigNumberish,
    _componentID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addEntityToComponentByName(
    _entityID: BigNumberish,
    _componentName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  componentID(overrides?: CallOverrides): Promise<BigNumber>;

  componentName(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  components(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  difference(
    componentID1: BigNumberish,
    componentID2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  entityID(overrides?: CallOverrides): Promise<BigNumber>;

  intersection(
    componentID1: BigNumberish,
    componentID2: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  moveInBay(
    _shipID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeEntityFromComponent(
    _entityID: BigNumberish,
    _componentID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  union(
    componentID1: BigNumberish,
    componentID2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  upgradeShips(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addComponent(_name: string, overrides?: CallOverrides): Promise<BigNumber>;

    addEntity(overrides?: CallOverrides): Promise<void>;

    addEntityToComponent(
      _entityID: BigNumberish,
      _componentID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addEntityToComponentByName(
      _entityID: BigNumberish,
      _componentName: string,
      overrides?: CallOverrides
    ): Promise<void>;

    componentID(overrides?: CallOverrides): Promise<BigNumber>;

    componentName(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    components(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    difference(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    entityID(overrides?: CallOverrides): Promise<BigNumber>;

    intersection(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    moveInBay(_shipID: BigNumberish, overrides?: CallOverrides): Promise<void>;

    removeEntityFromComponent(
      _entityID: BigNumberish,
      _componentID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    union(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    upgradeShips(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addComponent(
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addEntity(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addEntityToComponent(
      _entityID: BigNumberish,
      _componentID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addEntityToComponentByName(
      _entityID: BigNumberish,
      _componentName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    componentID(overrides?: CallOverrides): Promise<BigNumber>;

    componentName(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    components(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    difference(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    entityID(overrides?: CallOverrides): Promise<BigNumber>;

    intersection(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    moveInBay(
      _shipID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeEntityFromComponent(
      _entityID: BigNumberish,
      _componentID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    union(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    upgradeShips(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addComponent(
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addEntity(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addEntityToComponent(
      _entityID: BigNumberish,
      _componentID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addEntityToComponentByName(
      _entityID: BigNumberish,
      _componentName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    componentID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    componentName(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    components(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    difference(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    entityID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    intersection(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    moveInBay(
      _shipID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeEntityFromComponent(
      _entityID: BigNumberish,
      _componentID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    union(
      componentID1: BigNumberish,
      componentID2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    upgradeShips(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
