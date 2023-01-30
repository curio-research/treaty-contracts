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
export const INNER_REGION_RADIUS_BY_TILE_COUNT = 9;
export const NUM_INIT_TERRAIN_TYPES = Math.floor((Object.keys(TILE_TYPE).length + 1) / 2);

export const MAP_INPUT: MapInput = {
  width: 51,
  height: 51,
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
    innerRadiusByTileCount: mapInput.innerRadiusByTileCount ?? 0,
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
    treatyJoin: 'Pay for the fund membership and be granted protection. View the membership fee by clicking on "Food Fee" and "Gold Fee".',
    treatyLeave: 'Leave the fund and lose protection. Once you leave, you will have to be whitelisted again to join the fund.',
    payMembershipFee: 'Pay the membership fee to keep your membership active. You have to pay it regularly (see time depositTimeInterval) or you might be removed from the fund.',
    addToWhiteList: 'Add a nation to the whitelist.',
    removeFromWhiteList: 'Remove a nation from the whitelist.',
    addToCouncil: 'Add a nation to the council that can manage the fund with you.',
    removeFromCouncil: 'Remove a nation from the council.',
    updateFoodFee: 'Update the food fee.',
    updateGoldFee: 'Update the gold fee.',
    removeMember: 'Remove a member from the fund.',
    withDraw: 'Withdraw from the funds. Look up goldWithdrawQuota and foodWithdrawQuota to see how much you can withdraw.',
    removeAllOverdueMembers: 'Remove all overdue members who have not paid their membership fee.',
    distributeFund: 'Distribute the fund (collected by fees) to a certain entity.',
  },
  Embargo: {
    headerImage: 'https://spectrum.ieee.org/media-library/photo-of-the-emma-maersk-cargo-ship.jpg?id=25585784&width=2400&height=1800',
    treatyLeave: 'Leave the embargo treaty.',
    treatyJoin: 'Join the embargo treaty.',
    addToSanctionList: 'Add a nation to the sanction list, so members canont trade with it.',
    removeFromSanctionList: 'Remove a nation from the sanction list.',
    removeMember: 'Remove a nation from the Embargo treaty.',
  },
  NonAggressionPact: {
    headerImage: 'https://www.sicot.org/sites/default/files/images/About_SICOT/friendshipnations.png',
    treatyLeave: 'Leave the NonAggressionPact treaty.',
    treatyJoin: 'Join the NonAggressionPact treaty.',
    setEffectiveDuration: 'Set how long should a nation stays in the treaty before he can leave.',
    addToWhiteList: 'Add a nation to the whitelist.',
    removeFromWhiteList: 'Remove a nation from the whitelist.',
    removeMember: 'Remove a nation from the NonAggressionPact treaty.',
  },
  MercenaryLeague: {
    headerImage: 'https://lieber.westpoint.edu/wp-content/uploads/2020/12/wagner-russian-PMCs.jpg',
    treatyLeave: 'Leave the MercenaryLeague treaty.',
    treatyJoin: 'Join the MercenaryLeague treaty.',
    addToWarCouncil: 'Add a nation to the war council that can conscript armies from member nations.',
    removeFromWarCouncil: 'Remove a nation from the war council so it can no longer conscript armies from member nations.',
    setConsciptionDuration: 'Set the conscription duration. Once the duration passes, the armies can be revoked by the member nation',
    conscriptArmies: 'Conscript armies from member nations for a period of time at a certain cost. Learn about the price in memberToConscriptionFee',
    revokeArmies: 'Revoke armies from the war council once the conscription duration passes. Learn about duration in conscriptionDuration',
    setConscriptionFee: 'Set the conscription fee for your armies. When the war council conscripts armies from a member nation, they will have to pay this fee.',
  },
  SimpleOTC: {
    headerImage: 'https://media.istockphoto.com/id/102337872/photo/fist-full-of-dollars.jpg?s=612x612&w=is&k=20&c=KGmergh_vCGsh22oUJ3epWSun0dAyBX-ekDRc6anPE4=',
    treatyLeave: 'Leave the SimpleOTC treaty.',
    treatyJoin: 'Join the SimpleOTC treaty.',
    createOrder: 'Create an order of how much token you want to sell in return for another token type.',
    cancelOrder: 'Cancel your last order.',
    takeOrder: 'Take an order from the creator.',
  },
  HandshakeDeal: {
    headerImage: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/02/21/11/trump-handshake-1.jpg?quality=75&width=990&auto=webp&crop=982:726,smart',
    treatyLeave: 'Leave the HandshakeDeal treaty.',
    treatyJoin: 'Join the HandshakeDeal treaty.',
    proposeDeal1: 'Propose a deal to another nation. Agreement will be mutual. Note that the valid deal types are "approveUpgradeCapital", "approveUpgradeTile", "approveRecoverTile", "approveDisownTile", "approveEndGather", "approveUnloadResources", "approveHarvestResource", "approveHarvestResourcesFromCapital", "approveUpgradeResource". _uint256Param stands for the capitalID, tileID, or resourceID.',
    proposeDeal2: 'Propose a deal to another nation. Agreement will be mutual. Note that the valid deal types are "approveStartTroopProduction", "approveStartGather", "approveHarvestResource", "approveBattle". Check out what _uint256Param1 and _uint256Param2 stand for in our opensourced codebase.',
    proposeDeal3: 'Propose a deal to another nation. Agreement will be mutual. Note that the valid deal types are "approveMoveCapital", "approveClaimTile", and "approveMove". _uint256Param stands for capitalID, tileID, or armyID. x_pos and y_pos inputs the position for the function.',
    signDeal: 'Sign a deal that you have been proposed. Find the deal in nationIDToDealIDs and read it using idToDeal',
  },
  LoanAgreement: {
    headerImage: 'https://cdn.shopify.com/s/files/1/0572/0847/1751/products/image_7a02ee3a-fc12-40c4-9298-16dbd4c36266.png?v=1659290557&width=1100',
    treatyLeave: 'Leave the HandshakeDeal treaty.',
    treatyJoin: 'Join the HandshakeDeal treaty.',
    getLenderLoanIDs: 'Get the list of loan IDs that a nation has lended. Read loan info in loanIDToLoan',
    getBorrowerLoanIDs: 'Get the list of loan IDs that a nation has borrowed. Read loan info in loanIDToLoan',
    createLoan: 'Create a loan. The tokens will be automatically transfered to the borrower once it is borrowed.',
    cancelLoan: 'Cancel a loan. Loan owner can cancel the loan before or after the loan is effective. If the owner cancels it before it is effective, the loan can no longer be borrowed. If the owner cancels it after it is effective, the borrower can no longer repay the loan.',
    takeLoan: 'Take a loan by typing in the loanID. Look up loan info in loanIDToLoan beforehand',
    payOffLoan: 'Pay off principle and interest of the loan. The borrower will get the collateral back.',
    liquidateCollateral: 'Liquidate the collateral of a loan if the borrower defaults. The collateral will be transfered to the lender.',
  }
};
