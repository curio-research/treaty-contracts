from collections import OrderedDict
import math
from enum import Enum
from types import LambdaType
import numpy as np
import json
from pathlib import Path
import os


import sys

stdout_origin = sys.stdout


class Resource(str, Enum):
    GOLD = "Gold"
    FOOD = "Food"


class GameMode(str, Enum):
    THREE_PLAYER_SHORT_TEST = "THREE_PLAYER_SHORT_TEST"
    TEN_PLAYER_SHORT_TEST = "TEN_PLAYER_SHORT_TEST"
    FIVE_PLAYER_SHORT_TEST = "FIVE_PLAYER_SHORT_TEST"
    SIX_PLAYER_SHORT_TEST = "SIX_PLAYER_SHORT_TEST"
    SIX_PLAYER_LONG_TEST = "SIX_PLAYER_LONG_TEST"
    THREE_PLAYER_LONG_TEST = "THREE_PLAYER_LONG_TEST"
    TEN_PLAYER_LONG_TEST = "TEN_PLAYER_LONG_TEST"
    FIVE_PLAYER_LONG_TEST = "FIVE_PLAYER_LONG_TEST"
    INTERNAL_PLAYTEST = "INTERNAL_PLAYTEST"
    PUBLIC_LAUNCH = "PUBLIC_LAUNCH"


class Building(str, Enum):
    GOLDMINE = "Goldmine"
    FARM = "Farm"
    CAPITAL = "Capital"


def get_hourly_gather_rate_per_army(resource_type: Resource) -> int:
    """
    Growth: Constant
    Gist: determined by resource weight & capital level (midpoint constant) & projected yields.
    Gold/Food mints from gather are both medium
    """
    # should take the middle of the interval => if ccl = 2, ccltbl = 3, then it corresponds to (6 + 3) / 2 = 4.5
    corresponding_building_level = building_level_based_on_center_level(
        (game_instance.max_capital_level + 1) / 2)
    # NOTE: function input uses resource enum but it's fine for now
    building_type = None
    if (resource_type == Resource.GOLD):
        building_type = Building.GOLDMINE
    if (resource_type == Resource.FOOD):
        building_type = Building.FARM
    (gold_hourly_yield, food_hourly_yield) = get_building_hourly_yield_by_level(
        corresponding_building_level, building_type)

    projected_goldmine_count = expected_gold_density() * get_capital_tiles_interval() * \
        math.ceil((game_instance.max_capital_level + 1) / 2)
    projected_farm_count = expected_farm_density() * get_capital_tiles_interval() * \
        math.ceil((game_instance.max_capital_level + 1) / 2)

    gold_gather_rate = gold_hourly_yield * projected_goldmine_count / \
        game_instance.resource_weight_low * game_instance.resource_weight_medium
    food_gather_rate = food_hourly_yield * projected_farm_count / \
        game_instance.resource_weight_heavy * game_instance.resource_weight_medium

    if (resource_type == Resource.GOLD):
        return gold_gather_rate * game_instance.troop_gathering_bonus
    if (resource_type == Resource.FOOD):
        return food_gather_rate * game_instance.troop_gathering_bonus


def resource_cap_per_troop() -> int:
    """
    Growth: Constant
    Gist: capital level (midpoint constant) & resource building cap
    """
    # should take the middle of the interval => if ccl = 2, ccltbl = 3, then it corresponds to (6 + 3) / 2 = 4.5
    corresponding_building_level = building_level_based_on_center_level(
        (game_instance.max_capital_level + 1) / 2)

    (building_gold_cap, building_food_cap) = get_building_resource_cap(corresponding_building_level,
                                                                       Building.GOLDMINE) + get_building_resource_cap(corresponding_building_level, Building.FARM)
    median_army_size = get_troop_size_by_center_level(
        math.ceil((game_instance.max_capital_level + 1) / 2))
    # no difference btw resources, so take the avg
    return (building_gold_cap + building_food_cap) / 2 / (median_army_size) * game_instance.troop_cap_to_buildings_cap_ratio


def get_troop_size_by_center_level(level: int) -> int:
    """
    Growth: Slow Exponential
    level is capital level
    """
    return slow_exponential_curve(game_instance.max_capital_level)(level) / slow_exponential_curve(9)(1) * get_PvE_troop_base_count() * 100 / game_instance.barbarian_to_army_difficulty_constant


def get_building_resource_cap(level: int, buildingType: Building) -> np.array:
    """
    Growth: Slow Exponential
    Gist: goldCap, foodCap = playerLoginIntervalInMinutes / 60 * buildingHourlyYields
    """
    return game_instance.player_login_interval_in_minutes / 60 * get_building_hourly_yield_by_level(level, buildingType)


def get_capital_tiles_interval() -> int:
    """
    Growth: Constant
    Gist: 9 tiles - avg tiles - max tiles => calculate with (avg - init) / (intervals/2)
    """
    # TEMP: divided by 2 to enhance tile restriction
    return math.floor(
        ((game_instance.total_tile_count/game_instance.expected_player_count) -
         game_instance.init_player_tile_count)
        / ((game_instance.max_capital_level - 1) / 2)
        / 2)


def get_building_base_hourly_yield(building_type: Building) -> np.array:
    """
    Growth: Constant
    Gist: based upon how much it takes to occupy one tile and one lv1 barbarian, given that the player has only a capital and init farms
    """
    total_troop = get_tile_troop_count(1) + get_barbarian_count_by_level(1)
    gold_cost_per_troop = game_instance.resource_weight_light
    food_cost_per_troop = game_instance.resource_weight_heavy
    total_goldcost = total_troop * gold_cost_per_troop
    total_foodcost = total_troop * food_cost_per_troop
    total_seconds = game_instance.player_action_in_seconds * \
        (1 + game_instance.tile_to_barbarian_strength_ratio)

    # Food Mint: Harvest (heavy), Food Burn: Troop (heavy); also need to consider density level
    base_farm_food_hourly_yield = total_foodcost / total_seconds * 3600 * (game_instance.resource_weight_heavy/game_instance.resource_weight_heavy) \
        / (game_instance.init_player_farm_count)

    # Gold Mint: Harvest (low), Gold Burn: Troop (light); also need to consider density level
    base_gold_food_hourly_yield = total_goldcost / total_seconds * 3600 * (game_instance.resource_weight_low/game_instance.resource_weight_light) \
        / (game_instance.init_player_goldmine_count)

    if building_type == Building.FARM:
        return np.array([0, base_farm_food_hourly_yield])
    elif building_type == Building.GOLDMINE:
        return np.array([base_gold_food_hourly_yield, 0])
    elif building_type == Building.CAPITAL:
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
    gold_hourly_yield = math.floor(logarithmic_curve(game_instance.max_capital_level *
                                   game_instance.capital_level_to_building_level)(level) / logarithmic_curve(9)(1) * gold_base_hourly_yield)
    food_hourly_yield = math.floor(logarithmic_curve(game_instance.max_capital_level *
                                   game_instance.capital_level_to_building_level)(level) / logarithmic_curve(9)(1) * food_base_hourly_yield)
    return np.array([gold_hourly_yield, food_hourly_yield])


