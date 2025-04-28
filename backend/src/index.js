import express from "express";
import authRoutes from "../routes/auth_route.js"
import dotenv from "dotenv"
import { connectDb } from "../lib/connect-db.js";
import cookieParser from "cookie-parser"
import messageRoutes from "../routes/message_route.js"

dotenv.config()
// connecting database 
connectDb()

const app = express()
const PORT = process.env.PORT
// middlewares 
app.use(cookieParser())
app.use(express.json())




app.get("/",(req,res)=>{
    res.send("working fine")
})



// apis on app 
app.use("/api/auth" , authRoutes)
//messages api
app.use("/api/message" ,messageRoutes)

app.listen(PORT ,()=>{
console.log("app is running on PORT:" ,PORT);


})
