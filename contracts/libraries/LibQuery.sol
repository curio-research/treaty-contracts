// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import {Component} from "./Component.sol";

enum QueryType {
    Has,
    Not,
    HasValue
}

struct QueryFragment {
    QueryType queryType;
    Component component;
    bytes value;
}

library LibQuery {
    function query(QueryFragment[] memory fragments) internal view returns (uint256[] memory) {
        require(fragments[0].queryType == QueryType.Has || fragments[0].queryType == QueryType.HasValue, "Has/HasValue required");

        uint256[] memory firstFragmentEntities = fragments[0].queryType == QueryType.HasValue ? fragments[0].component.getEntitiesWithValue(fragments[0].value) : fragments[0].component.getEntities();

        // If only one fragment is given, return immediately
        if (fragments.length == 1) return firstFragmentEntities;

        uint256[] memory tempEntities = new uint256[](firstFragmentEntities.length);
        uint256 numEntities = 0;

        // Iterate through firstFragmentEntities to discard entities that don't meet the requirements
        for (uint256 i = 0; i < firstFragmentEntities.length; i++) {
            uint256 entity = firstFragmentEntities[i];
            bool include = true;

            for (uint256 j = 1; j < fragments.length; j++) {
                QueryFragment memory fragment = fragments[j];

                // For Has fragments, include entity if it is included in the component
                if (fragment.queryType == QueryType.Has) {
                    include = fragment.component.has(entity);
                }

                // For Not fragments, include entity if it is not included in the component
                if (fragment.queryType == QueryType.Not) {
                    include = !fragment.component.has(entity);
                }

                // For HasValue fragments, include entity if it has the requested value
                if (fragment.queryType == QueryType.HasValue) {
                    include = keccak256(fragment.value) == keccak256(fragment.component.getRawValue(entity));
                }

                if (!include) break;
            }

            if (include) {
                tempEntities[numEntities] = entity;
                numEntities++;
            }
        }

        // Copy to array of correct length
        uint256[] memory entities = new uint256[](numEntities);
        for (uint256 i; i < numEntities; i++) {
            entities[i] = tempEntities[i];
        }

        return entities;
    }
}
