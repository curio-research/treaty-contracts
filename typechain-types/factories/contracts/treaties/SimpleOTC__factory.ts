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
    name: "approveStopTroopProduction",
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
    stateMutability: "pure",
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
    inputs: [
      {
        internalType: "address",
        name: "_diamond",
        type: "address",
      },
    ],
    name: "init",
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
    stateMutability: "pure",
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
    name: "sellerToOrder",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061192e806100206000396000f3fe608060405234801561001057600080fd5b506004361061025b5760003560e01c806360acfcc611610145578063c009a6cb116100bd578063e75991fa1161008c578063f0b7db4e11610071578063f0b7db4e14610395578063f2e1730b14610260578063fa91f75e1461026057600080fd5b8063e75991fa14610260578063ec19ae801461026057600080fd5b8063c009a6cb14610260578063cbb34e8614610260578063d553ed4814610260578063e534ae5f1461026057600080fd5b80637284e41611610114578063963dc58c116100f9578063963dc58c1461038d5780639bcecd0b14610260578063a83280bc1461026057600080fd5b80637284e416146103415780637c807c621461037a57600080fd5b806360acfcc6146102605780636a2a2b4e146102605780636a816548146103265780636e6a101d1461032e57600080fd5b80632b451c64116101d857806337415516116101a757806347b958a61161018c57806347b958a61461031e5780634ad30a91146102605780635f310b121461026057600080fd5b8063374155161461026057806339ebfad41461026057600080fd5b80632b451c64146102605780632c182023146102605780632d47fe27146102605780632efd66291461030b57600080fd5b80631c3571731161022f578063243086c411610214578063243086c414610260578063248c486c146102df57806328f59b831461030357600080fd5b80631c357173146102605780631e15495c1461026057600080fd5b8062048f5a1461026057806304dc7c741461026057806306fdde031461028857806319ab453c146102ca575b600080fd5b61027361026e3660046115d8565b6103c0565b60405190151581526020015b60405180910390f35b60408051808201909152601c81527f53696d706c65204f54432054726164696e672041677265656d656e740000000060208201525b60405161027f9190611680565b6102dd6102d83660046116b2565b610429565b005b6102f26102ed3660046116b2565b6104bf565b60405161027f9594939291906116cf565b6102dd6105fd565b6102dd61031936600461173d565b6106e9565b6102dd61082f565b6102dd61092d565b6102dd61033c3660046116b2565b610a8c565b60408051808201909152601b81527f4f54432054726164696e67206265747765656e20706c6179657273000000000060208201526102bd565b6102dd610388366004611798565b611186565b6102f26112f4565b6000546103a8906001600160a01b031681565b6040516001600160a01b03909116815260200161027f565b600080546001600160a01b031633146104205760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b50600192915050565b61043281611303565b6040805160c081018252600060a082018181528252602080830182905283518082018552828152938301939093526060820181905260808201528051805191926002926104829284920190611438565b506020828101516001830155604083015180516104a59260028501920190611438565b506060820151600382015560809091015160049091015550565b6001602052600090815260409020805481906104da9061180d565b80601f01602080910402602001604051908101604052809291908181526020018280546105069061180d565b80156105535780601f1061052857610100808354040283529160200191610553565b820191906000526020600020905b81548152906001019060200180831161053657829003601f168201915b50505050509080600101549080600201805461056e9061180d565b80601f016020809104026020016040519081016040528092919081815260200182805461059a9061180d565b80156105e75780601f106105bc576101008083540402835291602001916105e7565b820191906000526020600020905b8154815290600101906020018083116105ca57829003601f168201915b5050505050908060030154908060040154905085565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa15801561064a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061066e9190611847565b6040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b03831690635ffde14490602401600060405180830381600087803b1580156106cc57600080fd5b505af11580156106e0573d6000803e3d6000fd5b50505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610736573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075a9190611847565b60405163b356003960e01b81523060048201529091506001600160a01b038084169163def700479184918a9188169063b356003990602401602060405180830381865afa1580156107af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d39190611847565b89896040518663ffffffff1660e01b81526004016107f5959493929190611860565b600060405180830381600087803b15801561080f57600080fd5b505af1158015610823573d6000803e3d6000fd5b50505050505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa15801561087c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a09190611847565b6040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b0383169063ff2a5e79906024016020604051808303816000875af1158015610903573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109279190611847565b50505050565b336000908152600160208190526040909120015461098d5760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f752068617665206e6f206578697374696e67206f72646572006044820152606401610417565b336000908152600160205260409020600401546109ab906078611898565b4211610a1e5760405162461bcd60e51b8152602060048201526024808201527f4f54433a2043616e206f6e6c792063616e63656c2061667465722032206d696e60448201527f75746573000000000000000000000000000000000000000000000000000000006064820152608401610417565b3360009081526001602052604090206002805490919081908390610a419061180d565b610a4c9291906114bc565b50600182015481600101556002820181600201908054610a6b9061180d565b610a769291906114bc565b5060038281015490820155600491820154910155565b600080546001600160a01b03838116835260016020819052604090932090920154911690610b225760405162461bcd60e51b815260206004820152602160248201527f4f54433a2053656c6c657220686173206e6f206578697374696e67206f72646560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610417565b6001600160a01b038216600090815260016020526040808220815160a08101909252805482908290610b539061180d565b80601f0160208091040260200160405190810160405280929190818152602001828054610b7f9061180d565b8015610bcc5780601f10610ba157610100808354040283529160200191610bcc565b820191906000526020600020905b815481529060010190602001808311610baf57829003601f168201915b5050505050815260200160018201548152602001600282018054610bef9061180d565b80601f0160208091040260200160405190810160405280929190818152602001828054610c1b9061180d565b8015610c685780601f10610c3d57610100808354040283529160200191610c68565b820191906000526020600020905b815481529060010190602001808311610c4b57829003601f168201915b505050918352505060038201546020820152600491820154604091820152825190517f381c4fce0000000000000000000000000000000000000000000000000000000081529293506000926001600160a01b0386169263381c4fce92610cd092909101611680565b602060405180830381865afa158015610ced573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d1191906118be565b90506000836001600160a01b031663381c4fce84604001516040518263ffffffff1660e01b8152600401610d459190611680565b602060405180830381865afa158015610d62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d8691906118be565b60405163b356003960e01b81523360048201529091506000906001600160a01b0386169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610de0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e049190611847565b6040518263ffffffff1660e01b8152600401610e2291815260200190565b602060405180830381865afa158015610e3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e639190611847565b6040518263ffffffff1660e01b8152600401610e8191815260200190565b602060405180830381865afa158015610e9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec291906118be565b60405163b356003960e01b81526001600160a01b03888116600483015291925060009187169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610f1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f429190611847565b6040518263ffffffff1660e01b8152600401610f6091815260200190565b602060405180830381865afa158015610f7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa19190611847565b6040518263ffffffff1660e01b8152600401610fbf91815260200190565b602060405180830381865afa158015610fdc573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061100091906118be565b60208601516040516323b872dd60e01b81526001600160a01b038084166004830152858116602483015260448201929092529192508516906323b872dd906064016020604051808303816000875af1158015611060573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061108491906118db565b5060608501516040516323b872dd60e01b81526001600160a01b03848116600483015283811660248301526044820192909252908416906323b872dd906064016020604051808303816000875af11580156110e3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061110791906118db565b506001600160a01b038716600090815260016020526040902060028054909190819083906111349061180d565b61113f9291906114bc565b5060018201548160010155600282018160020190805461115e9061180d565b6111699291906114bc565b506003828101549082015560049182015491015550505050505050565b3360009081526001602081905260409091200154156111e75760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f75206861766520616e206578697374696e67206f72646572006044820152606401610417565b6000831180156111f75750600081115b6112695760405162461bcd60e51b815260206004820152602360248201527f4f54433a20416d6f756e7473206d75737420626520677265617465722074686160448201527f6e203000000000000000000000000000000000000000000000000000000000006064820152608401610417565b6040805160a081018252858152602080820186905281830185905260608201849052426080830152336000908152600182529290922081518051929391926112b49284920190611438565b506020828101516001830155604083015180516112d79260028501920190611438565b506060820151600382015560809091015160049091015550505050565b6002805481906104da9061180d565b6000546001600160a01b0316156113825760405162461bcd60e51b815260206004820152602760248201527f437572696f5472656174793a2054726561747920616c726561647920696e697460448201527f69616c697a6564000000000000000000000000000000000000000000000000006064820152608401610417565b6001600160a01b0381166113fe5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e6420616464726573732072657160448201527f75697265640000000000000000000000000000000000000000000000000000006064820152608401610417565b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b8280546114449061180d565b90600052602060002090601f01602090048101928261146657600085556114ac565b82601f1061147f57805160ff19168380011785556114ac565b828001600101855582156114ac579182015b828111156114ac578251825591602001919060010190611491565b506114b8929150611537565b5090565b8280546114c89061180d565b90600052602060002090601f0160209004810192826114ea57600085556114ac565b82601f106114fb57805485556114ac565b828001600101855582156114ac57600052602060002091601f016020900482015b828111156114ac57825482559160010191906001019061151c565b5b808211156114b85760008155600101611538565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561157d5761157d61154c565b604051601f8501601f19908116603f011681019082821181831017156115a5576115a561154c565b816040528093508581528686860111156115be57600080fd5b858560208301376000602087830101525050509392505050565b600080604083850312156115eb57600080fd5b82359150602083013567ffffffffffffffff81111561160957600080fd5b8301601f8101851361161a57600080fd5b61162985823560208401611562565b9150509250929050565b6000815180845260005b818110156116595760208185018101518683018201520161163d565b8181111561166b576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006116936020830184611633565b9392505050565b6001600160a01b03811681146116af57600080fd5b50565b6000602082840312156116c457600080fd5b81356116938161169a565b60a0815260006116e260a0830188611633565b86602084015282810360408401526116fa8187611633565b60608401959095525050608001529392505050565b600082601f83011261172057600080fd5b61169383833560208501611562565b80151581146116af57600080fd5b60008060006060848603121561175257600080fd5b833567ffffffffffffffff81111561176957600080fd5b6117758682870161170f565b93505060208401359150604084013561178d8161172f565b809150509250925092565b600080600080608085870312156117ae57600080fd5b843567ffffffffffffffff808211156117c657600080fd5b6117d28883890161170f565b95506020870135945060408701359150808211156117ef57600080fd5b506117fc8782880161170f565b949793965093946060013593505050565b600181811c9082168061182157607f821691505b60208210810361184157634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561185957600080fd5b5051919050565b85815260a06020820152600061187960a0830187611633565b6040830195909552506060810192909252151560809091015292915050565b600082198211156118b957634e487b7160e01b600052601160045260246000fd5b500190565b6000602082840312156118d057600080fd5b81516116938161169a565b6000602082840312156118ed57600080fd5b81516116938161172f56fea2646970667358221220191119527dcc4a82c585a1b2dc731d3f5ce263f7e7b1cca6f8061520c42ebc9364736f6c634300080d0033";

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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SimpleOTC> {
    return super.deploy(overrides || {}) as Promise<SimpleOTC>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
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
