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
  "0x60a0604052604051610010906100da565b604051809103906000f08015801561002c573d6000803e3d6000fd5b506001600160a01b0316608052604051610045906100da565b604051809103906000f080158015610061573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009657600080fd5b50604051611b30380380611b308339810160408190526100b5916100e7565b600080546001600160a01b0319166001600160a01b0392909216919091179055610117565b61050f8061162183390190565b6000602082840312156100f957600080fd5b81516001600160a01b038116811461011057600080fd5b9392505050565b6080516114ef61013260003960006108ef01526114ef6000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80638b28294711610081578063b361be461161005b578063b361be46146101c1578063cccf7a8e146101d4578063f4400d74146101f757600080fd5b80638b282947146101725780639933adfd14610185578063a1d8509f146101b057600080fd5b80634c518fdc116100b25780634c518fdc146101295780634cc822151461014957806378d9f34f1461015c57600080fd5b80630ff4c916146100d9578063293e852e146100ff57806331b933b914610114575b600080fd5b6100ec6100e7366004610b1a565b61020a565b6040519081526020015b60405180910390f35b61011261010d366004610b33565b61022e565b005b61011c61025d565b6040516100f69190610b90565b61013c610137366004610b1a565b6102ed565b6040516100f69190610bf7565b610112610157366004610b1a565b61038f565b6101646104b1565b6040516100f6929190610c0a565b610112610180366004610d33565b610680565b610198610193366004610d7a565b6108bc565b6040516001600160a01b0390911681526020016100f6565b6001546001600160a01b0316610198565b61011c6101cf366004610d7a565b610914565b6101e76101e2366004610b1a565b610984565b60405190151581526020016100f6565b61011c610205366004610b1a565b610a0b565b6000610215826102ed565b8060200190518101906102289190610db7565b92915050565b610259828260405160200161024591815260200190565b604051602081830303815290604052610680565b5050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed51439160048083019260009291908290030181865afa1580156102c0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102e89190810190610dd0565b905090565b600081815260026020526040902080546060919061030a90610e76565b80601f016020809104026020016040519081016040528092919081815260200182805461033690610e76565b80156103835780601f1061035857610100808354040283529160200191610383565b820191906000526020600020905b81548152906001019060200180831161036657829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b1580156103d557600080fd5b505af11580156103e9573d6000803e3d6000fd5b5050506000828152600260205260408082209051919250600391839161040e91610eb0565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461049a57604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561048157600080fd5b505af1158015610495573d6000803e3d6000fd5b505050505b600082815260026020526040812061025991610a37565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa158015610509573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105319190810190610dd0565b90506000815167ffffffffffffffff81111561054f5761054f610c7c565b60405190808252806020026020018201604052801561058257816020015b606081526020019060019003908161056d5790505b50905060005b825181101561067657600260008483815181106105a7576105a7610f4b565b6020026020010151815260200190815260200160002080546105c890610e76565b80601f01602080910402602001604051908101604052809291908181526020018280546105f490610e76565b80156106415780601f1061061657610100808354040283529160200191610641565b820191906000526020600020905b81548152906001019060200180831161062457829003601f168201915b505050505082828151811061065857610658610f4b565b6020026020010181905250808061066e90610f61565b915050610588565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106c657600080fd5b505af11580156106da573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916106ff91610eb0565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461078b57604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561077257600080fd5b505af1158015610786573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516107aa92850190610a74565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b0390811691160361084b576040516107e990610af8565b604051809103906000f080158015610805573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561089e57600080fd5b505af11580156108b2573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b039182169116810361022857507f000000000000000000000000000000000000000000000000000000000000000092915050565b606061091f826108bc565b6001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa15801561095c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102289190810190610dd0565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a90602401602060405180830381865afa1580156109e7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102289190610f88565b606061022882604051602001610a2391815260200190565b604051602081830303815290604052610914565b508054610a4390610e76565b6000825580601f10610a53575050565b601f016020900490600052602060002090810190610a719190610b05565b50565b828054610a8090610e76565b90600052602060002090601f016020900481019282610aa25760008555610ae8565b82601f10610abb57805160ff1916838001178555610ae8565b82800160010185558215610ae8579182015b82811115610ae8578251825591602001919060010190610acd565b50610af4929150610b05565b5090565b61050f80610fab83390190565b5b80821115610af45760008155600101610b06565b600060208284031215610b2c57600080fd5b5035919050565b60008060408385031215610b4657600080fd5b50508035926020909101359150565b600081518084526020808501945080840160005b83811015610b8557815187529582019590820190600101610b69565b509495945050505050565b602081526000610ba36020830184610b55565b9392505050565b6000815180845260005b81811015610bd057602081850181015186830182015201610bb4565b81811115610be2576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610ba36020830184610baa565b604081526000610c1d6040830185610b55565b6020838203818501528185518084528284019150828160051b85010183880160005b83811015610c6d57601f19878403018552610c5b838351610baa565b94860194925090850190600101610c3f565b50909998505050505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610cbb57610cbb610c7c565b604052919050565b600082601f830112610cd457600080fd5b813567ffffffffffffffff811115610cee57610cee610c7c565b610d01601f8201601f1916602001610c92565b818152846020838601011115610d1657600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610d4657600080fd5b82359150602083013567ffffffffffffffff811115610d6457600080fd5b610d7085828601610cc3565b9150509250929050565b600060208284031215610d8c57600080fd5b813567ffffffffffffffff811115610da357600080fd5b610daf84828501610cc3565b949350505050565b600060208284031215610dc957600080fd5b5051919050565b60006020808385031215610de357600080fd5b825167ffffffffffffffff80821115610dfb57600080fd5b818501915085601f830112610e0f57600080fd5b815181811115610e2157610e21610c7c565b8060051b9150610e32848301610c92565b8181529183018401918481019088841115610e4c57600080fd5b938501935b83851015610e6a57845182529385019390850190610e51565b98975050505050505050565b600181811c90821680610e8a57607f821691505b602082108103610eaa57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680610ecc57607f831692505b60208084108203610eeb57634e487b7160e01b86526022600452602486fd5b818015610eff5760018114610f1057610f3d565b60ff19861689528489019650610f3d565b60008a81526020902060005b86811015610f355781548b820152908501908301610f1c565b505084890196505b509498975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600060018201610f8157634e487b7160e01b600052601160045260246000fd5b5060010190565b600060208284031215610f9a57600080fd5b81518015158114610ba357600080fdfe608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033a26469706673582212200398eb57cd50b2939de11421ffd5ecaad130d6477453a843f877d22dd67d87ac64736f6c634300080d0033608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033";

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
