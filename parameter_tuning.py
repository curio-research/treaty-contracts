import functools
import math
from enum import Enum
from typing import List
import numpy as np

class Resource(Enum):
    GOLD = 0
    FOOD = 1

class Building(Enum):
    GOLDMINE = 0
    FARM = 1
    CITYCENTER = 2

def get_building_resource_cap(level: int, buildingType: Building):
    """
    Growth: Slow Exponential
    Gist: goldCap, foodCap = playerLoginIntervalInMinutes / 60 * buildingHourlyYields
    """
    return Game.player_login_interval_in_minutes / 60 * get_building_hourly_yield_by_level(level, buildingType)

def get_citycenter_tiles_interval() -> int:
    """
    Growth: Constant
    Gist: 9 tiles - avg tiles - max tiles => calculate with (avg - init) / (intervals/2)
    """
    return math.floor(((Game.total_tile_count/Game.expected_player_count) - Game.init_player_tile_count) / (Game.total_city_center_level - 1) / 2)

def get_building_base_hourly_yield(building_type: Building):
    """
    Growth: Constant
    Gist: based upon how much it takes to occupy one tile and one lv1 barbarian, given that the player has only a city center
    """
    total_troop = get_tile_troop_count(1) + get_barbarian_count_by_level(1)
    gold_cost_per_troop = Game.resource_weight_low 
    food_cost_per_troop = Game.resource_weight_heavy
    total_goldcost = total_troop * gold_cost_per_troop
    total_foodcost = total_troop * food_cost_per_troop
    total_seconds = Game.new_player_action_in_seconds * (1 + Game.tile_to_barbarian_strength_ratio)

    base_farm_food_hourly_yield = total_foodcost / total_seconds * 3600 * (Game.resource_weight_heavy/(Game.resource_weight_low + Game.resource_weight_heavy))
    base_gold_food_hourly_yield = total_goldcost / total_seconds * 3600 * (Game.resource_weight_low/(Game.resource_weight_low + Game.resource_weight_heavy))
    
    if building_type == Building.FARM:
        return np.array([0, base_farm_food_hourly_yield])
    elif building_type == Building.GOLDMINE:
        return np.array([base_gold_food_hourly_yield, 0])
    elif building_type == Building.CITYCENTER:
        return np.array([base_gold_food_hourly_yield, base_farm_food_hourly_yield])
    else: 
        return np.array([0, 0])

def get_building_hourly_yield_by_level(level: int, building_type: Building):
    """
    Growth: slow exponential (lower than upgrade cost)
    Gist: growth lower than upgrade cost
    """
    hourly_yield = get_building_base_hourly_yield(building_type)
    gold_base_hourly_yield = hourly_yield[0]
    food_base_hourly_yield = hourly_yield[1]
    gold_hourly_yield = math.floor(((math.e)**(1/5 * level) - 0.9) / 0.321 * gold_base_hourly_yield)
    food_hourly_yield = math.floor(((math.e)**(1/5 * level) - 0.9) / 0.321 * food_base_hourly_yield)
    return np.array([gold_hourly_yield, food_hourly_yield])

def getPvETroopBaseCount() -> int:
    return Game.new_player_action_in_seconds * Game.base_troop_training_in_Seconds

def get_barbarian_count_by_level(level: int) -> int:
    """
    Growth: slow exponential
    Gist: barbarian rewards and costs both increase exponentially, but the latter at a lower rate
    """
    return ((math.e)**(1/7 * level) - 0.9) / 0.254 * getPvETroopBaseCount()

def getBarbarianReward(level: int):
    """
    Growth: fast exponential
    Gist: barbarian rewards and costs both increase exponentially, but the latter at a lower rate
    """
    barbarian_count = get_barbarian_count_by_level(level)
    goldcost_per_troop = Game.resource_weight_low 
    foodcost_per_troop = Game.resource_weight_heavy
    total_goldcost = barbarian_count * goldcost_per_troop
    total_foodcost = barbarian_count * foodcost_per_troop
    # actual reward = base reward * exponential curve (level as x)
    gold_reward = total_goldcost * Game.barbarian_reward_to_cost_coefficient * ((math.e)**(1/5 * level) - 0.9)
    # food burn for troop is heavy while foot mint for barbarians is low
    food_reward = total_foodcost * Game.barbarian_reward_to_cost_coefficient * ((math.e)**(1/5 * level) - 0.9) * (Game.resource_weight_low/Game.resource_weight_heavy)
    return np.array([gold_reward, food_reward])

