/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Curio, CurioInterface } from "../../hardhat-diamond-abi/Curio";

const _abi = [
  {
    inputs: [],
    name: "addEntity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position[]",
        name: "_positions",
        type: "tuple[]",
      },
    ],
    name: "bulkInitializeTiles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "reactivatePlayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gameAddr",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "enum VALUE_TYPE",
            name: "valueType",
            type: "uint8",
          },
        ],
        internalType: "struct ComponentSpec[]",
        name: "_componentSpecs",
        type: "tuple[]",
      },
    ],
    name: "registerComponents",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gameAddr",
        type: "address",
      },
    ],
    name: "registerDefaultComponents",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "removeEntity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "setComponentValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[][]",
        name: "_colBatches",
        type: "uint256[][]",
      },
    ],
    name: "storeEncodedColumnBatches",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        indexed: false,
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "DiamondCut",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "diamondCut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_functionSelector",
        type: "bytes4",
      },
    ],
    name: "facetAddress",
    outputs: [
      {
        internalType: "address",
        name: "facetAddress_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "facetAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "facetAddresses_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_facet",
        type: "address",
      },
    ],
    name: "facetFunctionSelectors",
    outputs: [
      {
        internalType: "bytes4[]",
        name: "_facetFunctionSelectors",
        type: "bytes4[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "facets",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondLoupe.Facet[]",
        name: "facets_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
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
    inputs: [
      {
        internalType: "address",
        name: "_treatyToDenounce",
        type: "address",
      },
    ],
    name: "denounceTreaty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_armyID",
        type: "uint256",
      },
    ],
    name: "disbandArmy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_armyID",
        type: "uint256",
      },
    ],
    name: "endGather",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_buildingID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_productionID",
        type: "uint256",
      },
    ],
    name: "endTroopProduction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_settlerID",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position[]",
        name: "_tiles",
        type: "tuple[]",
      },
      {
        internalType: "string",
        name: "_cityName",
        type: "string",
      },
    ],
    name: "foundCity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_buildingID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_templateID",
        type: "uint256",
      },
    ],
    name: "harvestResource",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_position",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "initializePlayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_position",
        type: "tuple",
      },
    ],
    name: "initializeTile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treatyAddress",
        type: "address",
      },
    ],
    name: "joinTreaty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_armyID",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_targetPosition",
        type: "tuple",
      },
    ],
    name: "moveArmy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_settlerID",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_targetPosition",
        type: "tuple",
      },
    ],
    name: "moveSettler",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cityID",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_templateIDs",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "organizeArmy",
    outputs: [
      {
        internalType: "uint256",
        name: "armyID",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cityID",
        type: "uint256",
      },
    ],
    name: "packCity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_armyID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_targetID",
        type: "uint256",
      },
    ],
    name: "startBattle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_armyID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_resourceID",
        type: "uint256",
      },
    ],
    name: "startGather",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_buildingID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_templateID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "startTroopProduction",
    outputs: [
      {
        internalType: "uint256",
        name: "productionID",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cityID",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position[]",
        name: "_newTiles",
        type: "tuple[]",
      },
    ],
    name: "upgradeCity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_position",
        type: "tuple",
      },
    ],
    name: "getCityAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cityID",
        type: "uint256",
      },
    ],
    name: "getCityCenter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getComponent",
    outputs: [
      {
        internalType: "contract Component",
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
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getComponentById",
    outputs: [
      {
        internalType: "contract Component",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntities",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntitiesAddr",
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
    name: "getEntity",
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
        name: "_cityID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_inventoryType",
        type: "string",
      },
    ],
    name: "getInventoryByCityAndType",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayerCount",
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
        name: "_player",
        type: "address",
      },
    ],
    name: "getPlayerId",
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
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_position",
        type: "tuple",
      },
    ],
    name: "getSettlerAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_inventoryType",
        type: "string",
      },
    ],
    name: "getTemplateByInventoryType",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_inventoryType",
        type: "string",
      },
    ],
    name: "getTemplateId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_pos",
        type: "tuple",
      },
    ],
    name: "getTileAt",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "isInitialized",
            type: "bool",
          },
          {
            internalType: "enum TERRAIN",
            name: "terrain",
            type: "uint8",
          },
        ],
        internalType: "struct Tile",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWorldConstants",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "worldWidth",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "worldHeight",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "numInitTerrainTypes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initBatchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxCityCountPerPlayer",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxArmyCountPerPlayer",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPlayerCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityUpgradeGoldCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxInventoryCapacity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityPackCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initCityGold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityHealth",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityAttack",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityDefense",
            type: "uint256",
          },
        ],
        internalType: "struct WorldConstants",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "isPlayerInitialized",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "owner_",
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
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "ComponentValueRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "ComponentValueSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "EntityRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "NewComponent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "NewEntity",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_arr1",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_arr2",
        type: "uint256[]",
      },
    ],
    name: "_concatenate",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Set",
        name: "set1",
        type: "Set",
      },
      {
        internalType: "contract Set",
        name: "set2",
        type: "Set",
      },
    ],
    name: "_difference",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getAddress",
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "_getAddressComponent",
    outputs: [
      {
        internalType: "contract AddressComponent",
        name: "",
        type: "AddressComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getBool",
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "_getBoolComponent",
    outputs: [
      {
        internalType: "contract BoolComponent",
        name: "",
        type: "BoolComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "_getComponent",
    outputs: [
      {
        internalType: "contract Component",
        name: "",
        type: "Component",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getComponentByEntity",
    outputs: [
      {
        internalType: "contract Component",
        name: "",
        type: "Component",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getComponentValue",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getInt",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "_getIntComponent",
    outputs: [
      {
        internalType: "contract IntComponent",
        name: "",
        type: "IntComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getPosition",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "_getPositionComponent",
    outputs: [
      {
        internalType: "contract PositionComponent",
        name: "",
        type: "PositionComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getString",
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
        name: "_name",
        type: "string",
      },
    ],
    name: "_getStringComponent",
    outputs: [
      {
        internalType: "contract StringComponent",
        name: "",
        type: "StringComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getUint",
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
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getUintArray",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "_getUintArrayComponent",
    outputs: [
      {
        internalType: "contract UintArrayComponent",
        name: "",
        type: "UintArrayComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "_getUintComponent",
    outputs: [
      {
        internalType: "contract UintComponent",
        name: "",
        type: "UintComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum QueryType",
        name: "_queryType",
        type: "QueryType",
      },
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "queryChunk",
    outputs: [
      {
        components: [
          {
            internalType: "enum QueryType",
            name: "queryType",
            type: "QueryType",
          },
          {
            internalType: "bytes",
            name: "value",
            type: "bytes",
          },
          {
            internalType: "string",
            name: "componentName",
            type: "string",
          },
        ],
        internalType: "struct QueryCondition",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

export class Curio__factory {
  static readonly abi = _abi;
  static createInterface(): CurioInterface {
    return new utils.Interface(_abi) as CurioInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Curio {
    return new Contract(address, _abi, signerOrProvider) as Curio;
  }
}
