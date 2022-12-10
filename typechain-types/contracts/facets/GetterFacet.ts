/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
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
import type { FunctionFragment, Result } from "@ethersproject/abi";
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

export type WorldConstantsStruct = {
  admin: PromiseOrValue<string>;
  capitalLevelToEntityLevelRatio: PromiseOrValue<BigNumberish>;
  gameLengthInSeconds: PromiseOrValue<BigNumberish>;
  gameMode: PromiseOrValue<BigNumberish>;
  maxArmyCountPerNation: PromiseOrValue<BigNumberish>;
  maxCapitalLevel: PromiseOrValue<BigNumberish>;
  maxCapitalCountPerNation: PromiseOrValue<BigNumberish>;
  maxNationCount: PromiseOrValue<BigNumberish>;
  numInitTerrainTypes: PromiseOrValue<BigNumberish>;
  secondsToTrainAThousandTroops: PromiseOrValue<BigNumberish>;
  tileWidth: PromiseOrValue<BigNumberish>;
  worldHeight: PromiseOrValue<BigNumberish>;
  worldWidth: PromiseOrValue<BigNumberish>;
};

export type WorldConstantsStructOutput = [
  string,
  BigNumber,
  BigNumber,
  number,
  BigNumber,
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
  capitalLevelToEntityLevelRatio: BigNumber;
  gameLengthInSeconds: BigNumber;
  gameMode: number;
  maxArmyCountPerNation: BigNumber;
  maxCapitalLevel: BigNumber;
  maxCapitalCountPerNation: BigNumber;
  maxNationCount: BigNumber;
  numInitTerrainTypes: BigNumber;
  secondsToTrainAThousandTroops: BigNumber;
  tileWidth: BigNumber;
  worldHeight: BigNumber;
  worldWidth: BigNumber;
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

export interface GetterFacetInterface extends utils.Interface {
  functions: {
    "getABIHash(uint256)": FunctionFragment;
    "getAddress(uint256)": FunctionFragment;
    "getArmyAt((uint256,uint256))": FunctionFragment;
    "getArmyAtTile((uint256,uint256))": FunctionFragment;
    "getCapital(uint256)": FunctionFragment;
    "getComponent(string)": FunctionFragment;
    "getComponentById(uint256)": FunctionFragment;
    "getConstant(string,string,string,string,uint256)": FunctionFragment;
    "getDistanceByAddresses(address,address)": FunctionFragment;
    "getEntities()": FunctionFragment;
    "getEntitiesAddr()": FunctionFragment;
    "getEntity()": FunctionFragment;
    "getEntityByAddress(address)": FunctionFragment;
    "getEntityLevel(uint256)": FunctionFragment;
    "getInventory(address,string)": FunctionFragment;
    "getInventoryBalance(address,string)": FunctionFragment;
    "getInventoryIDLoadAndBalance(address,string)": FunctionFragment;
    "getMainBurnerAccount(address)": FunctionFragment;
    "getNation(uint256)": FunctionFragment;
    "getNationArmies(uint256)": FunctionFragment;
    "getPlayerCount()": FunctionFragment;
    "getPositionExternal(string,uint256)": FunctionFragment;
    "getResourceAtTile((uint256,uint256))": FunctionFragment;
    "getSignedTreaties(uint256)": FunctionFragment;
    "getTileAt((uint256,uint256))": FunctionFragment;
    "getTokenContract(string)": FunctionFragment;
    "getTreatyByName(string)": FunctionFragment;
    "getWorldConstants()": FunctionFragment;
    "query((uint8,address,bytes)[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getABIHash"
      | "getAddress"
      | "getArmyAt"
      | "getArmyAtTile"
      | "getCapital"
      | "getComponent"
      | "getComponentById"
      | "getConstant"
      | "getDistanceByAddresses"
      | "getEntities"
      | "getEntitiesAddr"
      | "getEntity"
      | "getEntityByAddress"
      | "getEntityLevel"
      | "getInventory"
      | "getInventoryBalance"
      | "getInventoryIDLoadAndBalance"
      | "getMainBurnerAccount"
      | "getNation"
      | "getNationArmies"
      | "getPlayerCount"
      | "getPositionExternal"
      | "getResourceAtTile"
      | "getSignedTreaties"
      | "getTileAt"
      | "getTokenContract"
      | "getTreatyByName"
      | "getWorldConstants"
      | "query"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getABIHash",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddress",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getArmyAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getArmyAtTile",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getCapital",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getComponent",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getComponentById",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getConstant",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getDistanceByAddresses",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEntities",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEntitiesAddr",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getEntity", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getEntityByAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEntityLevel",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getInventory",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getInventoryBalance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getInventoryIDLoadAndBalance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMainBurnerAccount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNation",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNationArmies",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPlayerCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPositionExternal",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getResourceAtTile",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getSignedTreaties",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTileAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenContract",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTreatyByName",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getWorldConstants",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "query",
    values: [QueryConditionStruct[]]
  ): string;

  decodeFunctionResult(functionFragment: "getABIHash", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getArmyAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getArmyAtTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getCapital", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getComponentById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getConstant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDistanceByAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEntities",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEntitiesAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getEntity", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getEntityByAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEntityLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInventory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInventoryBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInventoryIDLoadAndBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMainBurnerAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getNation", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getNationArmies",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPlayerCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPositionExternal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getResourceAtTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSignedTreaties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTileAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTokenContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTreatyByName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWorldConstants",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "query", data: BytesLike): Result;

  events: {};
}

export interface GetterFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GetterFacetInterface;

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
    getABIHash(
      _treatyID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getAddress(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getArmyAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getArmyAtTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getComponentById(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getConstant(
      _subject: PromiseOrValue<string>,
      _object: PromiseOrValue<string>,
      _componentName: PromiseOrValue<string>,
      _functionName: PromiseOrValue<string>,
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getDistanceByAddresses(
      _addr1: PromiseOrValue<string>,
      _addr2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getEntities(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getEntitiesAddr(overrides?: CallOverrides): Promise<[string]>;

    getEntity(overrides?: CallOverrides): Promise<[BigNumber]>;

    getEntityByAddress(
      _entityAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getEntityLevel(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getInventory(
      _inventoryAddress: PromiseOrValue<string>,
      _inventoryType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getInventoryBalance(
      _keeperAddress: PromiseOrValue<string>,
      _resourceType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getInventoryIDLoadAndBalance(
      _entityAddress: PromiseOrValue<string>,
      _resourceType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMainBurnerAccount(
      _primaryAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getNation(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getNationArmies(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getPlayerCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPositionExternal(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput]>;

    getResourceAtTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSignedTreaties(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTokenContract(
      _tokenName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getTreatyByName(
      _treatyName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getWorldConstants(
      overrides?: CallOverrides
    ): Promise<[WorldConstantsStructOutput]>;

    query(
      _queryConditions: QueryConditionStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;
  };

  getABIHash(
    _treatyID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getAddress(
    _entityID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getArmyAt(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getArmyAtTile(
    _startPosition: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getCapital(
    _nationID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getComponent(
    _name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getComponentById(
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getConstant(
    _subject: PromiseOrValue<string>,
    _object: PromiseOrValue<string>,
    _componentName: PromiseOrValue<string>,
    _functionName: PromiseOrValue<string>,
    _level: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDistanceByAddresses(
    _addr1: PromiseOrValue<string>,
    _addr2: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getEntities(overrides?: CallOverrides): Promise<BigNumber[]>;

  getEntitiesAddr(overrides?: CallOverrides): Promise<string>;

  getEntity(overrides?: CallOverrides): Promise<BigNumber>;

  getEntityByAddress(
    _entityAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getEntityLevel(
    _entityID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getInventory(
    _inventoryAddress: PromiseOrValue<string>,
    _inventoryType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getInventoryBalance(
    _keeperAddress: PromiseOrValue<string>,
    _resourceType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getInventoryIDLoadAndBalance(
    _entityAddress: PromiseOrValue<string>,
    _resourceType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMainBurnerAccount(
    _primaryAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getNation(
    _entityID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getNationArmies(
    _nationID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

  getPositionExternal(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput>;

  getResourceAtTile(
    _startPosition: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSignedTreaties(
    _nationID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getTileAt(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTokenContract(
    _tokenName: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getTreatyByName(
    _treatyName: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getWorldConstants(
    overrides?: CallOverrides
  ): Promise<WorldConstantsStructOutput>;

  query(
    _queryConditions: QueryConditionStruct[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  callStatic: {
    getABIHash(
      _treatyID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAddress(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getArmyAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getArmyAtTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getComponentById(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getConstant(
      _subject: PromiseOrValue<string>,
      _object: PromiseOrValue<string>,
      _componentName: PromiseOrValue<string>,
      _functionName: PromiseOrValue<string>,
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDistanceByAddresses(
      _addr1: PromiseOrValue<string>,
      _addr2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEntities(overrides?: CallOverrides): Promise<BigNumber[]>;

    getEntitiesAddr(overrides?: CallOverrides): Promise<string>;

    getEntity(overrides?: CallOverrides): Promise<BigNumber>;

    getEntityByAddress(
      _entityAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEntityLevel(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInventory(
      _inventoryAddress: PromiseOrValue<string>,
      _inventoryType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInventoryBalance(
      _keeperAddress: PromiseOrValue<string>,
      _resourceType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInventoryIDLoadAndBalance(
      _entityAddress: PromiseOrValue<string>,
      _resourceType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber]>;

    getMainBurnerAccount(
      _primaryAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getNation(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNationArmies(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

    getPositionExternal(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput>;

    getResourceAtTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSignedTreaties(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenContract(
      _tokenName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getTreatyByName(
      _treatyName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWorldConstants(
      overrides?: CallOverrides
    ): Promise<WorldConstantsStructOutput>;

    query(
      _queryConditions: QueryConditionStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;
  };

  filters: {};

  estimateGas: {
    getABIHash(
      _treatyID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAddress(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getArmyAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getArmyAtTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getComponentById(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getConstant(
      _subject: PromiseOrValue<string>,
      _object: PromiseOrValue<string>,
      _componentName: PromiseOrValue<string>,
      _functionName: PromiseOrValue<string>,
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDistanceByAddresses(
      _addr1: PromiseOrValue<string>,
      _addr2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEntities(overrides?: CallOverrides): Promise<BigNumber>;

    getEntitiesAddr(overrides?: CallOverrides): Promise<BigNumber>;

    getEntity(overrides?: CallOverrides): Promise<BigNumber>;

    getEntityByAddress(
      _entityAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEntityLevel(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInventory(
      _inventoryAddress: PromiseOrValue<string>,
      _inventoryType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInventoryBalance(
      _keeperAddress: PromiseOrValue<string>,
      _resourceType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInventoryIDLoadAndBalance(
      _entityAddress: PromiseOrValue<string>,
      _resourceType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMainBurnerAccount(
      _primaryAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNation(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNationArmies(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPlayerCount(overrides?: CallOverrides): Promise<BigNumber>;

    getPositionExternal(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getResourceAtTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSignedTreaties(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenContract(
      _tokenName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTreatyByName(
      _treatyName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWorldConstants(overrides?: CallOverrides): Promise<BigNumber>;

    query(
      _queryConditions: QueryConditionStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getABIHash(
      _treatyID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAddress(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getArmyAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getArmyAtTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getComponent(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getComponentById(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getConstant(
      _subject: PromiseOrValue<string>,
      _object: PromiseOrValue<string>,
      _componentName: PromiseOrValue<string>,
      _functionName: PromiseOrValue<string>,
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDistanceByAddresses(
      _addr1: PromiseOrValue<string>,
      _addr2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEntities(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEntitiesAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEntity(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEntityByAddress(
      _entityAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEntityLevel(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInventory(
      _inventoryAddress: PromiseOrValue<string>,
      _inventoryType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInventoryBalance(
      _keeperAddress: PromiseOrValue<string>,
      _resourceType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInventoryIDLoadAndBalance(
      _entityAddress: PromiseOrValue<string>,
      _resourceType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMainBurnerAccount(
      _primaryAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNation(
      _entityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNationArmies(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPlayerCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPositionExternal(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getResourceAtTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSignedTreaties(
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenContract(
      _tokenName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTreatyByName(
      _treatyName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWorldConstants(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    query(
      _queryConditions: QueryConditionStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
