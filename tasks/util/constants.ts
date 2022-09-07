import { CompType } from './types/index';
import { WorldConstantsStruct } from './../../typechain-types/Curio';
import { MapInput, RenderInput, TROOP_NAME, ComponentDataTypes } from './types';

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

export const COMPONENT_SPECS: CompType[] = [
  // General syste
  { name: 'IsComponent', valueType: ComponentDataTypes.BOOL },
  { name: 'InitTimestamp', valueType: ComponentDataTypes.UINT },
  { name: 'IsActive', valueType: ComponentDataTypes.BOOL },
  { name: 'Position', valueType: ComponentDataTypes.POSITION },
  { name: 'OwnerEntity', valueType: ComponentDataTypes.UINT },
  // Identifier system
  { name: 'Name', valueType: ComponentDataTypes.STRING },
  { name: 'Tag', valueType: ComponentDataTypes.STRING },
  { name: 'CanMove', valueType: ComponentDataTypes.BOOL },
  { name: 'CanAttack', valueType: ComponentDataTypes.BOOL },
  { name: 'CanCapture', valueType: ComponentDataTypes.BOOL },
  { name: 'CanPurchase', valueType: ComponentDataTypes.BOOL },
  // Resource system
  { name: 'Gold', valueType: ComponentDataTypes.UINT },
  { name: 'GoldPerSecond', valueType: ComponentDataTypes.INT },
  { name: 'Oil', valueType: ComponentDataTypes.UINT },
  { name: 'OilPerSecond', valueType: ComponentDataTypes.INT },
  { name: 'BalanceLastUpdated', valueType: ComponentDataTypes.UINT },
  // Battle system
  { name: 'Health', valueType: ComponentDataTypes.UINT },
  { name: 'LastMoved', valueType: ComponentDataTypes.UINT },
  { name: 'LastLargeActionTaken', valueType: ComponentDataTypes.UINT },
  { name: 'LastRepaired', valueType: ComponentDataTypes.UINT },
  { name: 'CanMoveOnLand', valueType: ComponentDataTypes.BOOL },
  { name: 'MaxHealth', valueType: ComponentDataTypes.UINT },
  { name: 'DamagePerHit', valueType: ComponentDataTypes.UINT },
  { name: 'AttackFactor', valueType: ComponentDataTypes.UINT },
  { name: 'DefenseFactor', valueType: ComponentDataTypes.UINT },
  { name: 'MovementCooldown', valueType: ComponentDataTypes.UINT },
  { name: 'LargeActionCooldown', valueType: ComponentDataTypes.UINT },
  { name: 'ArmyEntity', valueType: ComponentDataTypes.UINT },
  { name: 'IsDebuffed', valueType: ComponentDataTypes.BOOL },
  { name: 'IsArmy', valueType: ComponentDataTypes.BOOL },
];
