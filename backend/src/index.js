import express from "express";
import authRoutes from "../routes/auth_route.js"
import dotenv from "dotenv"
import { connectDb } from "../lib/connect-db.js";
import cookieParser from "cookie-parser"
import messageRoutes from "../routes/message_route.js"
import cors from 'cors'
import { app, server } from "../lib/socket.js";

dotenv.config()
// connecting database 
connectDb()

const PORT = process.env.PORT || 5001;

// middlewares 
app.use(cors({
    origin:"https://chatty-black-omega.vercel.app",
    credentials:true // send cookies etc 
}))
app.use(cookieParser())
// app.use(express.json())
app.use(express.json({ limit: '10mb' }))




app.get("/",(req,res)=>{
    res.send("working fine")
})



// apis on app 
app.use("/api/auth" , authRoutes)
//messages api
app.use("/api/message" ,messageRoutes)

server.listen(PORT ,()=>{
console.log("app is running on PORT:" ,PORT);


})
