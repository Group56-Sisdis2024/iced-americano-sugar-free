// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Library } from "contracts/Library.sol";

contract DegreeToken is ERC721 {
    using Library for Library.University;
    mapping(address => Library.University) universities;
    mapping (address => address) studentsToUniverity;
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

    function mintDegrees(address studentAddress) external onlyUniversity returns (uint256){
        require(studentsToUniverity[studentAddress] == msg.sender);
        _tokenIds+=1;
        _safeMint(studentAddress, _tokenIds);
        return _tokenIds;
    }
    
    function registerStudent(address student) external onlyUniversity returns (bool) {
        if(studentsToUniverity[student] != address(0)){
            return false;
        }
        studentsToUniverity[student] = msg.sender;
        return true;
    }
}
