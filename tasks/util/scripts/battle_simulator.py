from enum import Enum
import math
import time
from typing import List

# Note: Currently battle inflicts damage as soon as attack takes place, giving a slight advantage to the first attacker. The alternative is to do so after each round.

class TroopType(Enum):
    CAVALRY = 0
    INFANTRY = 1
    ARCHER = 2


class Troop:
    def __init__(self, health: int, attack: int, defense: int, troop_type: int) -> None:
        self.health = health
        self.attack = attack
        self.defense = defense
        self.troop_type = troop_type


class Army:
    def __init__(self, troops: List[Troop], amounts: List[int]) -> None:
        self.troops = troops
        self.amounts = amounts
    
    @property
    def troop_count(self) -> int:
        return sum(self.amounts)

    @property
    def is_dead(self) -> bool:
        return self.troop_count <= 0


def get_damage_bonus(troop_type_a: TroopType, troop_type_b: TroopType) -> float:
    if troop_type_a.value == troop_type_b.value:
        return 1
    if (troop_type_a.value - troop_type_b.value) % 3 == 1:
        return 1.4
    else:
        return 0.6


def battle(army_a: Army, army_b: Army) -> None:
    while True:
        # Army A attacks Army B
        print("A attacks B!")
        for i in range(len(army_a.troops)):
            troop_count = army_a.amounts[i]
            if not troop_count:
                continue
            for j in range(len(army_b.troops)):
                loss = (troop_count * army_a.troops[i].attack * get_damage_bonus(army_a.troops[i].troop_type, army_b.troops[j].troop_type) / army_b.troops[j].defense / army_b.troops[j].health) * 2 * math.sqrt(10000 / troop_count)
                army_b.amounts[j] -= min(loss, army_b.amounts[j])
        
        for j in range(len(army_b.troops)):
            print(f"Army B {army_b.troops[j].troop_type} Count: {army_b.amounts[j]}")
        
        if army_b.is_dead:
            print("Army A won!")
            break
        # time.sleep(0.6)

        # Army B attacks Army A
        print("B attacks A!")
        for j in range(len(army_b.troops)):
            troop_count = army_b.amounts[j]
            if not troop_count:
                continue
            for i in range(len(army_a.troops)):
                loss = (troop_count * army_b.troops[j].attack * get_damage_bonus(army_b.troops[j].troop_type, army_a.troops[i].troop_type) / army_a.troops[i].defense / army_a.troops[i].health) * 2 * math.sqrt(10000 / troop_count)
                army_a.amounts[i] -= min(loss, army_a.amounts[i])

        for i in range(len(army_a.troops)):
            print(f"Army A {army_a.troops[i].troop_type} Count: {army_a.amounts[i]}")

        if army_a.is_dead:
            print("Army B won!")
            break
        # time.sleep(0.6)

    return


cavalry = Troop(120, 60, 120, TroopType.CAVALRY)
infantry = Troop(120, 60, 120, TroopType.INFANTRY)
archer = Troop(120, 60, 120, TroopType.ARCHER)

army_a = Army([cavalry, infantry], [3000, 3000])
army_b = Army([cavalry], [6000])
battle(army_a, army_b)
