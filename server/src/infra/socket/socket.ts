import express from 'express'
import http from 'http'

import { Server } from 'socket.io'
import  cors  from 'cors'
import { GettingAllMessages } from '../../application/view/getting-all-message'
import { Message } from '../../application/entities/message'
import { SendMessage } from '../../application/view/send-message'
import { UserLikeMessage } from '../../application/view/user-like-message'
import { UserDeslikeMessage } from '../../application/view/user-deslike-message'

interface datasSendMessage {
    content : string
    userName : string
}

interface messageLikeAndDeslike {
    messageId : string
}

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server)

io.on("connection",(socket)=>{
    const userId = socket.id
    socket.on("user-connected-room",async (roomName)=>{
        socket.join(roomName)
        console.log(userId)
        io.to(roomName).emit(
            "user-getting-all-messages", 
            await new GettingAllMessages().execute(roomName) 
        )
            
        socket.on("user-send-message",async ({ content,userName}:datasSendMessage)=>{
            const message = new Message({content,userId,userName})
            await new SendMessage().execute(message,roomName)
            io.to(roomName).emit("user-last-message",message)
        })

        socket.on("user-like-message",async({messageId}:messageLikeAndDeslike)=>{
            
            const response = await new UserLikeMessage().execute({userActionId:userId,messageId},roomName)
            io.to(roomName).emit("user-get-last-like",response)
        })

        socket.on("user-deslike-message",async({ messageId }:messageLikeAndDeslike)=>{
            const response = await new UserDeslikeMessage().execute({userActionId:userId,messageId},roomName)
            io.to(roomName).emit("user-get-last-deslike",response)
        })
    })
})

server.listen(1337)
