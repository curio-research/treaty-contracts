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
  CurioERC20,
  CurioERC20Interface,
} from "../../../contracts/standards/CurioERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "destroyToken",
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
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "dripToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxTransferDistance",
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
    name: "symbol",
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
    name: "totalSupply",
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
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transfer",
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
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "transferAll",
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
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
  "0x6080604052601460055560006006553480156200001b57600080fd5b5060405162001c4738038062001c478339810160408190526200003e9162000281565b6001600160a01b038116620000a55760405162461bcd60e51b8152602060048201526024808201527f437572696f45524332303a204469616d6f6e64206164647265737320726571756044820152631a5c995960e21b606482015260840160405180910390fd5b8351620000ba9060009060208701906200010e565b508251620000d09060019060208601906200010e565b506002805460ff191660ff9390931692909217909155600480546001600160a01b0319166001600160a01b0390921691909117905550620003619050565b8280546200011c9062000325565b90600052602060002090601f0160209004810192826200014057600085556200018b565b82601f106200015b57805160ff19168380011785556200018b565b828001600101855582156200018b579182015b828111156200018b5782518255916020019190600101906200016e565b50620001999291506200019d565b5090565b5b808211156200019957600081556001016200019e565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001dc57600080fd5b81516001600160401b0380821115620001f957620001f9620001b4565b604051601f8301601f19908116603f01168101908282118183101715620002245762000224620001b4565b816040528381526020925086838588010111156200024157600080fd5b600091505b8382101562000265578582018301518183018401529082019062000246565b83821115620002775760008385830101525b9695505050505050565b600080600080608085870312156200029857600080fd5b84516001600160401b0380821115620002b057600080fd5b620002be88838901620001ca565b95506020870151915080821115620002d557600080fd5b50620002e487828801620001ca565b935050604085015160ff81168114620002fc57600080fd5b60608601519092506001600160a01b03811681146200031a57600080fd5b939692955090935050565b600181811c908216806200033a57607f821691505b6020821081036200035b57634e487b7160e01b600052602260045260246000fd5b50919050565b6118d680620003716000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80634b14e0031161008c5780639b1ad792116100665780639b1ad792146101c5578063a9059cbb146101d8578063dd62ed3e146101eb578063f0b7db4e146101fe57600080fd5b80634b14e0031461019757806370a08231146101aa57806395d89b41146101bd57600080fd5b806318160ddd116100c857806318160ddd14610145578063239df7f21461015c57806323b872dd14610165578063313ce5671461017857600080fd5b806306fdde03146100ef57806307d6a5d41461010d578063095ea7b314610122575b600080fd5b6100f7610229565b60405161010491906113a7565b60405180910390f35b61012061011b3660046113d9565b6102b7565b005b6101356101303660046113d9565b610438565b6040519015158152602001610104565b61014e60035481565b604051908152602001610104565b61014e60055481565b610135610173366004611405565b610734565b6002546101859060ff1681565b60405160ff9091168152602001610104565b6101356101a5366004611446565b61074b565b61014e6101b836600461147f565b6107dd565b6100f7610871565b6101206101d33660046113d9565b61087e565b6101356101e63660046113d9565b6109e3565b61014e6101f9366004611446565b610d55565b600454610211906001600160a01b031681565b6040516001600160a01b039091168152602001610104565b600080546102369061149c565b80601f01602080910402602001604051908101604052809291908181526020018280546102629061149c565b80156102af5780601f10610284576101008083540402835291602001916102af565b820191906000526020600020905b81548152906001019060200180831161029257829003601f168201915b505050505081565b6004546001600160a01b0316331461032b5760405162461bcd60e51b815260206004820152602c60248201527f437572696f45524332303a204f6e6c792067616d652063616e2063616c6c207460448201526b3434b990333ab731ba34b7b760a11b60648201526084015b60405180910390fd5b600080600061033985610f30565b9194509250905060008261034d86846114ec565b11610359575083610366565b6103638284611504565b90505b6004546001600160a01b0316638d20eac38561038284866114ec565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156103c057600080fd5b505af11580156103d4573d6000803e3d6000fd5b50506040518381526001600160a01b0389169250600091507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3806003600082825461042b91906114ec565b9091555050505050505050565b6004805460405163b356003960e01b8152339281019290925260009182916001600160a01b03169063b356003990602401602060405180830381865afa158015610486573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104aa919061151b565b6004805460405163b356003960e01b81526001600160a01b038881169382019390935292935060009291169063b356003990602401602060405180830381865afa1580156104fc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610520919061151b565b600480546040517f3313db270000000000000000000000000000000000000000000000000000000081529293506000926001600160a01b0390911691633313db279161057291859188918891016115d3565b602060405180830381865afa15801561058f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b3919061151b565b9050600654810361065157600480546040517f6f4c70690000000000000000000000000000000000000000000000000000000081526001600160a01b0390911691636f4c70699161060b9160009188918891016115d3565b6020604051808303816000875af115801561062a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064e919061151b565b90505b60045460408051602080820189905282518083039091018152818301928390527f39684ca5000000000000000000000000000000000000000000000000000000009092526001600160a01b03909216916339684ca5916106b6918591906044016115f8565b600060405180830381600087803b1580156106d057600080fd5b505af11580156106e4573d6000803e3d6000fd5b50506040518781526001600160a01b03891692503391507f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259060200160405180910390a350600195945050505050565b6000610741848484610fd1565b5060019392505050565b6004546000906001600160a01b031633146107bd5760405162461bcd60e51b815260206004820152602c60248201527f437572696f45524332303a204f6e6c792067616d652063616e2063616c6c207460448201526b3434b990333ab731ba34b7b760a11b6064820152608401610322565b60006107c8846107dd565b90506107d5848483610734565b949350505050565b600480546040517fb869810c0000000000000000000000000000000000000000000000000000000081526000926001600160a01b039092169163b869810c9161082a91869186910161163f565b602060405180830381865afa158015610847573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086b919061151b565b92915050565b600180546102369061149c565b6004546001600160a01b031633146108ed5760405162461bcd60e51b815260206004820152602c60248201527f437572696f45524332303a204f6e6c792067616d652063616e2063616c6c207460448201526b3434b990333ab731ba34b7b760a11b6064820152608401610322565b6000806108f984610f30565b9250509150600081841161090d578361090f565b815b6004549091506001600160a01b0316638d20eac38461092e8486611504565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561096c57600080fd5b505af1158015610980573d6000803e3d6000fd5b5050604051838152600092506001600160a01b03881691507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a380600360008282546109d79190611504565b90915550505050505050565b6000333014610d41576004805460405163b356003960e01b815233928101929092526000916001600160a01b039091169063b356003990602401602060405180830381865afa158015610a3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5e919061151b565b600480546040516384d969bd60e01b815292935060009283926001600160a01b03909216916384d969bd91610ac5910160208082526006908201527f4e6174696f6e0000000000000000000000000000000000000000000000000000604082015260600190565b602060405180830381865afa158015610ae2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b069190611661565b6001600160a01b031663b361be4684604051602001610b2791815260200190565b6040516020818303038152906040526040518263ffffffff1660e01b8152600401610b5291906113a7565b600060405180830381865afa158015610b6f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610b9791908101906116c5565b5111610c2657600480546040517ff27fe5da0000000000000000000000000000000000000000000000000000000081529182018490526001600160a01b03169063f27fe5da90602401602060405180830381865afa158015610bfd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c21919061151b565b610c28565b815b6004805460405163b356003960e01b81526001600160a01b038981169382019390935292935060009291169063b356003990602401602060405180830381865afa158015610c7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9e919061151b565b600454604080516020810184905280820189905281518082038301815260608201928390527f8c48d213000000000000000000000000000000000000000000000000000000009092529293506001600160a01b0390911691638c48d21391610d0b9186919060640161176b565b600060405180830381600087803b158015610d2557600080fd5b505af1158015610d39573d6000803e3d6000fd5b505050505050505b610d4c338484610fd1565b50600192915050565b6004805460405163b356003960e01b81526001600160a01b038581169382019390935260009283921690633313db27908390839063b356003990602401602060405180830381865afa158015610daf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd3919061151b565b6004805460405163b356003960e01b81526001600160a01b038a81169382019390935291169063b356003990602401602060405180830381865afa158015610e1f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e43919061151b565b6040518463ffffffff1660e01b8152600401610e61939291906115d3565b602060405180830381865afa158015610e7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea2919061151b565b600480546040517f9980ec860000000000000000000000000000000000000000000000000000000081529293506001600160a01b031691639980ec8691610eef9185910190815260200190565b602060405180830381865afa158015610f0c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d5919061151b565b600480546040517fbbdb353b000000000000000000000000000000000000000000000000000000008152600092839283926001600160a01b039091169163bbdb353b91610f8191889186910161163f565b6060604051808303816000875af1158015610fa0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc491906117b8565b9250925092509193909250565b600080610fdd85610f30565b92505091506000806000610ff087610f30565b925092509250600654851415801561100a57506006548314155b61107c5760405162461bcd60e51b815260206004820152602760248201527f437572696f45524332303a20496e2d67616d6520696e76656e746f7279206e6f60448201527f7420666f756e64000000000000000000000000000000000000000000000000006064820152608401610322565b858410156110f25760405162461bcd60e51b815260206004820152602660248201527f437572696f45524332303a2053656e64657220696e737566666963656e74206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610322565b6000826110ff88846114ec565b11156111145761110f8284611504565b611116565b865b6004549091506001600160a01b0316638d20eac3876111358489611504565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561117357600080fd5b505af1158015611187573d6000803e3d6000fd5b5050600480546040516384d969bd60e01b81526001600160a01b0390911693506384d969bd92506111b891016117e6565b602060405180830381865afa1580156111d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111f99190611661565b6001600160a01b0316634c518fdc856040518263ffffffff1660e01b815260040161122691815260200190565b600060405180830381865afa158015611243573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261126b919081019061180c565b80602001905181019061127e919061151b565b6004549092506001600160a01b0316638d20eac38561129d84866114ec565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156112db57600080fd5b505af11580156112ef573d6000803e3d6000fd5b50505050876001600160a01b0316896001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161133891815260200190565b60405180910390a3505050505050505050565b60005b8381101561136657818101518382015260200161134e565b83811115611375576000848401525b50505050565b6000815180845261139381602086016020860161134b565b601f01601f19169290920160200192915050565b6020815260006113ba602083018461137b565b9392505050565b6001600160a01b03811681146113d657600080fd5b50565b600080604083850312156113ec57600080fd5b82356113f7816113c1565b946020939093013593505050565b60008060006060848603121561141a57600080fd5b8335611425816113c1565b92506020840135611435816113c1565b929592945050506040919091013590565b6000806040838503121561145957600080fd5b8235611464816113c1565b91506020830135611474816113c1565b809150509250929050565b60006020828403121561149157600080fd5b81356113ba816113c1565b600181811c908216806114b057607f821691505b6020821081036114d057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156114ff576114ff6114d6565b500190565b600082821015611516576115166114d6565b500390565b60006020828403121561152d57600080fd5b5051919050565b8054600090600181811c908083168061154e57607f831692505b6020808410820361156f57634e487b7160e01b600052602260045260246000fd5b8388526020880182801561158a576001811461159b576115c6565b60ff198716825282820197506115c6565b60008981526020902060005b878110156115c0578154848201529086019084016115a7565b83019850505b5050505050505092915050565b6060815260006115e66060830186611534565b60208301949094525060400152919050565b60608152600061161e606083016006815265105b5bdd5b9d60d21b602082015260400190565b8460208401528281036040840152611636818561137b565b95945050505050565b6001600160a01b03831681526040602082015260006107d56040830184611534565b60006020828403121561167357600080fd5b81516113ba816113c1565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156116bd576116bd61167e565b604052919050565b600060208083850312156116d857600080fd5b825167ffffffffffffffff808211156116f057600080fd5b818501915085601f83011261170457600080fd5b8151818111156117165761171661167e565b8060051b9150611727848301611694565b818152918301840191848101908884111561174157600080fd5b938501935b8385101561175f57845182529385019390850190611746565b98975050505050505050565b60608152600860608201527f5472616e73666572000000000000000000000000000000000000000000000000608082015282602082015260a0604082015260006107d560a083018461137b565b6000806000606084860312156117cd57600080fd5b8351925060208401519150604084015190509250925092565b60208152600061086b602083016006815265105b5bdd5b9d60d21b602082015260400190565b60006020828403121561181e57600080fd5b815167ffffffffffffffff8082111561183657600080fd5b818401915084601f83011261184a57600080fd5b81518181111561185c5761185c61167e565b61186f601f8201601f1916602001611694565b915080825285602082850101111561188657600080fd5b61189781602084016020860161134b565b5094935050505056fea2646970667358221220bd29c7e2d8f79ac46aed3b692efb94c5a9ec79c440e448c120f9aab100d0e68864736f6c634300080d0033";

type CurioERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CurioERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CurioERC20__factory extends ContractFactory {
  constructor(...args: CurioERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CurioERC20> {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      _diamond,
      overrides || {}
    ) as Promise<CurioERC20>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _decimals,
      _diamond,
      overrides || {}
    );
  }
  override attach(address: string): CurioERC20 {
    return super.attach(address) as CurioERC20;
  }
  override connect(signer: Signer): CurioERC20__factory {
    return super.connect(signer) as CurioERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CurioERC20Interface {
    return new utils.Interface(_abi) as CurioERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CurioERC20 {
    return new Contract(address, _abi, signerOrProvider) as CurioERC20;
  }
}
