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
  "0x60a0604052604051610010906100da565b604051809103906000f08015801561002c573d6000803e3d6000fd5b506001600160a01b0316608052604051610045906100da565b604051809103906000f080158015610061573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009657600080fd5b50604051611aef380380611aef8339810160408190526100b5916100e7565b600080546001600160a01b0319166001600160a01b0392909216919091179055610117565b61050f806115e083390190565b6000602082840312156100f957600080fd5b81516001600160a01b038116811461011057600080fd5b9392505050565b6080516114ae61013260003960006108f201526114ae6000f3fe608060405234801561001057600080fd5b50600436106100d35760003560e01c806378d9f34f11610081578063a1d8509f1161005b578063a1d8509f146101c8578063b361be46146101d9578063cccf7a8e146101ec57600080fd5b806378d9f34f146101745780638b2829471461018a5780639933adfd1461019d57600080fd5b80634c518fdc116100b25780634c518fdc1461012c5780634cc822151461014c57806360fe47b11461016157600080fd5b80621326ab146100d85780630ff4c9161461010157806331b933b914610124575b600080fd5b6100eb6100e6366004610afc565b6101ff565b6040516100f89190610b5b565b60405180910390f35b61011461010f366004610b6e565b610228565b60405190151581526020016100f8565b6100eb610233565b61013f61013a366004610b6e565b6102c3565b6040516100f89190610bd4565b61015f61015a366004610b6e565b610365565b005b61015f61016f366004610b6e565b61048b565b61017c6104b4565b6040516100f8929190610be7565b61015f610198366004610d10565b610683565b6101b06101ab366004610d57565b6108bf565b6040516001600160a01b0390911681526020016100f8565b6001546001600160a01b03166101b0565b6100eb6101e7366004610d57565b610917565b6101146101fa366004610b6e565b610987565b60608161021a57604080516000815260208101909152610222565b610222610233565b92915050565b600061022282610987565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed51439160048083019260009291908290030181865afa158015610296573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102be9190810190610d94565b905090565b60008181526002602052604090208054606091906102e090610e3a565b80601f016020809104026020016040519081016040528092919081815260200182805461030c90610e3a565b80156103595780601f1061032e57610100808354040283529160200191610359565b820191906000526020600020905b81548152906001019060200180831161033c57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b1580156103ab57600080fd5b505af11580156103bf573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103e491610e74565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461047057604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561045757600080fd5b505af115801561046b573d6000803e3d6000fd5b505050505b600082815260026020526040812061048791610a0e565b5050565b60408051600160208201526104b191839101604051602081830303815290604052610683565b50565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa15801561050c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105349190810190610d94565b90506000815167ffffffffffffffff81111561055257610552610c59565b60405190808252806020026020018201604052801561058557816020015b60608152602001906001900390816105705790505b50905060005b825181101561067957600260008483815181106105aa576105aa610f0f565b6020026020010151815260200190815260200160002080546105cb90610e3a565b80601f01602080910402602001604051908101604052809291908181526020018280546105f790610e3a565b80156106445780601f1061061957610100808354040283529160200191610644565b820191906000526020600020905b81548152906001019060200180831161062757829003601f168201915b505050505082828151811061065b5761065b610f0f565b6020026020010181905250808061067190610f25565b91505061058b565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106c957600080fd5b505af11580156106dd573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161070291610e74565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461078e57604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561077557600080fd5b505af1158015610789573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516107ad92850190610a48565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b0390811691160361084e576040516107ec90610acc565b604051809103906000f080158015610808573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156108a157600080fd5b505af11580156108b5573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b039182169116810361022257507f000000000000000000000000000000000000000000000000000000000000000092915050565b6060610922826108bf565b6001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa15801561095f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102229190810190610d94565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a90602401602060405180830381865afa1580156109ea573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102229190610f4c565b508054610a1a90610e3a565b6000825580601f10610a2a575050565b601f0160209004906000526020600020908101906104b19190610ad9565b828054610a5490610e3a565b90600052602060002090601f016020900481019282610a765760008555610abc565b82601f10610a8f57805160ff1916838001178555610abc565b82800160010185558215610abc579182015b82811115610abc578251825591602001919060010190610aa1565b50610ac8929150610ad9565b5090565b61050f80610f6a83390190565b5b80821115610ac85760008155600101610ada565b80151581146104b157600080fd5b600060208284031215610b0e57600080fd5b8135610b1981610aee565b9392505050565b600081518084526020808501945080840160005b83811015610b5057815187529582019590820190600101610b34565b509495945050505050565b602081526000610b196020830184610b20565b600060208284031215610b8057600080fd5b5035919050565b6000815180845260005b81811015610bad57602081850181015186830182015201610b91565b81811115610bbf576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610b196020830184610b87565b604081526000610bfa6040830185610b20565b6020838203818501528185518084528284019150828160051b85010183880160005b83811015610c4a57601f19878403018552610c38838351610b87565b94860194925090850190600101610c1c565b50909998505050505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610c9857610c98610c59565b604052919050565b600082601f830112610cb157600080fd5b813567ffffffffffffffff811115610ccb57610ccb610c59565b610cde601f8201601f1916602001610c6f565b818152846020838601011115610cf357600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610d2357600080fd5b82359150602083013567ffffffffffffffff811115610d4157600080fd5b610d4d85828601610ca0565b9150509250929050565b600060208284031215610d6957600080fd5b813567ffffffffffffffff811115610d8057600080fd5b610d8c84828501610ca0565b949350505050565b60006020808385031215610da757600080fd5b825167ffffffffffffffff80821115610dbf57600080fd5b818501915085601f830112610dd357600080fd5b815181811115610de557610de5610c59565b8060051b9150610df6848301610c6f565b8181529183018401918481019088841115610e1057600080fd5b938501935b83851015610e2e57845182529385019390850190610e15565b98975050505050505050565b600181811c90821680610e4e57607f821691505b602082108103610e6e57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680610e9057607f831692505b60208084108203610eaf57634e487b7160e01b86526022600452602486fd5b818015610ec35760018114610ed457610f01565b60ff19861689528489019650610f01565b60008a81526020902060005b86811015610ef95781548b820152908501908301610ee0565b505084890196505b509498975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600060018201610f4557634e487b7160e01b600052601160045260246000fd5b5060010190565b600060208284031215610f5e57600080fd5b8151610b1981610aee56fe608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033a26469706673582212203f46fa4629da55365da748c50a1d117375f2a53ea95f8fdcbb478e46889447e964736f6c634300080d0033608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033";

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
