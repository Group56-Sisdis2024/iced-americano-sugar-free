"use client"; // This is a client component 👈🏽
import { ROLE } from "@/types/role";
import { DegreeToken__factory, UniversityContract__factory } from "@/types/typechain-types";
import { useWallet } from "@/utils/walletCtx";
import { withAuth } from "@/utils/withAuth";
import { withWallet } from "@/utils/withWallet";
import { NextUIProvider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const degreeContractAddress = process.env.NEXT_PUBLIC_DEGREE_TOKEN_ADDRESS || "";

function FindIjazahPage() {
    const router = useRouter();
    const { provider } = useWallet();
    const [studentList, setStudentList] = useState<{ address: string, degreeId: string, studentName: string, npm: string, uniName: string }[]>([]);
    const [filterValue, setFilterValue] = useState("");

    const onClear = useCallback(() => {
        setFilterValue("");
    }, []);

    const onSearchChange = useCallback((value: any) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);

    useEffect(() => {
        const f = async () => {
            if (provider) {
                const signer = await provider.getSigner();
                const degreeContract = DegreeToken__factory.connect(degreeContractAddress, signer);
                for (let i = 0; i < await degreeContract.uniListsId(); i++) {
                    let uni = await degreeContract.uniLists(i);
                    let uniContract = UniversityContract__factory.connect(uni.uniAdress, signer);
                    for (let j = 0; j < await uniContract.studentsId(); j++) {
                        let [student, _] = await uniContract.getStudentInformation(j);
                        if (student.grantedDegreeId != BigInt(0)) {
                            setStudentList(students => [...students, {
                                address: student._address,
                                degreeId: student.grantedDegreeId.toString(),
                                studentName: student.name,
                                npm: student.npm,
                                uniName: uni.name
                            }])
                        }
                    }
                }
            }
        }
        f()
    }, [provider]);

    const hasSearchFilter = Boolean(filterValue);
    const filteredItems = useMemo(() => {
        let filteredStudent = [...studentList];
    
        if (hasSearchFilter) {
            filteredStudent = filteredStudent.filter((student) =>
            student.studentName.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
    
        return filteredStudent;
      }, [studentList, filterValue, hasSearchFilter]);

    const topContent = useMemo(() => {
        return (
            <Input
                isClearable
                placeholder="Search by Student's Name..."
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
            />
        );
    }, [filterValue, onSearchChange, onClear]);

    const columns = [
        {
            key: "degreeId",
            label: "DEGREE ID",
        },
        {
            key: "sutdentName",
            label: "STUDENT NAME",
        },
        {
            key: "npm",
            label: "NPM",
        },
        {
            key: "uniName",
            label: "UNIVERSITY",
        },
    ];

    return (
        <NextUIProvider navigate={router.push}>
            <main className="flex min-h-screen flex-col items-center gap-4 p-12">
                <Table
                    aria-label="Example table with dynamic content"
                    onRowAction={(key) => router.push(`/student/${key}`)}
                    selectionMode="single"
                    topContent={topContent}
                    topContentPlacement="outside"
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={filteredItems} emptyContent={"No rows to display."} >
                        {(item) => (
                            <TableRow key={item.address}>
                                <TableCell>{item.degreeId}</TableCell>
                                <TableCell>{item.studentName}</TableCell>
                                <TableCell>{item.npm}</TableCell>
                                <TableCell>{item.uniName}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </main>
        </NextUIProvider>);
}

export default withWallet(withAuth(FindIjazahPage, [ROLE.ANON, ROLE.PDDIKTI, ROLE.UNIVERSITY, ROLE.STUDENT]) as any)