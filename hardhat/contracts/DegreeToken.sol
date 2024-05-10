// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Library } from "contracts/Library.sol";

contract DegreeToken is ERC721 {
    using Library for Library.University;
    mapping(address => Library.University) universities;
    uint256 private _tokenIds;
    address public owner;

    constructor() ERC721("DegreeToken", "DTK")
    {
         owner = msg.sender;
    }

    function addUniversity(address uniAdress, string memory uniName) external {
        require(msg.sender == owner);
        universities[uniAdress] = Library.University(uniAdress, uniName, true);
    }

    modifier onlyUniversity(){
        require(universities[msg.sender].exists);
        _;
    }

    function mintDegrees(uint256 numOfToken ) external onlyUniversity returns (uint256[] memory){
        uint256[] memory _tokenIdToBeReturned = new uint256[](numOfToken);
        for (uint256 i = 0; i < numOfToken; i++) 
        {
            _safeMint(msg.sender, _tokenIds);
            _tokenIdToBeReturned[i] = _tokenIds;
            _tokenIds+=1;
        }
        return _tokenIdToBeReturned;
    }
    
    function grantDegree(address to, uint256 tokenId) external onlyUniversity {
        transferFrom(msg.sender, to, tokenId);
    }
}
