'use client'
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Page() {
  const [msg,setMsg] = useState('')
  const socket = useSocket()
  const handleClick=()=>{
    socket?.sendMessage(msg)
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-gray-900 rounded-md py-10 px-10">
      <>
    <h1 className="font-bold text-center text-indigo-500 m-auto">Building cool stuff . . .</h1>
    <input className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full rounded-lg border-2 p-1" placeholder="enter username..." onChange={(e)=>setMsg(e.target.value)}/>

    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 content-center justify-center rounded-lg p-1 m-auto border-3 px-10 w-full" onClick={handleClick}>Join Room</button>
    </>
      </main>
    </div>
  );
}
