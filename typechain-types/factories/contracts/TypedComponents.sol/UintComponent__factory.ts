/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  UintComponent,
  UintComponentInterface,
} from "../../../contracts/TypedComponents.sol/UintComponent";

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
        internalType: "uint256",
        name: "_value",
        type: "uint256",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "uint256",
        name: "_value",
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
  "0x60a0604052604051610010906100dc565b604051809103906000f08015801561002c573d6000803e3d6000fd5b506001600160a01b0316608052604051610045906100dc565b604051809103906000f080158015610061573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561009657600080fd5b5060405162001b8d38038062001b8d8339810160408190526100b7916100ea565b600080546001600160a01b0319166001600160a01b039290921691909117905561011a565b6104af80620016de83390190565b6000602082840312156100fc57600080fd5b81516001600160a01b038116811461011357600080fd5b9392505050565b6080516115a8620001366000396000610a0801526115a86000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80638b28294711610081578063b361be461161005b578063b361be46146101c1578063cccf7a8e146101d4578063fbdfa1ea146101f757600080fd5b80638b282947146101725780639933adfd14610185578063a1d8509f146101b057600080fd5b80634c518fdc116100b25780634c518fdc146101295780634cc822151461014957806378d9f34f1461015c57600080fd5b80630ff4c916146100d95780631ab06ee5146100ff57806331b933b914610114575b600080fd5b6100ec6100e7366004610c33565b61020a565b6040519081526020015b60405180910390f35b61011261010d366004610c4c565b61022e565b005b61011c61025d565b6040516100f69190610ca9565b61013c610137366004610c33565b6102ed565b6040516100f69190610d10565b610112610157366004610c33565b61038f565b610164610540565b6040516100f6929190610d23565b610112610180366004610e4c565b61070f565b610198610193366004610e93565b6109d5565b6040516001600160a01b0390911681526020016100f6565b6001546001600160a01b0316610198565b61011c6101cf366004610e93565b610a2d565b6101e76101e2366004610c33565b610a9d565b60405190151581526020016100f6565b61011c610205366004610c33565b610b24565b6000610215826102ed565b8060200190518101906102289190610ed0565b92915050565b610259828260405160200161024591815260200190565b60405160208183030381529060405261070f565b5050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed51439160048083019260009291908290030181865afa1580156102c0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102e89190810190610ee9565b905090565b600081815260026020526040902080546060919061030a90610f8f565b80601f016020809104026020016040519081016040528092919081815260200182805461033690610f8f565b80156103835780601f1061035857610100808354040283529160200191610383565b820191906000526020600020905b81548152906001019060200180831161036657829003601f168201915b50505050509050919050565b6000546001600160a01b03163314806103a757503330145b61041e5760405162461bcd60e51b815260206004820152602e60248201527f436f6d706f6e656e743a204f6e6c792067616d65206f722073656c662063616e60448201527f206d6f646966792076616c75657300000000000000000000000000000000000060648201526084015b60405180910390fd5b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561046457600080fd5b505af1158015610478573d6000803e3d6000fd5b5050506000828152600260205260408082209051919250600391839161049d91610fc9565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461052957604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561051057600080fd5b505af1158015610524573d6000803e3d6000fd5b505050505b600082815260026020526040812061025991610b50565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa158015610598573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105c09190810190610ee9565b90506000815167ffffffffffffffff8111156105de576105de610d95565b60405190808252806020026020018201604052801561061157816020015b60608152602001906001900390816105fc5790505b50905060005b8251811015610705576002600084838151811061063657610636611064565b60200260200101518152602001908152602001600020805461065790610f8f565b80601f016020809104026020016040519081016040528092919081815260200182805461068390610f8f565b80156106d05780601f106106a5576101008083540402835291602001916106d0565b820191906000526020600020905b8154815290600101906020018083116106b357829003601f168201915b50505050508282815181106106e7576106e7611064565b602002602001018190525080806106fd9061107a565b915050610617565b5090939092509050565b6000546001600160a01b031633148061072757503330145b6107995760405162461bcd60e51b815260206004820152602e60248201527f436f6d706f6e656e743a204f6e6c792067616d65206f722073656c662063616e60448201527f206d6f646966792076616c7565730000000000000000000000000000000000006064820152608401610415565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156107df57600080fd5b505af11580156107f3573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161081891610fc9565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146108a457604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561088b57600080fd5b505af115801561089f573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516108c392850190610b8d565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b039081169116036109645760405161090290610c11565b604051809103906000f08015801561091e573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156109b757600080fd5b505af11580156109cb573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260408120546004546001600160a01b039182169116810361022857507f000000000000000000000000000000000000000000000000000000000000000092915050565b6060610a38826109d5565b6001600160a01b03166353ed51436040518163ffffffff1660e01b8152600401600060405180830381865afa158015610a75573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102289190810190610ee9565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a90602401602060405180830381865afa158015610b00573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061022891906110a1565b606061022882604051602001610b3c91815260200190565b604051602081830303815290604052610a2d565b508054610b5c90610f8f565b6000825580601f10610b6c575050565b601f016020900490600052602060002090810190610b8a9190610c1e565b50565b828054610b9990610f8f565b90600052602060002090601f016020900481019282610bbb5760008555610c01565b82601f10610bd457805160ff1916838001178555610c01565b82800160010185558215610c01579182015b82811115610c01578251825591602001919060010190610be6565b50610c0d929150610c1e565b5090565b6104af806110c483390190565b5b80821115610c0d5760008155600101610c1f565b600060208284031215610c4557600080fd5b5035919050565b60008060408385031215610c5f57600080fd5b50508035926020909101359150565b600081518084526020808501945080840160005b83811015610c9e57815187529582019590820190600101610c82565b509495945050505050565b602081526000610cbc6020830184610c6e565b9392505050565b6000815180845260005b81811015610ce957602081850181015186830182015201610ccd565b81811115610cfb576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610cbc6020830184610cc3565b604081526000610d366040830185610c6e565b6020838203818501528185518084528284019150828160051b85010183880160005b83811015610d8657601f19878403018552610d74838351610cc3565b94860194925090850190600101610d58565b50909998505050505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610dd457610dd4610d95565b604052919050565b600082601f830112610ded57600080fd5b813567ffffffffffffffff811115610e0757610e07610d95565b610e1a601f8201601f1916602001610dab565b818152846020838601011115610e2f57600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610e5f57600080fd5b82359150602083013567ffffffffffffffff811115610e7d57600080fd5b610e8985828601610ddc565b9150509250929050565b600060208284031215610ea557600080fd5b813567ffffffffffffffff811115610ebc57600080fd5b610ec884828501610ddc565b949350505050565b600060208284031215610ee257600080fd5b5051919050565b60006020808385031215610efc57600080fd5b825167ffffffffffffffff80821115610f1457600080fd5b818501915085601f830112610f2857600080fd5b815181811115610f3a57610f3a610d95565b8060051b9150610f4b848301610dab565b8181529183018401918481019088841115610f6557600080fd5b938501935b83851015610f8357845182529385019390850190610f6a565b98975050505050505050565b600181811c90821680610fa357607f821691505b602082108103610fc357634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680610fe557607f831692505b6020808410820361100457634e487b7160e01b86526022600452602486fd5b818015611018576001811461102957611056565b60ff19861689528489019650611056565b60008a81526020902060005b8681101561104e5781548b820152908501908301611035565b505084890196505b509498975050505050505050565b634e487b7160e01b600052603260045260246000fd5b60006001820161109a57634e487b7160e01b600052601160045260246000fd5b5060010190565b6000602082840312156110b357600080fd5b81518015158114610cbc57600080fdfe608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561047d806100326000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a366004610399565b6100e6565b005b61007f61008f366004610399565b6101bd565b61009c6102e8565b6040516100a991906103b2565b60405180910390f35b6001546040519081526020016100a9565b6100d66100d1366004610399565b610340565b60405190151581526020016100a9565b60005473ffffffffffffffffffffffffffffffffffffffff16331461015e5760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b60648201526084015b60405180910390fd5b61016781610340565b6101ba5760018054808201825560008290527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60182905580546101aa91906103f6565b6000828152600260205260409020555b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102305760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b6064820152608401610155565b61023981610340565b156101ba576000818152600260205260408120549060018061025a60015490565b61026491906103f6565b815481106102745761027461041b565b9060005260206000200154905080600183815481106102955761029561041b565b60009182526020808320909101929092558281526002909152604080822084905584825281205560018054806102cd576102cd610431565b60019003818190600052602060002001600090559055505050565b6060600180548060200260200160405190810160405280929190818152602001828054801561033657602002820191906000526020600020905b815481526020019060010190808311610322575b5050505050905090565b600061034b60015490565b60000361035a57506000919050565b60008281526002602052604090205415158061039357508160016000815481106103865761038661041b565b9060005260206000200154145b92915050565b6000602082840312156103ab57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103ea578351835292840192918401916001016103ce565b50909695505050505050565b60008282101561041657634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212204af513f4c6ced8d8fbeaf7a242307a0a1384e8a5ba73c71c7d3d2e25f90a3d8164736f6c634300080d0033a26469706673582212201be5669bdc780b2ecca3880604cd63bfd7d5478869bb8125372ebe0c56e190f864736f6c634300080d0033608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561047d806100326000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a366004610399565b6100e6565b005b61007f61008f366004610399565b6101bd565b61009c6102e8565b6040516100a991906103b2565b60405180910390f35b6001546040519081526020016100a9565b6100d66100d1366004610399565b610340565b60405190151581526020016100a9565b60005473ffffffffffffffffffffffffffffffffffffffff16331461015e5760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b60648201526084015b60405180910390fd5b61016781610340565b6101ba5760018054808201825560008290527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60182905580546101aa91906103f6565b6000828152600260205260409020555b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102305760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b6064820152608401610155565b61023981610340565b156101ba576000818152600260205260408120549060018061025a60015490565b61026491906103f6565b815481106102745761027461041b565b9060005260206000200154905080600183815481106102955761029561041b565b60009182526020808320909101929092558281526002909152604080822084905584825281205560018054806102cd576102cd610431565b60019003818190600052602060002001600090559055505050565b6060600180548060200260200160405190810160405280929190818152602001828054801561033657602002820191906000526020600020905b815481526020019060010190808311610322575b5050505050905090565b600061034b60015490565b60000361035a57506000919050565b60008281526002602052604090205415158061039357508160016000815481106103865761038661041b565b9060005260206000200154145b92915050565b6000602082840312156103ab57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103ea578351835292840192918401916001016103ce565b50909695505050505050565b60008282101561041657634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212204af513f4c6ced8d8fbeaf7a242307a0a1384e8a5ba73c71c7d3d2e25f90a3d8164736f6c634300080d0033";

type UintComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UintComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UintComponent__factory extends ContractFactory {
  constructor(...args: UintComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UintComponent> {
    return super.deploy(_gameAddr, overrides || {}) as Promise<UintComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): UintComponent {
    return super.attach(address) as UintComponent;
  }
  override connect(signer: Signer): UintComponent__factory {
    return super.connect(signer) as UintComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UintComponentInterface {
    return new utils.Interface(_abi) as UintComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UintComponent {
    return new Contract(address, _abi, signerOrProvider) as UintComponent;
  }
}
