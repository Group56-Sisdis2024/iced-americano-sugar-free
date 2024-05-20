// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "contracts/DegreeToken.sol";
import "contracts/CurriculumContract.sol";
import {Library} from "contracts/Library.sol";

contract UniversityContract {

    using Library for Library.University;
    using Library for Library.Curriculum;
    using Library for Library.Student;
    using Library for Library.Course;

    // Holds information about the university
    Library.University public universityInfo;
    DegreeToken internal pddikti;

    // List of curriculum contracts
    CurriculumContract[] public curriculums;
    uint256 public curriculumsId;

    mapping (uint256 =>Library.Course) public courses;
    uint256 public coursesId;

    mapping (address => Library.Student) public addressToStudent;
    mapping (uint256 => Library.Student) public students;
    uint256 public studentsId;

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
        curriculums.push(CurriculumContract(curAddress));
        curriculumsId += 1;
        pddikti.addACurriculum(curAddress);
        emit CurriculumAdded(curAddress);
    }

    // Adds a new student to university
    function addAStudent(
        address _address,
        string calldata npm,
        string calldata name,
        uint256 accumulatedCredit
    ) external onlyUniversityOwner {
        require(pddikti.registerAStudent(_address), "Already registered");
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
        addressToStudent[_address] = students[studentsId];
        studentsId += 1;
    }

    // Adds a new course to university
    function addACourse(string calldata name, uint256 credits) external onlyUniversityOwner {
        courses[coursesId] = Library.Course(coursesId, name, credits);
        coursesId += 1;
    }

    function addStudentToCurriculum(uint256 studentId, uint256 curriculumId) external onlyUniversityOwner {
        require(studentId < studentsId);
        require(curriculumId < curriculumsId);
        CurriculumContract curriculum = curriculums[curriculumId];
        Library.Student memory student = students[studentId];
        curriculum.addAStudent(
            student._address,
            student.npm,
            student.name,
            student.accumulatedCredits
        );
    }

    function addCourseToCurriculum(uint256 courseId, uint256 curriculumId, bool isMandatory) external onlyUniversityOwner {
        require(courseId < coursesId);
        require(curriculumId < curriculumsId);
        CurriculumContract curriculum = curriculums[curriculumId];
        Library.Course memory course = courses[courseId];
        curriculum.addACourse(
            course.name,
            course.credits,
            isMandatory
        );
    }

    function getStudentInformation(uint256 studentId) external view returns (Library.Student memory, Library.AcademicRecord[] memory){
        require(studentId < studentsId);
        CurriculumContract curriculum = curriculums[students[studentId].curriculumId];
        return curriculum.getStudentInformation(studentId);
    }

    function getStudentInformationByAddress(address studentAddress) external view returns (Library.Student memory, Library.AcademicRecord[] memory){
        require(studentAddress != address(0), "Invalid address");
        CurriculumContract curriculum = curriculums[addressToStudent[studentAddress].curriculumId];
        return curriculum.getStudentInformation(addressToStudent[studentAddress].id);
    }
}