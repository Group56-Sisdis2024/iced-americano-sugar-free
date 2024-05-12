"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { BrowserProvider, ethers } from "ethers";
import toast from "react-hot-toast";
import { CurriculumContract__factory, DegreeToken__factory } from "@/types/typechain-types";
import { useWallet } from "@/utils/walletCtx";
import { useRouter } from "next/navigation";
import { ROLE } from "@/types/role";
import { withWallet } from "@/utils/withWallet";
import { withAuth } from "@/utils/withAuth";

const curriculumContractAddress = process.env.NEXT_PUBLIC_CURRICULUM_CONTRACT_ADDRESS || "";

function UniversityToggleCurriculum() {
  const { provider } = useWallet();
  // write
  const toggleCurriculum = async () => {
    if (provider) {
      // Do note akan ada CurriculumContract#<unrecognized-selector>
      // tapi diabaikan saja.
      // https://github.com/MetaMask/metamask-extension/issues/14963
      // https://ethereum.stackexchange.com/questions/124235/providererror-error-transaction-reverted-function-selector-was-not-recognized

      const signer = await provider.getSigner();
      const contract = CurriculumContract__factory.connect(curriculumContractAddress, signer);
      await contract
        .toggleActive() // the method
        .then(() => toast.success("success, wait a moment until changes are persisted"))
        .catch((err) => {
          toast.error("Error, see error message");
          console.error(err);
        });
    }
  };
  
  // read
  const consoleLogCurriculum = async () => {
    if (provider) {
      const contract = CurriculumContract__factory.connect(curriculumContractAddress, provider);
      try {
        const res = await contract.curriculumDetail();
        console.log(res.name);
        console.log(res.active);
      } catch (err) {
        toast.error("Error, see error message");
        console.error(err);
      }
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div onClick={consoleLogCurriculum}>Click here to show Curriculum details</div>
      <div onClick={toggleCurriculum}>Click Here to toggle Curriculum</div>
    </main>
  );
}

export default withWallet(withAuth(UniversityToggleCurriculum, [ROLE.UNIVERSITY]) as any);
