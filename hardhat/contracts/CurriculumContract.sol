// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "contracts/DegreeToken.sol";
import {Library} from "contracts/Library.sol";
contract CurriculumContract {
    using Library for Library.Student;
    using Library for Library.Course;
    using Library for Library.Curriculum;
    using Library for Library.AcademicRecord;

    address public owner;
    address public ownerContract; // Address of university contract of the owner
    DegreeToken internal pddikti;
    Library.Curriculum public curriculumDetail;

    mapping (uint256 =>Library.Course) public courses;
    uint256 public coursesId;

    mapping (uint256 => Library.Student) public students;
    mapping (address => uint256) public addressToStudents;
    uint256 public studentsId;

    mapping (uint256 => Library.AcademicRecord[]) private academicRecords; // records semester, status (aktif/nonaktif/kampus merdeka), and passed courses
    mapping (uint256 => mapping (uint256 => bool)) private studentToPassedCourses; // records student and courses they had passed

    uint256[] public mandatoryCourseIDs;

    constructor(address _pddikti, address _ownerContract, string memory name, string memory major, uint256 minimumCredits){
        owner = msg.sender;
        ownerContract = _ownerContract;
        curriculumDetail = Library.Curriculum(
            address(this),
            name,
            major,
            minimumCredits,
            true
        );
        pddikti = DegreeToken(_pddikti);
    }
    modifier onlyUniversity() {
        require(msg.sender == owner || msg.sender == ownerContract);
        _;
    }

    modifier onlyStudent(uint256 studentId){
        require(studentId < studentsId);
        require(msg.sender == students[studentId]._address);
        _;
    }

    function addAStudent(
        address _address,
        string calldata npm,
        string calldata name,
        uint256 accumulatedCredit // if pindah kampus, kreditnya kan ada transfer sks
    ) external onlyUniversity {
        require(curriculumDetail.active, "Current Curriculum not active");
        students[studentsId] = Library.Student(
                    _address,
                    studentsId,
                    npm,
                    name,
                    accumulatedCredit,
                    0,
                    0,
                    0,
                    0
            );
        studentsId += 1;
    }

    function addACourse(string calldata name, uint256 credits, bool isMandatory) external onlyUniversity {
        courses[coursesId] = Library.Course(coursesId, name, credits);
        if(isMandatory){
            mandatoryCourseIDs.push(coursesId);
        }
        coursesId +=1;
    }

    function addAnAcademicRecord(uint256 studentId, string calldata semester, string calldata status, uint256[] calldata passedCoursesId, uint256[] calldata takenCoursesId, uint256[] calldata takenCoursesGrade) external onlyUniversity {
        require(studentId < studentsId);
        require(takenCoursesId.length == takenCoursesGrade.length);
        for(uint256 i=0; i<passedCoursesId.length;i++){
            require(passedCoursesId[i] < coursesId);  // check if there's invalid course id
        }
        (uint256 creditsGained, uint256 totalCreditsTakenSemesterly, uint256 weightedTotalGradeSemesterly) = _calculate(studentId, passedCoursesId, takenCoursesId, takenCoursesGrade);
        academicRecords[studentId].push(Library.AcademicRecord(
            semester,
            status,
            creditsGained,
            passedCoursesId,
            takenCoursesId,
            takenCoursesGrade,
            totalCreditsTakenSemesterly,
            weightedTotalGradeSemesterly
        ));
        _updateStudentData(studentId, creditsGained, totalCreditsTakenSemesterly, weightedTotalGradeSemesterly);
    }
    function _updateStudentData(uint256 studentId, uint256 creditsGained, uint256 totalCreditsTakenSemesterly, uint256 weightedTotalGradeSemesterly) internal {
        students[studentId].accumulatedCredits += creditsGained;
        students[studentId].totalCreditsTaken += totalCreditsTakenSemesterly;
        students[studentId].weightedTotalGrade += weightedTotalGradeSemesterly;
        if(_checkIfEligibleForGraduation(studentId)){
            students[studentId].grantedDegreeId = _mintADegree(studentId);
        }
    }
    function _calculate(uint256 studentId, uint256[] calldata passedCoursesId, uint256[] calldata takenCoursesId, uint256[] calldata takenCoursesGrade) internal returns (uint256, uint256, uint256){
        uint256 creditsGained = 0;
        for (uint256 i = 0; i<passedCoursesId.length; i++) 
        {
            creditsGained += courses[passedCoursesId[i]].credits;
            studentToPassedCourses[studentId][passedCoursesId[i]] = true;
        }
        uint256 weightedTotalGradeSemesterly = 0;
        uint256 totalCreditsTakenSemesterly = 0;
        for (uint256 i=0; i<takenCoursesId.length;i++){
            totalCreditsTakenSemesterly += courses[takenCoursesId[i]].credits;
            weightedTotalGradeSemesterly += takenCoursesGrade[i] * courses[takenCoursesId[i]].credits;
        }
        return (creditsGained, totalCreditsTakenSemesterly, weightedTotalGradeSemesterly);
    }
    function _mintADegree(uint256 studentId) internal returns (uint256) {
        return pddikti.mintADegree(students[studentId]._address);
    }
    function _checkIfEligibleForGraduation(uint256 studentId) internal view returns (bool){
        if (students[studentId].accumulatedCredits < curriculumDetail.minimumCredits) {
            return false;
        }
        // please check mandatory courses
        for (uint256 i=0; i<mandatoryCourseIDs.length; i++)
        {
            if(!studentToPassedCourses[studentId][mandatoryCourseIDs[i]]){ // for each mandatory course, check if student had passed it
                return false;
            }
        }
        return true;
    }

    function getStudentInformation(uint256 studentId) external view returns (Library.Student memory, Library.AcademicRecord[] memory){
        require(studentId < studentsId);
        return (students[studentId], academicRecords[studentId]);
    }

    function toggleActive() external onlyUniversity {
        curriculumDetail.active = !curriculumDetail.active;
    }
}
