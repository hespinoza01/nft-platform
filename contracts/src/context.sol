// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract NMContext {
    // wallet address of contract owner
    address internal owner;

    mapping(address => uint256) _balances;

    /**
        Data Structs for NFT Collections
     */
    uint256 NftCounter = 0;
    uint256 price = 0;

    mapping(uint256 => string) _tokenURI;
    mapping(string => uint256) _tokenID;

    mapping(address => uint256) _tokenBalance;
    mapping(uint256 => address) _tokenOwner;

    struct _NFTSell {
        address selledBy;
        uint256 price;
        bool exist;
    }

    mapping(uint256 => _NFTSell) _tokenSell;

    struct _NFT {
        address owner;
        int256 price;
        string uri;
    }

    constructor() {
        owner = msg.sender;
    }

    /***************
     ** Modifiers **
     ***************/
    modifier onlyWithEnoughFounds(uint256 amount) {
        require(_balances[msg.sender] >= amount, "not enough funds on balance");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    /************************
     ** Balances functions **
     ************************/
    function _getBalance(address user) internal view returns (uint256) {
        return _balances[user];
    }

    function _incrementBalance(address user, uint256 amount) internal {
        _balances[user] += amount;
    }

    function _decrementBalance(address user, uint256 amount) internal {
        _balances[user] -= amount;
    }

    /*******************************
     ** Owner price nft functions **
     *******************************/
    function setPrice(uint256 amount) public onlyOwner {
        price = amount;
    }

    function getPrice() public view returns (uint256) {
        return price;
    }
}
