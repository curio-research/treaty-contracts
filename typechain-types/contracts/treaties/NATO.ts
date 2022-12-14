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

export interface NATOInterface extends utils.Interface {
  functions: {
    "admin()": FunctionFragment;
    "approveBattle(uint256,bytes)": FunctionFragment;
    "approveClaimTile(uint256,bytes)": FunctionFragment;
    "approveDelegatePermission(uint256,bytes)": FunctionFragment;
    "approveDisbandArmy(uint256,bytes)": FunctionFragment;
    "approveDisownTile(uint256,bytes)": FunctionFragment;
    "approveEndGather(uint256,bytes)": FunctionFragment;
    "approveEndTroopProduction(uint256,bytes)": FunctionFragment;
    "approveHarvestResource(uint256,bytes)": FunctionFragment;
    "approveHarvestResourcesFromCapital(uint256,bytes)": FunctionFragment;
    "approveJoinTreaty(uint256,bytes)": FunctionFragment;
    "approveLeaveTreaty(uint256,bytes)": FunctionFragment;
    "approveMove(uint256,bytes)": FunctionFragment;
    "approveMoveArmy()": FunctionFragment;
    "approveMoveCapital(uint256,bytes)": FunctionFragment;
    "approveOrganizeArmy(uint256,bytes)": FunctionFragment;
    "approveRecoverTile(uint256,bytes)": FunctionFragment;
    "approveStartGather(uint256,bytes)": FunctionFragment;
    "approveStartTroopProduction(uint256,bytes)": FunctionFragment;
    "approveUnloadResources(uint256,bytes)": FunctionFragment;
    "approveUpgradeCapital(uint256,bytes)": FunctionFragment;
    "approveUpgradeResource(uint256,bytes)": FunctionFragment;
    "approveUpgradeTile(uint256,bytes)": FunctionFragment;
    "delegatedGameFunctionNames(uint256)": FunctionFragment;
    "denounceTreaty()": FunctionFragment;
    "description()": FunctionFragment;
    "diamond()": FunctionFragment;
    "getter()": FunctionFragment;
    "isMemberStates(address)": FunctionFragment;
    "join()": FunctionFragment;
    "joinTreaty()": FunctionFragment;
    "leave()": FunctionFragment;
    "memberStates(uint256)": FunctionFragment;
    "name()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "admin"
      | "approveBattle"
      | "approveClaimTile"
      | "approveDelegatePermission"
      | "approveDisbandArmy"
      | "approveDisownTile"
      | "approveEndGather"
      | "approveEndTroopProduction"
      | "approveHarvestResource"
      | "approveHarvestResourcesFromCapital"
      | "approveJoinTreaty"
      | "approveLeaveTreaty"
      | "approveMove"
      | "approveMoveArmy"
      | "approveMoveCapital"
      | "approveOrganizeArmy"
      | "approveRecoverTile"
      | "approveStartGather"
      | "approveStartTroopProduction"
      | "approveUnloadResources"
      | "approveUpgradeCapital"
      | "approveUpgradeResource"
      | "approveUpgradeTile"
      | "delegatedGameFunctionNames"
      | "denounceTreaty"
      | "description"
      | "diamond"
      | "getter"
      | "isMemberStates"
      | "join"
      | "joinTreaty"
      | "leave"
      | "memberStates"
      | "name"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "approveBattle",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveClaimTile",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveDelegatePermission",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveDisbandArmy",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveDisownTile",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveEndGather",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveEndTroopProduction",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveHarvestResource",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveHarvestResourcesFromCapital",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveJoinTreaty",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveLeaveTreaty",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveMove",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveMoveArmy",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "approveMoveCapital",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveOrganizeArmy",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveRecoverTile",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveStartGather",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveStartTroopProduction",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveUnloadResources",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveUpgradeCapital",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveUpgradeResource",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveUpgradeTile",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "delegatedGameFunctionNames",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "denounceTreaty",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "description",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "diamond", values?: undefined): string;
  encodeFunctionData(functionFragment: "getter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isMemberStates",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "join", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "joinTreaty",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "leave", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "memberStates",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "approveBattle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveClaimTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveDelegatePermission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveDisbandArmy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveDisownTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveEndGather",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveEndTroopProduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveHarvestResource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveHarvestResourcesFromCapital",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveJoinTreaty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveLeaveTreaty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveMove",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveMoveArmy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveMoveCapital",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveOrganizeArmy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveRecoverTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveStartGather",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveStartTroopProduction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveUnloadResources",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveUpgradeCapital",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveUpgradeResource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveUpgradeTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "delegatedGameFunctionNames",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "denounceTreaty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "description",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "diamond", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isMemberStates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "join", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "joinTreaty", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "leave", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "memberStates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;

  events: {};
}

export interface NATO extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NATOInterface;

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
    admin(overrides?: CallOverrides): Promise<[string]>;

