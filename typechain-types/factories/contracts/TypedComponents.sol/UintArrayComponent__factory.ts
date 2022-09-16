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
  "0x6080604052604051610010906100a5565b604051809103906000f08015801561002c573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561006157600080fd5b50604051611b9a380380611b9a833981016040819052610080916100b2565b600080546001600160a01b0319166001600160a01b03929092169190911790556100e0565b6105298061167183390190565b6000602082840312156100c3578081fd5b81516001600160a01b03811681146100d9578182fd5b9392505050565b611582806100ef6000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80638b28294711610076578063963e9eb01161005b578063963e9eb014610165578063b361be4614610178578063cccf7a8e1461018b57600080fd5b80638b2829471461013f578063946aadc61461015257600080fd5b80634c518fdc116100a75780634c518fdc146100f45780634cc822151461011457806378d9f34f1461012957600080fd5b80630ff4c916146100c357806331b933b9146100ec575b600080fd5b6100d66100d1366004610d07565b6101ae565b6040516100e39190610ebf565b60405180910390f35b6100d66101d2565b610107610102366004610d07565b610271565b6040516100e39190610f43565b610127610122366004610d07565b610313565b005b610131610439565b6040516100e3929190610ed2565b61012761014d366004610d64565b610641565b610127610160366004610d1f565b61087e565b6100d6610173366004610be6565b6108a7565b6100d6610186366004610cd4565b6108cd565b61019e610199366004610d07565b610993565b60405190151581526020016100e3565b60606101b982610271565b8060200190518101906101cc9190610c21565b92915050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561023057600080fd5b505afa158015610244573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261026c9190810190610c21565b905090565b600081815260026020526040902080546060919061028e90610fab565b80601f01602080910402602001604051908101604052809291908181526020018280546102ba90610fab565b80156103075780601f106102dc57610100808354040283529160200191610307565b820191906000526020600020905b8154815290600101906020018083116102ea57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561035957600080fd5b505af115801561036d573d6000803e3d6000fd5b5050506000828152600260205260408082209051919250600391839161039291610e24565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461041e57604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561040557600080fd5b505af1158015610419573d6000803e3d6000fd5b505050505b600082815260026020526040812061043591610a29565b5050565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561048c57600080fd5b505afa1580156104a0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104c89190810190610c21565b90506000815167ffffffffffffffff8111156104f457634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561052757816020015b60608152602001906001900390816105125790505b50905060005b8251811015610637576002600084838151811061055a57634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020805461057b90610fab565b80601f01602080910402602001604051908101604052809291908181526020018280546105a790610fab565b80156105f45780601f106105c9576101008083540402835291602001916105f4565b820191906000526020600020905b8154815290600101906020018083116105d757829003601f168201915b505050505082828151811061061957634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061062f90610fe6565b91505061052d565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561068757600080fd5b505af115801561069b573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916106c091610e24565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461074c57604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561073357600080fd5b505af1158015610747573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161076b92850190610a66565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b039182169116141561080d576040516107ab90610aea565b604051809103906000f0801580156107c7573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561086057600080fd5b505af1158015610874573d6000803e3d6000fd5b5050505050505050565b61043582826040516020016108939190610ebf565b604051602081830303815290604052610641565b60606101cc826040516020016108bd9190610ebf565b6040516020818303038152906040525b80516020808301919091206000908152600390915260409020546004546060916001600160a01b039081169116811415610917575050604080516000815260208101909152919050565b806001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561095057600080fd5b505afa158015610964573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261098c9190810190610c21565b9392505050565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b1580156109f157600080fd5b505afa158015610a05573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101cc9190610cb4565b508054610a3590610fab565b6000825580601f10610a45575050565b601f016020900490600052602060002090810190610a639190610af7565b50565b828054610a7290610fab565b90600052602060002090601f016020900481019282610a945760008555610ada565b82601f10610aad57805160ff1916838001178555610ada565b82800160010185558215610ada579182015b82811115610ada578251825591602001919060010190610abf565b50610ae6929150610af7565b5090565b6105298061102483390190565b5b80821115610ae65760008155600101610af8565b600082601f830112610b1c578081fd5b81356020610b31610b2c83610f87565b610f56565b80838252828201915082860187848660051b8901011115610b50578586fd5b855b85811015610b6e57813584529284019290840190600101610b52565b5090979650505050505050565b600082601f830112610b8b578081fd5b813567ffffffffffffffff811115610ba557610ba561100d565b610bb8601f8201601f1916602001610f56565b818152846020838601011115610bcc578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215610bf7578081fd5b813567ffffffffffffffff811115610c0d578182fd5b610c1984828501610b0c565b949350505050565b60006020808385031215610c33578182fd5b825167ffffffffffffffff811115610c49578283fd5b8301601f81018513610c59578283fd5b8051610c67610b2c82610f87565b80828252848201915084840188868560051b8701011115610c86578687fd5b8694505b83851015610ca8578051835260019490940193918501918501610c8a565b50979650505050505050565b600060208284031215610cc5578081fd5b8151801515811461098c578182fd5b600060208284031215610ce5578081fd5b813567ffffffffffffffff811115610cfb578182fd5b610c1984828501610b7b565b600060208284031215610d18578081fd5b5035919050565b60008060408385031215610d31578081fd5b82359150602083013567ffffffffffffffff811115610d4e578182fd5b610d5a85828601610b0c565b9150509250929050565b60008060408385031215610d76578182fd5b82359150602083013567ffffffffffffffff811115610d93578182fd5b610d5a85828601610b7b565b6000815180845260208085019450808401835b83811015610dce57815187529582019590820190600101610db2565b509495945050505050565b60008151808452815b81811015610dfe57602081850181015186830182015201610de2565b81811115610e0f5782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610e4057607f831692505b6020808410821415610e6057634e487b7160e01b87526022600452602487fd5b818015610e745760018114610e8557610eb1565b60ff19861689528489019650610eb1565b60008a815260209020885b86811015610ea95781548b820152908501908301610e90565b505084890196505b509498975050505050505050565b60208152600061098c6020830184610d9f565b604081526000610ee56040830185610d9f565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610f3457601f19878403018552610f22838351610dd9565b94860194925090850190600101610f06565b50909998505050505050505050565b60208152600061098c6020830184610dd9565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f7f57610f7f61100d565b604052919050565b600067ffffffffffffffff821115610fa157610fa161100d565b5060051b60200190565b600181811c90821680610fbf57607f821691505b60208210811415610fe057634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561100657634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220be6db9429a0123b5a08713632699b2afa42b1202fdc2c3e34a30a5ecf524af8164736f6c63430008040033a2646970667358221220ab979cf893bcc1a16a7b699635458987a6629aa2a44c0bdbc530dafaeec65ae464736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220be6db9429a0123b5a08713632699b2afa42b1202fdc2c3e34a30a5ecf524af8164736f6c63430008040033";

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
