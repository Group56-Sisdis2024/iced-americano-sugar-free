import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import BootstrapModule from "./Bootstrap";

const PddiktiModule = buildModule("PddiktiModule", (m)=>{
    const {degreeToken, univContract, curriculumContract} = m.useModule(BootstrapModule)
    const studentAccount = m.getAccount(2)
    const univAccount = m.getAccount(1)
    m.call(univContract, "addAStudent", [studentAccount, "2006463881", "Pyon-chan", 0], {
        from: univAccount,
        after: []
    })
    m.call(univContract, "addStudentToCurriculum", [0, 0], {
        from: univAccount
    })
    return {degreeToken, univContract, curriculumContract}
})

export default PddiktiModule