    approveBattle(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveClaimTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveDelegatePermission(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveDisbandArmy(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveDisownTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveEndGather(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveEndTroopProduction(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveHarvestResource(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveHarvestResourcesFromCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveJoinTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveLeaveTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveMove(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveMoveArmy(overrides?: CallOverrides): Promise<[boolean]>;

    approveMoveCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveOrganizeArmy(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveRecoverTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveStartGather(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveStartTroopProduction(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveUnloadResources(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveUpgradeCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveUpgradeResource(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approveUpgradeTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    delegatedGameFunctionNames(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    denounceTreaty(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    description(overrides?: CallOverrides): Promise<[string]>;

    diamond(overrides?: CallOverrides): Promise<[string]>;

    getter(overrides?: CallOverrides): Promise<[string]>;

    isMemberStates(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    join(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    joinTreaty(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    leave(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    memberStates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    name(overrides?: CallOverrides): Promise<[string]>;
  };

  admin(overrides?: CallOverrides): Promise<string>;

  approveBattle(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveClaimTile(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveDelegatePermission(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveDisbandArmy(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveDisownTile(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveEndGather(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveEndTroopProduction(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveHarvestResource(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveHarvestResourcesFromCapital(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveJoinTreaty(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveLeaveTreaty(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveMove(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveMoveArmy(overrides?: CallOverrides): Promise<boolean>;

  approveMoveCapital(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveOrganizeArmy(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveRecoverTile(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveStartGather(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveStartTroopProduction(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveUnloadResources(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveUpgradeCapital(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveUpgradeResource(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approveUpgradeTile(
    _nationID: PromiseOrValue<BigNumberish>,
    _encodedParams: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  delegatedGameFunctionNames(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  denounceTreaty(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  description(overrides?: CallOverrides): Promise<string>;

  diamond(overrides?: CallOverrides): Promise<string>;

  getter(overrides?: CallOverrides): Promise<string>;

  isMemberStates(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  join(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  joinTreaty(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  leave(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  memberStates(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  name(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    admin(overrides?: CallOverrides): Promise<string>;

    approveBattle(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveClaimTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveDelegatePermission(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveDisbandArmy(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveDisownTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveEndGather(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveEndTroopProduction(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveHarvestResource(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveHarvestResourcesFromCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveJoinTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveLeaveTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveMove(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveMoveArmy(overrides?: CallOverrides): Promise<boolean>;

    approveMoveCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveOrganizeArmy(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveRecoverTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveStartGather(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveStartTroopProduction(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveUnloadResources(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveUpgradeCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveUpgradeResource(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approveUpgradeTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    delegatedGameFunctionNames(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    denounceTreaty(overrides?: CallOverrides): Promise<boolean>;

    description(overrides?: CallOverrides): Promise<string>;

    diamond(overrides?: CallOverrides): Promise<string>;

    getter(overrides?: CallOverrides): Promise<string>;

    isMemberStates(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    join(overrides?: CallOverrides): Promise<void>;

    joinTreaty(overrides?: CallOverrides): Promise<boolean>;

    leave(overrides?: CallOverrides): Promise<void>;

    memberStates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    name(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    admin(overrides?: CallOverrides): Promise<BigNumber>;

    approveBattle(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveClaimTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveDelegatePermission(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveDisbandArmy(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveDisownTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveEndGather(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveEndTroopProduction(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveHarvestResource(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveHarvestResourcesFromCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveJoinTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveLeaveTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveMove(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveMoveArmy(overrides?: CallOverrides): Promise<BigNumber>;

    approveMoveCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveOrganizeArmy(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveRecoverTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveStartGather(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveStartTroopProduction(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveUnloadResources(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveUpgradeCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveUpgradeResource(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approveUpgradeTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    delegatedGameFunctionNames(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    denounceTreaty(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    description(overrides?: CallOverrides): Promise<BigNumber>;

    diamond(overrides?: CallOverrides): Promise<BigNumber>;

    getter(overrides?: CallOverrides): Promise<BigNumber>;

    isMemberStates(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    join(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    joinTreaty(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    leave(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    memberStates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approveBattle(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveClaimTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveDelegatePermission(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveDisbandArmy(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveDisownTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveEndGather(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveEndTroopProduction(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveHarvestResource(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveHarvestResourcesFromCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveJoinTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveLeaveTreaty(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveMove(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveMoveArmy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approveMoveCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveOrganizeArmy(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveRecoverTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveStartGather(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveStartTroopProduction(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveUnloadResources(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveUpgradeCapital(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveUpgradeResource(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approveUpgradeTile(
      _nationID: PromiseOrValue<BigNumberish>,
      _encodedParams: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delegatedGameFunctionNames(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    denounceTreaty(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    description(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    diamond(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isMemberStates(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    join(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    joinTreaty(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    leave(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    memberStates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
