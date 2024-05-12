import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BootstrapModule = buildModule("BootstrapModule", (m)=>{
    /*
    1. Deploy DegreeToken
    2. Deploy UniversityContract
    3. Daftarkan UniversityContract ke DegreeToken
    4. Deploy CurriculumContract 
    5. Daftarkan CurriculumContract ke UniversityContract
    6. Masukan dummy mata kuliah
    */
   // 1
    const pddiktiAccount = m.getAccount(0)
    const degreeToken = m.contract("DegreeToken", [], {
        from: pddiktiAccount
    })
    // 2
    const univAccount = m.getAccount(1)
    const univContract = m.contract("UniversityContract", [degreeToken, "Universitas Indonesia"], {
        from: univAccount,
        after: [degreeToken]
    })
    //3
    const registerUni = m.call(degreeToken, "addUniversity", [univContract, univAccount, "Universitas Indonesia"],{
        from: pddiktiAccount
    })
    //4
    const curriculumContract = m.contract("CurriculumContract", [degreeToken, "Kurikulum 2020", "Sistem Informasi", 144], {
        from: univAccount,
    })
    //5
    const registerCurriculum = m.call(univContract,"addACurriculum", [curriculumContract], {
        from: univAccount,
        after: [registerUni]
    })
    //6 
    const createCourses = ()=>{
        return Array(1).fill(null).map((_, idx)=>({
            name: `MatKul_${String.fromCharCode(idx + 65)}`,
            credits: 8,
            isMandatory: ["A", "I", "U", "E", "O"].includes(String.fromCharCode(idx + 65))
        }))
    }
    for (const course of createCourses()){
        m.call(curriculumContract, "addACourse", [course.name, course.credits, course.isMandatory], {
            from: univAccount,
            id: `AddACourseOf${course.name}`
        })
    }
    return {degreeToken, univContract, curriculumContract}
})

export default BootstrapModule