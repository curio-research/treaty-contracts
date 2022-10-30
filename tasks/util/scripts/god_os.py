import math
from enum import Enum
from types import LambdaType
from typing import List
import numpy as np
import json
import sys
from collections import OrderedDict

stdout_origin = sys.stdout
sys.stdout = open("earth_log.txt", "w")


class Resource(str, Enum):
    GOLD = "Gold"
    FOOD = "Food"


class Building(str, Enum):
    GOLDMINE = "Goldmine"
    FARM = "Farm"
    CITY_CENTER = "City Center"


def get_hourly_gather_rate_per_army(resource_type: Resource) -> int:
    """
    Growth: Constant
    Gist: determined by resource weight & city center level (midpoint constant) & projected yields.
    Gold/Food mints from gather are both medium
    """
    # should take the middle of the interval => if ccl = 2, ccltbl = 3, then it corresponds to (6 + 3) / 2 = 4.5
    corresponding_building_level = building_level_based_on_center_level(
        (Game.max_city_center_level + 1) / 2)
    # NOTE: function input uses resource enum but it's fine for now
    building_type = None
    if (resource_type == Resource.GOLD):
        building_type = Building.GOLDMINE
    if (resource_type == Resource.FOOD):
        building_type = Building.FARM
    (gold_hourly_yield, food_hourly_yield) = get_building_hourly_yield_by_level(
        corresponding_building_level, building_type)

    projected_goldmine_count = expected_gold_density() * get_city_center_tiles_interval() * \
        math.ceil((Game.max_city_center_level + 1) / 2)
    projected_farm_count = expected_farm_density() * get_city_center_tiles_interval() * \
        math.ceil((Game.max_city_center_level + 1) / 2)

    gold_gather_rate = gold_hourly_yield * projected_goldmine_count / \
        Game.resource_weight_low * Game.resource_weight_medium
    food_gather_rate = food_hourly_yield * projected_farm_count / \
        Game.resource_weight_heavy * Game.resource_weight_medium

    if (resource_type == Resource.GOLD):
        return gold_gather_rate
    if (resource_type == Resource.FOOD):
        return food_gather_rate


def resource_cap_per_troop() -> int:
    """
    Growth: Constant
    Gist: city center level (midpoint constant) & resource building cap
    """
    # should take the middle of the interval => if ccl = 2, ccltbl = 3, then it corresponds to (6 + 3) / 2 = 4.5
    corresponding_building_level = building_level_based_on_center_level(
        (Game.max_city_center_level + 1) / 2)
    (building_gold_cap, building_food_cap) = get_building_resource_cap(corresponding_building_level,
                                                                       Building.GOLDMINE) + get_building_resource_cap(corresponding_building_level, Building.FARM)
    median_army_size = get_troop_size_by_center_level(
        math.ceil((Game.max_city_center_level + 1) / 2))
    # no difference btw resources, so take the avg
    return (building_gold_cap + building_food_cap) / 2 / median_army_size


def get_troop_size_by_center_level(level: int) -> int:
    """
    Growth: Slow Exponential
    level is city center level
    """
    return slow_exponential_curve(Game.max_city_center_level)(level) / slow_exponential_curve(9)(1) * get_PvE_troop_base_count() * 100 / Game.barbarian_to_army_difficulty_constant


def get_building_resource_cap(level: int, buildingType: Building) -> np.array:
    """
    Growth: Slow Exponential
    Gist: goldCap, foodCap = playerLoginIntervalInMinutes / 60 * buildingHourlyYields
    """
    return Game.player_login_interval_in_minutes / 60 * get_building_hourly_yield_by_level(level, buildingType)


def get_city_center_tiles_interval() -> int:
    """
    Growth: Constant
    Gist: 9 tiles - avg tiles - max tiles => calculate with (avg - init) / (intervals/2)
    """
    return math.floor(((Game.total_tile_count/Game.expected_player_count) - Game.init_player_tile_count) / (Game.max_city_center_level - 1) / 2)


