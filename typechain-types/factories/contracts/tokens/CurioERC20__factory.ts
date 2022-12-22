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
} from "../../../contracts/tokens/CurioERC20";

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
        name: "amount",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
        name: "",
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
    inputs: [
      {
        internalType: "address",
        name: "_entityAddress",
        type: "address",
      },
    ],
    name: "checkBalanceOf",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x60e06040526014600a556000600b553480156200001b57600080fd5b50604051620018ae380380620018ae8339810160408190526200003e9162000349565b838383826000908051906020019062000059929190620001d6565b5081516200006f906001906020850190620001d6565b5060ff81166080524660a052620000856200013a565b60c0525050506001600160a01b038116620000f25760405162461bcd60e51b8152602060048201526024808201527f437572696f45524332303a204469616d6f6e64206164647265737320726571756044820152631a5c995960e21b606482015260840160405180910390fd5b600680546001600160a01b039092166001600160a01b0319928316811790915560078054831682179055600880548316821790556009805490921617905550620004cc915050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516200016e919062000429565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b828054620001e490620003ed565b90600052602060002090601f01602090048101928262000208576000855562000253565b82601f106200022357805160ff191683800117855562000253565b8280016001018555821562000253579182015b828111156200025357825182559160200191906001019062000236565b506200026192915062000265565b5090565b5b8082111562000261576000815560010162000266565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620002a457600080fd5b81516001600160401b0380821115620002c157620002c16200027c565b604051601f8301601f19908116603f01168101908282118183101715620002ec57620002ec6200027c565b816040528381526020925086838588010111156200030957600080fd5b600091505b838210156200032d57858201830151818301840152908201906200030e565b838211156200033f5760008385830101525b9695505050505050565b600080600080608085870312156200036057600080fd5b84516001600160401b03808211156200037857600080fd5b620003868883890162000292565b955060208701519150808211156200039d57600080fd5b50620003ac8782880162000292565b935050604085015160ff81168114620003c457600080fd5b60608601519092506001600160a01b0381168114620003e257600080fd5b939692955090935050565b600181811c908216806200040257607f821691505b6020821081036200042357634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c9150808316806200044657607f831692505b602080841082036200046657634e487b7160e01b86526022600452602486fd5b8180156200047d57600181146200048f57620004be565b60ff19861689528489019650620004be565b60008a81526020902060005b86811015620004b65781548b8201529085019083016200049b565b505084890196505b509498975050505050505050565b60805160a05160c0516113b2620004fc60003960006106d10152600061069c0152600061021901526113b26000f3fe608060405234801561001057600080fd5b50600436106101775760003560e01c806370a08231116100d8578063a9059cbb1161008c578063dd62ed3e11610066578063dd62ed3e14610327578063f0b7db4e14610352578063f851a4401461036557600080fd5b8063a9059cbb146102ee578063c3fe3e2814610301578063d505accf1461031457600080fd5b806395d89b41116100bd57806395d89b41146102a8578063993a04b7146102b05780639b1ad792146102db57600080fd5b806370a08231146102685780637ecebe001461028857600080fd5b8063239df7f21161012f578063313ce56711610114578063313ce567146102145780633644e5151461024d5780634b14e0031461025557600080fd5b8063239df7f2146101f857806323b872dd1461020157600080fd5b806307d6a5d41161016057806307d6a5d4146101b7578063095ea7b3146101cc57806318160ddd146101ef57600080fd5b806303147f391461017c57806306fdde03146101a2575b600080fd5b61018f61018a36600461102b565b610378565b6040519081526020015b60405180910390f35b6101aa61040b565b604051610199919061104d565b6101ca6101c53660046110a2565b610499565b005b6101df6101da3660046110a2565b610615565b6040519015158152602001610199565b61018f60025481565b61018f600a5481565b6101df61020f3660046110cc565b610681565b61023b7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610199565b61018f610698565b6101df610263366004611108565b6106f3565b61018f61027636600461102b565b60036020526000908152604090205481565b61018f61029636600461102b565b60056020526000908152604090205481565b6101aa61085f565b6007546102c3906001600160a01b031681565b6040516001600160a01b039091168152602001610199565b6101ca6102e93660046110a2565b61086c565b6101df6102fc3660046110a2565b6109cc565b6009546102c3906001600160a01b031681565b6101ca61032236600461113b565b6109e2565b61018f610335366004611108565b600460209081526000928352604080842090915290825290205481565b6006546102c3906001600160a01b031681565b6008546102c3906001600160a01b031681565b6007546040517fb869810c0000000000000000000000000000000000000000000000000000000081526000916001600160a01b03169063b869810c906103c490859085906004016111e8565b602060405180830381865afa1580156103e1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610405919061127e565b92915050565b60008054610418906111ae565b80601f0160208091040260200160405190810160405280929190818152602001828054610444906111ae565b80156104915780601f1061046657610100808354040283529160200191610491565b820191906000526020600020905b81548152906001019060200180831161047457829003601f168201915b505050505081565b6006546001600160a01b031633146105085760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b60648201526084015b60405180910390fd5b600080600061051685610c50565b9194509250905060008261052a86846112ad565b11610536575083610543565b61054082846112c5565b90505b6008546001600160a01b0316638d20eac38561055f84866112ad565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561059d57600080fd5b505af11580156105b1573d6000803e3d6000fd5b50506040518381526001600160a01b0389169250600091507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3806002600082825461060891906112ad565b9091555050505050505050565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906106709086815260200190565b60405180910390a350600192915050565b600061068e848484610cf0565b5060019392505050565b60007f000000000000000000000000000000000000000000000000000000000000000046146106ce576106c9610f75565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6006546000906001600160a01b031633146107605760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b60648201526084016104ff565b600061076b84610378565b6006549091506001600160a01b03163314610854576001600160a01b03841660009081526004602090815260408083203384529091529020548181101561081a5760405162461bcd60e51b815260206004820152602260248201527f437572696f45524332303a20496e73756666696369656e7420616c6c6f77616e60448201527f636500000000000000000000000000000000000000000000000000000000000060648201526084016104ff565b60001981146108525761082d82826112c5565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b505b61068e848483610cf0565b60018054610418906111ae565b6006546001600160a01b031633146108d65760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b60648201526084016104ff565b6000806108e284610c50565b925050915060008184116108f657836108f8565b815b6008549091506001600160a01b0316638d20eac38461091784866112c5565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561095557600080fd5b505af1158015610969573d6000803e3d6000fd5b5050604051838152600092506001600160a01b03881691507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a380600260008282546109c091906112c5565b90915550505050505050565b60006109d9338484610cf0565b50600192915050565b42841015610a325760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f4558504952454400000000000000000060448201526064016104ff565b60006001610a3e610698565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015610b65573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811615801590610b9b5750876001600160a01b0316816001600160a01b0316145b610be75760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e455200000000000000000000000000000000000060448201526064016104ff565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b6007546040517fbbdb353b000000000000000000000000000000000000000000000000000000008152600091829182916001600160a01b03169063bbdb353b90610ca090879085906004016111e8565b6060604051808303816000875af1158015610cbf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce391906112dc565b9250925092509193909250565b600080610cfc85610c50565b92505091506000806000610d0f87610c50565b925092509250600b548514158015610d295750600b548314155b610d9b5760405162461bcd60e51b815260206004820152602760248201527f437572696f45524332303a20496e2d67616d6520696e76656e746f7279206e6f60448201527f7420666f756e640000000000000000000000000000000000000000000000000060648201526084016104ff565b85841015610e115760405162461bcd60e51b815260206004820152602660248201527f437572696f45524332303a2053656e64657220696e737566666963656e74206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016104ff565b600082610e1e88846112ad565b11610e2a575085610e37565b610e3482846112c5565b90505b6008546001600160a01b0316638d20eac387610e5384896112c5565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610e9157600080fd5b505af1158015610ea5573d6000803e3d6000fd5b50506008546001600160a01b03169150638d20eac3905085610ec784866112ad565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610f0557600080fd5b505af1158015610f19573d6000803e3d6000fd5b50505050876001600160a01b0316896001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610f6291815260200190565b60405180910390a3505050505050505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6000604051610fa7919061130a565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80356001600160a01b038116811461102657600080fd5b919050565b60006020828403121561103d57600080fd5b6110468261100f565b9392505050565b600060208083528351808285015260005b8181101561107a5785810183015185820160400152820161105e565b8181111561108c576000604083870101525b50601f01601f1916929092016040019392505050565b600080604083850312156110b557600080fd5b6110be8361100f565b946020939093013593505050565b6000806000606084860312156110e157600080fd5b6110ea8461100f565b92506110f86020850161100f565b9150604084013590509250925092565b6000806040838503121561111b57600080fd5b6111248361100f565b91506111326020840161100f565b90509250929050565b600080600080600080600060e0888a03121561115657600080fd5b61115f8861100f565b965061116d6020890161100f565b95506040880135945060608801359350608088013560ff8116811461119157600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600181811c908216806111c257607f821691505b6020821081036111e257634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b0383168152600060206040818401526000845461120b816111ae565b806040870152606060018084166000811461122d57600181146112415761126f565b60ff1985168984015260808901955061126f565b896000528660002060005b858110156112675781548b820186015290830190880161124c565b8a0184019650505b50939998505050505050505050565b60006020828403121561129057600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156112c0576112c0611297565b500190565b6000828210156112d7576112d7611297565b500390565b6000806000606084860312156112f157600080fd5b8351925060208401519150604084015190509250925092565b6000808354611318816111ae565b60018281168015611330576001811461134157611370565b60ff19841687528287019450611370565b8760005260208060002060005b858110156113675781548a82015290840190820161134e565b50505082870194505b5092969550505050505056fea2646970667358221220badf346c37381561caf2fae7c21702075d958a0d62debc24c110dc70d6d9612664736f6c634300080d0033";

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
