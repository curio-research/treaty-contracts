/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DiamondLoupeFacet,
  DiamondLoupeFacetInterface,
} from "../../../contracts/facets/DiamondLoupeFacet";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_functionSelector",
        type: "bytes4",
      },
    ],
    name: "facetAddress",
    outputs: [
      {
        internalType: "address",
        name: "facetAddress_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "facetAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "facetAddresses_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_facet",
        type: "address",
      },
    ],
    name: "facetFunctionSelectors",
    outputs: [
      {
        internalType: "bytes4[]",
        name: "_facetFunctionSelectors",
        type: "bytes4[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "facets",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondLoupe.Facet[]",
        name: "facets_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c67806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80637a0ed627116100505780637a0ed627146100e2578063adfca15e146100f7578063cdffacc61461011757600080fd5b806301ffc9a71461006c57806352ef6b2c146100cd575b600080fd5b6100b861007a366004610a98565b6001600160e01b03191660009081527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f602052604090205460ff1690565b60405190151581526020015b60405180910390f35b6100d561017b565b6040516100c49190610b04565b6100ea610382565b6040516100c49190610b64565b61010a610105366004610a6a565b6108c4565b6040516100c49190610b51565b610163610125366004610a98565b6001600160e01b03191660009081527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c602052604090205460601c90565b6040516001600160a01b0390911681526020016100c4565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e546060907fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c9061ffff1667ffffffffffffffff8111156101ec57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610215578160200160208202803683370190505b50915060008060005b600284015461ffff1682101561037a576000818152600185016020526040812054905b6008811015610365578361025481610be0565b600288015490955061ffff16851115905061026e57610365565b600581901b82901b6001600160e01b0319811660009081526020889052604081205460601c90805b888110156102fa578a81815181106102be57634e487b7160e01b600052603260045260246000fd5b60200260200101516001600160a01b0316836001600160a01b031614156102e857600191506102fa565b806102f281610be0565b915050610296565b50801561030957505050610353565b818a898151811061032a57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03909216602092830291909101909101528761034c81610be0565b9850505050505b8061035d81610be0565b915050610241565b5050808061037290610be0565b91505061021e565b505082525090565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e546060907fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c9061ffff1667ffffffffffffffff8111156103f357634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561043957816020015b6040805180820190915260008152606060208201528152602001906001900390816104115790505b50600282015490925060009061ffff1667ffffffffffffffff81111561046f57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610498578160200160208202803683370190505b50905060008060005b600285015461ffff16821015610836576000818152600186016020526040812054905b600881101561082157836104d781610be0565b600289015490955061ffff1685111590506104f157610821565b600581901b82901b6001600160e01b0319811660009081526020899052604081205460601c90805b8881101561068b57826001600160a01b03168c828151811061054b57634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160a01b0316141561067957838c828151811061058757634e487b7160e01b600052603260045260246000fd5b6020026020010151602001518b83815181106105b357634e487b7160e01b600052603260045260246000fd5b602002602001015160ff16815181106105dc57634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160e01b03191690816001600160e01b0319168152505060ff8a828151811061062057634e487b7160e01b600052603260045260246000fd5b602002602001015160ff161061063557600080fd5b89818151811061065557634e487b7160e01b600052603260045260246000fd5b60200260200101805180919061066a90610bfb565b60ff169052506001915061068b565b8061068381610be0565b915050610519565b50801561069a5750505061080f565b818b89815181106106bb57634e487b7160e01b600052603260045260246000fd5b60209081029190910101516001600160a01b03909116905260028a015461ffff1667ffffffffffffffff81111561070257634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561072b578160200160208202803683370190505b508b898151811061074c57634e487b7160e01b600052603260045260246000fd5b602002602001015160200181905250828b898151811061077c57634e487b7160e01b600052603260045260246000fd5b6020026020010151602001516000815181106107a857634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160e01b03191690816001600160e01b0319168152505060018989815181106107ec57634e487b7160e01b600052603260045260246000fd5b60ff909216602092830291909101909101528761080881610be0565b9850505050505b8061081981610be0565b9150506104c4565b5050808061082e90610be0565b9150506104a1565b5060005b828110156108b957600084828151811061086457634e487b7160e01b600052603260045260246000fd5b602002602001015160ff169050600087838151811061089357634e487b7160e01b600052603260045260246000fd5b6020026020010151602001519050818152505080806108b190610be0565b91505061083a565b508185525050505090565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e546060907fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c9060009061ffff1667ffffffffffffffff81111561093857634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610961578160200160208202803683370190505b5092506000805b600284015461ffff16821015610a60576000818152600185016020526040812054905b6008811015610a4b578361099e81610be0565b600288015490955061ffff1685111590506109b857610a4b565b600581901b82901b6001600160e01b0319811660009081526020889052604090205460601c6001600160a01b038a16811415610a365781898881518110610a0f57634e487b7160e01b600052603260045260246000fd5b6001600160e01b03199092166020928302919091019091015286610a3281610be0565b9750505b50508080610a4390610be0565b91505061098b565b50508080610a5890610be0565b915050610968565b5050825250919050565b600060208284031215610a7b578081fd5b81356001600160a01b0381168114610a91578182fd5b9392505050565b600060208284031215610aa9578081fd5b81356001600160e01b031981168114610a91578182fd5b6000815180845260208085019450808401835b83811015610af95781516001600160e01b03191687529582019590820190600101610ad3565b509495945050505050565b6020808252825182820181905260009190848201906040850190845b81811015610b455783516001600160a01b031683529284019291840191600101610b20565b50909695505050505050565b602081526000610a916020830184610ac0565b60006020808301818452808551808352604092508286019150828160051b870101848801865b83811015610bd257888303603f19018552815180516001600160a01b03168452870151878401879052610bbf87850182610ac0565b9588019593505090860190600101610b8a565b509098975050505050505050565b6000600019821415610bf457610bf4610c1b565b5060010190565b600060ff821660ff811415610c1257610c12610c1b565b60010192915050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220dea40194d62a315e83a3a3e22dd2754e296c550dc2990490ea04d3b6ffb07f4764736f6c63430008040033";

type DiamondLoupeFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DiamondLoupeFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DiamondLoupeFacet__factory extends ContractFactory {
  constructor(...args: DiamondLoupeFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DiamondLoupeFacet> {
    return super.deploy(overrides || {}) as Promise<DiamondLoupeFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DiamondLoupeFacet {
    return super.attach(address) as DiamondLoupeFacet;
  }
  override connect(signer: Signer): DiamondLoupeFacet__factory {
    return super.connect(signer) as DiamondLoupeFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DiamondLoupeFacetInterface {
    return new utils.Interface(_abi) as DiamondLoupeFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DiamondLoupeFacet {
    return new Contract(address, _abi, signerOrProvider) as DiamondLoupeFacet;
  }
}