def get_building_base_hourly_yield(building_type: Building) -> np.array:
    """
    Growth: Constant
    Gist: based upon how much it takes to occupy one tile and one lv1 barbarian, given that the player has only a city center and init farms
    """
    total_troop = get_tile_troop_count(1) + get_barbarian_count_by_level(1)
    gold_cost_per_troop = Game.resource_weight_light
    food_cost_per_troop = Game.resource_weight_heavy
    total_goldcost = total_troop * gold_cost_per_troop
    total_foodcost = total_troop * food_cost_per_troop
    total_seconds = Game.new_player_action_in_seconds * \
        (1 + Game.tile_to_barbarian_strength_ratio)

    # Food Mint: Harvest (heavy), Food Burn: Troop (heavy); also need to consider density level
    base_farm_food_hourly_yield = total_foodcost / total_seconds * 3600 * (Game.resource_weight_heavy/Game.resource_weight_heavy) \
        / (Game.init_player_farm_count)

    # Gold Mint: Harvest (low), Gold Burn: Troop (light); also need to consider density level
    base_gold_food_hourly_yield = total_goldcost / total_seconds * 3600 * (Game.resource_weight_low/Game.resource_weight_light) \
        / (Game.init_player_goldmine_count)

    if building_type == Building.FARM:
        return np.array([0, base_farm_food_hourly_yield])
    elif building_type == Building.GOLDMINE:
        return np.array([base_gold_food_hourly_yield, 0])
    elif building_type == Building.CITY_CENTER:
        return np.array([base_gold_food_hourly_yield, base_farm_food_hourly_yield])
    else:
        return np.array([0, 0])


def get_building_hourly_yield_by_level(level: int, building_type: Building) -> np.array:
    """
    Growth: logarithmic curve
    Gist: growth lower than upgrade cost
    """
    hourly_yield = get_building_base_hourly_yield(building_type)
    gold_base_hourly_yield = hourly_yield[0]
    food_base_hourly_yield = hourly_yield[1]
    gold_hourly_yield = math.floor(logarithmic_curve(
        Game.max_city_center_level * Game.city_center_level_to_building_level)(level) / logarithmic_curve(9)(1) * gold_base_hourly_yield)
    food_hourly_yield = math.floor(logarithmic_curve(
        Game.max_city_center_level * Game.city_center_level_to_building_level)(level) / logarithmic_curve(9)(1) * food_base_hourly_yield)
    return np.array([gold_hourly_yield, food_hourly_yield])


def get_PvE_troop_base_count() -> int:
    return Game.new_player_action_in_seconds * Game.base_troop_training_in_seconds


def get_barbarian_count_by_level(level: int) -> int:
    """
    Growth: slow exponential
    Gist: barbarian rewards and costs both increase exponentially, but the latter at a lower rate
    """
    return slow_exponential_curve(Game.max_city_center_level * Game.city_center_level_to_building_level)(level) / slow_exponential_curve(9)(1) * get_PvE_troop_base_count()


def get_barbarian_reward(level: int) -> np.array:
    """
    Growth: fast exponential for gold; constant for food
    Gist: barbarian rewards and costs both increase exponentially, but the latter at a lower rate
    """
    barbarian_count = get_barbarian_count_by_level(level)
    goldcost_per_troop = Game.resource_weight_light
    foodcost_per_troop = Game.resource_weight_heavy
    total_goldcost = barbarian_count * goldcost_per_troop
    total_foodcost = barbarian_count * foodcost_per_troop
    # actual reward = base reward * exponential curve (level as x)
    gold_reward = total_goldcost * Game.barbarian_reward_to_cost_coefficient * fast_exponential_curve(
        Game.max_city_center_level * Game.city_center_level_to_building_level)(level) / fast_exponential_curve(9)(1)
    # food burn for troop is heavy while food mint for barbarians is low
    food_reward = total_foodcost * Game.barbarian_reward_to_cost_coefficient * \
        (Game.resource_weight_light/Game.resource_weight_heavy)
    return np.array([gold_reward, food_reward])


def get_tile_troop_count(level: int) -> int:
    """
    Growth: slow exponential
    Gist: tile power increases exponentially; for now all tiles are initialized to be lv1
    """
    return slow_exponential_curve(Game.max_city_center_level * Game.city_center_level_to_building_level)(level) / slow_exponential_curve(9)(1) * get_PvE_troop_base_count() * Game.tile_to_barbarian_strength_ratio


