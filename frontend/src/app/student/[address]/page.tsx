"use client"; // This is a client component 👈🏽
import { ROLE } from "@/types/role";
import { withWallet } from "@/utils/withWallet";
import { withAuth } from "@/utils/withAuth";
import { useWallet } from "@/utils/walletCtx";
import { useEffect, useState } from "react";
import { CurriculumContract__factory, DegreeToken__factory, UniversityContract__factory } from "@/types/typechain-types";
import { Library } from "@/types/typechain-types/contracts/CurriculumContract";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab } from "@nextui-org/react";

const degreeContractAddress = process.env.NEXT_PUBLIC_DEGREE_TOKEN_ADDRESS || "";

function StudentInfoPage({ params }: { params: { address: string } }) {
    const { provider } = useWallet();
    const [student, setStudent] = useState<Library.StudentStructOutput>();
    const [uniName, setUniName] = useState("");
    const [majorName, setMajorName] = useState("");
    const [academicRecord, setAcademicRecord] = useState<Library.AcademicRecordStructOutput[]>([]);
    const [cumulativeAcademicRecord, setCumulativeAcademicRecord] = useState<{
        id: number,
        sksA: number,
        sksL: number,
        mutu: number,
        IPT: number,
        IPK: number}[]>([]);
    const [riwayat, setRiwayat] = useState<{ id: string, courseName: string, credits: number, status: string, grade: number }[][]>([]);

    useEffect(() => {
        const f = async () => {
            if (provider) {
                const signer = await provider.getSigner();
                const degreeContract = DegreeToken__factory.connect(degreeContractAddress, signer);
                const uniAddress = await degreeContract.studentsToUniverity(params.address);
                const uniContract = UniversityContract__factory.connect(uniAddress, signer);

                const { name } = await uniContract.universityInfo();
                setUniName(name);

                const [_student, _academicRecord] = await uniContract.getStudentInformationByAddress(params.address);
                setStudent(_student);
                setAcademicRecord(_academicRecord);

                if (_academicRecord.length != 0) {
                    setCumulativeAcademicRecord([{
                        id: 0,
                        sksA: Number(_academicRecord[0].totalCreditsTaken),
                        sksL: Number(_academicRecord[0].totalCreditsPassed),
                        mutu: Number(_academicRecord[0].weightedTotalGrade),
                        IPT: _academicRecord[0].totalCreditsTaken != BigInt(0)
                            ? Number(_academicRecord[0].weightedTotalGrade * BigInt(100) / _academicRecord[0].totalCreditsTaken) / 100
                            : 0,
                        IPK: _academicRecord[0].totalCreditsPassed != BigInt(0)
                            ? Number(_academicRecord[0].weightedTotalPassedGrade * BigInt(100) / _academicRecord[0].totalCreditsPassed) / 100
                            : 0,
                    }])

                    for (let i = 1; i < _academicRecord.length; i++) {
                        setCumulativeAcademicRecord(arr => [...arr, {
                            id: i,
                            sksA: arr[i - 1].sksA + Number(_academicRecord[i].totalCreditsTaken),
                            sksL: arr[i - 1].sksL + Number(_academicRecord[i].totalCreditsPassed),
                            mutu: arr[i - 1].mutu + Number(_academicRecord[i].weightedTotalGrade),
                            IPT: arr[i - 1].sksA + Number(_academicRecord[i].totalCreditsTaken) != 0
                                ? (arr[i - 1].mutu + Number(_academicRecord[i].weightedTotalGrade)) * 100 / (arr[i - 1].sksA + Number(_academicRecord[i].totalCreditsTaken)) / 100
                                : 0,
                            IPK: arr[i - 1].sksL + Number(_academicRecord[i].totalCreditsPassed) != 0
                                ? (Math.round(arr[i-1].sksL*arr[i-1].IPK) + Number(_academicRecord[i].weightedTotalPassedGrade)) * 100 / (arr[i - 1].sksL + Number(_academicRecord[i].totalCreditsPassed)) / 100
                                : 0
                        }])
                    }

                    for (let i = 0; i < _academicRecord.length; i++) {
                        let tempArr: {id: string, courseName: string, credits: number, status: string, grade: number }[] = [];
                        for (let j = 0; j < _academicRecord[i].takenCoursesId.length; j++) {
                            let course = await uniContract.courses(_academicRecord[i].takenCoursesId[j]);
                            tempArr = [...tempArr, {
                                id: `${i}${j}`,
                                courseName: course.name,
                                credits: Number(course.credits),
                                status: _academicRecord[i].passedCoursesId.includes(_academicRecord[i].takenCoursesId[j]) ? "Lulus" : "Tidak Lulus",
                                grade: Number(_academicRecord[i].takenCoursesGrade[j])
                            }]
                        }
                        setRiwayat(arr => [...arr, tempArr])
                    }
                }

                const curricuculumContract = CurriculumContract__factory.connect(await uniContract.curriculums(_student.curriculumId), signer);
                const { major } = await curricuculumContract.curriculumDetail();
                setMajorName(major);
            }
        }
        f()
    }, [params.address, provider]);

    if (student == undefined) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="font-bold text-3xl">Loading</div>
            </main>
        );
    }

    return (
        <main className="p-8">
            <Tabs aria-label="Options" color="primary">
                <Tab key="ringkasan" title="Ringkasan">
                    <div className="flex min-h-screen flex-col items-start gap-4">
                        <Table
                            hideHeader
                            isStriped
                            topContent={<h1 className="text-xl font-bold">Biodata Mahasiswa</h1>}
                            topContentPlacement="outside"
                        >
                            <TableHeader>
                                <TableColumn >1</TableColumn>
                                <TableColumn >2</TableColumn>
                            </TableHeader>
                            <TableBody  >
                                <TableRow key="1">
                                    <TableCell>NPM</TableCell>
                                    <TableCell>{student.npm}</TableCell>
                                </TableRow>
                                <TableRow key="2" >
                                    <TableCell>Nama</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell>Perguruan Tinggi</TableCell>
                                    <TableCell>{uniName}</TableCell>
                                </TableRow>
                                <TableRow key="4">
                                    <TableCell>Program Studi</TableCell>
                                    <TableCell>{majorName}</TableCell>
                                </TableRow>
                                <TableRow key="5">
                                    <TableCell>Status Akademis</TableCell>
                                    <TableCell>{student.grantedDegreeId != BigInt(0) ? "Lulus" : academicRecord.length != 0 ? academicRecord[academicRecord.length - 1].status : "Tidak Ada"}</TableCell>
                                </TableRow>
                                <TableRow key="6">
                                    <TableCell>Total SKS Lulus</TableCell>
                                    <TableCell>{student.accumulatedCredits.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow key="7">
                                    <TableCell>Total Mutu</TableCell>
                                    <TableCell>{student.weightedTotalGrade.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow key="8">
                                    <TableCell>IPK</TableCell>
                                    <TableCell>{student.accumulatedCredits != BigInt(0) ? Number(student.weightedTotalGrade * BigInt(100) / student.accumulatedCredits) / 100 : 0}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <h1 className="text-xl font-bold">Statistik Nilai</h1>
                        <div className="grid w-full gap-2" style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))"}}>
                            <Table
                                isStriped
                                topContent={<h1 className="text-md font-bold">Periode</h1>}
                                topContentPlacement="outside"
                                className="col-span-3"
                            >
                                <TableHeader>
                                    <TableColumn align="center" >Semester</TableColumn>
                                    <TableColumn align="center" >Status</TableColumn>
                                </TableHeader>
                                <TableBody items={academicRecord} >
                                    {(item) => (
                                        <TableRow key={item.semester}>
                                            <TableCell>{item.semester}</TableCell>
                                            <TableCell>{item.status}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <Table
                                isStriped
                                topContent={<h1 className="text-md font-bold">Per Semester</h1>}
                                topContentPlacement="outside"
                                className="col-span-5"
                            >
                                <TableHeader>
                                    <TableColumn align="center" >MK</TableColumn>
                                    <TableColumn align="center" >SKS A</TableColumn>
                                    <TableColumn align="center" >SKS L</TableColumn>
                                    <TableColumn align="center" >Mutu</TableColumn>
                                    <TableColumn align="center" >IP</TableColumn>
                                </TableHeader>
                                <TableBody items={academicRecord} >
                                    {(item) => (
                                        <TableRow key={item.semester}>
                                            <TableCell>{item.takenCoursesId.length}</TableCell>
                                            <TableCell>{item.totalCreditsTaken.toString()}</TableCell>
                                            <TableCell>{item.totalCreditsPassed.toString()}</TableCell>
                                            <TableCell>{item.weightedTotalGrade.toLocaleString()}</TableCell>
                                            <TableCell>{item.totalCreditsTaken != BigInt(0) ? (Number(item.weightedTotalGrade * BigInt(100) / item.totalCreditsTaken) / 100).toFixed(2) : 0}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <Table
                                isStriped
                                topContent={<h1 className="text-md font-bold">Kumulatif</h1>}
                                topContentPlacement="outside"
                                className="col-span-5"
                            >
                                <TableHeader>
                                    <TableColumn align="center" >SKS A</TableColumn>
                                    <TableColumn align="center" >SKS L</TableColumn>
                                    <TableColumn align="center" >Mutu</TableColumn>
                                    <TableColumn align="center" >IPT</TableColumn>
                                    <TableColumn align="center" >IPK</TableColumn>
                                </TableHeader>
                                <TableBody items={cumulativeAcademicRecord} >
                                    {(item) => (
                                        <TableRow key={item.id} >
                                            <TableCell>{item.sksA}</TableCell>
                                            <TableCell>{item.sksL}</TableCell>
                                            <TableCell>{item.mutu}</TableCell>
                                            <TableCell>{item.IPT.toFixed(2)}</TableCell>
                                            <TableCell>{item.IPK.toFixed(2)}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </Tab>
                <Tab key="riwayat" title="Riwayat">
                    {riwayat.map((elem, index) => (
                        <Table
                            isStriped
                            topContent={<h1 className="text-lg font-bold">{`Semester ${index + 1}`}</h1>}
                            topContentPlacement="outside"
                            className="pb-6"
                            key={index}
                        >
                            <TableHeader>
                                <TableColumn align="center" >Mata Kuliah</TableColumn>
                                <TableColumn align="center" >SKS</TableColumn>
                                <TableColumn align="center" >Status</TableColumn>
                                <TableColumn align="center" >Nilai</TableColumn>
                            </TableHeader>
                            <TableBody items={elem} >
                                {(item) => (
                                    <TableRow key={item.id} >
                                        <TableCell>{item.courseName}</TableCell>
                                        <TableCell>{item.credits}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.grade}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    ))}

                </Tab>
            </Tabs>

        </main>);
}

export default withWallet(withAuth(StudentInfoPage, [ROLE.ANON, ROLE.PDDIKTI, ROLE.STUDENT, ROLE.UNIVERSITY]) as any)