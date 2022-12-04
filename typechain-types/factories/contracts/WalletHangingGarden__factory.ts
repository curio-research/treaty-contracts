/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  WalletHangingGarden,
  WalletHangingGardenInterface,
} from "../../contracts/WalletHangingGarden";

const _abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_owners",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_diamond",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_homieFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_armyAddress",
        type: "address",
      },
    ],
    name: "approveMove",
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
        internalType: "address",
        name: "_armyAddress",
        type: "address",
      },
    ],
    name: "becomeAHomie",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "diamond",
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
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "executeGameTx",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "executeTx",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "game",
    outputs: [
      {
        internalType: "contract GameFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getter",
    outputs: [
      {
        internalType: "contract GetterFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "homieFee",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "homies",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isHomie",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isOwner",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "owners",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000cbf38038062000cbf8339810160408190526200003491620002c4565b60008351116200008b5760405162461bcd60e51b815260206004820152601660248201527f57616c6c6574206f776e6572732072657175697265640000000000000000000060448201526064015b60405180910390fd5b60005b835181101562000251576000848281518110620000af57620000af620003b3565b6020026020010151905060006001600160a01b0316816001600160a01b0316036200011d5760405162461bcd60e51b815260206004820152601460248201527f496e76616c69642077616c6c6574206f776e6572000000000000000000000000604482015260640162000082565b6001600160a01b03811660009081526006602052604090205460ff1615620001885760405162461bcd60e51b815260206004820152601760248201527f57616c6c6574206f776e6572206e6f7420756e69717565000000000000000000604482015260640162000082565b6001600160a01b031660008181526006602090815260408083208054600160ff199182168117909255600380548084019091557fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0180546001600160a01b031990811688179091556007909452918420805490921681179091556004805491820181559092527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b90910180549091169091179055806200024881620003c9565b9150506200008e565b50600080546001600160a01b039093166001600160a01b0319938416811790915560018054841682179055600280549093161790915560055550620003f1565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b0381168114620002bf57600080fd5b919050565b600080600060608486031215620002da57600080fd5b83516001600160401b0380821115620002f257600080fd5b818601915086601f8301126200030757600080fd5b81516020828211156200031e576200031e62000291565b8160051b604051601f19603f8301168101818110868211171562000346576200034662000291565b60405292835281830193508481018201928a8411156200036557600080fd5b948201945b838610156200038e576200037e86620002a7565b855294820194938201936200036a565b97506200039f9050888201620002a7565b955050505050604084015190509250925092565b634e487b7160e01b600052603260045260246000fd5b600060018201620003ea57634e487b7160e01b600052601160045260246000fd5b5060010190565b6108be80620004016000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806399ba7cdf11610081578063e8661bb91161005b578063e8661bb9146101ec578063f0b7db4e14610203578063fac5e9811461021657600080fd5b806399ba7cdf1461019a578063c3fe3e28146101ad578063e12d6661146101c057600080fd5b806330d6d28e116100b257806330d6d28e1461014f5780635829915d14610164578063993a04b71461018757600080fd5b8063025e7c27146100d957806327a1ed1a146101095780632f54bf6e1461011c575b600080fd5b6100ec6100e736600461064e565b610229565b6040516001600160a01b0390911681526020015b60405180910390f35b6100ec61011736600461064e565b610253565b61013f61012a36600461067f565b60066020526000908152604090205460ff1681565b6040519015158152602001610100565b61016261015d36600461075f565b610263565b005b61013f61017236600461067f565b60076020526000908152604090205460ff1681565b6001546100ec906001600160a01b031681565b6101626101a836600461067f565b610367565b6002546100ec906001600160a01b031681565b61013f6101ce36600461067f565b6001600160a01b031660009081526007602052604090205460ff1690565b6101f560055481565b604051908152602001610100565b6000546100ec906001600160a01b031681565b61016261022436600461079c565b6105c6565b6003818154811061023957600080fd5b6000918252602090912001546001600160a01b0316905081565b6004818154811061023957600080fd5b3360009081526006602052604090205460ff166102d55760405162461bcd60e51b815260206004820152602560248201527f596f7520646f206e6f7420686176652061636365737320746f20746869732077604482015264185b1b195d60da1b60648201526084015b60405180910390fd5b6002546040516001600160a01b0390911690600090819083906102f990869061081c565b6000604051808303816000865af19150503d8060008114610336576040519150601f19603f3d011682016040523d82523d6000602084013e61033b565b606091505b50915091508181906103605760405162461bcd60e51b81526004016102cc9190610838565b5050505050565b6001546040517f381c4fce0000000000000000000000000000000000000000000000000000000081526000916001600160a01b03169063381c4fce906103e19060040160208082526004908201527f476f6c6400000000000000000000000000000000000000000000000000000000604082015260600190565b602060405180830381865afa1580156103fe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610422919061086b565b60055460405133602482015230604482015260648101919091529091506000906001600160a01b0383169060840160408051601f198184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd00000000000000000000000000000000000000000000000000000000179052516104b3919061081c565b6000604051808303816000865af19150503d80600081146104f0576040519150601f19603f3d011682016040523d82523d6000602084013e6104f5565b606091505b50509050806105465760405162461bcd60e51b815260206004820152601660248201527f4661696c20746f2070617920686f6d696520666565210000000000000000000060448201526064016102cc565b50506001600160a01b03166000818152600760205260408120805460ff191660019081179091556003805491820181559091527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169091179055565b3360009081526006602052604090205460ff166106335760405162461bcd60e51b815260206004820152602560248201527f596f7520646f206e6f7420686176652061636365737320746f20746869732077604482015264185b1b195d60da1b60648201526084016102cc565b600080836001600160a01b0316836040516102f9919061081c565b60006020828403121561066057600080fd5b5035919050565b6001600160a01b038116811461067c57600080fd5b50565b60006020828403121561069157600080fd5b813561069c81610667565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f8301126106e357600080fd5b813567ffffffffffffffff808211156106fe576106fe6106a3565b604051601f8301601f19908116603f01168101908282118183101715610726576107266106a3565b8160405283815286602085880101111561073f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60006020828403121561077157600080fd5b813567ffffffffffffffff81111561078857600080fd5b610794848285016106d2565b949350505050565b600080604083850312156107af57600080fd5b82356107ba81610667565b9150602083013567ffffffffffffffff8111156107d657600080fd5b6107e2858286016106d2565b9150509250929050565b60005b838110156108075781810151838201526020016107ef565b83811115610816576000848401525b50505050565b6000825161082e8184602087016107ec565b9190910192915050565b60208152600082518060208401526108578160408501602087016107ec565b601f01601f19169190910160400192915050565b60006020828403121561087d57600080fd5b815161069c8161066756fea264697066735822122022dc03596aec82af14ad01de1a3c36f480fb2875724c13a8c16c9cf09c2ac59764736f6c634300080d0033";

type WalletHangingGardenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WalletHangingGardenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WalletHangingGarden__factory extends ContractFactory {
  constructor(...args: WalletHangingGardenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _owners: PromiseOrValue<string>[],
    _diamond: PromiseOrValue<string>,
    _homieFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WalletHangingGarden> {
    return super.deploy(
      _owners,
      _diamond,
      _homieFee,
      overrides || {}
    ) as Promise<WalletHangingGarden>;
  }
  override getDeployTransaction(
    _owners: PromiseOrValue<string>[],
    _diamond: PromiseOrValue<string>,
    _homieFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _owners,
      _diamond,
      _homieFee,
      overrides || {}
    );
  }
  override attach(address: string): WalletHangingGarden {
    return super.attach(address) as WalletHangingGarden;
  }
  override connect(signer: Signer): WalletHangingGarden__factory {
    return super.connect(signer) as WalletHangingGarden__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WalletHangingGardenInterface {
    return new utils.Interface(_abi) as WalletHangingGardenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WalletHangingGarden {
    return new Contract(address, _abi, signerOrProvider) as WalletHangingGarden;
  }
}
