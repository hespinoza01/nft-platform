// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./src/balances.sol";
import "./src/nft.sol";

contract NftMarketplace is NMBalance, NMNft {
    constructor() {
        owner = msg.sender;
        mintNftBatch(getInitialUris());
        setPrice(0.15 ether);
    }

    function buyNft(uint256 tokenID) public {
        require(_tokenOwner[tokenID] != address(0), "nft not found");
        require(
            _tokenOwner[tokenID] == owner || _tokenOwner[tokenID] == address(this),
            "nft not allowed to buy"
        );

        uint256 nftPrice;
        address nftOwner;
        address walletOwner;

        if (_tokenOwner[tokenID] == owner) {
            nftPrice = price;
            nftOwner = owner;
            walletOwner = owner;
        } else {
            nftPrice = _tokenSell[tokenID].price;
            nftOwner = address(this);
            walletOwner = _tokenSell[tokenID].selledBy;
        }

        require(_getBalance(msg.sender) >= nftPrice, "sent value mismatch with nft price");

        _safeTransferFrom(nftOwner, msg.sender, tokenID);
        _decrementBalance(msg.sender, nftPrice);
        _incrementBalance(walletOwner, nftPrice);

        if (nftOwner == address(this)) {
            delete _tokenSell[tokenID];
        }
    }

    function publishNftSell(uint256 tokenID, uint256 price) public {
        require(_tokenOwner[tokenID] == msg.sender, "only owner can sell this nft");

        _safeTransferFrom(msg.sender, address(this), tokenID);
        _tokenSell[tokenID] = _NFTSell({ selledBy: msg.sender, price: price, exist: true });
    }
}
