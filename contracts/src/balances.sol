// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./context.sol";

contract NMBalance is NMContext {
    event evtDeposit(address to, uint256 amount);
    event evtWithdraw(address to, uint256 amount);
    event evtTransfer(address from, address to, uint256 amount);

    /**
        Add founds into platform balance
     */
    function deposit() public payable {
        _incrementBalance(msg.sender, msg.value);
        emit evtDeposit(msg.sender, msg.value);
    }

    /**
        Transfer platform founds to another user account
        @param to {address}
        @param amount {uint256}
     */
    function transfer(address to, uint256 amount) public onlyWithEnoughFounds(amount) {
        _decrementBalance(msg.sender, amount);
        _incrementBalance(to, amount);

        emit evtTransfer(msg.sender, to, amount);
    }

    /**
        Get current balance into platform
        @return uint256
     */
    function balance() public view returns (uint256) {
        return _getBalance(msg.sender);
    }

    /**
        Transfers founds into platform to external wallet
     */
    function withdraw(uint256 amount) public payable onlyWithEnoughFounds(amount) {
        _decrementBalance(msg.sender, amount);

        (bool success, ) = msg.sender.call{ value: amount }("");
        require(success, "withdraw failed");

        emit evtWithdraw(msg.sender, amount);
    }
}
