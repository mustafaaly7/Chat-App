import { Server } from "socket.io";
import express from "express";
import http from 'http'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin:"https://chatty-black-omega.vercel.app",
        credentials: true,
    }
})

export function getRecieverSocketId(userId){
    return userSocketMap[userId]
}

//used to store online user on the application
const userSocketMap = {} // {userId : socketId}


io.on("connection", (socket) => {
    console.log("A User Connected", socket.id)

    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id
    console.log("user ID", userSocketMap)
    //io.emit method send events to all the connected  clients  
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("A User Disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))

    })

})


export {
    io,
    server,
    app
}