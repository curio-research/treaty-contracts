/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  SimpleOTC,
  SimpleOTCInterface,
} from "../../../contracts/treaties/SimpleOTC";

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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addrHasSellOrder",
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
    name: "addrToSellOrder",
    outputs: [
      {
        internalType: "string",
        name: "sellTokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "buyTokenName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "sellTokenPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sellTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
    ],
    name: "buyOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cancelSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_sellTokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_buyTokenName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_sellTokenPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sellTokenAmount",
        type: "uint256",
      },
    ],
    name: "createSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x60806040523480156200001157600080fd5b506040516200242138038062002421833981016040819052620000349162000217565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280548316821790556003805490921617905560408051808201909152601c8082527f53696d706c65204f54432054726164696e672041677265656d656e74000000006020909201918252620001229160049162000171565b5060408051808201909152601b8082527f4f54432054726164696e67206265747765656e20706c617965727300000000006020909201918252620001699160059162000171565b505062000285565b8280546200017f9062000249565b90600052602060002090601f016020900481019282620001a35760008555620001ee565b82601f10620001be57805160ff1916838001178555620001ee565b82800160010185558215620001ee579182015b82811115620001ee578251825591602001919060010190620001d1565b50620001fc92915062000200565b5090565b5b80821115620001fc576000815560010162000201565b6000602082840312156200022a57600080fd5b81516001600160a01b03811681146200024257600080fd5b9392505050565b600181811c908216806200025e57607f821691505b6020821081036200027f57634e487b7160e01b600052602260045260246000fd5b50919050565b61218c80620002956000396000f3fe608060405234801561001057600080fd5b50600436106102d25760003560e01c80636a2a2b4e11610186578063c3fe3e28116100e3578063e75991fa11610097578063f2e1730b11610071578063f2e1730b146102d7578063f851a44014610442578063fa91f75e146102d757600080fd5b8063e75991fa146102d7578063ec19ae80146102d7578063f0b7db4e1461042f57600080fd5b8063d553ed48116100c8578063d553ed48146102d7578063d924100e14610426578063e534ae5f146102d757600080fd5b8063c3fe3e2814610413578063cbb34e86146102d757600080fd5b8063993a04b71161013a578063a83280bc1161011f578063a83280bc146102d7578063b250ede51461040b578063c009a6cb146102d757600080fd5b8063993a04b7146103e05780639bcecd0b146102d757600080fd5b80636bcae0ff1161016b5780636bcae0ff146103a25780637284e416146103b55780638590ac43146103bd57600080fd5b80636a2a2b4e146102d75780636a333c391461038b57600080fd5b80632efd6629116102345780634ad30a91116101e85780635f310b12116101cd5780635f310b12146102d757806360acfcc6146102d757806361c03b6f1461037857600080fd5b80634ad30a91146102d7578063554763be1461035457600080fd5b806339b506881161021957806339b506881461034457806339ebfad4146102d757806347b958a61461034c57600080fd5b80632efd66291461033157806337415516146102d757600080fd5b8063243086c41161028b5780632b451c64116102705780632b451c64146102d75780632b9b15ad1461031e5780632d47fe27146102d757600080fd5b8063243086c4146102d757806328f59b831461031457600080fd5b806306fdde03116102bc57806306fdde03146102ff5780631c357173146102d75780631e15495c146102d757600080fd5b8062048f5a146102d757806304dc7c74146102d7575b600080fd5b6102ea6102e5366004611d55565b610455565b60405190151581526020015b60405180910390f35b6103076104be565b6040516102f69190611e0c565b61031c61054c565b005b6102ea61032c366004611e26565b610634565b61031c61033f366004611e79565b610868565b61031c61095d565b61031c610e25565b610367610362366004611ee9565b610f1f565b6040516102f6959493929190611f06565b61031c610386366004611ee9565b61105d565b61039460065481565b6040519081526020016102f6565b61031c6103b0366004611f49565b611722565b610307611a6d565b6102ea6103cb366004611ee9565b60096020526000908152604090205460ff1681565b6002546103f3906001600160a01b031681565b6040516001600160a01b0390911681526020016102f6565b61031c611a7a565b6001546103f3906001600160a01b031681565b61039460075481565b6000546103f3906001600160a01b031681565b6003546103f3906001600160a01b031681565b600080546001600160a01b031633146104b55760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b50600192915050565b600480546104cb90611fbd565b80601f01602080910402602001604051908101604052809291908181526020018280546104f790611fbd565b80156105445780601f1061051957610100808354040283529160200191610544565b820191906000526020600020905b81548152906001019060200180831161052757829003601f168201915b505050505081565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610595573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b99190611ff7565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561061957600080fd5b505af115801561062d573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa158015610681573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a59190611ff7565b6002546040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610721573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107459190612010565b6002546040517f688513b200000000000000000000000000000000000000000000000000000000815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa1580156107b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107da9190611ff7565b6040518263ffffffff1660e01b81526004016107f891815260200190565b600060405180830381865afa158015610815573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261083d919081019061202d565b8060200190518101906108509190611ff7565b905061085c84826120ba565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156108b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d59190611ff7565b6003546040517f66e39e790000000000000000000000000000000000000000000000000000000081529192506001600160a01b0316906366e39e79906109259084908890889088906004016120d2565b600060405180830381600087803b15801561093f57600080fd5b505af1158015610953573d6000803e3d6000fd5b5050505050505050565b3360009081526009602052604090205460ff166109e25760405162461bcd60e51b815260206004820152602560248201527f4f54433a20596f7520646f6e2774206861766520616e206578697374696e672060448201527f6f7264657200000000000000000000000000000000000000000000000000000060648201526084016104ac565b33600090815260086020526040902060040154607890610a029042612103565b11610a755760405162461bcd60e51b815260206004820152603060248201527f4f54433a204f726465722077617320637265617465642077697468696e20746860448201527f65206c6173742032206d696e757465730000000000000000000000000000000060648201526084016104ac565b33600090815260086020526040808220815160a08101909252805482908290610a9d90611fbd565b80601f0160208091040260200160405190810160405280929190818152602001828054610ac990611fbd565b8015610b165780601f10610aeb57610100808354040283529160200191610b16565b820191906000526020600020905b815481529060010190602001808311610af957829003601f168201915b50505050508152602001600182018054610b2f90611fbd565b80601f0160208091040260200160405190810160405280929190818152602001828054610b5b90611fbd565b8015610ba85780601f10610b7d57610100808354040283529160200191610ba8565b820191906000526020600020905b815481529060010190602001808311610b8b57829003601f168201915b5050509183525050600282810154602083015260038301546040808401919091526004938401546060909301929092525483519151631c0e27e760e11b81529394506000936001600160a01b039091169263381c4fce92610c0b92909101611e0c565b602060405180830381865afa158015610c28573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c4c9190612010565b60025460405163b356003960e01b81523360048201529192506000916001600160a01b039091169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610caa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cce9190611ff7565b6040518263ffffffff1660e01b8152600401610cec91815260200190565b602060405180830381865afa158015610d09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2d9190611ff7565b6040518263ffffffff1660e01b8152600401610d4b91815260200190565b602060405180830381865afa158015610d68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d8c9190612010565b606084015160405163a9059cbb60e01b81526001600160a01b038084166004830152602482019290925291925083169063a9059cbb906044016020604051808303816000875af1158015610de4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e08919061211a565b5050336000908152600960205260409020805460ff191690555050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610e6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e929190611ff7565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015610ef7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1b9190611ff7565b5050565b600860205260009081526040902080548190610f3a90611fbd565b80601f0160208091040260200160405190810160405280929190818152602001828054610f6690611fbd565b8015610fb35780601f10610f8857610100808354040283529160200191610fb3565b820191906000526020600020905b815481529060010190602001808311610f9657829003601f168201915b505050505090806001018054610fc890611fbd565b80601f0160208091040260200160405190810160405280929190818152602001828054610ff490611fbd565b80156110415780601f1061101657610100808354040283529160200191611041565b820191906000526020600020905b81548152906001019060200180831161102457829003601f168201915b5050505050908060020154908060030154908060040154905085565b6001600160a01b03811660009081526009602052604090205460ff166110eb5760405162461bcd60e51b815260206004820152602a60248201527f4f54433a2053656c6c657220646f65736e2774206861766520616e206578697360448201527f74696e67206f726465720000000000000000000000000000000000000000000060648201526084016104ac565b6001600160a01b038116600090815260086020526040808220815160a0810190925280548290829061111c90611fbd565b80601f016020809104026020016040519081016040528092919081815260200182805461114890611fbd565b80156111955780601f1061116a57610100808354040283529160200191611195565b820191906000526020600020905b81548152906001019060200180831161117857829003601f168201915b505050505081526020016001820180546111ae90611fbd565b80601f01602080910402602001604051908101604052809291908181526020018280546111da90611fbd565b80156112275780601f106111fc57610100808354040283529160200191611227565b820191906000526020600020905b81548152906001019060200180831161120a57829003601f168201915b5050509183525050600282810154602083015260038301546040808401919091526004938401546060909301929092525483519151631c0e27e760e11b81529394506000936001600160a01b039091169263381c4fce9261128a92909101611e0c565b602060405180830381865afa1580156112a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112cb9190612010565b6002546020840151604051631c0e27e760e11b81529293506000926001600160a01b039092169163381c4fce9161130491600401611e0c565b602060405180830381865afa158015611321573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113459190612010565b60025460405163b356003960e01b81523360048201529192506000916001600160a01b039091169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa1580156113a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113c79190611ff7565b6040518263ffffffff1660e01b81526004016113e591815260200190565b602060405180830381865afa158015611402573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114269190611ff7565b6040518263ffffffff1660e01b815260040161144491815260200190565b602060405180830381865afa158015611461573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114859190612010565b60025460405163b356003960e01b81526001600160a01b0388811660048301529293506000929091169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa1580156114e5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115099190611ff7565b6040518263ffffffff1660e01b815260040161152791815260200190565b602060405180830381865afa158015611544573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115689190611ff7565b6040518263ffffffff1660e01b815260040161158691815260200190565b602060405180830381865afa1580156115a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115c79190612010565b606086015160405163a9059cbb60e01b81526001600160a01b038581166004830152602482019290925291925085169063a9059cbb906044016020604051808303816000875af115801561161f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611643919061211a565b50826001600160a01b03166323b872dd8383886040015189606001516116699190612137565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b1681526001600160a01b03938416600482015292909116602483015260448201526064016020604051808303816000875af11580156116d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116f9919061211a565b5050506001600160a01b039093166000908152600960205260409020805460ff19169055505050565b3360009081526009602052604090205460ff16156117825760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f75206861766520616e206578697374696e67206f726465720060448201526064016104ac565b600254604051631c0e27e760e11b81526000916001600160a01b03169063381c4fce906117b3908890600401611e0c565b602060405180830381865afa1580156117d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117f49190612010565b60025460405163b356003960e01b81523360048201529192506000916001600160a01b039091169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015611852573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118769190611ff7565b6040518263ffffffff1660e01b815260040161189491815260200190565b602060405180830381865afa1580156118b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118d59190611ff7565b6040518263ffffffff1660e01b81526004016118f391815260200190565b602060405180830381865afa158015611910573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119349190612010565b6040517f23b872dd0000000000000000000000000000000000000000000000000000000081526001600160a01b03808316600483015230602483015260448201869052919250908316906323b872dd906064016020604051808303816000875af11580156119a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119ca919061211a565b50336000818152600960209081526040808320805460ff19166001179055805160a0810182528a81528083018a90528082018990526060810188905242608082015293835260088252909120825180519192611a2b92849290910190611c0f565b506020828101518051611a449260018501920190611c0f565b506040820151600282015560608201516003820155608090910151600490910155505050505050565b600580546104cb90611fbd565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015611ac2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ae69190611ff7565b6006556002546040516384d969bd60e01b815260206004820152600560248201527f4f776e657200000000000000000000000000000000000000000000000000000060448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa158015611b5f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b839190612010565b6001600160a01b0316634c518fdc6006546040518263ffffffff1660e01b8152600401611bb291815260200190565b600060405180830381865afa158015611bcf573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611bf7919081019061202d565b806020019051810190611c0a9190611ff7565b600755565b828054611c1b90611fbd565b90600052602060002090601f016020900481019282611c3d5760008555611c83565b82601f10611c5657805160ff1916838001178555611c83565b82800160010185558215611c83579182015b82811115611c83578251825591602001919060010190611c68565b50611c8f929150611c93565b5090565b5b80821115611c8f5760008155600101611c94565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611ce757611ce7611ca8565b604052919050565b600067ffffffffffffffff821115611d0957611d09611ca8565b50601f01601f191660200190565b6000611d2a611d2584611cef565b611cbe565b9050828152838383011115611d3e57600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611d6857600080fd5b82359150602083013567ffffffffffffffff811115611d8657600080fd5b8301601f81018513611d9757600080fd5b611da685823560208401611d17565b9150509250929050565b60005b83811015611dcb578181015183820152602001611db3565b83811115611dda576000848401525b50505050565b60008151808452611df8816020860160208601611db0565b601f01601f19169290920160200192915050565b602081526000611e1f6020830184611de0565b9392505050565b60008060408385031215611e3957600080fd5b50508035926020909101359150565b600082601f830112611e5957600080fd5b611e1f83833560208501611d17565b8015158114611e7657600080fd5b50565b600080600060608486031215611e8e57600080fd5b833567ffffffffffffffff811115611ea557600080fd5b611eb186828701611e48565b935050602084013591506040840135611ec981611e68565b809150509250925092565b6001600160a01b0381168114611e7657600080fd5b600060208284031215611efb57600080fd5b8135611e1f81611ed4565b60a081526000611f1960a0830188611de0565b8281036020840152611f2b8188611de0565b60408401969096525050606081019290925260809091015292915050565b60008060008060808587031215611f5f57600080fd5b843567ffffffffffffffff80821115611f7757600080fd5b611f8388838901611e48565b95506020870135915080821115611f9957600080fd5b50611fa687828801611e48565b949794965050505060408301359260600135919050565b600181811c90821680611fd157607f821691505b602082108103611ff157634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561200957600080fd5b5051919050565b60006020828403121561202257600080fd5b8151611e1f81611ed4565b60006020828403121561203f57600080fd5b815167ffffffffffffffff81111561205657600080fd5b8201601f8101841361206757600080fd5b8051612075611d2582611cef565b81815285602083850101111561208a57600080fd5b61209b826020830160208601611db0565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b600082198211156120cd576120cd6120a4565b500190565b8481526080602082015260006120eb6080830186611de0565b60408301949094525090151560609091015292915050565b600082821015612115576121156120a4565b500390565b60006020828403121561212c57600080fd5b8151611e1f81611e68565b6000816000190483118215151615612151576121516120a4565b50029056fea2646970667358221220e6ddd7897990e9e1bbe1c16af6840eb4022fb5d0e3c7a0b71460bbd2bd93fe3264736f6c634300080d0033";

type SimpleOTCConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SimpleOTCConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SimpleOTC__factory extends ContractFactory {
  constructor(...args: SimpleOTCConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SimpleOTC> {
    return super.deploy(_diamond, overrides || {}) as Promise<SimpleOTC>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): SimpleOTC {
    return super.attach(address) as SimpleOTC;
  }
  override connect(signer: Signer): SimpleOTC__factory {
    return super.connect(signer) as SimpleOTC__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleOTCInterface {
    return new utils.Interface(_abi) as SimpleOTCInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleOTC {
    return new Contract(address, _abi, signerOrProvider) as SimpleOTC;
  }
}
