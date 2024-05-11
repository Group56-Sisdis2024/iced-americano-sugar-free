"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import {BrowserProvider, ethers} from "ethers"
import toast from "react-hot-toast";
import { SmartContract } from "@/services/ethers/client";

export default function Home() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [account, setAccount] = useState<string>()

  const tryThis = async () => {
    if(provider){
      const students = await SmartContract.getInstance(provider).getStudents()
    }
  }

  const onAccountChanged = async () => {
    await window.ethereum?.request({ method: 'eth_requestAccounts' }).then((res: any)=> {
      toast.success(`Your account will be: ${res[0].substring(0, 10)}...`)
      setAccount(res[0])
    }).catch((err: any)=> {
      toast.error("Uh oh, error when changing account, check your console logs")
      console.error(err)
    })
  }

  const loadMetamask = async () => {
    if (window.ethereum != null){
      window.ethereum.on('accountsChanged', onAccountChanged)
      const _provider = new ethers.BrowserProvider(window.ethereum)
      console.log(await _provider.getNetwork())
      setProvider(_provider)
      if(!(await window.ethereum._metamask.isUnlocked())){
        toast.error("Your metamask is locked")
      }else{
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: any) =>{
          if(accounts.length > 0){
            toast.success(`Your account will be: ${accounts[0].substring(0, 10)}...`)
            setAccount(accounts[0] as string)
          }else{
            toast.error("No accounts connected!")
          }
        }).catch((error) => toast.error("Failed to load account"))
      }
    }else{
      toast.error("Please install metamask!")
    }
  }

  useEffect(() => {
    loadMetamask()
    return ()=>{
      if(window.ethereum){
        window.ethereum.removeAllListeners()
      }
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
 
    </main>
  );
}
