import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { InventoryTypeOptions, TILE_TYPE, GameMode } from 'curio-vault';
import { Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { MapInput } from './types';
import { confirmTx } from './deployHelper';
import worldConstants from '../world_parameters.json';

export const LOCALHOST_RPC_URL = 'http://127.0.0.1:8545/';
export const LOCALHOST_WS_RPC_URL = 'ws://localhost:8545';

// ----------------------------------------------------------
// WORLD CONSTANTS
// ----------------------------------------------------------

export const TILE_WIDTH = 5;
export const INNER_REGION_RADIUS_BY_TILE_COUNT = 3;
export const NUM_INIT_TERRAIN_TYPES = Math.floor((Object.keys(TILE_TYPE).length + 1) / 2);

export const MAP_INPUT: MapInput = {
  width: 17,
  height: 17,
  innerRadiusByTileCount: INNER_REGION_RADIUS_BY_TILE_COUNT,
};

export const TEST_MAP_INPUT: MapInput = {
  width: 250, // restore to 1000 if increasing player count
  height: 2,
};

export const generateWorldConstants = (adminAddr: string, mapInput: MapInput): any => {
  return {
    // admin info
    admin: adminAddr,
    // map info
    tileWidth: TILE_WIDTH,
    worldWidth: mapInput.width * TILE_WIDTH,
    worldHeight: mapInput.height * TILE_WIDTH,
    numInitTerrainTypes: NUM_INIT_TERRAIN_TYPES,
    // manual configs
    maxNationCount: 1000,
    gameMode: GameMode.BATTLE_ROYALE,
    gameLengthInSeconds: 2000000000,
    // generated constants
    ...worldConstants,
  };
};

// ----------------------------------------------------------
// TEMPLATES
// ----------------------------------------------------------

/**
 * @dev Initialize 5 battle templates and 1 resource template
 * @param diamond diamond address
 */
export const createTemplates = async (diamond: Curio, tokenAddrs: string[], gasLimit: number, hre: HardhatRuntimeEnvironment) => {
  const templateNames: string[] = [];
  const templateIDs: number[] = [];
  const tokenAddrIter = tokenAddrs[Symbol.iterator]();

  let entity = Number(await diamond.getEntity()) + 1;

  // Gold
  await confirmTx(await diamond.addResourceTemplate(tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Gold);
  templateIDs.push(entity++);

  // Food
  await confirmTx(await diamond.addResourceTemplate(tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Food);
  templateIDs.push(entity++);

  // Horseman
  await confirmTx(await diamond.addTroopTemplate(120, 60, 120, 95, tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Horseman);
  templateIDs.push(entity++);

  // Warrior
  await confirmTx(await diamond.addTroopTemplate(120, 60, 120, 95, tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Warrior);
  templateIDs.push(entity++);

  // Slinger
  await confirmTx(await diamond.addTroopTemplate(120, 60, 120, 95, tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Slinger);
  templateIDs.push(entity++);

  // Guard
  await confirmTx(await diamond.addTroopTemplate(220, 100, 220, 0, tokenAddrIter.next().value, { gasLimit }), hre);
  templateNames.push(InventoryTypeOptions.Guard);
  templateIDs.push(entity++);

  // Register template names used for shortcuts
  await confirmTx(await diamond.registerTemplateShortcuts(templateNames, templateIDs, { gasLimit }), hre);
};

// ------------------------------
// Treaty Description
// declare metadata to help users understand the meaning of each treaty function
// ------------------------------

export const treatyDescriptions: Record<string, Record<string, string>> = {
  Alliance: {
    headerImage: 'https://www.militarytimes.com/resizer/RhWHiePxZUim5AvA2jEFR6zExdM=/arc-photo-archetype/arc3-prod/public/M3G7VLLKZ5F7DKNTREOSANBWIE.jpg',
    treatyJoin: 'Pay 1000 gold tokens to join the alliance and be granted protection.',
    treatyLeave: 'Leave the alliance and lose protection.',
    getTreatySigners: 'Get the list of treaty signers.',
    treatyBesiege: 'Battle a target army belonging to a non-ally nation with all nearby ally armies.',
  },
  CollectiveDefenseFund: {
    headerImage: 'https://ik.imagekit.io/po8th4g4eqj/prod/tr:w-1168/nato-flags-1168x440.jpg',
    getCouncilMembers: 'Get the list of council members.',
    getTreatySigners: 'Get the list of treaty signers.',
    treatyJoin: 'Pay for the fund membership and be granted protection.',
    treatyLeave: 'Leave the fund and lose protection.',
    payMembershipFee: 'Pay the membership fee to keep your membership active.',
    addToWhiteList: 'Add a nation to the whitelist.',
    removeFromWhiteList: 'Remove a nation from the whitelist.',
    addToCouncil: 'Add a nation to the council that can manage the fund with you.',
    removeFromCouncil: 'Remove a nation from the council.',
    updateFoodFee: 'Update the food fee.',
    updateGoldFee: 'Update the gold fee.',
    removeMember: 'Remove a member from the fund.',
    withDraw: 'Withdraw from the funds.',
    removeAllOverdueMembers: 'Remove all overdue members who have not paid their membership fee.',
    distributeFund: 'Distribute the fund to a certain entity.',
  },
  Embargo: {
    headerImage: 'https://spectrum.ieee.org/media-library/photo-of-the-emma-maersk-cargo-ship.jpg?id=25585784&width=2400&height=1800',
    treatyLeave: 'Leave the embargo treaty.',
    treatyJoin: 'Join the embargo treaty.',
    getTreatySigners: 'Get the list of treaty signers.',
    addToSanctionList: 'Add a nation to the sanction list, so members canont trade with it.',
    removeFromSanctionList: 'Remove a nation from the sanction list.',
    removeMember: 'Remove a nation from the Embargo treaty.',
  },
  NonAggressionPact: {
    treatyLeave: 'Leave the NonAggressionPact treaty.',
    treatyJoin: 'Join the NonAggressionPact treaty.',
    getTreatySigners: 'Get the list of treaty signers.',
    addToWhiteList: 'Add a nation to the whitelist.',
    removeFromWhiteList: 'Remove a nation from the whitelist.',
    removeMember: 'Remove a nation from the NonAggressionPact treaty.',
  },
  MercenaryLeague: {
    treatyLeave: 'Leave the MercenaryLeague treaty.',
    treatyJoin: 'Join the MercenaryLeague treaty.',
    getTreatySigners: 'Get the list of treaty signers.',
    addToWarCouncil: 'Add a nation to the war council that can conscript armies from member nations.',
    removeFromWarCouncil: 'Remove a nation from the war council.',
    setConsciptionDuration: 'Set the conscription duration.',
    conscriptArmies: 'Conscript armies from member nations for a period of time at a certain cost.',
    revokeArmies: 'Revoke armies from the war council once the conscription duration passes.',
    setConscriptionFee: 'Set the conscription fee for your armies.',
  },
  SimpleOTC: {
    treatyLeave: 'Leave the SimpleOTC treaty.',
    treatyJoin: 'Join the SimpleOTC treaty.',
    getTreatySigners: 'Get the list of treaty signers.',
    createOrder: 'Create an order of how much token you want to sell in return for another token type.',
    cancelOrder: 'Cancel your last order.',
    takeOrder: 'Take an order from the creator.',
  },
  HandshakeDeal: {
    treatyLeave: 'Leave the HandshakeDeal treaty.',
    treatyJoin: 'Join the HandshakeDeal treaty.',
    getTreatySigners: 'Get the list of treaty signers.',
    proposeDeal1: 'Propose a deal to another nation. Note that the valid deal types are "approveUpgradeCapital", "approveUpgradeTile", "approveRecoverTile", "approveDisownTile", "approveEndGather", "approveUnloadResources", "approveHarvestResource", "approveHarvestResourcesFromCapital", "approveUpgradeResource". _uint256Param stands for the capitalID, tileID, or resourceID.',
    proposeDeal2: 'Propose a deal to another nation. Note that the valid deal types are "approveStartTroopProduction", "approveStartGather", "approveHarvestResource", "approveBattle". Check out what _uint256Param1 and _uint256Param2 stand for in our opensourced codebase.',
    proposeDeal3: 'Propose a deal to another nation. Note that the valid deal types are "approveMoveCapital", "approveClaimTile", and "approveMove". _uint256Param stands for capitalID, tileID, or armyID. x_pos and y_pos inputs the position for the function.',
  },
};
