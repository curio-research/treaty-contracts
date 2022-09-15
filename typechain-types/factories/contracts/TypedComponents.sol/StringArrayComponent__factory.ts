/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  StringArrayComponent,
  StringArrayComponentInterface,
} from "../../../contracts/TypedComponents.sol/StringArrayComponent";

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
        internalType: "string[]",
        name: "_value",
        type: "string[]",
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
        internalType: "string[]",
        name: "",
        type: "string[]",
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
        internalType: "string[]",
        name: "_value",
        type: "string[]",
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
  "0x6080604052604051610010906100a5565b604051809103906000f08015801561002c573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561006157600080fd5b50604051611d42380380611d42833981016040819052610080916100b2565b600080546001600160a01b0319166001600160a01b03929092169190911790556100e0565b6105298061181983390190565b6000602082840312156100c3578081fd5b81516001600160a01b03811681146100d9578182fd5b9392505050565b61172a806100ef6000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80634cc82215116100765780638b2829471161005b5780638b28294714610172578063b361be4614610185578063cccf7a8e1461019857600080fd5b80634cc822151461014957806378d9f34f1461015c57600080fd5b806331b933b9116100a757806331b933b91461010c5780633b972370146101145780634c518fdc1461012957600080fd5b80630ff4c916146100c3578063188a0220146100ec575b600080fd5b6100d66100d1366004610e24565b6101bb565b6040516100e39190610fbd565b60405180910390f35b6100ff6100fa366004610c1a565b6101df565b6040516100e3919061101e565b6100ff610209565b610127610122366004610e3c565b6102a8565b005b61013c610137366004610e24565b6102d5565b6040516100e39190611093565b610127610157366004610e24565b610377565b610164610499565b6040516100e3929190611031565b610127610180366004610e81565b6106a1565b6100ff610193366004610df1565b6108de565b6101ab6101a6366004610e24565b6109a4565b60405190151581526020016100e3565b60606101c6826102d5565b8060200190518101906101d99190610c55565b92915050565b60606101d9826040516020016101f59190610fbd565b6040516020818303038152906040526108de565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561026757600080fd5b505afa15801561027b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102a39190810190610d3e565b905090565b6102d182826040516020016102bd9190610fbd565b6040516020818303038152906040526106a1565b5050565b60008181526002602052604090208054606091906102f290611153565b80601f016020809104026020016040519081016040528092919081815260200182805461031e90611153565b801561036b5780601f106103405761010080835404028352916020019161036b565b820191906000526020600020905b81548152906001019060200180831161034e57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b1580156103bd57600080fd5b505af11580156103d1573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103f691610f22565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461048257604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561046957600080fd5b505af115801561047d573d6000803e3d6000fd5b505050505b60008281526002602052604081206102d191610a3a565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156104ec57600080fd5b505afa158015610500573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105289190810190610d3e565b90506000815167ffffffffffffffff81111561055457634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561058757816020015b60608152602001906001900390816105725790505b50905060005b825181101561069757600260008483815181106105ba57634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002080546105db90611153565b80601f016020809104026020016040519081016040528092919081815260200182805461060790611153565b80156106545780601f1061062957610100808354040283529160200191610654565b820191906000526020600020905b81548152906001019060200180831161063757829003601f168201915b505050505082828151811061067957634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061068f9061118e565b91505061058d565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106e757600080fd5b505af11580156106fb573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161072091610f22565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146107ac57604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561079357600080fd5b505af11580156107a7573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516107cb92850190610a77565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b039182169116141561086d5760405161080b90610afb565b604051809103906000f080158015610827573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156108c057600080fd5b505af11580156108d4573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260409020546004546060916001600160a01b039081169116811415610928575050604080516000815260208101909152919050565b806001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561096157600080fd5b505afa158015610975573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261099d9190810190610d3e565b9392505050565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b158015610a0257600080fd5b505afa158015610a16573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d99190610dd1565b508054610a4690611153565b6000825580601f10610a56575050565b601f016020900490600052602060002090810190610a749190610b08565b50565b828054610a8390611153565b90600052602060002090601f016020900481019282610aa55760008555610aeb565b82601f10610abe57805160ff1916838001178555610aeb565b82800160010185558215610aeb579182015b82811115610aeb578251825591602001919060010190610ad0565b50610af7929150610b08565b5090565b610529806111cc83390190565b5b80821115610af75760008155600101610b09565b6000610b30610b2b846110fb565b6110a6565b9050828152838383011115610b4457600080fd5b828260208301376000602084830101529392505050565b600082601f830112610b6b578081fd5b81356020610b7b610b2b836110d7565b80838252828201915082860187848660051b8901011115610b9a578586fd5b855b85811015610bee57813567ffffffffffffffff811115610bba578788fd5b8801603f81018a13610bca578788fd5b610bdb8a8783013560408401610b1d565b8552509284019290840190600101610b9c565b5090979650505050505050565b600082601f830112610c0b578081fd5b61099d83833560208501610b1d565b600060208284031215610c2b578081fd5b813567ffffffffffffffff811115610c41578182fd5b610c4d84828501610b5b565b949350505050565b60006020808385031215610c67578182fd5b825167ffffffffffffffff80821115610c7e578384fd5b818501915085601f830112610c91578384fd5b8151610c9f610b2b826110d7565b80828252858201915085850189878560051b8801011115610cbe578788fd5b875b84811015610d2f57815186811115610cd657898afd5b8701603f81018c13610ce657898afd5b888101516040610cf8610b2b836110fb565b8281528e82848601011115610d0b578c8dfd5b610d1a838d8301848701611123565b87525050509287019290870190600101610cc0565b50909998505050505050505050565b60006020808385031215610d50578182fd5b825167ffffffffffffffff811115610d66578283fd5b8301601f81018513610d76578283fd5b8051610d84610b2b826110d7565b80828252848201915084840188868560051b8701011115610da3578687fd5b8694505b83851015610dc5578051835260019490940193918501918501610da7565b50979650505050505050565b600060208284031215610de2578081fd5b8151801515811461099d578182fd5b600060208284031215610e02578081fd5b813567ffffffffffffffff811115610e18578182fd5b610c4d84828501610bfb565b600060208284031215610e35578081fd5b5035919050565b60008060408385031215610e4e578081fd5b82359150602083013567ffffffffffffffff811115610e6b578182fd5b610e7785828601610b5b565b9150509250929050565b60008060408385031215610e93578182fd5b82359150602083013567ffffffffffffffff811115610eb0578182fd5b610e7785828601610bfb565b6000815180845260208085019450808401835b83811015610eeb57815187529582019590820190600101610ecf565b509495945050505050565b60008151808452610f0e816020860160208601611123565b601f01601f19169290920160200192915050565b600080835482600182811c915080831680610f3e57607f831692505b6020808410821415610f5e57634e487b7160e01b87526022600452602487fd5b818015610f725760018114610f8357610faf565b60ff19861689528489019650610faf565b60008a815260209020885b86811015610fa75781548b820152908501908301610f8e565b505084890196505b509498975050505050505050565b6000602080830181845280855180835260408601915060408160051b8701019250838701855b8281101561101157603f19888603018452610fff858351610ef6565b94509285019290850190600101610fe3565b5092979650505050505050565b60208152600061099d6020830184610ebc565b6040815260006110446040830185610ebc565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610d2f57601f19878403018552611081838351610ef6565b94860194925090850190600101611065565b60208152600061099d6020830184610ef6565b604051601f8201601f1916810167ffffffffffffffff811182821017156110cf576110cf6111b5565b604052919050565b600067ffffffffffffffff8211156110f1576110f16111b5565b5060051b60200190565b600067ffffffffffffffff821115611115576111156111b5565b50601f01601f191660200190565b60005b8381101561113e578181015183820152602001611126565b8381111561114d576000848401525b50505050565b600181811c9082168061116757607f821691505b6020821081141561118857634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156111ae57634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212203fb896ef3dc6b1c56edec35eb1677f1619f6e249ce1b0ffed35c2bdb4a8038ab64736f6c63430008040033a264697066735822122042248671a5168da7ed50a9f9e96ca5beb0ef0de691ff9c3e0ab7d2c2e0d2161264736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212203fb896ef3dc6b1c56edec35eb1677f1619f6e249ce1b0ffed35c2bdb4a8038ab64736f6c63430008040033";

type StringArrayComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StringArrayComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StringArrayComponent__factory extends ContractFactory {
  constructor(...args: StringArrayComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StringArrayComponent> {
    return super.deploy(
      _gameAddr,
      overrides || {}
    ) as Promise<StringArrayComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): StringArrayComponent {
    return super.attach(address) as StringArrayComponent;
  }
  override connect(signer: Signer): StringArrayComponent__factory {
    return super.connect(signer) as StringArrayComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StringArrayComponentInterface {
    return new utils.Interface(_abi) as StringArrayComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StringArrayComponent {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as StringArrayComponent;
  }
}
