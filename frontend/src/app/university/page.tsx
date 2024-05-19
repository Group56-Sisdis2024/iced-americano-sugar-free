"use client"; // This is a client component 👈🏽
import { ROLE } from "@/types/role";
import { withWallet } from "@/utils/withWallet";
import { withAuth } from "@/utils/withAuth";

function UniversityPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Only University
      <a href="/university/addCourse">Click here to add course</a>
      <a href="/university/addCourseToCurriculum">Click here to add course to curriculum</a>
      <a href="/university/addMahasiswa">Click here to add student</a>
      <a href="/university/addAcademicRecord">Click here to add academic record</a>
    </main>);
}

export default withWallet(withAuth(UniversityPage, [ROLE.UNIVERSITY]) as any)