import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PddiktiModule = buildModule("PddiktiModule", (m)=>{
    const pddiktiAccount = m.getAccount(0)
    const universityAAccount = m.getAccount(1)
    const universityAName = m.getParameter("universityAName", "Univ A")
    const degreeToken = m.contract("DegreeToken", [], {
        from: pddiktiAccount
    })
    const univeristyAContract = m.contract("UniversityContract", [pddiktiAccount, universityAName], {
        from: universityAAccount
    })
    const addUnivA = m.call(degreeToken, "addUniversity", [universityAAccount, universityAName], {
        from: pddiktiAccount,
        after: [degreeToken]
    })

    return {degreeToken, univeristyAContract}
})

export default PddiktiModule