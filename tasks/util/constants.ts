import { ComponentSpecStruct, ComponentSpecStructOutput, WorldConstantsStruct } from './../../typechain-types/Curio';
import { MapInput, RenderInput, TROOP_NAME, VALUE_TYPE } from './types';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// GAME CONSTANTS
// ----------------------------------------------------------

export const SMALL_MAP_INPUT: MapInput = {
  width: 50,
  height: 50,
  numPorts: 10,
  numCities: 30,
  numOilWells: 15,
};

export const LARGE_MAP_INPUT: MapInput = {
  width: 100,
  height: 100,
  numPorts: 40,
  numCities: 120,
  numOilWells: 60,
};

export const SANDBOX_MAP_INPUT: MapInput = {
  width: 150,
  height: 150,
  numPorts: 150,
  numCities: 150,
  numOilWells: 120,
};

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): WorldConstantsStruct => {
  return {
    admin: adminAddr,
    worldWidth: mapInput.width,
    worldHeight: mapInput.height,
    combatEfficiency: 50,
    numInitTerrainTypes: 6,
    initBatchSize: 50,
    initPlayerGoldBalance: mapInput.numPorts > 20 ? 2000 : 1000,
    initPlayerOilBalance: 0,
    maxBaseCountPerPlayer: 200,
    maxTroopCountPerPlayer: 100000,
    maxPlayerCount: mapInput.numPorts,
    defaultBaseGoldGenerationPerSecond: 1,
    defaultWellOilGenerationPerSecond: 5,
    debuffFactor: 80,
  };
};

export const TAGS = ['Port', 'City', 'Oil Well', 'Infantry', 'Destroyer', 'Cruiser', 'Battleship', 'Army', 'Player'];

export const TROOP_TYPES = [
  {
    name: TROOP_NAME.INFANTRY,
    maxHealth: 200,
    damagePerHit: 100,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 5,
    largeActionCooldown: 0,
    goldPrice: 400,
    oilConsumptionPerSecond: 0,
  },
  {
    name: TROOP_NAME.DESTROYER,
    maxHealth: 800,
    damagePerHit: 700,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 2,
    largeActionCooldown: 0,
    goldPrice: 800,
    oilConsumptionPerSecond: 2,
  },
  {
    name: TROOP_NAME.CRUISER,
    maxHealth: 1500,
    damagePerHit: 1000,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 2,
    largeActionCooldown: 0,
    goldPrice: 1360,
    oilConsumptionPerSecond: 5,
  },
  {
    name: TROOP_NAME.BATTLESHIP,
    maxHealth: 5500,
    damagePerHit: 3500,
    attackFactor: 100,
    defenseFactor: 100,
    movementCooldown: 2,
    largeActionCooldown: 0,
    goldPrice: 4800,
    oilConsumptionPerSecond: 20,
  },
];

// ----------------------------------------------------------
// RENDERING CONSTANTS
// ----------------------------------------------------------

export const RENDER_CONSTANTS: RenderInput = {
  sizeFactor: 30,
  numLandColors: 5,
  numWaterColors: 2,
  waterNoiseCutoff: 0.45,
  colorLowestPercent: 40,
  plateSizeMultiplier: 6,
  superpositionRatio: [0.6, 0.4],
};

// ------------------------------------------------
// FUNCTIONS
// ------------------------------------------------

export const getTroopNames = (): string[] => {
  return Object.keys(TROOP_NAME).filter((item) => isNaN(Number(item)));
};

export const COMPONENT_SPECS: ComponentSpecStruct[] = [];

// General system
COMPONENT_SPECS.push({ name: 'IsComponent', valueType: VALUE_TYPE.BOOL }); // this must be the first (or zero-th, however you name it) component!
COMPONENT_SPECS.push({ name: 'InitTimestamp', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'IsActive', valueType: VALUE_TYPE.BOOL });
COMPONENT_SPECS.push({ name: 'Position', valueType: VALUE_TYPE.POSITION });
COMPONENT_SPECS.push({ name: 'OwnerEntity', valueType: VALUE_TYPE.UINT });

// Identifier system
COMPONENT_SPECS.push({ name: 'Name', valueType: VALUE_TYPE.STRING });
COMPONENT_SPECS.push({ name: 'Tag', valueType: VALUE_TYPE.STRING }); // most direct tag for frontend
COMPONENT_SPECS.push({ name: 'CanMove', valueType: VALUE_TYPE.BOOL }); // differentiator for troops
COMPONENT_SPECS.push({ name: 'CanAttack', valueType: VALUE_TYPE.BOOL });
COMPONENT_SPECS.push({ name: 'CanCapture', valueType: VALUE_TYPE.BOOL });
COMPONENT_SPECS.push({ name: 'CanPurchase', valueType: VALUE_TYPE.BOOL }); // differentiator for bases

// Resource system
COMPONENT_SPECS.push({ name: 'Gold', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'GoldPerSecond', valueType: VALUE_TYPE.INT });
COMPONENT_SPECS.push({ name: 'Oil', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'OilPerSecond', valueType: VALUE_TYPE.INT });
COMPONENT_SPECS.push({ name: 'BalanceLastUpdated', valueType: VALUE_TYPE.UINT });

// Battle system
COMPONENT_SPECS.push({ name: 'Health', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'LastMoved', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'LastLargeActionTaken', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'LastRepaired', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'CanMoveOnLand', valueType: VALUE_TYPE.BOOL });
COMPONENT_SPECS.push({ name: 'MaxHealth', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'DamagePerHit', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'AttackFactor', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'DefenseFactor', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'MovementCooldown', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'LargeActionCooldown', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'ArmyEntity', valueType: VALUE_TYPE.UINT });
COMPONENT_SPECS.push({ name: 'IsDebuffed', valueType: VALUE_TYPE.BOOL });
COMPONENT_SPECS.push({ name: 'IsArmy', valueType: VALUE_TYPE.BOOL }); // differentiator for armies
