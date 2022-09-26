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
  "0x6080604052604051610010906100a5565b604051809103906000f08015801561002c573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561006157600080fd5b50604051611b56380380611b56833981016040819052610080916100b2565b600080546001600160a01b0319166001600160a01b03929092169190911790556100e0565b6105298061162d83390190565b6000602082840312156100c3578081fd5b81516001600160a01b03811681146100d9578182fd5b9392505050565b61153e806100ef6000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c806378d9f34f11610076578063b361be461161005b578063b361be4614610165578063cccf7a8e14610178578063f94655da1461019b57600080fd5b806378d9f34f1461013c5780638b2829471461015257600080fd5b80634c518fdc116100a75780634c518fdc146101015780634cc8221514610114578063643719771461012957600080fd5b80630ff4c916146100c357806331b933b9146100ec575b600080fd5b6100d66100d1366004610cd7565b6101ae565b6040516100e39190610ecb565b60405180910390f35b6100f46101d2565b6040516100e39190610e47565b6100d661010f366004610cd7565b610271565b610127610122366004610cd7565b610313565b005b610127610137366004610d34565b610439565b610144610462565b6040516100e3929190610e5a565b610127610160366004610cef565b61066a565b6100f4610173366004610c29565b6108a7565b61018b610186366004610cd7565b61096d565b60405190151581526020016100e3565b6100f46101a9366004610c29565b610a03565b60606101b982610271565b8060200190518101906101cc9190610c64565b92915050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561023057600080fd5b505afa158015610244573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261026c9190810190610b61565b905090565b600081815260026020526040902080546060919061028e90610f67565b80601f01602080910402602001604051908101604052809291908181526020018280546102ba90610f67565b80156103075780601f106102dc57610100808354040283529160200191610307565b820191906000526020600020905b8154815290600101906020018083116102ea57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561035957600080fd5b505af115801561036d573d6000803e3d6000fd5b5050506000828152600260205260408082209051919250600391839161039291610dac565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461041e57604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561040557600080fd5b505af1158015610419573d6000803e3d6000fd5b505050505b600082815260026020526040812061043591610a2d565b5050565b610435828260405160200161044e9190610ecb565b60405160208183030381529060405261066a565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156104b557600080fd5b505afa1580156104c9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104f19190810190610b61565b90506000815167ffffffffffffffff81111561051d57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561055057816020015b606081526020019060019003908161053b5790505b50905060005b8251811015610660576002600084838151811061058357634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002080546105a490610f67565b80601f01602080910402602001604051908101604052809291908181526020018280546105d090610f67565b801561061d5780601f106105f25761010080835404028352916020019161061d565b820191906000526020600020905b81548152906001019060200180831161060057829003601f168201915b505050505082828151811061064257634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061065890610fa2565b915050610556565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106b057600080fd5b505af11580156106c4573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916106e991610dac565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461077557604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561075c57600080fd5b505af1158015610770573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161079492850190610a6a565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b0391821691161415610836576040516107d490610aee565b604051809103906000f0801580156107f0573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561088957600080fd5b505af115801561089d573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260409020546004546060916001600160a01b0390811691168114156108f1575050604080516000815260208101909152919050565b806001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561092a57600080fd5b505afa15801561093e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109669190810190610b61565b9392505050565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b1580156109cb57600080fd5b505afa1580156109df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101cc9190610c09565b60606101cc82604051602001610a199190610ecb565b6040516020818303038152906040526108a7565b508054610a3990610f67565b6000825580601f10610a49575050565b601f016020900490600052602060002090810190610a679190610afb565b50565b828054610a7690610f67565b90600052602060002090601f016020900481019282610a985760008555610ade565b82601f10610ab157805160ff1916838001178555610ade565b82800160010185558215610ade579182015b82811115610ade578251825591602001919060010190610ac3565b50610aea929150610afb565b5090565b61052980610fe083390190565b5b80821115610aea5760008155600101610afc565b600082601f830112610b20578081fd5b8135610b33610b2e82610f0f565b610ede565b818152846020838601011115610b47578283fd5b816020850160208301379081016020019190915292915050565b60006020808385031215610b73578182fd5b825167ffffffffffffffff80821115610b8a578384fd5b818501915085601f830112610b9d578384fd5b815181811115610baf57610baf610fc9565b8060051b9150610bc0848301610ede565b8181528481019084860184860187018a1015610bda578788fd5b8795505b83861015610bfc578051835260019590950194918601918601610bde565b5098975050505050505050565b600060208284031215610c1a578081fd5b81518015158114610966578182fd5b600060208284031215610c3a578081fd5b813567ffffffffffffffff811115610c50578182fd5b610c5c84828501610b10565b949350505050565b600060208284031215610c75578081fd5b815167ffffffffffffffff811115610c8b578182fd5b8201601f81018413610c9b578182fd5b8051610ca9610b2e82610f0f565b818152856020838501011115610cbd578384fd5b610cce826020830160208601610f37565b95945050505050565b600060208284031215610ce8578081fd5b5035919050565b60008060408385031215610d01578081fd5b82359150602083013567ffffffffffffffff811115610d1e578182fd5b610d2a85828601610b10565b9150509250929050565b60008060408385031215610d01578182fd5b6000815180845260208085019450808401835b83811015610d7557815187529582019590820190600101610d59565b509495945050505050565b60008151808452610d98816020860160208601610f37565b601f01601f19169290920160200192915050565b600080835482600182811c915080831680610dc857607f831692505b6020808410821415610de857634e487b7160e01b87526022600452602487fd5b818015610dfc5760018114610e0d57610e39565b60ff19861689528489019650610e39565b60008a815260209020885b86811015610e315781548b820152908501908301610e18565b505084890196505b509498975050505050505050565b6020815260006109666020830184610d46565b604081526000610e6d6040830185610d46565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610ebc57601f19878403018552610eaa838351610d80565b94860194925090850190600101610e8e565b50909998505050505050505050565b6020815260006109666020830184610d80565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f0757610f07610fc9565b604052919050565b600067ffffffffffffffff821115610f2957610f29610fc9565b50601f01601f191660200190565b60005b83811015610f52578181015183820152602001610f3a565b83811115610f61576000848401525b50505050565b600181811c90821680610f7b57607f821691505b60208210811415610f9c57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610fc257634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033a264697066735822122003534732f1150f0258e6dae97c1f2d7ca41368a3d6b6bd56c9edb12df7dc26c264736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033";

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
