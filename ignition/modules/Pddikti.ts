import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PddiktiModule = buildModule("PddiktiModule", (m)=>{
    const pddiktiAccount = m.getAccount(0)
    const universityAAccount = m.getAccount(1)
    const universityAName = m.getParameter("universityAName", "Univ A")
    const Library = m.library("Library")
    const degreeToken = m.contract("DegreeToken", [], {
        libraries:{
            Library
        },
        from: pddiktiAccount
    })
    const univeristyAContract = m.contract("UniversityContract", [pddiktiAccount, universityAName], {
        libraries:{
            Library
        },
        from: universityAAccount
    })
    m.call(degreeToken, "addUniversity", [universityAAccount, universityAName], {
        from: pddiktiAccount,
        after: [degreeToken]
    })

    return {Library, degreeToken, univeristyAContract}
})

export default PddiktiModule