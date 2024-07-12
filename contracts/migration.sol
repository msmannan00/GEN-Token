// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Migration is Ownable {
    // Interface declarations for the old and new contracts
    IERC20 public oldToken;
    IERC20 public newToken;
    IERC721 public oldNFT;
    IERC721 public newNFT;

    constructor(address _oldToken, address _newToken, address _oldNFT, address _newNFT) {
        oldToken = IERC20(_oldToken);
        newToken = IERC20(_newToken);
        oldNFT = IERC721(_oldNFT);
        newNFT = IERC721(_newNFT);
    }

    function migrateTokenBalances(address[] calldata holders) external onlyOwner {
        for (uint i = 0; i < holders.length; i++) {
            uint balance = oldToken.balanceOf(holders[i]);
            require(oldToken.transferFrom(holders[i], address(this), balance), "Failed to transfer tokens");
            require(newToken.transfer(holders[i], balance), "Failed to issue new tokens");
        }
    }

    function migrateNFTs(uint256[] calldata tokenIds) external onlyOwner {
        for (uint i = 0; i < tokenIds.length; i++) {
            address owner = oldNFT.ownerOf(tokenIds[i]);
            oldNFT.transferFrom(owner, address(this), tokenIds[i]);
            newNFT.transferFrom(address(this), owner, tokenIds[i]);
        }
    }
}
