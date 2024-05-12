"use client";
import { withWallet } from "@/utils/withWallet";

 // This is a client component 👈🏽
function DeployCurriculum() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Click me
      </div>
    </main>
  );
}
export default withWallet(DeployCurriculum)