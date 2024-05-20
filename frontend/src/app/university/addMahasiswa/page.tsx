'use client'
import { ROLE } from "@/types/role";
import { CurriculumContract__factory, DegreeToken__factory, UniversityContract__factory } from "@/types/typechain-types";
import { useWallet } from "@/utils/walletCtx";
import { withAuth } from "@/utils/withAuth";
import { withWallet } from "@/utils/withWallet";
import { isAddress } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const degreeContractAddress = process.env.NEXT_PUBLIC_DEGREE_TOKEN_ADDRESS || "";

function UniversityAddMahasiswa() {
    const router = useRouter();
    const { provider } = useWallet();
    const [listKurikulum, setListKurikulum] = useState<string[]>([]);
    const [universityContractAddress, setUniversityContractAddress] = useState("");
    const [formData, setFormData] = useState({
        walletAddress: '',
        npm: '',
        studentName: '',
        accumulatedCredits: BigInt(0),
        curriculumId: BigInt(0)
    })

    useEffect(() => {
        const f = async () => {
            if (provider) {
                const signer = await provider.getSigner();
                const degreeContract = DegreeToken__factory.connect(degreeContractAddress, signer);

                window.ethereum!
                    .request({ method: "eth_requestAccounts" })
                    .then(async (accounts: any) => {
                        const universityContractAddress = await degreeContract.universityToUniversityContract(accounts[0])
                        setUniversityContractAddress(universityContractAddress);
                        const universityContract = UniversityContract__factory.connect(universityContractAddress, signer);
                        for (let i = 0; i < await universityContract.curriculumsId(); i++) {
                            let curriculumAddress = await universityContract.curriculums(i);
                            let curriculumContract = CurriculumContract__factory.connect(curriculumAddress, signer);
                            let curriculum = await curriculumContract.curriculumDetail()
                            setListKurikulum(listKurikulum => [...listKurikulum, `${curriculum.major}, ${curriculum.name}`])
                        }
                    })
            }
        }
        f();
    }, [provider]);

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const addMahasiswa = async () => {
        if (provider) {
            const signer = await provider.getSigner();
            const contract = UniversityContract__factory.connect(universityContractAddress, signer);

            if (!isAddress(formData.walletAddress)) {
                toast.error('Address wallet tidak valid!')
                return;
            }

            const studentsId = await contract.studentsId();
            for (let i = 0; i < studentsId; i++) {
                let student = await contract.students(i);
                if (student.npm === formData.npm) {
                    toast.error(`Mahasiswa dengan NPM ${formData.npm} sudah tedaftar!`);
                    return;
                }

                if (student._address === formData.walletAddress) {
                    toast.error(`Wallet dengan address ${formData.walletAddress} sudah tedaftar!`);
                    return;
                }
            }

            await contract
                .addAStudent(formData.walletAddress, formData.npm, formData.studentName, formData.accumulatedCredits)
                .then(() => {
                    
                })
                .catch((err) => {
                    toast.error("Error, see error message");
                    console.error(err);
                    return
                });

            await contract
                .addStudentToCurriculum(studentsId, formData.curriculumId)
                .then(() => {
                    toast.success("success, wait a moment until changes are persisted");
                    router.push("/university")
                })
                .catch((err) => {
                    toast.error("Error, see error message");
                    console.error(err);
                    return
                });


        }
    }
    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h2 className="text-2xl font-bold pb-10">Add Course Form</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="walletAddress" className="block mb-2">Wallet Address:</label>
                    <input type="text" id="walletAddress" name="walletAddress" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="studentName" className="block mb-2">Student Name:</label>
                    <input type="text" id="studentName" name="studentName" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="npm" className="block mb-2">NPM:</label>
                    <input type="text" id="npm" name="npm" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="accumulatedCredits" className="block mb-2">Accumulated Credits:</label>
                    <input type="number" min={0} id="accumulatedCredits" name="accumulatedCredits" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label htmlFor="curriculumId" className="block mb-2">Curriculum:</label>
                    <select id="curriculumId" name="curriculumId" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange}>
                        <option value="" hidden>Select a curriculum</option>
                        {listKurikulum.map((kurikulum, index) => (
                            <option key={index} value={index}>{kurikulum}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addMahasiswa}>Submit</button>
                </div>
            </form>
        </main>
    )

}

export default withWallet(withAuth(UniversityAddMahasiswa, [ROLE.UNIVERSITY]) as any);