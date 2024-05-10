// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "contracts/DegreeToken.sol";
import {Library} from "contracts/Library.sol";
contract UniversityContract { 
    // Note:
    // 1. gw masih bingung cara ngirim list of struct sebagai parameter dari frontend gimana, i don't know if that's even possible, jadi yg nambah cuma satu satu dulu aja
    // 2. Not Accounting for race condition, but idk if thats possible lmao
    // 3. probably student ga butuh id, pakai addresss aja. tapi udh terlanjur tulis. kl mau refactor tolong hapus student id dan pakai address aja buat keynya
    // 4. bisakah degreenya dimint langsung ke address mahasiswa? tentu bisa. tapi ntar ga ada use case mahasiswa dong?
    // 5. Kalau struct terlalu banyak properties, bakal ada error max call stack. jadi yg Student bbrp properties gw block dulu
    // 6. Untuk student, walletnya bakal dibuat di frontend pakai ether js. Or idk... blom coba...
    // 
    using Library for Library.University;
    using Library for Library.Student;
    using Library for Library.Course;
    using Library for Library.Curriculum;
    using Library for Library.AcademicRecord;

    DegreeToken internal pddikti;

    Library.University public owner;
    mapping (uint256 => Library.Curriculum) public curriculums;
    uint256 private curriculumsId;

    mapping (uint256 =>Library.Course) public courses;
    uint256 private coursesId;

    mapping (uint256 => Library.Student) public students;
    mapping (address => uint256) public addressToStudents;

    uint256 private studentsId;
    mapping (uint256 => Library.AcademicRecord[]) private academicRecords; // records semester, status (aktif/nonaktif/kampus merdeka), and passed courses
    mapping (uint256 => mapping (uint256 => bool)) private studentToPassedCourses; // records student and courses they had passed
    mapping (uint256 => uint256[]) public curriculumToMandatoryCourses;

    constructor(address _pddikti, string memory name){
        owner = Library.University(msg.sender, name, true);
        pddikti = DegreeToken(_pddikti);
    }
    modifier onlyUniversity() {
        require(msg.sender == owner.uniAdress);
        _;
    }

    modifier onlyStudent(uint256 studentId){
        require(studentId < studentsId);
        require(msg.sender == students[studentId]._address);
        _;
    }

    function addAStudent(
        address _address,
        string memory npm,
        string memory name,
        uint256 accumulatedCredit, // if pindah kampus, kreditnya kan ada transfer sks
        uint256 curriculumId
    ) external onlyUniversity {
        require(curriculumId < curriculumsId);
        require(curriculums[curriculumId].active);
        require(pddikti.registerAStudent(_address));
        students[studentsId] = Library.Student(
                    _address,
                    studentsId,
                    npm,
                    name,
                    accumulatedCredit, 
                    0, 
                    curriculumId,
                    0,
                    0
            );
        studentsId += 1;
    }

    function addACurriculum(string calldata name, string calldata major, uint256 minimumCredits) external onlyUniversity {
        curriculums[curriculumsId] = Library.Curriculum(
            curriculumsId,
            name,
            major,
            minimumCredits,
            true
        );
        curriculumsId += 1;
    }

    function addACourse(string calldata name, uint256 credits, uint256[] memory mandatoriesForCurriculum) external onlyUniversity {
        for(uint256 i=0; i<mandatoriesForCurriculum.length;i++){
            uint256 curriculumId = mandatoriesForCurriculum[i];
            require(curriculumId < curriculumsId); // check if there's invalid curriculum id
        }
        courses[coursesId] = Library.Course(coursesId, name, credits);
        for(uint256 i=0; i<mandatoriesForCurriculum.length;i++){
            uint256 curriculumId = mandatoriesForCurriculum[i];
            curriculumToMandatoryCourses[curriculumId].push(coursesId);
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
        if (students[studentId].accumulatedCredits < curriculums[students[studentId].curriculumId].minimumCredits) {
            return false;
        }
        // please check mandatory courses
        uint256[] memory mandatoryCoursesId = curriculumToMandatoryCourses[students[studentId].curriculumId];
        for (uint256 i=0; i<mandatoryCoursesId.length; i++) 
        {
            if(!studentToPassedCourses[studentId][mandatoryCoursesId[i]]){ // for each mandatory course, check if student had passed it
                return false;
            }
        }
        return true;
    }

    function getStudentInformation(uint256 studentId) external view returns (Library.Student memory, Library.AcademicRecord[] memory){
        require(studentId < studentsId);
        return (students[studentId], academicRecords[studentId]);
    }

    function toggleCurriculum(uint256 curriculumId) external onlyUniversity {
        require(curriculumId < curriculumsId);
        curriculums[curriculumId].active = !curriculums[curriculumId].active;
    }
}