import sendResponse from "../helpers/send-response.js"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
import userModel from "../models/user-model.js"

export const authenticateUser = async (req, res, next) => {
    try {
// console.log("JWT" , req.cookies.jwt)

        const token = req.cookies.jwt
// console.log("JWT" , token)
        if (!token) return sendResponse(res, 400, true, null, "unAuthorized - No token provided ")

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        // console.log("decode" , decoded);
        
        if (!decoded) return sendResponse(res, 400, true, null, "unAuthorized - Invalid token ")
        const user = await userModel.findById(decoded.userId).select("-password") // select ("-password ") means dont add password to this data
    // console.log("user => " , user._id);
    
        if (!user) return sendResponse(res, 404, true, null, "User not found")

        req.user = user // means save the user that we got from token and covert it into the id found it then moving on after sending it on response 
        next()

    } catch (error) {
        sendResponse(res, 400, true, null, error.message)
    }




}


