import { useEffect } from "react";
import { useWallet } from "./walletCtx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const withWallet = (ChildWithProps: React.ComponentType<any>) => {
  const WithProtection: React.FC = (props) => {
    const { isAuthenticated } = useWallet();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated != null && !isAuthenticated) {
        toast.error("You are not authenticated!");
        router.push("/");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? (
      <ChildWithProps {...props} />
    ) : (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="font-bold text-3xl">Loading</div>
      </main>
    );
  };
  return WithProtection;
};
