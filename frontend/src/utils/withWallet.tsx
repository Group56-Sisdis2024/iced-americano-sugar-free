import { useEffect } from "react";
import { useWallet } from "./walletCtx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const withWallet = (ChildWithProps: React.ComponentType<unknown | string>) => {
  const WithProtection: React.FC = () => {
    const { isAuthenticated } = useWallet();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated != null && !isAuthenticated) {
        toast.error("You are not authenticated!");
        router.push("/");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? (
      <ChildWithProps/>
    ) : (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="font-bold text-3xl">Loading</div>
      </main>
    );
  };
  return WithProtection;
};
