// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./uint.sol";

library String {
    using Uint for uint8;
    using Uint for uint128;

    /**
        Check if string contains only A-Z
        @param {string} self - value to eval
        @return bool
     */
    function isAlpha(string memory self) internal pure returns (bool) {
        bytes memory str = bytes(self);

        if (str.length == 0) return false;

        for (uint8 i = 0; i < str.length; i = uint8(i.increment())) {
            bytes1 char = str[i];

            if (
                !(char >= 0x41 && char <= 0x5A) && !(char >= 0x61 && char <= 0x7A) //A-Z //a-z
            ) {
                return false;
            }
        }

        return true;
    }

    /**
        Check if string contains only 0-9
        @param {string} self - value to eval
        @return bool
     */
    function isNumeric(string memory self) internal pure returns (bool) {
        bytes memory str = bytes(self);

        if (str.length == 0) return false;

        for (uint8 i = 0; i < str.length; i = uint8(i.increment())) {
            bytes1 char = str[i];

            if (!(char >= 0x30 && char <= 0x39)) return false; //0-9
        }

        return true;
    }

    /**
        Check if string contains only 0-9
        @param {string} self - value to eval
        @return bool
     */
    function isAlphaNumeric(string memory self) internal pure returns (bool) {
        bytes memory str = bytes(self);

        if (str.length == 0) return false;

        for (uint8 i = 0; i < str.length; i = uint8(i.increment())) {
            bytes1 char = str[i];

            if (
                !(char >= 0x30 && char <= 0x39) && // 0-9
                !(char >= 0x41 && char <= 0x5A) && // A-Z
                !(char >= 0x61 && char <= 0x7A) //a-z
            ) return false;
        }

        return true;
    }

    /**
        Check if a string is a mail
        @param {string} self - string to eval
        @return bool
     */
    function isEmail(string memory self) internal pure returns (bool) {
        bytes memory str = bytes(self);
        uint8 at = 0;
        uint8 dot = 0;

        if (str.length == 0) return false;
        if (!(str[0] >= 0x61 && str[0] <= 0x7A)) return false;

        for (uint8 i = 0; i < str.length; i = uint8(i.increment())) {
            if (str[i] == "@") {
                at = i;
            } else if (str[i] == ".") {
                dot = i;
            }
        }

        if (at == 0 && dot == 0) return false;
        if (at > dot) return false;

        return !(dot >= (str.length - 1));
    }

    /**
        Return string length
        @param {string} self
        @return uint64
     */
    function length(string memory self) internal pure returns (uint64) {
        return uint64(bytes(self).length);
    }

    /**
        Check string min characters length
        @param {string} self - string to eval
        @param {uint256} value
        @return bool
    */
    function minLength(string memory self, uint256 value) internal pure returns (bool) {
        return length(self) >= value;
    }

    /**
        Check string max characters length
        @param {string} self - string to eval
        @param {uint256} value
        @return bool
    */
    function maxLength(string memory self, uint256 value) internal pure returns (bool) {
        return length(self) <= value;
    }

    /**
        Check string min && max characters length
        @param {string} self - string to eval
        @param {uint256} minValue
        @param {uint256} maxValue
        @return bool
    */
    function minMaxLength(
        string memory self,
        uint256 minValue,
        uint256 maxValue
    ) internal pure returns (bool) {
        uint64 _length = length(self);
        return (_length >= minValue && _length <= maxValue);
    }

    /**
        Compare content of two strings
        @param self {string}
        @param value {string}
        @return bool
     */
    function equals(string memory self, string memory value) internal pure returns (bool) {
        return keccak256(abi.encodePacked(self)) == keccak256(abi.encodePacked(value));
    }
}
