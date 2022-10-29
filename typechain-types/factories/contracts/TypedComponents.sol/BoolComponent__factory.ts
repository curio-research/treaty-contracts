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
  "0x60a0604052604051610010906100de565b604051809103906000f08015801561002c573d6000803e3d6000fd5b5060601b6001600160601b031916608052604051610049906100de565b604051809103906000f080158015610065573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009a57600080fd5b50604051611c03380380611c038339810160408190526100b9916100eb565b600080546001600160a01b0319166001600160a01b0392909216919091179055610119565b610529806116da83390190565b6000602082840312156100fc578081fd5b81516001600160a01b0381168114610112578182fd5b9392505050565b60805160601c6115a361013760003960006109d201526115a36000f3fe608060405234801561001057600080fd5b50600436106100d35760003560e01c806378d9f34f11610081578063a1d8509f1161005b578063a1d8509f146101c8578063b361be46146101d9578063cccf7a8e146101ec57600080fd5b806378d9f34f146101745780638b2829471461018a5780639933adfd1461019d57600080fd5b80634c518fdc116100b25780634c518fdc1461012c5780634cc822151461014c57806360fe47b11461016157600080fd5b80621326ab146100d85780630ff4c9161461010157806331b933b914610124575b600080fd5b6100eb6100e6366004610cff565b6101ff565b6040516100f89190610ef6565b60405180910390f35b61011461010f366004610d79565b610228565b60405190151581526020016100f8565b6100eb610233565b61013f61013a366004610d79565b6102d2565b6040516100f89190610f7a565b61015f61015a366004610d79565b61040a565b005b61015f61016f366004610d79565b610530565b61017c610559565b6040516100f8929190610f09565b61015f610198366004610d91565b610761565b6101b06101ab366004610d3e565b61099e565b6040516001600160a01b0390911681526020016100f8565b6001546001600160a01b03166101b0565b6100eb6101e7366004610d3e565b6109f7565b6101146101fa366004610d79565b610a76565b60608161021a57604080516000815260208101909152610222565b610222610233565b92915050565b600061022282610a76565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561029157600080fd5b505afa1580156102a5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102cd9190810190610c57565b905090565b60606102dd82610a76565b61036c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f435552494f3a20456e74697479206e6f7420666f756e6420696e20636f6d706f60448201527f6e656e7400000000000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b6000828152600260205260409020805461038590610fbe565b80601f01602080910402602001604051908101604052809291908181526020018280546103b190610fbe565b80156103fe5780601f106103d3576101008083540402835291602001916103fe565b820191906000526020600020905b8154815290600101906020018083116103e157829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561045057600080fd5b505af1158015610464573d6000803e3d6000fd5b5050506000828152600260205260408082209051919250600391839161048991610e5b565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461051557604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156104fc57600080fd5b505af1158015610510573d6000803e3d6000fd5b505050505b600082815260026020526040812061052c91610b0c565b5050565b604080516001602082015261055691839101604051602081830303815290604052610761565b50565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156105ac57600080fd5b505afa1580156105c0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105e89190810190610c57565b90506000815167ffffffffffffffff81111561061457634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561064757816020015b60608152602001906001900390816106325790505b50905060005b8251811015610757576002600084838151811061067a57634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020805461069b90610fbe565b80601f01602080910402602001604051908101604052809291908181526020018280546106c790610fbe565b80156107145780601f106106e957610100808354040283529160200191610714565b820191906000526020600020905b8154815290600101906020018083116106f757829003601f168201915b505050505082828151811061073957634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061074f90610ff9565b91505061064d565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156107a757600080fd5b505af11580156107bb573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916107e091610e5b565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461086c57604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561085357600080fd5b505af1158015610867573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161088b92850190610b46565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b039182169116141561092d576040516108cb90610bca565b604051809103906000f0801580156108e7573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561098057600080fd5b505af1158015610994573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b03918216911681141561022257507f000000000000000000000000000000000000000000000000000000000000000092915050565b6060610a028261099e565b6001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b158015610a3a57600080fd5b505afa158015610a4e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102229190810190610c57565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b158015610ad457600080fd5b505afa158015610ae8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102229190610d22565b508054610b1890610fbe565b6000825580601f10610b28575050565b601f0160209004906000526020600020908101906105569190610bd7565b828054610b5290610fbe565b90600052602060002090601f016020900481019282610b745760008555610bba565b82601f10610b8d57805160ff1916838001178555610bba565b82800160010185558215610bba579182015b82811115610bba578251825591602001919060010190610b9f565b50610bc6929150610bd7565b5090565b6105298061104583390190565b5b80821115610bc65760008155600101610bd8565b600082601f830112610bfc578081fd5b813567ffffffffffffffff811115610c1657610c16611020565b610c29601f8201601f1916602001610f8d565b818152846020838601011115610c3d578283fd5b816020850160208301379081016020019190915292915050565b60006020808385031215610c69578182fd5b825167ffffffffffffffff80821115610c80578384fd5b818501915085601f830112610c93578384fd5b815181811115610ca557610ca5611020565b8060051b9150610cb6848301610f8d565b8181528481019084860184860187018a1015610cd0578788fd5b8795505b83861015610cf2578051835260019590950194918601918601610cd4565b5098975050505050505050565b600060208284031215610d10578081fd5b8135610d1b81611036565b9392505050565b600060208284031215610d33578081fd5b8151610d1b81611036565b600060208284031215610d4f578081fd5b813567ffffffffffffffff811115610d65578182fd5b610d7184828501610bec565b949350505050565b600060208284031215610d8a578081fd5b5035919050565b60008060408385031215610da3578081fd5b82359150602083013567ffffffffffffffff811115610dc0578182fd5b610dcc85828601610bec565b9150509250929050565b6000815180845260208085019450808401835b83811015610e0557815187529582019590820190600101610de9565b509495945050505050565b60008151808452815b81811015610e3557602081850181015186830182015201610e19565b81811115610e465782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610e7757607f831692505b6020808410821415610e9757634e487b7160e01b87526022600452602487fd5b818015610eab5760018114610ebc57610ee8565b60ff19861689528489019650610ee8565b60008a815260209020885b86811015610ee05781548b820152908501908301610ec7565b505084890196505b509498975050505050505050565b602081526000610d1b6020830184610dd6565b604081526000610f1c6040830185610dd6565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610f6b57601f19878403018552610f59838351610e10565b94860194925090850190600101610f3d565b50909998505050505050505050565b602081526000610d1b6020830184610e10565b604051601f8201601f1916810167ffffffffffffffff81118282101715610fb657610fb6611020565b604052919050565b600181811c90821680610fd257607f821691505b60208210811415610ff357634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561101957634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b801515811461055657600080fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033a2646970667358221220f4f9935af3b34180570b614c654a9373dbc8645e9f60445804a9c0004c03b9ff64736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033";

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
