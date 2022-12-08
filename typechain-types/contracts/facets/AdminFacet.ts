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

export type ComponentSpecStruct = {
  name: PromiseOrValue<string>;
  valueType: PromiseOrValue<BigNumberish>;
};

export type ComponentSpecStructOutput = [string, number] & {
  name: string;
  valueType: number;
};

export interface AdminFacetInterface extends utils.Interface {
  functions: {
    "addAuthorized(address)": FunctionFragment;
    "addEntity()": FunctionFragment;
    "addGame()": FunctionFragment;
    "addGameParameter(string,uint256)": FunctionFragment;
    "addInventory(uint256,string)": FunctionFragment;
    "addResourceTemplate(string,address)": FunctionFragment;
    "addTroopTemplate(string,uint256,uint256,uint256,uint256,address)": FunctionFragment;
    "adminInitializeTile((uint256,uint256))": FunctionFragment;
    "authorizeGame(address)": FunctionFragment;
    "bulkAddGameParameters(string[],uint256[])": FunctionFragment;
    "bulkInitializeTiles((uint256,uint256)[])": FunctionFragment;
    "dripToken(address,string,uint256)": FunctionFragment;
    "giftTileAndResourceAt((uint256,uint256),uint256)": FunctionFragment;
    "onlyQuery((uint256,uint256))": FunctionFragment;
    "onlySet(uint256,uint256)": FunctionFragment;
    "reactivateNation(address)": FunctionFragment;
    "registerComponents(address,(string,uint8)[])": FunctionFragment;
    "registerTemplateShortcuts(string[],uint256[])": FunctionFragment;
    "removeEntity(uint256)": FunctionFragment;
    "setComponentValue(string,uint256,bytes)": FunctionFragment;
    "spawnResource((uint256,uint256),string)": FunctionFragment;
    "stopGame()": FunctionFragment;
    "storeEncodedColumnBatches(uint256[][])": FunctionFragment;
    "updateInventoryAmount(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addAuthorized"
      | "addEntity"
      | "addGame"
      | "addGameParameter"
      | "addInventory"
      | "addResourceTemplate"
      | "addTroopTemplate"
      | "adminInitializeTile"
      | "authorizeGame"
      | "bulkAddGameParameters"
      | "bulkInitializeTiles"
      | "dripToken"
      | "giftTileAndResourceAt"
      | "onlyQuery"
      | "onlySet"
      | "reactivateNation"
      | "registerComponents"
      | "registerTemplateShortcuts"
      | "removeEntity"
      | "setComponentValue"
      | "spawnResource"
      | "stopGame"
      | "storeEncodedColumnBatches"
      | "updateInventoryAmount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addAuthorized",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "addEntity", values?: undefined): string;
  encodeFunctionData(functionFragment: "addGame", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "addGameParameter",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "addInventory",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addResourceTemplate",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addTroopTemplate",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "adminInitializeTile",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "authorizeGame",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "bulkAddGameParameters",
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "bulkInitializeTiles",
    values: [PositionStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "dripToken",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "giftTileAndResourceAt",
    values: [PositionStruct, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "onlyQuery",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "onlySet",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "reactivateNation",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerComponents",
    values: [PromiseOrValue<string>, ComponentSpecStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "registerTemplateShortcuts",
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "removeEntity",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setComponentValue",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "spawnResource",
    values: [PositionStruct, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "stopGame", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "storeEncodedColumnBatches",
    values: [PromiseOrValue<BigNumberish>[][]]
  ): string;
  encodeFunctionData(
    functionFragment: "updateInventoryAmount",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addEntity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addGameParameter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addInventory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addResourceTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addTroopTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "adminInitializeTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authorizeGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bulkAddGameParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bulkInitializeTiles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dripToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "giftTileAndResourceAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "onlyQuery", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onlySet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "reactivateNation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerComponents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerTemplateShortcuts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeEntity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setComponentValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "spawnResource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stopGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "storeEncodedColumnBatches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateInventoryAmount",
    data: BytesLike
  ): Result;

  events: {};
}

export interface AdminFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AdminFacetInterface;

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
    addAuthorized(
      authorizedAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addEntity(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addGameParameter(
      _identifier: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addInventory(
      _keeperID: PromiseOrValue<BigNumberish>,
      _inventoryType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addResourceTemplate(
      _inventoryType: PromiseOrValue<string>,
      _tokenContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addTroopTemplate(
      _inventoryType: PromiseOrValue<string>,
      _health: PromiseOrValue<BigNumberish>,
      _attack: PromiseOrValue<BigNumberish>,
      _defense: PromiseOrValue<BigNumberish>,
      _load: PromiseOrValue<BigNumberish>,
      _tokenContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    adminInitializeTile(
      _startPosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    authorizeGame(
      _burnerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    bulkAddGameParameters(
      _identifiers: PromiseOrValue<string>[],
      _values: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    dripToken(
      _address: PromiseOrValue<string>,
      _tokenName: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    giftTileAndResourceAt(
      _startPosition: PositionStruct,
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    onlyQuery(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    onlySet(
      _entity: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    reactivateNation(
      _address: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerComponents(
      _gameAddr: PromiseOrValue<string>,
      _componentSpecs: ComponentSpecStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerTemplateShortcuts(
      _names: PromiseOrValue<string>[],
      _IDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeEntity(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setComponentValue(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    spawnResource(
      _startPosition: PositionStruct,
      _inventoryType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stopGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    storeEncodedColumnBatches(
      _colBatches: PromiseOrValue<BigNumberish>[][],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateInventoryAmount(
      _inventoryID: PromiseOrValue<BigNumberish>,
      _newAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addAuthorized(
    authorizedAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addEntity(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addGame(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addGameParameter(
    _identifier: PromiseOrValue<string>,
    _value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addInventory(
    _keeperID: PromiseOrValue<BigNumberish>,
    _inventoryType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addResourceTemplate(
    _inventoryType: PromiseOrValue<string>,
    _tokenContract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addTroopTemplate(
    _inventoryType: PromiseOrValue<string>,
    _health: PromiseOrValue<BigNumberish>,
    _attack: PromiseOrValue<BigNumberish>,
    _defense: PromiseOrValue<BigNumberish>,
    _load: PromiseOrValue<BigNumberish>,
    _tokenContract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  adminInitializeTile(
    _startPosition: PositionStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  authorizeGame(
    _burnerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  bulkAddGameParameters(
    _identifiers: PromiseOrValue<string>[],
    _values: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  bulkInitializeTiles(
    _positions: PositionStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  dripToken(
    _address: PromiseOrValue<string>,
    _tokenName: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  giftTileAndResourceAt(
    _startPosition: PositionStruct,
    _nationID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  onlyQuery(
    _startPosition: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  onlySet(
    _entity: PromiseOrValue<BigNumberish>,
    _value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  reactivateNation(
    _address: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerComponents(
    _gameAddr: PromiseOrValue<string>,
    _componentSpecs: ComponentSpecStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerTemplateShortcuts(
    _names: PromiseOrValue<string>[],
    _IDs: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeEntity(
    _entity: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setComponentValue(
    _componentName: PromiseOrValue<string>,
    _entity: PromiseOrValue<BigNumberish>,
    _value: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  spawnResource(
    _startPosition: PositionStruct,
    _inventoryType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stopGame(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  storeEncodedColumnBatches(
    _colBatches: PromiseOrValue<BigNumberish>[][],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateInventoryAmount(
    _inventoryID: PromiseOrValue<BigNumberish>,
    _newAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addAuthorized(
      authorizedAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    addEntity(overrides?: CallOverrides): Promise<BigNumber>;

    addGame(overrides?: CallOverrides): Promise<void>;

    addGameParameter(
      _identifier: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addInventory(
      _keeperID: PromiseOrValue<BigNumberish>,
      _inventoryType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addResourceTemplate(
      _inventoryType: PromiseOrValue<string>,
      _tokenContract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addTroopTemplate(
      _inventoryType: PromiseOrValue<string>,
      _health: PromiseOrValue<BigNumberish>,
      _attack: PromiseOrValue<BigNumberish>,
      _defense: PromiseOrValue<BigNumberish>,
      _load: PromiseOrValue<BigNumberish>,
      _tokenContract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    adminInitializeTile(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    authorizeGame(
      _burnerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    bulkAddGameParameters(
      _identifiers: PromiseOrValue<string>[],
      _values: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    dripToken(
      _address: PromiseOrValue<string>,
      _tokenName: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    giftTileAndResourceAt(
      _startPosition: PositionStruct,
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    onlyQuery(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    onlySet(
      _entity: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    reactivateNation(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerComponents(
      _gameAddr: PromiseOrValue<string>,
      _componentSpecs: ComponentSpecStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    registerTemplateShortcuts(
      _names: PromiseOrValue<string>[],
      _IDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    removeEntity(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setComponentValue(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    spawnResource(
      _startPosition: PositionStruct,
      _inventoryType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    stopGame(overrides?: CallOverrides): Promise<void>;

    storeEncodedColumnBatches(
      _colBatches: PromiseOrValue<BigNumberish>[][],
      overrides?: CallOverrides
    ): Promise<void>;

    updateInventoryAmount(
      _inventoryID: PromiseOrValue<BigNumberish>,
      _newAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    addAuthorized(
      authorizedAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addEntity(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addGameParameter(
      _identifier: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addInventory(
      _keeperID: PromiseOrValue<BigNumberish>,
      _inventoryType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addResourceTemplate(
      _inventoryType: PromiseOrValue<string>,
      _tokenContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addTroopTemplate(
      _inventoryType: PromiseOrValue<string>,
      _health: PromiseOrValue<BigNumberish>,
      _attack: PromiseOrValue<BigNumberish>,
      _defense: PromiseOrValue<BigNumberish>,
      _load: PromiseOrValue<BigNumberish>,
      _tokenContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    adminInitializeTile(
      _startPosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    authorizeGame(
      _burnerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    bulkAddGameParameters(
      _identifiers: PromiseOrValue<string>[],
      _values: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    dripToken(
      _address: PromiseOrValue<string>,
      _tokenName: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    giftTileAndResourceAt(
      _startPosition: PositionStruct,
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    onlyQuery(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onlySet(
      _entity: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    reactivateNation(
      _address: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerComponents(
      _gameAddr: PromiseOrValue<string>,
      _componentSpecs: ComponentSpecStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerTemplateShortcuts(
      _names: PromiseOrValue<string>[],
      _IDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeEntity(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setComponentValue(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    spawnResource(
      _startPosition: PositionStruct,
      _inventoryType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stopGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    storeEncodedColumnBatches(
      _colBatches: PromiseOrValue<BigNumberish>[][],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateInventoryAmount(
      _inventoryID: PromiseOrValue<BigNumberish>,
      _newAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addAuthorized(
      authorizedAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addEntity(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addGameParameter(
      _identifier: PromiseOrValue<string>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addInventory(
      _keeperID: PromiseOrValue<BigNumberish>,
      _inventoryType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addResourceTemplate(
      _inventoryType: PromiseOrValue<string>,
      _tokenContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addTroopTemplate(
      _inventoryType: PromiseOrValue<string>,
      _health: PromiseOrValue<BigNumberish>,
      _attack: PromiseOrValue<BigNumberish>,
      _defense: PromiseOrValue<BigNumberish>,
      _load: PromiseOrValue<BigNumberish>,
      _tokenContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    adminInitializeTile(
      _startPosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    authorizeGame(
      _burnerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    bulkAddGameParameters(
      _identifiers: PromiseOrValue<string>[],
      _values: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    bulkInitializeTiles(
      _positions: PositionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    dripToken(
      _address: PromiseOrValue<string>,
      _tokenName: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    giftTileAndResourceAt(
      _startPosition: PositionStruct,
      _nationID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    onlyQuery(
      _startPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onlySet(
      _entity: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    reactivateNation(
      _address: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerComponents(
      _gameAddr: PromiseOrValue<string>,
      _componentSpecs: ComponentSpecStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerTemplateShortcuts(
      _names: PromiseOrValue<string>[],
      _IDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeEntity(
      _entity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setComponentValue(
      _componentName: PromiseOrValue<string>,
      _entity: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    spawnResource(
      _startPosition: PositionStruct,
      _inventoryType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stopGame(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    storeEncodedColumnBatches(
      _colBatches: PromiseOrValue<BigNumberish>[][],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateInventoryAmount(
      _inventoryID: PromiseOrValue<BigNumberish>,
      _newAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
