import {Server} from 'socket.io'
import { Redis } from "ioredis";

import { createAdapter } from "@socket.io/redis-streams-adapter";


const pub=new Redis({
    host:process.env.AIVENHOST,
    port:11139,
    username:process.env.AIVENPASS,
    password:process.env.AIVENUSER
})
const sub=new Redis({
    host:process.env.AIVENHOST,
    port:11139,
    username:process.env.AIVENPASS,
    password:process.env.AIVENUSER
})


//create redis client and connect 
class SocketService {
    private _io:Server

    constructor(){
        console.log("in server")
        this._io=new Server({
            cors:{
                allowedHeaders:['*'],
                origin:'*'
            }
        })
    }
    get io(){
        return this._io
    }
    public InitSocketListeners() {
 const io = this.io
 console.log("init socket listeners")
 io.on('connect',(socket)=>{
    console.log("new socket connected",socket.id)

    socket.on("event:message",async({message}:{message:string})=>{
        console.log("new message",message)
        await pub.publish("MESSAGES",JSON.stringify({message}))
    })
    sub.on("message",(channel,message)=>{
        console.log("new message from reddis", message)
        if(channel === "MESSAGES"){
            io.emit("message",message)
        }
    })

 })

    }
}

export default SocketService 