def get_tile_upgrade_cost(level: int) -> np.array:
    """
    Growth: slow exponential
    Gist: grow depending on tileTroopCount; applied tileTroop discount => more total discounts if higher level
    """
    goldcost_per_troop = Game.resource_weight_light * Game.tile_troop_discount
    foodcost_per_troop = Game.resource_weight_heavy * Game.tile_troop_discount
    total_goldcost = (get_tile_troop_count(level + 1) -
                      get_tile_troop_count(level - 1)) * goldcost_per_troop
    total_foodcost = (get_tile_troop_count(level + 1) -
                      get_tile_troop_count(level - 1)) * foodcost_per_troop
    return np.array([total_goldcost, total_foodcost])


def building_level_based_on_center_level(level: int) -> int:
    """
    Gist take the middle of the interval => if ccl = 2, ccltbl = 3, then it corresponds to (6 + 3) / 2 = 4.5
    """
    return (2 * (level) - 1) * Game.city_center_level_to_building_level / 2


def get_building_upgrade_cost(level: int, building_type: Building) -> np.array:
    """
    Growth: fast exponential
    Gist: both building yields and upgrade costs increase exponentially, but the latter at a lower rate
    """
    # cost is easy to calculate for goldmine
    goldmine_goldcost = payback_period_curve_in_hour(Game.max_city_center_level * Game.city_center_level_to_building_level)(level) \
        * get_building_hourly_yield_by_level(level, Building.GOLDMINE)[0]
    # calculate foodcost based on resource weight; NOTE: not scientific here, a leap of faith here
    goldmine_foodcost = goldmine_goldcost / \
        Game.resource_weight_heavy * Game.resource_weight_low
    # assumption is that player spend gold equivalently on two types of building
    farm_goldcost = goldmine_goldcost * \
        Game.init_player_goldmine_count / Game.init_player_farm_count
    # farm food cost if don't consider that part of it goes to troops
    farm_foodcost_raw = payback_period_curve_in_hour(Game.max_city_center_level * Game.city_center_level_to_building_level)(level) \
        * get_building_hourly_yield_by_level(level, Building.FARM)[1]
    # consider relative weight of food burn => Build (low), Troop (heavy)
    farm_foodcost = farm_foodcost_raw * Game.resource_weight_low / \
        (Game.resource_weight_heavy + Game.resource_weight_low)
    if building_type == Building.GOLDMINE:
        return np.array([goldmine_goldcost, goldmine_foodcost])
    if building_type == Building.FARM:
        return np.array([farm_goldcost, farm_foodcost])
    if building_type == Building.CITY_CENTER:
        # city center upgrade cost incur additional tax, based upon new tile it unlocks
        # tax = expected resource output (= density * getCityCenterTilesInterval / '2' * yield) * payback period
        unlocked_goldmine_count = expected_gold_density() * get_city_center_tiles_interval()
        unlocked_farm_count = expected_farm_density() * get_city_center_tiles_interval()
        # here I choose to use the new city level as base
        corresponding_building_level = building_level_based_on_center_level(
            level + 1)
        expected_goldmine_hourly_yield = get_building_hourly_yield_by_level(
            corresponding_building_level, Building.GOLDMINE)[0]
        expected_farm_hourly_yield = get_building_hourly_yield_by_level(
            corresponding_building_level, Building.FARM)[1]
        tax_gold = unlocked_goldmine_count * expected_goldmine_hourly_yield * \
            payback_period_curve_in_hour(
                Game.max_city_center_level * Game.city_center_level_to_building_level)(level)
        tax_food = unlocked_farm_count * expected_farm_hourly_yield * \
            payback_period_curve_in_hour(
                Game.max_city_center_level * Game.city_center_level_to_building_level)(level)

        return np.array([goldmine_goldcost + farm_goldcost + tax_gold, goldmine_foodcost + farm_foodcost + tax_food])


def expected_gold_density() -> float:
    return Game.init_player_goldmine_count / Game.init_player_tile_count


