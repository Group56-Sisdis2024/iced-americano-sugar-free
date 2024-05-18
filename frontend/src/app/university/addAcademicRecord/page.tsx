"use client"

import { ROLE } from "@/types/role";
import { CurriculumContract__factory } from "@/types/typechain-types";
import { useWallet } from "@/utils/walletCtx";
import { withAuth } from "@/utils/withAuth";
import { withWallet } from "@/utils/withWallet";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Library } from "@/types/typechain-types/contracts/CurriculumContract";
import { useRouter } from "next/navigation";

const curriculumContractAddress = process.env.NEXT_PUBLIC_CURRICULUM_CONTRACT_ADDRESS || "";

function UniversityAddAcademicRecord() {
    const router = useRouter();
    const { provider } = useWallet();
    const [students, setStudents] = useState<{ namaNpm: string, academicRecords: Library.AcademicRecordStructOutput[] }[]>([]);
    const [courses, setCourses] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        studentId: -1,
        semester: '',
        status: '',
        passedCoursesId: [] as bigint[],
        takenCoursesId: [] as bigint[],
        takenCoursesGrade: [] as bigint[]
    });

    useEffect(() => {
        const f = async () => {
            if (provider) {
                const signer = await provider.getSigner();
                const contract = CurriculumContract__factory.connect(curriculumContractAddress, signer);

                for (let i = 0; i < await contract.coursesId(); i++) {
                    let course = await contract.courses(i);
                    setCourses(courses => [...courses, `${course.name}, SKS: ${course.credits}`])
                }

                for (let i = 0; i < await contract.studentsId(); i++) {
                    let student = await contract.getStudentInformation(i);
                    setStudents(students => [...students, { namaNpm: `${student[0].name}, NPM: ${student[0].npm}`, academicRecords: student[1] }])
                }
            }
        }
        f();
    }, []);

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        const { name, value } = e.target;
        if (name === 'semester') {
            setFormData({
                ...formData,
                [name]: `Semester ${value}`
            });

        } else if (name === 'takenCoursesGrade') {
            setFormData({
                ...formData,
                [name]: value.split(";").map((str: string) => BigInt(str.replace(/\./g, "")))
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const addAcademicRecord = async () => {
        if (formData.takenCoursesId.length !== formData.takenCoursesGrade.length) {
            toast.error("Jumlah course yang diambil dengan nilainya tidak sesuai!");
            return;
        }

        for (const record of students[formData.studentId].academicRecords) {
            if (record.semester === formData.semester) {
                toast.error("Academic record untuk semester ini sudah ada!");
                return;
            }
        }

        if (provider) {
            const signer = await provider.getSigner();
            const contract = CurriculumContract__factory.connect(curriculumContractAddress, signer);

            await contract
                .addAnAcademicRecord(
                    formData.studentId,
                    formData.semester,
                    formData.status,
                    formData.passedCoursesId,
                    formData.takenCoursesId,
                    formData.takenCoursesGrade
                )
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
        <NextUIProvider navigate={router.push}>
            <main className="flex min-h-screen flex-col items-center p-10">
                <h2 className="text-2xl font-bold pb-10">Academic Record Form</h2>
                <form className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="studentId" className="block mb-2">Student:</label>
                        <select id="studentId" name="studentId" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange}>
                            <option value="" hidden>Select a student</option>
                            {students.map((student, index) => (
                                <option key={index} value={index}>{student.namaNpm}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="semester" className="block mb-2">Semester:</label>
                        <input type="number" min={1} id="semester" name="semester" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block mb-2">Status:</label>
                        <select id="status" name="status" className="w-full px-3 py-2 border rounded-md" required onChange={handleChange}>
                            <option value="" hidden>Select a status</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                            <option value="Kampus Merdeka">Kampus Merdeka</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Passed Courses:</label>
                        <Select
                            aria-label="ts"
                            variant="bordered"
                            selectionMode="multiple"
                            size="md"
                            placeholder="Select passed courses"
                            isRequired
                            onSelectionChange={(keys) => setFormData({
                                ...formData,
                                ['passedCoursesId']: Array.from(keys as Set<string>).map((str: string) => BigInt(str))
                            })}
                        >
                            {courses.map((course, index) => (
                                <SelectItem key={index} value={index}>{course}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Taken Courses:</label>
                        <Select
                            aria-label="ts"
                            variant="bordered"
                            selectionMode="multiple"
                            size="md"
                            placeholder="Select taken courses"
                            isRequired
                            onSelectionChange={(keys) => setFormData({
                                ...formData,
                                ['takenCoursesId']: Array.from(keys as Set<string>).map((str: string) => BigInt(str))
                            })}
                        >
                            {courses.map((course, index) => (
                                <SelectItem key={index} value={index}>{course}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="takenCoursesGrade" className="block mb-2">Taken Courses Grade:</label>
                        <input type="text" id="takenCoursesGrade" name="takenCoursesGrade" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} />
                    </div>
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2" onClick={addAcademicRecord}>Submit</button>
                </form>
            </main>
        </NextUIProvider>
    )
}

export default withWallet(withAuth(UniversityAddAcademicRecord, [ROLE.UNIVERSITY]) as any);
