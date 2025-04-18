import express from "express";
import authRoutes from "../routes/auth_route.js"

const app = express()

// middlewares 
app.use(express.json())




app.get("/",(req,res)=>{
    res.send("working fine")
})



// apis on app 
app.use("/api/auth" , authRoutes)



app.listen(5001 ,()=>{
console.log("app is running on 5001");


})
