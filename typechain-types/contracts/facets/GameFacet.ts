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

export interface GameFacetInterface extends utils.Interface {
  functions: {
    "authorizeGame(address)": FunctionFragment;
    "battle(uint256,uint256)": FunctionFragment;
    "claimTile(uint256,uint256)": FunctionFragment;
    "delegateAllGameFunctions(uint256,uint256,bool)": FunctionFragment;
    "delegateGameFunction(uint256,string,uint256,uint256,bool)": FunctionFragment;
    "deployTreaty(uint256,string,bytes)": FunctionFragment;
    "disbandArmy(uint256)": FunctionFragment;
    "disownTile(uint256)": FunctionFragment;
    "endGather(uint256)": FunctionFragment;
    "endTroopProduction(uint256)": FunctionFragment;
    "harvestAllResources(uint256[])": FunctionFragment;
    "harvestResource(uint256)": FunctionFragment;
    "harvestResourcesFromCapital(uint256)": FunctionFragment;
    "joinGame((uint256,uint256),string)": FunctionFragment;
    "move(uint256,(uint256,uint256))": FunctionFragment;
    "moveCapital(uint256,(uint256,uint256))": FunctionFragment;
    "organizeArmy(uint256,uint256[],uint256[])": FunctionFragment;
    "recoverTile(uint256)": FunctionFragment;
    "startGather(uint256,uint256)": FunctionFragment;
    "startTroopProduction(uint256,uint256,uint256)": FunctionFragment;
    "unloadResources(uint256)": FunctionFragment;
    "upgradeCapital(uint256)": FunctionFragment;
    "upgradeResource(uint256)": FunctionFragment;
    "upgradeTile(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "authorizeGame"
      | "battle"
      | "claimTile"
      | "delegateAllGameFunctions"
      | "delegateGameFunction"
      | "deployTreaty"
      | "disbandArmy"
      | "disownTile"
      | "endGather"
      | "endTroopProduction"
      | "harvestAllResources"
      | "harvestResource"
      | "harvestResourcesFromCapital"
      | "joinGame"
      | "move"
      | "moveCapital"
      | "organizeArmy"
      | "recoverTile"
      | "startGather"
      | "startTroopProduction"
      | "unloadResources"
      | "upgradeCapital"
      | "upgradeResource"
      | "upgradeTile"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "authorizeGame",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "battle",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimTile",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "delegateAllGameFunctions",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "delegateGameFunction",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deployTreaty",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "disbandArmy",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "disownTile",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "endGather",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "endTroopProduction",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "harvestAllResources",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "harvestResource",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "harvestResourcesFromCapital",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "joinGame",
    values: [PositionStruct, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "move",
    values: [PromiseOrValue<BigNumberish>, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "moveCapital",
    values: [PromiseOrValue<BigNumberish>, PositionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "organizeArmy",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverTile",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "startGather",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "startTroopProduction",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "unloadResources",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeCapital",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeResource",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTile",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "authorizeGame",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "battle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimTile", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "delegateAllGameFunctions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegateGameFunction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployTreaty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disbandArmy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "disownTile", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "endGather", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "endTroopProduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "harvestAllResources",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "harvestResource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "harvestResourcesFromCapital",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "joinGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "move", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "moveCapital",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "organizeArmy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startGather",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startTroopProduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unloadResources",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeCapital",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeResource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeTile",
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
    authorizeGame(
      _burnerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    battle(
      _armyID: PromiseOrValue<BigNumberish>,
      _targetID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimTile(
      _armyID: PromiseOrValue<BigNumberish>,
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    delegateAllGameFunctions(
      _nationID: PromiseOrValue<BigNumberish>,
      _delegateID: PromiseOrValue<BigNumberish>,
      _canCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    delegateGameFunction(
      _nationID: PromiseOrValue<BigNumberish>,
      _functionName: PromiseOrValue<string>,
      _delegateID: PromiseOrValue<BigNumberish>,
      _subjectID: PromiseOrValue<BigNumberish>,
      _canCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deployTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _treatyName: PromiseOrValue<string>,
      _treatyParams: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    disbandArmy(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    disownTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    endGather(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    endTroopProduction(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    harvestAllResources(
      resourceIDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    harvestResource(
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    harvestResourcesFromCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    joinGame(
      _position: PositionStruct,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    move(
      _armyID: PromiseOrValue<BigNumberish>,
      _targetPosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    moveCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      _newTilePosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    organizeArmy(
      _capitalID: PromiseOrValue<BigNumberish>,
      _templateIDs: PromiseOrValue<BigNumberish>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    recoverTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    startGather(
      _armyID: PromiseOrValue<BigNumberish>,
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    startTroopProduction(
      _capitalID: PromiseOrValue<BigNumberish>,
      _templateID: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unloadResources(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeResource(
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  authorizeGame(
    _burnerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  battle(
    _armyID: PromiseOrValue<BigNumberish>,
    _targetID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimTile(
    _armyID: PromiseOrValue<BigNumberish>,
    _tileID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  delegateAllGameFunctions(
    _nationID: PromiseOrValue<BigNumberish>,
    _delegateID: PromiseOrValue<BigNumberish>,
    _canCall: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  delegateGameFunction(
    _nationID: PromiseOrValue<BigNumberish>,
    _functionName: PromiseOrValue<string>,
    _delegateID: PromiseOrValue<BigNumberish>,
    _subjectID: PromiseOrValue<BigNumberish>,
    _canCall: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deployTreaty(
    _nationID: PromiseOrValue<BigNumberish>,
    _treatyName: PromiseOrValue<string>,
    _treatyParams: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  disbandArmy(
    _armyID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  disownTile(
    _tileID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  endGather(
    _armyID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  endTroopProduction(
    _capitalID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  harvestAllResources(
    resourceIDs: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  harvestResource(
    _resourceID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  harvestResourcesFromCapital(
    _capitalID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  joinGame(
    _position: PositionStruct,
    _name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  move(
    _armyID: PromiseOrValue<BigNumberish>,
    _targetPosition: PositionStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  moveCapital(
    _capitalID: PromiseOrValue<BigNumberish>,
    _newTilePosition: PositionStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  organizeArmy(
    _capitalID: PromiseOrValue<BigNumberish>,
    _templateIDs: PromiseOrValue<BigNumberish>[],
    _amounts: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  recoverTile(
    _tileID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  startGather(
    _armyID: PromiseOrValue<BigNumberish>,
    _resourceID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  startTroopProduction(
    _capitalID: PromiseOrValue<BigNumberish>,
    _templateID: PromiseOrValue<BigNumberish>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unloadResources(
    _armyID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeCapital(
    _capitalID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeResource(
    _resourceID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeTile(
    _tileID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    authorizeGame(
      _burnerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    battle(
      _armyID: PromiseOrValue<BigNumberish>,
      _targetID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimTile(
      _armyID: PromiseOrValue<BigNumberish>,
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    delegateAllGameFunctions(
      _nationID: PromiseOrValue<BigNumberish>,
      _delegateID: PromiseOrValue<BigNumberish>,
      _canCall: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    delegateGameFunction(
      _nationID: PromiseOrValue<BigNumberish>,
      _functionName: PromiseOrValue<string>,
      _delegateID: PromiseOrValue<BigNumberish>,
      _subjectID: PromiseOrValue<BigNumberish>,
      _canCall: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    deployTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _treatyName: PromiseOrValue<string>,
      _treatyParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    disbandArmy(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    disownTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    endGather(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    endTroopProduction(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    harvestAllResources(
      resourceIDs: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    harvestResource(
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    harvestResourcesFromCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    joinGame(
      _position: PositionStruct,
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    move(
      _armyID: PromiseOrValue<BigNumberish>,
      _targetPosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    moveCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      _newTilePosition: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    organizeArmy(
      _capitalID: PromiseOrValue<BigNumberish>,
      _templateIDs: PromiseOrValue<BigNumberish>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    recoverTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    startGather(
      _armyID: PromiseOrValue<BigNumberish>,
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    startTroopProduction(
      _capitalID: PromiseOrValue<BigNumberish>,
      _templateID: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unloadResources(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeResource(
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    authorizeGame(
      _burnerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    battle(
      _armyID: PromiseOrValue<BigNumberish>,
      _targetID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimTile(
      _armyID: PromiseOrValue<BigNumberish>,
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    delegateAllGameFunctions(
      _nationID: PromiseOrValue<BigNumberish>,
      _delegateID: PromiseOrValue<BigNumberish>,
      _canCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    delegateGameFunction(
      _nationID: PromiseOrValue<BigNumberish>,
      _functionName: PromiseOrValue<string>,
      _delegateID: PromiseOrValue<BigNumberish>,
      _subjectID: PromiseOrValue<BigNumberish>,
      _canCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deployTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _treatyName: PromiseOrValue<string>,
      _treatyParams: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    disbandArmy(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    disownTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    endGather(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    endTroopProduction(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    harvestAllResources(
      resourceIDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    harvestResource(
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    harvestResourcesFromCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    joinGame(
      _position: PositionStruct,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    move(
      _armyID: PromiseOrValue<BigNumberish>,
      _targetPosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    moveCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      _newTilePosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    organizeArmy(
      _capitalID: PromiseOrValue<BigNumberish>,
      _templateIDs: PromiseOrValue<BigNumberish>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    recoverTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    startGather(
      _armyID: PromiseOrValue<BigNumberish>,
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    startTroopProduction(
      _capitalID: PromiseOrValue<BigNumberish>,
      _templateID: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unloadResources(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeResource(
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    authorizeGame(
      _burnerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    battle(
      _armyID: PromiseOrValue<BigNumberish>,
      _targetID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimTile(
      _armyID: PromiseOrValue<BigNumberish>,
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    delegateAllGameFunctions(
      _nationID: PromiseOrValue<BigNumberish>,
      _delegateID: PromiseOrValue<BigNumberish>,
      _canCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    delegateGameFunction(
      _nationID: PromiseOrValue<BigNumberish>,
      _functionName: PromiseOrValue<string>,
      _delegateID: PromiseOrValue<BigNumberish>,
      _subjectID: PromiseOrValue<BigNumberish>,
      _canCall: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deployTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _treatyName: PromiseOrValue<string>,
      _treatyParams: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    disbandArmy(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    disownTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    endGather(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    endTroopProduction(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    harvestAllResources(
      resourceIDs: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    harvestResource(
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    harvestResourcesFromCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    joinGame(
      _position: PositionStruct,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    move(
      _armyID: PromiseOrValue<BigNumberish>,
      _targetPosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    moveCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      _newTilePosition: PositionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    organizeArmy(
      _capitalID: PromiseOrValue<BigNumberish>,
      _templateIDs: PromiseOrValue<BigNumberish>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    recoverTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    startGather(
      _armyID: PromiseOrValue<BigNumberish>,
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    startTroopProduction(
      _capitalID: PromiseOrValue<BigNumberish>,
      _templateID: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unloadResources(
      _armyID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeCapital(
      _capitalID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeResource(
      _resourceID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTile(
      _tileID: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