def get_capital_level_to_building_level() -> int:
    return game_instance.capital_level_to_building_level


def get_PvE_troop_base_count() -> int:
    return game_instance.player_action_in_seconds * game_instance.base_troop_training_in_seconds


def get_barbarian_count_by_level(level: int) -> int:
    """
    Growth: slow exponential
    Gist: barbarian rewards and costs both increase exponentially, but the latter at a lower rate
    """
    return slow_exponential_curve(game_instance.max_capital_level * game_instance.capital_level_to_building_level)(level) / slow_exponential_curve(9)(1) * get_PvE_troop_base_count()


def get_barbarian_reward(level: int) -> np.array:
    """
    Growth: fast exponential for gold; constant for food
    Gist: barbarian rewards and costs both increase exponentially, but the latter at a lower rate
    """
    barbarian_count = get_barbarian_count_by_level(level)
    goldcost_per_troop = game_instance.resource_weight_light
    foodcost_per_troop = game_instance.resource_weight_heavy
    # Increase cost bc barbarians are strengthened
    total_goldcost = barbarian_count * goldcost_per_troop * 4
    total_foodcost = barbarian_count * foodcost_per_troop * 4
    # actual reward = base reward * exponential curve (level as x)
    gold_reward = total_goldcost * game_instance.barbarian_reward_to_cost_coefficient * \
        (game_instance.resource_weight_high/game_instance.resource_weight_light)
    # food burn for troop is super heavy while food mint for barbarians is low
    food_reward = total_foodcost * game_instance.barbarian_reward_to_cost_coefficient * \
        (game_instance.resource_weight_low/game_instance.resource_weight_heavy)
    return np.array([gold_reward, food_reward])


def get_tile_troop_count(level: int) -> int:
    """
    Growth: slow exponential
    Gist: tile power increases exponentially; for now all tiles are initialized to be lv1
    """
    return slow_exponential_curve(game_instance.max_capital_level * game_instance.capital_level_to_building_level)(level) / slow_exponential_curve(9)(1) * get_PvE_troop_base_count() * game_instance.tile_to_barbarian_strength_ratio


def get_tile_upgrade_cost(level: int) -> np.array:
    """
    Growth: slow exponential
    Gist: grow depending on tileTroopCount; applied tileTroop discount => more total discounts if higher level
    """
    goldcost_per_troop = game_instance.resource_weight_light * \
        game_instance.tile_troop_discount
    foodcost_per_troop = game_instance.resource_weight_heavy * \
        game_instance.tile_troop_discount
    total_goldcost = (get_tile_troop_count(level + 1) -
                      get_tile_troop_count(level - 1)) * goldcost_per_troop
    total_foodcost = (get_tile_troop_count(level + 1) -
                      get_tile_troop_count(level - 1)) * foodcost_per_troop
    return np.array([total_goldcost, total_foodcost])


def building_level_based_on_center_level(level: int) -> int:
    """
    Gist take the middle of the interval => if ccl = 2, ccltbl = 3, then it corresponds to (6 + 3) / 2 = 4.5
    """
    return (2 * (level) - 1) * game_instance.capital_level_to_building_level / 2


def get_building_upgrade_cost(level: int, building_type: Building) -> np.array:
    """
    Growth: fast exponential
    Gist: both building yields and upgrade costs increase exponentially, but the latter at a lower rate
    """
    # cost is easy to calculate for goldmine (cost curve faster than food)
    goldmine_goldcost = gold_payback_period_curve_in_hour(game_instance.max_capital_level * game_instance.capital_level_to_building_level)(level) \
        * get_building_hourly_yield_by_level(level, Building.GOLDMINE)[0]
    # calculate foodcost based on resource weight; NOTE: not scientific, a leap of faith here
    goldmine_foodcost = goldmine_goldcost / \
        game_instance.resource_weight_heavy * game_instance.resource_weight_low
    # assumption is that player spend gold equivalently on two types of building
    # FIXME: 3 is hardcoded for now; this is technically not right
    farm_goldcost = goldmine_goldcost * game_instance.init_player_goldmine_count / \
        game_instance.init_player_farm_count * 3
    # farm food cost if don't consider that part of it goes to troops
    farm_foodcost_raw = payback_period_curve_in_hour(game_instance.max_capital_level * game_instance.capital_level_to_building_level)(level) \
        * get_building_hourly_yield_by_level(level, Building.FARM)[1]
    # consider relative weight of food burn => Build (low), Troop (heavy)
    farm_foodcost = farm_foodcost_raw * game_instance.resource_weight_low / \
        (game_instance.resource_weight_heavy + game_instance.resource_weight_low)
    if building_type == Building.GOLDMINE:
        return np.array([goldmine_goldcost, goldmine_foodcost])
    if building_type == Building.FARM:
        return np.array([farm_goldcost, farm_foodcost])
    if building_type == Building.CAPITAL:
        # capital upgrade cost incur additional tax, based upon new tile it unlocks
        # tax = expected resource output (= density * getCapitalTilesInterval / '2' * yield) * payback period
        unlocked_goldmine_count = expected_gold_density() * get_capital_tiles_interval()
        # unlocked_farm_count = expected_farm_density() * get_capital_tiles_interval()
        # here I choose to use the new capital level as base
        corresponding_building_level = building_level_based_on_center_level(
            level + 1)
        expected_goldmine_hourly_yield = get_building_hourly_yield_by_level(
            corresponding_building_level, Building.GOLDMINE)[0]
        # expected_farm_hourly_yield = get_building_hourly_yield_by_level(
        #     corresponding_building_level, Building.FARM)[1]

        tax_gold = unlocked_goldmine_count * expected_goldmine_hourly_yield * gold_payback_period_curve_in_hour(
            game_instance.max_capital_level * game_instance.capital_level_to_building_level)(level + game_instance.capital_level_to_building_level)
        # tax_food = unlocked_farm_count * expected_farm_hourly_yield * payback_period_curve_in_hour(
        #     game_instance.max_capital_level * game_instance.capital_level_to_building_level)(level + game_instance.capital_level_to_building_level)

        # FIXME: tax_gold hardcoded to * 10
        return np.array([goldmine_goldcost + farm_goldcost + game_instance.capital_gold_tax_factor * tax_gold, goldmine_foodcost + farm_foodcost])


