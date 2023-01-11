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
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
    ],
    name: "addToWhitelist",
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
    name: "removeFromWhitelist",
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
  "0x60806040523480156200001157600080fd5b50604051620027913803806200279183398101604081905262000034916200024a565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280548316821790556003805490921617905560408051808201909152600c8082526b115b58985c99dbc8141858dd60a21b6020909201918252620001119160049162000196565b506040518060800160405280604781526020016200274a604791398051620001429160059160209091019062000196565b50604051620001519062000225565b604051809103906000f0801580156200016e573d6000803e3d6000fd5b50600880546001600160a01b0319166001600160a01b039290921691909117905550620002b8565b828054620001a4906200027c565b90600052602060002090601f016020900481019282620001c8576000855562000213565b82601f10620001e357805160ff191683800117855562000213565b8280016001018555821562000213579182015b8281111562000213578251825591602001919060010190620001f6565b506200022192915062000233565b5090565b6103b8806200239283390190565b5b8082111562000221576000815560010162000234565b6000602082840312156200025d57600080fd5b81516001600160a01b03811681146200027557600080fd5b9392505050565b600181811c908216806200029157607f821691505b602082108103620002b257634e487b7160e01b600052602260045260246000fd5b50919050565b6120ca80620002c86000396000f3fe608060405234801561001057600080fd5b50600436106102dd5760003560e01c80636a2a2b4e11610186578063cbb34e86116100e3578063ec19ae8011610097578063f2e1730b11610071578063f2e1730b146102e2578063f851a4401461045d578063fa91f75e146102e257600080fd5b8063ec19ae80146102e2578063f0b7db4e14610437578063f2395dc31461044a57600080fd5b8063d924100e116100c8578063d924100e1461042e578063e534ae5f146102e2578063e75991fa146102e257600080fd5b8063cbb34e86146102e2578063d553ed48146102e257600080fd5b8063a1a74aae1161013a578063b250ede51161011f578063b250ede514610413578063c009a6cb146102e2578063c3fe3e281461041b57600080fd5b8063a1a74aae14610400578063a83280bc146102e257600080fd5b80637284e4161161016b5780637284e416146103e5578063993a04b7146103ed5780639bcecd0b146102e257600080fd5b80636a2a2b4e146102e25780636a333c39146103ce57600080fd5b80632b9b15ad1161023f57806339ebfad4116101f35780634cdf2077116101cd5780634cdf2077146103a35780635f310b12146102e257806360acfcc6146102e257600080fd5b806339ebfad4146102e257806347b958a61461039b5780634ad30a91146102e257600080fd5b80632efd6629116102245780632efd66291461037557806337415516146102e2578063386e87331461038857600080fd5b80632b9b15ad146103625780632d47fe27146102e257600080fd5b80631c35717311610296578063243086c41161027b578063243086c4146102e257806328f59b831461035a5780632b451c64146102e257600080fd5b80631c357173146102e25780631e15495c1461034757600080fd5b806306fdde03116102c757806306fdde031461030a5780630af329031461031f57806314f2c4351461033457600080fd5b8062048f5a146102e257806304dc7c74146102e2575b600080fd5b6102f56102f0366004611d89565b610470565b60405190151581526020015b60405180910390f35b6103126104da565b6040516103019190611e40565b61033261032d366004611e5a565b610568565b005b610332610342366004611e5a565b61081a565b6102f5610355366004611d89565b610a99565b610332610be7565b6102f5610370366004611e73565b610cde565b610332610383366004611ea3565b610f12565b610332610396366004611e5a565b611007565b610332611286565b6008546103b6906001600160a01b031681565b6040516001600160a01b039091168152602001610301565b6103d760065481565b604051908152602001610301565b61031261145f565b6002546103b6906001600160a01b031681565b61033261040e366004611e5a565b61146c565b610332611730565b6001546103b6906001600160a01b031681565b6103d760075481565b6000546103b6906001600160a01b031681565b610332610458366004611e5a565b6118ad565b6003546103b6906001600160a01b031681565b600080546001600160a01b031633146104d05760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b600480546104e790611f12565b80601f016020809104026020016040519081016040528092919081815260200182805461051390611f12565b80156105605780601f1061053557610100808354040283529160200191610560565b820191906000526020600020905b81548152906001019060200180831161054357829003601f168201915b505050505081565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156105b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d59190611f4c565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610639573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065d9190611f65565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161068a91815260200190565b600060405180830381865afa1580156106a7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106cf9190810190611f8e565b8060200190518101906106e29190611f4c565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa15801561072b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074f9190611f4c565b811461079d5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c60448201526064016104c7565b6008546040517f4cc82215000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b0390911690634cc82215906024015b600060405180830381600087803b1580156107fd57600080fd5b505af1158015610811573d6000803e3d6000fd5b50505050505050565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610863573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108879190611f4c565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156108eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090f9190611f65565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161093c91815260200190565b600060405180830381865afa158015610959573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109819190810190611f8e565b8060200190518101906109949190611f4c565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa1580156109dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a019190611f4c565b8114610a4f5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c60448201526064016104c7565b6003546040517f37e9323a000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b03909116906337e9323a906024016107e3565b60008082806020019051810190610ab09190611ffc565b506002546040517ff27fe5da000000000000000000000000000000000000000000000000000000008152600481018390529192506000916001600160a01b039091169063f27fe5da90602401602060405180830381865afa158015610b19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b3d9190611f4c565b6008546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690639f161b0a90602401602060405180830381865afa158015610ba0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc49190612020565b15610bd4576000925050506104d4565b610bde8585610470565b95945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610c30573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c549190611f4c565b9050610c6181601e610cde565b610cd35760405162461bcd60e51b815260206004820152603060248201527f4e41506163743a204e6174696f6e206d757374207374617920666f722061742060448201527f6c65617374203330207365636f6e64730000000000000000000000000000000060648201526084016104c7565b610cdb611b13565b50565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa158015610d2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4f9190611f4c565b6002546040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610dcb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610def9190611f65565b6002546040517f688513b200000000000000000000000000000000000000000000000000000000815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa158015610e60573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e849190611f4c565b6040518263ffffffff1660e01b8152600401610ea291815260200190565b600060405180830381865afa158015610ebf573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ee79190810190611f8e565b806020019051810190610efa9190611f4c565b9050610f06848261203d565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610f5b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f7f9190611f4c565b6003546040517f66e39e790000000000000000000000000000000000000000000000000000000081529192506001600160a01b0316906366e39e7990610fcf908490889088908890600401612063565b600060405180830381600087803b158015610fe957600080fd5b505af1158015610ffd573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611050573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110749190611f4c565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156110d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110fc9190611f65565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161112991815260200190565b600060405180830381865afa158015611146573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261116e9190810190611f8e565b8060200190518101906111819190611f4c565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa1580156111ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111ee9190611f4c565b811461123c5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c60448201526064016104c7565b6008546040517f1003e2d2000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b0390911690631003e2d2906024016107e3565b60025460405163b356003960e01b81523360048201526001600160a01b039091169063d4c8cfb190829063b356003990602401602060405180830381865afa1580156112d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112fa9190611f4c565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015611342573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113669190611f4c565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401602060405180830381865afa1580156113bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113e39190612020565b6114555760405162461bcd60e51b815260206004820152602e60248201527f437572696f5472656174793a204f6e6c792077686974656c6973746564206e6160448201527f74696f6e732063616e2063616c6c00000000000000000000000000000000000060648201526084016104c7565b61145d611be2565b565b600580546104e790611f12565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156114b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114d99190611f4c565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561153d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115619190611f65565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161158e91815260200190565b600060405180830381865afa1580156115ab573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526115d39190810190611f8e565b8060200190518101906115e69190611f4c565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa15801561162f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116539190611f4c565b81146116a15760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c60448201526064016104c7565b6003546040516307c25c6f60e21b8152600481018590526001600160a01b0390911690631f0971bc90602401600060405180830381600087803b1580156116e757600080fd5b505af11580156116fb573d6000803e3d6000fd5b50506003546040516317ff785160e21b8152600481018790526001600160a01b039091169250635ffde14491506024016107e3565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015611778573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061179c9190611f4c565b6006556002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156117fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118219190611f65565b6001600160a01b0316634c518fdc6006546040518263ffffffff1660e01b815260040161185091815260200190565b600060405180830381865afa15801561186d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526118959190810190611f8e565b8060200190518101906118a89190611f4c565b600755565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156118f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061191a9190611f4c565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561197e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119a29190611f65565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b81526004016119cf91815260200190565b600060405180830381865afa1580156119ec573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611a149190810190611f8e565b806020019051810190611a279190611f4c565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa158015611a70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a949190611f4c565b8114611ae25760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c60448201526064016104c7565b6003546040516307c25c6f60e21b8152600481018590526001600160a01b0390911690631f0971bc906024016107e3565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611b5c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b809190611f4c565b6003546040516317ff785160e21b8152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b158015611bc757600080fd5b505af1158015611bdb573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611c2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c4f9190611f4c565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015611cb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cd89190611f4c565b5050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611d1b57611d1b611cdc565b604052919050565b600067ffffffffffffffff821115611d3d57611d3d611cdc565b50601f01601f191660200190565b6000611d5e611d5984611d23565b611cf2565b9050828152838383011115611d7257600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611d9c57600080fd5b82359150602083013567ffffffffffffffff811115611dba57600080fd5b8301601f81018513611dcb57600080fd5b611dda85823560208401611d4b565b9150509250929050565b60005b83811015611dff578181015183820152602001611de7565b83811115611e0e576000848401525b50505050565b60008151808452611e2c816020860160208601611de4565b601f01601f19169290920160200192915050565b602081526000611e536020830184611e14565b9392505050565b600060208284031215611e6c57600080fd5b5035919050565b60008060408385031215611e8657600080fd5b50508035926020909101359150565b8015158114610cdb57600080fd5b600080600060608486031215611eb857600080fd5b833567ffffffffffffffff811115611ecf57600080fd5b8401601f81018613611ee057600080fd5b611eef86823560208401611d4b565b935050602084013591506040840135611f0781611e95565b809150509250925092565b600181811c90821680611f2657607f821691505b602082108103611f4657634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215611f5e57600080fd5b5051919050565b600060208284031215611f7757600080fd5b81516001600160a01b0381168114611e5357600080fd5b600060208284031215611fa057600080fd5b815167ffffffffffffffff811115611fb757600080fd5b8201601f81018413611fc857600080fd5b8051611fd6611d5982611d23565b818152856020838501011115611feb57600080fd5b610bde826020830160208601611de4565b6000806040838503121561200f57600080fd5b505080516020909101519092909150565b60006020828403121561203257600080fd5b8151611e5381611e95565b6000821982111561205e57634e487b7160e01b600052601160045260246000fd5b500190565b84815260806020820152600061207c6080830186611e14565b6040830194909452509015156060909101529291505056fea26469706673582212203f754fcb4f8c663f7901190a4671d30a350c81cc471da59810799af79a810be564736f6c634300080d0033608060405234801561001057600080fd5b50610398806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a3660046102b4565b6100e6565b005b61007f61008f3660046102b4565b61014f565b61009c61020b565b6040516100a991906102cd565b60405180910390f35b6000546040519081526020016100a9565b6100d66100d13660046102b4565b610263565b60405190151581526020016100a9565b6100ef81610263565b156100f75750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561013360005490565b61013d9190610311565b60009182526001602052604090912055565b61015881610263565b61015f5750565b60008181526001602081905260408220549190819061017d60005490565b6101879190610311565b8154811061019757610197610336565b9060005260206000200154905080600083815481106101b8576101b8610336565b60009182526020808320909101929092558281526001909152604080822084905584825281208190558054806101f0576101f061034c565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561025957602002820191906000526020600020905b815481526020019060010190808311610245575b5050505050905090565b6000805460000361027657506000919050565b6000828152600160205260409020541515806102ae575081600080815481106102a1576102a1610336565b9060005260206000200154145b92915050565b6000602082840312156102c657600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610305578351835292840192918401916001016102e9565b50909695505050505050565b60008282101561033157634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122044a6b59e3f4cc51fb52700a3a654b0f0db6451ab7312e182fced1c3775e1cd3d64736f6c634300080d00334f776e6572206f6620746865204c65616775652063616e20706f696e7420746f207768696368206e6174696f6e20746865206c65616775652069732073616e6374696f6e696e67";

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
