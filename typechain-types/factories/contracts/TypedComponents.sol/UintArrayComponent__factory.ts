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
  "0x60a0604052604051610010906100da565b604051809103906000f08015801561002c573d6000803e3d6000fd5b506001600160a01b0316608052604051610045906100da565b604051809103906000f080158015610061573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009657600080fd5b50604051611bd3380380611bd38339810160408190526100b5916100e7565b600080546001600160a01b0319166001600160a01b0392909216919091179055610117565b61050f806116c483390190565b6000602082840312156100f957600080fd5b81516001600160a01b038116811461011057600080fd5b9392505050565b608051611592610132600039600061090d01526115926000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c8063946aadc611610081578063a1d8509f1161005b578063a1d8509f146101b9578063b361be46146101ca578063cccf7a8e146101dd57600080fd5b8063946aadc614610168578063963e9eb01461017b5780639933adfd1461018e57600080fd5b80634cc82215116100b25780634cc822151461012a57806378d9f34f1461013f5780638b2829471461015557600080fd5b80630ff4c916146100d957806331b933b9146101025780634c518fdc1461010a575b600080fd5b6100ec6100e7366004610b0c565b610200565b6040516100f99190610b60565b60405180910390f35b6100ec610224565b61011d610118366004610b0c565b6102b4565b6040516100f99190610bc7565b61013d610138366004610b0c565b610356565b005b61014761047c565b6040516100f9929190610bda565b61013d610163366004610d03565b61064b565b61013d610176366004610dd9565b610887565b6100ec610189366004610e16565b6108b0565b6101a161019c366004610e53565b6108da565b6040516001600160a01b0390911681526020016100f9565b6001546001600160a01b03166101a1565b6100ec6101d8366004610e53565b610932565b6101f06101eb366004610b0c565b6109a2565b60405190151581526020016100f9565b606061020b826102b4565b80602001905181019061021e9190610e88565b92915050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed51439160048083019260009291908290030181865afa158015610287573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102af9190810190610e88565b905090565b60008181526002602052604090208054606091906102d190610f19565b80601f01602080910402602001604051908101604052809291908181526020018280546102fd90610f19565b801561034a5780601f1061031f5761010080835404028352916020019161034a565b820191906000526020600020905b81548152906001019060200180831161032d57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561039c57600080fd5b505af11580156103b0573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103d591610f53565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461046157604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561044857600080fd5b505af115801561045c573d6000803e3d6000fd5b505050505b600082815260026020526040812061047891610a29565b5050565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa1580156104d4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104fc9190810190610e88565b90506000815167ffffffffffffffff81111561051a5761051a610c4c565b60405190808252806020026020018201604052801561054d57816020015b60608152602001906001900390816105385790505b50905060005b8251811015610641576002600084838151811061057257610572610fee565b60200260200101518152602001908152602001600020805461059390610f19565b80601f01602080910402602001604051908101604052809291908181526020018280546105bf90610f19565b801561060c5780601f106105e15761010080835404028352916020019161060c565b820191906000526020600020905b8154815290600101906020018083116105ef57829003601f168201915b505050505082828151811061062357610623610fee565b6020026020010181905250808061063990611004565b915050610553565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561069157600080fd5b505af11580156106a5573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916106ca91610f53565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461075657604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561073d57600080fd5b505af1158015610751573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161077592850190610a66565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b03908116911603610816576040516107b490610aea565b604051809103906000f0801580156107d0573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561086957600080fd5b505af115801561087d573d6000803e3d6000fd5b5050505050505050565b610478828260405160200161089c9190610b60565b60405160208183030381529060405261064b565b606061021e826040516020016108c69190610b60565b604051602081830303815290604052610932565b80516020808301919091206000908152600390915260408120546004546001600160a01b039182169116810361021e57507f000000000000000000000000000000000000000000000000000000000000000092915050565b606061093d826108da565b6001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa15801561097a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261021e9190810190610e88565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a90602401602060405180830381865afa158015610a05573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021e919061102b565b508054610a3590610f19565b6000825580601f10610a45575050565b601f016020900490600052602060002090810190610a639190610af7565b50565b828054610a7290610f19565b90600052602060002090601f016020900481019282610a945760008555610ada565b82601f10610aad57805160ff1916838001178555610ada565b82800160010185558215610ada579182015b82811115610ada578251825591602001919060010190610abf565b50610ae6929150610af7565b5090565b61050f8061104e83390190565b5b80821115610ae65760008155600101610af8565b600060208284031215610b1e57600080fd5b5035919050565b600081518084526020808501945080840160005b83811015610b5557815187529582019590820190600101610b39565b509495945050505050565b602081526000610b736020830184610b25565b9392505050565b6000815180845260005b81811015610ba057602081850181015186830182015201610b84565b81811115610bb2576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610b736020830184610b7a565b604081526000610bed6040830185610b25565b6020838203818501528185518084528284019150828160051b85010183880160005b83811015610c3d57601f19878403018552610c2b838351610b7a565b94860194925090850190600101610c0f565b50909998505050505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610c8b57610c8b610c4c565b604052919050565b600082601f830112610ca457600080fd5b813567ffffffffffffffff811115610cbe57610cbe610c4c565b610cd1601f8201601f1916602001610c62565b818152846020838601011115610ce657600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610d1657600080fd5b82359150602083013567ffffffffffffffff811115610d3457600080fd5b610d4085828601610c93565b9150509250929050565b600067ffffffffffffffff821115610d6457610d64610c4c565b5060051b60200190565b600082601f830112610d7f57600080fd5b81356020610d94610d8f83610d4a565b610c62565b82815260059290921b84018101918181019086841115610db357600080fd5b8286015b84811015610dce5780358352918301918301610db7565b509695505050505050565b60008060408385031215610dec57600080fd5b82359150602083013567ffffffffffffffff811115610e0a57600080fd5b610d4085828601610d6e565b600060208284031215610e2857600080fd5b813567ffffffffffffffff811115610e3f57600080fd5b610e4b84828501610d6e565b949350505050565b600060208284031215610e6557600080fd5b813567ffffffffffffffff811115610e7c57600080fd5b610e4b84828501610c93565b60006020808385031215610e9b57600080fd5b825167ffffffffffffffff811115610eb257600080fd5b8301601f81018513610ec357600080fd5b8051610ed1610d8f82610d4a565b81815260059190911b82018301908381019087831115610ef057600080fd5b928401925b82841015610f0e57835182529284019290840190610ef5565b979650505050505050565b600181811c90821680610f2d57607f821691505b602082108103610f4d57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680610f6f57607f831692505b60208084108203610f8e57634e487b7160e01b86526022600452602486fd5b818015610fa25760018114610fb357610fe0565b60ff19861689528489019650610fe0565b60008a81526020902060005b86811015610fd85781548b820152908501908301610fbf565b505084890196505b509498975050505050505050565b634e487b7160e01b600052603260045260246000fd5b60006001820161102457634e487b7160e01b600052601160045260246000fd5b5060010190565b60006020828403121561103d57600080fd5b81518015158114610b7357600080fdfe608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033a2646970667358221220a48b6a3639b04706793aa628788cabf293a085a1f4b85e4822bf17456c65cf8f64736f6c634300080d0033608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033";

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