def get_move_capital_cost(level: int) -> np.array:
    (gold_upgrade_cost, food_upgrade_cost) = get_building_upgrade_cost(
        level, Building.CAPITAL)
    return np.array([gold_upgrade_cost * game_instance.move_capital_to_upgrade_cost_ratio, food_upgrade_cost * game_instance.move_capital_to_upgrade_cost_ratio])


def get_move_capital_cooldown_in_hour(level: int) -> int:
    """
    Growth: fast exponential (same as upgrade)
    Note: only x% time compared to capital's payback period
    """
    return payback_period_curve_in_hour(game_instance.max_capital_level)(level) * game_instance.capital_migration_cooldown_ratio / 100


def get_building_upgrade_cooldown_in_hour(level: int, building_type: Building) -> int:
    """
    Growth: fast exponential (same as upgrade)
    Note: only x% time compared to buildings's payback period
    """
    if building_type == Building.CAPITAL:
        return payback_period_curve_in_hour(game_instance.max_capital_level)(level) * game_instance.building_upgrade_cooldown_ratio / 100
    else:
        return payback_period_curve_in_hour(game_instance.max_capital_level * game_instance.capital_level_to_building_level)(level) * game_instance.building_upgrade_cooldown_ratio / 100


def get_tile_upgrade_cooldown_in_second(level: int) -> int:
    return get_tile_troop_count(level) * game_instance.base_troop_training_in_seconds


def expected_gold_density() -> float:
    return 0.25


def expected_farm_density() -> float:
    return 1 - expected_gold_density()


def payback_period_curve_in_hour(max_level: int) -> LambdaType:
    """
    Growth: fast exponential
    Note: sum from f(1) to f(9) is 19.757. Leap of faith: assume this is reasonable for 72 hr gameplay
    Note: max_level not only affects x value but also total gameplay time -> need to make sure sum of y(x) is below 1/3 of all upgrades
    Gist: the function makes sure upgrade from (n_max - 1) to n_max is reasonable 
    """
    upgrade_hour_sum = 0
    # only need to tune here; just look at a chart while tuning; don't need to care about max_level or the sum
    def payback_curve(fraction): return lambda level: (
        (math.e)**((level / max_level * 9)/4) - 0.9) / fraction
    for level in range(0, max_level):
        upgrade_hour_sum += payback_curve(1)(level)
    # make sure that upgrades for all levels account for only a certain fraction of total playtime
    target_upgrade_hour_sum = game_instance.expected_play_time_in_hour * \
        game_instance.upgrade_time_to_expected_play_time_ratio

    return payback_curve(upgrade_hour_sum / target_upgrade_hour_sum)


def gold_payback_period_curve_in_hour(max_level: int) -> LambdaType:
    """
    Growth: slow exponential
    Note: sum from f(1) to f(9) is 19.757. Leap of faith: assume this is reasonable for 72 hr gameplay
    Note: max_level not only affects x value but also total gameplay time -> need to make sure sum of y(x) is below 1/3 of all upgrades
    Gist: the function makes sure upgrade from (n_max - 1) to n_max is reasonable 
    """
    upgrade_hour_sum = 0
    # only need to tune here; just look at a chart while tuning; don't need to care about max_level or the sum
    def payback_curve(fraction): return lambda level: (
        (math.e)**((level / max_level * 9)/7) - 0.9) * 3 / fraction
    for level in range(0, max_level):
        upgrade_hour_sum += payback_curve(1)(level)
    # make sure that upgrades for all levels account for only a certain fraction of total playtime
    target_upgrade_hour_sum = game_instance.expected_play_time_in_hour * \
        game_instance.upgrade_time_to_expected_play_time_ratio

    return payback_curve(upgrade_hour_sum / target_upgrade_hour_sum)


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
    return lambda level: 7*math.log(((level / max_level * 9) + 1)/3) + 12


def tile_loyalty_points(decay_dist: float):
    """
    Multiply loyalty points to a tile's guard amount at each level to determine its actual guard amount level under control of a player based on its distance from the player's capital.
    """
    return lambda dist: -math.atan(dist - decay_dist) / math.pi + 1 / 2


