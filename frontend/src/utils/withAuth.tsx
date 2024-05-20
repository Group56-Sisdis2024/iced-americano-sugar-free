import { useEffect } from "react";
import { useWallet } from "./walletCtx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ROLE } from "@/types/role";

export const withAuth = (ChildWithProps: React.ComponentType<any> , roles: ROLE[]) => {
  const WithProtection: React.FC = (props) => {
    const { role } = useWallet();
    const router = useRouter();

    useEffect(() => {
      if (role != null && !roles.includes(role)) {
        toast.error("You don't have the role necessary!");
        console.log(role)
        router.push("/");
      }
    }, [role, router]);

    return (role != null && roles.includes(role)) ? (
      <ChildWithProps {...props} />
    ) : (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="font-bold text-3xl">Loading</div>
      </main>
    );
  };
  return WithProtection;
};
