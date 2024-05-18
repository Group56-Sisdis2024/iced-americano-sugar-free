// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Library } from "contracts/Library.sol";

contract DegreeToken is ERC721 {
    using Library for Library.University;
    enum ROLE {
        ANONYMOUS, // by default 0
        PDDIKTI,
        UNIVERSITY,
        STUDENT
    }
    mapping (address => ROLE) public roles; // account address
    mapping(address => Library.University) public universities; //contract address
    mapping(address => address) public universityToUniversityContract; // uni account address
    Library.University[] public uniLists;
    uint256 public uniListsId;
    mapping(address => address) public curriculumToUniversitiesContract; // contract address
    mapping (address => address) public studentsToUniverity;
    uint256 private _tokenIds;
    address public owner;


    constructor() ERC721("DegreeToken", "DTK")
    {
        owner = msg.sender;
        roles[msg.sender] = ROLE.PDDIKTI;
    }

    function addUniversity(address uniContractAdress, address uniAccountAddress, string memory uniName) external {
        require(msg.sender == owner);
        universities[uniContractAdress] = Library.University(uniContractAdress, uniName, true);
        universityToUniversityContract[uniAccountAddress] = uniContractAdress;
        uniLists.push(Library.University(uniContractAdress, uniName, true));
        roles[uniAccountAddress] = ROLE.UNIVERSITY;
        uniListsId+=1;
    }

    modifier onlyUniversity(){
        require(universities[msg.sender].exists, "Only University");
        _;
    }
    modifier onlyCurriculum(){
        require(curriculumToUniversitiesContract[msg.sender] != address(0), "Only Curriculum");
        _;
    }

    function mintADegree(address studentAddress) external onlyCurriculum returns (uint256){
        require(studentsToUniverity[studentAddress] == msg.sender);
        _tokenIds+=1;
        _safeMint(studentAddress, _tokenIds);
        return _tokenIds;
    }

    function addACurriculum(address _curriculumContract) external onlyUniversity {
        curriculumToUniversitiesContract[_curriculumContract] = msg.sender;
    }
    
    function registerAStudent(address student) external onlyUniversity returns (bool) {
        if(studentsToUniverity[student] != address(0)){
            return false;
        }
        studentsToUniverity[student] = msg.sender;
        roles[student] = ROLE.STUDENT;
        return true;
    }
}
