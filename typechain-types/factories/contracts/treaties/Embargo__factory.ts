/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Embargo,
  EmbargoInterface,
} from "../../../contracts/treaties/Embargo";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_diamond",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
    ],
    name: "addToSanctionList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "contract AdminFacet",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveBattle",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveClaimTile",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDelegateGameFunction",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDeployTreaty",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDisbandArmy",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDisownTile",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveEndGather",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveEndTroopProduction",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveHarvestResource",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveHarvestResourcesFromCapital",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveJoinTreaty",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveLeaveTreaty",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveMoveCapital",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveOrganizeArmy",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveRecoverTile",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStartGather",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStartTroopProduction",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveTransfer",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUnloadResources",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeCapital",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeResource",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeTile",
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
    name: "description",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "minimumStayCheck",
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
    inputs: [],
    name: "ownerID",
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
    inputs: [],
    name: "registerTreatyAndOwnerIds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
    ],
    name: "removeFromSanctionList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
    ],
    name: "removeMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sanctionList",
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
        internalType: "string",
        name: "_functionName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_subjectID",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_canCall",
        type: "bool",
      },
    ],
    name: "treatyDelegateGameFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyID",
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
    inputs: [],
    name: "treatyJoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyLeave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620020ab380380620020ab833981016040819052620000349162000245565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280548316821790556003805490921617905560408051808201909152600780825266456d626172676f60c81b60209092019182526200010c9160049162000191565b50604051806080016040528060478152602001620020646047913980516200013d9160059160209091019062000191565b506040516200014c9062000220565b604051809103906000f08015801562000169573d6000803e3d6000fd5b50600880546001600160a01b0319166001600160a01b039290921691909117905550620002b3565b8280546200019f9062000277565b90600052602060002090601f016020900481019282620001c357600085556200020e565b82601f10620001de57805160ff19168380011785556200020e565b828001600101855582156200020e579182015b828111156200020e578251825591602001919060010190620001f1565b506200021c9291506200022e565b5090565b6103b88062001cac83390190565b5b808211156200021c57600081556001016200022f565b6000602082840312156200025857600080fd5b81516001600160a01b03811681146200027057600080fd5b9392505050565b600181811c908216806200028c57607f821691505b602082108103620002ad57634e487b7160e01b600052602260045260246000fd5b50919050565b6119e980620002c36000396000f3fe608060405234801561001057600080fd5b50600436106102c75760003560e01c80636a2a2b4e1161017b578063cbb34e86116100d8578063ec19ae801161008c578063f2e1730b11610071578063f2e1730b146102cc578063f851a44014610421578063fa91f75e146102cc57600080fd5b8063ec19ae80146102cc578063f0b7db4e1461040e57600080fd5b8063d924100e116100bd578063d924100e14610405578063e534ae5f146102cc578063e75991fa146102cc57600080fd5b8063cbb34e86146102cc578063d553ed48146102cc57600080fd5b8063a1a74aae1161012f578063b250ede511610114578063b250ede5146103ea578063c009a6cb146102cc578063c3fe3e28146103f257600080fd5b8063a1a74aae146103d7578063a83280bc146102cc57600080fd5b80637284e416116101605780637284e416146103bc578063993a04b7146103c45780639bcecd0b146102cc57600080fd5b80636a2a2b4e146102cc5780636a333c39146103a557600080fd5b80632d47fe271161022957806347b958a6116101dd5780634cdf2077116101c25780634cdf20771461037a5780635f310b12146102cc57806360acfcc6146102cc57600080fd5b806347b958a6146103725780634ad30a91146102cc57600080fd5b8063374155161161020e57806337415516146102cc578063386e87331461035f57806339ebfad4146102cc57600080fd5b80632d47fe27146102cc5780632efd66291461034c57600080fd5b80631e15495c1161028057806328f59b831161026557806328f59b83146103315780632b451c64146102cc5780632b9b15ad1461033957600080fd5b80631e15495c1461031e578063243086c4146102cc57600080fd5b806306fdde03116102b157806306fdde03146102f45780630af32903146103095780631c357173146102cc57600080fd5b8062048f5a146102cc57806304dc7c74146102cc575b600080fd5b6102df6102da3660046116a8565b610434565b60405190151581526020015b60405180910390f35b6102fc61049e565b6040516102eb919061175f565b61031c610317366004611779565b61052c565b005b6102df61032c3660046116a8565b6107de565b61031c61092c565b6102df610347366004611792565b610a23565b61031c61035a3660046117c2565b610c57565b61031c61036d366004611779565b610d4c565b61031c610fcb565b60085461038d906001600160a01b031681565b6040516001600160a01b0390911681526020016102eb565b6103ae60065481565b6040519081526020016102eb565b6102fc6110c5565b60025461038d906001600160a01b031681565b61031c6103e5366004611779565b6110d2565b61031c6113af565b60015461038d906001600160a01b031681565b6103ae60075481565b60005461038d906001600160a01b031681565b60035461038d906001600160a01b031681565b600080546001600160a01b031633146104945760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b600480546104ab90611831565b80601f01602080910402602001604051908101604052809291908181526020018280546104d790611831565b80156105245780601f106104f957610100808354040283529160200191610524565b820191906000526020600020905b81548152906001019060200180831161050757829003601f168201915b505050505081565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610575573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610599919061186b565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156105fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106219190611884565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161064e91815260200190565b600060405180830381865afa15801561066b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261069391908101906118ad565b8060200190518101906106a6919061186b565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa1580156106ef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610713919061186b565b81146107615760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161048b565b6008546040517f4cc82215000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b0390911690634cc82215906024015b600060405180830381600087803b1580156107c157600080fd5b505af11580156107d5573d6000803e3d6000fd5b50505050505050565b600080828060200190518101906107f5919061191b565b506002546040517ff27fe5da000000000000000000000000000000000000000000000000000000008152600481018390529192506000916001600160a01b039091169063f27fe5da90602401602060405180830381865afa15801561085e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610882919061186b565b6008546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690639f161b0a90602401602060405180830381865afa1580156108e5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610909919061193f565b1561091957600092505050610498565b6109238585610434565b95945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610975573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610999919061186b565b90506109a681601e610a23565b610a185760405162461bcd60e51b815260206004820152603060248201527f4e41506163743a204e6174696f6e206d757374207374617920666f722061742060448201527f6c65617374203330207365636f6e647300000000000000000000000000000000606482015260840161048b565b610a2061152c565b50565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa158015610a70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a94919061186b565b6002546040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610b10573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b349190611884565b6002546040517f688513b200000000000000000000000000000000000000000000000000000000815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa158015610ba5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc9919061186b565b6040518263ffffffff1660e01b8152600401610be791815260200190565b600060405180830381865afa158015610c04573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610c2c91908101906118ad565b806020019051810190610c3f919061186b565b9050610c4b848261195c565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610ca0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc4919061186b565b6003546040517fef3e41660000000000000000000000000000000000000000000000000000000081529192506001600160a01b03169063ef3e416690610d14908490889088908890600401611982565b600060405180830381600087803b158015610d2e57600080fd5b505af1158015610d42573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610d95573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db9919061186b565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610e1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e419190611884565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b8152600401610e6e91815260200190565b600060405180830381865afa158015610e8b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610eb391908101906118ad565b806020019051810190610ec6919061186b565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa158015610f0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f33919061186b565b8114610f815760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161048b565b6008546040517f1003e2d2000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b0390911690631003e2d2906024016107a7565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611014573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611038919061186b565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af115801561109d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110c1919061186b565b5050565b600580546104ab90611831565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561111b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061113f919061186b565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156111a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c79190611884565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b81526004016111f491815260200190565b600060405180830381865afa158015611211573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261123991908101906118ad565b80602001905181019061124c919061186b565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa158015611295573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112b9919061186b565b81146113075760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161048b565b6003546040517f1f0971bc000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b0390911690631f0971bc90602401600060405180830381600087803b15801561136657600080fd5b505af115801561137a573d6000803e3d6000fd5b50506003546040516317ff785160e21b8152600481018790526001600160a01b039091169250635ffde14491506024016107a7565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa1580156113f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061141b919061186b565b6006556002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561147c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114a09190611884565b6001600160a01b0316634c518fdc6006546040518263ffffffff1660e01b81526004016114cf91815260200190565b600060405180830381865afa1580156114ec573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261151491908101906118ad565b806020019051810190611527919061186b565b600755565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611575573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611599919061186b565b6003546040516317ff785160e21b8152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b1580156115e057600080fd5b505af11580156115f4573d6000803e3d6000fd5b5050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561163a5761163a6115fb565b604052919050565b600067ffffffffffffffff82111561165c5761165c6115fb565b50601f01601f191660200190565b600061167d61167884611642565b611611565b905082815283838301111561169157600080fd5b828260208301376000602084830101529392505050565b600080604083850312156116bb57600080fd5b82359150602083013567ffffffffffffffff8111156116d957600080fd5b8301601f810185136116ea57600080fd5b6116f98582356020840161166a565b9150509250929050565b60005b8381101561171e578181015183820152602001611706565b8381111561172d576000848401525b50505050565b6000815180845261174b816020860160208601611703565b601f01601f19169290920160200192915050565b6020815260006117726020830184611733565b9392505050565b60006020828403121561178b57600080fd5b5035919050565b600080604083850312156117a557600080fd5b50508035926020909101359150565b8015158114610a2057600080fd5b6000806000606084860312156117d757600080fd5b833567ffffffffffffffff8111156117ee57600080fd5b8401601f810186136117ff57600080fd5b61180e8682356020840161166a565b935050602084013591506040840135611826816117b4565b809150509250925092565b600181811c9082168061184557607f821691505b60208210810361186557634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561187d57600080fd5b5051919050565b60006020828403121561189657600080fd5b81516001600160a01b038116811461177257600080fd5b6000602082840312156118bf57600080fd5b815167ffffffffffffffff8111156118d657600080fd5b8201601f810184136118e757600080fd5b80516118f561167882611642565b81815285602083850101111561190a57600080fd5b610923826020830160208601611703565b6000806040838503121561192e57600080fd5b505080516020909101519092909150565b60006020828403121561195157600080fd5b8151611772816117b4565b6000821982111561197d57634e487b7160e01b600052601160045260246000fd5b500190565b84815260806020820152600061199b6080830186611733565b6040830194909452509015156060909101529291505056fea2646970667358221220875bc3bd4ed43acff7c569cd196d54cc857115a7f53dbba9233b7dc4526d187564736f6c634300080d0033608060405234801561001057600080fd5b50610398806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a3660046102b4565b6100e6565b005b61007f61008f3660046102b4565b61014f565b61009c61020b565b6040516100a991906102cd565b60405180910390f35b6000546040519081526020016100a9565b6100d66100d13660046102b4565b610263565b60405190151581526020016100a9565b6100ef81610263565b156100f75750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561013360005490565b61013d9190610311565b60009182526001602052604090912055565b61015881610263565b61015f5750565b60008181526001602081905260408220549190819061017d60005490565b6101879190610311565b8154811061019757610197610336565b9060005260206000200154905080600083815481106101b8576101b8610336565b60009182526020808320909101929092558281526001909152604080822084905584825281208190558054806101f0576101f061034c565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561025957602002820191906000526020600020905b815481526020019060010190808311610245575b5050505050905090565b6000805460000361027657506000919050565b6000828152600160205260409020541515806102ae575081600080815481106102a1576102a1610336565b9060005260206000200154145b92915050565b6000602082840312156102c657600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610305578351835292840192918401916001016102e9565b50909695505050505050565b60008282101561033157634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122044a6b59e3f4cc51fb52700a3a654b0f0db6451ab7312e182fced1c3775e1cd3d64736f6c634300080d00334f776e6572206f6620746865204c65616775652063616e20706f696e7420746f207768696368206e6174696f6e20746865206c65616775652069732073616e6374696f6e696e67";

type EmbargoConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EmbargoConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Embargo__factory extends ContractFactory {
  constructor(...args: EmbargoConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Embargo> {
    return super.deploy(_diamond, overrides || {}) as Promise<Embargo>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): Embargo {
    return super.attach(address) as Embargo;
  }
  override connect(signer: Signer): Embargo__factory {
    return super.connect(signer) as Embargo__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EmbargoInterface {
    return new utils.Interface(_abi) as EmbargoInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Embargo {
    return new Contract(address, _abi, signerOrProvider) as Embargo;
  }
}
