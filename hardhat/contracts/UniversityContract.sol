// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "contracts/DegreeToken.sol";
import {Library} from "contracts/Library.sol";

contract UniversityContract {

    using Library for Library.University;
    using Library for Library.Curriculum;

    // Holds information about the university
    Library.University public universityInfo;
    DegreeToken internal pddikti;

    // List of curriculum addresses
    address[] public curriculums;
    uint256 public curriculumsId;

    // Emitted when a new curriculum is added
    event CurriculumAdded(address indexed curriculumAddress);

    constructor(address _pddikti, string memory name){
        universityInfo = Library.University(msg.sender, name, true);
        pddikti = DegreeToken(_pddikti);
    }

    // Ensures that only the university owner can call
    modifier onlyUniversityOwner() {
        require(msg.sender == universityInfo.uniAdress, "Caller is not the university owner");
        _;
    }

    // Adds a new curriculum address
    function addACurriculum(address curAddress) external onlyUniversityOwner {
        require(curAddress != address(0), "Invalid address");
        curriculums.push(curAddress);
        curriculumsId += 1;
        pddikti.addACurriculum(curAddress);
        emit CurriculumAdded(curAddress);
    }
}