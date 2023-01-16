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
  "0x60806040523480156200001157600080fd5b5060405162002329380380620023298339810160408190526200003491620002a3565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b031992831681179091556001805483168217905560028054831682179055600380549092168117909155604051631c0e27e760e11b815263381c4fce90620001179060040160208082526004908201526311dbdb1960e21b604082015260600190565b602060405180830381865afa15801562000135573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200015b9190620002a3565b600880546001600160a01b0319166001600160a01b03929092169190911781556040805180820190915281815267416c6c69616e636560c01b6020909101908152620001ab9160049190620001e4565b506040518060c0016040528060888152602001620022a1608891398051620001dc91600591602090910190620001e4565b505062000306565b828054620001f290620002ca565b90600052602060002090601f01602090048101928262000216576000855562000261565b82601f106200023157805160ff191683800117855562000261565b8280016001018555821562000261579182015b828111156200026157825182559160200191906001019062000244565b506200026f92915062000273565b5090565b5b808211156200026f576000815560010162000274565b6001600160a01b0381168114620002a057600080fd5b50565b600060208284031215620002b657600080fd5b8151620002c3816200028a565b9392505050565b600181811c90821680620002df57607f821691505b6020821081036200030057634e487b7160e01b600052602260045260246000fd5b50919050565b611f8b80620003166000396000f3fe608060405234801561001057600080fd5b50600436106102915760003560e01c80637284e41611610160578063cbb34e86116100d8578063ec19ae801161008c578063f2e1730b11610071578063f2e1730b14610296578063f851a440146103c5578063fa91f75e1461029657600080fd5b8063ec19ae8014610296578063f0b7db4e146103b257600080fd5b8063d924100e116100bd578063d924100e146103a9578063e534ae5f14610296578063e75991fa1461029657600080fd5b8063cbb34e8614610296578063d553ed481461029657600080fd5b80639bcecd0b1161012f578063b250ede511610114578063b250ede51461038e578063c009a6cb14610296578063c3fe3e281461039657600080fd5b80639bcecd0b14610296578063a83280bc1461029657600080fd5b80637284e416146103355780637bc1e8411461033d57806394002b5714610350578063993a04b71461037b57600080fd5b80632d47fe271161020e5780634ad30a91116101c257806360acfcc6116101a757806360acfcc6146102965780636a2a2b4e1461030b5780636a333c391461031e57600080fd5b80634ad30a91146102965780635f310b121461029657600080fd5b806337415516116101f3578063374155161461029657806339ebfad41461029657806347b958a61461030357600080fd5b80632d47fe27146102965780632efd6629146102f057600080fd5b80631e15495c1161026557806328f59b831161024a57806328f59b83146102d35780632b451c64146102965780632b9b15ad146102dd57600080fd5b80631e15495c14610296578063243086c41461029657600080fd5b8062048f5a1461029657806304dc7c741461029657806306fdde03146102be5780631c35717314610296575b600080fd5b6102a96102a4366004611a46565b6103d8565b60405190151581526020015b60405180910390f35b6102c6610442565b6040516102b59190611afd565b6102db6104d0565b005b6102a96102eb366004611b17565b610774565b6102db6102fe366004611b47565b61098f565b6102db610a84565b6102a9610319366004611a46565b610c8f565b61032760065481565b6040519081526020016102b5565b6102c6610e25565b6102db61034b366004611bb6565b610e32565b600854610363906001600160a01b031681565b6040516001600160a01b0390911681526020016102b5565b600254610363906001600160a01b031681565b6102db61162d565b600154610363906001600160a01b031681565b61032760075481565b600054610363906001600160a01b031681565b600354610363906001600160a01b031681565b600080546001600160a01b031633146104385760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6004805461044f90611bcf565b80601f016020809104026020016040519081016040528092919081815260200182805461047b90611bcf565b80156104c85780601f1061049d576101008083540402835291602001916104c8565b820191906000526020600020905b8154815290600101906020018083116104ab57829003601f168201915b505050505081565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610519573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053d9190611c09565b905061054a81600a610774565b6105bc5760405162461bcd60e51b815260206004820152603260248201527f416c6c69616e63653a204e6174696f6e206d757374207374617920666f72206160448201527f74206c65617374203130207365636f6e64730000000000000000000000000000606482015260840161042f565b6002546040517f29560980000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b03169063b93f9b0a908290632956098090602401602060405180830381865afa158015610627573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064b9190611c09565b6040518263ffffffff1660e01b815260040161066991815260200190565b602060405180830381865afa158015610686573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106aa9190611c37565b6008546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b0380841660048301526103e8602483015292935091169063a9059cbb906044016020604051808303816000875af1158015610719573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061073d9190611c54565b5061076860405180604001604052806006815260200165426174746c6560d01b81525060008061098f565b6107706117c2565b5050565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa1580156107c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e59190611c09565b6002546040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610861573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108859190611c37565b60025460405163344289d960e11b815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa1580156108dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109019190611c09565b6040518263ffffffff1660e01b815260040161091f91815260200190565b600060405180830381865afa15801561093c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109649190810190611c71565b8060200190518101906109779190611c09565b90506109838482611cfe565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156109d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109fc9190611c09565b6003546040517f66e39e790000000000000000000000000000000000000000000000000000000081529192506001600160a01b0316906366e39e7990610a4c908490889088908890600401611d16565b600060405180830381600087803b158015610a6657600080fd5b505af1158015610a7a573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610add573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b019190611c09565b6040518263ffffffff1660e01b8152600401610b1f91815260200190565b602060405180830381865afa158015610b3c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b609190611c09565b6040518263ffffffff1660e01b8152600401610b7e91815260200190565b602060405180830381865afa158015610b9b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbf9190611c37565b6008546040517f23b872dd0000000000000000000000000000000000000000000000000000000081526001600160a01b0380841660048301523060248301526103e860448301529293509116906323b872dd906064016020604051808303816000875af1158015610c34573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c589190611c54565b50610c8460405180604001604052806006815260200165426174746c6560d01b8152506000600161098f565b610c8c6118a3565b50565b60008082806020019051810190610ca69190611d47565b60025460405163793ff2ed60e11b815260048101839052919450600093506001600160a01b0316915063f27fe5da90602401602060405180830381865afa158015610cf5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d199190611c09565b60025460405163b356003960e01b81523060048201529192506000916001600160a01b039091169063b356003990602401602060405180830381865afa158015610d67573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d8b9190611c09565b60025460405163344289d960e11b815260048101859052602481018390529192506001600160a01b03169063688513b290604401602060405180830381865afa158015610ddc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e009190611c09565b15610e11576000935050505061043c565b610e1b86866103d8565b9695505050505050565b6005805461044f90611bcf565b60025460405163b356003960e01b81523360048201526001600160a01b039091169063688513b290829063b356003990602401602060405180830381865afa158015610e82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea69190611c09565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015610eee573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f129190611c09565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401602060405180830381865afa158015610f6b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f8f9190611c09565b6000036110045760405162461bcd60e51b815260206004820152602160248201527f437572696f5472656174793a204f6e6c79207369676e65722063616e2063616c60448201527f6c00000000000000000000000000000000000000000000000000000000000000606482015260840161042f565b60025460405163793ff2ed60e11b8152600481018390526000916001600160a01b03169063f27fe5da90602401602060405180830381865afa15801561104e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110729190611c09565b60025460405163b356003960e01b81523060048201529192506000916001600160a01b039091169063b356003990602401602060405180830381865afa1580156110c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110e49190611c09565b60025460405163344289d960e11b815260048101859052602481018390529192506001600160a01b03169063688513b290604401602060405180830381865afa158015611135573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111599190611c09565b156111cc5760405162461bcd60e51b815260206004820152602c60248201527f416c6c69616e63653a2043616e6e6f7420626573696567652061726d79206f6660448201527f20616c6c79206e6174696f6e0000000000000000000000000000000000000000606482015260840161042f565b600254604080517fb66e9de70000000000000000000000000000000000000000000000000000000081526004810191909152600d60448201527f5374617274506f736974696f6e000000000000000000000000000000000000006064820152602481018590526000916001600160a01b03169063eead3d8490829063b66e9de7906084016040805180830381865afa15801561126c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112909190611dc4565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b168152815160048201526020909101516024820152604401600060405180830381865afa1580156112ee573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113169190810190611e04565b905060005b81518110156116265760025482516000916001600160a01b031690636c90bd8b9085908590811061134e5761134e611ea0565b6020908102919091018101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152815160048201529101516024820152604401600060405180830381865afa1580156113b5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113dd9190810190611eb6565b905060005b81518110156116115760025482516000916001600160a01b03169063f27fe5da9085908590811061141557611415611ea0565b60200260200101516040518263ffffffff1660e01b815260040161143b91815260200190565b602060405180830381865afa158015611458573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061147c9190611c09565b60025460405163344289d960e11b815260048101839052602481018990529192506001600160a01b03169063688513b290604401602060405180830381865afa1580156114cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114f19190611c09565b156115fe5760015483516001600160a01b0390911690632a0c52219085908590811061151f5761151f611ea0565b60200260200101518a6040518363ffffffff1660e01b815260040161154e929190918252602082015260400190565b600060405180830381600087803b15801561156857600080fd5b505af115801561157c573d6000803e3d6000fd5b505060025460405163793ff2ed60e11b8152600481018c90526001600160a01b03909116925063f27fe5da9150602401602060405180830381865afa1580156115c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ed9190611c09565b6000036115fe575050505050505050565b508061160981611f3c565b9150506113e2565b5050808061161e90611f3c565b91505061131b565b5050505050565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015611675573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116999190611c09565b6006556002546040516384d969bd60e01b815260206004820152600560248201527f4f776e657200000000000000000000000000000000000000000000000000000060448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa158015611712573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117369190611c37565b6001600160a01b0316634c518fdc6006546040518263ffffffff1660e01b815260040161176591815260200190565b600060405180830381865afa158015611782573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526117aa9190810190611c71565b8060200190518101906117bd9190611c09565b600755565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561180b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061182f9190611c09565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561188f57600080fd5b505af1158015611626573d6000803e3d6000fd5b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156118ec573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119109190611c09565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015611975573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107709190611c09565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156119d8576119d8611999565b604052919050565b600067ffffffffffffffff8211156119fa576119fa611999565b50601f01601f191660200190565b6000611a1b611a16846119e0565b6119af565b9050828152838383011115611a2f57600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611a5957600080fd5b82359150602083013567ffffffffffffffff811115611a7757600080fd5b8301601f81018513611a8857600080fd5b611a9785823560208401611a08565b9150509250929050565b60005b83811015611abc578181015183820152602001611aa4565b83811115611acb576000848401525b50505050565b60008151808452611ae9816020860160208601611aa1565b601f01601f19169290920160200192915050565b602081526000611b106020830184611ad1565b9392505050565b60008060408385031215611b2a57600080fd5b50508035926020909101359150565b8015158114610c8c57600080fd5b600080600060608486031215611b5c57600080fd5b833567ffffffffffffffff811115611b7357600080fd5b8401601f81018613611b8457600080fd5b611b9386823560208401611a08565b935050602084013591506040840135611bab81611b39565b809150509250925092565b600060208284031215611bc857600080fd5b5035919050565b600181811c90821680611be357607f821691505b602082108103611c0357634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215611c1b57600080fd5b5051919050565b6001600160a01b0381168114610c8c57600080fd5b600060208284031215611c4957600080fd5b8151611b1081611c22565b600060208284031215611c6657600080fd5b8151611b1081611b39565b600060208284031215611c8357600080fd5b815167ffffffffffffffff811115611c9a57600080fd5b8201601f81018413611cab57600080fd5b8051611cb9611a16826119e0565b818152856020838501011115611cce57600080fd5b611cdf826020830160208601611aa1565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611d1157611d11611ce8565b500190565b848152608060208201526000611d2f6080830186611ad1565b60408301949094525090151560609091015292915050565b600080600060608486031215611d5c57600080fd5b8351925060208401519150604084015190509250925092565b600060408284031215611d8757600080fd5b6040516040810181811067ffffffffffffffff82111715611daa57611daa611999565b604052825181526020928301519281019290925250919050565b600060408284031215611dd657600080fd5b611b108383611d75565b600067ffffffffffffffff821115611dfa57611dfa611999565b5060051b60200190565b60006020808385031215611e1757600080fd5b825167ffffffffffffffff811115611e2e57600080fd5b8301601f81018513611e3f57600080fd5b8051611e4d611a1682611de0565b81815260069190911b82018301908381019087831115611e6c57600080fd5b928401925b82841015611e9557611e838885611d75565b82528482019150604084019350611e71565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b60006020808385031215611ec957600080fd5b825167ffffffffffffffff811115611ee057600080fd5b8301601f81018513611ef157600080fd5b8051611eff611a1682611de0565b81815260059190911b82018301908381019087831115611f1e57600080fd5b928401925b82841015611e9557835182529284019290840190611f23565b600060018201611f4e57611f4e611ce8565b506001019056fea26469706673582212202495f8ba0ce602a2011e9130f1e2009d37b5f8ae507216054636ec571ea02f0c64736f6c634300080d00334120747265617479206265747765656e2074776f206f72206d6f726520636f756e747269657320746f20776f726b20746f67657468657220746f7761726473206120636f6d6d6f6e20676f616c206f7220746f20646566656e642065616368206f7468657220696e207468652063617365206f662065787465726e616c2061676772657373696f6e";

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
