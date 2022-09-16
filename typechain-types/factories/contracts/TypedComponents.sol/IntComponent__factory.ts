/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  IntComponent,
  IntComponentInterface,
} from "../../../contracts/TypedComponents.sol/IntComponent";

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
        internalType: "int256",
        name: "_value",
        type: "int256",
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
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getValue",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
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
        internalType: "int256",
        name: "_value",
        type: "int256",
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
  "0x6080604052604051610010906100a5565b604051809103906000f08015801561002c573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561006157600080fd5b50604051611af9380380611af9833981016040819052610080916100b2565b600080546001600160a01b0319166001600160a01b03929092169190911790556100e0565b610529806115d083390190565b6000602082840312156100c3578081fd5b81516001600160a01b03811681146100d9578182fd5b9392505050565b6114e1806100ef6000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c806378d9f34f11610076578063b361be461161005b578063b361be461461016f578063cccf7a8e14610182578063f4400d74146101a557600080fd5b806378d9f34f146101465780638b2829471461015c57600080fd5b806331b933b9116100a757806331b933b9146100fe5780634c518fdc146101135780634cc822151461013357600080fd5b80630ff4c916146100c3578063293e852e146100e9575b600080fd5b6100d66100d1366004610c8c565b6101b8565b6040519081526020015b60405180910390f35b6100fc6100f7366004610d01565b6101dc565b005b61010661020b565b6040516100e09190610e42565b610126610121366004610c8c565b6102aa565b6040516100e09190610ec6565b6100fc610141366004610c8c565b61034c565b61014e61046e565b6040516100e0929190610e55565b6100fc61016a366004610cbc565b610676565b61010661017d366004610c51565b6108b3565b610195610190366004610c8c565b610979565b60405190151581526020016100e0565b6101066101b3366004610c8c565b610a0f565b60006101c3826102aa565b8060200190518101906101d69190610ca4565b92915050565b61020782826040516020016101f391815260200190565b604051602081830303815290604052610676565b5050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561026957600080fd5b505afa15801561027d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102a59190810190610b89565b905090565b60008181526002602052604090208054606091906102c790610f0a565b80601f01602080910402602001604051908101604052809291908181526020018280546102f390610f0a565b80156103405780601f1061031557610100808354040283529160200191610340565b820191906000526020600020905b81548152906001019060200180831161032357829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561039257600080fd5b505af11580156103a6573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103cb91610da7565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461045757604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561043e57600080fd5b505af1158015610452573d6000803e3d6000fd5b505050505b600082815260026020526040812061020791610a3b565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156104c157600080fd5b505afa1580156104d5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104fd9190810190610b89565b90506000815167ffffffffffffffff81111561052957634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561055c57816020015b60608152602001906001900390816105475790505b50905060005b825181101561066c576002600084838151811061058f57634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002080546105b090610f0a565b80601f01602080910402602001604051908101604052809291908181526020018280546105dc90610f0a565b80156106295780601f106105fe57610100808354040283529160200191610629565b820191906000526020600020905b81548152906001019060200180831161060c57829003601f168201915b505050505082828151811061064e57634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061066490610f45565b915050610562565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106bc57600080fd5b505af11580156106d0573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916106f591610da7565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461078157604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561076857600080fd5b505af115801561077c573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516107a092850190610a78565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b0391821691161415610842576040516107e090610afc565b604051809103906000f0801580156107fc573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561089557600080fd5b505af11580156108a9573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260409020546004546060916001600160a01b0390811691168114156108fd575050604080516000815260208101909152919050565b806001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561093657600080fd5b505afa15801561094a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109729190810190610b89565b9392505050565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b1580156109d757600080fd5b505afa1580156109eb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d69190610c31565b60606101d682604051602001610a2791815260200190565b6040516020818303038152906040526108b3565b508054610a4790610f0a565b6000825580601f10610a57575050565b601f016020900490600052602060002090810190610a759190610b09565b50565b828054610a8490610f0a565b90600052602060002090601f016020900481019282610aa65760008555610aec565b82601f10610abf57805160ff1916838001178555610aec565b82800160010185558215610aec579182015b82811115610aec578251825591602001919060010190610ad1565b50610af8929150610b09565b5090565b61052980610f8383390190565b5b80821115610af85760008155600101610b0a565b600082601f830112610b2e578081fd5b813567ffffffffffffffff811115610b4857610b48610f6c565b610b5b601f8201601f1916602001610ed9565b818152846020838601011115610b6f578283fd5b816020850160208301379081016020019190915292915050565b60006020808385031215610b9b578182fd5b825167ffffffffffffffff80821115610bb2578384fd5b818501915085601f830112610bc5578384fd5b815181811115610bd757610bd7610f6c565b8060051b9150610be8848301610ed9565b8181528481019084860184860187018a1015610c02578788fd5b8795505b83861015610c24578051835260019590950194918601918601610c06565b5098975050505050505050565b600060208284031215610c42578081fd5b81518015158114610972578182fd5b600060208284031215610c62578081fd5b813567ffffffffffffffff811115610c78578182fd5b610c8484828501610b1e565b949350505050565b600060208284031215610c9d578081fd5b5035919050565b600060208284031215610cb5578081fd5b5051919050565b60008060408385031215610cce578081fd5b82359150602083013567ffffffffffffffff811115610ceb578182fd5b610cf785828601610b1e565b9150509250929050565b60008060408385031215610d13578182fd5b50508035926020909101359150565b6000815180845260208085019450808401835b83811015610d5157815187529582019590820190600101610d35565b509495945050505050565b60008151808452815b81811015610d8157602081850181015186830182015201610d65565b81811115610d925782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610dc357607f831692505b6020808410821415610de357634e487b7160e01b87526022600452602487fd5b818015610df75760018114610e0857610e34565b60ff19861689528489019650610e34565b60008a815260209020885b86811015610e2c5781548b820152908501908301610e13565b505084890196505b509498975050505050505050565b6020815260006109726020830184610d22565b604081526000610e686040830185610d22565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610eb757601f19878403018552610ea5838351610d5c565b94860194925090850190600101610e89565b50909998505050505050505050565b6020815260006109726020830184610d5c565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f0257610f02610f6c565b604052919050565b600181811c90821680610f1e57607f821691505b60208210811415610f3f57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610f6557634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220c85f9466bb0545ac683342f6120b333a9b77d46e3775aaec38e33695d4c9940e64736f6c63430008040033a264697066735822122090f444046ac8909f1731ee8ea42c1a13e11cbc193e3c6a8982ea7b3d451dae4164736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220c85f9466bb0545ac683342f6120b333a9b77d46e3775aaec38e33695d4c9940e64736f6c63430008040033";

type IntComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IntComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class IntComponent__factory extends ContractFactory {
  constructor(...args: IntComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<IntComponent> {
    return super.deploy(_gameAddr, overrides || {}) as Promise<IntComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): IntComponent {
    return super.attach(address) as IntComponent;
  }
  override connect(signer: Signer): IntComponent__factory {
    return super.connect(signer) as IntComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IntComponentInterface {
    return new utils.Interface(_abi) as IntComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IntComponent {
    return new Contract(address, _abi, signerOrProvider) as IntComponent;
  }
}
