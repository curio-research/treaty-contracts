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
  "0x60806040523480156200001157600080fd5b5060405162001db838038062001db88339810160408190526200003491620002a5565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280548316821790556003805490921617905560408051808201909152601c8082527f53696d706c65204f54432054726164696e672041677265656d656e740000000060209092019182526200012291600491620001ff565b5060408051808201909152601b8082527f4f54432054726164696e67206265747765656e20706c6179657273000000000060209092019182526200016991600591620001ff565b506040805160c081018252600060a08201818152825260208083018290528351808201855282815293830193909352606082018190526080820152805180519192600792620001bc9284920190620001ff565b50602082810151600183015560408301518051620001e19260028501920190620001ff565b50606082015160038201556080909101516004909101555062000313565b8280546200020d90620002d7565b90600052602060002090601f0160209004810192826200023157600085556200027c565b82601f106200024c57805160ff19168380011785556200027c565b828001600101855582156200027c579182015b828111156200027c5782518255916020019190600101906200025f565b506200028a9291506200028e565b5090565b5b808211156200028a57600081556001016200028f565b600060208284031215620002b857600080fd5b81516001600160a01b0381168114620002d057600080fd5b9392505050565b600181811c90821680620002ec57607f821691505b6020821081036200030d57634e487b7160e01b600052602260045260246000fd5b50919050565b611a9580620003236000396000f3fe608060405234801561001057600080fd5b50600436106102915760003560e01c80636e6a101d11610160578063cbb34e86116100d8578063ec19ae801161008c578063f2e1730b11610071578063f2e1730b14610296578063f851a440146103be578063fa91f75e1461029657600080fd5b8063ec19ae8014610296578063f0b7db4e146103ab57600080fd5b8063d553ed48116100bd578063d553ed4814610296578063e534ae5f14610296578063e75991fa1461029657600080fd5b8063cbb34e8614610296578063cc2392031461039857600080fd5b8063993a04b71161012f578063a83280bc11610114578063a83280bc14610296578063c009a6cb14610296578063c3fe3e281461038557600080fd5b8063993a04b71461035a5780639bcecd0b1461029657600080fd5b80636e6a101d146103135780637284e416146103265780637c807c621461032e578063963dc58c1461034157600080fd5b80632d47fe271161020e5780634ad30a91116101c257806360acfcc6116101a757806360acfcc6146102965780636a2a2b4e146102965780636a8165481461030b57600080fd5b80634ad30a91146102965780635f310b121461029657600080fd5b806337415516116101f3578063374155161461029657806339ebfad41461029657806347b958a61461030357600080fd5b80632d47fe27146102965780632efd6629146102f057600080fd5b80631e15495c1161026557806328f59b831161024a57806328f59b83146102d35780632b451c64146102965780632b9b15ad146102dd57600080fd5b80631e15495c14610296578063243086c41461029657600080fd5b8062048f5a1461029657806304dc7c741461029657806306fdde03146102be5780631c35717314610296575b600080fd5b6102a96102a4366004611697565b6103d1565b60405190151581526020015b60405180910390f35b6102c661043a565b6040516102b5919061174e565b6102db6104c8565b005b6102a96102eb366004611768565b6105b0565b6102db6102fe3660046117bb565b6107fd565b6102db610943565b6102db610a3d565b6102db61032136600461182b565b610b9b565b6102c661120f565b6102db61033c366004611848565b61121c565b610349611389565b6040516102b59594939291906118bd565b60025461036d906001600160a01b031681565b6040516001600160a01b0390911681526020016102b5565b60015461036d906001600160a01b031681565b6103496103a636600461182b565b6114bb565b60005461036d906001600160a01b031681565b60035461036d906001600160a01b031681565b600080546001600160a01b031633146104315760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b50600192915050565b60048054610447906118fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610473906118fd565b80156104c05780601f10610495576101008083540402835291602001916104c0565b820191906000526020600020905b8154815290600101906020018083116104a357829003601f168201915b505050505081565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610511573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105359190611937565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561059557600080fd5b505af11580156105a9573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa1580156105fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106219190611937565b6002546040517f84d969bd00000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156106b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106da9190611950565b6002546040517f688513b200000000000000000000000000000000000000000000000000000000815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa15801561074b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076f9190611937565b6040518263ffffffff1660e01b815260040161078d91815260200190565b600060405180830381865afa1580156107aa573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107d2919081019061196d565b8060200190518101906107e59190611937565b90506107f184826119e4565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610846573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086a9190611937565b60035460025460405163b356003960e01b81523060048201529293506001600160a01b039182169263def70047928592899291169063b356003990602401602060405180830381865afa1580156108c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e99190611937565b87876040518663ffffffff1660e01b815260040161090b959493929190611a0a565b600060405180830381600087803b15801561092557600080fd5b505af1158015610939573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561098c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109b09190611937565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015610a15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a399190611937565b5050565b33600090815260066020526040902060010154610a9c5760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f752068617665206e6f206578697374696e67206f72646572006044820152606401610428565b33600090815260066020526040902060040154610aba9060786119e4565b4211610b2d5760405162461bcd60e51b8152602060048201526024808201527f4f54433a2043616e206f6e6c792063616e63656c2061667465722032206d696e60448201527f75746573000000000000000000000000000000000000000000000000000000006064820152608401610428565b3360009081526006602052604090206007805490919081908390610b50906118fd565b610b5b9291906114d6565b50600182015481600101556002820181600201908054610b7a906118fd565b610b859291906114d6565b5060038281015490820155600491820154910155565b6001600160a01b038116600090815260066020526040902060010154610c295760405162461bcd60e51b815260206004820152602160248201527f4f54433a2053656c6c657220686173206e6f206578697374696e67206f72646560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610428565b6001600160a01b038116600090815260066020526040808220815160a08101909252805482908290610c5a906118fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610c86906118fd565b8015610cd35780601f10610ca857610100808354040283529160200191610cd3565b820191906000526020600020905b815481529060010190602001808311610cb657829003601f168201915b5050505050815260200160018201548152602001600282018054610cf6906118fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610d22906118fd565b8015610d6f5780601f10610d4457610100808354040283529160200191610d6f565b820191906000526020600020905b815481529060010190602001808311610d5257829003601f168201915b50505091835250506003820154602082015260049182015460409182015260025483519151631c0e27e760e11b81529394506000936001600160a01b039091169263381c4fce92610dc29290910161174e565b602060405180830381865afa158015610ddf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e039190611950565b6002546040808501519051631c0e27e760e11b81529293506000926001600160a01b039092169163381c4fce91610e3c9160040161174e565b602060405180830381865afa158015610e59573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e7d9190611950565b60025460405163b356003960e01b81523360048201529192506000916001600160a01b039091169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610edb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eff9190611937565b6040518263ffffffff1660e01b8152600401610f1d91815260200190565b602060405180830381865afa158015610f3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5e9190611937565b6040518263ffffffff1660e01b8152600401610f7c91815260200190565b602060405180830381865afa158015610f99573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fbd9190611950565b60025460405163b356003960e01b81526001600160a01b0388811660048301529293506000929091169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa15801561101d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110419190611937565b6040518263ffffffff1660e01b815260040161105f91815260200190565b602060405180830381865afa15801561107c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110a09190611937565b6040518263ffffffff1660e01b81526004016110be91815260200190565b602060405180830381865afa1580156110db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110ff9190611950565b60208601516040516323b872dd60e01b81526001600160a01b038084166004830152858116602483015260448201929092529192508516906323b872dd906064016020604051808303816000875af115801561115f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111839190611a42565b5060608501516040516323b872dd60e01b81526001600160a01b03848116600483015283811660248301526044820192909252908416906323b872dd906064016020604051808303816000875af11580156111e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112069190611a42565b50505050505050565b60058054610447906118fd565b336000908152600660205260409020600101541561127c5760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f75206861766520616e206578697374696e67206f72646572006044820152606401610428565b60008311801561128c5750600081115b6112fe5760405162461bcd60e51b815260206004820152602360248201527f4f54433a20416d6f756e7473206d75737420626520677265617465722074686160448201527f6e203000000000000000000000000000000000000000000000000000000000006064820152608401610428565b6040805160a081018252858152602080820186905281830185905260608201849052426080830152336000908152600682529290922081518051929391926113499284920190611561565b5060208281015160018301556040830151805161136c9260028501920190611561565b506060820151600382015560809091015160049091015550505050565b600780548190611398906118fd565b80601f01602080910402602001604051908101604052809291908181526020018280546113c4906118fd565b80156114115780601f106113e657610100808354040283529160200191611411565b820191906000526020600020905b8154815290600101906020018083116113f457829003601f168201915b50505050509080600101549080600201805461142c906118fd565b80601f0160208091040260200160405190810160405280929190818152602001828054611458906118fd565b80156114a55780601f1061147a576101008083540402835291602001916114a5565b820191906000526020600020905b81548152906001019060200180831161148857829003601f168201915b5050505050908060030154908060040154905085565b600660205260009081526040902080548190611398906118fd565b8280546114e2906118fd565b90600052602060002090601f0160209004810192826115045760008555611551565b82601f106115155780548555611551565b8280016001018555821561155157600052602060002091601f016020900482015b82811115611551578254825591600101919060010190611536565b5061155d9291506115d5565b5090565b82805461156d906118fd565b90600052602060002090601f01602090048101928261158f5760008555611551565b82601f106115a857805160ff1916838001178555611551565b82800160010185558215611551579182015b828111156115515782518255916020019190600101906115ba565b5b8082111561155d57600081556001016115d6565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611629576116296115ea565b604052919050565b600067ffffffffffffffff82111561164b5761164b6115ea565b50601f01601f191660200190565b600061166c61166784611631565b611600565b905082815283838301111561168057600080fd5b828260208301376000602084830101529392505050565b600080604083850312156116aa57600080fd5b82359150602083013567ffffffffffffffff8111156116c857600080fd5b8301601f810185136116d957600080fd5b6116e885823560208401611659565b9150509250929050565b60005b8381101561170d5781810151838201526020016116f5565b8381111561171c576000848401525b50505050565b6000815180845261173a8160208601602086016116f2565b601f01601f19169290920160200192915050565b6020815260006117616020830184611722565b9392505050565b6000806040838503121561177b57600080fd5b50508035926020909101359150565b600082601f83011261179b57600080fd5b61176183833560208501611659565b80151581146117b857600080fd5b50565b6000806000606084860312156117d057600080fd5b833567ffffffffffffffff8111156117e757600080fd5b6117f38682870161178a565b93505060208401359150604084013561180b816117aa565b809150509250925092565b6001600160a01b03811681146117b857600080fd5b60006020828403121561183d57600080fd5b813561176181611816565b6000806000806080858703121561185e57600080fd5b843567ffffffffffffffff8082111561187657600080fd5b6118828883890161178a565b955060208701359450604087013591508082111561189f57600080fd5b506118ac8782880161178a565b949793965093946060013593505050565b60a0815260006118d060a0830188611722565b86602084015282810360408401526118e88187611722565b60608401959095525050608001529392505050565b600181811c9082168061191157607f821691505b60208210810361193157634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561194957600080fd5b5051919050565b60006020828403121561196257600080fd5b815161176181611816565b60006020828403121561197f57600080fd5b815167ffffffffffffffff81111561199657600080fd5b8201601f810184136119a757600080fd5b80516119b561166782611631565b8181528560208385010111156119ca57600080fd5b6119db8260208301602086016116f2565b95945050505050565b60008219821115611a0557634e487b7160e01b600052601160045260246000fd5b500190565b85815260a060208201526000611a2360a0830187611722565b6040830195909552506060810192909252151560809091015292915050565b600060208284031215611a5457600080fd5b8151611761816117aa56fea2646970667358221220829adb8920c3b2daf9fb7f326626e51f1525c7aaf531fd9d9188f84fdbe64ca364736f6c634300080d0033";

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
