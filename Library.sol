// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Library {
    struct University {
        address uniAdress;
        string name;
        bool exists;
    }
    
    struct Curriculum {
        uint256 id;
        string name;
        string major;
    }
    
    struct Student {
        address _address;
        uint256 id;
        string npm;
        string name;
        // string gender;
        // string university;
        // string major;
        // string firstSemester;
        // string initialStatus;
        // string currentStatus;
        uint256 accumulatedCredits;
        uint256 grantedDegreeId;
        uint256 curriculumId;
    }

    struct AcademicRecord{
        string semester;
        string status;
        uint256 totalCredits;
        uint256[] passedCoursesId;
    }

    struct Course{
        uint256 id;
        string name;
        uint256 credits;
    }
}