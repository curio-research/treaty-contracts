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
  "0x6080604052601460085560006009553480156200001b57600080fd5b5060405162002071380380620020718339810160408190526200003e91620002a1565b6001600160a01b038116620000a55760405162461bcd60e51b8152602060048201526024808201527f437572696f45524332303a204469616d6f6e64206164647265737320726571756044820152631a5c995960e21b606482015260840160405180910390fd5b8351620000ba9060009060208701906200012e565b508251620000d09060019060208601906200012e565b506002805460ff90931660ff1990931692909217909155600480546001600160a01b039092166001600160a01b0319928316811790915560058054831682179055600680548316821790556007805490921617905550620003819050565b8280546200013c9062000345565b90600052602060002090601f016020900481019282620001605760008555620001ab565b82601f106200017b57805160ff1916838001178555620001ab565b82800160010185558215620001ab579182015b82811115620001ab5782518255916020019190600101906200018e565b50620001b9929150620001bd565b5090565b5b80821115620001b95760008155600101620001be565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001fc57600080fd5b81516001600160401b0380821115620002195762000219620001d4565b604051601f8301601f19908116603f01168101908282118183101715620002445762000244620001d4565b816040528381526020925086838588010111156200026157600080fd5b600091505b8382101562000285578582018301518183018401529082019062000266565b83821115620002975760008385830101525b9695505050505050565b60008060008060808587031215620002b857600080fd5b84516001600160401b0380821115620002d057600080fd5b620002de88838901620001ea565b95506020870151915080821115620002f557600080fd5b506200030487828801620001ea565b935050604085015160ff811681146200031c57600080fd5b60608601519092506001600160a01b03811681146200033a57600080fd5b939692955090935050565b600181811c908216806200035a57607f821691505b6020821081036200037b57634e487b7160e01b600052602260045260246000fd5b50919050565b611ce080620003916000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806370a08231116100b2578063a9059cbb11610081578063dd62ed3e11610066578063dd62ed3e1461025a578063f0b7db4e1461026d578063f851a4401461028057600080fd5b8063a9059cbb14610234578063c3fe3e281461024757600080fd5b806370a08231146101db57806395d89b41146101ee578063993a04b7146101f65780639b1ad7921461022157600080fd5b8063239df7f2116100ee578063239df7f21461018d57806323b872dd14610196578063313ce567146101a95780634b14e003146101c857600080fd5b806306fdde031461012057806307d6a5d41461013e578063095ea7b31461015357806318160ddd14610176575b600080fd5b610128610293565b60405161013591906117b1565b60405180910390f35b61015161014c3660046117e3565b610321565b005b6101666101613660046117e3565b6104a2565b6040519015158152602001610135565b61017f60035481565b604051908152602001610135565b61017f60085481565b6101666101a436600461180f565b610784565b6002546101b69060ff1681565b60405160ff9091168152602001610135565b6101666101d6366004611850565b610c64565b61017f6101e9366004611889565b610cf6565b610128610d89565b600554610209906001600160a01b031681565b6040516001600160a01b039091168152602001610135565b61015161022f3660046117e3565b610d96565b6101666102423660046117e3565b610efb565b600754610209906001600160a01b031681565b61017f610268366004611850565b611260565b600454610209906001600160a01b031681565b600654610209906001600160a01b031681565b600080546102a0906118a6565b80601f01602080910402602001604051908101604052809291908181526020018280546102cc906118a6565b80156103195780601f106102ee57610100808354040283529160200191610319565b820191906000526020600020905b8154815290600101906020018083116102fc57829003601f168201915b505050505081565b6004546001600160a01b031633146103955760405162461bcd60e51b815260206004820152602c60248201527f437572696f45524332303a204f6e6c792067616d652063616e2063616c6c207460448201526b3434b990333ab731ba34b7b760a11b60648201526084015b60405180910390fd5b60008060006103a385611430565b919450925090506000826103b786846118f6565b116103c35750836103d0565b6103cd828461190e565b90505b6006546001600160a01b0316638d20eac3856103ec84866118f6565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561042a57600080fd5b505af115801561043e573d6000803e3d6000fd5b50506040518381526001600160a01b0389169250600091507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3806003600082825461049591906118f6565b9091555050505050505050565b60055460405163b356003960e01b815233600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa1580156104ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105139190611925565b60055460405163b356003960e01b81526001600160a01b0387811660048301529293506000929091169063b356003990602401602060405180830381865afa158015610563573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105879190611925565b600554604051633313db2760e01b81529192506000916001600160a01b0390911690633313db27906105c1908490879087906004016119dd565b602060405180830381865afa1580156105de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106029190611925565b905060095481036106a1576006546040517f6f4c70690000000000000000000000000000000000000000000000000000000081526001600160a01b0390911690636f4c70699061065b90600090879087906004016119dd565b6020604051808303816000875af115801561067a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069e9190611925565b90505b60065460408051602080820189905282518083039091018152818301928390527f39684ca5000000000000000000000000000000000000000000000000000000009092526001600160a01b03909216916339684ca59161070691859190604401611a02565b600060405180830381600087803b15801561072057600080fd5b505af1158015610734573d6000803e3d6000fd5b50506040518781526001600160a01b03891692503391507f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259060200160405180910390a350600195945050505050565b6004546000906001600160a01b031633148015906108e1575060055460405163b356003960e01b81526001600160a01b0386811660048301529091169063f27fe5da90829063b356003990602401602060405180830381865afa1580156107ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108139190611925565b6040518263ffffffff1660e01b815260040161083191815260200190565b602060405180830381865afa15801561084e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108729190611925565b60055460405163b356003960e01b81523360048201526001600160a01b039091169063b356003990602401602060405180830381865afa1580156108ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108de9190611925565b14155b15610c4f5760055460405163b356003960e01b81526001600160a01b038681166004830152600092169063b356003990602401602060405180830381865afa158015610931573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109559190611925565b60055460405163b356003960e01b81523360048201529192506000916001600160a01b039091169063b356003990602401602060405180830381865afa1580156109a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c79190611925565b600554604051633313db2760e01b81529192506000916001600160a01b0390911690633313db2790610a01908490879087906004016119dd565b602060405180830381865afa158015610a1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a429190611925565b6005546040516384d969bd60e01b81529192506000916001600160a01b03909116906384d969bd90610a7690600401611a49565b602060405180830381865afa158015610a93573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab79190611a6f565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b8152600401610ae491815260200190565b600060405180830381865afa158015610b01573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610b299190810190611ad3565b806020019051810190610b3c9190611925565b905085811015610bb45760405162461bcd60e51b815260206004820152602260248201527f437572696f45524332303a20496e73756666696369656e7420616c6c6f77616e60448201527f6365000000000000000000000000000000000000000000000000000000000000606482015260840161038c565b6000198114610c4a576006546001600160a01b03166339684ca583610bd9898561190e565b604051602001610beb91815260200190565b6040516020818303038152906040526040518363ffffffff1660e01b8152600401610c17929190611a02565b600060405180830381600087803b158015610c3157600080fd5b505af1158015610c45573d6000803e3d6000fd5b505050505b505050505b610c5a8484846114d0565b5060019392505050565b6004546000906001600160a01b03163314610cd65760405162461bcd60e51b815260206004820152602c60248201527f437572696f45524332303a204f6e6c792067616d652063616e2063616c6c207460448201526b3434b990333ab731ba34b7b760a11b606482015260840161038c565b6000610ce184610cf6565b9050610cee848483610784565b949350505050565b6005546040517fb869810c0000000000000000000000000000000000000000000000000000000081526000916001600160a01b03169063b869810c90610d429085908590600401611b67565b602060405180830381865afa158015610d5f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d839190611925565b92915050565b600180546102a0906118a6565b6004546001600160a01b03163314610e055760405162461bcd60e51b815260206004820152602c60248201527f437572696f45524332303a204f6e6c792067616d652063616e2063616c6c207460448201526b3434b990333ab731ba34b7b760a11b606482015260840161038c565b600080610e1184611430565b92505091506000818411610e255783610e27565b815b6006549091506001600160a01b0316638d20eac384610e46848661190e565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610e8457600080fd5b505af1158015610e98573d6000803e3d6000fd5b5050604051838152600092506001600160a01b03881691507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a38060036000828254610eef919061190e565b90915550505050505050565b600033301461124c5760055460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610f4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f719190611925565b6005546040516384d969bd60e01b815260206004820152600660248201527f4e6174696f6e0000000000000000000000000000000000000000000000000000604482015291925060009182916001600160a01b0316906384d969bd90606401602060405180830381865afa158015610fed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110119190611a6f565b6001600160a01b031663b361be468460405160200161103291815260200190565b6040516020818303038152906040526040518263ffffffff1660e01b815260040161105d91906117b1565b600060405180830381865afa15801561107a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526110a29190810190611b89565b5111611133576005546040517ff27fe5da000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b039091169063f27fe5da90602401602060405180830381865afa15801561110a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061112e9190611925565b611135565b815b60055460405163b356003960e01b81526001600160a01b0388811660048301529293506000929091169063b356003990602401602060405180830381865afa158015611185573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a99190611925565b600554604080516020810184905280820189905281518082038301815260608201928390527f8c48d213000000000000000000000000000000000000000000000000000000009092529293506001600160a01b0390911691638c48d2139161121691869190606401611c2f565b600060405180830381600087803b15801561123057600080fd5b505af1158015611244573d6000803e3d6000fd5b505050505050505b6112573384846114d0565b50600192915050565b60055460405163b356003960e01b81526001600160a01b0384811660048301526000928392911690633313db27908390839063b356003990602401602060405180830381865afa1580156112b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112dc9190611925565b60055460405163b356003960e01b81526001600160a01b0389811660048301529091169063b356003990602401602060405180830381865afa158015611326573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061134a9190611925565b6040518463ffffffff1660e01b8152600401611368939291906119dd565b602060405180830381865afa158015611385573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113a99190611925565b6005546040517f9980ec86000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690639980ec8690602401602060405180830381865afa15801561140c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cee9190611925565b6005546040517fbbdb353b000000000000000000000000000000000000000000000000000000008152600091829182916001600160a01b03169063bbdb353b906114809087908590600401611b67565b6060604051808303816000875af115801561149f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114c39190611c7c565b9250925092509193909250565b6000806114dc85611430565b925050915060008060006114ef87611430565b925092509250600954851415801561150957506009548314155b61157b5760405162461bcd60e51b815260206004820152602760248201527f437572696f45524332303a20496e2d67616d6520696e76656e746f7279206e6f60448201527f7420666f756e6400000000000000000000000000000000000000000000000000606482015260840161038c565b858410156115f15760405162461bcd60e51b815260206004820152602660248201527f437572696f45524332303a2053656e64657220696e737566666963656e74206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161038c565b6000826115fe88846118f6565b1161160a575085611617565b611614828461190e565b90505b6006546001600160a01b0316638d20eac387611633848961190e565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561167157600080fd5b505af1158015611685573d6000803e3d6000fd5b50506006546001600160a01b03169150638d20eac39050856116a784866118f6565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156116e557600080fd5b505af11580156116f9573d6000803e3d6000fd5b50505050876001600160a01b0316896001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161174291815260200190565b60405180910390a3505050505050505050565b60005b83811015611770578181015183820152602001611758565b8381111561177f576000848401525b50505050565b6000815180845261179d816020860160208601611755565b601f01601f19169290920160200192915050565b6020815260006117c46020830184611785565b9392505050565b6001600160a01b03811681146117e057600080fd5b50565b600080604083850312156117f657600080fd5b8235611801816117cb565b946020939093013593505050565b60008060006060848603121561182457600080fd5b833561182f816117cb565b9250602084013561183f816117cb565b929592945050506040919091013590565b6000806040838503121561186357600080fd5b823561186e816117cb565b9150602083013561187e816117cb565b809150509250929050565b60006020828403121561189b57600080fd5b81356117c4816117cb565b600181811c908216806118ba57607f821691505b6020821081036118da57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611909576119096118e0565b500190565b600082821015611920576119206118e0565b500390565b60006020828403121561193757600080fd5b5051919050565b8054600090600181811c908083168061195857607f831692505b6020808410820361197957634e487b7160e01b600052602260045260246000fd5b8388526020880182801561199457600181146119a5576119d0565b60ff198716825282820197506119d0565b60008981526020902060005b878110156119ca578154848201529086019084016119b1565b83019850505b5050505050505092915050565b6060815260006119f0606083018661193e565b60208301949094525060400152919050565b606081526000611a28606083016006815265105b5bdd5b9d60d21b602082015260400190565b8460208401528281036040840152611a408185611785565b95945050505050565b602081526000610d83602083016006815265105b5bdd5b9d60d21b602082015260400190565b600060208284031215611a8157600080fd5b81516117c4816117cb565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611acb57611acb611a8c565b604052919050565b600060208284031215611ae557600080fd5b815167ffffffffffffffff80821115611afd57600080fd5b818401915084601f830112611b1157600080fd5b815181811115611b2357611b23611a8c565b611b36601f8201601f1916602001611aa2565b9150808252856020828501011115611b4d57600080fd5b611b5e816020840160208601611755565b50949350505050565b6001600160a01b0383168152604060208201526000610cee604083018461193e565b60006020808385031215611b9c57600080fd5b825167ffffffffffffffff80821115611bb457600080fd5b818501915085601f830112611bc857600080fd5b815181811115611bda57611bda611a8c565b8060051b9150611beb848301611aa2565b8181529183018401918481019088841115611c0557600080fd5b938501935b83851015611c2357845182529385019390850190611c0a565b98975050505050505050565b60608152600860608201527f5472616e73666572000000000000000000000000000000000000000000000000608082015282602082015260a060408201526000610cee60a0830184611785565b600080600060608486031215611c9157600080fd5b835192506020840151915060408401519050925092509256fea2646970667358221220fad14a01b87b01c1f4448a84baf770b44a5c5315836b8febdd5b64e34b45c7ea64736f6c634300080d0033";

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
