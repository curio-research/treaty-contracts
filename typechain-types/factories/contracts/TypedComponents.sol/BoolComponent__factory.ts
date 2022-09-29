/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BoolComponent,
  BoolComponentInterface,
} from "../../../contracts/TypedComponents.sol/BoolComponent";

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
        internalType: "bool",
        name: "_value",
        type: "bool",
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
];

const _bytecode =
  "0x60a0604052604051610010906100de565b604051809103906000f08015801561002c573d6000803e3d6000fd5b5060601b6001600160601b031916608052604051610049906100de565b604051809103906000f080158015610065573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009a57600080fd5b50604051611b6d380380611b6d8339810160408190526100b9916100eb565b600080546001600160a01b0319166001600160a01b0392909216919091179055610119565b6105298061164483390190565b6000602082840312156100fc578081fd5b81516001600160a01b0381168114610112578182fd5b9392505050565b60805160601c61150d610137600039600061093c015261150d6000f3fe608060405234801561001057600080fd5b50600436106100d35760003560e01c806378d9f34f11610081578063a1d8509f1161005b578063a1d8509f146101c8578063b361be46146101d9578063cccf7a8e146101ec57600080fd5b806378d9f34f146101745780638b2829471461018a5780639933adfd1461019d57600080fd5b80634c518fdc116100b25780634c518fdc1461012c5780634cc822151461014c57806360fe47b11461016157600080fd5b80621326ab146100d85780630ff4c9161461010157806331b933b914610124575b600080fd5b6100eb6100e6366004610c69565b6101ff565b6040516100f89190610e60565b60405180910390f35b61011461010f366004610ce3565b610228565b60405190151581526020016100f8565b6100eb610233565b61013f61013a366004610ce3565b6102d2565b6040516100f89190610ee4565b61015f61015a366004610ce3565b610374565b005b61015f61016f366004610ce3565b61049a565b61017c6104c3565b6040516100f8929190610e73565b61015f610198366004610cfb565b6106cb565b6101b06101ab366004610ca8565b610908565b6040516001600160a01b0390911681526020016100f8565b6001546001600160a01b03166101b0565b6100eb6101e7366004610ca8565b610961565b6101146101fa366004610ce3565b6109e0565b60608161021a57604080516000815260208101909152610222565b610222610233565b92915050565b6000610222826109e0565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561029157600080fd5b505afa1580156102a5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102cd9190810190610bc1565b905090565b60008181526002602052604090208054606091906102ef90610f28565b80601f016020809104026020016040519081016040528092919081815260200182805461031b90610f28565b80156103685780601f1061033d57610100808354040283529160200191610368565b820191906000526020600020905b81548152906001019060200180831161034b57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b1580156103ba57600080fd5b505af11580156103ce573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103f391610dc5565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461047f57604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561046657600080fd5b505af115801561047a573d6000803e3d6000fd5b505050505b600082815260026020526040812061049691610a76565b5050565b60408051600160208201526104c0918391016040516020818303038152906040526106cb565b50565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561051657600080fd5b505afa15801561052a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105529190810190610bc1565b90506000815167ffffffffffffffff81111561057e57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156105b157816020015b606081526020019060019003908161059c5790505b50905060005b82518110156106c157600260008483815181106105e457634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020805461060590610f28565b80601f016020809104026020016040519081016040528092919081815260200182805461063190610f28565b801561067e5780601f106106535761010080835404028352916020019161067e565b820191906000526020600020905b81548152906001019060200180831161066157829003601f168201915b50505050508282815181106106a357634e487b7160e01b600052603260045260246000fd5b602002602001018190525080806106b990610f63565b9150506105b7565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561071157600080fd5b505af1158015610725573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161074a91610dc5565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146107d657604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156107bd57600080fd5b505af11580156107d1573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516107f592850190610ab0565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b03918216911614156108975760405161083590610b34565b604051809103906000f080158015610851573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156108ea57600080fd5b505af11580156108fe573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b03918216911681141561022257507f000000000000000000000000000000000000000000000000000000000000000092915050565b606061096c82610908565b6001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156109a457600080fd5b505afa1580156109b8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102229190810190610bc1565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b158015610a3e57600080fd5b505afa158015610a52573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102229190610c8c565b508054610a8290610f28565b6000825580601f10610a92575050565b601f0160209004906000526020600020908101906104c09190610b41565b828054610abc90610f28565b90600052602060002090601f016020900481019282610ade5760008555610b24565b82601f10610af757805160ff1916838001178555610b24565b82800160010185558215610b24579182015b82811115610b24578251825591602001919060010190610b09565b50610b30929150610b41565b5090565b61052980610faf83390190565b5b80821115610b305760008155600101610b42565b600082601f830112610b66578081fd5b813567ffffffffffffffff811115610b8057610b80610f8a565b610b93601f8201601f1916602001610ef7565b818152846020838601011115610ba7578283fd5b816020850160208301379081016020019190915292915050565b60006020808385031215610bd3578182fd5b825167ffffffffffffffff80821115610bea578384fd5b818501915085601f830112610bfd578384fd5b815181811115610c0f57610c0f610f8a565b8060051b9150610c20848301610ef7565b8181528481019084860184860187018a1015610c3a578788fd5b8795505b83861015610c5c578051835260019590950194918601918601610c3e565b5098975050505050505050565b600060208284031215610c7a578081fd5b8135610c8581610fa0565b9392505050565b600060208284031215610c9d578081fd5b8151610c8581610fa0565b600060208284031215610cb9578081fd5b813567ffffffffffffffff811115610ccf578182fd5b610cdb84828501610b56565b949350505050565b600060208284031215610cf4578081fd5b5035919050565b60008060408385031215610d0d578081fd5b82359150602083013567ffffffffffffffff811115610d2a578182fd5b610d3685828601610b56565b9150509250929050565b6000815180845260208085019450808401835b83811015610d6f57815187529582019590820190600101610d53565b509495945050505050565b60008151808452815b81811015610d9f57602081850181015186830182015201610d83565b81811115610db05782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610de157607f831692505b6020808410821415610e0157634e487b7160e01b87526022600452602487fd5b818015610e155760018114610e2657610e52565b60ff19861689528489019650610e52565b60008a815260209020885b86811015610e4a5781548b820152908501908301610e31565b505084890196505b509498975050505050505050565b602081526000610c856020830184610d40565b604081526000610e866040830185610d40565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610ed557601f19878403018552610ec3838351610d7a565b94860194925090850190600101610ea7565b50909998505050505050505050565b602081526000610c856020830184610d7a565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f2057610f20610f8a565b604052919050565b600181811c90821680610f3c57607f821691505b60208210811415610f5d57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610f8357634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b80151581146104c057600080fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033a2646970667358221220bfeec61a626608bb00ffa7c3aeca5811b0e8fbe9cd33cb6fd31f9f90625b610664736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033";

type BoolComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BoolComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BoolComponent__factory extends ContractFactory {
  constructor(...args: BoolComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BoolComponent> {
    return super.deploy(_gameAddr, overrides || {}) as Promise<BoolComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): BoolComponent {
    return super.attach(address) as BoolComponent;
  }
  override connect(signer: Signer): BoolComponent__factory {
    return super.connect(signer) as BoolComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BoolComponentInterface {
    return new utils.Interface(_abi) as BoolComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BoolComponent {
    return new Contract(address, _abi, signerOrProvider) as BoolComponent;
  }
}
