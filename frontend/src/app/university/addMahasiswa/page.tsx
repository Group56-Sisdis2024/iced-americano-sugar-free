'use client'
import { ROLE } from "@/types/role";
import { CurriculumContract__factory } from "@/types/typechain-types";
import { useWallet } from "@/utils/walletCtx";
import { withAuth } from "@/utils/withAuth";
import { withWallet } from "@/utils/withWallet";
import { isAddress } from "ethers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const curriculumContractAddress = process.env.NEXT_PUBLIC_CURRICULUM_CONTRACT_ADDRESS || "";

function UniversityAddMahasiswa() {
    const router = useRouter();
    const { provider } = useWallet();
    const [formData, setFormData] = useState({
        walletAddress: '',
        npm: '',
        studentName: '',
        accumulatedCredits: BigInt(0)
    })

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const addMahasiswa = async () => {
        console.log(formData)
        if (provider) {
            const signer = await provider.getSigner();
            const contract = CurriculumContract__factory.connect(curriculumContractAddress, signer);

            if (!isAddress(formData.walletAddress)){
                toast.error('Address wallet tidak valid!')
                return;
            }

            for (let i = 0; i < await contract.studentsId(); i++) {
                let student = await contract.getStudentInformation(i);
                if (student[0].npm === formData.npm) {
                    toast.error(`Mahasiswa dengan NPM ${formData.npm} sudah tedaftar!`);
                    return;
                }

                if (student[0]._address === formData.walletAddress) {
                    toast.error(`Wallet dengan address ${formData.walletAddress} sudah tedaftar!`);
                    return;
                }
            }

            await contract
                .addAStudent(formData.walletAddress, formData.npm, formData.studentName, formData.accumulatedCredits)
                .then(() => {
                    toast.success("success, wait a moment until changes are persisted");
                    router.push("/university");
                })
                .catch((err) => {
                    toast.error("Error, see error message");
                    console.error(err);
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
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addMahasiswa}>Submit</button>
                </div>
            </form>
        </main>
    )

}

export default withWallet(withAuth(UniversityAddMahasiswa, [ROLE.UNIVERSITY]) as any);