def expected_farm_density() -> float:
    return Game.init_player_farm_count / Game.init_player_tile_count


def payback_period_curve_in_hour(max_level: int) -> LambdaType:
    """
    Growth: fast exponential
    Note: sum from f(1) to f(9) is 19.757. Leap of faith: assume this is reasonable for 72 hr gameplay
    Gist: (math.e)**(level/7) - 0.9 makes sure upgrade from (n - 1) to n (max level)
    """
    return lambda level: ((math.e)**((level / max_level * 9)/4) - 0.9) * Game.expected_play_time_in_hour / 72


def slow_exponential_curve(max_level: int) -> LambdaType:
    """
    Growth: slow exponential
    NOTE: Don't tune this parameter to adjust gametime
    """
    return lambda level: ((math.e)**((level / max_level * 9)/7) - 0.9)


def fast_exponential_curve(max_level: int) -> LambdaType:
    """
    Growth: fast exponential
    NOTE: Don't tune this parameter to adjust gametime
    """
    return lambda level: ((math.e)**((level / max_level * 9)/5) - 0.9)


def logarithmic_curve(max_level: int) -> LambdaType:
    """
    Growth: logrithmic
    Mainly used for resource yield growth
    """
    return lambda level: math.log((level / max_level * 9)/2 + 1) + 1


def tile_loyalty_points(decay_dist: float):
    """
    Multiply loyalty points to a tile's guard amount at each level to determine its actual guard amount level under control of a player based on its distance from the player's city center.
    """
    return lambda dist: -math.atan(dist - decay_dist) / math.pi + 1 / 2


