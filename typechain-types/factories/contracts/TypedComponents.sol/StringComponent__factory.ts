/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  StringComponent,
  StringComponentInterface,
} from "../../../contracts/TypedComponents.sol/StringComponent";

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
        internalType: "string",
        name: "_value",
        type: "string",
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
        internalType: "string",
        name: "",
        type: "string",
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
        internalType: "string",
        name: "_value",
        type: "string",
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
  "0x60a0604052604051610010906100de565b604051809103906000f08015801561002c573d6000803e3d6000fd5b5060601b6001600160601b031916608052604051610049906100de565b604051809103906000f080158015610065573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009a57600080fd5b50604051611c09380380611c098339810160408190526100b9916100eb565b600080546001600160a01b0319166001600160a01b0392909216919091179055610119565b610529806116e083390190565b6000602082840312156100fc578081fd5b81516001600160a01b0381168114610112578182fd5b9392505050565b60805160601c6115a9610137600039600061092d01526115a96000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80638b28294711610081578063b361be461161005b578063b361be46146101b7578063cccf7a8e146101ca578063f94655da146101ed57600080fd5b80638b282947146101685780639933adfd1461017b578063a1d8509f146101a657600080fd5b80634cc82215116100b25780634cc822151461012a578063643719771461013f57806378d9f34f1461015257600080fd5b80630ff4c916146100d957806331b933b9146101025780634c518fdc14610117575b600080fd5b6100ec6100e7366004610d42565b610200565b6040516100f99190610f36565b60405180910390f35b61010a610224565b6040516100f99190610eb2565b6100ec610125366004610d42565b6102c3565b61013d610138366004610d42565b610365565b005b61013d61014d366004610d9f565b61048b565b61015a6104b4565b6040516100f9929190610ec5565b61013d610176366004610d5a565b6106bc565b61018e610189366004610c94565b6108f9565b6040516001600160a01b0390911681526020016100f9565b6001546001600160a01b031661018e565b61010a6101c5366004610c94565b610952565b6101dd6101d8366004610d42565b6109d1565b60405190151581526020016100f9565b61010a6101fb366004610c94565b610a67565b606061020b826102c3565b80602001905181019061021e9190610ccf565b92915050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561028257600080fd5b505afa158015610296573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102be9190810190610bc5565b905090565b60008181526002602052604090208054606091906102e090610fd2565b80601f016020809104026020016040519081016040528092919081815260200182805461030c90610fd2565b80156103595780601f1061032e57610100808354040283529160200191610359565b820191906000526020600020905b81548152906001019060200180831161033c57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b1580156103ab57600080fd5b505af11580156103bf573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103e491610e17565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461047057604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561045757600080fd5b505af115801561046b573d6000803e3d6000fd5b505050505b600082815260026020526040812061048791610a91565b5050565b61048782826040516020016104a09190610f36565b6040516020818303038152906040526106bc565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561050757600080fd5b505afa15801561051b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105439190810190610bc5565b90506000815167ffffffffffffffff81111561056f57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156105a257816020015b606081526020019060019003908161058d5790505b50905060005b82518110156106b257600260008483815181106105d557634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002080546105f690610fd2565b80601f016020809104026020016040519081016040528092919081815260200182805461062290610fd2565b801561066f5780601f106106445761010080835404028352916020019161066f565b820191906000526020600020905b81548152906001019060200180831161065257829003601f168201915b505050505082828151811061069457634e487b7160e01b600052603260045260246000fd5b602002602001018190525080806106aa9061100d565b9150506105a8565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561070257600080fd5b505af1158015610716573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161073b91610e17565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146107c757604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156107ae57600080fd5b505af11580156107c2573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516107e692850190610ace565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b03918216911614156108885760405161082690610b52565b604051809103906000f080158015610842573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156108db57600080fd5b505af11580156108ef573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b03918216911681141561021e57507f000000000000000000000000000000000000000000000000000000000000000092915050565b606061095d826108f9565b6001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561099557600080fd5b505afa1580156109a9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261021e9190810190610bc5565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b158015610a2f57600080fd5b505afa158015610a43573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021e9190610c6d565b606061021e82604051602001610a7d9190610f36565b604051602081830303815290604052610952565b508054610a9d90610fd2565b6000825580601f10610aad575050565b601f016020900490600052602060002090810190610acb9190610b5f565b50565b828054610ada90610fd2565b90600052602060002090601f016020900481019282610afc5760008555610b42565b82601f10610b1557805160ff1916838001178555610b42565b82800160010185558215610b42579182015b82811115610b42578251825591602001919060010190610b27565b50610b4e929150610b5f565b5090565b6105298061104b83390190565b5b80821115610b4e5760008155600101610b60565b600082601f830112610b84578081fd5b8135610b97610b9282610f7a565b610f49565b818152846020838601011115610bab578283fd5b816020850160208301379081016020019190915292915050565b60006020808385031215610bd7578182fd5b825167ffffffffffffffff80821115610bee578384fd5b818501915085601f830112610c01578384fd5b815181811115610c1357610c13611034565b8060051b9150610c24848301610f49565b8181528481019084860184860187018a1015610c3e578788fd5b8795505b83861015610c60578051835260019590950194918601918601610c42565b5098975050505050505050565b600060208284031215610c7e578081fd5b81518015158114610c8d578182fd5b9392505050565b600060208284031215610ca5578081fd5b813567ffffffffffffffff811115610cbb578182fd5b610cc784828501610b74565b949350505050565b600060208284031215610ce0578081fd5b815167ffffffffffffffff811115610cf6578182fd5b8201601f81018413610d06578182fd5b8051610d14610b9282610f7a565b818152856020838501011115610d28578384fd5b610d39826020830160208601610fa2565b95945050505050565b600060208284031215610d53578081fd5b5035919050565b60008060408385031215610d6c578081fd5b82359150602083013567ffffffffffffffff811115610d89578182fd5b610d9585828601610b74565b9150509250929050565b60008060408385031215610d6c578182fd5b6000815180845260208085019450808401835b83811015610de057815187529582019590820190600101610dc4565b509495945050505050565b60008151808452610e03816020860160208601610fa2565b601f01601f19169290920160200192915050565b600080835482600182811c915080831680610e3357607f831692505b6020808410821415610e5357634e487b7160e01b87526022600452602487fd5b818015610e675760018114610e7857610ea4565b60ff19861689528489019650610ea4565b60008a815260209020885b86811015610e9c5781548b820152908501908301610e83565b505084890196505b509498975050505050505050565b602081526000610c8d6020830184610db1565b604081526000610ed86040830185610db1565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610f2757601f19878403018552610f15838351610deb565b94860194925090850190600101610ef9565b50909998505050505050505050565b602081526000610c8d6020830184610deb565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f7257610f72611034565b604052919050565b600067ffffffffffffffff821115610f9457610f94611034565b50601f01601f191660200190565b60005b83811015610fbd578181015183820152602001610fa5565b83811115610fcc576000848401525b50505050565b600181811c90821680610fe657607f821691505b6020821081141561100757634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561102d57634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033a26469706673582212207cbc349aee9c6089dec492b8302e3df0881e4decf62014c4e1a0c96473a795df64736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033";

type StringComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StringComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StringComponent__factory extends ContractFactory {
  constructor(...args: StringComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StringComponent> {
    return super.deploy(_gameAddr, overrides || {}) as Promise<StringComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): StringComponent {
    return super.attach(address) as StringComponent;
  }
  override connect(signer: Signer): StringComponent__factory {
    return super.connect(signer) as StringComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StringComponentInterface {
    return new utils.Interface(_abi) as StringComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StringComponent {
    return new Contract(address, _abi, signerOrProvider) as StringComponent;
  }
}
