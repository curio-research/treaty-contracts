/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  PositionComponent,
  PositionComponentInterface,
} from "../../../contracts/TypedComponents.sol/PositionComponent";

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
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_value",
        type: "tuple",
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
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "",
        type: "tuple",
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
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_value",
        type: "tuple",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a0604052604051610010906100dc565b604051809103906000f08015801561002c573d6000803e3d6000fd5b506001600160a01b0316608052604051610045906100dc565b604051809103906000f080158015610061573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009657600080fd5b5060405162001971380380620019718339810160408190526100b7916100ea565b600080546001600160a01b0319166001600160a01b039290921691909117905561011a565b6103b880620015b983390190565b6000602082840312156100fc57600080fd5b81516001600160a01b038116811461011357600080fd5b9392505050565b60805161148362000136600039600061091e01526114836000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80638bbf68fe11610081578063b361be461161005b578063b361be46146101ce578063cccf7a8e146101e1578063fd4ab6d81461020457600080fd5b80638bbf68fe1461017f5780639933adfd14610192578063a1d8509f146101bd57600080fd5b80634cc82215116100b25780634cc822151461014157806378d9f34f146101565780638b2829471461016c57600080fd5b80630ff4c916146100d957806331b933b91461010c5780634c518fdc14610121575b600080fd5b6100ec6100e7366004610b59565b610217565b604080518251815260209283015192810192909252015b60405180910390f35b61011461024d565b6040516101039190610bad565b61013461012f366004610b59565b6102dd565b6040516101039190610c14565b61015461014f366004610b59565b61037f565b005b61015e6104a5565b604051610103929190610c27565b61015461017a366004610d50565b610674565b61015461018d366004610de6565b6108b0565b6101a56101a0366004610e13565b6108eb565b6040516001600160a01b039091168152602001610103565b6001546001600160a01b03166101a5565b6101146101dc366004610e13565b610943565b6101f46101ef366004610b59565b6109b3565b6040519015158152602001610103565b610114610212366004610e50565b610a3a565b6040805180820190915260008082526020820152610234826102dd565b8060200190518101906102479190610e6c565b92915050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed51439160048083019260009291908290030181865afa1580156102b0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102d89190810190610ebb565b905090565b60008181526002602052604090208054606091906102fa90610f61565b80601f016020809104026020016040519081016040528092919081815260200182805461032690610f61565b80156103735780601f1061034857610100808354040283529160200191610373565b820191906000526020600020905b81548152906001019060200180831161035657829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b1580156103c557600080fd5b505af11580156103d9573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103fe91610f9b565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461048a57604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561047157600080fd5b505af1158015610485573d6000803e3d6000fd5b505050505b60008281526002602052604081206104a191610a76565b5050565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa1580156104fd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105259190810190610ebb565b90506000815167ffffffffffffffff81111561054357610543610c99565b60405190808252806020026020018201604052801561057657816020015b60608152602001906001900390816105615790505b50905060005b825181101561066a576002600084838151811061059b5761059b611036565b6020026020010151815260200190815260200160002080546105bc90610f61565b80601f01602080910402602001604051908101604052809291908181526020018280546105e890610f61565b80156106355780601f1061060a57610100808354040283529160200191610635565b820191906000526020600020905b81548152906001019060200180831161061857829003601f168201915b505050505082828151811061064c5761064c611036565b602002602001018190525080806106629061104c565b91505061057c565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106ba57600080fd5b505af11580156106ce573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916106f391610f9b565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461077f57604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561076657600080fd5b505af115801561077a573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161079e92850190610ab3565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b0390811691160361083f576040516107dd90610b37565b604051809103906000f0801580156107f9573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561089257600080fd5b505af11580156108a6573d6000803e3d6000fd5b5050505050505050565b6104a182826040516020016108d79190815181526020918201519181019190915260400190565b604051602081830303815290604052610674565b80516020808301919091206000908152600390915260408120546004546001600160a01b039182169116810361024757507f000000000000000000000000000000000000000000000000000000000000000092915050565b606061094e826108eb565b6001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa15801561098b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102479190810190610ebb565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a90602401602060405180830381865afa158015610a16573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102479190611073565b606061024782604051602001610a629190815181526020918201519181019190915260400190565b604051602081830303815290604052610943565b508054610a8290610f61565b6000825580601f10610a92575050565b601f016020900490600052602060002090810190610ab09190610b44565b50565b828054610abf90610f61565b90600052602060002090601f016020900481019282610ae15760008555610b27565b82601f10610afa57805160ff1916838001178555610b27565b82800160010185558215610b27579182015b82811115610b27578251825591602001919060010190610b0c565b50610b33929150610b44565b5090565b6103b88061109683390190565b5b80821115610b335760008155600101610b45565b600060208284031215610b6b57600080fd5b5035919050565b600081518084526020808501945080840160005b83811015610ba257815187529582019590820190600101610b86565b509495945050505050565b602081526000610bc06020830184610b72565b9392505050565b6000815180845260005b81811015610bed57602081850181015186830182015201610bd1565b81811115610bff576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610bc06020830184610bc7565b604081526000610c3a6040830185610b72565b6020838203818501528185518084528284019150828160051b85010183880160005b83811015610c8a57601f19878403018552610c78838351610bc7565b94860194925090850190600101610c5c565b50909998505050505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610cd857610cd8610c99565b604052919050565b600082601f830112610cf157600080fd5b813567ffffffffffffffff811115610d0b57610d0b610c99565b610d1e601f8201601f1916602001610caf565b818152846020838601011115610d3357600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610d6357600080fd5b82359150602083013567ffffffffffffffff811115610d8157600080fd5b610d8d85828601610ce0565b9150509250929050565b600060408284031215610da957600080fd5b6040516040810181811067ffffffffffffffff82111715610dcc57610dcc610c99565b604052823581526020928301359281019290925250919050565b60008060608385031215610df957600080fd5b82359150610e0a8460208501610d97565b90509250929050565b600060208284031215610e2557600080fd5b813567ffffffffffffffff811115610e3c57600080fd5b610e4884828501610ce0565b949350505050565b600060408284031215610e6257600080fd5b610bc08383610d97565b600060408284031215610e7e57600080fd5b6040516040810181811067ffffffffffffffff82111715610ea157610ea1610c99565b604052825181526020928301519281019290925250919050565b60006020808385031215610ece57600080fd5b825167ffffffffffffffff80821115610ee657600080fd5b818501915085601f830112610efa57600080fd5b815181811115610f0c57610f0c610c99565b8060051b9150610f1d848301610caf565b8181529183018401918481019088841115610f3757600080fd5b938501935b83851015610f5557845182529385019390850190610f3c565b98975050505050505050565b600181811c90821680610f7557607f821691505b602082108103610f9557634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680610fb757607f831692505b60208084108203610fd657634e487b7160e01b86526022600452602486fd5b818015610fea5760018114610ffb57611028565b60ff19861689528489019650611028565b60008a81526020902060005b868110156110205781548b820152908501908301611007565b505084890196505b509498975050505050505050565b634e487b7160e01b600052603260045260246000fd5b60006001820161106c57634e487b7160e01b600052601160045260246000fd5b5060010190565b60006020828403121561108557600080fd5b81518015158114610bc057600080fdfe608060405234801561001057600080fd5b50610398806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a3660046102b4565b6100e6565b005b61007f61008f3660046102b4565b61014f565b61009c61020b565b6040516100a991906102cd565b60405180910390f35b6000546040519081526020016100a9565b6100d66100d13660046102b4565b610263565b60405190151581526020016100a9565b6100ef81610263565b156100f75750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561013360005490565b61013d9190610311565b60009182526001602052604090912055565b61015881610263565b61015f5750565b60008181526001602081905260408220549190819061017d60005490565b6101879190610311565b8154811061019757610197610336565b9060005260206000200154905080600083815481106101b8576101b8610336565b60009182526020808320909101929092558281526001909152604080822084905584825281208190558054806101f0576101f061034c565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561025957602002820191906000526020600020905b815481526020019060010190808311610245575b5050505050905090565b6000805460000361027657506000919050565b6000828152600160205260409020541515806102ae575081600080815481106102a1576102a1610336565b9060005260206000200154145b92915050565b6000602082840312156102c657600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610305578351835292840192918401916001016102e9565b50909695505050505050565b60008282101561033157634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122044a6b59e3f4cc51fb52700a3a654b0f0db6451ab7312e182fced1c3775e1cd3d64736f6c634300080d0033a2646970667358221220fe3866cdee67c20234ad371edb6e1447c82786903ea60094114e5a67a1bc85ec64736f6c634300080d0033608060405234801561001057600080fd5b50610398806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a3660046102b4565b6100e6565b005b61007f61008f3660046102b4565b61014f565b61009c61020b565b6040516100a991906102cd565b60405180910390f35b6000546040519081526020016100a9565b6100d66100d13660046102b4565b610263565b60405190151581526020016100a9565b6100ef81610263565b156100f75750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561013360005490565b61013d9190610311565b60009182526001602052604090912055565b61015881610263565b61015f5750565b60008181526001602081905260408220549190819061017d60005490565b6101879190610311565b8154811061019757610197610336565b9060005260206000200154905080600083815481106101b8576101b8610336565b60009182526020808320909101929092558281526001909152604080822084905584825281208190558054806101f0576101f061034c565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561025957602002820191906000526020600020905b815481526020019060010190808311610245575b5050505050905090565b6000805460000361027657506000919050565b6000828152600160205260409020541515806102ae575081600080815481106102a1576102a1610336565b9060005260206000200154145b92915050565b6000602082840312156102c657600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610305578351835292840192918401916001016102e9565b50909695505050505050565b60008282101561033157634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122044a6b59e3f4cc51fb52700a3a654b0f0db6451ab7312e182fced1c3775e1cd3d64736f6c634300080d0033";

type PositionComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PositionComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PositionComponent__factory extends ContractFactory {
  constructor(...args: PositionComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PositionComponent> {
    return super.deploy(
      _gameAddr,
      overrides || {}
    ) as Promise<PositionComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): PositionComponent {
    return super.attach(address) as PositionComponent;
  }
  override connect(signer: Signer): PositionComponent__factory {
    return super.connect(signer) as PositionComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PositionComponentInterface {
    return new utils.Interface(_abi) as PositionComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PositionComponent {
    return new Contract(address, _abi, signerOrProvider) as PositionComponent;
  }
}
