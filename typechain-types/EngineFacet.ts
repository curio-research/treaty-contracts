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

export type PositionStruct = { x: BigNumberish; y: BigNumberish };

export type PositionStructOutput = [BigNumber, BigNumber] & {
  x: BigNumber;
  y: BigNumber;
};

export interface EngineFacetInterface extends utils.Interface {
  functions: {
    "march(uint256,(uint256,uint256))": FunctionFragment;
<<<<<<< HEAD
    "purchaseTroop((uint256,uint256),uint256)": FunctionFragment;
=======
    "startProduction((uint256,uint256),uint256)": FunctionFragment;
>>>>>>> ca3f58f (Remove legacy files)
  };

  encodeFunctionData(
    functionFragment: "march",
    values: [BigNumberish, PositionStruct]
  ): string;
  encodeFunctionData(
<<<<<<< HEAD
    functionFragment: "purchaseTroop",
=======
    functionFragment: "startProduction",
>>>>>>> ca3f58f (Remove legacy files)
    values: [PositionStruct, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "march", data: BytesLike): Result;
  decodeFunctionResult(
<<<<<<< HEAD
    functionFragment: "purchaseTroop",
=======
    functionFragment: "startProduction",
>>>>>>> ca3f58f (Remove legacy files)
    data: BytesLike
  ): Result;

  events: {};
}

export interface EngineFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EngineFacetInterface;

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
    march(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

<<<<<<< HEAD
    purchaseTroop(
=======
    startProduction(
>>>>>>> ca3f58f (Remove legacy files)
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  march(
    _troopId: BigNumberish,
    _targetPos: PositionStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

<<<<<<< HEAD
  purchaseTroop(
=======
  startProduction(
>>>>>>> ca3f58f (Remove legacy files)
    _pos: PositionStruct,
    _troopTypeId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    march(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: CallOverrides
    ): Promise<void>;

<<<<<<< HEAD
    purchaseTroop(
=======
    startProduction(
>>>>>>> ca3f58f (Remove legacy files)
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    march(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

<<<<<<< HEAD
    purchaseTroop(
=======
    startProduction(
>>>>>>> ca3f58f (Remove legacy files)
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    march(
      _troopId: BigNumberish,
      _targetPos: PositionStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

<<<<<<< HEAD
    purchaseTroop(
=======
    startProduction(
>>>>>>> ca3f58f (Remove legacy files)
      _pos: PositionStruct,
      _troopTypeId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
