// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Uint {
    /**
        Increment a number + 1, skiping solidy desbord memory to reduce gas
        @param {uint256} x - number to increment
        @param {uint256} MAX_VALUE - limit value to check
        @return {uint256}
     */
    function increment(uint256 self) internal pure returns (uint256) {
        unchecked {
            return increment(self, 1);
        }
    }

    /**
        Increment a number + value, skiping solidy desbord memory to reduce gas
        @param {uint256} x - number to increment
        @param {uint256} value - increment value
        @param {uint256} MAX_VALUE - limit value to check
        @return {uint256}
     */
    function increment(uint256 x, uint256 value) internal pure returns (uint256) {
        unchecked {
            uint256 MAX_UINT_256_VALUE = 2**256 - 1;

            if ((x + value) > MAX_UINT_256_VALUE) {
                return MAX_UINT_256_VALUE;
            }

            return x + value;
        }
    }

    /**
        Decrement a number - 1, skiping solidy desbord memory to reduce gas
        @param {uint256} x - number to decrement
        @return {uint256}
     */
    function decrement(uint256 self) internal pure returns (uint256) {
        unchecked {
            return decrement(self, 1);
        }
    }

    /**
        Decrement a number - value, skiping solidy desbord memory to reduce gas
        @param {uint256} x - number to decrement
        @param {uint256} value - decrement value
        @return {uint256}
     */
    function decrement(uint256 x, uint256 value) internal pure returns (uint256) {
        unchecked {
            if (x - value < 0) {
                return 0;
            }

            return x - value;
        }
    }

    /**
        check if number if >= to value
        @param {uint256} self - number to eval
        @param {uint256} value
        @return bool
    */
    function min(uint256 self, uint256 value) internal pure returns (bool) {
        return self >= value;
    }

    /**
        check if number if <= to value
        @param {uint256} self - number to eval
        @param {uint256} value
        @return bool
    */
    function max(uint256 self, uint256 value) internal pure returns (bool) {
        return self <= value;
    }

    /**
        check if number if >= min && <= max
        @param {uint256} self - number to eval
        @param {uint256} minValue
        @param {uint256} maxValue
        @return bool
    */
    function minMax(
        uint256 self,
        uint256 minValue,
        uint256 maxValue
    ) internal pure returns (bool) {
        return (self >= minValue && self <= maxValue);
    }
}
