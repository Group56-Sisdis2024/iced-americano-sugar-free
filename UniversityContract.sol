// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "@openzeppelin/contracts/utils/Counters.sol";
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
    using Counters for Counters.Counter;
    using Library for Library.University;
    using Library for Library.Student;
    using Library for Library.Course;
    using Library for Library.Curriculum;
    using Library for Library.AcademicRecord;

    DegreeToken internal pddikti;

    Library.University public owner;
    mapping (uint256 => Library.Curriculum) private curriculums;
    Counters.Counter private curriculumsId;

    mapping (uint256 =>Library.Course)  courses;
    Counters.Counter private coursesId;

    mapping (uint256 => Library.Student) public students;
    mapping (address => uint256) public addressToStudents;

    Counters.Counter private studentsId;
    mapping (uint256 => Library.AcademicRecord[]) private academicRecords; // records semester, status (aktif/nonaktif/kampus merdeka), and passed courses
    mapping (uint256 => mapping (uint256 => bool)) private studentToPassedCourses; // records student and courses they had passed
    mapping (uint256 => bool) private studentsToEligibilityForGraduation;
    mapping (uint256 => uint256[]) private curriculumToMandatoryCourses;

    uint256[] degreeIdsPool; // pool of Degree (NFT) id that are available to be claimed by eligible students
    Counters.Counter private degreeIdsPoolId; // increment by 1 whenever a student claim their degree

    constructor(address _pddikti, address add, string memory name){
        owner = Library.University(add, name, true);
        pddikti = DegreeToken(_pddikti);
    }
    modifier onlyUniversity() {
        require(msg.sender == owner.uniAdress);
        _;
    }

    modifier onlyStudent(uint256 studentId){
        require(studentId < studentsId.current());
        require(msg.sender == students[studentId]._address);
        _;
    }

    function addAStudent(
        address _address,
        string memory npm,
        string memory name,
        // string memory gender,
        // string memory university,
        // string memory major,
        // string memory firstSemester,
        // string memory initialStatus,
        // string memory currentStatus,
        uint256 accumulatedCredit,
        uint256 curriculumId
    ) external onlyUniversity {
        require(curriculums[curriculumId].id < curriculumsId.current()); 
        students[studentsId.current()] = Library.Student(
                _address,
                studentsId.current(),
                npm,
                name,
                // gender,
                // university, 
                // major, 
                // firstSemester, 
                // initialStatus, 
                // currentStatus, 
                accumulatedCredit, 
                0, 
                curriculumId
        );
        studentsId.increment();
    }

    function addACurriculum(string calldata name, string calldata major) external onlyUniversity {
        curriculums[curriculumsId.current()] = Library.Curriculum(
            curriculumsId.current(),
            name,
            major
        );
        curriculumsId.increment();
    }

    function addACourse(string calldata name, uint256 credits, uint256[] memory mandatoriesForCurriculum) external onlyUniversity {
        for(uint256 i=0; i<mandatoriesForCurriculum.length;i++){
            uint256 curriculumId = mandatoriesForCurriculum[i];
            require(curriculumId < curriculumsId.current()); // check if there's invalid curriculum id
        }
        courses[coursesId.current()] = Library.Course(coursesId.current(), name, credits);
        for(uint256 i=0; i<mandatoriesForCurriculum.length;i++){
            uint256 curriculumId = mandatoriesForCurriculum[i];
            curriculumToMandatoryCourses[curriculumId].push(coursesId.current());
        }
        coursesId.increment();
    }

    function addAnAcademicRecord(uint256 studentId, string calldata semester, string calldata status, uint256[] calldata passedCoursesId) external onlyUniversity {
        require(studentId < studentsId.current());
        for(uint256 i=0; i<passedCoursesId.length;i++){
            uint256 courseId = passedCoursesId[i];
            require(courseId < coursesId.current());  // check if there's invalid course id
        }
        uint256 creditsGained = 0;
        for (uint256 i = 0; i<passedCoursesId.length; i++) 
        {
            creditsGained += courses[passedCoursesId[i]].credits;
            studentToPassedCourses[studentId][passedCoursesId[i]] = true;
        }
        academicRecords[studentId].push(Library.AcademicRecord(
            semester,
            status,
            creditsGained,
            passedCoursesId
        ));
        students[studentId].accumulatedCredits += creditsGained;
        if(_checkIfEligibleForGraduation(studentId)){
            studentsToEligibilityForGraduation[studentId] = true;
            // mint degree for 1 person. 
            _mintDegrees(1);
        }
    }
    function _mintDegrees(uint256 numberOfStudentsEligibleForGraduation) internal {
        uint256[] memory result = pddikti.mintDegrees(numberOfStudentsEligibleForGraduation);
        for (uint256 i =0; i < result.length; i++) 
        {
            degreeIdsPool.push(result[i]);
        }
    }
    function _checkIfEligibleForGraduation(uint256 studentId) internal view returns (bool){
        if(studentsToEligibilityForGraduation[studentId]){
            return true;
        }
        if (students[studentId].accumulatedCredits < 144) {
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
    function claimDegree(uint256 studentId) external onlyStudent(studentId) {
        require(studentsToEligibilityForGraduation[studentId]);
        pddikti.grantDegree(students[studentId]._address, degreeIdsPool[degreeIdsPoolId.current()]);
        degreeIdsPoolId.increment();
    }

    function getStudentInformation(uint256 studentId) external view returns (Library.Student memory, Library.AcademicRecord[] memory){
        require(studentId < studentsId.current());
        return (students[studentId], academicRecords[studentId]);
    }
}