/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestTreaty,
  TestTreatyInterface,
} from "../../../contracts/treaties/TestTreaty";

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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_capitalID",
        type: "uint256",
      },
    ],
    name: "treatyUpgradeCapital",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620017bc380380620017bc8339810160408190526200003491620001fa565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280548316821790556003805490921617905560408051808201909152600b8082526a546573742054726561747960a81b6020909201918252620001109160049162000154565b506040805180820190915260128082527154726561747920666f722074657374696e6760701b60209092019182526200014c9160059162000154565b505062000268565b82805462000162906200022c565b90600052602060002090601f016020900481019282620001865760008555620001d1565b82601f10620001a157805160ff1916838001178555620001d1565b82800160010185558215620001d1579182015b82811115620001d1578251825591602001919060010190620001b4565b50620001df929150620001e3565b5090565b5b80821115620001df5760008155600101620001e4565b6000602082840312156200020d57600080fd5b81516001600160a01b03811681146200022557600080fd5b9392505050565b600181811c908216806200024157607f821691505b6020821081036200026257634e487b7160e01b600052602260045260246000fd5b50919050565b61154480620002786000396000f3fe608060405234801561001057600080fd5b50600436106102255760003560e01c806360acfcc61161012a578063cbb34e86116100bd578063ec19ae801161008c578063f2e1730b11610071578063f2e1730b1461022a578063f851a4401461031e578063fa91f75e1461022a57600080fd5b8063ec19ae801461022a578063f0b7db4e1461030b57600080fd5b8063cbb34e861461022a578063d553ed481461022a578063e534ae5f1461022a578063e75991fa1461022a57600080fd5b80639bcecd0b116100f95780639bcecd0b1461022a578063a83280bc1461022a578063c009a6cb1461022a578063c3fe3e28146102f857600080fd5b806360acfcc6146102b25780636a2a2b4e1461022a5780637284e416146102c5578063993a04b7146102cd57600080fd5b80632b9b15ad116101bd57806339ebfad41161018c57806347b958a61161017157806347b958a6146102aa5780634ad30a911461022a5780635f310b121461022a57600080fd5b806339ebfad41461022a5780634142a8a11461029757600080fd5b80632b9b15ad146102715780632d47fe271461022a5780632efd662914610284578063374155161461022a57600080fd5b80631e15495c116101f95780631e15495c1461022a578063243086c41461022a57806328f59b83146102675780632b451c641461022a57600080fd5b8062048f5a1461022a57806304dc7c741461022a57806306fdde03146102525780631c3571731461022a575b600080fd5b61023d610238366004611219565b610331565b60405190151581526020015b60405180910390f35b61025a61039b565b60405161024991906112d0565b61026f610429565b005b61023d61027f3660046112ea565b610474565b61026f61029236600461130c565b6106c1565b61026f6102a5366004611380565b610807565b61026f610ef6565b61023d6102c0366004611219565b610f40565b61025a610f7d565b6002546102e0906001600160a01b031681565b6040516001600160a01b039091168152602001610249565b6001546102e0906001600160a01b031681565b6000546102e0906001600160a01b031681565b6003546102e0906001600160a01b031681565b600080546001600160a01b031633146103915760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b600480546103a890611399565b80601f01602080910402602001604051908101604052809291908181526020018280546103d490611399565b80156104215780601f106103f657610100808354040283529160200191610421565b820191906000526020600020905b81548152906001019060200180831161040457829003601f168201915b505050505081565b61046a6040518060400160405280601481526020017f44656c656761746547616d6546756e6374696f6e0000000000000000000000008152506000806106c1565b610472610f8a565b565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa1580156104c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e591906113d3565b6002546040517f84d969bd00000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561057a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061059e91906113ec565b6002546040517f688513b200000000000000000000000000000000000000000000000000000000815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa15801561060f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063391906113d3565b6040518263ffffffff1660e01b815260040161065191815260200190565b600060405180830381865afa15801561066e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106969190810190611415565b8060200190518101906106a991906113d3565b90506106b5848261148c565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561070a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072e91906113d3565b60035460025460405163b356003960e01b81523060048201529293506001600160a01b039182169263def70047928592899291169063b356003990602401602060405180830381865afa158015610789573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ad91906113d3565b87876040518663ffffffff1660e01b81526004016107cf9594939291906114b2565b600060405180830381600087803b1580156107e957600080fd5b505af11580156107fd573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526001600160a01b039091169063688513b290829063b356003990602401602060405180830381865afa158015610857573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087b91906113d3565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa1580156108c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e791906113d3565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401602060405180830381865afa158015610928573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061094c91906113d3565b6000036109c15760405162461bcd60e51b815260206004820152602160248201527f437572696f5472656174793a204f6e6c79207369676e65722063616e2063616c60448201527f6c000000000000000000000000000000000000000000000000000000000000006064820152608401610388565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610a0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2e91906113d3565b60015460025460405163b356003960e01b81523060048201529293506001600160a01b039182169263865ed32a928592169063b356003990602401602060405180830381865afa158015610a86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aaa91906113d3565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152600e60a48301527f557067726164654361706974616c00000000000000000000000000000000000060c48301526044820152606481018590526001608482015260e401600060405180830381600087803b158015610b2a57600080fd5b505af1158015610b3e573d6000803e3d6000fd5b505060015460025460405163b356003960e01b81523060048201526001600160a01b03928316945063865ed32a935085929091169063b356003990602401602060405180830381865afa158015610b99573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbd91906113d3565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152601b60a48301527f486172766573745265736f757263657346726f6d4361706974616c000000000060c48301526044820152606481018590526001608482015260e401600060405180830381600087803b158015610c3d57600080fd5b505af1158015610c51573d6000803e3d6000fd5b50506001546040517f32eebf76000000000000000000000000000000000000000000000000000000008152600481018690526001600160a01b0390911692506332eebf769150602401600060405180830381600087803b158015610cb457600080fd5b505af1158015610cc8573d6000803e3d6000fd5b505060015460025460405163b356003960e01b81523060048201526001600160a01b03928316945063865ed32a935085929091169063b356003990602401602060405180830381865afa158015610d23573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4791906113d3565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152600e60a48301527f557067726164654361706974616c00000000000000000000000000000000000060c48301526044820152606481018590526000608482015260e401600060405180830381600087803b158015610dc757600080fd5b505af1158015610ddb573d6000803e3d6000fd5b505060015460025460405163b356003960e01b81523060048201526001600160a01b03928316945063865ed32a935085929091169063b356003990602401602060405180830381865afa158015610e36573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5a91906113d3565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152601b60a48301527f486172766573745265736f757263657346726f6d4361706974616c000000000060c48301526044820152606481018590526000608482015260e401600060405180830381600087803b158015610eda57600080fd5b505af1158015610eee573d6000803e3d6000fd5b505050505050565b610f386040518060400160405280601481526020017f44656c656761746547616d6546756e6374696f6e000000000000000000000000815250600060016106c1565b610472611072565b60008082806020019051810190610f5791906114ea565b509050808403610f6b576000915050610395565b610f758484610331565b949350505050565b600580546103a890611399565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610fd3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ff791906113d3565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561105757600080fd5b505af115801561106b573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156110bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110df91906113d3565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015611144573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061116891906113d3565b5050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156111ab576111ab61116c565b604052919050565b600067ffffffffffffffff8211156111cd576111cd61116c565b50601f01601f191660200190565b60006111ee6111e9846111b3565b611182565b905082815283838301111561120257600080fd5b828260208301376000602084830101529392505050565b6000806040838503121561122c57600080fd5b82359150602083013567ffffffffffffffff81111561124a57600080fd5b8301601f8101851361125b57600080fd5b61126a858235602084016111db565b9150509250929050565b60005b8381101561128f578181015183820152602001611277565b8381111561129e576000848401525b50505050565b600081518084526112bc816020860160208601611274565b601f01601f19169290920160200192915050565b6020815260006112e360208301846112a4565b9392505050565b600080604083850312156112fd57600080fd5b50508035926020909101359150565b60008060006060848603121561132157600080fd5b833567ffffffffffffffff81111561133857600080fd5b8401601f8101861361134957600080fd5b611358868235602084016111db565b935050602084013591506040840135801515811461137557600080fd5b809150509250925092565b60006020828403121561139257600080fd5b5035919050565b600181811c908216806113ad57607f821691505b6020821081036113cd57634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156113e557600080fd5b5051919050565b6000602082840312156113fe57600080fd5b81516001600160a01b03811681146112e357600080fd5b60006020828403121561142757600080fd5b815167ffffffffffffffff81111561143e57600080fd5b8201601f8101841361144f57600080fd5b805161145d6111e9826111b3565b81815285602083850101111561147257600080fd5b611483826020830160208601611274565b95945050505050565b600082198211156114ad57634e487b7160e01b600052601160045260246000fd5b500190565b85815260a0602082015260006114cb60a08301876112a4565b6040830195909552506060810192909252151560809091015292915050565b600080604083850312156114fd57600080fd5b50508051602090910151909290915056fea2646970667358221220f72c586f0d42fd8d55e2aaa7fe99b2bbb4ce9a2947bd88ddde70d98b48cd26fa64736f6c634300080d0033";

type TestTreatyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestTreatyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestTreaty__factory extends ContractFactory {
  constructor(...args: TestTreatyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestTreaty> {
    return super.deploy(_diamond, overrides || {}) as Promise<TestTreaty>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): TestTreaty {
    return super.attach(address) as TestTreaty;
  }
  override connect(signer: Signer): TestTreaty__factory {
    return super.connect(signer) as TestTreaty__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestTreatyInterface {
    return new utils.Interface(_abi) as TestTreatyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestTreaty {
    return new Contract(address, _abi, signerOrProvider) as TestTreaty;
  }
}
