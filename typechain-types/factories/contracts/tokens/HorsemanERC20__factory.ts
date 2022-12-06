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
  HorsemanERC20,
  HorsemanERC20Interface,
} from "../../../contracts/tokens/HorsemanERC20";

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
  "0x60e06040523480156200001157600080fd5b5060405162001c2f38038062001c2f8339810160408190526200003491620002d9565b83838382600090805190602001906200004f92919062000166565b5081516200006590600190602085019062000166565b5060ff81166080524660a0526200007b620000ca565b60c0525050600680546001600160a01b039093166001600160a01b0319938416811790915560078054841682179055600880548416821790556009805490931617909155506200045c92505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6000604051620000fe9190620003b9565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b82805462000174906200037d565b90600052602060002090601f016020900481019282620001985760008555620001e3565b82601f10620001b357805160ff1916838001178555620001e3565b82800160010185558215620001e3579182015b82811115620001e3578251825591602001919060010190620001c6565b50620001f1929150620001f5565b5090565b5b80821115620001f15760008155600101620001f6565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200023457600080fd5b81516001600160401b03808211156200025157620002516200020c565b604051601f8301601f19908116603f011681019082821181831017156200027c576200027c6200020c565b816040528381526020925086838588010111156200029957600080fd5b600091505b83821015620002bd57858201830151818301840152908201906200029e565b83821115620002cf5760008385830101525b9695505050505050565b60008060008060808587031215620002f057600080fd5b84516001600160401b03808211156200030857600080fd5b620003168883890162000222565b955060208701519150808211156200032d57600080fd5b506200033c8782880162000222565b935050604085015160ff811681146200035457600080fd5b60608601519092506001600160a01b03811681146200037257600080fd5b939692955090935050565b600181811c908216806200039257607f821691505b602082108103620003b357634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680620003d657607f831692505b60208084108203620003f657634e487b7160e01b86526022600452602486fd5b8180156200040d57600181146200041f576200044e565b60ff198616895284890196506200044e565b60008a81526020902060005b86811015620004465781548b8201529085019083016200042b565b505084890196505b509498975050505050505050565b60805160a05160c0516117a36200048c600039600061098f0152600061095a0152600061020501526117a36000f3fe608060405234801561001057600080fd5b506004361061016c5760003560e01c80637ecebe00116100cd578063c3fe3e2811610081578063dd62ed3e11610066578063dd62ed3e14610313578063f0b7db4e1461033e578063f851a4401461035157600080fd5b8063c3fe3e28146102ed578063d505accf1461030057600080fd5b8063993a04b7116100b2578063993a04b71461029c5780639b1ad792146102c7578063a9059cbb146102da57600080fd5b80637ecebe001461027457806395d89b411461029457600080fd5b806323b872dd116101245780633644e515116101095780633644e515146102395780634b14e0031461024157806370a082311461025457600080fd5b806323b872dd146101ed578063313ce5671461020057600080fd5b806307d6a5d41161015557806307d6a5d4146101ac578063095ea7b3146101c157806318160ddd146101e457600080fd5b806303147f391461017157806306fdde0314610197575b600080fd5b61018461017f366004611467565b610364565b6040519081526020015b60405180910390f35b61019f610416565b60405161018e9190611489565b6101bf6101ba3660046114de565b6104a4565b005b6101d46101cf3660046114de565b610708565b604051901515815260200161018e565b61018460025481565b6101d46101fb366004611508565b610774565b6102277f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff909116815260200161018e565b610184610956565b6101d461024f366004611544565b6109b1565b610184610262366004611467565b60036020526000908152604090205481565b610184610282366004611467565b60056020526000908152604090205481565b61019f610b35565b6007546102af906001600160a01b031681565b6040516001600160a01b03909116815260200161018e565b6101bf6102d53660046114de565b610b42565b6101d46102e83660046114de565b610cbd565b6009546102af906001600160a01b031681565b6101bf61030e366004611577565b610db9565b610184610321366004611544565b600460209081526000928352604080842090915290825290205481565b6006546102af906001600160a01b031681565b6008546102af906001600160a01b031681565b600754604080517fb869810c0000000000000000000000000000000000000000000000000000000081526001600160a01b038481166004830152602482019290925260086044820152672437b939b2b6b0b760c11b6064820152600092919091169063b869810c90608401602060405180830381865afa1580156103ec573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061041091906115ea565b92915050565b6000805461042390611603565b80601f016020809104026020016040519081016040528092919081815260200182805461044f90611603565b801561049c5780601f106104715761010080835404028352916020019161049c565b820191906000526020600020905b81548152906001019060200180831161047f57829003601f168201915b505050505081565b6009546001600160a01b03163314806104c757506008546001600160a01b031633145b61052f5760405162461bcd60e51b815260206004820152602e60248201527f435552494f3a2046756e6374696f6e2063616e206f6e6c792062652063616c6c60448201526d6564206279207468652067616d6560901b60648201526084015b60405180910390fd5b80600260008282546105419190611653565b9091555060009050808061055485611027565b925092509250816000148061057257508161056f8583611653565b11155b15610641576008546001600160a01b0316638d20eac3846105938785611653565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af11580156105d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105fa919061166b565b506040518481526001600160a01b038616906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3610701565b600854604051638d20eac360e01b815260048101859052602481018490526001600160a01b0390911690638d20eac3906044016020604051808303816000875af1158015610693573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b7919061166b565b506001600160a01b03851660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6106ef848661168d565b60405190815260200160405180910390a35b5050505050565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906107639086815260200190565b60405180910390a350600192915050565b6009546000906001600160a01b031633148061079a57506008546001600160a01b031633145b6107fd5760405162461bcd60e51b815260206004820152602e60248201527f435552494f3a2046756e6374696f6e2063616e206f6e6c792062652063616c6c60448201526d6564206279207468652067616d6560901b6064820152608401610526565b6001600160a01b0384166000908152600460209081526040808320338452909152902054600019811461085957610834838261168d565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b600080600061086787611027565b9250925092506000806108798a611027565b92505091508460001415801561088e57508115155b6108da5760405162461bcd60e51b815260206004820152601960248201527f496e2d67616d6520696e76656e746f727920756e666f756e64000000000000006044820152606401610526565b878110156109365760405162461bcd60e51b815260206004820152602360248201527f53656e64657220646f6573206e6f74206861766520656e6f7567682062616c616044820152626e636560e81b6064820152608401610526565b610946898b8a858986898b6110e2565b5060019998505050505050505050565b60007f0000000000000000000000000000000000000000000000000000000000000000461461098c576109876113b1565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6009546000906001600160a01b03163314806109d757506008546001600160a01b031633145b610a3a5760405162461bcd60e51b815260206004820152602e60248201527f435552494f3a2046756e6374696f6e2063616e206f6e6c792062652063616c6c60448201526d6564206279207468652067616d6560901b6064820152608401610526565b6000610a4584610364565b6001600160a01b03851660009081526004602090815260408083203384529091529020549091506000198114610aa457610a7f828261168d565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b6000806000610ab287611027565b925092509250600080610ac48a611027565b925050915084600014158015610ad957508115155b610b255760405162461bcd60e51b815260206004820152601960248201527f496e2d67616d6520696e76656e746f727920756e666f756e64000000000000006044820152606401610526565b610946898b89858986898b6110e2565b6001805461042390611603565b6009546001600160a01b0316331480610b6557506008546001600160a01b031633145b610bc85760405162461bcd60e51b815260206004820152602e60248201527f435552494f3a2046756e6374696f6e2063616e206f6e6c792062652063616c6c60448201526d6564206279207468652067616d6560901b6064820152608401610526565b8060026000828254610bda919061168d565b909155506000905080610bec84611027565b6008549294509250506001600160a01b0316638d20eac383610c0e868561168d565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af1158015610c51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c75919061166b565b506040518381526001600160a01b038516906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a350505050565b600080600080610ccc86611027565b925092509250600080610cde33611027565b925050915084600014158015610cf357508115155b610d3f5760405162461bcd60e51b815260206004820152601960248201527f496e2d67616d6520696e76656e746f727920756e666f756e64000000000000006044820152606401610526565b86811015610d9b5760405162461bcd60e51b815260206004820152602360248201527f53656e64657220646f6573206e6f74206861766520656e6f7567682062616c616044820152626e636560e81b6064820152608401610526565b610dab883389858986898b6110e2565b506001979650505050505050565b42841015610e095760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152606401610526565b60006001610e15610956565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015610f3c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811615801590610f725750876001600160a01b0316816001600160a01b0316145b610fbe5760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e45520000000000000000000000000000000000006044820152606401610526565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b600754604080517f1e4e3ce40000000000000000000000000000000000000000000000000000000081526001600160a01b038481166004830152602482019290925260086044820152672437b939b2b6b0b760c11b606482015260009283928392911690631e4e3ce490608401606060405180830381865afa1580156110b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d591906116a4565b9250925092509193909250565b8015806110f85750806110f58784611653565b11155b15611257576008546001600160a01b0316638d20eac386611119898761168d565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af115801561115c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611180919061166b565b506008546001600160a01b0316638d20eac38561119d8986611653565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af11580156111e0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611204919061166b565b50876001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8860405161124a91815260200190565b60405180910390a36113a7565b6008546001600160a01b0316638d20eac386611273858561168d565b61127d908761168d565b6040516001600160e01b031960e085901b168152600481019290925260248201526044016020604051808303816000875af11580156112c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112e4919061166b565b50600854604051638d20eac360e01b815260048101869052602481018390526001600160a01b0390911690638d20eac3906044016020604051808303816000875af1158015611337573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061135b919061166b565b506001600160a01b038089169088167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef611395858561168d565b60405190815260200160405180910390a35b5050505050505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516113e391906116d2565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80356001600160a01b038116811461146257600080fd5b919050565b60006020828403121561147957600080fd5b6114828261144b565b9392505050565b600060208083528351808285015260005b818110156114b65785810183015185820160400152820161149a565b818111156114c8576000604083870101525b50601f01601f1916929092016040019392505050565b600080604083850312156114f157600080fd5b6114fa8361144b565b946020939093013593505050565b60008060006060848603121561151d57600080fd5b6115268461144b565b92506115346020850161144b565b9150604084013590509250925092565b6000806040838503121561155757600080fd5b6115608361144b565b915061156e6020840161144b565b90509250929050565b600080600080600080600060e0888a03121561159257600080fd5b61159b8861144b565b96506115a96020890161144b565b95506040880135945060608801359350608088013560ff811681146115cd57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000602082840312156115fc57600080fd5b5051919050565b600181811c9082168061161757607f821691505b60208210810361163757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156116665761166661163d565b500190565b60006020828403121561167d57600080fd5b8151801515811461148257600080fd5b60008282101561169f5761169f61163d565b500390565b6000806000606084860312156116b957600080fd5b8351925060208401519150604084015190509250925092565b600080835481600182811c9150808316806116ee57607f831692505b6020808410820361170d57634e487b7160e01b86526022600452602486fd5b81801561172157600181146117325761175f565b60ff1986168952848901965061175f565b60008a81526020902060005b868110156117575781548b82015290850190830161173e565b505084890196505b50949897505050505050505056fea2646970667358221220ee59ae5d5cd11121ffbd98d0bd5c5790b49eb7c89c830cca8246a99637422de064736f6c634300080d0033";

type HorsemanERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HorsemanERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HorsemanERC20__factory extends ContractFactory {
  constructor(...args: HorsemanERC20ConstructorParams) {
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
  ): Promise<HorsemanERC20> {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      _diamond,
      overrides || {}
    ) as Promise<HorsemanERC20>;
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
  override attach(address: string): HorsemanERC20 {
    return super.attach(address) as HorsemanERC20;
  }
  override connect(signer: Signer): HorsemanERC20__factory {
    return super.connect(signer) as HorsemanERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HorsemanERC20Interface {
    return new utils.Interface(_abi) as HorsemanERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HorsemanERC20 {
    return new Contract(address, _abi, signerOrProvider) as HorsemanERC20;
  }
}