def get_tile_troop_count(level: int) -> int:
    """
    Growth: slow exponential
    Gist: tile power increases exponentially; for now all tiles are initialized to be lv1
    """
    return ((math.e)**(1/7 * level) - 0.9) / 0.254 * getPvETroopBaseCount() * Game.tile_to_barbarian_strength_ratio

def getTileUpgradeCost(level: int) -> int:
    """
    Growth: slow exponential
    Gist: grow depending on tileTroopCount; applied tileTroop discount => more total discounts if higher level
    """
    goldcost_per_troop = Game.resource_weight_low * Game.tile_troop_discount
    foodcost_per_troop = Game.resource_weight_heavy * Game.tile_troop_discount
    total_goldcost = get_tile_troop_count(level) * goldcost_per_troop
    total_foodcost = get_tile_troop_count(level) * foodcost_per_troop
    return np.array([total_goldcost, total_foodcost])

def get_building_upgrade_cost(level: int, building_type: Building) -> float:
    """
    Growth: fast exponential
    Gist: both building yields and upgrade costs increase exponentially, but the latter at a lower rate
    """
    (gold_hourly_yield, food_hourly_yield) =  get_building_hourly_yield_by_level(level, building_type)
    # the exponential curve makes sure upgrade from lv8 to lv9 has 5.15 hr payback period
    # cost is easy to calculate for goldmine
    goldmine_goldcost = ((math.e)**(1/7 * level) - 0.9) * gold_hourly_yield
    # calculate foodcost based on resource weight
    goldmine_foodcost = goldmine_goldcost/Game.resource_weight_heavy * Game.resource_weight_low
    # taking a leap of faith here; farm doesn't generate gold, so we use its quantity relative to goldmine to calculate
    # assumption is that player spend gold equivalently on two types of building
    farm_goldcost = goldmine_goldcost * Game.init_player_goldmine_count / Game.init_player_farm_count
    # farm food cost if don't consider that part of it goes to troops
    farm_foodcost_raw = ((math.e)**(1/7 * level) - 0.9) * food_hourly_yield
    # consider relative weight of food burn => Build (low), Troop (heavy)
    farm_foodcost = farm_foodcost_raw * Game.resource_weight_low/(Game.resource_weight_heavy + Game.resource_weight_low)
    if building_type == Building.GOLDMINE:
        return np.array([goldmine_goldcost, goldmine_foodcost])
    if building_type == Building.FARM:
        return np.array([farm_goldcost, farm_foodcost])
    if building_type == Building.CITYCENTER:
        ## city center upgrade cost incur additional tax, based upon how many tile it unlocks
        ## tax = (initPlayerGoldMineCount * output + initPlayerFarmCount * output)/9 * getCityCenterTilesInterval * payback period
        (taxGold, taxFood) = (Game.init_player_farm_count * np.array(get_building_base_hourly_yield(Building.GOLDMINE)) \
         + Game.init_player_farm_count * np.array(get_building_base_hourly_yield(Building.FARM)) )/9 * get_citycenter_tiles_interval() \
            * ((math.e)**(1/5 * level) - 0.9)
        return np.array([goldmine_goldcost + farm_goldcost + taxGold, goldmine_foodcost + farm_foodcost + taxFood])

