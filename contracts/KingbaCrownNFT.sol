// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KingbaCrownNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("KingbaCrownNFT", "KCROWN") Ownable(msg.sender) {}

    function mintNFT(string memory tokenURI) public returns (uint256) {
        require(!hasMinted[msg.sender], "Each address may only mint one NFT");
        hasMinted[msg.sender] = true;
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        uint256 counter = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (ownerOf(i) == owner) {
                tokenIds[counter] = i;
                counter++;
            }
        }

        return tokenIds;
    }
}
