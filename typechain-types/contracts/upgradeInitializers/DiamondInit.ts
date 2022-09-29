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

export type WorldConstantsStruct = {
  admin: PromiseOrValue<string>;
  worldWidth: PromiseOrValue<BigNumberish>;
  worldHeight: PromiseOrValue<BigNumberish>;
  numInitTerrainTypes: PromiseOrValue<BigNumberish>;
  initBatchSize: PromiseOrValue<BigNumberish>;
  maxCityCountPerPlayer: PromiseOrValue<BigNumberish>;
  maxArmyCountPerPlayer: PromiseOrValue<BigNumberish>;
  maxPlayerCount: PromiseOrValue<BigNumberish>;
  cityUpgradeGoldCost: PromiseOrValue<BigNumberish>;
  cityPackCost: PromiseOrValue<BigNumberish>;
  initCityGold: PromiseOrValue<BigNumberish>;
  cityHealth: PromiseOrValue<BigNumberish>;
  cityAttack: PromiseOrValue<BigNumberish>;
  cityDefense: PromiseOrValue<BigNumberish>;
};

export type WorldConstantsStructOutput = [
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
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
  worldWidth: BigNumber;
  worldHeight: BigNumber;
  numInitTerrainTypes: BigNumber;
  initBatchSize: BigNumber;
  maxCityCountPerPlayer: BigNumber;
  maxArmyCountPerPlayer: BigNumber;
  maxPlayerCount: BigNumber;
  cityUpgradeGoldCost: BigNumber;
  cityPackCost: BigNumber;
  initCityGold: BigNumber;
  cityHealth: BigNumber;
  cityAttack: BigNumber;
  cityDefense: BigNumber;
};

export interface DiamondInitInterface extends utils.Interface {
  functions: {
    "init((address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "init"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "init",
    values: [WorldConstantsStruct]
  ): string;

  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;

  events: {};
}

export interface DiamondInit extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DiamondInitInterface;

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
    init(
      _worldConstants: WorldConstantsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  init(
    _worldConstants: WorldConstantsStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    init(
      _worldConstants: WorldConstantsStruct,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    init(
      _worldConstants: WorldConstantsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    init(
      _worldConstants: WorldConstantsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
