// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.13;
import {Component} from "contracts/Component.sol";
import {QueryCondition, QueryType} from "contracts/libraries/Types.sol";
import "lib/memmove/src/LinkedList.sol";

struct Uint256Node {
    uint256 value;
    uint256 next;
}

function pointer(Uint256Node memory a) pure returns (bytes32 ptr) {
    /// @solidity memory-safe-assembly
    assembly {
        ptr := a
    }
}

function fromPointer(bytes32 ptr) pure returns (Uint256Node memory a) {
    /// @solidity memory-safe-assembly
    assembly {
        a := ptr
    }
}

function isPositiveCondition(QueryCondition memory condition) pure returns (bool) {
    return condition.queryType == QueryType.Has || condition.queryType == QueryType.IsExactly;
}

function isNegativeCondition(QueryCondition memory condition) pure returns (bool) {
    return condition.queryType == QueryType.HasNot || condition.queryType == QueryType.IsNot;
}

function isSettingCondition(QueryCondition memory condition) pure returns (bool) {
    return condition.queryType == QueryType.ProxyRead || condition.queryType == QueryType.ProxyExpand;
}

function isEntityCondition(QueryCondition memory condition) pure returns (bool) {
    return condition.queryType == QueryType.Has || condition.queryType == QueryType.IsExactly || condition.queryType == QueryType.HasNot || condition.queryType == QueryType.IsNot;
}

function passesQueryCondition(uint256 entity, QueryCondition memory condition) view returns (bool) {
    if (condition.queryType == QueryType.Has) {
        // Entity must have given component
        return condition.component.has(entity);
    }

    if (condition.queryType == QueryType.IsExactly) {
        // Entity must have the given component value
        return keccak256(condition.value) == keccak256(condition.component.getBytesValue(entity));
    }

    if (condition.queryType == QueryType.HasNot) {
        // Entity must not have the given value
        return !condition.component.has(entity);
    }

    if (condition.queryType == QueryType.IsNot) {
        // Entity must not have the given component value
        return keccak256(condition.value) != keccak256(condition.component.getBytesValue(entity));
    }

    require(isEntityCondition(condition), "NO_ENTITY_CONDITION");
    return false;
}

function passesQueryConditionProxy(
    uint256 entity,
    QueryCondition memory condition,
    QueryCondition memory proxyRead
) view returns (bool passes, bool proxyFound) {
    require(isEntityCondition(condition), "NO_ENTITY_CONDITION");
    require(proxyRead.queryType == QueryType.ProxyRead, "NO_PROXY_READ_CONDITION");

    uint256 proxyEntity = entity;

    for (uint256 i; i < abi.decode(proxyRead.value, (uint256)); i++) {
        // If the current entity does not have the proxy component, abort
        if (!proxyRead.component.has(proxyEntity)) {
            return (passes, false);
        }

        // Move up the proxy chain
        proxyEntity = abi.decode(proxyRead.component.getBytesValue(proxyEntity), (uint256));
        passes = passesQueryCondition(proxyEntity, condition);

        if (isBreakingPassState(passes, condition)) {
            return (passes, true);
        }
    }
    return (passes, true);
}

/**
 * For positive conditions (Has/IsExactly) we need to find any passing entity up the proxy chain
 * so as soon as passes is true, we can early return. For negative conditions (HasNot/IsNot) every entity
 * up the proxy chain must pass, so we can early return if we find one that doesn't pass.
 */
function isBreakingPassState(bool passes, QueryCondition memory condition) pure returns (bool) {
    return (passes && isPositiveCondition(condition)) || (!passes && isNegativeCondition(condition));
}

struct QueryVars {
    LinkedList entities;
    uint256 numEntities;
    QueryCondition proxyRead;
    QueryCondition proxyExpand;
    bool initialCondition;
}

