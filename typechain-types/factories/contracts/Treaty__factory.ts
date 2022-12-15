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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161046438038061046483398101604081905261002f9161018b565b6001600160a01b0381166100895760405162461bcd60e51b815260206004820181905260248201527f5472656174793a204469616d6f6e642061646472657373207265717569726564604482015260640160405180910390fd5b600080546001600160a01b0383166001600160a01b03199182168117909255600180548216831790556002805490911690911790556040805180820190915260068082526554726561747960d01b60209092019182526100eb916003916100f2565b50506101f5565b8280546100fe906101bb565b90600052602060002090601f0160209004810192826101205760008555610166565b82601f1061013957805160ff1916838001178555610166565b82800160010185558215610166579182015b8281111561016657825182559160200191906001019061014b565b50610172929150610176565b5090565b5b808211156101725760008155600101610177565b60006020828403121561019d57600080fd5b81516001600160a01b03811681146101b457600080fd5b9392505050565b600181811c908216806101cf57607f821691505b6020821081036101ef57634e487b7160e01b600052602260045260246000fd5b50919050565b610260806102046000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806306fdde0314610051578063993a04b71461006f578063c3fe3e28146100b4578063f0b7db4e146100d4575b600080fd5b6100596100f4565b6040516100669190610182565b60405180910390f35b60025461008f9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610066565b60015461008f9073ffffffffffffffffffffffffffffffffffffffff1681565b60005461008f9073ffffffffffffffffffffffffffffffffffffffff1681565b60038054610101906101d7565b80601f016020809104026020016040519081016040528092919081815260200182805461012d906101d7565b801561017a5780601f1061014f5761010080835404028352916020019161017a565b820191906000526020600020905b81548152906001019060200180831161015d57829003601f168201915b505050505081565b600060208083528351808285015260005b818110156101af57858101830151858201604001528201610193565b818111156101c1576000604083870101525b50601f01601f1916929092016040019392505050565b600181811c908216806101eb57607f821691505b602082108103610224577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b5091905056fea2646970667358221220f2bb38c22110745a64093d15dc2d9d92b72229a692e33d1a40083ce03ae403b164736f6c634300080d0033";

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
