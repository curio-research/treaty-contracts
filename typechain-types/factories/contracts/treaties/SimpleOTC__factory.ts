/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  SimpleOTC,
  SimpleOTCInterface,
} from "../../../contracts/treaties/SimpleOTC";

const _abi = [
  {
    inputs: [
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressToOrder",
    outputs: [
      {
        internalType: "string",
        name: "sellTokenName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "sellAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "buyTokenName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "buyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveBattle",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveClaimTile",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDelegateGameFunction",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDeployTreaty",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDisbandArmy",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDisownTile",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveEndGather",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveEndTroopProduction",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveHarvestResource",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveHarvestResourcesFromCapital",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveJoinTreaty",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveLeaveTreaty",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveMove",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveMoveCapital",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveOrganizeArmy",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveRecoverTile",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStartGather",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStartTroopProduction",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveTransfer",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUnloadResources",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeCapital",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeResource",
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
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeTile",
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
    name: "cancelOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_sellTokenName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_sellAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_buyTokenName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_buyAmount",
        type: "uint256",
      },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
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
    inputs: [],
    name: "emptyOrder",
    outputs: [
      {
        internalType: "string",
        name: "sellTokenName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "sellAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "buyTokenName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "buyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "minimumStayCheck",
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
    inputs: [],
    name: "ownerID",
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
    name: "registerTreatyAndOwnerIds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
    ],
    name: "takeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_functionName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_subjectID",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_canCall",
        type: "bool",
      },
    ],
    name: "treatyDelegateGameFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyID",
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
    name: "treatyJoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyLeave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001f4538038062001f458339810160408190526200003491620002a5565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280548316821790556003805490921617905560408051808201909152601c8082527f53696d706c65204f54432054726164696e672041677265656d656e740000000060209092019182526200012291600491620001ff565b5060408051808201909152601b8082527f4f54432054726164696e67206265747765656e20706c6179657273000000000060209092019182526200016991600591620001ff565b506040805160c081018252600060a08201818152825260208083018290528351808201855282815293830193909352606082018190526080820152805180519192600992620001bc9284920190620001ff565b50602082810151600183015560408301518051620001e19260028501920190620001ff565b50606082015160038201556080909101516004909101555062000313565b8280546200020d90620002d7565b90600052602060002090601f0160209004810192826200023157600085556200027c565b82601f106200024c57805160ff19168380011785556200027c565b828001600101855582156200027c579182015b828111156200027c5782518255916020019190600101906200025f565b506200028a9291506200028e565b5090565b5b808211156200028a57600081556001016200028f565b600060208284031215620002b857600080fd5b81516001600160a01b0381168114620002d057600080fd5b9392505050565b600181811c90821680620002ec57607f821691505b6020821081036200030d57634e487b7160e01b600052602260045260246000fd5b50919050565b611c2280620003236000396000f3fe608060405234801561001057600080fd5b50600436106102d25760003560e01c80636e6a101d11610186578063cbb34e86116100e3578063e75991fa11610097578063f2e1730b11610071578063f2e1730b146102d7578063f851a44014610427578063fa91f75e146102d757600080fd5b8063e75991fa146102d7578063ec19ae80146102d7578063f0b7db4e1461041457600080fd5b8063d553ed48116100c8578063d553ed48146102d7578063d924100e1461040b578063e534ae5f146102d757600080fd5b8063cbb34e86146102d7578063cc239203146103f857600080fd5b80639bcecd0b1161013a578063b250ede51161011f578063b250ede5146103dd578063c009a6cb146102d7578063c3fe3e28146103e557600080fd5b80639bcecd0b146102d7578063a83280bc146102d757600080fd5b80637c807c621161016b5780637c807c6214610386578063963dc58c14610399578063993a04b7146103b257600080fd5b80636e6a101d1461036b5780637284e4161461037e57600080fd5b80632efd6629116102345780635f310b12116101e85780636a2a2b4e116101cd5780636a2a2b4e146102d75780636a333c391461034c5780636a8165481461036357600080fd5b80635f310b12146102d757806360acfcc6146102d757600080fd5b806339ebfad41161021957806339ebfad4146102d757806347b958a6146103445780634ad30a91146102d757600080fd5b80632efd66291461033157806337415516146102d757600080fd5b8063243086c41161028b5780632b451c64116102705780632b451c64146102d75780632b9b15ad1461031e5780632d47fe27146102d757600080fd5b8063243086c4146102d757806328f59b831461031457600080fd5b806306fdde03116102bc57806306fdde03146102ff5780631c357173146102d75780631e15495c146102d757600080fd5b8062048f5a146102d757806304dc7c74146102d7575b600080fd5b6102ea6102e536600461182b565b61043a565b60405190151581526020015b60405180910390f35b6103076104a3565b6040516102f691906118e2565b61031c610531565b005b6102ea61032c3660046118fc565b610619565b61031c61033f36600461194f565b61084d565b61031c610942565b61035560065481565b6040519081526020016102f6565b61031c610a3c565b61031c6103793660046119bf565b610b9a565b61030761120e565b61031c6103943660046119dc565b61121b565b6103a1611388565b6040516102f6959493929190611a51565b6002546103c5906001600160a01b031681565b6040516001600160a01b0390911681526020016102f6565b61031c6114ba565b6001546103c5906001600160a01b031681565b6103a16104063660046119bf565b61164f565b61035560075481565b6000546103c5906001600160a01b031681565b6003546103c5906001600160a01b031681565b600080546001600160a01b0316331461049a5760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b50600192915050565b600480546104b090611a91565b80601f01602080910402602001604051908101604052809291908181526020018280546104dc90611a91565b80156105295780601f106104fe57610100808354040283529160200191610529565b820191906000526020600020905b81548152906001019060200180831161050c57829003601f168201915b505050505081565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561057a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061059e9190611acb565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b1580156105fe57600080fd5b505af1158015610612573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa158015610666573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068a9190611acb565b6002546040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610706573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072a9190611ae4565b6002546040517f688513b200000000000000000000000000000000000000000000000000000000815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa15801561079b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107bf9190611acb565b6040518263ffffffff1660e01b81526004016107dd91815260200190565b600060405180830381865afa1580156107fa573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108229190810190611b01565b8060200190518101906108359190611acb565b90506108418482611b78565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610896573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ba9190611acb565b6003546040517f66e39e790000000000000000000000000000000000000000000000000000000081529192506001600160a01b0316906366e39e799061090a908490889088908890600401611b9e565b600060405180830381600087803b15801561092457600080fd5b505af1158015610938573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561098b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109af9190611acb565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015610a14573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a389190611acb565b5050565b33600090815260086020526040902060010154610a9b5760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f752068617665206e6f206578697374696e67206f72646572006044820152606401610491565b33600090815260086020526040902060040154610ab9906078611b78565b4211610b2c5760405162461bcd60e51b8152602060048201526024808201527f4f54433a2043616e206f6e6c792063616e63656c2061667465722032206d696e60448201527f75746573000000000000000000000000000000000000000000000000000000006064820152608401610491565b3360009081526008602052604090206009805490919081908390610b4f90611a91565b610b5a92919061166a565b50600182015481600101556002820181600201908054610b7990611a91565b610b8492919061166a565b5060038281015490820155600491820154910155565b6001600160a01b038116600090815260086020526040902060010154610c285760405162461bcd60e51b815260206004820152602160248201527f4f54433a2053656c6c657220686173206e6f206578697374696e67206f72646560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610491565b6001600160a01b038116600090815260086020526040808220815160a08101909252805482908290610c5990611a91565b80601f0160208091040260200160405190810160405280929190818152602001828054610c8590611a91565b8015610cd25780601f10610ca757610100808354040283529160200191610cd2565b820191906000526020600020905b815481529060010190602001808311610cb557829003601f168201915b5050505050815260200160018201548152602001600282018054610cf590611a91565b80601f0160208091040260200160405190810160405280929190818152602001828054610d2190611a91565b8015610d6e5780601f10610d4357610100808354040283529160200191610d6e565b820191906000526020600020905b815481529060010190602001808311610d5157829003601f168201915b50505091835250506003820154602082015260049182015460409182015260025483519151631c0e27e760e11b81529394506000936001600160a01b039091169263381c4fce92610dc1929091016118e2565b602060405180830381865afa158015610dde573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e029190611ae4565b6002546040808501519051631c0e27e760e11b81529293506000926001600160a01b039092169163381c4fce91610e3b916004016118e2565b602060405180830381865afa158015610e58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e7c9190611ae4565b60025460405163b356003960e01b81523360048201529192506000916001600160a01b039091169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610eda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610efe9190611acb565b6040518263ffffffff1660e01b8152600401610f1c91815260200190565b602060405180830381865afa158015610f39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5d9190611acb565b6040518263ffffffff1660e01b8152600401610f7b91815260200190565b602060405180830381865afa158015610f98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fbc9190611ae4565b60025460405163b356003960e01b81526001600160a01b0388811660048301529293506000929091169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa15801561101c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110409190611acb565b6040518263ffffffff1660e01b815260040161105e91815260200190565b602060405180830381865afa15801561107b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061109f9190611acb565b6040518263ffffffff1660e01b81526004016110bd91815260200190565b602060405180830381865afa1580156110da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110fe9190611ae4565b60208601516040516323b872dd60e01b81526001600160a01b038084166004830152858116602483015260448201929092529192508516906323b872dd906064016020604051808303816000875af115801561115e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111829190611bcf565b5060608501516040516323b872dd60e01b81526001600160a01b03848116600483015283811660248301526044820192909252908416906323b872dd906064016020604051808303816000875af11580156111e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112059190611bcf565b50505050505050565b600580546104b090611a91565b336000908152600860205260409020600101541561127b5760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f75206861766520616e206578697374696e67206f72646572006044820152606401610491565b60008311801561128b5750600081115b6112fd5760405162461bcd60e51b815260206004820152602360248201527f4f54433a20416d6f756e7473206d75737420626520677265617465722074686160448201527f6e203000000000000000000000000000000000000000000000000000000000006064820152608401610491565b6040805160a0810182528581526020808201869052818301859052606082018490524260808301523360009081526008825292909220815180519293919261134892849201906116f5565b5060208281015160018301556040830151805161136b92600285019201906116f5565b506060820151600382015560809091015160049091015550505050565b60098054819061139790611a91565b80601f01602080910402602001604051908101604052809291908181526020018280546113c390611a91565b80156114105780601f106113e557610100808354040283529160200191611410565b820191906000526020600020905b8154815290600101906020018083116113f357829003601f168201915b50505050509080600101549080600201805461142b90611a91565b80601f016020809104026020016040519081016040528092919081815260200182805461145790611a91565b80156114a45780601f10611479576101008083540402835291602001916114a4565b820191906000526020600020905b81548152906001019060200180831161148757829003601f168201915b5050505050908060030154908060040154905085565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015611502573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115269190611acb565b6006556002546040516384d969bd60e01b815260206004820152600560248201527f4f776e657200000000000000000000000000000000000000000000000000000060448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561159f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115c39190611ae4565b6001600160a01b0316634c518fdc6006546040518263ffffffff1660e01b81526004016115f291815260200190565b600060405180830381865afa15801561160f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526116379190810190611b01565b80602001905181019061164a9190611acb565b600755565b60086020526000908152604090208054819061139790611a91565b82805461167690611a91565b90600052602060002090601f01602090048101928261169857600085556116e5565b82601f106116a957805485556116e5565b828001600101855582156116e557600052602060002091601f016020900482015b828111156116e55782548255916001019190600101906116ca565b506116f1929150611769565b5090565b82805461170190611a91565b90600052602060002090601f01602090048101928261172357600085556116e5565b82601f1061173c57805160ff19168380011785556116e5565b828001600101855582156116e5579182015b828111156116e557825182559160200191906001019061174e565b5b808211156116f1576000815560010161176a565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156117bd576117bd61177e565b604052919050565b600067ffffffffffffffff8211156117df576117df61177e565b50601f01601f191660200190565b60006118006117fb846117c5565b611794565b905082815283838301111561181457600080fd5b828260208301376000602084830101529392505050565b6000806040838503121561183e57600080fd5b82359150602083013567ffffffffffffffff81111561185c57600080fd5b8301601f8101851361186d57600080fd5b61187c858235602084016117ed565b9150509250929050565b60005b838110156118a1578181015183820152602001611889565b838111156118b0576000848401525b50505050565b600081518084526118ce816020860160208601611886565b601f01601f19169290920160200192915050565b6020815260006118f560208301846118b6565b9392505050565b6000806040838503121561190f57600080fd5b50508035926020909101359150565b600082601f83011261192f57600080fd5b6118f5838335602085016117ed565b801515811461194c57600080fd5b50565b60008060006060848603121561196457600080fd5b833567ffffffffffffffff81111561197b57600080fd5b6119878682870161191e565b93505060208401359150604084013561199f8161193e565b809150509250925092565b6001600160a01b038116811461194c57600080fd5b6000602082840312156119d157600080fd5b81356118f5816119aa565b600080600080608085870312156119f257600080fd5b843567ffffffffffffffff80821115611a0a57600080fd5b611a168883890161191e565b9550602087013594506040870135915080821115611a3357600080fd5b50611a408782880161191e565b949793965093946060013593505050565b60a081526000611a6460a08301886118b6565b8660208401528281036040840152611a7c81876118b6565b60608401959095525050608001529392505050565b600181811c90821680611aa557607f821691505b602082108103611ac557634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215611add57600080fd5b5051919050565b600060208284031215611af657600080fd5b81516118f5816119aa565b600060208284031215611b1357600080fd5b815167ffffffffffffffff811115611b2a57600080fd5b8201601f81018413611b3b57600080fd5b8051611b496117fb826117c5565b818152856020838501011115611b5e57600080fd5b611b6f826020830160208601611886565b95945050505050565b60008219821115611b9957634e487b7160e01b600052601160045260246000fd5b500190565b848152608060208201526000611bb760808301866118b6565b60408301949094525090151560609091015292915050565b600060208284031215611be157600080fd5b81516118f58161193e56fea2646970667358221220ec207d113512460108bd6d76af2f7d9a97c28915d1f05b686ef7339a10eafae364736f6c634300080d0033";

type SimpleOTCConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SimpleOTCConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SimpleOTC__factory extends ContractFactory {
  constructor(...args: SimpleOTCConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SimpleOTC> {
    return super.deploy(_diamond, overrides || {}) as Promise<SimpleOTC>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): SimpleOTC {
    return super.attach(address) as SimpleOTC;
  }
  override connect(signer: Signer): SimpleOTC__factory {
    return super.connect(signer) as SimpleOTC__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleOTCInterface {
    return new utils.Interface(_abi) as SimpleOTCInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleOTC {
    return new Contract(address, _abi, signerOrProvider) as SimpleOTC;
  }
}
