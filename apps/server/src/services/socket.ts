import {Server} from 'socket.io'
import { Redis } from "ioredis";

import { createAdapter } from "@socket.io/redis-streams-adapter";


const pub=new Redis({
    host:"caching-3c70657-mehtaayan18-5b7a.k.aivencloud.com",
    port:11139,
    username:"default",
    password:"AVNS_sGxOUwt56IVsyv6PsTy"
})
const sub=new Redis({
    host:"caching-3c70657-mehtaayan18-5b7a.k.aivencloud.com",
    port:11139,
    username:"default",
    password:"AVNS_sGxOUwt56IVsyv6PsTy"
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