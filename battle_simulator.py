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
    def is_dead(self) -> bool:
        return sum(self.amounts) <= 0
    
    @property
    def troop_count(self) -> int:
        return sum(self.amounts)

def get_damage_bonus(troop_type_a: TroopType, troop_type_b: TroopType) -> float:
    if troop_type_a.value == troop_type_b.value:
        return 1
    if (troop_type_a.value - troop_type_b.value) % 3 == 1:
        return 1.2
    else:
        return 0.8

def battle(army_a: Army, army_b: Army) -> None:
    while True:
        # Army A attacks Army B
        for i in range(len(army_a.troops)):
            troop_count = army_a.amounts[i]
            for j in range(len(army_b.troops)):
                loss = 0 if not troop_count else (troop_count * army_a.troops[i].attack * get_damage_bonus(army_a.troops[i].troop_type, army_b.troops[j].troop_type) / army_b.troops[j].defense / army_b.troops[j].health) * 2 * math.sqrt(10000/troop_count)
                army_b.amounts[j] -= min(loss, army_b.amounts[j])
        
        print("A attacks B!")
        print("Army A count", army_a.troop_count)
        print("Army B count", army_b.troop_count)
        if army_b.is_dead:
            print("Army A won!")
            break
        time.sleep(1.5)

        # Army B attacks Army A
        for j in range(len(army_b.troops)):
            troop_count = army_b.amounts[j]
            for i in range(len(army_a.troops)):
                loss = 0 if not troop_count else (troop_count * army_b.troops[j].attack * get_damage_bonus(army_b.troops[j].troop_type, army_a.troops[i].troop_type) / army_a.troops[i].defense / army_a.troops[i].health) * 2 * math.sqrt(10000/troop_count)
                army_a.amounts[i] -= min(loss, army_a.amounts[i])

        print("B attacks A!")
        print("Army A count", army_a.troop_count)
        print("Army B count", army_b.troop_count)
        if army_a.is_dead:
            print("Army B won!")
            break
        time.sleep(1.5)

    return

cavalry = Troop(120, 60, 120, TroopType.CAVALRY)
infantry = Troop(120, 60, 120, TroopType.INFANTRY)
archer = Troop(120, 60, 120, TroopType.ARCHER)

army_a = Army([cavalry, infantry, archer], [1000, 500, 200])
army_b = Army([cavalry, archer], [500, 800])
battle(army_a, army_b)