// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Library {
    struct University {
        address uniAdress;
        string name;
        bool exists;
    }
    
    struct Curriculum {
        address id;
        string name;
        string major;
        uint256 minimumCredits;
        bool active;
    }
    
    struct Student {
        address _address;
        uint256 id;
        string npm;
        string name;
        uint256 accumulatedCredits;
        uint256 grantedDegreeId;
        uint256 curriculumId;
        uint256 totalCreditsTaken; // to calculate gpa
        uint256 weightedTotalGrade; // to calculate gpa
    }

    struct AcademicRecord{
        string semester;
        string status;
        uint256 totalCreditsPassed;
        uint256[] passedCoursesId; // for student.accumulatedCredits
        uint256[] takenCoursesId; // for semesterGPA
        uint256[] takenCoursesGrade; // for semesterGPA
        uint256 totalCreditsTaken; // to calculate semester gpa
        uint256 weightedTotalGrade; // to calculate semester gpa
        uint256 weightedTotalPassedGrade; // to calculate semester cgpa
    }

    struct Course{
        uint256 id;
        string name;
        uint256 credits;
    }
}