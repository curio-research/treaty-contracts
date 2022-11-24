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
  "0x60a0604052604051610010906100da565b604051809103906000f08015801561002c573d6000803e3d6000fd5b506001600160a01b0316608052604051610045906100da565b604051809103906000f080158015610061573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009657600080fd5b50604051611b6c380380611b6c8339810160408190526100b5916100e7565b600080546001600160a01b0319166001600160a01b0392909216919091179055610117565b61050f8061165d83390190565b6000602082840312156100f957600080fd5b81516001600160a01b038116811461011057600080fd5b9392505050565b60805161152b6101326000396000610913015261152b6000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806378d9f34f11610081578063a1d8509f1161005b578063a1d8509f146101b5578063b361be46146101c6578063cccf7a8e146101d957600080fd5b806378d9f34f146101795780638b2829471461018f5780639933adfd146101a257600080fd5b80633e1b5e0d116100b25780633e1b5e0d146101335780634c518fdc146101465780634cc822151461016657600080fd5b80630ff4c916146100d95780632f30c6f61461010957806331b933b91461011e575b600080fd5b6100ec6100e7366004610b12565b6101fc565b6040516001600160a01b0390911681526020015b60405180910390f35b61011c610117366004610b40565b610220565b005b610126610252565b6040516101009190610bab565b610126610141366004610bc5565b6102e2565b610159610154366004610b12565b610311565b6040516101009190610c2f565b61011c610174366004610b12565b6103b3565b6101816104d5565b604051610100929190610c42565b61011c61019d366004610d6b565b6106a4565b6100ec6101b0366004610db2565b6108e0565b6001546001600160a01b03166100ec565b6101266101d4366004610db2565b610938565b6101ec6101e7366004610b12565b6109a8565b6040519015158152602001610100565b600061020782610311565b80602001905181019061021a9190610def565b92915050565b604080516001600160a01b038316602082015261024e918491016040516020818303038152906040526106a4565b5050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed51439160048083019260009291908290030181865afa1580156102b5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102dd9190810190610e0c565b905090565b604080516001600160a01b038316602082015260609161021a9101604051602081830303815290604052610938565b600081815260026020526040902080546060919061032e90610eb2565b80601f016020809104026020016040519081016040528092919081815260200182805461035a90610eb2565b80156103a75780601f1061037c576101008083540402835291602001916103a7565b820191906000526020600020905b81548152906001019060200180831161038a57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b1580156103f957600080fd5b505af115801561040d573d6000803e3d6000fd5b5050506000828152600260205260408082209051919250600391839161043291610eec565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146104be57604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156104a557600080fd5b505af11580156104b9573d6000803e3d6000fd5b505050505b600082815260026020526040812061024e91610a2f565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa15801561052d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105559190810190610e0c565b90506000815167ffffffffffffffff81111561057357610573610cb4565b6040519080825280602002602001820160405280156105a657816020015b60608152602001906001900390816105915790505b50905060005b825181101561069a57600260008483815181106105cb576105cb610f87565b6020026020010151815260200190815260200160002080546105ec90610eb2565b80601f016020809104026020016040519081016040528092919081815260200182805461061890610eb2565b80156106655780601f1061063a57610100808354040283529160200191610665565b820191906000526020600020905b81548152906001019060200180831161064857829003601f168201915b505050505082828151811061067c5761067c610f87565b6020026020010181905250808061069290610f9d565b9150506105ac565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106ea57600080fd5b505af11580156106fe573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161072391610eec565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146107af57604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561079657600080fd5b505af11580156107aa573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516107ce92850190610a6c565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b0390811691160361086f5760405161080d90610af0565b604051809103906000f080158015610829573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156108c257600080fd5b505af11580156108d6573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b039182169116810361021a57507f000000000000000000000000000000000000000000000000000000000000000092915050565b6060610943826108e0565b6001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa158015610980573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261021a9190810190610e0c565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a90602401602060405180830381865afa158015610a0b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021a9190610fc4565b508054610a3b90610eb2565b6000825580601f10610a4b575050565b601f016020900490600052602060002090810190610a699190610afd565b50565b828054610a7890610eb2565b90600052602060002090601f016020900481019282610a9a5760008555610ae0565b82601f10610ab357805160ff1916838001178555610ae0565b82800160010185558215610ae0579182015b82811115610ae0578251825591602001919060010190610ac5565b50610aec929150610afd565b5090565b61050f80610fe783390190565b5b80821115610aec5760008155600101610afe565b600060208284031215610b2457600080fd5b5035919050565b6001600160a01b0381168114610a6957600080fd5b60008060408385031215610b5357600080fd5b823591506020830135610b6581610b2b565b809150509250929050565b600081518084526020808501945080840160005b83811015610ba057815187529582019590820190600101610b84565b509495945050505050565b602081526000610bbe6020830184610b70565b9392505050565b600060208284031215610bd757600080fd5b8135610bbe81610b2b565b6000815180845260005b81811015610c0857602081850181015186830182015201610bec565b81811115610c1a576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610bbe6020830184610be2565b604081526000610c556040830185610b70565b6020838203818501528185518084528284019150828160051b85010183880160005b83811015610ca557601f19878403018552610c93838351610be2565b94860194925090850190600101610c77565b50909998505050505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610cf357610cf3610cb4565b604052919050565b600082601f830112610d0c57600080fd5b813567ffffffffffffffff811115610d2657610d26610cb4565b610d39601f8201601f1916602001610cca565b818152846020838601011115610d4e57600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610d7e57600080fd5b82359150602083013567ffffffffffffffff811115610d9c57600080fd5b610da885828601610cfb565b9150509250929050565b600060208284031215610dc457600080fd5b813567ffffffffffffffff811115610ddb57600080fd5b610de784828501610cfb565b949350505050565b600060208284031215610e0157600080fd5b8151610bbe81610b2b565b60006020808385031215610e1f57600080fd5b825167ffffffffffffffff80821115610e3757600080fd5b818501915085601f830112610e4b57600080fd5b815181811115610e5d57610e5d610cb4565b8060051b9150610e6e848301610cca565b8181529183018401918481019088841115610e8857600080fd5b938501935b83851015610ea657845182529385019390850190610e8d565b98975050505050505050565b600181811c90821680610ec657607f821691505b602082108103610ee657634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680610f0857607f831692505b60208084108203610f2757634e487b7160e01b86526022600452602486fd5b818015610f3b5760018114610f4c57610f79565b60ff19861689528489019650610f79565b60008a81526020902060005b86811015610f715781548b820152908501908301610f58565b505084890196505b509498975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600060018201610fbd57634e487b7160e01b600052601160045260246000fd5b5060010190565b600060208284031215610fd657600080fd5b81518015158114610bbe57600080fdfe608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033a264697066735822122023a302f2e9d7c623a8d28454f1ea868662ac5656478680c3abcedd071a60929964736f6c634300080d0033608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033";

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
