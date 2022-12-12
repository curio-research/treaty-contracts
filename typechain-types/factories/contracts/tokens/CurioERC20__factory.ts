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
  "0x60e06040526014600a556000600b553480156200001b57600080fd5b5060405162001acd38038062001acd8339810160408190526200003e9162000349565b838383826000908051906020019062000059929190620001d6565b5081516200006f906001906020850190620001d6565b5060ff81166080524660a052620000856200013a565b60c0525050506001600160a01b038116620000f25760405162461bcd60e51b8152602060048201526024808201527f437572696f45524332303a204469616d6f6e64206164647265737320726571756044820152631a5c995960e21b606482015260840160405180910390fd5b600680546001600160a01b039092166001600160a01b0319928316811790915560078054831682179055600880548316821790556009805490921617905550620004cc915050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516200016e919062000429565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b828054620001e490620003ed565b90600052602060002090601f01602090048101928262000208576000855562000253565b82601f106200022357805160ff191683800117855562000253565b8280016001018555821562000253579182015b828111156200025357825182559160200191906001019062000236565b506200026192915062000265565b5090565b5b8082111562000261576000815560010162000266565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620002a457600080fd5b81516001600160401b0380821115620002c157620002c16200027c565b604051601f8301601f19908116603f01168101908282118183101715620002ec57620002ec6200027c565b816040528381526020925086838588010111156200030957600080fd5b600091505b838210156200032d57858201830151818301840152908201906200030e565b838211156200033f5760008385830101525b9695505050505050565b600080600080608085870312156200036057600080fd5b84516001600160401b03808211156200037857600080fd5b620003868883890162000292565b955060208701519150808211156200039d57600080fd5b50620003ac8782880162000292565b935050604085015160ff81168114620003c457600080fd5b60608601519092506001600160a01b0381168114620003e257600080fd5b939692955090935050565b600181811c908216806200040257607f821691505b6020821081036200042357634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c9150808316806200044657607f831692505b602080841082036200046657634e487b7160e01b86526022600452602486fd5b8180156200047d57600181146200048f57620004be565b60ff19861689528489019650620004be565b60008a81526020902060005b86811015620004b65781548b8201529085019083016200049b565b505084890196505b509498975050505050505050565b60805160a05160c0516115d1620004fc60003960006107af0152600061077a0152600061021901526115d16000f3fe608060405234801561001057600080fd5b50600436106101775760003560e01c806370a08231116100d8578063a9059cbb1161008c578063dd62ed3e11610066578063dd62ed3e14610327578063f0b7db4e14610352578063f851a4401461036557600080fd5b8063a9059cbb146102ee578063c3fe3e2814610301578063d505accf1461031457600080fd5b806395d89b41116100bd57806395d89b41146102a8578063993a04b7146102b05780639b1ad792146102db57600080fd5b806370a08231146102685780637ecebe001461028857600080fd5b8063239df7f21161012f578063313ce56711610114578063313ce567146102145780633644e5151461024d5780634b14e0031461025557600080fd5b8063239df7f2146101f857806323b872dd1461020157600080fd5b806307d6a5d41161016057806307d6a5d4146101b7578063095ea7b3146101cc57806318160ddd146101ef57600080fd5b806303147f391461017c57806306fdde03146101a2575b600080fd5b61018f61018a366004611228565b610378565b6040519081526020015b60405180910390f35b6101aa61040b565b604051610199919061124a565b6101ca6101c536600461129f565b610499565b005b6101df6101da36600461129f565b610627565b6040519015158152602001610199565b61018f60025481565b61018f600a5481565b6101df61020f3660046112c9565b610693565b61023b7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610199565b61018f610776565b6101df610263366004611305565b6107d1565b61018f610276366004611228565b60036020526000908152604090205481565b61018f610296366004611228565b60056020526000908152604090205481565b6101aa610922565b6007546102c3906001600160a01b031681565b6040516001600160a01b039091168152602001610199565b6101ca6102e936600461129f565b61092f565b6101df6102fc36600461129f565b610aa1565b6009546102c3906001600160a01b031681565b6101ca610322366004611338565b610ab7565b61018f610335366004611305565b600460209081526000928352604080842090915290825290205481565b6006546102c3906001600160a01b031681565b6008546102c3906001600160a01b031681565b6007546040517fb869810c0000000000000000000000000000000000000000000000000000000081526000916001600160a01b03169063b869810c906103c490859085906004016113e5565b602060405180830381865afa1580156103e1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610405919061147b565b92915050565b60008054610418906113ab565b80601f0160208091040260200160405190810160405280929190818152602001828054610444906113ab565b80156104915780601f1061046657610100808354040283529160200191610491565b820191906000526020600020905b81548152906001019060200180831161047457829003601f168201915b505050505081565b6006546001600160a01b031633146105085760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b60648201526084015b60405180910390fd5b600080600061051685610d25565b9194509250905060008261052a86846114aa565b11610536575083610543565b61054082846114c2565b90505b6008546001600160a01b0316638d20eac38561055f84866114aa565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af11580156105a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c691906114d9565b506040518181526001600160a01b038716906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3806002600082825461061a91906114aa565b9091555050505050505050565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906106829086815260200190565b60405180910390a350600192915050565b6006546000906001600160a01b03163314610761576001600160a01b0384166000908152600460209081526040808320338452909152902054828110156107275760405162461bcd60e51b815260206004820152602260248201527f437572696f45524332303a20496e73756666696369656e7420616c6c6f77616e604482015261636560f01b60648201526084016104ff565b600019811461075f5761073a83826114c2565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b505b61076c848484610dc5565b5060019392505050565b60007f000000000000000000000000000000000000000000000000000000000000000046146107ac576107a7611172565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6006546000906001600160a01b0316331461083e5760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b60648201526084016104ff565b600061084984610378565b6006549091506001600160a01b03163314610917576001600160a01b0384166000908152600460209081526040808320338452909152902054818110156108dd5760405162461bcd60e51b815260206004820152602260248201527f437572696f45524332303a20496e73756666696369656e7420616c6c6f77616e604482015261636560f01b60648201526084016104ff565b6000198114610915576108f082826114c2565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b505b61076c848483610dc5565b60018054610418906113ab565b6006546001600160a01b031633146109995760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b60648201526084016104ff565b6000806109a584610d25565b925050915060008184116109b957836109bb565b815b6008549091506001600160a01b0316638d20eac3846109da84866114c2565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af1158015610a1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4191906114d9565b506040518181526000906001600160a01b038716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a38060026000828254610a9591906114c2565b90915550505050505050565b6000610aae338484610dc5565b50600192915050565b42841015610b075760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f4558504952454400000000000000000060448201526064016104ff565b60006001610b13610776565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015610c3a573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811615801590610c705750876001600160a01b0316816001600160a01b0316145b610cbc5760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e455200000000000000000000000000000000000060448201526064016104ff565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b6007546040517fbbdb353b000000000000000000000000000000000000000000000000000000008152600091829182916001600160a01b03169063bbdb353b90610d7590879085906004016113e5565b6060604051808303816000875af1158015610d94573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db891906114fb565b9250925092509193909250565b600080610dd185610d25565b92505091506000806000610de487610d25565b925092509250600b548514158015610dfe5750600b548314155b610e705760405162461bcd60e51b815260206004820152602760248201527f437572696f45524332303a20496e2d67616d6520696e76656e746f7279206e6f60448201527f7420666f756e640000000000000000000000000000000000000000000000000060648201526084016104ff565b85841015610ee65760405162461bcd60e51b815260206004820152602660248201527f437572696f45524332303a2053656e64657220696e737566666963656e74206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016104ff565b600a546007546040517f2d2d8da60000000000000000000000000000000000000000000000000000000081526001600160a01b038b811660048301528a8116602483015290911690632d2d8da690604401602060405180830381865afa158015610f54573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f78919061147b565b1115610fec5760405162461bcd60e51b815260206004820152602e60248201527f437572696f45524332303a20546f6f206661722066726f6d207265636970696560448201527f6e7420746f207472616e7366657200000000000000000000000000000000000060648201526084016104ff565b600082610ff988846114aa565b11611005575085611012565b61100f82846114c2565b90505b6008546001600160a01b0316638d20eac38761102e84896114c2565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af1158015611071573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061109591906114d9565b506008546001600160a01b0316638d20eac3856110b284866114aa565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af11580156110f5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061111991906114d9565b50876001600160a01b0316896001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161115f91815260200190565b60405180910390a3505050505050505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516111a49190611529565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80356001600160a01b038116811461122357600080fd5b919050565b60006020828403121561123a57600080fd5b6112438261120c565b9392505050565b600060208083528351808285015260005b818110156112775785810183015185820160400152820161125b565b81811115611289576000604083870101525b50601f01601f1916929092016040019392505050565b600080604083850312156112b257600080fd5b6112bb8361120c565b946020939093013593505050565b6000806000606084860312156112de57600080fd5b6112e78461120c565b92506112f56020850161120c565b9150604084013590509250925092565b6000806040838503121561131857600080fd5b6113218361120c565b915061132f6020840161120c565b90509250929050565b600080600080600080600060e0888a03121561135357600080fd5b61135c8861120c565b965061136a6020890161120c565b95506040880135945060608801359350608088013560ff8116811461138e57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600181811c908216806113bf57607f821691505b6020821081036113df57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b03831681526000602060408184015260008454611408816113ab565b806040870152606060018084166000811461142a576001811461143e5761146c565b60ff1985168984015260808901955061146c565b896000528660002060005b858110156114645781548b8201860152908301908801611449565b8a0184019650505b50939998505050505050505050565b60006020828403121561148d57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156114bd576114bd611494565b500190565b6000828210156114d4576114d4611494565b500390565b6000602082840312156114eb57600080fd5b8151801515811461124357600080fd5b60008060006060848603121561151057600080fd5b8351925060208401519150604084015190509250925092565b6000808354611537816113ab565b6001828116801561154f57600181146115605761158f565b60ff1984168752828701945061158f565b8760005260208060002060005b858110156115865781548a82015290840190820161156d565b50505082870194505b5092969550505050505056fea2646970667358221220525cf46930ec4f71d5fff6ce4dbdbc36c19eb1bbc6dfaf78ac70ca385f99e24464736f6c634300080d0033";

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
