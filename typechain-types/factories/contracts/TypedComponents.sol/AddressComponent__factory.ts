/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  AddressComponent,
  AddressComponentInterface,
} from "../../../contracts/TypedComponents.sol/AddressComponent";

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
        internalType: "address",
        name: "_value",
        type: "address",
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
        internalType: "address",
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
        internalType: "address",
        name: "_value",
        type: "address",
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
  "0x60a0604052604051610010906100de565b604051809103906000f08015801561002c573d6000803e3d6000fd5b5060601b6001600160601b031916608052604051610049906100de565b604051809103906000f080158015610065573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009a57600080fd5b50604051611be7380380611be78339810160408190526100b9916100eb565b600080546001600160a01b0319166001600160a01b0392909216919091179055610119565b610529806116be83390190565b6000602082840312156100fc578081fd5b81516001600160a01b0381168114610112578182fd5b9392505050565b60805160601c611587610137600039600061095d01526115876000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806378d9f34f11610081578063a1d8509f1161005b578063a1d8509f146101b5578063b361be46146101c6578063cccf7a8e146101d957600080fd5b806378d9f34f146101795780638b2829471461018f5780639933adfd146101a257600080fd5b80633e1b5e0d116100b25780633e1b5e0d146101335780634c518fdc146101465780634cc822151461016657600080fd5b80630ff4c916146100d95780632f30c6f61461010957806331b933b91461011e575b600080fd5b6100ec6100e7366004610d27565b6101fc565b6040516001600160a01b0390911681526020015b60405180910390f35b61011c610117366004610d3f565b610220565b005b610126610252565b6040516101009190610ed3565b610126610141366004610be5565b6102f1565b610159610154366004610d27565b610320565b6040516101009190610f57565b61011c610174366004610d27565b6103c2565b6101816104e4565b604051610100929190610ee6565b61011c61019d366004610d6e565b6106ec565b6100ec6101b0366004610cec565b610929565b6001546001600160a01b03166100ec565b6101266101d4366004610cec565b610982565b6101ec6101e7366004610d27565b610a01565b6040519015158152602001610100565b600061020782610320565b80602001905181019061021a9190610c08565b92915050565b604080516001600160a01b038316602082015261024e918491016040516020818303038152906040526106ec565b5050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b1580156102b057600080fd5b505afa1580156102c4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102ec9190810190610c24565b905090565b604080516001600160a01b038316602082015260609161021a9101604051602081830303815290604052610982565b600081815260026020526040902080546060919061033d90610f9b565b80601f016020809104026020016040519081016040528092919081815260200182805461036990610f9b565b80156103b65780601f1061038b576101008083540402835291602001916103b6565b820191906000526020600020905b81548152906001019060200180831161039957829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561040857600080fd5b505af115801561041c573d6000803e3d6000fd5b5050506000828152600260205260408082209051919250600391839161044191610e38565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146104cd57604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156104b457600080fd5b505af11580156104c8573d6000803e3d6000fd5b505050505b600082815260026020526040812061024e91610a97565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561053757600080fd5b505afa15801561054b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105739190810190610c24565b90506000815167ffffffffffffffff81111561059f57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156105d257816020015b60608152602001906001900390816105bd5790505b50905060005b82518110156106e2576002600084838151811061060557634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020805461062690610f9b565b80601f016020809104026020016040519081016040528092919081815260200182805461065290610f9b565b801561069f5780601f106106745761010080835404028352916020019161069f565b820191906000526020600020905b81548152906001019060200180831161068257829003601f168201915b50505050508282815181106106c457634e487b7160e01b600052603260045260246000fd5b602002602001018190525080806106da90610fd6565b9150506105d8565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561073257600080fd5b505af1158015610746573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161076b91610e38565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146107f757604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156107de57600080fd5b505af11580156107f2573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161081692850190610ad4565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b03918216911614156108b85760405161085690610b58565b604051809103906000f080158015610872573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561090b57600080fd5b505af115801561091f573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b03918216911681141561021a57507f000000000000000000000000000000000000000000000000000000000000000092915050565b606061098d82610929565b6001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156109c557600080fd5b505afa1580156109d9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261021a9190810190610c24565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b158015610a5f57600080fd5b505afa158015610a73573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021a9190610ccc565b508054610aa390610f9b565b6000825580601f10610ab3575050565b601f016020900490600052602060002090810190610ad19190610b65565b50565b828054610ae090610f9b565b90600052602060002090601f016020900481019282610b025760008555610b48565b82601f10610b1b57805160ff1916838001178555610b48565b82800160010185558215610b48579182015b82811115610b48578251825591602001919060010190610b2d565b50610b54929150610b65565b5090565b6105298061102983390190565b5b80821115610b545760008155600101610b66565b600082601f830112610b8a578081fd5b813567ffffffffffffffff811115610ba457610ba4610ffd565b610bb7601f8201601f1916602001610f6a565b818152846020838601011115610bcb578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215610bf6578081fd5b8135610c0181611013565b9392505050565b600060208284031215610c19578081fd5b8151610c0181611013565b60006020808385031215610c36578182fd5b825167ffffffffffffffff80821115610c4d578384fd5b818501915085601f830112610c60578384fd5b815181811115610c7257610c72610ffd565b8060051b9150610c83848301610f6a565b8181528481019084860184860187018a1015610c9d578788fd5b8795505b83861015610cbf578051835260019590950194918601918601610ca1565b5098975050505050505050565b600060208284031215610cdd578081fd5b81518015158114610c01578182fd5b600060208284031215610cfd578081fd5b813567ffffffffffffffff811115610d13578182fd5b610d1f84828501610b7a565b949350505050565b600060208284031215610d38578081fd5b5035919050565b60008060408385031215610d51578081fd5b823591506020830135610d6381611013565b809150509250929050565b60008060408385031215610d80578182fd5b82359150602083013567ffffffffffffffff811115610d9d578182fd5b610da985828601610b7a565b9150509250929050565b6000815180845260208085019450808401835b83811015610de257815187529582019590820190600101610dc6565b509495945050505050565b60008151808452815b81811015610e1257602081850181015186830182015201610df6565b81811115610e235782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610e5457607f831692505b6020808410821415610e7457634e487b7160e01b87526022600452602487fd5b818015610e885760018114610e9957610ec5565b60ff19861689528489019650610ec5565b60008a815260209020885b86811015610ebd5781548b820152908501908301610ea4565b505084890196505b509498975050505050505050565b602081526000610c016020830184610db3565b604081526000610ef96040830185610db3565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610f4857601f19878403018552610f36838351610ded565b94860194925090850190600101610f1a565b50909998505050505050505050565b602081526000610c016020830184610ded565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f9357610f93610ffd565b604052919050565b600181811c90821680610faf57607f821691505b60208210811415610fd057634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610ff657634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610ad157600080fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033a2646970667358221220d21e4a91272beab134d389d7dd92b003e3c4b07f3e930f9431191cc11b5abe1364736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033";

type AddressComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AddressComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AddressComponent__factory extends ContractFactory {
  constructor(...args: AddressComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AddressComponent> {
    return super.deploy(
      _gameAddr,
      overrides || {}
    ) as Promise<AddressComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): AddressComponent {
    return super.attach(address) as AddressComponent;
  }
  override connect(signer: Signer): AddressComponent__factory {
    return super.connect(signer) as AddressComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AddressComponentInterface {
    return new utils.Interface(_abi) as AddressComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AddressComponent {
    return new Contract(address, _abi, signerOrProvider) as AddressComponent;
  }
}