class Game:
    # TODO: use a JSON to initialize these variable
    total_tile_count = 11*11
    expected_player_count = 3
    init_player_tile_count = 9

    expected_play_time_in_hour = 2
    """
    How many tiles does a level 1 city center player has
    """

    init_player_goldmine_count = 2
    """
    How many goldmines avg players have when city center level is 1
    Determine resource density. Note that one of the goldmines is citycenter
    """

    init_player_farm_count = 9
    """
    How many farms avg players have when city center level is 1
    Determine resource density. Note that one of the farms is citycenter
    """

    player_login_interval_in_minutes = 20
    """
    Mainly determine building cap
    """

    max_city_center_level = 5
    """
    City center max level
    """

    city_center_level_to_building_level = 3
    """
    Building levels that each city level upgrade unlocks. NOTE: same constant is used for barbarians & tiles
    """

    new_player_action_in_seconds = 100
    """
    time for new player to train enough troops to defeat lv1 barbarians
    note: this is already kinda fast, but might still feel slow. If so, we can initialize some resources
    """

    base_troop_training_in_seconds = 0.15
    """
    time to train one troop
    """

    barbarian_reward_to_cost_coefficient = 4
    """
    Adjust this number based upon expected player behavior. This only changes the absolute ratio of reward to cost.
    To tune the difference in rate of increment. Adjust the exponential function (by default the diff is 2)
    """

    tile_to_barbarian_strength_ratio = 1.8
    """
    Tile & Barbarians are both PvE mechanics. Adjust this number based upon expected player behavior
    """

    tile_troop_discount = 0.2
    """
    Upgrading Tiles should cost less than buying troops
    """

    barbarian_to_army_difficulty_constant = 40
    """
    Affect army size. The percentage of troop attendence to defeat same-level barbarian
    Example: player city center is lv3, then its army should equal lv7 - 9 barbarians (avg is 8) if constant is 100
    """

    gather_rate_to_resource_rate = 40
    """
    Gather rate should be much faster than harvest yield rate
    """

    # Gold:
    #   Mint: Harvest (low), Gather (medium), Barbarians (high)
    #   Burn: Build (heavy), Troop (light)
    # Food:
    #   Mint: Harvest (heavy), Gather (medium), Barbarians (low)
    #   Burn: Build (low), Troop (heavy)

    (resource_weight_light, resource_weight_low, resource_weight_medium,
     resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)

    def __init__(self) -> None:
        return

    def print_parameters(self):
        print("-----------------")
        print(f"** Faith Constants **")
        print("-----------------")
        raw_constant_list = [attr for attr in dir(self) if not callable(
            getattr(self, attr)) and not attr.startswith("__")]
        for raw_constant in raw_constant_list:
            print(f"{raw_constant}: {getattr(self, raw_constant)}")

        # Print Building Stats
        for i in [Building.GOLDMINE, Building.FARM, Building.CITY_CENTER]:
            max_building_level = 1
            buildingType = i
            if i == Building.GOLDMINE:
                max_building_level = self.max_city_center_level * \
                    self.city_center_level_to_building_level
            if i == Building.FARM:
                max_building_level = self.max_city_center_level * \
                    self.city_center_level_to_building_level
            if i == Building.CITY_CENTER:
                max_building_level = self.max_city_center_level

            curr_level = 1

            print("-----------------")
            print(f"** {i} Stats **")
            print("-----------------")

            while curr_level <= max_building_level:
                (gold_upgrade_cost, food_upgrade_cost) = get_building_upgrade_cost(
                    curr_level, buildingType)
                (gold_hourly_yield, food_hourly_yield) = get_building_hourly_yield_by_level(
                    curr_level, buildingType)
                (gold_cap, food_cap) = get_building_resource_cap(
                    curr_level, buildingType)
                print(f"Building Level: {curr_level}")
                print("-----------------")
                print(f"Gold Yield Per Hour: {gold_hourly_yield}")
                print(f"Food Yield Per Hour: {food_hourly_yield}")
                print(f"Gold Cap: {gold_cap}")
                print(f"Food Cap: {food_cap}")
                if curr_level < max_building_level:
                    print(f"Gold Cost to Upgrade: {gold_upgrade_cost}")
                    print(f"Food Cost to Upgrade: {food_upgrade_cost}")
                if curr_level == max_building_level:
                    print("Cannot Upgrade")
                if buildingType == Building.CITY_CENTER:
                    print(
                        f"Tile Count Limit: {self.init_player_tile_count + get_city_center_tiles_interval()*(curr_level-1)}")
                print("-----------------")

                curr_level += 1

        print("-----------------")
        print(f"** Barbarian Stats **")
        print("-----------------")
        curr_level = 1
        while curr_level <= self.max_city_center_level * self.city_center_level_to_building_level:
            (reward_gold, reward_food) = get_barbarian_reward(curr_level)
            barbarian_count = get_barbarian_count_by_level(curr_level)
            print("-----------------")
            print(f"Barbarian Level: {curr_level}")
            print("-----------------")
            print(f"Barbarian Counts: {barbarian_count}")
            print(f"Gold Reward: {reward_gold}")
            print(f"Food Reward: {reward_food}")
            curr_level += 1

        print("-----------------")
        print(f"** Tile Upgrade Stats **")
        print("-----------------")
        curr_level = 1
        max_tile_level = self.max_city_center_level * \
            self.city_center_level_to_building_level
        while curr_level <= max_tile_level:
            (cost_gold, cost_food) = get_tile_upgrade_cost(curr_level)
            tile_guard_count = get_tile_troop_count(curr_level)
            print("-----------------")
            print(f"Tile Level: {curr_level}")
            print("-----------------")
            print(f"Tile Guard Counts: {tile_guard_count}")
            if curr_level < max_tile_level:
                print(f"Gold Cost to Upgrade: {cost_gold}")
                print(f"Food Cost to Upgrade: {cost_food}")
            if curr_level == max_tile_level:
                print("Cannot Upgrade")
            curr_level += 1

        print("-----------------")
        print(f"Gather Stats")
        print("-----------------")
        for i in [Resource.GOLD, Resource.FOOD]:
            print(
                f"{i} Hourly Gather Rate Per Army: {get_hourly_gather_rate_per_army(i)}")
        print(f"Resource Load per Troop: {resource_cap_per_troop()}")

        print("-----------------")
        print(f"TroopSize Stats")
        print("-----------------")
        max_building_level = self.max_city_center_level
        curr_level = 1
        while curr_level <= max_building_level:
            print(
                f"City Center Level ({curr_level}) TroopSize: {get_troop_size_by_center_level(curr_level)}")
            curr_level += 1
        print(f"Troop Gold Cost: {self.resource_weight_light}")
        print(f"Troop Food Cost: {self.resource_weight_heavy}")

        sys.stdout.close()
        sys.stdout = stdout_origin

    """
    Constant format:
    "subject": "Farm",
    "object": "Food",
    "componentName": "Yield",
    "level": 1,
    "functionName": "upgrade"
    "value": 1920
    """

    def export_json_parameters(self) -> None:
        # Initialize JSONs
        game_parameters: List[OrderedDict] = []
        world_parameters: OrderedDict = {}

        # Save world parameters here
        world_parameters["maxCityCenterLevel"] = self.max_city_center_level
        world_parameters["cityCenterLevelToEntityLevelRatio"] = int(
            self.city_center_level_to_building_level)
        world_parameters["secondsToTrainAThousandTroops"] = int(
            self.base_troop_training_in_seconds * 1000)
        game_parameters.append({"subject": "Army", "object": "Gold", "componentName": "Rate", "functionName": "gather",
                               "level": 0, "value": int(get_hourly_gather_rate_per_army(Resource.GOLD) * 1000 / 3600)})
        game_parameters.append({"subject": "Army", "object": "Food", "componentName": "Rate", "functionName": "gather",
                               "level": 0, "value": int(get_hourly_gather_rate_per_army(Resource.FOOD) * 1000 / 3600)})
        game_parameters.append({"subject": "Troop", "object": "Resource", "componentName": "Load",
                               "functionName": "", "level": 0, "value": int(resource_cap_per_troop() * 1000)})
        game_parameters.append({"subject": "Troop Production", "object": "Gold", "componentName": "Cost",
                               "functionName": "", "level": 0, "value": int(self.resource_weight_light * 1000)})
        game_parameters.append({"subject": "Troop Production", "object": "Food", "componentName": "Cost",
                               "functionName": "", "level": 0, "value": int(self.resource_weight_heavy * 1000)})
        game_parameters.append({"subject": "Settler", "object": "", "componentName": "Health",
                               "functionName": "", "level": 0, "value": 1000000000})
        game_parameters.append({"subject": "Barbarian", "object": "",
                               "componentName": "Cooldown",  "functionName": "", "level": 0, "value": 30})

        # Building Stats
        for i in [Building.GOLDMINE, Building.FARM, Building.CITY_CENTER]:
            max_building_level = 1
            building_type = i
            if i == Building.GOLDMINE:
                max_building_level = self.max_city_center_level * \
                    self.city_center_level_to_building_level
            elif i == Building.FARM:
                max_building_level = self.max_city_center_level * \
                    self.city_center_level_to_building_level
            elif i == Building.CITY_CENTER:
                max_building_level = self.max_city_center_level
                for i in range(1, self.max_city_center_level + 1):
                    game_parameters.append({"subject": "City Center", "object": "Troop", "componentName": "Load",
                                           "level": i, "functionName": "", "value": 999999999})  # FIXME: hardcoded
                    game_parameters.append({"subject": "City Center", "object": "Gold", "componentName": "Cost",
                                           "level": i, "functionName": "Move", "value": 0})  # FIXME: hardcoded, attention @Modeo
                    game_parameters.append({"subject": "City Center", "object": "Food", "componentName": "Cost",
                                           "level": i, "functionName": "Move", "value": 0})  # FIXME: hardcoded, attention @Modeo

            curr_level = 0

            while curr_level <= max_building_level:
                (gold_upgrade_cost, food_upgrade_cost) = get_building_upgrade_cost(
                    curr_level, building_type)
                (gold_hourly_yield, food_hourly_yield) = get_building_hourly_yield_by_level(
                    curr_level, building_type)
                (gold_cap, food_cap) = get_building_resource_cap(
                    curr_level, building_type)

                game_parameters.append({"subject": building_type, "object": "Gold", "componentName": "Yield",
                                        "functionName": "", "level": curr_level, "value": int(gold_hourly_yield * 1000 / 3600)})
                game_parameters.append({"subject": building_type, "object": "Food", "componentName": "Yield",
                                        "functionName": "", "level": curr_level, "value": int(food_hourly_yield * 1000 / 3600)})
                game_parameters.append({"subject": building_type, "object": "Gold", "componentName": "Load",
                                        "functionName": "", "level": curr_level, "value": int(gold_cap * 1000)})
                game_parameters.append({"subject": building_type, "object": "Food", "componentName": "Load",
                                        "functionName": "", "level": curr_level, "value": int(food_cap * 1000)})
                if curr_level < max_building_level:
                    game_parameters.append({"subject": building_type, "object": "Gold", "componentName": "Cost",
                                           "functionName": "Upgrade", "level": curr_level, "value": int(gold_upgrade_cost * 1000)})
                    game_parameters.append({"subject": building_type, "object": "Food", "componentName": "Cost",
                                           "functionName": "Upgrade", "level": curr_level, "value": int(food_upgrade_cost * 1000)})

                curr_level += 1

        # Barbarian Stats
        curr_level = 1
        while curr_level <= self.max_city_center_level * self.city_center_level_to_building_level:
            (reward_gold, reward_food) = get_barbarian_reward(curr_level)
            barbarian_count = get_barbarian_count_by_level(curr_level)
            game_parameters.append({"subject": "Barbarian", "object": "Gold", "componentName": "Reward",
                                   "functionName": "", "level": curr_level, "value": int(reward_gold * 1000)})
            game_parameters.append({"subject": "Barbarian", "object": "Food", "componentName": "Reward",
                                   "functionName": "", "level": curr_level, "value": int(reward_food * 1000)})
            game_parameters.append({"subject": "Barbarian", "object": "Guard", "componentName": "Amount",
                                   "functionName": "", "level": curr_level, "value": barbarian_count})
            curr_level += 1

        # Tile Stats
        curr_level = 1
        max_tile_level = self.max_city_center_level * \
            self.city_center_level_to_building_level
        while curr_level <= max_tile_level:
            tile_guard_count = get_tile_troop_count(curr_level)
            game_parameters.append({"subject": "Tile", "object": "Guard", "componentName": "Amount",
                                   "functionName": "", "level": curr_level, "value": tile_guard_count})
            if curr_level != max_tile_level:
                (cost_gold, cost_food) = get_tile_upgrade_cost(curr_level)
                game_parameters.append({"subject": "Tile", "object": "Gold", "componentName": "Cost",
                                       "functionName": "Upgrade", "level": curr_level, "value": int(cost_gold * 1000)})
                game_parameters.append({"subject": "Tile", "object": "Food", "componentName": "Cost",
                                       "functionName": "Upgrade", "level": curr_level, "value": int(cost_food * 1000)})
            curr_level += 1

        # Army Size Stats
        max_building_level = self.max_city_center_level
        curr_level = 1
        while curr_level <= max_building_level:
            game_parameters.append({"subject": "Army", "object": "Troop", "componentName": "Amount",
                                   "functionName": "", "level": curr_level, "value": get_troop_size_by_center_level(curr_level)})
            game_parameters.append({"subject": "City", "object": "Tile", "componentName": "Amount",
                                   "functionName": "", "level": curr_level, "value": self.init_player_tile_count + (curr_level - 1) * int(get_city_center_tiles_interval())})
            curr_level += 1

        # Order object keys in game and world parameters for loading into Foundry
        def order(d: dict): return OrderedDict(sorted(d.items()))
        game_parameters = list(map(order, game_parameters))
        world_parameters = order(world_parameters)

        # Dump JSON
        with open("tasks/game_parameters.json", "w+") as outfile:
            outfile.write(json.dumps(game_parameters, indent=4))
        with open("tasks/world_parameters.json", "w+") as outfile:
            outfile.write(json.dumps(world_parameters, indent=4))
        print('GodOS: generated and exported parameters')

        # FIXME: remove
        bruh = {}
        bruh["moment"] = game_parameters
        with open("tasks/bruh_moment.json", "w+") as outfile:
            outfile.write(json.dumps(bruh, indent=4))


a = Game()
a.print_parameters()
a.export_json_parameters()