class Game:
    total_tile_count = 1600
    expected_player_count = 10
    init_player_tile_count = 9
    """
    How many tiles does a level 1 city center player has
    """

    init_player_goldmine_count = 2
    """
    How many goldmines avg players have when city center level is 1
    Determined by resource density. Note that one of the goldmine is citycenter
    """

    init_player_farm_count = 7
    """
    How many farms avg players have when city center level is 1
    Determined by resource density. 
    """

    player_login_interval_in_minutes = 10
    """
    mainly determine building cap
    """

    total_city_center_level = 3
    """
    each city center level matches with 3 building levels
    """

    new_player_action_in_seconds = 120
    """
    time for new player to train enough troops to defeat lv1 barbarians
    note: this is already kinda fast, but might still feel slow. If so, we can initialize some resources
    """

    base_troop_training_in_Seconds = 1
    """
    time to train one troop
    """

    barbarian_reward_to_cost_coefficient = 2
    """
    Adjust this number based upon expected player behavior
    """

    tile_to_barbarian_strength_ratio = 5
    """
    Tile & Barbarians are both PvE mechanics. Adjust this number based upon expected player behavior
    """

    tile_troop_discount = 0.2
    """
    Upgrading Tiles should cost less than buying troops
    """

    # Gold:
    #   Mint: Harvest (low), Gather (medium), Barbarians (high)
    #   Burn: Build (heavy), Troop (low)
    # Food:
    #   Mint: Harvest (heavy), Gather (medium), Barbarians (low)
    #   Burn: Build (low), Troop (heavy)

    resource_weight_low = 2
    """
    Mint: Harvest
    Burn: Troop
    """

    resource_weight_medium = 3
    """
    Mint: Gather
    Burn: Null
    """

    resource_weight_high = 4
    """
    Mint: Barbarian
    Burn: Null
    """

    resource_weight_heavy = 8
    """
    Mint: Null
    Burn: Build, Troop
    """
    def __init__(self) -> None:
        return

    def print_parameters(self):

        # Print Building Stats
        for i in [Building.GOLDMINE, Building.FARM, Building.CITYCENTER]:
            total_level = 1
            buildingType = i
            if i == Building.GOLDMINE:
                total_level = 9
            if i == Building.FARM:
                total_level = 9
            else:
                total_level = 3

            curr_level = 1

            print("-----------------")
            print(f"** {i} STATS **")
            print("-----------------")

            while curr_level < total_level:
                upgrade_cost_array = get_building_upgrade_cost(curr_level, buildingType)
                gold_upgrade_cost = upgrade_cost_array[0]
                food_upgrade_cost = upgrade_cost_array[1]
                hourly_yield_array = get_building_hourly_yield_by_level(curr_level, buildingType)
                gold_hourly_yield = hourly_yield_array[0]
                food_hourly_yield = hourly_yield_array[1]
                resource_cap_array = get_building_resource_cap(curr_level, buildingType)
                gold_cap = resource_cap_array[0]
                food_cap =resource_cap_array[1]
                print(f"Building Level:{curr_level}")
                print("-----------------")
                print(f"Gold Yield Per Hour: {gold_hourly_yield}" )
                print(f"Food Yield Per Hour: {food_hourly_yield}")
                print(f"Gold Cap: {gold_cap}")
                print(f"Food Cap: {food_cap}")
                print(f"Gold Cost to Upgrade: {gold_upgrade_cost}")
                print(f"Food Cost to Upgrade: {food_upgrade_cost}")
                if buildingType == Building.CITYCENTER:
                    print(f"Tile Count Limit: {self.init_player_tile_count + get_citycenter_tiles_interval()*(curr_level-1)}")
                print("-----------------")

                curr_level += 1

        print("-----------------")
        print(f"Barbarian Stats")
        print("-----------------")
        curr_level = 1
        while curr_level < 10:
            reward_arr = getBarbarianReward(curr_level)
            reward_gold = reward_arr[0]
            reward_food = reward_arr[1]
            barbarian_count = get_barbarian_count_by_level(curr_level)
            print("-----------------")
            print(f"Barbarian Level: {curr_level}")
            print("-----------------")
            print(f"Barbarian Counts: {barbarian_count}")
            print(f"Gold Reward: {reward_gold}")
            print(f"Food Reward: {reward_food}")
            curr_level += 1

        print("-----------------")
        print(f"Tile Upgrade Stats")
        print("-----------------")
        curr_level = 1
        while curr_level < 10:
            cost_arr = getTileUpgradeCost(curr_level)
            cost_gold = cost_arr[0]
            cost_food = cost_arr[1]
            tile_guard_count = get_tile_troop_count(curr_level)
            print("-----------------")
            print(f"Tile Level: {curr_level}")
            print("-----------------")
            print(f"Tile Guard Counts: {tile_guard_count}")
            print(f"Gold Cost: {cost_gold}")
            print(f"Food Cost: {cost_food}")
            curr_level += 1