library QueryLib {
    using LinkedListLib for LinkedList;

    /**
     * Execute the given query and return a list of entity ids
     * @param conditions List of query conditions to execute
     * @return entities List of entities matching the query
     */
    function query(QueryCondition[] memory conditions) internal view returns (uint256[] memory) {
        QueryVars memory v;
        v.entities = LinkedListLib.newLinkedList(32);
        v.numEntities = 0;
        v.proxyRead;
        v.proxyExpand;
        v.initialCondition = true;

        // Process conditions
        for (uint256 i; i < conditions.length; i++) {
            QueryCondition memory condition = conditions[i];
            if (isSettingCondition(condition)) {
                // Store setting conditions for subsequent query conditions
                if (condition.queryType == QueryType.ProxyRead) v.proxyRead = condition;
                if (condition.queryType == QueryType.ProxyExpand) v.proxyExpand = condition;
            } else if (v.initialCondition) {
                // Handle entity query conditions
                // First regular condition must be Has or IsExactly
                require(isPositiveCondition(condition), "NEGATIVE_INITIAL_CONDITION");
                v.initialCondition = false;

                // Create the first interim result
                uint256[] memory entityArray = condition.queryType == QueryType.Has ? condition.component.getEntities() : condition.component.getEntitiesWithValue(condition.value);

                v.entities = arrayToList(entityArray);
                v.numEntities = entityArray.length;

                // Add entity's children up to the specified depth if proxy expand is active,
                if ((address(v.proxyExpand.component) != address(0)) && abi.decode(v.proxyExpand.value, (uint256)) > 0) {
                    for (uint256 ctr; ctr < entityArray.length; ctr++) {
                        uint256[] memory childEntities = getChildEntities(entityArray[ctr], v.proxyExpand.component, abi.decode(v.proxyExpand.value, (uint256)));

                        for (uint256 childIndex; childIndex < childEntities.length; childIndex++) {
                            v.entities = v.entities.push_and_link(pointer(Uint256Node(childEntities[childIndex], 0)));
                            v.numEntities++;
                        }
                    }
                }
            } else {
                // There already is an interim result, apply the current condition
                LinkedList nextEntities = LinkedListLib.newLinkedList(32);
                uint256 nextNumEntities = 0;
                bool success = true;
                bytes32 element = v.entities.head();

                // Iterate through the current interim result
                while (success) {
                    Uint256Node memory node = fromPointer(element);
                    uint256 entity = node.value;

                    // Branch 1: Simple / check if the current entity passes the query condition
                    bool passes = passesQueryCondition(entity, condition);

                    // Branch 2: Proxy upwards / check if proxy entity passes the query
                    passes = _processProxyRead(v, condition, entity, passes);

                    // If the entity passes the query condition, add it to the new interim result
                    if (passes) {
                        nextEntities = nextEntities.push_and_link(pointer(Uint256Node(entity, 0)));
                        nextNumEntities++;
                    }

                    // Branch 3: Proxy downwards / run the query conditions on child entities if proxy expand is active
                    (nextEntities, nextNumEntities) = _processProxyExpand(v, condition, entity, nextEntities, nextNumEntities);

                    // Move to the next entity
                    (success, element) = v.entities.next(element);
                }

                // Update interim result
                v.entities = nextEntities;
                v.numEntities = nextNumEntities;
            }
        }

        return listToArray(v.entities, v.numEntities);
    }

    // Branch 2: Proxy upwards / check if proxy entity passes the query
    function _processProxyRead(
        QueryVars memory v,
        QueryCondition memory condition,
        uint256 entity,
        bool passes
    ) internal view returns (bool) {
        if (address(v.proxyRead.component) != address(0) && abi.decode(v.proxyRead.value, (uint256)) > 0 && !isBreakingPassState(passes, condition)) {
            (bool newPasses, bool proxyFound) = passesQueryConditionProxy(entity, condition, v.proxyRead);
            if (proxyFound) return newPasses;
        }
        return passes;
    }

    // Branch 3: Proxy downwards / run the query conditions on child entities if proxy expand is active
    function _processProxyExpand(
        QueryVars memory v,
        QueryCondition memory condition,
        uint256 entity,
        LinkedList nextEntities,
        uint256 nextNumEntities
    ) internal view returns (LinkedList, uint256) {
        if ((address(v.proxyExpand.component) != address(0)) && abi.decode(v.proxyExpand.value, (uint256)) > 0) {
            uint256[] memory childEntities = getChildEntities(entity, v.proxyExpand.component, abi.decode(v.proxyExpand.value, (uint256)));

            for (uint256 ctr; ctr < childEntities.length; ctr++) {
                uint256 childEntity = childEntities[ctr];

                // Add the child entity if it passes the direct check
                bool childPasses = passesQueryCondition(childEntity, condition);

                // or if a proxy read is active and it passes the proxy read check
                if (!childPasses && address(v.proxyRead.component) != address(0) && abi.decode(v.proxyRead.value, (uint256)) > 0) {
                    (bool proxyPasses, bool proxyFound) = passesQueryConditionProxy(childEntity, condition, v.proxyRead);
                    if (proxyFound) childPasses = proxyPasses;
                }

                if (childPasses) {
                    nextEntities = nextEntities.push_and_link(pointer(Uint256Node(entity, 0)));
                    nextNumEntities++;
                }
            }
        }

        return (nextEntities, nextNumEntities);
    }

    /**
     * Recursively computes all direct and indirect child entities up to the specified depth
     * @param entity Entity to get all child entities up to the specified depth
     * @param component Entity reference component
     * @param depth Depth up to which the recursion should be applied
     * @return Set of entities that are child entities of the given entity via the given component
     */
    function getChildEntities(
        uint256 entity,
        Component component,
        uint256 depth
    ) internal view returns (uint256[] memory) {
        if (depth == 0) return new uint256[](0);

        uint256[] memory directChildren = component.getEntitiesWithValue(abi.encode(entity));
        if (depth == 1) return directChildren;

        LinkedList indirectChildList = LinkedListLib.newLinkedList(32);
        uint256 numIndirectChildren = 0;

        for (uint256 i; i < directChildren.length; i++) {
            uint256[] memory indirectChildren = getChildEntities(directChildren[i], component, depth - 1);
            for (uint256 j; j < indirectChildren.length; j++) {
                indirectChildList = indirectChildList.push_and_link(pointer(Uint256Node(indirectChildren[j], 0)));
                numIndirectChildren++;
            }
        }

        uint256[] memory allChildren = listToArray(indirectChildList, numIndirectChildren + directChildren.length);
        for (uint256 i; i < directChildren.length; i++) {
            allChildren[numIndirectChildren + i] = directChildren[i];
        }

        return allChildren;
    }

    function getValueWithProxy(
        Component component,
        uint256 entity,
        Component proxyComponent,
        uint256 depth
    ) internal view returns (bytes memory value, bool found) {
        uint256 proxyEntity = entity;
        for (uint256 i; i <= depth; i++) {
            // Check if the current entity has the requested value
            if (component.has(proxyEntity)) return (component.getBytesValue(proxyEntity), true);

            // Abort if the current entity has no value in the proxy component
            if (!proxyComponent.has(proxyEntity)) {
                return (new bytes(0), false);
            }

            // Move up the proxy chain
            proxyEntity = abi.decode(proxyComponent.getBytesValue(proxyEntity), (uint256));
        }

        return (new bytes(0), false);
    }

    /**
     * Helper function to turn a linked list into an array
     */
    function listToArray(LinkedList list, uint256 length) public pure returns (uint256[] memory array) {
        array = new uint256[](length);
        if (length == 0) return array;

        bool success = true;
        bytes32 element = list.head();
        uint256 i = 0;

        while (success) {
            Uint256Node memory node = fromPointer(element);
            array[i] = node.value;
            i++;
            (success, element) = list.next(element);
        }
    }

    /**
     * Helper function to turn an array into a linked list
     */
    function arrayToList(uint256[] memory array) public pure returns (LinkedList list) {
        list = LinkedListLib.newLinkedList(32);
        for (uint256 i; i < array.length; i++) {
            list = list.push_and_link(pointer(Uint256Node(array[i], 0)));
        }
    }
}
