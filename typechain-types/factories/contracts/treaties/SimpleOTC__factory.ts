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
  "0x608060405234801561001057600080fd5b5061189e806100206000396000f3fe608060405234801561001057600080fd5b50600436106102405760003560e01c80636a2a2b4e11610145578063cbb34e86116100bd578063e75991fa1161008c578063f0b7db4e11610071578063f0b7db4e1461037a578063f2e1730b14610245578063fa91f75e1461024557600080fd5b8063e75991fa14610245578063ec19ae801461024557600080fd5b8063cbb34e8614610245578063cc23920314610367578063d553ed4814610245578063e534ae5f1461024557600080fd5b80637c807c62116101145780639bcecd0b116100f95780639bcecd0b14610245578063a83280bc14610245578063c009a6cb1461024557600080fd5b80637c807c621461033b578063963dc58c1461034e57600080fd5b80636a2a2b4e146102455780636a816548146102e75780636e6a101d146102ef5780637284e4161461030257600080fd5b80632b451c64116101d857806339ebfad4116101a75780634ad30a911161018c5780634ad30a91146102455780635f310b121461024557806360acfcc61461024557600080fd5b806339ebfad41461024557806347b958a6146102df57600080fd5b80632b451c64146102455780632d47fe27146102455780632efd6629146102cc578063374155161461024557600080fd5b80631c357173116102145780631c357173146102455780631e15495c14610245578063243086c41461024557806328f59b83146102c457600080fd5b8062048f5a1461024557806304dc7c741461024557806306fdde031461026d57806319ab453c146102af575b600080fd5b610258610253366004611548565b6103a5565b60405190151581526020015b60405180910390f35b60408051808201909152601c81527f53696d706c65204f54432054726164696e672041677265656d656e740000000060208201525b60405161026491906115f0565b6102c26102bd366004611622565b61040e565b005b6102c26104a4565b6102c26102da36600461166d565b610590565b6102c26106d6565b6102c26107d4565b6102c26102fd366004611622565b610933565b60408051808201909152601b81527f4f54432054726164696e67206265747765656e20706c6179657273000000000060208201526102a2565b6102c26103493660046116c8565b610fb8565b610356611126565b60405161026495949392919061173d565b610356610375366004611622565b611258565b60005461038d906001600160a01b031681565b6040516001600160a01b039091168152602001610264565b600080546001600160a01b031633146104055760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b50600192915050565b61041781611273565b6040805160c081018252600060a0820181815282526020808301829052835180820185528281529383019390935260608201819052608082015280518051919260029261046792849201906113a8565b5060208281015160018301556040830151805161048a92600285019201906113a8565b506060820151600382015560809091015160049091015550565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa1580156104f1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610515919061177d565b6040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b03831690635ffde14490602401600060405180830381600087803b15801561057357600080fd5b505af1158015610587573d6000803e3d6000fd5b50505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa1580156105dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610601919061177d565b60405163b356003960e01b81523060048201529091506001600160a01b038084169163def700479184918a9188169063b356003990602401602060405180830381865afa158015610656573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067a919061177d565b89896040518663ffffffff1660e01b815260040161069c959493929190611796565b600060405180830381600087803b1580156106b657600080fd5b505af11580156106ca573d6000803e3d6000fd5b50505050505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610723573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610747919061177d565b6040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b0383169063ff2a5e79906024016020604051808303816000875af11580156107aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ce919061177d565b50505050565b33600090815260016020819052604090912001546108345760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f752068617665206e6f206578697374696e67206f726465720060448201526064016103fc565b336000908152600160205260409020600401546108529060786117ce565b42116108c55760405162461bcd60e51b8152602060048201526024808201527f4f54433a2043616e206f6e6c792063616e63656c2061667465722032206d696e60448201527f757465730000000000000000000000000000000000000000000000000000000060648201526084016103fc565b33600090815260016020526040902060028054909190819083906108e8906117f4565b6108f392919061142c565b50600182015481600101556002820181600201908054610912906117f4565b61091d92919061142c565b5060038281015490820155600491820154910155565b600080546001600160a01b038381168352600160208190526040909320909201549116906109c95760405162461bcd60e51b815260206004820152602160248201527f4f54433a2053656c6c657220686173206e6f206578697374696e67206f72646560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084016103fc565b6001600160a01b038216600090815260016020526040808220815160a081019092528054829082906109fa906117f4565b80601f0160208091040260200160405190810160405280929190818152602001828054610a26906117f4565b8015610a735780601f10610a4857610100808354040283529160200191610a73565b820191906000526020600020905b815481529060010190602001808311610a5657829003601f168201915b5050505050815260200160018201548152602001600282018054610a96906117f4565b80601f0160208091040260200160405190810160405280929190818152602001828054610ac2906117f4565b8015610b0f5780601f10610ae457610100808354040283529160200191610b0f565b820191906000526020600020905b815481529060010190602001808311610af257829003601f168201915b505050918352505060038201546020820152600491820154604091820152825190517f381c4fce0000000000000000000000000000000000000000000000000000000081529293506000926001600160a01b0386169263381c4fce92610b77929091016115f0565b602060405180830381865afa158015610b94573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb8919061182e565b90506000836001600160a01b031663381c4fce84604001516040518263ffffffff1660e01b8152600401610bec91906115f0565b602060405180830381865afa158015610c09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2d919061182e565b60405163b356003960e01b81523360048201529091506000906001600160a01b0386169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610c87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cab919061177d565b6040518263ffffffff1660e01b8152600401610cc991815260200190565b602060405180830381865afa158015610ce6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d0a919061177d565b6040518263ffffffff1660e01b8152600401610d2891815260200190565b602060405180830381865afa158015610d45573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d69919061182e565b60405163b356003960e01b81526001600160a01b03888116600483015291925060009187169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610dc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de9919061177d565b6040518263ffffffff1660e01b8152600401610e0791815260200190565b602060405180830381865afa158015610e24573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e48919061177d565b6040518263ffffffff1660e01b8152600401610e6691815260200190565b602060405180830381865afa158015610e83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea7919061182e565b60208601516040516323b872dd60e01b81526001600160a01b038084166004830152858116602483015260448201929092529192508516906323b872dd906064016020604051808303816000875af1158015610f07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f2b919061184b565b5060608501516040516323b872dd60e01b81526001600160a01b03848116600483015283811660248301526044820192909252908416906323b872dd906064016020604051808303816000875af1158015610f8a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fae919061184b565b5050505050505050565b3360009081526001602081905260409091200154156110195760405162461bcd60e51b815260206004820152601f60248201527f4f54433a20596f75206861766520616e206578697374696e67206f726465720060448201526064016103fc565b6000831180156110295750600081115b61109b5760405162461bcd60e51b815260206004820152602360248201527f4f54433a20416d6f756e7473206d75737420626520677265617465722074686160448201527f6e2030000000000000000000000000000000000000000000000000000000000060648201526084016103fc565b6040805160a081018252858152602080820186905281830185905260608201849052426080830152336000908152600182529290922081518051929391926110e692849201906113a8565b5060208281015160018301556040830151805161110992600285019201906113a8565b506060820151600382015560809091015160049091015550505050565b600280548190611135906117f4565b80601f0160208091040260200160405190810160405280929190818152602001828054611161906117f4565b80156111ae5780601f10611183576101008083540402835291602001916111ae565b820191906000526020600020905b81548152906001019060200180831161119157829003601f168201915b5050505050908060010154908060020180546111c9906117f4565b80601f01602080910402602001604051908101604052809291908181526020018280546111f5906117f4565b80156112425780601f1061121757610100808354040283529160200191611242565b820191906000526020600020905b81548152906001019060200180831161122557829003601f168201915b5050505050908060030154908060040154905085565b600160205260009081526040902080548190611135906117f4565b6000546001600160a01b0316156112f25760405162461bcd60e51b815260206004820152602760248201527f437572696f5472656174793a2054726561747920616c726561647920696e697460448201527f69616c697a65640000000000000000000000000000000000000000000000000060648201526084016103fc565b6001600160a01b03811661136e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e6420616464726573732072657160448201527f756972656400000000000000000000000000000000000000000000000000000060648201526084016103fc565b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b8280546113b4906117f4565b90600052602060002090601f0160209004810192826113d6576000855561141c565b82601f106113ef57805160ff191683800117855561141c565b8280016001018555821561141c579182015b8281111561141c578251825591602001919060010190611401565b506114289291506114a7565b5090565b828054611438906117f4565b90600052602060002090601f01602090048101928261145a576000855561141c565b82601f1061146b578054855561141c565b8280016001018555821561141c57600052602060002091601f016020900482015b8281111561141c57825482559160010191906001019061148c565b5b8082111561142857600081556001016114a8565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156114ed576114ed6114bc565b604051601f8501601f19908116603f01168101908282118183101715611515576115156114bc565b8160405280935085815286868601111561152e57600080fd5b858560208301376000602087830101525050509392505050565b6000806040838503121561155b57600080fd5b82359150602083013567ffffffffffffffff81111561157957600080fd5b8301601f8101851361158a57600080fd5b611599858235602084016114d2565b9150509250929050565b6000815180845260005b818110156115c9576020818501810151868301820152016115ad565b818111156115db576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061160360208301846115a3565b9392505050565b6001600160a01b038116811461161f57600080fd5b50565b60006020828403121561163457600080fd5b81356116038161160a565b600082601f83011261165057600080fd5b611603838335602085016114d2565b801515811461161f57600080fd5b60008060006060848603121561168257600080fd5b833567ffffffffffffffff81111561169957600080fd5b6116a58682870161163f565b9350506020840135915060408401356116bd8161165f565b809150509250925092565b600080600080608085870312156116de57600080fd5b843567ffffffffffffffff808211156116f657600080fd5b6117028883890161163f565b955060208701359450604087013591508082111561171f57600080fd5b5061172c8782880161163f565b949793965093946060013593505050565b60a08152600061175060a08301886115a3565b866020840152828103604084015261176881876115a3565b60608401959095525050608001529392505050565b60006020828403121561178f57600080fd5b5051919050565b85815260a0602082015260006117af60a08301876115a3565b6040830195909552506060810192909252151560809091015292915050565b600082198211156117ef57634e487b7160e01b600052601160045260246000fd5b500190565b600181811c9082168061180857607f821691505b60208210810361182857634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561184057600080fd5b81516116038161160a565b60006020828403121561185d57600080fd5b81516116038161165f56fea2646970667358221220875f4cb0ebac6bcd6aa745f665c26f191cc0b2494be21d564e1870b4d1dc0c5564736f6c634300080d0033";

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
