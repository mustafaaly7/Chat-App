import express from "express"
import sendResponse from "../helpers/send-response.js"

const routes = express.Router()

routes.get("/",(req,res)=>{

sendResponse(res , 200 , false ,null , "/api/auth working fine" )

})




export default routes
