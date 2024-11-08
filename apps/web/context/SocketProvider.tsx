
'use client'

import {io} from 'socket.io-client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { emit } from 'process'

interface IsocketInterface {
 sendMessage:(msg:string)=> any
}
type SocketProviderProps = {

}
const SocketContext = createContext<IsocketInterface| null>(null)  

export const useSocket=()=>{
    const state = useContext(SocketContext)
    if(!state){
        console.log('socket state not defined! ')
    }
    return state
}

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {

    const [socket, setSocket] = useState(null)
    const sendMessage: IsocketInterface['sendMessage'] = useCallback((msg)=>{
        console.log("send socket message",msg)
   socket && socket.emit("event:message",{message:msg})
    },[socket])
        const onMessage = useCallback((msg:string)=>{
        console.log("msg rec from server redis",msg)
        },[])
    useEffect(()=>{
        const _socket = io("http://localhost:8000")
        _socket.on('message',onMessage)
        setSocket(_socket)
        return ()=> {
            _socket.disconnect()
            _socket.off("message")
            setSocket(null)
        }
    },[])
    return (
    <SocketContext.Provider value={{sendMessage}}>
      {children}
    </SocketContext.Provider>
  )
}

