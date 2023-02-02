/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Component, ComponentInterface } from "../../contracts/Component";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_gameAddr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getAllEntitiesAndValues",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getBytesValue",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntities",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntitiesAsSet",
    outputs: [
      {
        internalType: "contract Set",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "getEntitiesWithValue",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "getEntitiesWithValueAsSet",
    outputs: [
      {
        internalType: "contract Set",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "has",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a0604052604051610010906100da565b604051809103906000f08015801561002c573d6000803e3d6000fd5b506001600160a01b0316608052604051610045906100da565b604051809103906000f080158015610061573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009657600080fd5b50604051611df9380380611df98339810160408190526100b5916100e7565b600080546001600160a01b0319166001600160a01b0392909216919091179055610117565b6106798061178083390190565b6000602082840312156100f957600080fd5b81516001600160a01b038116811461011057600080fd5b9392505050565b60805161164e6101326000396000610945015261164e6000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c80638b28294711610076578063a1d8509f1161005b578063a1d8509f1461014f578063b361be4614610160578063cccf7a8e1461017357600080fd5b80638b282947146101115780639933adfd1461012457600080fd5b806331b933b9146100a85780634c518fdc146100c65780634cc82215146100e657806378d9f34f146100fb575b600080fd5b6100b0610196565b6040516100bd9190610b85565b60405180910390f35b6100d96100d4366004610b9f565b610226565b6040516100bd9190610c05565b6100f96100f4366004610b9f565b6102c8565b005b61010361047d565b6040516100bd929190610c18565b6100f961011f366004610d41565b61064c565b610137610132366004610d88565b610912565b6040516001600160a01b0390911681526020016100bd565b6001546001600160a01b0316610137565b6100b061016e366004610d88565b610970565b610186610181366004610b9f565b6109e0565b60405190151581526020016100bd565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed51439160048083019260009291908290030181865afa1580156101f9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102219190810190610dc5565b905090565b600081815260026020526040902080546060919061024390610e6b565b80601f016020809104026020016040519081016040528092919081815260200182805461026f90610e6b565b80156102bc5780601f10610291576101008083540402835291602001916102bc565b820191906000526020600020905b81548152906001019060200180831161029f57829003601f168201915b50505050509050919050565b6000546001600160a01b03163314806102e057503330145b6103575760405162461bcd60e51b815260206004820152602e60248201527f436f6d706f6e656e743a204f6e6c792067616d65206f722073656c662063616e60448201527f206d6f646966792076616c75657300000000000000000000000000000000000060648201526084015b60405180910390fd5b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561039d57600080fd5b505af11580156103b1573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103d691610ea5565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461046257604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561044957600080fd5b505af115801561045d573d6000803e3d6000fd5b505050505b600082815260026020526040812061047991610a67565b5050565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa1580156104d5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104fd9190810190610dc5565b90506000815167ffffffffffffffff81111561051b5761051b610c8a565b60405190808252806020026020018201604052801561054e57816020015b60608152602001906001900390816105395790505b50905060005b8251811015610642576002600084838151811061057357610573610f40565b60200260200101518152602001908152602001600020805461059490610e6b565b80601f01602080910402602001604051908101604052809291908181526020018280546105c090610e6b565b801561060d5780601f106105e25761010080835404028352916020019161060d565b820191906000526020600020905b8154815290600101906020018083116105f057829003601f168201915b505050505082828151811061062457610624610f40565b6020026020010181905250808061063a90610f56565b915050610554565b5090939092509050565b6000546001600160a01b031633148061066457503330145b6106d65760405162461bcd60e51b815260206004820152602e60248201527f436f6d706f6e656e743a204f6e6c792067616d65206f722073656c662063616e60448201527f206d6f646966792076616c756573000000000000000000000000000000000000606482015260840161034e565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561071c57600080fd5b505af1158015610730573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161075591610ea5565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146107e157604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156107c857600080fd5b505af11580156107dc573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161080092850190610aa4565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b039081169116036108a15760405161083f90610b28565b604051809103906000f08015801561085b573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156108f457600080fd5b505af1158015610908573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b039182169116810361096a57507f000000000000000000000000000000000000000000000000000000000000000092915050565b92915050565b606061097b82610912565b6001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa1580156109b8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261096a9190810190610dc5565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a90602401602060405180830381865afa158015610a43573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061096a9190610f7d565b508054610a7390610e6b565b6000825580601f10610a83575050565b601f016020900490600052602060002090810190610aa19190610b35565b50565b828054610ab090610e6b565b90600052602060002090601f016020900481019282610ad25760008555610b18565b82601f10610aeb57805160ff1916838001178555610b18565b82800160010185558215610b18579182015b82811115610b18578251825591602001919060010190610afd565b50610b24929150610b35565b5090565b61067980610fa083390190565b5b80821115610b245760008155600101610b36565b600081518084526020808501945080840160005b83811015610b7a57815187529582019590820190600101610b5e565b509495945050505050565b602081526000610b986020830184610b4a565b9392505050565b600060208284031215610bb157600080fd5b5035919050565b6000815180845260005b81811015610bde57602081850181015186830182015201610bc2565b81811115610bf0576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610b986020830184610bb8565b604081526000610c2b6040830185610b4a565b6020838203818501528185518084528284019150828160051b85010183880160005b83811015610c7b57601f19878403018552610c69838351610bb8565b94860194925090850190600101610c4d565b50909998505050505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610cc957610cc9610c8a565b604052919050565b600082601f830112610ce257600080fd5b813567ffffffffffffffff811115610cfc57610cfc610c8a565b610d0f601f8201601f1916602001610ca0565b818152846020838601011115610d2457600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610d5457600080fd5b82359150602083013567ffffffffffffffff811115610d7257600080fd5b610d7e85828601610cd1565b9150509250929050565b600060208284031215610d9a57600080fd5b813567ffffffffffffffff811115610db157600080fd5b610dbd84828501610cd1565b949350505050565b60006020808385031215610dd857600080fd5b825167ffffffffffffffff80821115610df057600080fd5b818501915085601f830112610e0457600080fd5b815181811115610e1657610e16610c8a565b8060051b9150610e27848301610ca0565b8181529183018401918481019088841115610e4157600080fd5b938501935b83851015610e5f57845182529385019390850190610e46565b98975050505050505050565b600181811c90821680610e7f57607f821691505b602082108103610e9f57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680610ec157607f831692505b60208084108203610ee057634e487b7160e01b86526022600452602486fd5b818015610ef45760018114610f0557610f32565b60ff19861689528489019650610f32565b60008a81526020902060005b86811015610f2a5781548b820152908501908301610f11565b505084890196505b509498975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600060018201610f7657634e487b7160e01b600052601160045260246000fd5b5060010190565b600060208284031215610f8f57600080fd5b81518015158114610b9857600080fdfe608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610647806100326000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a61008536600461046e565b610104565b005b61008a61009a36600461046e565b6101db565b6100a7610306565b6040516100b49190610487565b60405180910390f35b61008a6100cb3660046104e1565b61035e565b6001546040519081526020016100b4565b6100f46100ef36600461046e565b610415565b60405190151581526020016100b4565b60005473ffffffffffffffffffffffffffffffffffffffff16331461017c5760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b60648201526084015b60405180910390fd5b61018581610415565b6101d85760018054808201825560008290527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60182905580546101c891906105b5565b6000828152600260205260409020555b50565b60005473ffffffffffffffffffffffffffffffffffffffff16331461024e5760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b6064820152608401610173565b61025781610415565b156101d8576000818152600260205260408120549060018061027860015490565b61028291906105b5565b81548110610292576102926105cc565b9060005260206000200154905080600183815481106102b3576102b36105cc565b60009182526020808320909101929092558281526002909152604080822084905584825281205560018054806102eb576102eb6105e2565b60019003818190600052602060002001600090559055505050565b6060600180548060200260200160405190810160405280929190818152602001828054801561035457602002820191906000526020600020905b815481526020019060010190808311610340575b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff1633146103d15760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b6064820152608401610173565b60005b8151811015610411576103ff8282815181106103f2576103f26105cc565b6020026020010151610104565b80610409816105f8565b9150506103d4565b5050565b600061042060015490565b60000361042f57506000919050565b600082815260026020526040902054151580610468575081600160008154811061045b5761045b6105cc565b9060005260206000200154145b92915050565b60006020828403121561048057600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104bf578351835292840192918401916001016104a3565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156104f457600080fd5b823567ffffffffffffffff8082111561050c57600080fd5b818501915085601f83011261052057600080fd5b813581811115610532576105326104cb565b8060051b604051601f19603f83011681018181108582111715610557576105576104cb565b60405291825284820192508381018501918883111561057557600080fd5b938501935b828510156105935784358452938501939285019261057a565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156105c7576105c761059f565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b60006001820161060a5761060a61059f565b506001019056fea2646970667358221220f01eb07e075d380e581f0514d1ad0080d6553c3df8e79a6d6b6d99e1d9048b0d64736f6c634300080d0033a264697066735822122020c8880efac2d57bfb87b0c003599fd9fbfa48094b9bd61bc22663896a29a22c64736f6c634300080d0033608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610647806100326000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a61008536600461046e565b610104565b005b61008a61009a36600461046e565b6101db565b6100a7610306565b6040516100b49190610487565b60405180910390f35b61008a6100cb3660046104e1565b61035e565b6001546040519081526020016100b4565b6100f46100ef36600461046e565b610415565b60405190151581526020016100b4565b60005473ffffffffffffffffffffffffffffffffffffffff16331461017c5760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b60648201526084015b60405180910390fd5b61018581610415565b6101d85760018054808201825560008290527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60182905580546101c891906105b5565b6000828152600260205260409020555b50565b60005473ffffffffffffffffffffffffffffffffffffffff16331461024e5760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b6064820152608401610173565b61025781610415565b156101d8576000818152600260205260408120549060018061027860015490565b61028291906105b5565b81548110610292576102926105cc565b9060005260206000200154905080600183815481106102b3576102b36105cc565b60009182526020808320909101929092558281526002909152604080822084905584825281205560018054806102eb576102eb6105e2565b60019003818190600052602060002001600090559055505050565b6060600180548060200260200160405190810160405280929190818152602001828054801561035457602002820191906000526020600020905b815481526020019060010190808311610340575b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff1633146103d15760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b6064820152608401610173565b60005b8151811015610411576103ff8282815181106103f2576103f26105cc565b6020026020010151610104565b80610409816105f8565b9150506103d4565b5050565b600061042060015490565b60000361042f57506000919050565b600082815260026020526040902054151580610468575081600160008154811061045b5761045b6105cc565b9060005260206000200154145b92915050565b60006020828403121561048057600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104bf578351835292840192918401916001016104a3565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156104f457600080fd5b823567ffffffffffffffff8082111561050c57600080fd5b818501915085601f83011261052057600080fd5b813581811115610532576105326104cb565b8060051b604051601f19603f83011681018181108582111715610557576105576104cb565b60405291825284820192508381018501918883111561057557600080fd5b938501935b828510156105935784358452938501939285019261057a565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156105c7576105c761059f565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b60006001820161060a5761060a61059f565b506001019056fea2646970667358221220f01eb07e075d380e581f0514d1ad0080d6553c3df8e79a6d6b6d99e1d9048b0d64736f6c634300080d0033";

type ComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Component__factory extends ContractFactory {
  constructor(...args: ComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Component> {
    return super.deploy(_gameAddr, overrides || {}) as Promise<Component>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): Component {
    return super.attach(address) as Component;
  }
  override connect(signer: Signer): Component__factory {
    return super.connect(signer) as Component__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComponentInterface {
    return new utils.Interface(_abi) as ComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Component {
    return new Contract(address, _abi, signerOrProvider) as Component;
  }
}
