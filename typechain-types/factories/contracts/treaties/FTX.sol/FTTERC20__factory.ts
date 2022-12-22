/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  FTTERC20,
  FTTERC20Interface,
} from "../../../../contracts/treaties/FTX.sol/FTTERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ftx",
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
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
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
    inputs: [],
    name: "ftx",
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
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "from",
        type: "address",
      },
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
  "0x60e06040523480156200001157600080fd5b50604051620010963803806200109683398101604081905262000034916200021f565b6040805180820182526009815268232a2c102a37b5b2b760b91b60208083019182528351808501909452600384526211951560ea1b90840152815191929160129162000084916000919062000179565b5081516200009a90600190602085019062000179565b5060ff81166080524660a052620000b0620000dd565b60c0525050600680546001600160a01b0319166001600160a01b0393909316929092179091555062000330565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516200011191906200028d565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b828054620001879062000251565b90600052602060002090601f016020900481019282620001ab5760008555620001f6565b82601f10620001c657805160ff1916838001178555620001f6565b82800160010185558215620001f6579182015b82811115620001f6578251825591602001919060010190620001d9565b506200020492915062000208565b5090565b5b8082111562000204576000815560010162000209565b6000602082840312156200023257600080fd5b81516001600160a01b03811681146200024a57600080fd5b9392505050565b600181811c908216806200026657607f821691505b6020821081036200028757634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680620002aa57607f831692505b60208084108203620002ca57634e487b7160e01b86526022600452602486fd5b818015620002e15760018114620002f35762000322565b60ff1986168952848901965062000322565b60008a81526020902060005b868110156200031a5781548b820152908501908301620002ff565b505084890196505b509498975050505050505050565b60805160a05160c051610d366200036060003960006104e7015260006104b20152600061019a0152610d366000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806370a0823111610097578063a34a28fd11610066578063a34a28fd14610246578063a9059cbb14610271578063d505accf14610284578063dd62ed3e1461029757600080fd5b806370a08231146101eb5780637ecebe001461020b57806395d89b411461022b5780639dc29fac1461023357600080fd5b806323b872dd116100d357806323b872dd14610182578063313ce567146101955780633644e515146101ce57806340c10f19146101d657600080fd5b806303147f391461010557806306fdde0314610141578063095ea7b31461015657806318160ddd14610179575b600080fd5b61012e610113366004610a63565b6001600160a01b031660009081526003602052604090205490565b6040519081526020015b60405180910390f35b6101496102c2565b6040516101389190610a85565b610169610164366004610ada565b610350565b6040519015158152602001610138565b61012e60025481565b610169610190366004610b04565b6103bc565b6101bc7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610138565b61012e6104ae565b6101e96101e4366004610ada565b610509565b005b61012e6101f9366004610a63565b60036020526000908152604090205481565b61012e610219366004610a63565b60056020526000908152604090205481565b610149610576565b6101e9610241366004610ada565b610583565b600654610259906001600160a01b031681565b6040516001600160a01b039091168152602001610138565b61016961027f366004610ada565b6105e7565b6101e9610292366004610b40565b61065f565b61012e6102a5366004610bb3565b600460209081526000928352604080842090915290825290205481565b600080546102cf90610be6565b80601f01602080910402602001604051908101604052809291908181526020018280546102fb90610be6565b80156103485780601f1061031d57610100808354040283529160200191610348565b820191906000526020600020905b81548152906001019060200180831161032b57829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103ab9086815260200190565b60405180910390a350600192915050565b6001600160a01b03831660009081526004602090815260408083203384529091528120546000198114610418576103f38382610c36565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b6001600160a01b03851660009081526003602052604081208054859290610440908490610c36565b90915550506001600160a01b03808516600081815260036020526040908190208054870190555190918716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061049b9087815260200190565b60405180910390a3506001949350505050565b60007f000000000000000000000000000000000000000000000000000000000000000046146104e4576104df6108cd565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6006546001600160a01b031633146105685760405162461bcd60e51b815260206004820152601660248201527f4654543a204f6e6c79204654582063616e206d696e740000000000000000000060448201526064015b60405180910390fd5b6105728282610967565b5050565b600180546102cf90610be6565b6006546001600160a01b031633146105dd5760405162461bcd60e51b815260206004820152601660248201527f4654543a204f6e6c79204654582063616e206275726e00000000000000000000604482015260640161055f565b61057282826109d3565b33600090815260036020526040812080548391908390610608908490610c36565b90915550506001600160a01b038316600081815260036020526040908190208054850190555133907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906103ab9086815260200190565b428410156106af5760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f45585049524544000000000000000000604482015260640161055f565b600060016106bb6104ae565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa1580156107e2573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906108185750876001600160a01b0316816001600160a01b0316145b6108645760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e4552000000000000000000000000000000000000604482015260640161055f565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516108ff9190610c4d565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80600260008282546109799190610ce8565b90915550506001600160a01b0382166000818152600360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91015b60405180910390a35050565b6001600160a01b038216600090815260036020526040812080548392906109fb908490610c36565b90915550506002805482900390556040518181526000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020016109c7565b80356001600160a01b0381168114610a5e57600080fd5b919050565b600060208284031215610a7557600080fd5b610a7e82610a47565b9392505050565b600060208083528351808285015260005b81811015610ab257858101830151858201604001528201610a96565b81811115610ac4576000604083870101525b50601f01601f1916929092016040019392505050565b60008060408385031215610aed57600080fd5b610af683610a47565b946020939093013593505050565b600080600060608486031215610b1957600080fd5b610b2284610a47565b9250610b3060208501610a47565b9150604084013590509250925092565b600080600080600080600060e0888a031215610b5b57600080fd5b610b6488610a47565b9650610b7260208901610a47565b95506040880135945060608801359350608088013560ff81168114610b9657600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610bc657600080fd5b610bcf83610a47565b9150610bdd60208401610a47565b90509250929050565b600181811c90821680610bfa57607f821691505b602082108103610c1a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082821015610c4857610c48610c20565b500390565b600080835481600182811c915080831680610c6957607f831692505b60208084108203610c8857634e487b7160e01b86526022600452602486fd5b818015610c9c5760018114610cad57610cda565b60ff19861689528489019650610cda565b60008a81526020902060005b86811015610cd25781548b820152908501908301610cb9565b505084890196505b509498975050505050505050565b60008219821115610cfb57610cfb610c20565b50019056fea2646970667358221220749fbf4cf0b5b0f7e19ac8e24e823aeaf21a374323bc3632e61ec86ede4b92df64736f6c634300080d0033";

type FTTERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FTTERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FTTERC20__factory extends ContractFactory {
  constructor(...args: FTTERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _ftx: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FTTERC20> {
    return super.deploy(_ftx, overrides || {}) as Promise<FTTERC20>;
  }
  override getDeployTransaction(
    _ftx: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_ftx, overrides || {});
  }
  override attach(address: string): FTTERC20 {
    return super.attach(address) as FTTERC20;
  }
  override connect(signer: Signer): FTTERC20__factory {
    return super.connect(signer) as FTTERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FTTERC20Interface {
    return new utils.Interface(_abi) as FTTERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FTTERC20 {
    return new Contract(address, _abi, signerOrProvider) as FTTERC20;
  }
}
