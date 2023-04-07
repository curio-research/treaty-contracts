/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { L2NFT, L2NFTInterface } from "../L2NFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
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
    ],
    name: "ConsecutiveTransfer",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_burnCounter",
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
    name: "_currentIndex",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "isAdmin",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quantity",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "setAdminPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
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
    name: "trustedAdmin",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060408051808201825260088152674c3254726561747960c01b60208083019182528351808501909452600684526554524541545960d01b90840152815191929162000060916003916200009e565b508051620000769060049060208401906200009e565b50506000600181815533825260208290526040909120805460ff191690911790555062000180565b828054620000ac9062000144565b90600052602060002090601f016020900481019282620000d057600085556200011b565b82601f10620000eb57805160ff19168380011785556200011b565b828001600101855582156200011b579182015b828111156200011b578251825591602001919060010190620000fe565b50620001299291506200012d565b5090565b5b808211156200012957600081556001016200012e565b600181811c908216806200015957607f821691505b6020821081036200017a57634e487b7160e01b600052602260045260246000fd5b50919050565b61125280620001906000396000f3fe60806040526004361061015f5760003560e01c806344faf255116100c057806395d89b4111610074578063b88d4fde11610059578063b88d4fde1461039b578063c87b56dd146103ae578063e985e9c5146103ce57600080fd5b806395d89b4114610366578063a22cb4651461037b57600080fd5b80636352211e116100a55780636352211e1461031057806370a08231146103305780639451c99a1461035057600080fd5b806344faf255146102da5780635c6fd90b146102f057600080fd5b806323b872dd116101175780632c85ecf8116100fc5780632c85ecf81461027757806340c10f19146102a757806342842e0e146102c757600080fd5b806323b872dd1461022b57806324d7806c1461023e57600080fd5b8063081812fc11610148578063081812fc146101bb578063095ea7b3146101f357806318160ddd1461020857600080fd5b806301ffc9a71461016457806306fdde0314610199575b600080fd5b34801561017057600080fd5b5061018461017f366004610ebb565b610417565b60405190151581526020015b60405180910390f35b3480156101a557600080fd5b506101ae6104b4565b6040516101909190610f30565b3480156101c757600080fd5b506101db6101d6366004610f43565b610546565b6040516001600160a01b039091168152602001610190565b610206610201366004610f78565b6105a3565b005b34801561021457600080fd5b50600254600154035b604051908152602001610190565b610206610239366004610fa2565b610628565b34801561024a57600080fd5b50610184610259366004610fde565b6001600160a01b031660009081526020819052604090205460ff1690565b34801561028357600080fd5b50610184610292366004610fde565b60006020819052908152604090205460ff1681565b3480156102b357600080fd5b506102066102c2366004610f78565b610836565b6102066102d5366004610fa2565b610844565b3480156102e657600080fd5b5061021d60025481565b3480156102fc57600080fd5b5061020661030b366004610fde565b610864565b34801561031c57600080fd5b506101db61032b366004610f43565b6108da565b34801561033c57600080fd5b5061021d61034b366004610fde565b6108e5565b34801561035c57600080fd5b5061021d60015481565b34801561037257600080fd5b506101ae61094d565b34801561038757600080fd5b50610206610396366004610ff9565b61095c565b6102066103a936600461104b565b6109c8565b3480156103ba57600080fd5b506101ae6103c9366004610f43565b610a12565b3480156103da57600080fd5b506101846103e9366004611127565b6001600160a01b03918216600090815260086020908152604080832093909416825291909152205460ff1690565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316148061047a57507f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b806104ae57507f5b5e139f000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b6060600380546104c39061115a565b80601f01602080910402602001604051908101604052809291908181526020018280546104ef9061115a565b801561053c5780601f106105115761010080835404028352916020019161053c565b820191906000526020600020905b81548152906001019060200180831161051f57829003601f168201915b5050505050905090565b600061055182610abc565b610587576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506000908152600760205260409020546001600160a01b031690565b60006105ae826108da565b60008381526007602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03888116918217909255915193945085939192908516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259190a4505050565b3360009081526020819052604090205460ff1661067f5760405162461bcd60e51b815260206004820152601060248201526f2ab730b8383937bb32b21030b236b4b760811b60448201526064015b60405180910390fd5b600061068a82610ae4565b90506000806106a784600090815260076020526040902080549091565b915091506106cc81876106b73390565b6001600160a01b039081169116811491141790565b610710576106da86336103e9565b610710576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b038516610750576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561075b57600082555b6001600160a01b038681166000908152600660205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b17600085815260056020526040812091909155600160e11b841690036107ed576001840160008181526005602052604081205490036107eb5760015481146107eb5760008181526005602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b6108408282610b64565b5050565b61085f838383604051806020016040528060008152506109c8565b505050565b3360009081526020819052604090205460ff166108b65760405162461bcd60e51b815260206004820152601060248201526f2ab730b8383937bb32b21030b236b4b760811b6044820152606401610676565b6001600160a01b03166000908152602081905260409020805460ff19166001179055565b60006104ae82610ae4565b60006001600160a01b038216610927576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600160a01b031660009081526006602052604090205467ffffffffffffffff1690565b6060600480546104c39061115a565b3360008181526008602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6109d3848484610628565b6001600160a01b0383163b15610a0c576109ef84848484610b7e565b610a0c576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b6060610a1d82610abc565b610a53576040517fa14c4b5000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610a6a60408051602081019091526000815290565b90508051600003610a8a5760405180602001604052806000815250610ab5565b80610a9484610c69565b604051602001610aa5929190611194565b6040516020818303038152906040525b9392505050565b6000600154821080156104ae575050600090815260056020526040902054600160e01b161590565b600081600154811015610b325760008181526005602052604081205490600160e01b82169003610b30575b80600003610ab5575060001901600081815260056020526040902054610b0f565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610840828260405180602001604052806000815250610cad565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a0290610bb39033908990889088906004016111c3565b6020604051808303816000875af1925050508015610bee575060408051601f3d908101601f19168201909252610beb918101906111ff565b60015b610c4c573d808015610c1c576040519150601f19603f3d011682016040523d82523d6000602084013e610c21565b606091505b508051600003610c44576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a900480610c835750819003601f19909101908152919050565b3360009081526020819052604090205460ff161515600114610d045760405162461bcd60e51b815260206004820152601060248201526f2ab730b8383937bb32b21030b236b4b760811b6044820152606401610676565b610d0e8383610d71565b6001600160a01b0383163b1561085f576001548281035b610d386000868380600101945086610b7e565b610d55576040516368d2bf6b60e11b815260040160405180910390fd5b818110610d25578160015414610d6a57600080fd5b5050505050565b6001546000829003610daf576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b03831660008181526006602090815260408083208054680100000000000000018802019055848352600590915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b818114610e5e57808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101610e26565b5081600003610e99576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015550505050565b6001600160e01b031981168114610eb857600080fd5b50565b600060208284031215610ecd57600080fd5b8135610ab581610ea2565b60005b83811015610ef3578181015183820152602001610edb565b83811115610a0c5750506000910152565b60008151808452610f1c816020860160208601610ed8565b601f01601f19169290920160200192915050565b602081526000610ab56020830184610f04565b600060208284031215610f5557600080fd5b5035919050565b80356001600160a01b0381168114610f7357600080fd5b919050565b60008060408385031215610f8b57600080fd5b610f9483610f5c565b946020939093013593505050565b600080600060608486031215610fb757600080fd5b610fc084610f5c565b9250610fce60208501610f5c565b9150604084013590509250925092565b600060208284031215610ff057600080fd5b610ab582610f5c565b6000806040838503121561100c57600080fd5b61101583610f5c565b91506020830135801515811461102a57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561106157600080fd5b61106a85610f5c565b935061107860208601610f5c565b925060408501359150606085013567ffffffffffffffff8082111561109c57600080fd5b818701915087601f8301126110b057600080fd5b8135818111156110c2576110c2611035565b604051601f8201601f19908116603f011681019083821181831017156110ea576110ea611035565b816040528281528a602084870101111561110357600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561113a57600080fd5b61114383610f5c565b915061115160208401610f5c565b90509250929050565b600181811c9082168061116e57607f821691505b60208210810361118e57634e487b7160e01b600052602260045260246000fd5b50919050565b600083516111a6818460208801610ed8565b8351908301906111ba818360208801610ed8565b01949350505050565b60006001600160a01b038087168352808616602084015250836040830152608060608301526111f56080830184610f04565b9695505050505050565b60006020828403121561121157600080fd5b8151610ab581610ea256fea26469706673582212201646e94cd79a66656bf9baffe0322aed2101adbd4f069086095470e0b8a963cf64736f6c634300080d0033";

type L2NFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: L2NFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export const L2NFT_ABI = _abi

export class L2NFT__factory extends ContractFactory {
  constructor(...args: L2NFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<L2NFT> {
    return super.deploy(overrides || {}) as Promise<L2NFT>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): L2NFT {
    return super.attach(address) as L2NFT;
  }
  override connect(signer: Signer): L2NFT__factory {
    return super.connect(signer) as L2NFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): L2NFTInterface {
    return new utils.Interface(_abi) as L2NFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): L2NFT {
    return new Contract(address, _abi, signerOrProvider) as L2NFT;
  }
}
