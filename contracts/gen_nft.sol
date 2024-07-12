// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GenesisNFT is ERC721URIStorage, Ownable, Pausable {
    IERC20 public paymentToken;

    uint256 public nextTokenId;
    mapping(uint256 => uint256) public listingPrice;
    mapping(uint256 => address) public originalCreator;
    mapping(uint256 => string) public creatorName;

    constructor(address _paymentTokenAddress) ERC721("GenesisNFT", "GNFT") {
        paymentToken = IERC20(_paymentTokenAddress);
    }

    function mint(string memory tokenURI, uint256 price, string memory name) public {
        require(price > 0, "Price must be greater than zero");

        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        listingPrice[tokenId] = price;
        originalCreator[tokenId] = msg.sender;
        creatorName[tokenId] = name;  // Store the creator's name alongside their NFT

        nextTokenId++;
    }

    function updateListingPrice(uint256 tokenId, uint256 newPrice) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can update the price");
        require(newPrice > 0, "Price must be greater than zero");

        listingPrice[tokenId] = newPrice;
    }

    function buyNFT(uint256 tokenId) public {
        uint256 price = listingPrice[tokenId];
        require(price > 0, "This NFT is not for sale");
        require(paymentToken.transferFrom(msg.sender, ownerOf(tokenId), price), "Payment failed");

        _transfer(ownerOf(tokenId), msg.sender, tokenId);
        listingPrice[tokenId] = 0;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
