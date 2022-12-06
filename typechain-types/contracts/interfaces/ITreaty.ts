/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
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

export interface ITreatyInterface extends utils.Interface {
  functions: {
    "diamond()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "diamond"): FunctionFragment;

  encodeFunctionData(functionFragment: "diamond", values?: undefined): string;

  decodeFunctionResult(functionFragment: "diamond", data: BytesLike): Result;

  events: {};
}

export interface ITreaty extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ITreatyInterface;

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
    diamond(overrides?: CallOverrides): Promise<[string]>;
  };

  diamond(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    diamond(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    diamond(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    diamond(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
