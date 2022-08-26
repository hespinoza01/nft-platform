// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Address {
    /**
        Check a current addres if a valid address
        @param self {address}
        @return bool
     */
    function isValid(address self) internal pure returns (bool) {
        return (self == address(self) && self != address(0));
    }
}
