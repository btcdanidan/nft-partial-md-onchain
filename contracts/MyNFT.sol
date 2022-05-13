// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "./libs/Base64.sol";

contract MyNFT is ERC721, Ownable {
    
    uint256 public maxSupply;
    string public baseUri;

    constructor(uint256 _maxSupply, string memory _baseUri, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        maxSupply = _maxSupply;
        baseUri = _baseUri;
    }

    function setBaseUri(string memory _baseUri) external onlyOwner() {
        baseUri = _baseUri;
    }

    function mint(uint256 tokenId) public virtual {
        _safeMint(msg.sender, tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"My token", "description": "A beautiful NFT", "image":"', baseUri, '/', Strings.toString(tokenId), '.jpeg"}'
                        )
                    )
                )
            )
        );
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override {
        require(tokenId <= maxSupply, "ERC721: tokenId MUST be < maxSupply");
        require(tokenId != 0, "ERC721: tokenId 0 does not exist");
    }


}