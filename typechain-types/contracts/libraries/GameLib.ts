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

export type TileStruct = {
  isInitialized: PromiseOrValue<boolean>;
  terrain: PromiseOrValue<BigNumberish>;
};

export type TileStructOutput = [boolean, number] & {
  isInitialized: boolean;
  terrain: number;
};

export interface GameLibInterface extends utils.Interface {
  functions: {
    "_adjacent((uint256,uint256),(uint256,uint256))": FunctionFragment;
    "_adjacentToCity((uint256,uint256),uint256)": FunctionFragment;
    "_barbarianInfantrySelector(uint256)": FunctionFragment;
    "_coincident((uint256,uint256),(uint256,uint256))": FunctionFragment;
    "_connected((uint256,uint256)[])": FunctionFragment;
    "_euclidean((uint256,uint256),(uint256,uint256))": FunctionFragment;
    "_getBattleDamages(uint256,uint256,uint256)": FunctionFragment;
    "_getCityTileCountByLevel(uint256)": FunctionFragment;
    "_getMapTileAt((uint256,uint256))": FunctionFragment;
    "_getNeighbors((uint256,uint256))": FunctionFragment;
    "_getPlayer(address)": FunctionFragment;
    "_getSettlerHealthAndSpeedByLevel(uint256)": FunctionFragment;
    "_goldLevelSelector(uint256)": FunctionFragment;
    "_inBound((uint256,uint256))": FunctionFragment;
    "_random(uint256,uint256)": FunctionFragment;
    "_strEq(string,string)": FunctionFragment;
    "_sum(uint256[])": FunctionFragment;
    "_withinDistance((uint256,uint256),(uint256,uint256),uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_adjacent"
      | "_adjacentToCity"
      | "_barbarianInfantrySelector"
      | "_coincident"
      | "_connected"
      | "_euclidean"
      | "_getBattleDamages"
      | "_getCityTileCountByLevel"
      | "_getMapTileAt"
      | "_getNeighbors"
      | "_getPlayer"
      | "_getSettlerHealthAndSpeedByLevel"
      | "_goldLevelSelector"
      | "_inBound"
      | "_random"
      | "_strEq"
      | "_sum"
      | "_withinDistance"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_adjacent",
    values: [PositionStruct, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_adjacentToCity",
    values: [PositionStruct, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "_barbarianInfantrySelector",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "_coincident",
    values: [PositionStruct, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_connected",
    values: [PositionStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_euclidean",
    values: [PositionStruct, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getBattleDamages",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_getCityTileCountByLevel",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "_getMapTileAt",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getNeighbors",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_getPlayer",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "_getSettlerHealthAndSpeedByLevel",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "_goldLevelSelector",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "_inBound",
    values: [PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "_random",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "_strEq",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "_sum",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "_withinDistance",
    values: [PositionStruct, PositionStruct, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "_adjacent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_adjacentToCity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_barbarianInfantrySelector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_coincident",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_connected", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_euclidean", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getBattleDamages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getCityTileCountByLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getMapTileAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_getNeighbors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_getPlayer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_getSettlerHealthAndSpeedByLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_goldLevelSelector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_inBound", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_random", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_strEq", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_sum", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_withinDistance",
    data: BytesLike
  ): Result;

  events: {
    "GamePaused()": EventFragment;
    "GameResumed()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GamePaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameResumed"): EventFragment;
}

export interface GamePausedEventObject {}
export type GamePausedEvent = TypedEvent<[], GamePausedEventObject>;

export type GamePausedEventFilter = TypedEventFilter<GamePausedEvent>;

export interface GameResumedEventObject {}
export type GameResumedEvent = TypedEvent<[], GameResumedEventObject>;

export type GameResumedEventFilter = TypedEventFilter<GameResumedEvent>;

export interface GameLib extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GameLibInterface;

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
    _adjacent(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _adjacentToCity(
      _position: PositionStruct,
      _cityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _barbarianInfantrySelector(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _connected(
      _positions: PositionStruct[],
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _euclidean(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getBattleDamages(
      _army1: PromiseOrValue<BigNumberish>,
      _army2: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { _damageOn1: BigNumber; _damageOn2: BigNumber }
    >;

    _getCityTileCountByLevel(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getMapTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[TileStructOutput]>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<[PositionStructOutput[]]>;

    _getPlayer(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _getSettlerHealthAndSpeedByLevel(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    _goldLevelSelector(
      _goldLevel: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<[boolean]>;

    _random(
      _max: PromiseOrValue<BigNumberish>,
      _salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _strEq(
      _s1: PromiseOrValue<string>,
      _s2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    _sum(
      _arr: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  _adjacent(
    _p1: PositionStruct,
    _p2: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _adjacentToCity(
    _position: PositionStruct,
    _cityID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _barbarianInfantrySelector(
    _level: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _coincident(
    _p1: PositionStruct,
    _p2: PositionStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _connected(
    _positions: PositionStruct[],
    overrides?: CallOverrides
  ): Promise<boolean>;

  _euclidean(
    _p1: PositionStruct,
    _p2: PositionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getBattleDamages(
    _army1: PromiseOrValue<BigNumberish>,
    _army2: PromiseOrValue<BigNumberish>,
    _duration: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { _damageOn1: BigNumber; _damageOn2: BigNumber }
  >;

  _getCityTileCountByLevel(
    _level: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getMapTileAt(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<TileStructOutput>;

  _getNeighbors(
    _position: PositionStruct,
    overrides?: CallOverrides
  ): Promise<PositionStructOutput[]>;

  _getPlayer(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _getSettlerHealthAndSpeedByLevel(
    _level: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  _goldLevelSelector(
    _goldLevel: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<boolean>;

  _random(
    _max: PromiseOrValue<BigNumberish>,
    _salt: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _strEq(
    _s1: PromiseOrValue<string>,
    _s2: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  _sum(
    _arr: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _withinDistance(
    _p1: PositionStruct,
    _p2: PositionStruct,
    _dist: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    _adjacent(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _adjacentToCity(
      _position: PositionStruct,
      _cityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _barbarianInfantrySelector(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _connected(
      _positions: PositionStruct[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    _euclidean(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBattleDamages(
      _army1: PromiseOrValue<BigNumberish>,
      _army2: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { _damageOn1: BigNumber; _damageOn2: BigNumber }
    >;

    _getCityTileCountByLevel(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMapTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<TileStructOutput>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PositionStructOutput[]>;

    _getPlayer(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getSettlerHealthAndSpeedByLevel(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    _goldLevelSelector(
      _goldLevel: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<boolean>;

    _random(
      _max: PromiseOrValue<BigNumberish>,
      _salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _strEq(
      _s1: PromiseOrValue<string>,
      _s2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    _sum(
      _arr: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "GamePaused()"(): GamePausedEventFilter;
    GamePaused(): GamePausedEventFilter;

    "GameResumed()"(): GameResumedEventFilter;
    GameResumed(): GameResumedEventFilter;
  };

  estimateGas: {
    _adjacent(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _adjacentToCity(
      _position: PositionStruct,
      _cityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _barbarianInfantrySelector(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _connected(
      _positions: PositionStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _euclidean(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getBattleDamages(
      _army1: PromiseOrValue<BigNumberish>,
      _army2: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getCityTileCountByLevel(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getMapTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getPlayer(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _getSettlerHealthAndSpeedByLevel(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _goldLevelSelector(
      _goldLevel: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _inBound(_p: PositionStruct, overrides?: CallOverrides): Promise<BigNumber>;

    _random(
      _max: PromiseOrValue<BigNumberish>,
      _salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _strEq(
      _s1: PromiseOrValue<string>,
      _s2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _sum(
      _arr: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _adjacent(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _adjacentToCity(
      _position: PositionStruct,
      _cityID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _barbarianInfantrySelector(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _coincident(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _connected(
      _positions: PositionStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _euclidean(
      _p1: PositionStruct,
      _p2: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getBattleDamages(
      _army1: PromiseOrValue<BigNumberish>,
      _army2: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getCityTileCountByLevel(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getMapTileAt(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getNeighbors(
      _position: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getPlayer(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _getSettlerHealthAndSpeedByLevel(
      _level: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _goldLevelSelector(
      _goldLevel: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _inBound(
      _p: PositionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _random(
      _max: PromiseOrValue<BigNumberish>,
      _salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _strEq(
      _s1: PromiseOrValue<string>,
      _s2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _sum(
      _arr: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _withinDistance(
      _p1: PositionStruct,
      _p2: PositionStruct,
      _dist: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
