import {Server} from 'socket.io'
import { Redis } from "ioredis";

import { createAdapter } from "@socket.io/redis-streams-adapter";
require('dotenv').config({ path: '../../.env' });

const pub = new Redis(`redis://:${process.env.AIVENPASS}@${process.env.AIVENHOST}:11139`);
const sub = new Redis(`redis://:${process.env.AIVENPASS}@${process.env.AIVENHOST}:11139`);

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
  

 })
 sub.subscribe("MESSAGES", (err, count) => {
    if (err) {
        console.error("Failed to subscribe to channel:", err.message);
    } else {
        console.log(`Subscribed to ${count} channel(s).`);
    }
});
 sub.on("message",(channel,message)=>{
    console.log("new message from reddis ", message)
    if(channel === "MESSAGES"){
        io.emit("message",message)
    }
})

    }
}

export default SocketService 