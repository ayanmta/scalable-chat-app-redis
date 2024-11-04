import http from 'http'
import SocketService from './services/socket'

const httpServer =  http.createServer()
const socketService = new SocketService()
socketService.io.attach(httpServer)
const PORT = process.env.PORT??8000
httpServer.listen(PORT,()=>{
    console.log("started server on port",PORT)
})

socketService.InitSocketListeners()