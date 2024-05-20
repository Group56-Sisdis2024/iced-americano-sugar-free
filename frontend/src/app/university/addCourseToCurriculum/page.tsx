'use client'
import { ROLE } from "@/types/role";
import { CurriculumContract__factory, DegreeToken__factory, UniversityContract__factory } from "@/types/typechain-types";
import { useWallet } from "@/utils/walletCtx";
import { withAuth } from "@/utils/withAuth";
import { withWallet } from "@/utils/withWallet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const degreeContractAddress = process.env.NEXT_PUBLIC_DEGREE_TOKEN_ADDRESS || "";

function UniversityAddCourse() {
    const router = useRouter();
    const { provider } = useWallet();
    const [listKurikulum, setListKurikulum] = useState<string[]>([]);
    const [universityContractAddress, setUniversityContractAddress] = useState("");
    const [courses, setCourses] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        courseId: BigInt(0),
        curriculumId: 0,
        isMandatory: 'false',
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

                        for (let i = 0; i < await universityContract.coursesId(); i++) {
                            let course = await universityContract.courses(i);
                            setCourses(courses => [...courses, course.name])
                        }
                    })
            }
        }
        f();
    }, []);

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const addCourseToCurriculum = async () => {
        if (provider) {
            const signer = await provider.getSigner();
            const universityContract = UniversityContract__factory.connect(universityContractAddress, signer);
            const curriculumContract = CurriculumContract__factory.connect(await universityContract.curriculums(formData.curriculumId), signer);
            
            for (let i = 0; i < await curriculumContract.coursesId(); i++) {
                let course = await curriculumContract.courses(i);
                if (course.id == formData.courseId) {
                    toast.error(`Mata kuliah ${course.name} sudah didaftarkan pada kurikulum ${listKurikulum[formData.curriculumId]}!`);
                    return;
                }
            }

            await universityContract
                .addCourseToCurriculum(formData.courseId, formData.curriculumId, formData.isMandatory == 'true')
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
            <h2 className="text-2xl font-bold pb-10">Add Course To Curriculum Form</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="courseId" className="block mb-2">Course:</label>
                    <select id="courseId" name="courseId" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange}>
                        <option value="" hidden>Select a course</option>
                        {courses.map((course, index) => (
                            <option key={index} value={index}>{course}</option>
                        ))}
                    </select>
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
                    <label htmlFor="isMandatory" className="block mb-2">Course Type:</label>
                    <select id="isMandatory" name="isMandatory" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange}>
                        <option value="" hidden>Select a type</option>
                        <option value="true">Mandatory</option>
                        <option value="false">Not Mandatory</option>
                    </select>
                </div>
                <div className="mb-4">
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addCourseToCurriculum}>Submit</button>
                </div>
            </form>
        </main>
    )

}

export default withWallet(withAuth(UniversityAddCourse, [ROLE.UNIVERSITY]) as any);