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
  GoldERC20,
  GoldERC20Interface,
} from "../../../contracts/tokens/GoldERC20";

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
    stateMutability: "nonpayable",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
  "0x60e06040523480156200001157600080fd5b5060405162001c9938038062001c998339810160408190526200003491620002d9565b83838382600090805190602001906200004f92919062000166565b5081516200006590600190602085019062000166565b5060ff81166080524660a0526200007b620000ca565b60c0525050600680546001600160a01b039093166001600160a01b0319938416811790915560078054841682179055600880548416821790556009805490931617909155506200045c92505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6000604051620000fe9190620003b9565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b82805462000174906200037d565b90600052602060002090601f016020900481019282620001985760008555620001e3565b82601f10620001b357805160ff1916838001178555620001e3565b82800160010185558215620001e3579182015b82811115620001e3578251825591602001919060010190620001c6565b50620001f1929150620001f5565b5090565b5b80821115620001f15760008155600101620001f6565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200023457600080fd5b81516001600160401b03808211156200025157620002516200020c565b604051601f8301601f19908116603f011681019082821181831017156200027c576200027c6200020c565b816040528381526020925086838588010111156200029957600080fd5b600091505b83821015620002bd57858201830151818301840152908201906200029e565b83821115620002cf5760008385830101525b9695505050505050565b60008060008060808587031215620002f057600080fd5b84516001600160401b03808211156200030857600080fd5b620003168883890162000222565b955060208701519150808211156200032d57600080fd5b506200033c8782880162000222565b935050604085015160ff811681146200035457600080fd5b60608601519092506001600160a01b03811681146200037257600080fd5b939692955090935050565b600181811c908216806200039257607f821691505b602082108103620003b357634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680620003d657607f831692505b60208084108203620003f657634e487b7160e01b86526022600452602486fd5b8180156200040d57600181146200041f576200044e565b60ff198616895284890196506200044e565b60008a81526020902060005b86811015620004465781548b8201529085019083016200042b565b505084890196505b509498975050505050505050565b60805160a05160c05161180d6200048c6000396000610a8a01526000610a5501526000610205015261180d6000f3fe608060405234801561001057600080fd5b506004361061016c5760003560e01c80637ecebe00116100cd578063c3fe3e2811610081578063dd62ed3e11610066578063dd62ed3e14610313578063f0b7db4e1461033e578063f851a4401461035157600080fd5b8063c3fe3e28146102ed578063d505accf1461030057600080fd5b8063993a04b7116100b2578063993a04b71461029c5780639b1ad792146102c7578063a9059cbb146102da57600080fd5b80637ecebe001461027457806395d89b411461029457600080fd5b806323b872dd116101245780633644e515116101095780633644e515146102395780634b14e0031461024157806370a082311461025457600080fd5b806323b872dd146101ed578063313ce5671461020057600080fd5b806307d6a5d41161015557806307d6a5d4146101ac578063095ea7b3146101c157806318160ddd146101e457600080fd5b806303147f391461017157806306fdde0314610197575b600080fd5b61018461017f366004611465565b610364565b6040519081526020015b60405180910390f35b61019f6103de565b60405161018e9190611480565b6101bf6101ba3660046114d5565b61046c565b005b6101d46101cf3660046114d5565b6106c3565b604051901515815260200161018e565b61018460025481565b6101d46101fb3660046114ff565b61072f565b6102277f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff909116815260200161018e565b610184610a51565b6101d461024f36600461153b565b610aac565b610184610262366004611465565b60036020526000908152604090205481565b610184610282366004611465565b60056020526000908152604090205481565b61019f610ec8565b6007546102af906001600160a01b031681565b6040516001600160a01b03909116815260200161018e565b6101bf6102d53660046114d5565b610ed5565b6101d46102e83660046114d5565b611030565b6009546102af906001600160a01b031681565b6101bf61030e36600461156e565b6110a8565b61018461032136600461153b565b600460209081526000928352604080842090915290825290205481565b6006546102af906001600160a01b031681565b6008546102af906001600160a01b031681565b600754604051632e1a604360e21b81526000916001600160a01b03169063b869810c906103959085906004016115e1565b6020604051808303816000875af11580156103b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103d89190611614565b92915050565b600080546103eb9061162d565b80601f01602080910402602001604051908101604052809291908181526020018280546104179061162d565b80156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505081565b6009546001600160a01b031633148061048f57506008546001600160a01b031633145b6104f75760405162461bcd60e51b815260206004820152602e60248201527f435552494f3a2046756e6374696f6e2063616e206f6e6c792062652063616c6c60448201526d6564206279207468652067616d6560901b60648201526084015b60405180910390fd5b8060026000828254610509919061167d565b90915550600090508061051b84611316565b915091508160001480610537575081610534848361167d565b11155b156105fb57600854604051630416d98960e11b81526001600160a01b039091169063082db312906105719087908790600190600401611695565b6020604051808303816000875af1158015610590573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b491906116df565b506040518381526001600160a01b038516906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a36106bd565b6008546001600160a01b031663082db312856106178486611701565b60016040518463ffffffff1660e01b815260040161063793929190611695565b6020604051808303816000875af1158015610656573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067a91906116df565b506040518381526001600160a01b038516906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35b50505050565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061071e9086815260200190565b60405180910390a350600192915050565b6001600160a01b0383166000908152600460209081526040808320338452909152812054600019811461078b576107668382611701565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b60008061079786611316565b9150915081600014806107b35750816107b0868361167d565b11155b1561090357600854604051630416d98960e11b81526001600160a01b039091169063082db312906107ed908a908990600090600401611695565b6020604051808303816000875af115801561080c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083091906116df565b50600854604051630416d98960e11b81526001600160a01b039091169063082db312906108669089908990600190600401611695565b6020604051808303816000875af1158015610885573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a991906116df565b50856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef876040516108ef91815260200190565b60405180910390a360019350505050610a4a565b6008546001600160a01b031663082db3128861091f8486611701565b60006040518463ffffffff1660e01b815260040161093f93929190611695565b6020604051808303816000875af115801561095e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098291906116df565b506008546001600160a01b031663082db3128761099f8486611701565b60016040518463ffffffff1660e01b81526004016109bf93929190611695565b6020604051808303816000875af11580156109de573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0291906116df565b506001600160a01b038087169088167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef610a3c8486611701565b6040519081526020016108ef565b9392505050565b60007f00000000000000000000000000000000000000000000000000000000000000004614610a8757610a826113af565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6009546000906001600160a01b0316331480610ad257506008546001600160a01b031633145b610b355760405162461bcd60e51b815260206004820152602e60248201527f435552494f3a2046756e6374696f6e2063616e206f6e6c792062652063616c6c60448201526d6564206279207468652067616d6560901b60648201526084016104ee565b600754604051632e1a604360e21b81526000916001600160a01b03169063b869810c90610b669087906004016115e1565b6020604051808303816000875af1158015610b85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba99190611614565b6001600160a01b03851660009081526004602090815260408083203384529091529020549091506000198114610c0857610be38282611701565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b600080610c1486611316565b915091508160001480610c30575081610c2d858361167d565b11155b15610d8157600854604051630416d98960e11b81526001600160a01b039091169063082db31290610c6a908a908890600090600401611695565b6020604051808303816000875af1158015610c89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cad91906116df565b50600854604051630416d98960e11b81526001600160a01b039091169063082db31290610ce39089908890600190600401611695565b6020604051808303816000875af1158015610d02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2691906116df565b50856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef86604051610d6c91815260200190565b60405180910390a360019450505050506103d8565b6008546001600160a01b031663082db31288610d9d8486611701565b60006040518463ffffffff1660e01b8152600401610dbd93929190611695565b6020604051808303816000875af1158015610ddc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0091906116df565b506008546001600160a01b031663082db31287610e1d8486611701565b60016040518463ffffffff1660e01b8152600401610e3d93929190611695565b6020604051808303816000875af1158015610e5c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8091906116df565b506001600160a01b038087169088167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef610eba8486611701565b604051908152602001610d6c565b600180546103eb9061162d565b6009546001600160a01b0316331480610ef857506008546001600160a01b031633145b610f5b5760405162461bcd60e51b815260206004820152602e60248201527f435552494f3a2046756e6374696f6e2063616e206f6e6c792062652063616c6c60448201526d6564206279207468652067616d6560901b60648201526084016104ee565b8060026000828254610f6d9190611701565b9091555050600854604051630416d98960e11b81526001600160a01b039091169063082db31290610fa79085908590600090600401611695565b6020604051808303816000875af1158015610fc6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fea91906116df565b506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b33600090815260036020526040812080548391908390611051908490611701565b90915550506001600160a01b038316600081815260036020526040908190208054850190555133907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061071e9086815260200190565b428410156110f85760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f4558504952454400000000000000000060448201526064016104ee565b60006001611104610a51565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa15801561122b573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906112615750876001600160a01b0316816001600160a01b0316145b6112ad5760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e455200000000000000000000000000000000000060448201526064016104ee565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b6007546040517fc292d2a600000000000000000000000000000000000000000000000000000000815260009182916001600160a01b039091169063c292d2a6906113649086906004016115e1565b60408051808303816000875af1158015611382573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113a69190611718565b91509150915091565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516113e1919061173c565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80356001600160a01b038116811461146057600080fd5b919050565b60006020828403121561147757600080fd5b610a4a82611449565b600060208083528351808285015260005b818110156114ad57858101830151858201604001528201611491565b818111156114bf576000604083870101525b50601f01601f1916929092016040019392505050565b600080604083850312156114e857600080fd5b6114f183611449565b946020939093013593505050565b60008060006060848603121561151457600080fd5b61151d84611449565b925061152b60208501611449565b9150604084013590509250925092565b6000806040838503121561154e57600080fd5b61155783611449565b915061156560208401611449565b90509250929050565b600080600080600080600060e0888a03121561158957600080fd5b61159288611449565b96506115a060208901611449565b95506040880135945060608801359350608088013560ff811681146115c457600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6001600160a01b0382168152604060208201526000610a4a60408301600481526311dbdb1960e21b602082015260400190565b60006020828403121561162657600080fd5b5051919050565b600181811c9082168061164157607f821691505b60208210810361166157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561169057611690611667565b500190565b6001600160a01b03841681526080602082015260006116c860808301600481526311dbdb1960e21b602082015260400190565b604083019490945250901515606090910152919050565b6000602082840312156116f157600080fd5b81518015158114610a4a57600080fd5b60008282101561171357611713611667565b500390565b6000806040838503121561172b57600080fd5b505080516020909101519092909150565b600080835481600182811c91508083168061175857607f831692505b6020808410820361177757634e487b7160e01b86526022600452602486fd5b81801561178b576001811461179c576117c9565b60ff198616895284890196506117c9565b60008a81526020902060005b868110156117c15781548b8201529085019083016117a8565b505084890196505b50949897505050505050505056fea26469706673582212200a1c4d627826cce5ebe0ba5662519aaa6e3fdf7ef5c528b57b77aab68c29380664736f6c634300080d0033";

type GoldERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GoldERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GoldERC20__factory extends ContractFactory {
  constructor(...args: GoldERC20ConstructorParams) {
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
  ): Promise<GoldERC20> {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      _diamond,
      overrides || {}
    ) as Promise<GoldERC20>;
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
  override attach(address: string): GoldERC20 {
    return super.attach(address) as GoldERC20;
  }
  override connect(signer: Signer): GoldERC20__factory {
    return super.connect(signer) as GoldERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GoldERC20Interface {
    return new utils.Interface(_abi) as GoldERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GoldERC20 {
    return new Contract(address, _abi, signerOrProvider) as GoldERC20;
  }
}