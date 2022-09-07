/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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

export type TileStruct = { isInitialized: boolean; terrain: BigNumberish };

export type TileStructOutput = [boolean, number] & {
  isInitialized: boolean;
  terrain: number;
};

export interface UtilInterface extends utils.Interface {
  functions: {
    "_coincident((uint256,uint256),(uint256,uint256))": FunctionFragment;
    "_concatenate(uint256[],uint256[])": FunctionFragment;
    "_difference(Set,Set)": FunctionFragment;
    "_getAddress(string,uint256)": FunctionFragment;
    "_getArmyAttackFactor(uint256[])": FunctionFragment;
    "_getArmyDamagePerHit(uint256[])": FunctionFragment;
    "_getArmyDefenseFactor(uint256[])": FunctionFragment;
    "_getArmyHealth(uint256[])": FunctionFragment;
    "_getArmyLargeActionCooldown(uint256[])": FunctionFragment;
    "_getArmyMovementCooldown(uint256[])": FunctionFragment;
    "_getArmyTroopEntities(uint256)": FunctionFragment;
    "_getBool(string,uint256)": FunctionFragment;
    "_getComponent(string)": FunctionFragment;
    "_getComponentByEntity(uint256)": FunctionFragment;
    "_getComponentValue(string,uint256)": FunctionFragment;
    "_getDebuffedArmyDamagePerHit(uint256[])": FunctionFragment;
    "_getInfantryPercentage(uint256[])": FunctionFragment;
    "_getInt(string,uint256)": FunctionFragment;
    "_getNeighbors((uint256,uint256))": FunctionFragment;
    "_getPlayerEntity(address)": FunctionFragment;
    "_getPosition(string,uint256)": FunctionFragment;
    "_getString(string,uint256)": FunctionFragment;
    "_getTileAt((uint256,uint256))": FunctionFragment;
    "_getUint(string,uint256)": FunctionFragment;
    "_inBound((uint256,uint256))": FunctionFragment;
    "_random(uint256,uint256)": FunctionFragment;
    "_strEq(string,string)": FunctionFragment;
    "_strike(uint256,uint256)": FunctionFragment;
    "_withinDistance((uint256,uint256),(uint256,uint256),uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_coincident",
    values: [PositionStruct, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_concatenate",
    values: [BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_difference",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getAddress",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getArmyAttackFactor",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_getArmyDamagePerHit",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_getArmyDefenseFactor",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_getArmyHealth",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_getArmyLargeActionCooldown",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_getArmyMovementCooldown",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_getArmyTroopEntities",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getBool",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getComponent",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getComponentByEntity",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getComponentValue",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getDebuffedArmyDamagePerHit",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_getInfantryPercentage",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_getInt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getNeighbors",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getPlayerEntity",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "_getPosition",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getString",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_getTileAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getUint",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_inBound",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_random",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_strEq",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "_strike",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_withinDistance",
    values: [PositionStruct, PositionStruct, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "_coincident",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_concatenate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_difference",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getArmyAttackFactor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getArmyDamagePerHit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getArmyDefenseFactor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getArmyHealth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getArmyLargeActionCooldown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getArmyMovementCooldown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getArmyTroopEntities",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getBool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getComponentByEntity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getComponentValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getDebuffedArmyDamagePerHit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getInfantryPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getInt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getNeighbors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getPlayerEntity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getString", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_getTileAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_getUint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_inBound", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_random", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_strEq", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_strike", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_withinDistance",
    data: BytesLike
  ): Result;

  events: {
    "ComponentValueRemoved(string,uint256)": EventFragment;
    "ComponentValueSet(string,uint256,bytes)": EventFragment;
    "EntityRemoved(uint256)": EventFragment;
    "GamePaused()": EventFragment;
    "GameResumed()": EventFragment;
    "NewComponent(string,uint256)": EventFragment;
    "NewEntity(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ComponentValueRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ComponentValueSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EntityRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GamePaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameResumed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewComponent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewEntity"): EventFragment;
}

export type ComponentValueRemovedEvent = TypedEvent<
  [string, BigNumber],
  { _componentName: string; _entity: BigNumber }
>;

export type ComponentValueRemovedEventFilter =
  TypedEventFilter<ComponentValueRemovedEvent>;

export type ComponentValueSetEvent = TypedEvent<
  [string, BigNumber, string],
  { _componentName: string; _entity: BigNumber; _value: string }
>;

export type ComponentValueSetEventFilter =
  TypedEventFilter<ComponentValueSetEvent>;

export type EntityRemovedEvent = TypedEvent<
  [BigNumber],
  { _entity: BigNumber }
>;

export type EntityRemovedEventFilter = TypedEventFilter<EntityRemovedEvent>;

export type GamePausedEvent = TypedEvent<[], {}>;

export type GamePausedEventFilter = TypedEventFilter<GamePausedEvent>;

export type GameResumedEvent = TypedEvent<[], {}>;

export type GameResumedEventFilter = TypedEventFilter<GameResumedEvent>;

export type NewComponentEvent = TypedEvent<
  [string, BigNumber],
  { _name: string; _entity: BigNumber }
>;

export type NewComponentEventFilter = TypedEventFilter<NewComponentEvent>;

export type NewEntityEvent = TypedEvent<[BigNumber], { _entity: BigNumber }>;

export type NewEntityEventFilter = TypedEventFilter<NewEntityEvent>;

export interface Util extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UtilInterface;

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
    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _concatenate(
      _arr1: BigNumberish[],
      _arr2: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    _difference(
      set1: string,
      set2: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    _getAddress(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    _getArmyAttackFactor(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getArmyDamagePerHit(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getArmyDefenseFactor(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getArmyHealth(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getArmyLargeActionCooldown(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getArmyMovementCooldown(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getArmyTroopEntities(
      _armyEntity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    _getBool(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _getComponent(_name: string, overrides?: CallOverrides): Promise<[string]>;

    _getComponentByEntity(
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    _getComponentValue(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    _getDebuffedArmyDamagePerHit(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getInfantryPercentage(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getInt(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput[]]>;

    _getPlayerEntity(
      _player: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getPosition(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput]>;

    _getString(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    _getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput]>;

    _getUint(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<[boolean]>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _strEq(
      _s1: string,
      _s2: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _strike(
      _strikeFactor: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  _coincident(
    _p1: PositionStruct,
    _p2: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _concatenate(
    _arr1: BigNumberish[],
    _arr2: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  _difference(
    set1: string,
    set2: string,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  _getAddress(
    _componentName: string,
    _entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  _getArmyAttackFactor(
    _troopEntities: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getArmyDamagePerHit(
    _troopEntities: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getArmyDefenseFactor(
    _troopEntities: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getArmyHealth(
    _troopEntities: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getArmyLargeActionCooldown(
    _troopEntities: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getArmyMovementCooldown(
    _troopEntities: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getArmyTroopEntities(
    _armyEntity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  _getBool(
    _componentName: string,
    _entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _getComponent(_name: string, overrides?: CallOverrides): Promise<string>;

  _getComponentByEntity(
    _entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  _getComponentValue(
    _componentName: string,
    _entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  _getDebuffedArmyDamagePerHit(
    _troopEntities: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getInfantryPercentage(
    _troopEntities: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getInt(
    _componentName: string,
    _entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getNeighbors(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput[]>;

  _getPlayerEntity(
    _player: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getPosition(
    _componentName: string,
    _entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput>;

  _getString(
    _componentName: string,
    _entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  _getTileAt(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileStructOutput>;

  _getUint(
    _componentName: string,
    _entity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<boolean>;

  _random(
    _max: BigNumberish,
    _salt: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _strEq(_s1: string, _s2: string, overrides?: CallOverrides): Promise<boolean>;

  _strike(
    _strikeFactor: BigNumberish,
    _salt: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _withinDistance(
    _p1: PositionStruct,
    _p2: PositionStruct,
    _dist: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _concatenate(
      _arr1: BigNumberish[],
      _arr2: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    _difference(
      set1: string,
      set2: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    _getAddress(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    _getArmyAttackFactor(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyDamagePerHit(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyDefenseFactor(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyHealth(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyLargeActionCooldown(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyMovementCooldown(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyTroopEntities(
      _armyEntity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    _getBool(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _getComponent(_name: string, overrides?: CallOverrides): Promise<string>;

    _getComponentByEntity(
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    _getComponentValue(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    _getDebuffedArmyDamagePerHit(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getInfantryPercentage(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getInt(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput[]>;

    _getPlayerEntity(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPosition(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput>;

    _getString(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    _getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileStructOutput>;

    _getUint(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<boolean>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _strEq(
      _s1: string,
      _s2: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _strike(
      _strikeFactor: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
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

    "GamePaused()"(): GamePausedEventFilter;
    GamePaused(): GamePausedEventFilter;

    "GameResumed()"(): GameResumedEventFilter;
    GameResumed(): GameResumedEventFilter;

    "NewComponent(string,uint256)"(
      _name?: null,
      _entity?: null
    ): NewComponentEventFilter;
    NewComponent(_name?: null, _entity?: null): NewComponentEventFilter;

    "NewEntity(uint256)"(_entity?: null): NewEntityEventFilter;
    NewEntity(_entity?: null): NewEntityEventFilter;
  };

  estimateGas: {
    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _concatenate(
      _arr1: BigNumberish[],
      _arr2: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _difference(
      set1: string,
      set2: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getAddress(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyAttackFactor(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyDamagePerHit(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyDefenseFactor(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyHealth(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyLargeActionCooldown(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyMovementCooldown(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getArmyTroopEntities(
      _armyEntity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBool(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getComponent(_name: string, overrides?: CallOverrides): Promise<BigNumber>;

    _getComponentByEntity(
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getComponentValue(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getDebuffedArmyDamagePerHit(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getInfantryPercentage(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getInt(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayerEntity(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPosition(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getString(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getUint(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<BigNumber>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _strEq(
      _s1: string,
      _s2: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _strike(
      _strikeFactor: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _concatenate(
      _arr1: BigNumberish[],
      _arr2: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _difference(
      set1: string,
      set2: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getAddress(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getArmyAttackFactor(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getArmyDamagePerHit(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getArmyDefenseFactor(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getArmyHealth(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getArmyLargeActionCooldown(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getArmyMovementCooldown(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getArmyTroopEntities(
      _armyEntity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBool(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getComponent(
      _name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getComponentByEntity(
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getComponentValue(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getDebuffedArmyDamagePerHit(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getInfantryPercentage(
      _troopEntities: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getInt(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPlayerEntity(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPosition(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getString(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getUint(
      _componentName: string,
      _entity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _inBound(
      _p: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _random(
      _max: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _strEq(
      _s1: string,
      _s2: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _strike(
      _strikeFactor: BigNumberish,
      _salt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
