"use client";
import { UniversityContract__factory } from "@/types/typechain-types";
import { useWallet } from "@/utils/walletCtx";
import { withWallet } from "@/utils/withWallet";
import { ethers } from "ethers";

const degreeAddress = ethers.getAddress(process.env.NEXT_PUBLIC_DEGREE_TOKEN_ADDRESS || "");

function DeployUniversity() {
  const { provider } = useWallet();

  const deployUniversityContract = async () => {
    if (provider) {
      const signer = await provider.getSigner();
      const newcontract = await new UniversityContract__factory(signer).deploy(degreeAddress, "Universitas Gunadarma");
      console.log(await newcontract.getAddress());
    }
  };

  const registerCurriculumToUniversity = async () => {};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div onClick={deployUniversityContract}>Click me to deploy univ contract</div>
    </main>
  );
}
export default withWallet(DeployUniversity);
