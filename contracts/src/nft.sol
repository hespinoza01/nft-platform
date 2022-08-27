// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./context.sol";
import "../lib/uint.sol";
import "../lib/address.sol";

contract NMNft is NMContext {
    using Uint for uint256;
    using Uint for uint128;
    using Address for address;

    /**
        Create a new nft into the platform
        @param uri {string}
     */
    function mintNft(string memory uri) public onlyOwner {
        require(_tokenOwner[_tokenID[uri]] == address(0), "token already exist");

        _setTokenURI(NftCounter, uri);
        _mint(owner, NftCounter);
        NftCounter = NftCounter.increment();
    }

    /**
        A bulk nft create into the platform
        @param uris {string[]}
     */
    function mintNftBatch(string[] memory uris) public onlyOwner {
        for (uint256 i; i < uris.length; i = i.increment()) {
            require(_tokenOwner[_tokenID[uris[i]]] == address(0), "token already exist");
        }

        uint256[] memory ids = new uint256[](uris.length);

        for (uint256 i; i < uris.length; i = i.increment()) {
            ids[i] = NftCounter;
            _setTokenURI(NftCounter, uris[i]);
            NftCounter = NftCounter.increment();
        }

        _mintBatch(owner, ids);
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        _tokenURI[tokenId] = tokenURI;
        _tokenID[tokenURI] = tokenId;
    }

    /**
        Get nft detail by tokenId
        @param tokenId {uint256}
     */
    function _getToken(uint256 tokenId) internal view returns (_NFT memory) {
        address nftOwner;
        int256 nftPrice;
        string memory nftUri = _tokenURI[tokenId];

        if (_tokenOwner[tokenId] == owner) {
            nftOwner = owner;
            nftPrice = int256(price);
        } else if (_tokenOwner[tokenId] == address(this)) {
            nftOwner = _tokenSell[tokenId].selledBy;
            nftPrice = int256(_tokenSell[tokenId].price);
        } else {
            nftOwner = _tokenOwner[tokenId];
            nftPrice = -1;
        }

        return _NFT({ owner: nftOwner, price: nftPrice, uri: nftUri });
    }

    function getToken(uint256 tokenId) public view returns (_NFT memory) {
        return _getToken(tokenId);
    }

    function getTokenBatch(uint256[] memory tokenIds) public view returns (_NFT[] memory) {
        _NFT[] memory result = new _NFT[](tokenIds.length);

        for (uint128 i; i < tokenIds.length; i = uint128(i.increment())) {
            result[i] = _getToken(tokenIds[i]);
        }

        return result;
    }

    function getAllToken() public view returns (_NFT[] memory) {
        _NFT[] memory result = new _NFT[](NftCounter);

        for (uint256 i; i < NftCounter; i = i.increment()) {
            result[i] = _getToken(i);
        }

        return result;
    }

    function getAllTokenByWallet() public view returns (_NFT[] memory) {
        _NFT[] memory result = new _NFT[](balanceOf(msg.sender));
        uint128 counter;

        for (uint128 i; i < NftCounter; i = uint128(i.increment())) {
            if (_tokenOwner[i] == msg.sender) {
                result[counter] = _getToken(i);
                counter = uint128(counter.increment());
            }
        }

        return result;
    }

    /**
        Mint token and transfers to 'to'
        @param to {address}
        @param id {uint256}
     */
    function _mint(address to, uint256 id) internal virtual {
        require(to.isValid(), "invalid wallet");
        _tokenOwner[id] = to;
        _tokenBalance[to] += 1;
    }

    /**
        Mint token list and transfers to 'to'
        @param to {address}
        @param ids {uint256[]}
     */
    function _mintBatch(address to, uint256[] memory ids) internal virtual {
        require(to.isValid(), "invalid wallet");

        _tokenBalance[to] += ids.length;

        for (uint256 i; i < ids.length; i = i.increment()) {
            _tokenOwner[ids[i]] = to;
        }
    }

    /**
        Return address from token owner
        @param id {uint256}
        @return {address}
     */
    function ownerOf(uint256 id) public view returns (address) {
        return _tokenOwner[id];
    }

    /**
        Return token counter owned by address
        @param account {address}
        @return {uint256}
     */
    function balanceOf(address account) public view returns (uint256) {
        require(account.isValid(), "invalid wallet");
        return _tokenBalance[account];
    }

    /**
        Transfer token ownership to new address
        @param from {address}
        @param to {address}
        @param id {uint256}
     */
    function _safeTransferFrom(
        address from,
        address to,
        uint256 id
    ) internal virtual {
        require(from.isValid(), "invalid wallet");
        require(to.isValid(), "invalid wallet");
        require(_tokenOwner[id] == from, "token owner and from address mismatch");

        unchecked {
            _tokenBalance[from] -= 1;
        }

        _tokenBalance[to] += 1;
        _tokenOwner[id] = to;
    }

    function getInitialUris() public pure returns (string[] memory) {
        string[] memory uris = new string[](20);
        uris[
            0
        ] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853559/samples/animals/three-dogs.jpg";
        uris[
            1
        ] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853556/samples/animals/reindeer.jpg";
        uris[
            2
        ] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853555/samples/animals/cat.jpg";
        uris[
            3
        ] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853555/samples/ecommerce/analog-classic.jpg";
        uris[
            4
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1309/v1563853562/samples/ecommerce/accessories-bag.jpg";
        uris[
            5
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1151/v1563853561/samples/ecommerce/leather-bag-gray.jpg";
        uris[
            6
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_720/v1563853561/samples/ecommerce/car-interior-design.jpg";
        uris[
            7
        ] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853558/samples/ecommerce/shoes.png";
        uris[
            8
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_960/v1563853563/samples/food/spices.jpg";
        uris[
            9
        ] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853557/samples/food/pot-mussels.jpg";
        uris[
            10
        ] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853556/samples/food/fish-vegetables.jpg";
        uris[
            11
        ] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853555/samples/food/dessert.jpg";
        uris[
            12
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1080/v1661499741/samples/landscapes/landscape-panorama.jpg";
        uris[
            13
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1080/v1563853564/samples/landscapes/nature-mountains.jpg";
        uris[
            14
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1080/v1563853561/samples/landscapes/beach-boat.jpg";
        uris[
            15
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1080/v1563853560/samples/landscapes/architecture-signs.jpg";
        uris[
            16
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1080/v1563853558/samples/landscapes/girl-urban-view.jpg";
        uris[
            17
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1080/v1563853559/samples/people/jazz.jpg";
        uris[18] = "https://res.cloudinary.com/hespinoza/image/upload/v1563853551/sample.jpg";
        uris[
            19
        ] = "https://res.cloudinary.com/hespinoza/image/upload/c_scale,w_1080/v1564366404/agym_galeriaanimada_haroldespinoza/calculator-close-up-code-907489_qgpobj.jpg";

        return uris;
    }
}
