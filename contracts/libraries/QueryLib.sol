//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Component} from "contracts/Component.sol";
import {QueryCondition, QueryType, U256} from "contracts/libraries/Types.sol";
import {LinkedList, LinkedListLib} from "lib/memmove/src/LinkedList.sol";

struct QueryVars {
    LinkedList entities;
    uint256 numEntities;
    bool initialCondition;
}

library QueryLib {
    using LinkedListLib for LinkedList;

    function nodeToPointer(U256 memory n) internal pure returns (bytes32 p) {
        /// @solidity memory-safe-assembly
        assembly {
            p := n
        }
    }

    function pointerToNode(bytes32 p) internal pure returns (U256 memory n) {
        /// @solidity memory-safe-assembly
        assembly {
            n := p
        }
    }

    function isConditionMet(QueryCondition memory condition, uint256 entity) internal view returns (bool) {
        if (condition.queryType == QueryType.Has) {
            return condition.component.has(entity);
        } else if (condition.queryType == QueryType.HasNot) {
            return !condition.component.has(entity);
        } else if (condition.queryType == QueryType.IsExactly) {
            return keccak256(condition.value) == keccak256(condition.component.getBytesValue(entity));
        } else if (condition.queryType == QueryType.IsNot) {
            return keccak256(condition.value) != keccak256(condition.component.getBytesValue(entity));
        } else {
            revert("CURIO: Unsupported query type");
        }
    }

    /**
     * Execute the given query and return a list of entity ids
     * @param conditions List of query conditions to execute
     * @return entities List of entities matching the query
     */
    function query(QueryCondition[] memory conditions) internal view returns (uint256[] memory) {
        QueryVars memory v = QueryVars({entities: LinkedListLib.newLinkedList(32), numEntities: 0, initialCondition: true});

        // Process conditions
        for (uint256 i; i < conditions.length; i++) {
            QueryCondition memory condition = conditions[i];
            if (v.initialCondition) {
                // Handle entity query conditions
                // First regular condition must be Has or IsExactly
                require(condition.queryType == QueryType.Has || condition.queryType == QueryType.IsExactly, "CURIO: First query condition must be Has or IsExactly");
                v.initialCondition = false;

                // Create the first interim result
                uint256[] memory entityArray = condition.queryType == QueryType.Has ? condition.component.getEntities() : condition.component.getEntitiesWithValue(condition.value);

                v.entities = arrayToList(entityArray);
                v.numEntities = entityArray.length;
            } else {
                // There already is an interim result, apply the current condition
                LinkedList nextEntities = LinkedListLib.newLinkedList(32);
                uint256 nextNumEntities = 0;
                bool hasNext = true;
                bytes32 element = v.entities.head();

                // Iterate through the current interim result
                while (hasNext) {
                    U256 memory node = pointerToNode(element);
                    uint256 entity = node.value;

                    // Branch 1: Simple / check if the current entity passes the query condition
                    bool passes = isConditionMet(condition, entity);

                    // If the entity passes the query condition, add it to the new interim result
                    if (passes) {
                        nextEntities = nextEntities.push_and_link(nodeToPointer(U256(entity, 0)));
                        nextNumEntities++;
                    }

                    // Move to the next entity
                    (hasNext, element) = v.entities.next(element);
                }

                // Update interim result
                v.entities = nextEntities;
                v.numEntities = nextNumEntities;
            }
        }

        return listToArray(v.entities, v.numEntities);
    }

    function listToArray(LinkedList list, uint256 length) public pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](length);
        if (length == 0) return array;

        bool hasNext = true;
        bytes32 element = list.head();
        uint256 i = 0;

        while (hasNext) {
            U256 memory node = pointerToNode(element);
            array[i] = node.value;
            (hasNext, element) = list.next(element);
            i++;
        }

        return array;
    }

    function arrayToList(uint256[] memory array) public pure returns (LinkedList) {
        LinkedList list = LinkedListLib.newLinkedList(32);
        for (uint256 i = 0; i < array.length; i++) {
            list = list.push_and_link(nodeToPointer(U256(array[i], 0)));
        }

        return list;
    }
}
