/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  UintArrayComponent,
  UintArrayComponentInterface,
} from "../../../contracts/TypedComponents.sol/UintArrayComponent";

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
        internalType: "uint256[]",
        name: "_value",
        type: "uint256[]",
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
    name: "getValue",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_value",
        type: "uint256[]",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a0604052604051610010906100e0565b604051809103906000f08015801561002c573d6000803e3d6000fd5b5060601b6001600160601b031916608052604051610049906100e0565b604051809103906000f080158015610065573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009a57600080fd5b5060405162001ceb38038062001ceb8339810160408190526100bb916100ee565b600080546001600160a01b0319166001600160a01b039290921691909117905561011c565b61052980620017c283390190565b6000602082840312156100ff578081fd5b81516001600160a01b0381168114610115578182fd5b9392505050565b60805160601c6116876200013b60003960006109ed01526116876000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c8063946aadc611610081578063a1d8509f1161005b578063a1d8509f146101b9578063b361be46146101ca578063cccf7a8e146101dd57600080fd5b8063946aadc614610168578063963e9eb01461017b5780639933adfd1461018e57600080fd5b80634cc82215116100b25780634cc822151461012a57806378d9f34f1461013f5780638b2829471461015557600080fd5b80630ff4c916146100d957806331b933b9146101025780634c518fdc1461010a575b600080fd5b6100ec6100e7366004610e0c565b610200565b6040516100f99190610fc4565b60405180910390f35b6100ec610224565b61011d610118366004610e0c565b6102c3565b6040516100f99190611048565b61013d610138366004610e0c565b6103fb565b005b610147610521565b6040516100f9929190610fd7565b61013d610163366004610e69565b610729565b61013d610176366004610e24565b610966565b6100ec610189366004610ce4565b61098f565b6101a161019c366004610dd9565b6109b9565b6040516001600160a01b0390911681526020016100f9565b6001546001600160a01b03166101a1565b6100ec6101d8366004610dd9565b610a12565b6101f06101eb366004610e0c565b610a91565b60405190151581526020016100f9565b606061020b826102c3565b80602001905181019061021e9190610d1f565b92915050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561028257600080fd5b505afa158015610296573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102be9190810190610d1f565b905090565b60606102ce82610a91565b61035d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f435552494f3a20456e74697479206e6f7420666f756e6420696e20636f6d706f60448201527f6e656e7400000000000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b60008281526002602052604090208054610376906110b0565b80601f01602080910402602001604051908101604052809291908181526020018280546103a2906110b0565b80156103ef5780601f106103c4576101008083540402835291602001916103ef565b820191906000526020600020905b8154815290600101906020018083116103d257829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561044157600080fd5b505af1158015610455573d6000803e3d6000fd5b5050506000828152600260205260408082209051919250600391839161047a91610f29565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461050657604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156104ed57600080fd5b505af1158015610501573d6000803e3d6000fd5b505050505b600082815260026020526040812061051d91610b27565b5050565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561057457600080fd5b505afa158015610588573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105b09190810190610d1f565b90506000815167ffffffffffffffff8111156105dc57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561060f57816020015b60608152602001906001900390816105fa5790505b50905060005b825181101561071f576002600084838151811061064257634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000208054610663906110b0565b80601f016020809104026020016040519081016040528092919081815260200182805461068f906110b0565b80156106dc5780601f106106b1576101008083540402835291602001916106dc565b820191906000526020600020905b8154815290600101906020018083116106bf57829003601f168201915b505050505082828151811061070157634e487b7160e01b600052603260045260246000fd5b60200260200101819052508080610717906110eb565b915050610615565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561076f57600080fd5b505af1158015610783573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916107a891610f29565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461083457604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561081b57600080fd5b505af115801561082f573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161085392850190610b64565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b03918216911614156108f55760405161089390610be8565b604051809103906000f0801580156108af573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561094857600080fd5b505af115801561095c573d6000803e3d6000fd5b5050505050505050565b61051d828260405160200161097b9190610fc4565b604051602081830303815290604052610729565b606061021e826040516020016109a59190610fc4565b604051602081830303815290604052610a12565b80516020808301919091206000908152600390915260408120546004546001600160a01b03918216911681141561021e57507f000000000000000000000000000000000000000000000000000000000000000092915050565b6060610a1d826109b9565b6001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b158015610a5557600080fd5b505afa158015610a69573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261021e9190810190610d1f565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b158015610aef57600080fd5b505afa158015610b03573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021e9190610db2565b508054610b33906110b0565b6000825580601f10610b43575050565b601f016020900490600052602060002090810190610b619190610bf5565b50565b828054610b70906110b0565b90600052602060002090601f016020900481019282610b925760008555610bd8565b82601f10610bab57805160ff1916838001178555610bd8565b82800160010185558215610bd8579182015b82811115610bd8578251825591602001919060010190610bbd565b50610be4929150610bf5565b5090565b6105298061112983390190565b5b80821115610be45760008155600101610bf6565b600082601f830112610c1a578081fd5b81356020610c2f610c2a8361108c565b61105b565b80838252828201915082860187848660051b8901011115610c4e578586fd5b855b85811015610c6c57813584529284019290840190600101610c50565b5090979650505050505050565b600082601f830112610c89578081fd5b813567ffffffffffffffff811115610ca357610ca3611112565b610cb6601f8201601f191660200161105b565b818152846020838601011115610cca578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215610cf5578081fd5b813567ffffffffffffffff811115610d0b578182fd5b610d1784828501610c0a565b949350505050565b60006020808385031215610d31578182fd5b825167ffffffffffffffff811115610d47578283fd5b8301601f81018513610d57578283fd5b8051610d65610c2a8261108c565b80828252848201915084840188868560051b8701011115610d84578687fd5b8694505b83851015610da6578051835260019490940193918501918501610d88565b50979650505050505050565b600060208284031215610dc3578081fd5b81518015158114610dd2578182fd5b9392505050565b600060208284031215610dea578081fd5b813567ffffffffffffffff811115610e00578182fd5b610d1784828501610c79565b600060208284031215610e1d578081fd5b5035919050565b60008060408385031215610e36578081fd5b82359150602083013567ffffffffffffffff811115610e53578182fd5b610e5f85828601610c0a565b9150509250929050565b60008060408385031215610e7b578182fd5b82359150602083013567ffffffffffffffff811115610e98578182fd5b610e5f85828601610c79565b6000815180845260208085019450808401835b83811015610ed357815187529582019590820190600101610eb7565b509495945050505050565b60008151808452815b81811015610f0357602081850181015186830182015201610ee7565b81811115610f145782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610f4557607f831692505b6020808410821415610f6557634e487b7160e01b87526022600452602487fd5b818015610f795760018114610f8a57610fb6565b60ff19861689528489019650610fb6565b60008a815260209020885b86811015610fae5781548b820152908501908301610f95565b505084890196505b509498975050505050505050565b602081526000610dd26020830184610ea4565b604081526000610fea6040830185610ea4565b6020838203818501528185518084528284019150828160051b850101838801865b8381101561103957601f19878403018552611027838351610ede565b9486019492509085019060010161100b565b50909998505050505050505050565b602081526000610dd26020830184610ede565b604051601f8201601f1916810167ffffffffffffffff8111828210171561108457611084611112565b604052919050565b600067ffffffffffffffff8211156110a6576110a6611112565b5060051b60200190565b600181811c908216806110c457607f821691505b602082108114156110e557634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561110b57634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033a2646970667358221220a688406d83c9602a3b94b1e46b31c4e6f7d812ff68d9e9931f44f9db0f28c4bd64736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033";

type UintArrayComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UintArrayComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UintArrayComponent__factory extends ContractFactory {
  constructor(...args: UintArrayComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UintArrayComponent> {
    return super.deploy(
      _gameAddr,
      overrides || {}
    ) as Promise<UintArrayComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): UintArrayComponent {
    return super.attach(address) as UintArrayComponent;
  }
  override connect(signer: Signer): UintArrayComponent__factory {
    return super.connect(signer) as UintArrayComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UintArrayComponentInterface {
    return new utils.Interface(_abi) as UintArrayComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UintArrayComponent {
    return new Contract(address, _abi, signerOrProvider) as UintArrayComponent;
  }
}