class Game:
    total_tile_count = 11*11
    expected_player_count = 3
    init_player_tile_count = 1

    expected_play_time_in_hour = 2

    upgrade_time_to_expected_play_time_ratio = 1/3
    """
    Ratio of time spent on upgrading in the whole game
    """

    init_player_goldmine_count = 1
    """
    How many goldmines avg players have when capital level is 1
    Determine resource density. Note that one of the goldmines is capital
    """

    init_player_farm_count = 1
    """
    How many farms avg players have when capital level is 1
    Determine resource density. Note that one of the farms is capital
    """

    player_login_interval_in_minutes = 20
    """
    Mainly determine building cap
    """

    max_capital_level = 5
    """
    Capital max level
    """

    capital_level_to_building_level = 3
    """
    Building levels that each capital level upgrade unlocks. NOTE: same constant is used for barbarians & tiles
    """

    player_action_in_seconds = 100
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
    Example: player capital is lv3, then its army should equal lv7 - 9 barbarians (avg is 8) if constant is 100
    """

    capital_migration_cooldown_ratio = 10
    """
    Determine the cooldown time to migrate a capital. It's x% relative to the upgrade payback period
    """

    building_upgrade_cooldown_ratio = 5
    """
    Determine the cooldown time to migrate a capital. It's x% relative to the upgrade payback period
    """

    chaos_period_in_seconds = 100
    """
    Determine how long chaos period lasts for a capital
    """

    super_tile_init_time_in_hour = 0.5
    """
    Determine when the super tile becomes active
    """

    move_capital_to_upgrade_cost_ratio = 0.2
    troop_cap_to_buildings_cap_ratio = 0.3
    troop_gathering_bonus = 10
    barbarian_cooldown = 100
    capital_gold_tax_factor = 30

    # Gold:
    #   Mint: Harvest (low), Gather (medium), Barbarians (high)
    #   Burn: Build (heavy), Troop (light)
    # Food:
    #   Mint: Harvest (heavy), Gather (medium), Barbarians (low)
    #   Burn: Build (low), Troop (super heavy)

    (resource_weight_light, resource_weight_low, resource_weight_medium,
     resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)

    def __init__(self, mode: GameMode) -> None:
        if mode == GameMode.THREE_PLAYER_SHORT_TEST:
            self.total_tile_count = 8*8
            self.expected_player_count = 3
            self.init_player_tile_count = 1
            self.expected_play_time_in_hour = 0.5
            self.upgrade_time_to_expected_play_time_ratio = 1/3
            self.init_player_goldmine_count = 1
            self.init_player_farm_count = 1
            self.player_login_interval_in_minutes = 15
            self.max_capital_level = 5
            self.capital_level_to_building_level = 3
            self.player_action_in_seconds = 100
            self.base_troop_training_in_seconds = 0.4
            self.barbarian_reward_to_cost_coefficient = 4
            self.tile_to_barbarian_strength_ratio = 1.5
            self.tile_troop_discount = 0.5
            self.barbarian_to_army_difficulty_constant = 60
            self.capital_migration_cooldown_ratio = 15
            self.building_upgrade_cooldown_ratio = 10
            (resource_weight_light, resource_weight_low, resource_weight_medium,
             resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)
            self.chaos_period_in_seconds = 120
            self.super_tile_init_time_in_hour = 0
            self.move_capital_to_upgrade_cost_ratio = 0.2
            self.troop_cap_to_buildings_cap_ratio = 0.3
            self.troop_gathering_bonus = 10
            self.barbarian_cooldown = 100
            self.capital_gold_tax_factor = 30
        if mode == GameMode.TEN_PLAYER_SHORT_TEST:
            self.total_tile_count = 15*15
            self.expected_player_count = 10
            self.init_player_tile_count = 1
            self.expected_play_time_in_hour = 1
            self.upgrade_time_to_expected_play_time_ratio = 1/3
            self.init_player_goldmine_count = 1
            self.init_player_farm_count = 1
            self.player_login_interval_in_minutes = 15
            self.max_capital_level = 5
            self.capital_level_to_building_level = 3
            self.player_action_in_seconds = 100
            self.base_troop_training_in_seconds = 0.4
            self.barbarian_reward_to_cost_coefficient = 4
            self.tile_to_barbarian_strength_ratio = 1.5
            self.tile_troop_discount = 0.5
            self.barbarian_to_army_difficulty_constant = 40
            self.capital_migration_cooldown_ratio = 15
            self.building_upgrade_cooldown_ratio = 15
            (resource_weight_light, resource_weight_low, resource_weight_medium,
             resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)
            self.chaos_period_in_seconds = 120
            self.super_tile_init_time_in_hour = 0
            self.move_capital_to_upgrade_cost_ratio = 0.2
            self.troop_cap_to_buildings_cap_ratio = 0.3
            self.troop_gathering_bonus = 10
            self.barbarian_cooldown = 100
            self.capital_gold_tax_factor = 30
        if mode == GameMode.FIVE_PLAYER_SHORT_TEST:
            self.total_tile_count = 12*12
            self.expected_player_count = 5
            self.init_player_tile_count = 1
            self.expected_play_time_in_hour = 1
            self.upgrade_time_to_expected_play_time_ratio = 1/3
            self.init_player_goldmine_count = 1
            self.init_player_farm_count = 1
            self.player_login_interval_in_minutes = 15
            self.max_capital_level = 5
            self.capital_level_to_building_level = 3
            self.player_action_in_seconds = 100
            self.base_troop_training_in_seconds = 0.4
            self.barbarian_reward_to_cost_coefficient = 4
            self.tile_to_barbarian_strength_ratio = 1.5
            self.tile_troop_discount = 0.5
            self.barbarian_to_army_difficulty_constant = 40
            self.capital_migration_cooldown_ratio = 15
            self.building_upgrade_cooldown_ratio = 15
            (resource_weight_light, resource_weight_low, resource_weight_medium,
             resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)
            self.chaos_period_in_seconds = 120
            self.super_tile_init_time_in_hour = 0
            self.move_capital_to_upgrade_cost_ratio = 0.2
            self.troop_cap_to_buildings_cap_ratio = 0.3
            self.troop_gathering_bonus = 10
            self.barbarian_cooldown = 100
            self.capital_gold_tax_factor = 30
        if mode == GameMode.SIX_PLAYER_LONG_TEST:
            self.total_tile_count = 13*13
            self.expected_player_count = 6
            self.init_player_tile_count = 1
            self.expected_play_time_in_hour = 72
            self.upgrade_time_to_expected_play_time_ratio = 1/3
            self.init_player_goldmine_count = 1
            self.init_player_farm_count = 1
            self.player_login_interval_in_minutes = 80
            self.max_capital_level = 6
            self.capital_level_to_building_level = 3
            self.player_action_in_seconds = 100
            self.base_troop_training_in_seconds = 0.4
            self.barbarian_reward_to_cost_coefficient = 4
            self.tile_to_barbarian_strength_ratio = 1.5
            self.tile_troop_discount = 0.5
            self.barbarian_to_army_difficulty_constant = 40
            self.capital_migration_cooldown_ratio = 15
            self.building_upgrade_cooldown_ratio = 15
            (resource_weight_light, resource_weight_low, resource_weight_medium,
             resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)
            self.chaos_period_in_seconds = 900
            self.super_tile_init_time_in_hour = 0
            self.move_capital_to_upgrade_cost_ratio = 0.2
            self.troop_cap_to_buildings_cap_ratio = 0.3
            self.troop_gathering_bonus = 10
            self.barbarian_cooldown = 100
            self.capital_gold_tax_factor = 30
        if mode == GameMode.SIX_PLAYER_SHORT_TEST:
            self.total_tile_count = 13*13
            self.expected_player_count = 6
            self.init_player_tile_count = 1
            self.expected_play_time_in_hour = 1
            self.upgrade_time_to_expected_play_time_ratio = 1/3
            self.init_player_goldmine_count = 1
            self.init_player_farm_count = 1
            self.player_login_interval_in_minutes = 15
            self.max_capital_level = 5
            self.capital_level_to_building_level = 3
            self.player_action_in_seconds = 100
            self.base_troop_training_in_seconds = 0.4
            self.barbarian_reward_to_cost_coefficient = 4
            self.tile_to_barbarian_strength_ratio = 1.5
            self.tile_troop_discount = 0.5
            self.barbarian_to_army_difficulty_constant = 40
            self.capital_migration_cooldown_ratio = 15
            self.building_upgrade_cooldown_ratio = 15
            (resource_weight_light, resource_weight_low, resource_weight_medium,
             resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)
            self.chaos_period_in_seconds = 120
            self.super_tile_init_time_in_hour = 0
            self.move_capital_to_upgrade_cost_ratio = 0.2
            self.troop_cap_to_buildings_cap_ratio = 0.3
            self.troop_gathering_bonus = 10
            self.barbarian_cooldown = 100
            self.capital_gold_tax_factor = 30
        if mode == GameMode.INTERNAL_PLAYTEST:
            self.total_tile_count = 17*17
            self.expected_player_count = 9
            self.init_player_tile_count = 3
            self.expected_play_time_in_hour = 60
            self.upgrade_time_to_expected_play_time_ratio = 1/2
            self.init_player_goldmine_count = 1
            self.init_player_farm_count = 1
            self.player_login_interval_in_minutes = 60
            self.max_capital_level = 6
            self.capital_level_to_building_level = 3
            self.player_action_in_seconds = 100
            self.base_troop_training_in_seconds = 0.5
            self.barbarian_reward_to_cost_coefficient = 4
            self.tile_to_barbarian_strength_ratio = 1.5
            self.tile_troop_discount = 4
            self.barbarian_to_army_difficulty_constant = 40
            self.capital_migration_cooldown_ratio = 15
            self.building_upgrade_cooldown_ratio = 15
            (resource_weight_light, resource_weight_low, resource_weight_medium,
             resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)
            self.chaos_period_in_seconds = 900
            self.super_tile_init_time_in_hour = 0
            self.move_capital_to_upgrade_cost_ratio = 0.2
            self.troop_cap_to_buildings_cap_ratio = 0.3
            self.troop_gathering_bonus = 10
            self.barbarian_cooldown = 100
            self.capital_gold_tax_factor = 30
        if mode == GameMode.PUBLIC_LAUNCH:
            self.total_tile_count = 51 * 51
            self.expected_player_count = 80
            self.init_player_tile_count = 3
            self.expected_play_time_in_hour = 120
            self.upgrade_time_to_expected_play_time_ratio = 1/4
            self.init_player_goldmine_count = 1
            self.init_player_farm_count = 1
            self.player_login_interval_in_minutes = 100
            self.max_capital_level = 7
            self.capital_level_to_building_level = 3
            self.player_action_in_seconds = 2000
            self.base_troop_training_in_seconds = 1
            self.barbarian_reward_to_cost_coefficient = 0.12  # temporarily problematic
            self.tile_to_barbarian_strength_ratio = 1
            self.tile_troop_discount = 4
            self.barbarian_to_army_difficulty_constant = 70
            self.capital_migration_cooldown_ratio = 15
            self.building_upgrade_cooldown_ratio = 15
            (resource_weight_light, resource_weight_low, resource_weight_medium,
             resource_weight_high, resource_weight_heavy) = (1, 3, 4, 5, 16)
            self.chaos_period_in_seconds = 900
            self.super_tile_init_time_in_hour = 0
            self.move_capital_to_upgrade_cost_ratio = 0.2
            self.troop_cap_to_buildings_cap_ratio = 0.08
            self.troop_gathering_bonus = 1.2
            self.barbarian_cooldown = 600
            self.capital_gold_tax_factor = 20
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
        game_parameters = []
        world_parameters = {}

        # Save world parameters here
        world_parameters["maxCapitalLevel"] = self.max_capital_level
        world_parameters["capitalLevelToEntityLevelRatio"] = int(
            self.capital_level_to_building_level)
        world_parameters["secondsToTrainAThousandTroops"] = int(
            self.base_troop_training_in_seconds * 1000)
        game_parameters.append({"subject": "InnerLayer", "object": "Tile", "componentName": "Size",
                               "level": 0, "functionName": "initializeTile", "value": 1920})
        game_parameters.append({"subject": "Army", "componentName": "Rate", "object": "Gold", "level": 0,
                               "functionName": "gather", "value": int(get_hourly_gather_rate_per_army(Resource.GOLD) * 1000 / 3600)})
        game_parameters.append({"subject": "Army", "componentName": "Rate", "object": "Food", "level": 0,
                               "functionName": "gather", "value": int(get_hourly_gather_rate_per_army(Resource.FOOD) * 1000 / 3600)})
        game_parameters.append({"subject": "Troop", "componentName": "Load", "object": "Resource",
                               "level": 0, "functionName": "", "value": int(resource_cap_per_troop() * 1000)})
        game_parameters.append({"subject": "Troop Production", "componentName": "Cost", "object": "Gold",
                               "level": 0, "functionName": "", "value": int(self.resource_weight_light * 1000)})
        game_parameters.append({"subject": "Troop Production", "componentName": "Cost", "object": "Food",
                               "level": 0, "functionName": "", "value": int(self.resource_weight_heavy * 1000)})
        game_parameters.append({"subject": "Settler", "componentName": "Health",
                               "object": "", "level": 0, "functionName": "", "value": 1000000000})
        game_parameters.append({"subject": "Barbarian", "componentName": "Cooldown",
                               "object": "", "level": 0, "functionName": "", "value": 30})
        game_parameters.append({"subject": "Capital", "componentName": "Cap",
                               "object": "Army", "level": 1, "functionName": "", "value": 2})
        game_parameters.append({"subject": "Capital", "componentName": "Cap",
                               "object": "Army", "level": 2, "functionName": "", "value": 2})
        game_parameters.append({"subject": "Capital", "componentName": "Cap",
                               "object": "Army", "level": 3, "functionName": "", "value": 2})
        game_parameters.append({"subject": "Capital", "componentName": "Cap",
                               "object": "Army", "level": 4, "functionName": "", "value": 3})
        game_parameters.append({"subject": "Capital", "componentName": "Cap",
                               "object": "Army", "level": 5, "functionName": "", "value": 3})
        game_parameters.append({"subject": "Capital", "componentName": "Cap",
                               "object": "Army", "level": 6, "functionName": "", "value": 3})
        game_parameters.append({"subject": "Capital", "componentName": "Cap",
                               "object": "Army", "level": 7, "functionName": "", "value": 4})
        game_parameters.append({"subject": "Inner Tile", "componentName": "Level",
                               "object": "", "level": 0, "functionName": "", "value": 7})
        game_parameters.append({"subject": "Capital", "componentName": "Amount", "object": "Gold",
                                "level": 0, "functionName": "JoinGame", "value": get_building_upgrade_cost(1, Building.CAPITAL)[0]/2})
        game_parameters.append({"subject": "Capital", "componentName": "Amount", "object": "Food",
                                "level": 0, "functionName": "JoinGame", "value": get_troop_size_by_center_level(1) * game_instance.resource_weight_heavy})

        # Building Stats
        for bt in [Building.GOLDMINE, Building.FARM, Building.CAPITAL]:
            max_building_level = 1
            building_type = bt
            if bt == Building.GOLDMINE:
                max_building_level = self.max_capital_level * \
                    self.capital_level_to_building_level
            elif bt == Building.FARM:
                max_building_level = self.max_capital_level * \
                    self.capital_level_to_building_level
            elif bt == Building.CAPITAL:
                max_building_level = self.max_capital_level

            curr_level = 0

            while curr_level <= max_building_level:
                (gold_upgrade_cost, food_upgrade_cost) = get_building_upgrade_cost(
                    curr_level, building_type)
                (gold_hourly_yield, food_hourly_yield) = get_building_hourly_yield_by_level(
                    curr_level, building_type)
                (gold_cap, food_cap) = get_building_resource_cap(
                    curr_level, building_type)
                game_parameters.append({"subject": building_type, "componentName": "Yield", "object": "Gold",
                                       "level": curr_level, "functionName": "", "value": int(gold_hourly_yield * 1000 / 3600)})
                game_parameters.append({"subject": building_type, "componentName": "Yield", "object": "Food",
                                       "level": curr_level, "functionName": "", "value": int(food_hourly_yield * 1000 / 3600)})
                game_parameters.append({"subject": building_type, "componentName": "Load", "object": "Gold",
                                       "level": curr_level, "functionName": "", "value": int(gold_cap * 1000)})
                game_parameters.append({"subject": building_type, "componentName": "Load", "object": "Food",
                                       "level": curr_level, "functionName": "", "value": int(food_cap * 1000)})
                if curr_level <= max_building_level:
                    game_parameters.append({"subject": building_type, "componentName": "Cost", "object": "Gold",
                                           "level": curr_level, "functionName": "Upgrade", "value": int(gold_upgrade_cost * 1000)})
                    game_parameters.append({"subject": building_type, "componentName": "Cost", "object": "Food",
                                           "level": curr_level, "functionName": "Upgrade", "value": int(food_upgrade_cost * 1000)})
                    game_parameters.append({"subject": building_type, "componentName": "Cooldown", "object": "", "level": curr_level,
                                           "functionName": "Upgrade", "value": int(get_building_upgrade_cooldown_in_hour(curr_level, building_type) * 3600)})
                    if building_type == Building.CAPITAL:
                        game_parameters.append({"subject": building_type, "componentName": "Cooldown", "object": "", "level": curr_level,
                                               "functionName": "Move", "value": int(get_move_capital_cooldown_in_hour(curr_level) * 3600)})
                if building_type == Building.CAPITAL:
                    game_parameters.append({"subject": "Capital", "componentName": "Load", "object": "Troop",
                                           "level": curr_level, "functionName": "", "value": 999999999})  # FIXME: hardcoded

                    (move_cost_gold, move_cost_food) = get_move_capital_cost(curr_level)
                    game_parameters.append({"subject": "Capital", "componentName": "Cost", "object": "Gold",
                                           "level": curr_level, "functionName": "Move", "value": int(move_cost_gold) * 1000})  # FIXME: hardcoded, attention @Modeo
                    game_parameters.append({"subject": "Capital", "componentName": "Cost", "object": "Food",
                                           "level": curr_level, "functionName": "Move", "value": int(move_cost_food) * 1000})  # FIXME: hardcoded, attention @Modeo
                    game_parameters.append({"subject": "Capital", "componentName": "Cooldown", "object": "",
                                           "level": curr_level, "functionName": "Chaos", "value": self.chaos_period_in_seconds})  # FIXME: hardcoded, attention @Modeo

                curr_level += 1

        # Barbarian Stats
        curr_level = 1
        while curr_level <= self.max_capital_level * self.capital_level_to_building_level:
            (reward_gold, reward_food) = get_barbarian_reward(curr_level)
            barbarian_count = get_barbarian_count_by_level(curr_level)
            game_parameters.append({"subject": "Barbarian", "componentName": "Reward", "object": "Gold",
                                   "level": curr_level, "functionName": "", "value": int(reward_gold * 1000)})
            game_parameters.append({"subject": "Barbarian", "componentName": "Reward", "object": "Food",
                                   "level": curr_level, "functionName": "", "value": int(reward_food * 1000)})
            game_parameters.append({"subject": "Barbarian", "componentName": "Amount", "object": "Guard",
                                   "level": curr_level, "functionName": "", "value": barbarian_count})
            curr_level += 1

        # Tile Stats
        curr_level = 1
        max_tile_level = self.max_capital_level * \
            self.capital_level_to_building_level

        game_parameters.append({"subject": "SuperTile", "componentName": "LastRecovered", "object": "",
                                "level": max_tile_level, "functionName": "", "value": self.super_tile_init_time_in_hour * 3600})

        while curr_level <= max_tile_level:
            tile_guard_count = get_tile_troop_count(curr_level)
            game_parameters.append({"subject": "Tile", "componentName": "Amount", "object": "Guard",
                                   "level": curr_level, "functionName": "", "value": tile_guard_count})
            # todo: currently recover cooldown is the same as upgrade
            game_parameters.append({"subject": "Tile", "componentName": "Cooldown", "object": "", "level": curr_level,
                                    "functionName": "Recover", "value": int(get_tile_upgrade_cooldown_in_second(curr_level))})
            if curr_level != max_tile_level:
                (cost_gold, cost_food) = get_tile_upgrade_cost(curr_level)
                game_parameters.append({"subject": "Tile", "componentName": "Cost", "object": "Gold",
                                       "level": curr_level, "functionName": "Upgrade", "value": int(cost_gold * 1000)})
                game_parameters.append({"subject": "Tile", "componentName": "Cost", "object": "Food",
                                       "level": curr_level, "functionName": "Upgrade", "value": int(cost_food * 1000)})
                game_parameters.append({"subject": "Tile", "componentName": "Cooldown", "object": "", "level": curr_level,
                                       "functionName": "Upgrade", "value": int(get_tile_upgrade_cooldown_in_second(curr_level))})
            curr_level += 1

        # Army Size Stats
        max_building_level = self.max_capital_level
        curr_level = 1
        while curr_level <= max_building_level:
            game_parameters.append({"subject": "Army", "componentName": "Amount", "object": "Troop",
                                   "level": curr_level, "functionName": "", "value": get_troop_size_by_center_level(curr_level)})
            # todo: refactor; tile count too low for beginner (lv1 capital upgrade too expensive)
            if (curr_level == 1):
                game_parameters.append({"subject": "Nation", "componentName": "Amount", "object": "Tile", "level": curr_level,
                                        "functionName": "", "value": 3})
            else:
                game_parameters.append({"subject": "Nation", "componentName": "Amount", "object": "Tile", "level": curr_level,
                                        "functionName": "", "value": self.init_player_tile_count + (curr_level - 1) * int(get_capital_tiles_interval())})
            curr_level += 1

        # For Foundry:
        # - Order object keys in game and world parameters for loading into Foundry
        # - Export into individual JSON files
        def trunc(d: dict):
            d["level"] = int(d["level"])
            d["value"] = int(d["value"])
            return d

        def order(d: dict): return OrderedDict(sorted(d.items()))

        game_parameters = list(map(trunc, list(map(order, game_parameters))))
        world_parameters = order(world_parameters)
        for bt in range(len(game_parameters)):
            with open("test/data/game_parameter_%d.json" % bt, "w+") as outfile:
                outfile.write(json.dumps(game_parameters[bt], indent=4))

        # Dump JSON
        with open("tasks/game_parameters.json", "w+") as outfile:
            outfile.write(json.dumps(game_parameters, indent=4))
        with open("tasks/world_parameters.json", "w+") as outfile:
            outfile.write(json.dumps(world_parameters, indent=4))
        print('GodOS: generated and exported parameters into json')

    # def export_excel_parameters(self):
    #     # Tile Stats
    #     # Initialize tile_stats as an empty DataFrame
    #     tile_stats = pd.DataFrame(columns=[
    #                               'Level', 'Cooldown(s): Upgrade', 'Cost: Gold', 'Cost: Food', 'Amount: Guard'])

    #     # Assign the maximum level of the tile
    #     max_tile_level = self.max_capital_level * \
    #         self.capital_level_to_building_level

    #     # Initialize curr_level
    #     curr_level = 1

    #     # Loop through all the levels of the tile
    #     while curr_level <= max_tile_level:
    #         level = 'lv' + str(curr_level)
    #         (cost_gold, cost_food) = get_tile_upgrade_cost(curr_level)

    #         tile_stats = tile_stats.append({
    #             'Level': level,
    #             'Cooldown(s): Upgrade': int(get_tile_upgrade_cooldown_in_second(curr_level)),
    #             'Cost: Gold': int(cost_gold * 1000),
    #             'Cost: Food': int(cost_food * 1000),
    #             'Amount: Guard': int(get_tile_troop_count(curr_level))},
    #             ignore_index=True)

    #         curr_level += 1

    #     # Building Stats
    #     # Initialize building_stats as an empty DataFrame
    #     capital_stats = pd.DataFrame(columns=['Level', 'Cooldown(s): Upgrade', 'Upgrade Cost: Gold', 'Upgrade Cost: Food', 'Cooldown(s): moveCapital',
    #                                  'Move Cost: Gold', 'Move Cost: Food', 'Yield(s): Gold', 'Yield(s): Food', 'Cap: Food', 'Cap: Gold', 'Army Size', 'Tile Count'])
    #     goldmine_stats = pd.DataFrame(columns=[
    #                                   'Level', 'Cooldown(s): Upgrade', 'Upgrade Cost: Gold', 'Upgrade Cost: Food', 'Yield(s): Gold', 'Cap: Gold'])
    #     farm_stats = pd.DataFrame(columns=['Level', 'Cooldown(s): Upgrade',
    #                               'Upgrade Cost: Gold', 'Upgrade Cost: Food', 'Yield(s): Food', 'Cap: Food'])

    #     for bt in [Building.GOLDMINE, Building.FARM, Building.CAPITAL]:
    #         max_building_level = 1
    #         building_type = bt
    #         if bt == Building.GOLDMINE:
    #             max_building_level = self.max_capital_level * \
    #                 self.capital_level_to_building_level
    #         elif bt == Building.FARM:
    #             max_building_level = self.max_capital_level * \
    #                 self.capital_level_to_building_level
    #         elif bt == Building.CAPITAL:
    #             max_building_level = self.max_capital_level

    #         curr_level = 1

    #         while curr_level <= max_building_level:
    #             level = 'lv' + str(curr_level)
    #             (gold_upgrade_cost, food_upgrade_cost) = get_building_upgrade_cost(
    #                 curr_level, building_type)
    #             (gold_hourly_yield, food_hourly_yield) = get_building_hourly_yield_by_level(
    #                 curr_level, building_type)
    #             (gold_cap, food_cap) = get_building_resource_cap(
    #                 curr_level, building_type)
    #             if bt == Building.CAPITAL and curr_level > 0:
    #                 tile_count = self.init_player_tile_count + \
    #                     (curr_level - 1) * get_capital_tiles_interval()
    #                 (move_cost_gold, move_cost_food) = get_move_capital_cost(curr_level)
    #                 capital_stats = capital_stats.append({
    #                     'Level': level,
    #                     'Cooldown(s): Upgrade': int((get_building_upgrade_cooldown_in_hour(curr_level, building_type) * 3600)),
    #                     'Upgrade Cost: Gold': int(gold_upgrade_cost * 1000),
    #                     'Upgrade Cost: Food': int(food_upgrade_cost * 1000),
    #                     'Cooldown(s): moveCapital': int(get_move_capital_cooldown_in_hour(curr_level) * 3600),
    #                     'Move Cost: Gold': int(move_cost_gold * 1000),
    #                     'Move Cost: Food': int(move_cost_food * 1000),
    #                     'Yield(s): Gold': int(gold_hourly_yield * 1000 / 3600),
    #                     'Yield(s): Food': int(food_hourly_yield * 1000 / 3600),
    #                     'Cap: Food': int(food_cap * 1000),
    #                     'Cap: Gold': int(gold_cap * 1000),
    #                     'Army Size': int(get_troop_size_by_center_level(curr_level)),
    #                     'Tile Count': int(tile_count)},
    #                     ignore_index=True)
    #             if bt == Building.GOLDMINE:
    #                 goldmine_stats = goldmine_stats.append({
    #                     'Level': level,
    #                     'Cooldown(s): Upgrade': int(get_building_upgrade_cooldown_in_hour(curr_level, building_type) * 3600),
    #                     'Upgrade Cost: Gold': int(gold_upgrade_cost * 1000),
    #                     'Upgrade Cost: Food': int(food_upgrade_cost * 1000),
    #                     'Yield(s): Gold': int(gold_hourly_yield),
    #                     'Cap: Gold': int(gold_cap * 1000)},
    #                     ignore_index=True)
    #             if bt == Building.FARM:
    #                 farm_stats = farm_stats.append({
    #                     'Level': level,
    #                     'Cooldown(s): Upgrade': int(get_building_upgrade_cooldown_in_hour(curr_level, building_type) * 3600),
    #                     'Upgrade Cost: Gold': int(gold_upgrade_cost * 1000),
    #                     'Upgrade Cost: Food': int(food_upgrade_cost * 1000),
    #                     'Yield(s): Food': int(food_hourly_yield * 1000 / 3600),
    #                     'Cap: Food': int(food_cap * 1000)},
    #                     ignore_index=True)

    #             curr_level += 1

    #     # Stats for Analytics
    #     payback_stats = pd.DataFrame(
    #         columns=['Level', 'Goldmine PB (hr)', 'Farm PB (hr)'])

    #     curr_level = 1
    #     max_building_level = self.max_capital_level * \
    #         self.capital_level_to_building_level
    #     while curr_level < max_building_level:
    #         level = 'lv' + str(curr_level)
    #         (goldmine_gold_upgrade_cost, a) = get_building_upgrade_cost(
    #             curr_level, Building.GOLDMINE)
    #         (a, farm_food_upgrade_cost) = get_building_upgrade_cost(
    #             curr_level, Building.FARM)

    #         (goldmine_gold_nextlv_yield, a) = get_building_hourly_yield_by_level(
    #             curr_level + 1, Building.GOLDMINE)
    #         (a, farm_food_nextlv_yield) = get_building_hourly_yield_by_level(
    #             curr_level + 1, Building.FARM)

    #         mine_pay_back_hrs = goldmine_gold_upgrade_cost / goldmine_gold_nextlv_yield
    #         farm_pay_back_hrs = farm_food_upgrade_cost / farm_food_nextlv_yield

    #         payback_stats = payback_stats.append({
    #             'Level': level,
    #             'Goldmine PB (hr)': mine_pay_back_hrs,
    #             'Farm PB (hr)': farm_pay_back_hrs},
    #             ignore_index=True)

    #         curr_level += 1

    #     gather_stats = pd.DataFrame(columns=['Capital Level', 'Army Size', '# Gatherings to Upgrade',
    #                                 'Gold Gathering Time (s)', 'Food Gathering Time (s)', '# (hr) Maximal Troop Production'])

    #     curr_level = 1
    #     tile_count_limit = 3
    #     while curr_level < self.max_capital_level:
    #         level = 'lv' + str(curr_level)
    #         army_size = get_troop_size_by_center_level(curr_level)
    #         gathering_capacity = army_size * resource_cap_per_troop()
    #         # only consider gold cost
    #         (gold_upgrade_cost, food_upgrade_cost) = get_building_upgrade_cost(
    #             curr_level, Building.CAPITAL)

    #         times_gathering_to_upgrade = gold_upgrade_cost / gathering_capacity

    #         tile_count_limit += get_capital_tiles_interval()
    #         projected_farm_count = expected_farm_density() * tile_count_limit
    #         (gold_yield, food_yield) = get_building_hourly_yield_by_level(
    #             get_capital_level_to_building_level() * curr_level, Building.FARM)
    #         projected_max_food_hourly_yield = projected_farm_count * food_yield

    #         gold_gathering_rate = get_hourly_gather_rate_per_army(
    #             Resource.GOLD)
    #         food_gathering_rate = get_hourly_gather_rate_per_army(
    #             Resource.FOOD)

    #         gather_stats = gather_stats.append({
    #             'Capital Level': level,
    #             'Army Size': army_size,
    #             '# Gatherings to Upgrade': times_gathering_to_upgrade,
    #             'Gold Gathering Time (s)': gathering_capacity / gold_gathering_rate * 3600,
    #             'Food Gathering Time (s)': gathering_capacity / food_gathering_rate * 3600,
    #             '# (hr) Maximal Troop Production': projected_max_food_hourly_yield / game_instance.resource_weight_heavy
    #         }, ignore_index=True)

    #         curr_level += 1

    #     barbarian_stats = pd.DataFrame(
    #         columns=['Capital Level', '# Defeats to Upgrade'])
    #     # Note: barbarians are always 4 or 8 levels in this version
    #     (reward_gold, reward_food) = get_barbarian_reward(6)

    #     curr_level = 1
    #     while curr_level < self.max_capital_level:
    #         level = 'lv' + str(curr_level)
    #         (gold_upgrade_cost, food_upgrade_cost) = get_building_upgrade_cost(
    #             curr_level, Building.CAPITAL)

    #         barbarian_stats = barbarian_stats.append({
    #             'Capital Level': level,
    #             '# Defeats to Upgrade': gold_upgrade_cost / reward_gold
    #         }, ignore_index=True)

    #         curr_level += 1

    #     # Export tile_stats into an excel file
    #     filepath = os.path.join(os.path.expanduser('~'), 'Desktop')
    #     filename = 'treaty_raw_stats.xlsx'
    #     file_path = os.path.join(filepath, filename)

    #     # Create an ExcelWriter object
    #     writer = pd.ExcelWriter(file_path, engine='xlsxwriter')

    #     # Write the DataFrame 'tile_stats' to sheet 'Tile'
    #     tile_stats.to_excel(writer, sheet_name='Tile', index=False)
    #     capital_stats.to_excel(writer, sheet_name='Capital', index=False)
    #     goldmine_stats.to_excel(writer, sheet_name='Gold Mine', index=False)
    #     farm_stats.to_excel(writer, sheet_name='Farms', index=False)
    #     payback_stats.to_excel(writer, sheet_name='Payback Stats', index=False)
    #     gather_stats.to_excel(writer, sheet_name='Gather Stats', index=False)
    #     barbarian_stats.to_excel(
    #         writer, sheet_name='Barbarian Stats', index=False)

    #     # Save the excel file
    #     writer.save()
    #     print('GodOS: generated and exported parameters into excel')


# change here when switching game mode
game_instance = Game(GameMode.PUBLIC_LAUNCH)
game_instance.export_json_parameters()
# game_instance.export_excel_parameters()
