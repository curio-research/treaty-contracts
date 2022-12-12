/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { PromiseOrValue } from '../../../common';
import type { Alliance, AllianceInterface } from '../../../contracts/treaties/Alliance';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_diamond',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'diamond',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getter',
    outputs: [
      {
        internalType: 'contract GetterFacet',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const _bytecode =
  '0x608060405234801561001057600080fd5b5060405161044038038061044083398101604081905261002f91610192565b6001600160a01b0381166100895760405162461bcd60e51b815260206004820152601d60248201527f4654583a204469616d6f6e642061646472657373207265717569726564000000604482015260640160405180910390fd5b600080546001600160a01b0319166001600160a01b03831617905560408051808201909152600880825267416c6c69616e636560c01b60209092019182526100d3916001916100f9565b50600280546001600160a01b0319166001600160a01b03929092169190911790556101fc565b828054610105906101c2565b90600052602060002090601f016020900481019282610127576000855561016d565b82601f1061014057805160ff191683800117855561016d565b8280016001018555821561016d579182015b8281111561016d578251825591602001919060010190610152565b5061017992915061017d565b5090565b5b80821115610179576000815560010161017e565b6000602082840312156101a457600080fd5b81516001600160a01b03811681146101bb57600080fd5b9392505050565b600181811c908216806101d657607f821691505b6020821081036101f657634e487b7160e01b600052602260045260246000fd5b50919050565b6102358061020b6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806306fdde0314610046578063993a04b714610064578063f0b7db4e146100a9575b600080fd5b61004e6100c9565b60405161005b9190610157565b60405180910390f35b6002546100849073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161005b565b6000546100849073ffffffffffffffffffffffffffffffffffffffff1681565b600180546100d6906101ac565b80601f0160208091040260200160405190810160405280929190818152602001828054610102906101ac565b801561014f5780601f106101245761010080835404028352916020019161014f565b820191906000526020600020905b81548152906001019060200180831161013257829003601f168201915b505050505081565b600060208083528351808285015260005b8181101561018457858101830151858201604001528201610168565b81811115610196576000604083870101525b50601f01601f1916929092016040019392505050565b600181811c908216806101c057607f821691505b6020821081036101f9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b5091905056fea264697066735822122027bc392dc4de7f904cd0148449402da5acf7d820fd52c2af6c683e2d2f7efb5764736f6c634300080d0033';

type AllianceConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: AllianceConstructorParams): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Alliance__factory extends ContractFactory {
  constructor(...args: AllianceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(_diamond: PromiseOrValue<string>, overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<Alliance> {
    return super.deploy(_diamond, overrides || {}) as Promise<Alliance>;
  }
  override getDeployTransaction(_diamond: PromiseOrValue<string>, overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): Alliance {
    return super.attach(address) as Alliance;
  }
  override connect(signer: Signer): Alliance__factory {
    return super.connect(signer) as Alliance__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AllianceInterface {
    return new utils.Interface(_abi) as AllianceInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Alliance {
    return new Contract(address, _abi, signerOrProvider) as Alliance;
  }
}
