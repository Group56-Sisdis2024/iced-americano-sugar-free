"use client"; // This is a client component 👈🏽
import { ROLE } from "@/types/role";
import { DegreeToken__factory } from "@/types/typechain-types";
import { BrowserProvider, ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IWalletContext {
  provider: BrowserProvider | null;
  account: string
  role: ROLE | null
  isAuthenticated: boolean | null
}

const WalletContext = createContext<IWalletContext>({
  provider: null,
  role: null,
  account: "",
  isAuthenticated: null
});
const degreeAddress = process.env.NEXT_PUBLIC_DEGREE_TOKEN_ADDRESS || "";

export const WalletAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string>("");
  const [role, setRole] = useState<ROLE | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const onAccountChanged = async () => {
      await window.ethereum
        ?.request({ method: "eth_requestAccounts" })
        .then((res: any) => {
          toast.success(`Your account will be: ${res[0].substring(0, 10)}...`);
          setAccount(res[0]);
        })
        .catch((err: any) => {
          toast.error("Uh oh, error when changing account, check your console logs");
          console.error(err);
        });
    };
  
    const loadMetamask = async () => {
      if (window.ethereum != null) {
        window.ethereum.on("accountsChanged", onAccountChanged);
        const _provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(_provider);
        if (!(await window.ethereum._metamask.isUnlocked())) {
          toast.error("Your metamask is locked");
          setIsAuthenticated(false)
        } else {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts: any) => {
              if (accounts.length > 0) {
                toast.success(`Your account will be: ${accounts[0].substring(0, 10)}...`);
                setAccount(accounts[0] as string);
                setIsAuthenticated(true)
              } else {
                toast.error("No accounts connected!");
                setIsAuthenticated(false)
              }
            })
            .catch((error) => toast.error("Failed to load account"));
        }
      } else {
        toast.error("Please install metamask!");
        setIsAuthenticated(false)
      }
    };
    loadMetamask();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  useEffect(() => {
    async function checkRole() {
      if (provider && account) {
        const degreeToken = await DegreeToken__factory.connect(degreeAddress, provider);
        const role = await degreeToken.roles(ethers.getAddress(account));
        setRole(Number(role));
      }
    }
    checkRole()
  }, [provider, account]);

  return <WalletContext.Provider value={{provider, account, role, isAuthenticated}}>{children}</WalletContext.Provider>;
};

export const useWallet = ()=>{
  const context = useContext(WalletContext)
  if (context === undefined || context === null) {
    throw new Error(`useUserContext must be called within UserProvider`);
  }
  return context;
}