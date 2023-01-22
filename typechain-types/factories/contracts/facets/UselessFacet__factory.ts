/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  UselessFacet,
  UselessFacetInterface,
} from "../../../contracts/facets/UselessFacet";

const _abi = [
  {
    inputs: [],
    name: "getAddressNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uselessFunction",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610134806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806308ef1b1214603757806353b4e76914607d575b600080fd5b604080518082018252601881527f546869732066756e6374696f6e206973207573656c6573730000000000000000602082015290516074919060ac565b60405180910390f35b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0a1546040519081526020016074565b600060208083528351808285015260005b8181101560d75785810183015185820160400152820160bd565b8181111560e8576000604083870101525b50601f01601f191692909201604001939250505056fea264697066735822122049dc1599b17cd6c9fb217dc714a8d813723bebbb37025db97e1d255461ab0b6d64736f6c634300080d0033";

type UselessFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UselessFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UselessFacet__factory extends ContractFactory {
  constructor(...args: UselessFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UselessFacet> {
    return super.deploy(overrides || {}) as Promise<UselessFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UselessFacet {
    return super.attach(address) as UselessFacet;
  }
  override connect(signer: Signer): UselessFacet__factory {
    return super.connect(signer) as UselessFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UselessFacetInterface {
    return new utils.Interface(_abi) as UselessFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UselessFacet {
    return new Contract(address, _abi, signerOrProvider) as UselessFacet;
  }
}
