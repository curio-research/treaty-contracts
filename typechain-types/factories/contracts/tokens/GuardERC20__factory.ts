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
  GuardERC20,
  GuardERC20Interface,
} from "../../../contracts/tokens/GuardERC20";

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
        name: "_deployer",
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
  "0x60e06040523480156200001157600080fd5b5060405162000fd038038062000fd0833981016040819052620000349162000324565b83838382600090805190602001906200004f929190620001cb565b50815162000065906001906020850190620001cb565b507fff0000000000000000000000000000000000000000000000000000000000000060f882901b166080524660a0526200009e620000c2565b60c05250620000b891508290506509184e729fff6200015e565b50505050620004de565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6000604051620000f69190620003c3565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b806002600082825462000172919062000466565b90915550506001600160a01b0382166000818152600360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b828054620001d9906200048b565b90600052602060002090601f016020900481019282620001fd576000855562000248565b82601f106200021857805160ff191683800117855562000248565b8280016001018555821562000248579182015b82811115620002485782518255916020019190600101906200022b565b50620002569291506200025a565b5090565b5b808211156200025657600081556001016200025b565b600082601f83011262000282578081fd5b81516001600160401b03808211156200029f576200029f620004c8565b604051601f8301601f19908116603f01168101908282118183101715620002ca57620002ca620004c8565b81604052838152602092508683858801011115620002e6578485fd5b8491505b83821015620003095785820183015181830184015290820190620002ea565b838211156200031a57848385830101525b9695505050505050565b600080600080608085870312156200033a578384fd5b84516001600160401b038082111562000351578586fd5b6200035f8883890162000271565b9550602087015191508082111562000375578485fd5b50620003848782880162000271565b935050604085015160ff811681146200039b578283fd5b60608601519092506001600160a01b0381168114620003b8578182fd5b939692955090935050565b600080835482600182811c915080831680620003e057607f831692505b60208084108214156200040157634e487b7160e01b87526022600452602487fd5b8180156200041857600181146200042a5762000458565b60ff1986168952848901965062000458565b60008a815260209020885b86811015620004505781548b82015290850190830162000435565b505084890196505b509498975050505050505050565b600082198211156200048657634e487b7160e01b81526011600452602481fd5b500190565b600181811c90821680620004a057607f821691505b60208210811415620004c257634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b60805160f81c60a05160c051610abf62000511600039600061044501526000610410015260006101490152610abf6000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806370a0823111610081578063a9059cbb1161005b578063a9059cbb146101cd578063d505accf146101e0578063dd62ed3e146101f557600080fd5b806370a08231146101855780637ecebe00146101a557806395d89b41146101c557600080fd5b806323b872dd116100b257806323b872dd14610131578063313ce567146101445780633644e5151461017d57600080fd5b806306fdde03146100d9578063095ea7b3146100f757806318160ddd1461011a575b600080fd5b6100e1610220565b6040516100ee91906109d8565b60405180910390f35b61010a610105366004610914565b6102ae565b60405190151581526020016100ee565b61012360025481565b6040519081526020016100ee565b61010a61013f366004610868565b61031a565b61016b7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff90911681526020016100ee565b61012361040c565b610123610193366004610815565b60036020526000908152604090205481565b6101236101b3366004610815565b60056020526000908152604090205481565b6100e1610467565b61010a6101db366004610914565b610474565b6101f36101ee3660046108a3565b6104ec565b005b610123610203366004610836565b600460209081526000928352604080842090915290825290205481565b6000805461022d90610a4e565b80601f016020809104026020016040519081016040528092919081815260200182805461025990610a4e565b80156102a65780601f1061027b576101008083540402835291602001916102a6565b820191906000526020600020905b81548152906001019060200180831161028957829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103099086815260200190565b60405180910390a350600192915050565b6001600160a01b03831660009081526004602090815260408083203384529091528120546000198114610376576103518382610a2b565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b6001600160a01b0385166000908152600360205260408120805485929061039e908490610a2b565b90915550506001600160a01b03808516600081815260036020526040908190208054870190555190918716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906103f99087815260200190565b60405180910390a3506001949350505050565b60007f000000000000000000000000000000000000000000000000000000000000000046146104425761043d61075f565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6001805461022d90610a4e565b33600090815260036020526040812080548391908390610495908490610a2b565b90915550506001600160a01b038316600081815260036020526040908190208054850190555133907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906103099086815260200190565b428410156105415760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f4558504952454400000000000000000060448201526064015b60405180910390fd5b6000600161054d61040c565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015610674573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906106aa5750876001600160a01b0316816001600160a01b0316145b6106f65760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e45520000000000000000000000000000000000006044820152606401610538565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6000604051610791919061093d565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80356001600160a01b038116811461081057600080fd5b919050565b600060208284031215610826578081fd5b61082f826107f9565b9392505050565b60008060408385031215610848578081fd5b610851836107f9565b915061085f602084016107f9565b90509250929050565b60008060006060848603121561087c578081fd5b610885846107f9565b9250610893602085016107f9565b9150604084013590509250925092565b600080600080600080600060e0888a0312156108bd578283fd5b6108c6886107f9565b96506108d4602089016107f9565b95506040880135945060608801359350608088013560ff811681146108f7578384fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610926578182fd5b61092f836107f9565b946020939093013593505050565b600080835482600182811c91508083168061095957607f831692505b602080841082141561097957634e487b7160e01b87526022600452602487fd5b81801561098d576001811461099e576109ca565b60ff198616895284890196506109ca565b60008a815260209020885b868110156109c25781548b8201529085019083016109a9565b505084890196505b509498975050505050505050565b6000602080835283518082850152825b81811015610a04578581018301518582016040015282016109e8565b81811115610a155783604083870101525b50601f01601f1916929092016040019392505050565b600082821015610a4957634e487b7160e01b81526011600452602481fd5b500390565b600181811c90821680610a6257607f821691505b60208210811415610a8357634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220587fc08eb7f023d50369a838792d8941f06814af4f8d5399a7e886d6ec81a15764736f6c63430008040033";

type GuardERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GuardERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GuardERC20__factory extends ContractFactory {
  constructor(...args: GuardERC20ConstructorParams) {
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
    _deployer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GuardERC20> {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      _deployer,
      overrides || {}
    ) as Promise<GuardERC20>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    _deployer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _decimals,
      _deployer,
      overrides || {}
    );
  }
  override attach(address: string): GuardERC20 {
    return super.attach(address) as GuardERC20;
  }
  override connect(signer: Signer): GuardERC20__factory {
    return super.connect(signer) as GuardERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GuardERC20Interface {
    return new utils.Interface(_abi) as GuardERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GuardERC20 {
    return new Contract(address, _abi, signerOrProvider) as GuardERC20;
  }
}
