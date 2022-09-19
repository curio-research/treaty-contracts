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
  "0x6080604052604051610010906100a5565b604051809103906000f08015801561002c573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561006157600080fd5b50604051611aba380380611aba833981016040819052610080916100b2565b600080546001600160a01b0319166001600160a01b03929092169190911790556100e0565b6105298061159183390190565b6000602082840312156100c3578081fd5b81516001600160a01b03811681146100d9578182fd5b9392505050565b6114a2806100ef6000396000f3fe608060405234801561001057600080fd5b50600436106100bd5760003560e01c806360fe47b1116100765780638b2829471161005b5780638b28294714610174578063b361be4614610187578063cccf7a8e1461019a57600080fd5b806360fe47b11461014b57806378d9f34f1461015e57600080fd5b806331b933b9116100a757806331b933b91461010e5780634c518fdc146101165780634cc822151461013657600080fd5b80621326ab146100c25780630ff4c916146100eb575b600080fd5b6100d56100d0366004610c05565b6101ad565b6040516100e29190610df5565b60405180910390f35b6100fe6100f9366004610c78565b6101d6565b60405190151581526020016100e2565b6100d56101e1565b610129610124366004610c78565b610280565b6040516100e29190610e79565b610149610144366004610c78565b610322565b005b610149610159366004610c78565b610448565b610166610471565b6040516100e2929190610e08565b610149610182366004610c90565b610679565b6100d5610195366004610c3d565b6108b6565b6100fe6101a8366004610c78565b61097c565b6060816101c8576040805160008152602081019091526101d0565b6101d06101e1565b92915050565b60006101d08261097c565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561023f57600080fd5b505afa158015610253573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261027b9190810190610b5d565b905090565b600081815260026020526040902080546060919061029d90610ebd565b80601f01602080910402602001604051908101604052809291908181526020018280546102c990610ebd565b80156103165780601f106102eb57610100808354040283529160200191610316565b820191906000526020600020905b8154815290600101906020018083116102f957829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561036857600080fd5b505af115801561037c573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103a191610d5a565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461042d57604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561041457600080fd5b505af1158015610428573d6000803e3d6000fd5b505050505b600082815260026020526040812061044491610a12565b5050565b604080516001602082015261046e91839101604051602081830303815290604052610679565b50565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156104c457600080fd5b505afa1580156104d8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105009190810190610b5d565b90506000815167ffffffffffffffff81111561052c57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561055f57816020015b606081526020019060019003908161054a5790505b50905060005b825181101561066f576002600084838151811061059257634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002080546105b390610ebd565b80601f01602080910402602001604051908101604052809291908181526020018280546105df90610ebd565b801561062c5780601f106106015761010080835404028352916020019161062c565b820191906000526020600020905b81548152906001019060200180831161060f57829003601f168201915b505050505082828151811061065157634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061066790610ef8565b915050610565565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106bf57600080fd5b505af11580156106d3573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916106f891610d5a565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461078457604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561076b57600080fd5b505af115801561077f573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516107a392850190610a4c565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b0391821691161415610845576040516107e390610ad0565b604051809103906000f0801580156107ff573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561089857600080fd5b505af11580156108ac573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260409020546004546060916001600160a01b039081169116811415610900575050604080516000815260208101909152919050565b806001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561093957600080fd5b505afa15801561094d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109759190810190610b5d565b9392505050565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b1580156109da57600080fd5b505afa1580156109ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d09190610c21565b508054610a1e90610ebd565b6000825580601f10610a2e575050565b601f01602090049060005260206000209081019061046e9190610add565b828054610a5890610ebd565b90600052602060002090601f016020900481019282610a7a5760008555610ac0565b82601f10610a9357805160ff1916838001178555610ac0565b82800160010185558215610ac0579182015b82811115610ac0578251825591602001919060010190610aa5565b50610acc929150610add565b5090565b61052980610f4483390190565b5b80821115610acc5760008155600101610ade565b600082601f830112610b02578081fd5b813567ffffffffffffffff811115610b1c57610b1c610f1f565b610b2f601f8201601f1916602001610e8c565b818152846020838601011115610b43578283fd5b816020850160208301379081016020019190915292915050565b60006020808385031215610b6f578182fd5b825167ffffffffffffffff80821115610b86578384fd5b818501915085601f830112610b99578384fd5b815181811115610bab57610bab610f1f565b8060051b9150610bbc848301610e8c565b8181528481019084860184860187018a1015610bd6578788fd5b8795505b83861015610bf8578051835260019590950194918601918601610bda565b5098975050505050505050565b600060208284031215610c16578081fd5b813561097581610f35565b600060208284031215610c32578081fd5b815161097581610f35565b600060208284031215610c4e578081fd5b813567ffffffffffffffff811115610c64578182fd5b610c7084828501610af2565b949350505050565b600060208284031215610c89578081fd5b5035919050565b60008060408385031215610ca2578081fd5b82359150602083013567ffffffffffffffff811115610cbf578182fd5b610ccb85828601610af2565b9150509250929050565b6000815180845260208085019450808401835b83811015610d0457815187529582019590820190600101610ce8565b509495945050505050565b60008151808452815b81811015610d3457602081850181015186830182015201610d18565b81811115610d455782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610d7657607f831692505b6020808410821415610d9657634e487b7160e01b87526022600452602487fd5b818015610daa5760018114610dbb57610de7565b60ff19861689528489019650610de7565b60008a815260209020885b86811015610ddf5781548b820152908501908301610dc6565b505084890196505b509498975050505050505050565b6020815260006109756020830184610cd5565b604081526000610e1b6040830185610cd5565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610e6a57601f19878403018552610e58838351610d0f565b94860194925090850190600101610e3c565b50909998505050505050505050565b6020815260006109756020830184610d0f565b604051601f8201601f1916810167ffffffffffffffff81118282101715610eb557610eb5610f1f565b604052919050565b600181811c90821680610ed157607f821691505b60208210811415610ef257634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610f1857634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b801515811461046e57600080fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea264697066735822122098248c63fb12ef34067195c12668f1792cd13f190f3d3001757a83d4bcb4fa6f64736f6c63430008040033a2646970667358221220c9f00c09597c8bf06966321da40fb56b3a97386c8cbac6808ea0e378a3d3b44464736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea264697066735822122098248c63fb12ef34067195c12668f1792cd13f190f3d3001757a83d4bcb4fa6f64736f6c63430008040033";

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
