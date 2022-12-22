/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Alliance,
  AllianceInterface,
} from "../../../contracts/treaties/Alliance";

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
    inputs: [],
    name: "goldToken",
    outputs: [
      {
        internalType: "contract CurioERC20",
        name: "",
        type: "address",
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
        name: "_targetArmyID",
        type: "uint256",
      },
    ],
    name: "treatyBesiege",
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
  "0x60806040523480156200001157600080fd5b50604051620020b7380380620020b78339810160408190526200003491620002a4565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b031992831681179091556001805483168217905560028054831682179055600380549092168117909155604051631c0e27e760e11b815263381c4fce90620001179060040160208082526004908201526311dbdb1960e21b604082015260600190565b602060405180830381865afa15801562000135573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200015b9190620002a4565b600680546001600160a01b0319166001600160a01b039290921691909117905560408051808201909152600880825267416c6c69616e636560c01b6020909201918252620001ac91600491620001e5565b506040518060c00160405280608881526020016200202f608891398051620001dd91600591602090910190620001e5565b505062000307565b828054620001f390620002cb565b90600052602060002090601f01602090048101928262000217576000855562000262565b82601f106200023257805160ff191683800117855562000262565b8280016001018555821562000262579182015b828111156200026257825182559160200191906001019062000245565b506200027092915062000274565b5090565b5b8082111562000270576000815560010162000275565b6001600160a01b0381168114620002a157600080fd5b50565b600060208284031215620002b757600080fd5b8151620002c4816200028b565b9392505050565b600181811c90821680620002e057607f821691505b6020821081036200030157634e487b7160e01b600052602260045260246000fd5b50919050565b611d1880620003176000396000f3fe608060405234801561001057600080fd5b506004361061020a5760003560e01c80637284e4161161012a578063cbb34e86116100bd578063ec19ae801161008c578063f2e1730b11610071578063f2e1730b1461020f578063f851a44014610303578063fa91f75e1461020f57600080fd5b8063ec19ae801461020f578063f0b7db4e146102f057600080fd5b8063cbb34e861461020f578063d553ed481461020f578063e534ae5f1461020f578063e75991fa1461020f57600080fd5b80639bcecd0b116100f95780639bcecd0b1461020f578063a83280bc1461020f578063c009a6cb1461020f578063c3fe3e28146102dd57600080fd5b80637284e416146102845780637bc1e8411461028c57806394002b571461029f578063993a04b7146102ca57600080fd5b80632efd6629116101a25780634ad30a91116101715780634ad30a911461020f5780635f310b121461020f57806360acfcc61461020f5780636a2a2b4e1461027157600080fd5b80632efd662914610256578063374155161461020f57806339ebfad41461020f57806347b958a61461026957600080fd5b8063243086c4116101de578063243086c41461020f57806328f59b831461024c5780632b451c641461020f5780632d47fe271461020f57600080fd5b8062048f5a1461020f57806304dc7c741461020f57806306fdde03146102375780631c3571731461020f575b600080fd5b61022261021d3660046117fa565b610316565b60405190151581526020015b60405180910390f35b61023f610380565b60405161022e91906118ad565b61025461040e565b005b6102546102643660046118d5565b6108d4565b6102546109c9565b61022261027f3660046117fa565b610bd4565b61023f610d6a565b61025461029a366004611944565b610d77565b6006546102b2906001600160a01b031681565b6040516001600160a01b03909116815260200161022e565b6002546102b2906001600160a01b031681565b6001546102b2906001600160a01b031681565b6000546102b2906001600160a01b031681565b6003546102b2906001600160a01b031681565b600080546001600160a01b031633146103765760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6004805461038d9061195d565b80601f01602080910402602001604051908101604052809291908181526020018280546103b99061195d565b80156104065780601f106103db57610100808354040283529160200191610406565b820191906000526020600020905b8154815290600101906020018083116103e957829003601f168201915b505050505081565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610457573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047b9190611997565b60025460405163b356003960e01b81523060048201529192506000916001600160a01b039091169063b356003990602401602060405180830381865afa1580156104c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ed9190611997565b6002546040517f84d969bd00000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610582573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a691906119c5565b60025460405163344289d960e11b815260048101869052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa1580156105fe573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106229190611997565b6040518263ffffffff1660e01b815260040161064091815260200190565b600060405180830381865afa15801561065d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261068591908101906119e2565b8060200190518101906106989190611997565b9050600a6106a68242611a6f565b101561071a5760405162461bcd60e51b815260206004820152603260248201527f416c6c69616e63653a204e6174696f6e206d757374207374617920666f72206160448201527f74206c65617374203130207365636f6e64730000000000000000000000000000606482015260840161036d565b6002546040517f29560980000000000000000000000000000000000000000000000000000000008152600481018590526000916001600160a01b03169063b93f9b0a908290632956098090602401602060405180830381865afa158015610785573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a99190611997565b6040518263ffffffff1660e01b81526004016107c791815260200190565b602060405180830381865afa1580156107e4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080891906119c5565b6006546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b0380841660048301526103e8602483015292935091169063a9059cbb906044016020604051808303816000875af1158015610877573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061089b9190611a86565b506108c660405180604001604052806006815260200165426174746c6560d01b8152506000806108d4565b6108ce611572565b50505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561091d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109419190611997565b6003546040517f66e39e790000000000000000000000000000000000000000000000000000000081529192506001600160a01b0316906366e39e7990610991908490889088908890600401611aa3565b600060405180830381600087803b1580156109ab57600080fd5b505af11580156109bf573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610a22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a469190611997565b6040518263ffffffff1660e01b8152600401610a6491815260200190565b602060405180830381865afa158015610a81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa59190611997565b6040518263ffffffff1660e01b8152600401610ac391815260200190565b602060405180830381865afa158015610ae0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0491906119c5565b6006546040517f23b872dd0000000000000000000000000000000000000000000000000000000081526001600160a01b0380841660048301523060248301526103e860448301529293509116906323b872dd906064016020604051808303816000875af1158015610b79573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9d9190611a86565b50610bc960405180604001604052806006815260200165426174746c6560d01b815250600060016108d4565b610bd1611653565b50565b60008082806020019051810190610beb9190611ad4565b60025460405163793ff2ed60e11b815260048101839052919450600093506001600160a01b0316915063f27fe5da90602401602060405180830381865afa158015610c3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c5e9190611997565b60025460405163b356003960e01b81523060048201529192506000916001600160a01b039091169063b356003990602401602060405180830381865afa158015610cac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd09190611997565b60025460405163344289d960e11b815260048101859052602481018390529192506001600160a01b03169063688513b290604401602060405180830381865afa158015610d21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d459190611997565b15610d56576000935050505061037a565b610d608686610316565b9695505050505050565b6005805461038d9061195d565b60025460405163b356003960e01b81523360048201526001600160a01b039091169063688513b290829063b356003990602401602060405180830381865afa158015610dc7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610deb9190611997565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015610e33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e579190611997565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401602060405180830381865afa158015610eb0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed49190611997565b600003610f495760405162461bcd60e51b815260206004820152602160248201527f437572696f5472656174793a204f6e6c79207369676e65722063616e2063616c60448201527f6c00000000000000000000000000000000000000000000000000000000000000606482015260840161036d565b60025460405163793ff2ed60e11b8152600481018390526000916001600160a01b03169063f27fe5da90602401602060405180830381865afa158015610f93573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb79190611997565b60025460405163b356003960e01b81523060048201529192506000916001600160a01b039091169063b356003990602401602060405180830381865afa158015611005573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110299190611997565b60025460405163344289d960e11b815260048101859052602481018390529192506001600160a01b03169063688513b290604401602060405180830381865afa15801561107a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061109e9190611997565b156111115760405162461bcd60e51b815260206004820152602c60248201527f416c6c69616e63653a2043616e6e6f7420626573696567652061726d79206f6660448201527f20616c6c79206e6174696f6e0000000000000000000000000000000000000000606482015260840161036d565b600254604080517fb66e9de70000000000000000000000000000000000000000000000000000000081526004810191909152600d60448201527f5374617274506f736974696f6e000000000000000000000000000000000000006064820152602481018590526000916001600160a01b03169063eead3d8490829063b66e9de7906084016040805180830381865afa1580156111b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111d59190611b51565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b168152815160048201526020909101516024820152604401600060405180830381865afa158015611233573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261125b9190810190611b91565b905060005b815181101561156b5760025482516000916001600160a01b031690636c90bd8b9085908590811061129357611293611c2d565b6020908102919091018101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152815160048201529101516024820152604401600060405180830381865afa1580156112fa573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113229190810190611c43565b905060005b81518110156115565760025482516000916001600160a01b03169063f27fe5da9085908590811061135a5761135a611c2d565b60200260200101516040518263ffffffff1660e01b815260040161138091815260200190565b602060405180830381865afa15801561139d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113c19190611997565b60025460405163344289d960e11b815260048101839052602481018990529192506001600160a01b03169063688513b290604401602060405180830381865afa158015611412573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114369190611997565b156115435760015483516001600160a01b0390911690632a0c52219085908590811061146457611464611c2d565b60200260200101518a6040518363ffffffff1660e01b8152600401611493929190918252602082015260400190565b600060405180830381600087803b1580156114ad57600080fd5b505af11580156114c1573d6000803e3d6000fd5b505060025460405163793ff2ed60e11b8152600481018c90526001600160a01b03909116925063f27fe5da9150602401602060405180830381865afa15801561150e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115329190611997565b600003611543575050505050505050565b508061154e81611cc9565b915050611327565b5050808061156390611cc9565b915050611260565b5050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156115bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115df9190611997565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561163f57600080fd5b505af115801561156b573d6000803e3d6000fd5b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561169c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c09190611997565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015611725573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117499190611997565b5050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561178c5761178c61174d565b604052919050565b600067ffffffffffffffff8211156117ae576117ae61174d565b50601f01601f191660200190565b60006117cf6117ca84611794565b611763565b90508281528383830111156117e357600080fd5b828260208301376000602084830101529392505050565b6000806040838503121561180d57600080fd5b82359150602083013567ffffffffffffffff81111561182b57600080fd5b8301601f8101851361183c57600080fd5b61184b858235602084016117bc565b9150509250929050565b60005b83811015611870578181015183820152602001611858565b838111156108ce5750506000910152565b60008151808452611899816020860160208601611855565b601f01601f19169290920160200192915050565b6020815260006118c06020830184611881565b9392505050565b8015158114610bd157600080fd5b6000806000606084860312156118ea57600080fd5b833567ffffffffffffffff81111561190157600080fd5b8401601f8101861361191257600080fd5b611921868235602084016117bc565b935050602084013591506040840135611939816118c7565b809150509250925092565b60006020828403121561195657600080fd5b5035919050565b600181811c9082168061197157607f821691505b60208210810361199157634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156119a957600080fd5b5051919050565b6001600160a01b0381168114610bd157600080fd5b6000602082840312156119d757600080fd5b81516118c0816119b0565b6000602082840312156119f457600080fd5b815167ffffffffffffffff811115611a0b57600080fd5b8201601f81018413611a1c57600080fd5b8051611a2a6117ca82611794565b818152856020838501011115611a3f57600080fd5b611a50826020830160208601611855565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b600082821015611a8157611a81611a59565b500390565b600060208284031215611a9857600080fd5b81516118c0816118c7565b848152608060208201526000611abc6080830186611881565b60408301949094525090151560609091015292915050565b600080600060608486031215611ae957600080fd5b8351925060208401519150604084015190509250925092565b600060408284031215611b1457600080fd5b6040516040810181811067ffffffffffffffff82111715611b3757611b3761174d565b604052825181526020928301519281019290925250919050565b600060408284031215611b6357600080fd5b6118c08383611b02565b600067ffffffffffffffff821115611b8757611b8761174d565b5060051b60200190565b60006020808385031215611ba457600080fd5b825167ffffffffffffffff811115611bbb57600080fd5b8301601f81018513611bcc57600080fd5b8051611bda6117ca82611b6d565b81815260069190911b82018301908381019087831115611bf957600080fd5b928401925b82841015611c2257611c108885611b02565b82528482019150604084019350611bfe565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b60006020808385031215611c5657600080fd5b825167ffffffffffffffff811115611c6d57600080fd5b8301601f81018513611c7e57600080fd5b8051611c8c6117ca82611b6d565b81815260059190911b82018301908381019087831115611cab57600080fd5b928401925b82841015611c2257835182529284019290840190611cb0565b600060018201611cdb57611cdb611a59565b506001019056fea2646970667358221220f015e87f38f6832857341887b9d73242886b5af414313c3645b134711570c0de64736f6c634300080d00334120747265617479206265747765656e2074776f206f72206d6f726520636f756e747269657320746f20776f726b20746f67657468657220746f7761726473206120636f6d6d6f6e20676f616c206f7220746f20646566656e642065616368206f7468657220696e207468652063617365206f662065787465726e616c2061676772657373696f6e";

type AllianceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AllianceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Alliance__factory extends ContractFactory {
  constructor(...args: AllianceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Alliance> {
    return super.deploy(_diamond, overrides || {}) as Promise<Alliance>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): Alliance {
    return super.attach(address) as Alliance;
  }
  override connect(signer: Signer): Alliance__factory {
    return super.connect(signer) as Alliance__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AllianceInterface {
    return new utils.Interface(_abi) as AllianceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Alliance {
    return new Contract(address, _abi, signerOrProvider) as Alliance;
  }
}
