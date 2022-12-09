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
import type { PromiseOrValue } from "../../../common";
import type {
  HangingGarden,
  HangingGardenInterface,
} from "../../../contracts/treaties/HangingGarden";

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
    inputs: [],
    name: "name",
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
  "0x60806040523480156200001157600080fd5b5060405162000ea938038062000ea98339810160408190526200003491620003a3565b60008351116200008b5760405162461bcd60e51b815260206004820152601660248201527f57616c6c6574206f776e6572732072657175697265640000000000000000000060448201526064015b60405180910390fd5b60005b835181101562000251576000848281518110620000af57620000af62000492565b6020026020010151905060006001600160a01b0316816001600160a01b0316036200011d5760405162461bcd60e51b815260206004820152601460248201527f496e76616c69642077616c6c6574206f776e6572000000000000000000000000604482015260640162000082565b6001600160a01b03811660009081526007602052604090205460ff1615620001885760405162461bcd60e51b815260206004820152601760248201527f57616c6c6574206f776e6572206e6f7420756e69717565000000000000000000604482015260640162000082565b6001600160a01b031660008181526007602090815260408083208054600160ff199182168117909255600480548084019091557f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b0180546001600160a01b031990811688179091556008909452918420805490921681179091556005805491820181559092527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db090910180549091169091179055806200024881620004a8565b9150506200008e565b50600080546001600160a01b0384166001600160a01b031991821681179092556001805482168317905560028054909116909117905560408051808201909152600d8082526c2430b733b4b733a3b0b93232b760991b6020909201918252620002bd91600391620002ca565b50600655506200050c9050565b828054620002d890620004d0565b90600052602060002090601f016020900481019282620002fc576000855562000347565b82601f106200031757805160ff191683800117855562000347565b8280016001018555821562000347579182015b82811115620003475782518255916020019190600101906200032a565b506200035592915062000359565b5090565b5b808211156200035557600081556001016200035a565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b03811681146200039e57600080fd5b919050565b600080600060608486031215620003b957600080fd5b83516001600160401b0380821115620003d157600080fd5b818601915086601f830112620003e657600080fd5b8151602082821115620003fd57620003fd62000370565b8160051b604051601f19603f8301168101818110868211171562000425576200042562000370565b60405292835281830193508481018201928a8411156200044457600080fd5b948201945b838610156200046d576200045d8662000386565b8552948201949382019362000449565b97506200047e905088820162000386565b955050505050604084015190509250925092565b634e487b7160e01b600052603260045260246000fd5b600060018201620004c957634e487b7160e01b600052601160045260246000fd5b5060010190565b600181811c90821680620004e557607f821691505b6020821081036200050657634e487b7160e01b600052602260045260246000fd5b50919050565b61098d806200051c6000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c8063993a04b71161008c578063e12d666111610066578063e12d6661146101e0578063e8661bb91461020c578063f0b7db4e14610223578063fac5e9811461023657600080fd5b8063993a04b7146101a757806399ba7cdf146101ba578063c3fe3e28146101cd57600080fd5b80632f54bf6e116100bd5780632f54bf6e1461013c57806330d6d28e1461016f5780635829915d1461018457600080fd5b8063025e7c27146100e457806306fdde031461011457806327a1ed1a14610129575b600080fd5b6100f76100f23660046106fc565b610249565b6040516001600160a01b0390911681526020015b60405180910390f35b61011c610273565b60405161010b9190610745565b6100f76101373660046106fc565b610301565b61015f61014a366004610790565b60076020526000908152604090205460ff1681565b604051901515815260200161010b565b61018261017d366004610857565b610311565b005b61015f610192366004610790565b60086020526000908152604090205460ff1681565b6001546100f7906001600160a01b031681565b6101826101c8366004610790565b610415565b6002546100f7906001600160a01b031681565b61015f6101ee366004610790565b6001600160a01b031660009081526008602052604090205460ff1690565b61021560065481565b60405190815260200161010b565b6000546100f7906001600160a01b031681565b610182610244366004610894565b610674565b6004818154811061025957600080fd5b6000918252602090912001546001600160a01b0316905081565b60038054610280906108e4565b80601f01602080910402602001604051908101604052809291908181526020018280546102ac906108e4565b80156102f95780601f106102ce576101008083540402835291602001916102f9565b820191906000526020600020905b8154815290600101906020018083116102dc57829003601f168201915b505050505081565b6005818154811061025957600080fd5b3360009081526007602052604090205460ff166103835760405162461bcd60e51b815260206004820152602560248201527f596f7520646f206e6f7420686176652061636365737320746f20746869732077604482015264185b1b195d60da1b60648201526084015b60405180910390fd5b6002546040516001600160a01b0390911690600090819083906103a790869061091e565b6000604051808303816000865af19150503d80600081146103e4576040519150601f19603f3d011682016040523d82523d6000602084013e6103e9565b606091505b509150915081819061040e5760405162461bcd60e51b815260040161037a9190610745565b5050505050565b6001546040517f381c4fce0000000000000000000000000000000000000000000000000000000081526000916001600160a01b03169063381c4fce9061048f9060040160208082526004908201527f476f6c6400000000000000000000000000000000000000000000000000000000604082015260600190565b602060405180830381865afa1580156104ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d0919061093a565b60065460405133602482015230604482015260648101919091529091506000906001600160a01b0383169060840160408051601f198184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd0000000000000000000000000000000000000000000000000000000017905251610561919061091e565b6000604051808303816000865af19150503d806000811461059e576040519150601f19603f3d011682016040523d82523d6000602084013e6105a3565b606091505b50509050806105f45760405162461bcd60e51b815260206004820152601660248201527f4661696c20746f2070617920686f6d6965206665652100000000000000000000604482015260640161037a565b50506001600160a01b03166000818152600860205260408120805460ff191660019081179091556004805491820181559091527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b0180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169091179055565b3360009081526007602052604090205460ff166106e15760405162461bcd60e51b815260206004820152602560248201527f596f7520646f206e6f7420686176652061636365737320746f20746869732077604482015264185b1b195d60da1b606482015260840161037a565b600080836001600160a01b0316836040516103a7919061091e565b60006020828403121561070e57600080fd5b5035919050565b60005b83811015610730578181015183820152602001610718565b8381111561073f576000848401525b50505050565b6020815260008251806020840152610764816040850160208701610715565b601f01601f19169190910160400192915050565b6001600160a01b038116811461078d57600080fd5b50565b6000602082840312156107a257600080fd5b81356107ad81610778565b9392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126107db57600080fd5b813567ffffffffffffffff808211156107f6576107f66107b4565b604051601f8301601f19908116603f0116810190828211818310171561081e5761081e6107b4565b8160405283815286602085880101111561083757600080fd5b836020870160208301376000602085830101528094505050505092915050565b60006020828403121561086957600080fd5b813567ffffffffffffffff81111561088057600080fd5b61088c848285016107ca565b949350505050565b600080604083850312156108a757600080fd5b82356108b281610778565b9150602083013567ffffffffffffffff8111156108ce57600080fd5b6108da858286016107ca565b9150509250929050565b600181811c908216806108f857607f821691505b60208210810361091857634e487b7160e01b600052602260045260246000fd5b50919050565b60008251610930818460208701610715565b9190910192915050565b60006020828403121561094c57600080fd5b81516107ad8161077856fea26469706673582212206f29ff66123e1d9d428fc1b91360e1b9914bac11e2b0a4d595232c5c1ac925c364736f6c634300080d0033";

type HangingGardenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HangingGardenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HangingGarden__factory extends ContractFactory {
  constructor(...args: HangingGardenConstructorParams) {
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
  ): Promise<HangingGarden> {
    return super.deploy(
      _owners,
      _diamond,
      _homieFee,
      overrides || {}
    ) as Promise<HangingGarden>;
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
  override attach(address: string): HangingGarden {
    return super.attach(address) as HangingGarden;
  }
  override connect(signer: Signer): HangingGarden__factory {
    return super.connect(signer) as HangingGarden__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HangingGardenInterface {
    return new utils.Interface(_abi) as HangingGardenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HangingGarden {
    return new Contract(address, _abi, signerOrProvider) as HangingGarden;
  }
}
