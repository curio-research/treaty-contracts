/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Treaty, TreatyInterface } from "../../contracts/Treaty";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_diamond",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "diamond",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "game",
    outputs: [
      {
        internalType: "contract GameFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getter",
    outputs: [
      {
        internalType: "contract GetterFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "joinTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "leaveTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161023038038061023083398101604081905261002f916100c2565b6001600160a01b0381166100895760405162461bcd60e51b815260206004820181905260248201527f5472656174793a204469616d6f6e642061646472657373207265717569726564604482015260640160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280549092161790556100f2565b6000602082840312156100d457600080fd5b81516001600160a01b03811681146100eb57600080fd5b9392505050565b61012f806101016000396000f3fe6080604052348015600f57600080fd5b5060043610605f5760003560e01c8063c3fe3e2811604a578063c3fe3e281460bb578063d83979921460ad578063f0b7db4e1460da57600080fd5b8063993a04b7146064578063a67a6bbe1460ad575b600080fd5b60025460839073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6040516000815260200160a4565b60015460839073ffffffffffffffffffffffffffffffffffffffff1681565b60005460839073ffffffffffffffffffffffffffffffffffffffff168156fea2646970667358221220a5e70272fb9b0d412c89ca719532129af0ffef399fa3943bb794b925f4c3691964736f6c634300080d0033";

type TreatyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TreatyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Treaty__factory extends ContractFactory {
  constructor(...args: TreatyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Treaty> {
    return super.deploy(_diamond, overrides || {}) as Promise<Treaty>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): Treaty {
    return super.attach(address) as Treaty;
  }
  override connect(signer: Signer): Treaty__factory {
    return super.connect(signer) as Treaty__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TreatyInterface {
    return new utils.Interface(_abi) as TreatyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Treaty {
    return new Contract(address, _abi, signerOrProvider) as Treaty;
  }
}
