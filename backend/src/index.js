import express from "express";
import authRoutes from "../routes/auth_route.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT

// middlewares 
app.use(express.json())




app.get("/",(req,res)=>{
    res.send("working fine")
})



// apis on app 
app.use("/api/auth" , authRoutes)



app.listen(PORT ,()=>{
console.log("app is running on" ,PORT);


})
