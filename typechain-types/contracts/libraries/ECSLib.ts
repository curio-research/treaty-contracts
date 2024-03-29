/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export type PositionStruct = {
  x: PromiseOrValue<BigNumberish>;
  y: PromiseOrValue<BigNumberish>;
};

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export type QueryConditionStruct = {
  queryType: PromiseOrValue<BigNumberish>;
  component: PromiseOrValue<string>;
  value: PromiseOrValue<BytesLike>;
};

export type QueryConditionStructOutput = [number, string, string] & {
  queryType: number;
  component: string;
  value: string;
};

export interface ECSLibInterface extends utils.Interface {
  functions: {
    "_getComponent(string)": FunctionFragment;
    "concatenate(uint256[],uint256[])": FunctionFragment;
    "getAddress(string,uint256)": FunctionFragment;
    "getAddressComponent(string)": FunctionFragment;
    "getBool(string,uint256)": FunctionFragment;
    "getBoolComponent(string)": FunctionFragment;
    "getComponentByEntity(uint256)": FunctionFragment;
    "getComponentValue(string,uint256)": FunctionFragment;
    "getInt(string,uint256)": FunctionFragment;
    "getIntComponent(string)": FunctionFragment;
    "getPosition(string,uint256)": FunctionFragment;
    "getPositionComponent(string)": FunctionFragment;
    "getString(string,uint256)": FunctionFragment;
    "getStringComponent(string)": FunctionFragment;
    "getUint(string,uint256)": FunctionFragment;
    "getUintArray(string,uint256)": FunctionFragment;
    "getUintArrayComponent(string)": FunctionFragment;
    "getUintComponent(string)": FunctionFragment;
    "query((uint8,Component,bytes)[])": FunctionFragment;
    "queryChunk(uint8,Component,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_getComponent"
      | "concatenate"
      | "getAddress"
      | "getAddressComponent"
      | "getBool"
      | "getBoolComponent"
      | "getComponentByEntity"
      | "getComponentValue"
      | "getInt"
      | "getIntComponent"
      | "getPosition"
      | "getPositionComponent"
      | "getString"
      | "getStringComponent"
      | "getUint"
      | "getUintArray"
      | "getUintArrayComponent"
      | "getUintComponent"
      | "query"
      | "queryChunk"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_getComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "concatenate",
    values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddress",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddressComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBool",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBoolComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getComponentByEntity",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getComponentValue",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getInt",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getIntComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPosition",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPositionComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getString",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getStringComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUint",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUintArray",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUintArrayComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUintComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "query",
    values: [QueryConditionStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "queryChunk",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "_getComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "concatenate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAddressComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBoolComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getComponentByEntity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getComponentValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getInt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getIntComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPositionComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getString", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getStringComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getUint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUintArray",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUintArrayComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUintComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "query", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "queryChunk", data: BytesLike): Result;

  events: {
    "ComponentValueRemoved(string,uint256)": EventFragment;
    "ComponentValueSet(string,uint256,bytes)": EventFragment;
    "EntityRemoved(uint256)": EventFragment;
    "NewComponent(string,uint256)": EventFragment;
    "NewEntity(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ComponentValueRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComponentValueSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EntityRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewComponent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewEntity"): EventFragment;
}

export interface ComponentValueRemovedEventObject {
  _componentName: string;
  _entity: BigNumber;
}
export type ComponentValueRemovedEvent = TypedEvent<
  [string, BigNumber],
  ComponentValueRemovedEventObject
>;

export type ComponentValueRemovedEventFilter =
  TypedEventFilter<ComponentValueRemovedEvent>;

export interface ComponentValueSetEventObject {
  _componentName: string;
  _entity: BigNumber;
  _value: string;
}
export type ComponentValueSetEvent = TypedEvent<
  [string, BigNumber, string],
  ComponentValueSetEventObject
>;

export type ComponentValueSetEventFilter =
  TypedEventFilter<ComponentValueSetEvent>;

export interface EntityRemovedEventObject {
  _entity: BigNumber;
}
export type EntityRemovedEvent = TypedEvent<
  [BigNumber],
  EntityRemovedEventObject
>;

export type EntityRemovedEventFilter = TypedEventFilter<EntityRemovedEvent>;

export interface NewComponentEventObject {
  _name: string;
  _entity: BigNumber;
}
export type NewComponentEvent = TypedEvent<
  [string, BigNumber],
  NewComponentEventObject
>;

export type NewComponentEventFilter = TypedEventFilter<NewComponentEvent>;

export interface NewEntityEventObject {
  _entity: BigNumber;
}
export type NewEntityEvent = TypedEvent<[BigNumber], NewEntityEventObject>;

export type NewEntityEventFilter = TypedEventFilter<NewEntityEvent>;

export interface ECSLib extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ECSLibInterface;

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
    _getComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    concatenate(
      _arr1: PromiseOrValue<BigNumberish>[],
      _arr2: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getAddress(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getAddressComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getBool(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getBoolComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getComponentByEntity(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getComponentValue(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getInt(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getIntComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getPosition(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput]>;

    getPositionComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getString(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getStringComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getUint(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUintArray(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getUintArrayComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getUintComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    query(
      _queryConditions: QueryConditionStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    queryChunk(
      _queryType: PromiseOrValue<BigNumberish>,
      _component: PromiseOrValue<string>,
      _value: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[QueryConditionStructOutput]>;
  };

  _getComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  concatenate(
    _arr1: PromiseOrValue<BigNumberish>[],
    _arr2: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getAddress(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getAddressComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getBool(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getBoolComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getComponentByEntity(
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getComponentValue(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getInt(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getIntComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getPosition(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput>;

  getPositionComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getString(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getStringComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getUint(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getUintArray(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getUintArrayComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getUintComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  query(
    _queryConditions: QueryConditionStruct[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  queryChunk(
    _queryType: PromiseOrValue<BigNumberish>,
    _component: PromiseOrValue<string>,
    _value: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<QueryConditionStructOutput>;

  callStatic: {
    _getComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    concatenate(
      _arr1: PromiseOrValue<BigNumberish>[],
      _arr2: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getAddress(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAddressComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getBool(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getBoolComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getComponentByEntity(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getComponentValue(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getInt(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIntComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getPosition(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput>;

    getPositionComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getString(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getStringComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getUint(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUintArray(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getUintArrayComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getUintComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    query(
      _queryConditions: QueryConditionStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    queryChunk(
      _queryType: PromiseOrValue<BigNumberish>,
      _component: PromiseOrValue<string>,
      _value: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<QueryConditionStructOutput>;
  };

  filters: {
    "ComponentValueRemoved(string,uint256)"(
      _componentName?: null,
      _entity?: null
    ): ComponentValueRemovedEventFilter;
    ComponentValueRemoved(
      _componentName?: null,
      _entity?: null
    ): ComponentValueRemovedEventFilter;

    "ComponentValueSet(string,uint256,bytes)"(
      _componentName?: null,
      _entity?: null,
      _value?: null
    ): ComponentValueSetEventFilter;
    ComponentValueSet(
      _componentName?: null,
      _entity?: null,
      _value?: null
    ): ComponentValueSetEventFilter;

    "EntityRemoved(uint256)"(_entity?: null): EntityRemovedEventFilter;
    EntityRemoved(_entity?: null): EntityRemovedEventFilter;

    "NewComponent(string,uint256)"(
      _name?: null,
      _entity?: null
    ): NewComponentEventFilter;
    NewComponent(_name?: null, _entity?: null): NewComponentEventFilter;

    "NewEntity(uint256)"(_entity?: null): NewEntityEventFilter;
    NewEntity(_entity?: null): NewEntityEventFilter;
  };

  estimateGas: {
    _getComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    concatenate(
      _arr1: PromiseOrValue<BigNumberish>[],
      _arr2: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAddress(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAddressComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBool(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBoolComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getComponentByEntity(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getComponentValue(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInt(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIntComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPosition(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPositionComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getString(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStringComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUint(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUintArray(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUintArrayComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUintComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    query(
      _queryConditions: QueryConditionStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    queryChunk(
      _queryType: PromiseOrValue<BigNumberish>,
      _component: PromiseOrValue<string>,
      _value: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _getComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    concatenate(
      _arr1: PromiseOrValue<BigNumberish>[],
      _arr2: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAddress(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAddressComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBool(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBoolComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getComponentByEntity(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getComponentValue(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInt(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIntComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPosition(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPositionComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getString(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStringComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUint(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUintArray(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUintArrayComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUintComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    query(
      _queryConditions: QueryConditionStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryChunk(
      _queryType: PromiseOrValue<BigNumberish>,
      _component: PromiseOrValue<string>,
      _value: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
