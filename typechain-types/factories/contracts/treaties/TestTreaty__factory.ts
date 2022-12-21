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
  "0x60806040523480156200001157600080fd5b50604051620013ab380380620013ab8339810160408190526200003491620001fa565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280548316821790556003805490921617905560408051808201909152600b8082526a546573742054726561747960a81b6020909201918252620001109160049162000154565b506040805180820190915260128082527154726561747920666f722074657374696e6760701b60209092019182526200014c9160059162000154565b505062000268565b82805462000162906200022c565b90600052602060002090601f016020900481019282620001865760008555620001d1565b82601f10620001a157805160ff1916838001178555620001d1565b82800160010185558215620001d1579182015b82811115620001d1578251825591602001919060010190620001b4565b50620001df929150620001e3565b5090565b5b80821115620001df5760008155600101620001e4565b6000602082840312156200020d57600080fd5b81516001600160a01b03811681146200022557600080fd5b9392505050565b600181811c908216806200024157607f821691505b6020821081036200026257634e487b7160e01b600052602260045260246000fd5b50919050565b61113380620002786000396000f3fe608060405234801561001057600080fd5b50600436106101e45760003560e01c806360acfcc61161010f578063cbb34e86116100a2578063f0b7db4e11610071578063f0b7db4e146102b7578063f2e1730b146101e9578063f851a440146102ca578063fa91f75e146101e957600080fd5b8063cbb34e86146101e9578063e534ae5f146101e9578063e75991fa146101e9578063ec19ae80146101e957600080fd5b80639bcecd0b116100de5780639bcecd0b146101e9578063a83280bc146101e9578063c009a6cb146101e9578063c3fe3e28146102a457600080fd5b806360acfcc61461025e5780636a2a2b4e146101e95780637284e41614610271578063993a04b71461027957600080fd5b80632d47fe27116101875780634142a8a1116101565780634142a8a11461024357806347b958a6146102565780634ad30a91146101e95780635f310b12146101e957600080fd5b80632d47fe27146101e95780632efd66291461023057806337415516146101e957806339ebfad4146101e957600080fd5b80631c357173116101c35780631c357173146101e9578063243086c4146101e957806328f59b83146102265780632b451c64146101e957600080fd5b8062048f5a146101e957806304dc7c74146101e957806306fdde0314610211575b600080fd5b6101fc6101f7366004610f06565b6102dd565b60405190151581526020015b60405180910390f35b610219610347565b6040516102089190610fae565b61022e6103d5565b005b61022e61023e366004610fc8565b610420565b61022e61025136600461103c565b610515565b61022e610c04565b6101fc61026c366004610f06565b610c4e565b610219610c8b565b60025461028c906001600160a01b031681565b6040516001600160a01b039091168152602001610208565b60015461028c906001600160a01b031681565b60005461028c906001600160a01b031681565b60035461028c906001600160a01b031681565b600080546001600160a01b0316331461033d5760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6004805461035490611055565b80601f016020809104026020016040519081016040528092919081815260200182805461038090611055565b80156103cd5780601f106103a2576101008083540402835291602001916103cd565b820191906000526020600020905b8154815290600101906020018083116103b057829003601f168201915b505050505081565b6104166040518060400160405280601481526020017f44656c656761746547616d6546756e6374696f6e000000000000000000000000815250600080610420565b61041e610c98565b565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610469573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048d919061108f565b6003546040517f66e39e790000000000000000000000000000000000000000000000000000000081529192506001600160a01b0316906366e39e79906104dd9084908890889088906004016110a8565b600060405180830381600087803b1580156104f757600080fd5b505af115801561050b573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526001600160a01b039091169063688513b290829063b356003990602401602060405180830381865afa158015610565573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610589919061108f565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa1580156105d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f5919061108f565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401602060405180830381865afa158015610636573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065a919061108f565b6000036106cf5760405162461bcd60e51b815260206004820152602160248201527f437572696f5472656174793a204f6e6c79207369676e65722063616e2063616c60448201527f6c000000000000000000000000000000000000000000000000000000000000006064820152608401610334565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610718573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061073c919061108f565b60015460025460405163b356003960e01b81523060048201529293506001600160a01b039182169263865ed32a928592169063b356003990602401602060405180830381865afa158015610794573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b8919061108f565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152600e60a48301527f557067726164654361706974616c00000000000000000000000000000000000060c48301526044820152606481018590526001608482015260e401600060405180830381600087803b15801561083857600080fd5b505af115801561084c573d6000803e3d6000fd5b505060015460025460405163b356003960e01b81523060048201526001600160a01b03928316945063865ed32a935085929091169063b356003990602401602060405180830381865afa1580156108a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108cb919061108f565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152601b60a48301527f486172766573745265736f757263657346726f6d4361706974616c000000000060c48301526044820152606481018590526001608482015260e401600060405180830381600087803b15801561094b57600080fd5b505af115801561095f573d6000803e3d6000fd5b50506001546040517f32eebf76000000000000000000000000000000000000000000000000000000008152600481018690526001600160a01b0390911692506332eebf769150602401600060405180830381600087803b1580156109c257600080fd5b505af11580156109d6573d6000803e3d6000fd5b505060015460025460405163b356003960e01b81523060048201526001600160a01b03928316945063865ed32a935085929091169063b356003990602401602060405180830381865afa158015610a31573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a55919061108f565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152600e60a48301527f557067726164654361706974616c00000000000000000000000000000000000060c48301526044820152606481018590526000608482015260e401600060405180830381600087803b158015610ad557600080fd5b505af1158015610ae9573d6000803e3d6000fd5b505060015460025460405163b356003960e01b81523060048201526001600160a01b03928316945063865ed32a935085929091169063b356003990602401602060405180830381865afa158015610b44573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b68919061108f565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152601b60a48301527f486172766573745265736f757263657346726f6d4361706974616c000000000060c48301526044820152606481018590526000608482015260e401600060405180830381600087803b158015610be857600080fd5b505af1158015610bfc573d6000803e3d6000fd5b505050505050565b610c466040518060400160405280601481526020017f44656c656761746547616d6546756e6374696f6e00000000000000000000000081525060006001610420565b61041e610d80565b60008082806020019051810190610c6591906110d9565b509050808403610c79576000915050610341565b610c8384846102dd565b949350505050565b6005805461035490611055565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610ce1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d05919061108f565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b158015610d6557600080fd5b505af1158015610d79573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610dc9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ded919061108f565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015610e52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e76919061108f565b5050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115610eab57610eab610e7a565b604051601f8501601f19908116603f01168101908282118183101715610ed357610ed3610e7a565b81604052809350858152868686011115610eec57600080fd5b858560208301376000602087830101525050509392505050565b60008060408385031215610f1957600080fd5b82359150602083013567ffffffffffffffff811115610f3757600080fd5b8301601f81018513610f4857600080fd5b610f5785823560208401610e90565b9150509250929050565b6000815180845260005b81811015610f8757602081850181015186830182015201610f6b565b81811115610f99576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610fc16020830184610f61565b9392505050565b600080600060608486031215610fdd57600080fd5b833567ffffffffffffffff811115610ff457600080fd5b8401601f8101861361100557600080fd5b61101486823560208401610e90565b935050602084013591506040840135801515811461103157600080fd5b809150509250925092565b60006020828403121561104e57600080fd5b5035919050565b600181811c9082168061106957607f821691505b60208210810361108957634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156110a157600080fd5b5051919050565b8481526080602082015260006110c16080830186610f61565b60408301949094525090151560609091015292915050565b600080604083850312156110ec57600080fd5b50508051602090910151909290915056fea2646970667358221220d5692c5bc76a09bde4b6ef718cd9a278bfe9eb7362f743d4d43c7e41a19ea5f264736f6c634300080d0033";

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
