// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import {Component} from "contracts/Component.sol";

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
    function query(QueryFragment[] memory _fragments) internal view returns (uint256[] memory) {
        require(_fragments[0].queryType == QueryType.Has || _fragments[0].queryType == QueryType.HasValue, "Has/HasValue required");

        uint256[] memory _firstFragmentEntities = _fragments[0].queryType == QueryType.HasValue ? _fragments[0].component.getEntitiesWithRawValue(_fragments[0].value) : _fragments[0].component.getEntities();

        // If only one fragment is given, return immediately
        if (_fragments.length == 1) return _firstFragmentEntities;

        uint256[] memory _tempEntities = new uint256[](_firstFragmentEntities.length);
        uint256 _numEntities = 0;

        // Iterate through firstFragmentEntities to discard entities that don't meet the requirements
        for (uint256 i = 0; i < _firstFragmentEntities.length; i++) {
            uint256 _entity = _firstFragmentEntities[i];
            bool _include = true;

            for (uint256 j = 1; j < _fragments.length; j++) {
                QueryFragment memory _fragment = _fragments[j];

                // For Has fragments, include entity if it is included in the component
                if (_fragment.queryType == QueryType.Has) {
                    _include = _fragment.component.has(_entity);
                }

                // For Not fragments, include entity if it is not included in the component
                if (_fragment.queryType == QueryType.Not) {
                    _include = !_fragment.component.has(_entity);
                }

                // For HasValue fragments, include entity if it has the requested value
                if (_fragment.queryType == QueryType.HasValue) {
                    _include = keccak256(_fragment.value) == keccak256(_fragment.component.getRawValue(_entity));
                }

                if (!_include) break;
            }

            if (_include) {
                _tempEntities[_numEntities] = _entity;
                _numEntities++;
            }
        }

        // Copy to array of correct length
        uint256[] memory _entities = new uint256[](_numEntities);
        for (uint256 i; i < _numEntities; i++) {
            _entities[i] = _tempEntities[i];
        }

        return _entities;
    }
}
