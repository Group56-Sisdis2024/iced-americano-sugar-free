"use client"; // This is a client component 👈🏽
import { ROLE } from "@/types/role";
import { withWallet } from "@/utils/withWallet";
import { withAuth } from "@/utils/withAuth";

function PddiktiPage() {
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">Only PDDIKTI</main>;
}

export default withWallet(withAuth(PddiktiPage, [ROLE.PDDIKTI]) as any)