'use client'
import { ROLE } from "@/types/role";
import { DegreeToken__factory, UniversityContract__factory } from "@/types/typechain-types";
import { useWallet } from "@/utils/walletCtx";
import { withAuth } from "@/utils/withAuth";
import { withWallet } from "@/utils/withWallet";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const degreeContractAddress = process.env.NEXT_PUBLIC_DEGREE_TOKEN_ADDRESS || "";

function UniversityAddCourse() {
    const router = useRouter();
    const { provider } = useWallet();
    const [formData, setFormData] = useState({
        courseName: '',
        credits: BigInt(0),
    })

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const addCourse = async () => {
        if (provider) {
            const signer = await provider.getSigner();
            const degreeContract = DegreeToken__factory.connect(degreeContractAddress, signer);

            window.ethereum!
                .request({ method: "eth_requestAccounts" })
                .then(async (accounts: any) => {
                    const universityContractAddress = await degreeContract.universityToUniversityContract(accounts[0])
                    const universityContract = UniversityContract__factory.connect(universityContractAddress, signer);
                    for (let i = 0; i < await universityContract.coursesId(); i++) {
                        let course = await universityContract.courses(i);
                        if (course.name === formData.courseName) {
                            toast.error(`Sudah terdapat mata kuliah dengan nama ${course.name}!`);
                            return;
                        }
                    }

                    await universityContract
                        .addACourse(formData.courseName, formData.credits)
                        .then(() => {
                            toast.success("success, wait a moment until changes are persisted");
                            router.push("/university");
                        })
                        .catch((err) => {
                            toast.error("Error, see error message");
                            console.error(err);
                        });
                })
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-10">
            <h2 className="text-2xl font-bold pb-10">Add Course Form</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="courseName" className="block mb-2">Course Name:</label>
                    <input type="text" id="courseName" name="courseName" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="credits" className="block mb-2">Credits:</label>
                    <input type="number" min={1} id="credits" name="credits" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addCourse}>Submit</button>
                </div>
            </form>
        </main>
    )

}

export default withWallet(withAuth(UniversityAddCourse, [ROLE.UNIVERSITY]) as any);