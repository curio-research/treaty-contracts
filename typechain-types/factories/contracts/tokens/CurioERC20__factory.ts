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
  "0x60e06040526064600a556000600b553480156200001b57600080fd5b5060405162001974380380620019748339810160408190526200003e9162000349565b838383826000908051906020019062000059929190620001d6565b5081516200006f906001906020850190620001d6565b5060ff81166080524660a052620000856200013a565b60c0525050506001600160a01b038116620000f25760405162461bcd60e51b8152602060048201526024808201527f437572696f45524332303a204469616d6f6e64206164647265737320726571756044820152631a5c995960e21b606482015260840160405180910390fd5b600680546001600160a01b039092166001600160a01b0319928316811790915560078054831682179055600880548316821790556009805490921617905550620004cc915050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516200016e919062000429565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b828054620001e490620003ed565b90600052602060002090601f01602090048101928262000208576000855562000253565b82601f106200022357805160ff191683800117855562000253565b8280016001018555821562000253579182015b828111156200025357825182559160200191906001019062000236565b506200026192915062000265565b5090565b5b8082111562000261576000815560010162000266565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620002a457600080fd5b81516001600160401b0380821115620002c157620002c16200027c565b604051601f8301601f19908116603f01168101908282118183101715620002ec57620002ec6200027c565b816040528381526020925086838588010111156200030957600080fd5b600091505b838210156200032d57858201830151818301840152908201906200030e565b838211156200033f5760008385830101525b9695505050505050565b600080600080608085870312156200036057600080fd5b84516001600160401b03808211156200037857600080fd5b620003868883890162000292565b955060208701519150808211156200039d57600080fd5b50620003ac8782880162000292565b935050604085015160ff81168114620003c457600080fd5b60608601519092506001600160a01b0381168114620003e257600080fd5b939692955090935050565b600181811c908216806200040257607f821691505b6020821081036200042357634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c9150808316806200044657607f831692505b602080841082036200046657634e487b7160e01b86526022600452602486fd5b8180156200047d57600181146200048f57620004be565b60ff19861689528489019650620004be565b60008a81526020902060005b86811015620004b65781548b8201529085019083016200049b565b505084890196505b509498975050505050505050565b60805160a05160c051611478620004fc60003960006106f8015260006106c30152600061021901526114786000f3fe608060405234801561001057600080fd5b50600436106101775760003560e01c806370a08231116100d8578063a9059cbb1161008c578063dd62ed3e11610066578063dd62ed3e14610327578063f0b7db4e14610352578063f851a4401461036557600080fd5b8063a9059cbb146102ee578063c3fe3e2814610301578063d505accf1461031457600080fd5b806395d89b41116100bd57806395d89b41146102a8578063993a04b7146102b05780639b1ad792146102db57600080fd5b806370a08231146102685780637ecebe001461028857600080fd5b8063239df7f21161012f578063313ce56711610114578063313ce567146102145780633644e5151461024d5780634b14e0031461025557600080fd5b8063239df7f2146101f857806323b872dd1461020157600080fd5b806307d6a5d41161016057806307d6a5d4146101b7578063095ea7b3146101cc57806318160ddd146101ef57600080fd5b806303147f391461017c57806306fdde03146101a2575b600080fd5b61018f61018a3660046110cf565b610378565b6040519081526020015b60405180910390f35b6101aa61040b565b60405161019991906110f1565b6101ca6101c5366004611146565b610499565b005b6101df6101da366004611146565b61063c565b6040519015158152602001610199565b61018f60025481565b61018f600a5481565b6101df61020f366004611170565b6106a8565b61023b7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610199565b61018f6106bf565b6101df6102633660046111ac565b61071a565b61018f6102763660046110cf565b60036020526000908152604090205481565b61018f6102963660046110cf565b60056020526000908152604090205481565b6101aa6107b4565b6007546102c3906001600160a01b031681565b6040516001600160a01b039091168152602001610199565b6101ca6102e9366004611146565b6107c1565b6101df6102fc366004611146565b610948565b6009546102c3906001600160a01b031681565b6101ca6103223660046111df565b61095e565b61018f6103353660046111ac565b600460209081526000928352604080842090915290825290205481565b6006546102c3906001600160a01b031681565b6008546102c3906001600160a01b031681565b6007546040517fb869810c0000000000000000000000000000000000000000000000000000000081526000916001600160a01b03169063b869810c906103c4908590859060040161128c565b602060405180830381865afa1580156103e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104059190611322565b92915050565b6000805461041890611252565b80601f016020809104026020016040519081016040528092919081815260200182805461044490611252565b80156104915780601f1061046657610100808354040283529160200191610491565b820191906000526020600020905b81548152906001019060200180831161047457829003601f168201915b505050505081565b6009546001600160a01b03163314806104bc57506008546001600160a01b031633145b61051d5760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b60648201526084015b60405180910390fd5b600080600061052b85610bcc565b9194509250905060008261053f8684611351565b1161054b575083610558565b6105558284611369565b90505b6008546001600160a01b0316638d20eac3856105748486611351565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af11580156105b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105db9190611380565b506040518181526001600160a01b038716906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3806002600082825461062f9190611351565b9091555050505050505050565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906106979086815260200190565b60405180910390a350600192915050565b60006106b5848484610c6c565b5060019392505050565b60007f000000000000000000000000000000000000000000000000000000000000000046146106f5576106f0611019565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6009546000906001600160a01b031633148061074057506008546001600160a01b031633145b61079c5760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b6064820152608401610514565b60006107a784610378565b90506106b5848483610c6c565b6001805461041890611252565b6009546001600160a01b03163314806107e457506008546001600160a01b031633145b6108405760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b6064820152608401610514565b60008061084c84610bcc565b925050915060008184116108605783610862565b815b6008549091506001600160a01b0316638d20eac3846108818486611369565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af11580156108c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e89190611380565b506040518181526000906001600160a01b038716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3806002600082825461093c9190611369565b90915550505050505050565b6000610955338484610c6c565b50600192915050565b428410156109ae5760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152606401610514565b600060016109ba6106bf565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015610ae1573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811615801590610b175750876001600160a01b0316816001600160a01b0316145b610b635760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e45520000000000000000000000000000000000006044820152606401610514565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b6007546040517fbbdb353b000000000000000000000000000000000000000000000000000000008152600091829182916001600160a01b03169063bbdb353b90610c1c908790859060040161128c565b6060604051808303816000875af1158015610c3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c5f91906113a2565b9250925092509193909250565b600080610c7885610bcc565b92505091506000806000610c8b87610bcc565b925092509250600b548514158015610ca55750600b548314155b610d175760405162461bcd60e51b815260206004820152602760248201527f437572696f45524332303a20496e2d67616d6520696e76656e746f7279206e6f60448201527f7420666f756e64000000000000000000000000000000000000000000000000006064820152608401610514565b85841015610d8d5760405162461bcd60e51b815260206004820152602660248201527f437572696f45524332303a2053656e64657220696e737566666963656e74206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610514565b600a546007546040517f2d2d8da60000000000000000000000000000000000000000000000000000000081526001600160a01b038b811660048301528a8116602483015290911690632d2d8da690604401602060405180830381865afa158015610dfb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1f9190611322565b1115610e935760405162461bcd60e51b815260206004820152602e60248201527f437572696f45524332303a20546f6f206661722066726f6d207265636970696560448201527f6e7420746f207472616e736665720000000000000000000000000000000000006064820152608401610514565b600082610ea08884611351565b11610eac575085610eb9565b610eb68284611369565b90505b6008546001600160a01b0316638d20eac387610ed58489611369565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af1158015610f18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f3c9190611380565b506008546001600160a01b0316638d20eac385610f598486611351565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af1158015610f9c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc09190611380565b50876001600160a01b0316896001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161100691815260200190565b60405180910390a3505050505050505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f600060405161104b91906113d0565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80356001600160a01b03811681146110ca57600080fd5b919050565b6000602082840312156110e157600080fd5b6110ea826110b3565b9392505050565b600060208083528351808285015260005b8181101561111e57858101830151858201604001528201611102565b81811115611130576000604083870101525b50601f01601f1916929092016040019392505050565b6000806040838503121561115957600080fd5b611162836110b3565b946020939093013593505050565b60008060006060848603121561118557600080fd5b61118e846110b3565b925061119c602085016110b3565b9150604084013590509250925092565b600080604083850312156111bf57600080fd5b6111c8836110b3565b91506111d6602084016110b3565b90509250929050565b600080600080600080600060e0888a0312156111fa57600080fd5b611203886110b3565b9650611211602089016110b3565b95506040880135945060608801359350608088013560ff8116811461123557600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600181811c9082168061126657607f821691505b60208210810361128657634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b038316815260006020604081840152600084546112af81611252565b80604087015260606001808416600081146112d157600181146112e557611313565b60ff19851689840152608089019550611313565b896000528660002060005b8581101561130b5781548b82018601529083019088016112f0565b8a0184019650505b50939998505050505050505050565b60006020828403121561133457600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156113645761136461133b565b500190565b60008282101561137b5761137b61133b565b500390565b60006020828403121561139257600080fd5b815180151581146110ea57600080fd5b6000806000606084860312156113b757600080fd5b8351925060208401519150604084015190509250925092565b60008083546113de81611252565b600182811680156113f6576001811461140757611436565b60ff19841687528287019450611436565b8760005260208060002060005b8581101561142d5781548a820152908401908201611414565b50505082870194505b5092969550505050505056fea2646970667358221220e83289dd57bd34b6e886045b94427fe0dc03ba5ba8460fdad6d40e6b0263053f64736f6c634300080d0033";

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
