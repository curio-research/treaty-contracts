/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ERC721A,
  ERC721AInterface,
} from "../../../../contracts/ERC721A/ERC721A.sol/ERC721A";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001160380380620011608339810160408190526200003491620001df565b8151620000499060029060208501906200006c565b5080516200005f9060039060208401906200006c565b5050600080555062000285565b8280546200007a9062000249565b90600052602060002090601f0160209004810192826200009e5760008555620000e9565b82601f10620000b957805160ff1916838001178555620000e9565b82800160010185558215620000e9579182015b82811115620000e9578251825591602001919060010190620000cc565b50620000f7929150620000fb565b5090565b5b80821115620000f75760008155600101620000fc565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013a57600080fd5b81516001600160401b038082111562000157576200015762000112565b604051601f8301601f19908116603f0116810190828211818310171562000182576200018262000112565b816040528381526020925086838588010111156200019f57600080fd5b600091505b83821015620001c35785820183015181830184015290820190620001a4565b83821115620001d55760008385830101525b9695505050505050565b60008060408385031215620001f357600080fd5b82516001600160401b03808211156200020b57600080fd5b620002198683870162000128565b935060208501519150808211156200023057600080fd5b506200023f8582860162000128565b9150509250929050565b600181811c908216806200025e57607f821691505b6020821081036200027f57634e487b7160e01b600052602260045260246000fd5b50919050565b610ecb80620002956000396000f3fe6080604052600436106100f35760003560e01c80636352211e1161008a578063a22cb46511610059578063a22cb46514610266578063b88d4fde14610286578063c87b56dd14610299578063e985e9c5146102b957600080fd5b80636352211e146101fb57806370a082311461021b5780639451c99a1461023b57806395d89b411461025157600080fd5b806318160ddd116100c657806318160ddd1461019c57806323b872dd146101bf57806342842e0e146101d257806344faf255146101e557600080fd5b806301ffc9a7146100f857806306fdde031461012d578063081812fc1461014f578063095ea7b314610187575b600080fd5b34801561010457600080fd5b50610118610113366004610b34565b610302565b60405190151581526020015b60405180910390f35b34801561013957600080fd5b5061014261039f565b6040516101249190610ba9565b34801561015b57600080fd5b5061016f61016a366004610bbc565b610431565b6040516001600160a01b039091168152602001610124565b61019a610195366004610bf1565b61048e565b005b3480156101a857600080fd5b50600154600054035b604051908152602001610124565b61019a6101cd366004610c1b565b61055f565b61019a6101e0366004610c1b565b610743565b3480156101f157600080fd5b506101b160015481565b34801561020757600080fd5b5061016f610216366004610bbc565b610763565b34801561022757600080fd5b506101b1610236366004610c57565b61076e565b34801561024757600080fd5b506101b160005481565b34801561025d57600080fd5b506101426107d6565b34801561027257600080fd5b5061019a610281366004610c72565b6107e5565b61019a610294366004610cc4565b610851565b3480156102a557600080fd5b506101426102b4366004610bbc565b61089b565b3480156102c557600080fd5b506101186102d4366004610da0565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316148061036557507f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b8061039957507f5b5e139f000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b6060600280546103ae90610dd3565b80601f01602080910402602001604051908101604052809291908181526020018280546103da90610dd3565b80156104275780601f106103fc57610100808354040283529160200191610427565b820191906000526020600020905b81548152906001019060200180831161040a57829003601f168201915b5050505050905090565b600061043c82610945565b610472576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b600061049982610763565b9050336001600160a01b038216146104eb576104b581336102d4565b6104eb576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600061056a8261096c565b9050836001600160a01b0316816001600160a01b0316146105b7576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604090208054338082146001600160a01b0388169091141761061d576105e786336102d4565b61061d576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b03851661065d576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561066857600082555b6001600160a01b038681166000908152600560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b17600085815260046020526040812091909155600160e11b841690036106fa576001840160008181526004602052604081205490036106f85760005481146106f85760008181526004602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b61075e83838360405180602001604052806000815250610851565b505050565b60006103998261096c565b60006001600160a01b0382166107b0576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600160a01b031660009081526005602052604090205467ffffffffffffffff1690565b6060600380546103ae90610dd3565b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61085c84848461055f565b6001600160a01b0383163b1561089557610878848484846109ec565b610895576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b60606108a682610945565b6108dc576040517fa14c4b5000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006108f360408051602081019091526000815290565b90508051600003610913576040518060200160405280600081525061093e565b8061091d84610ad7565b60405160200161092e929190610e0d565b6040516020818303038152906040525b9392505050565b6000805482108015610399575050600090815260046020526040902054600160e01b161590565b6000816000548110156109ba5760008181526004602052604081205490600160e01b821690036109b8575b8060000361093e575060001901600081815260046020526040902054610997565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a0290610a21903390899088908890600401610e3c565b6020604051808303816000875af1925050508015610a5c575060408051601f3d908101601f19168201909252610a5991810190610e78565b60015b610aba573d808015610a8a576040519150601f19603f3d011682016040523d82523d6000602084013e610a8f565b606091505b508051600003610ab2576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a900480610af15750819003601f19909101908152919050565b6001600160e01b031981168114610b3157600080fd5b50565b600060208284031215610b4657600080fd5b813561093e81610b1b565b60005b83811015610b6c578181015183820152602001610b54565b838111156108955750506000910152565b60008151808452610b95816020860160208601610b51565b601f01601f19169290920160200192915050565b60208152600061093e6020830184610b7d565b600060208284031215610bce57600080fd5b5035919050565b80356001600160a01b0381168114610bec57600080fd5b919050565b60008060408385031215610c0457600080fd5b610c0d83610bd5565b946020939093013593505050565b600080600060608486031215610c3057600080fd5b610c3984610bd5565b9250610c4760208501610bd5565b9150604084013590509250925092565b600060208284031215610c6957600080fd5b61093e82610bd5565b60008060408385031215610c8557600080fd5b610c8e83610bd5565b915060208301358015158114610ca357600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610cda57600080fd5b610ce385610bd5565b9350610cf160208601610bd5565b925060408501359150606085013567ffffffffffffffff80821115610d1557600080fd5b818701915087601f830112610d2957600080fd5b813581811115610d3b57610d3b610cae565b604051601f8201601f19908116603f01168101908382118183101715610d6357610d63610cae565b816040528281528a6020848701011115610d7c57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610db357600080fd5b610dbc83610bd5565b9150610dca60208401610bd5565b90509250929050565b600181811c90821680610de757607f821691505b602082108103610e0757634e487b7160e01b600052602260045260246000fd5b50919050565b60008351610e1f818460208801610b51565b835190830190610e33818360208801610b51565b01949350505050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152610e6e6080830184610b7d565b9695505050505050565b600060208284031215610e8a57600080fd5b815161093e81610b1b56fea2646970667358221220fb29893e52c8d98ccfc00bebd464c1923f516eb040584ba794cded6cc666a75e64736f6c634300080d0033";

type ERC721AConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721AConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721A__factory extends ContractFactory {
  constructor(...args: ERC721AConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721A> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721A>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC721A {
    return super.attach(address) as ERC721A;
  }
  override connect(signer: Signer): ERC721A__factory {
    return super.connect(signer) as ERC721A__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721AInterface {
    return new utils.Interface(_abi) as ERC721AInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721A {
    return new Contract(address, _abi, signerOrProvider) as ERC721A;
  }
}
