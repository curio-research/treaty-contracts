/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  FTX,
  FTXInterface,
} from "../../../../contracts/treaties/FTX.sol/FTX";

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
    name: "fttToken",
    outputs: [
      {
        internalType: "contract FTTERC20",
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
    name: "isBankrupt",
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
    name: "sbfAddress",
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
    name: "sbfCapitalAddress",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "treatyDeposit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
  {
    inputs: [],
    name: "treatyRun",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "treatyWithdraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002b3e38038062002b3e833981016040819052620000349162000321565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b03199283168117909155600180548316821790556002805483168217905560038054909216178155604080518082019091528181526208ca8b60eb1b602090910190815262000107916004919062000254565b5060405180608001604052806056815260200162002ae8605691398051620001389160059160209091019062000254565b50600254604051631c0e27e760e11b81526001600160a01b039091169063381c4fce90620001819060040160208082526004908201526311dbdb1960e21b604082015260600190565b602060405180830381865afa1580156200019f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001c5919062000321565b600680546001600160a01b0319166001600160a01b03929092169190911790556040513090620001f590620002e3565b6001600160a01b039091168152602001604051809103906000f08015801562000222573d6000803e3d6000fd5b50600780546001600160a01b03929092166001600160a01b031992831617905560088054909116331790555062000384565b828054620002629062000348565b90600052602060002090601f016020900481019282620002865760008555620002d1565b82601f10620002a157805160ff1916838001178555620002d1565b82800160010185558215620002d1579182015b82811115620002d1578251825591602001919060010190620002b4565b50620002df929150620002f1565b5090565b6110968062001a5283390190565b5b80821115620002df5760008155600101620002f2565b6001600160a01b03811681146200031e57600080fd5b50565b6000602082840312156200033457600080fd5b8151620003418162000308565b9392505050565b600181811c908216806200035d57607f821691505b6020821081036200037e57634e487b7160e01b600052602260045260246000fd5b50919050565b6116be80620003946000396000f3fe608060405234801561001057600080fd5b50600436106102915760003560e01c80637284e41611610160578063c009a6cb116100d8578063ec19ae801161008c578063f2e1730b11610071578063f2e1730b14610296578063f851a440146103df578063fa91f75e1461029657600080fd5b8063ec19ae8014610296578063f0b7db4e146103cc57600080fd5b8063cbb34e86116100bd578063cbb34e8614610296578063e534ae5f14610296578063e75991fa1461029657600080fd5b8063c009a6cb14610296578063c3fe3e28146103b957600080fd5b8063993a04b71161012f578063a228e1d311610114578063a228e1d314610393578063a83280bc14610296578063b4bfdfcd146103a657600080fd5b8063993a04b7146103805780639bcecd0b1461029657600080fd5b80637284e4161461034a578063934c3b0d1461035257806394002b571461035a57806395f095fb1461036d57600080fd5b8063374155161161020e5780634b3dc808116101c257806360acfcc6116101a757806360acfcc6146102965780636a2a2b4e14610296578063721c7d461461033657600080fd5b80634b3dc808146103235780635f310b121461029657600080fd5b806341bcc52f116101f357806341bcc52f146102f057806347b958a61461031b5780634ad30a911461029657600080fd5b8063374155161461029657806339ebfad41461029657600080fd5b8063243086c4116102655780632b451c641161024a5780632b451c64146102965780632d47fe27146102965780632efd6629146102dd57600080fd5b8063243086c41461029657806328f59b83146102d357600080fd5b8062048f5a1461029657806304dc7c741461029657806306fdde03146102be5780631c35717314610296575b600080fd5b6102a96102a43660046113b4565b6103f2565b60405190151581526020015b60405180910390f35b6102c661045b565b6040516102b5919061145c565b6102db6104e9565b005b6102db6102eb366004611487565b6105d1565b600754610303906001600160a01b031681565b6040516001600160a01b0390911681526020016102b5565b6102db6106c6565b600954610303906001600160a01b031681565b6009546102a990600160a01b900460ff1681565b6102c66107c0565b6102a96107cd565b600654610303906001600160a01b031681565b6102a961037b3660046114f6565b6108b8565b600254610303906001600160a01b031681565b6102a96103a13660046114f6565b610b74565b600854610303906001600160a01b031681565b600154610303906001600160a01b031681565b600054610303906001600160a01b031681565b600354610303906001600160a01b031681565b600080546001600160a01b031633146104525760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b50600192915050565b600480546104689061150f565b80601f01602080910402602001604051908101604052809291908181526020018280546104949061150f565b80156104e15780601f106104b6576101008083540402835291602001916104e1565b820191906000526020600020905b8154815290600101906020018083116104c457829003601f168201915b505050505081565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610532573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105569190611549565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b1580156105b657600080fd5b505af11580156105ca573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561061a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063e9190611549565b6003546040517f66e39e790000000000000000000000000000000000000000000000000000000081529192506001600160a01b0316906366e39e799061068e908490889088908890600401611562565b600060405180830381600087803b1580156106a857600080fd5b505af11580156106bc573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561070f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107339190611549565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015610798573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107bc9190611549565b5050565b600580546104689061150f565b6008546000906001600160a01b0316331461082a5760405162461bcd60e51b815260206004820152601a60248201527f4654583a20596f7520646f6e2774206e65656420746f2072756e0000000000006044820152606401610449565b600954600160a01b900460ff16156108845760405162461bcd60e51b815260206004820152601b60248201527f4654583a20596f7527766520616c7265616479206573636170656400000000006044820152606401610449565b50600980547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b179055600190565b6008546000906001600160a01b031633036109155760405162461bcd60e51b815260206004820152601e60248201527f4654583a20596f7520646f6e2774206e65656420746f206465706f73697400006044820152606401610449565b6009546001600160a01b031661092d5761092d611007565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610986573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109aa9190611549565b6040518263ffffffff1660e01b81526004016109c891815260200190565b602060405180830381865afa1580156109e5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a099190611549565b6040518263ffffffff1660e01b8152600401610a2791815260200190565b602060405180830381865afa158015610a44573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a6891906115a8565b6006546009546040516323b872dd60e01b81526001600160a01b03808516600483015291821660248201526044810187905292935016906323b872dd906064016020604051808303816000875af1158015610ac7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aeb91906115c5565b506007546040517f40c10f190000000000000000000000000000000000000000000000000000000081526001600160a01b03838116600483015260248201869052909116906340c10f1990604401600060405180830381600087803b158015610b5357600080fd5b505af1158015610b67573d6000803e3d6000fd5b5060019695505050505050565b6008546000906001600160a01b03163303610bd15760405162461bcd60e51b815260206004820152601f60248201527f4654583a20596f7520646f6e2774206e65656420746f207769746864726177006044820152606401610449565b600954600160a01b900460ff1615610c2b5760405162461bcd60e51b815260206004820152601760248201527f4654583a20596f7572206d6f6e657920697320676f6e650000000000000000006044820152606401610449565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610c84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca89190611549565b6040518263ffffffff1660e01b8152600401610cc691815260200190565b602060405180830381865afa158015610ce3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d079190611549565b6040518263ffffffff1660e01b8152600401610d2591815260200190565b602060405180830381865afa158015610d42573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d6691906115a8565b6007546040517f70a082310000000000000000000000000000000000000000000000000000000081526001600160a01b0380841660048301529293508592909116906370a0823190602401602060405180830381865afa158015610dce573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610df29190611549565b1015610e405760405162461bcd60e51b815260206004820152601960248201527f4654583a20496e73756666696369656e742062616c616e6365000000000000006044820152606401610449565b6009546001600160a01b0316610e5857610e58611007565b6006546009546040517f03147f390000000000000000000000000000000000000000000000000000000081526001600160a01b03918216600482015260009291909116906303147f3990602401602060405180830381865afa158015610ec2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ee69190611549565b90506000848211610ef75781610ef9565b845b6006546009546040516323b872dd60e01b81526001600160a01b03918216600482015286821660248201526044810184905292935016906323b872dd906064016020604051808303816000875af1158015610f58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f7c91906115c5565b506007546040517f9dc29fac0000000000000000000000000000000000000000000000000000000081526001600160a01b0385811660048301526024820184905290911690639dc29fac90604401600060405180830381600087803b158015610fe457600080fd5b505af1158015610ff8573d6000803e3d6000fd5b50600198975050505050505050565b6002546040517f84d969bd00000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f416464726573730000000000000000000000000000000000000000000000000060448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa158015611096573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110ba91906115a8565b600854604080516001600160a01b039283166020820152929091169163b361be4691016040516020818303038152906040526040518263ffffffff1660e01b8152600401611108919061145c565b600060405180830381865afa158015611125573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261114d91908101906115e2565b5160011461119d5760405162461bcd60e51b815260206004820152601860248201527f4654583a20534246206e6f7420696e697469616c697a656400000000000000006044820152606401610449565b60025460085460405163b356003960e01b81526001600160a01b03918216600482015291169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa1580156111f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061121d9190611549565b6040518263ffffffff1660e01b815260040161123b91815260200190565b602060405180830381865afa158015611258573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061127c9190611549565b6040518263ffffffff1660e01b815260040161129a91815260200190565b602060405180830381865afa1580156112b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112db91906115a8565b600980547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561135457611354611315565b604052919050565b600067ffffffffffffffff83111561137657611376611315565b611389601f8401601f191660200161132b565b905082815283838301111561139d57600080fd5b828260208301376000602084830101529392505050565b600080604083850312156113c757600080fd5b82359150602083013567ffffffffffffffff8111156113e557600080fd5b8301601f810185136113f657600080fd5b6114058582356020840161135c565b9150509250929050565b6000815180845260005b8181101561143557602081850181015186830182015201611419565b81811115611447576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061146f602083018461140f565b9392505050565b801515811461148457600080fd5b50565b60008060006060848603121561149c57600080fd5b833567ffffffffffffffff8111156114b357600080fd5b8401601f810186136114c457600080fd5b6114d38682356020840161135c565b9350506020840135915060408401356114eb81611476565b809150509250925092565b60006020828403121561150857600080fd5b5035919050565b600181811c9082168061152357607f821691505b60208210810361154357634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561155b57600080fd5b5051919050565b84815260806020820152600061157b608083018661140f565b60408301949094525090151560609091015292915050565b6001600160a01b038116811461148457600080fd5b6000602082840312156115ba57600080fd5b815161146f81611593565b6000602082840312156115d757600080fd5b815161146f81611476565b600060208083850312156115f557600080fd5b825167ffffffffffffffff8082111561160d57600080fd5b818501915085601f83011261162157600080fd5b81518181111561163357611633611315565b8060051b915061164484830161132b565b818152918301840191848101908884111561165e57600080fd5b938501935b8385101561167c57845182529385019390850190611663565b9897505050505050505056fea26469706673582212206af947d60e1cbae386a5b599b1146e558dc2df3d4dc4f0547fd378c28345b03864736f6c634300080d003360e06040523480156200001157600080fd5b50604051620010963803806200109683398101604081905262000034916200021f565b6040805180820182526009815268232a2c102a37b5b2b760b91b60208083019182528351808501909452600384526211951560ea1b90840152815191929160129162000084916000919062000179565b5081516200009a90600190602085019062000179565b5060ff81166080524660a052620000b0620000dd565b60c0525050600680546001600160a01b0319166001600160a01b0393909316929092179091555062000330565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516200011191906200028d565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b828054620001879062000251565b90600052602060002090601f016020900481019282620001ab5760008555620001f6565b82601f10620001c657805160ff1916838001178555620001f6565b82800160010185558215620001f6579182015b82811115620001f6578251825591602001919060010190620001d9565b506200020492915062000208565b5090565b5b8082111562000204576000815560010162000209565b6000602082840312156200023257600080fd5b81516001600160a01b03811681146200024a57600080fd5b9392505050565b600181811c908216806200026657607f821691505b6020821081036200028757634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680620002aa57607f831692505b60208084108203620002ca57634e487b7160e01b86526022600452602486fd5b818015620002e15760018114620002f35762000322565b60ff1986168952848901965062000322565b60008a81526020902060005b868110156200031a5781548b820152908501908301620002ff565b505084890196505b509498975050505050505050565b60805160a05160c051610d366200036060003960006104e7015260006104b20152600061019a0152610d366000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806370a0823111610097578063a34a28fd11610066578063a34a28fd14610246578063a9059cbb14610271578063d505accf14610284578063dd62ed3e1461029757600080fd5b806370a08231146101eb5780637ecebe001461020b57806395d89b411461022b5780639dc29fac1461023357600080fd5b806323b872dd116100d357806323b872dd14610182578063313ce567146101955780633644e515146101ce57806340c10f19146101d657600080fd5b806303147f391461010557806306fdde0314610141578063095ea7b31461015657806318160ddd14610179575b600080fd5b61012e610113366004610a63565b6001600160a01b031660009081526003602052604090205490565b6040519081526020015b60405180910390f35b6101496102c2565b6040516101389190610a85565b610169610164366004610ada565b610350565b6040519015158152602001610138565b61012e60025481565b610169610190366004610b04565b6103bc565b6101bc7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610138565b61012e6104ae565b6101e96101e4366004610ada565b610509565b005b61012e6101f9366004610a63565b60036020526000908152604090205481565b61012e610219366004610a63565b60056020526000908152604090205481565b610149610576565b6101e9610241366004610ada565b610583565b600654610259906001600160a01b031681565b6040516001600160a01b039091168152602001610138565b61016961027f366004610ada565b6105e7565b6101e9610292366004610b40565b61065f565b61012e6102a5366004610bb3565b600460209081526000928352604080842090915290825290205481565b600080546102cf90610be6565b80601f01602080910402602001604051908101604052809291908181526020018280546102fb90610be6565b80156103485780601f1061031d57610100808354040283529160200191610348565b820191906000526020600020905b81548152906001019060200180831161032b57829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103ab9086815260200190565b60405180910390a350600192915050565b6001600160a01b03831660009081526004602090815260408083203384529091528120546000198114610418576103f38382610c36565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b6001600160a01b03851660009081526003602052604081208054859290610440908490610c36565b90915550506001600160a01b03808516600081815260036020526040908190208054870190555190918716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061049b9087815260200190565b60405180910390a3506001949350505050565b60007f000000000000000000000000000000000000000000000000000000000000000046146104e4576104df6108cd565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6006546001600160a01b031633146105685760405162461bcd60e51b815260206004820152601660248201527f4654543a204f6e6c79204654582063616e206d696e740000000000000000000060448201526064015b60405180910390fd5b6105728282610967565b5050565b600180546102cf90610be6565b6006546001600160a01b031633146105dd5760405162461bcd60e51b815260206004820152601660248201527f4654543a204f6e6c79204654582063616e206275726e00000000000000000000604482015260640161055f565b61057282826109d3565b33600090815260036020526040812080548391908390610608908490610c36565b90915550506001600160a01b038316600081815260036020526040908190208054850190555133907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906103ab9086815260200190565b428410156106af5760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f45585049524544000000000000000000604482015260640161055f565b600060016106bb6104ae565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa1580156107e2573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906108185750876001600160a01b0316816001600160a01b0316145b6108645760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e4552000000000000000000000000000000000000604482015260640161055f565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516108ff9190610c4d565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80600260008282546109799190610ce8565b90915550506001600160a01b0382166000818152600360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91015b60405180910390a35050565b6001600160a01b038216600090815260036020526040812080548392906109fb908490610c36565b90915550506002805482900390556040518181526000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020016109c7565b80356001600160a01b0381168114610a5e57600080fd5b919050565b600060208284031215610a7557600080fd5b610a7e82610a47565b9392505050565b600060208083528351808285015260005b81811015610ab257858101830151858201604001528201610a96565b81811115610ac4576000604083870101525b50601f01601f1916929092016040019392505050565b60008060408385031215610aed57600080fd5b610af683610a47565b946020939093013593505050565b600080600060608486031215610b1957600080fd5b610b2284610a47565b9250610b3060208501610a47565b9150604084013590509250925092565b600080600080600080600060e0888a031215610b5b57600080fd5b610b6488610a47565b9650610b7260208901610a47565b95506040880135945060608801359350608088013560ff81168114610b9657600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610bc657600080fd5b610bcf83610a47565b9150610bdd60208401610a47565b90509250929050565b600181811c90821680610bfa57607f821691505b602082108103610c1a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082821015610c4857610c48610c20565b500390565b600080835481600182811c915080831680610c6957607f831692505b60208084108203610c8857634e487b7160e01b86526022600452602486fd5b818015610c9c5760018114610cad57610cda565b60ff19861689528489019650610cda565b60008a81526020902060005b86811015610cd25781548b820152908501908301610cb9565b505084890196505b509498975050505050505050565b60008219821115610cfb57610cfb610c20565b50019056fea2646970667358221220eb7a4d9989f39fb6bf47dfde293f31b45da95a5a22d927bcb3551c0afe43b9c864736f6c634300080d003346545820697320612063727970746f63757272656e63792065786368616e676520626173656420696e2074686520556e69746564205374617465732e20497420697320746f74616c6c79206e6f742061207363616d2e";

type FTXConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FTXConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FTX__factory extends ContractFactory {
  constructor(...args: FTXConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FTX> {
    return super.deploy(_diamond, overrides || {}) as Promise<FTX>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): FTX {
    return super.attach(address) as FTX;
  }
  override connect(signer: Signer): FTX__factory {
    return super.connect(signer) as FTX__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FTXInterface {
    return new utils.Interface(_abi) as FTXInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): FTX {
    return new Contract(address, _abi, signerOrProvider) as FTX;
  }
}
