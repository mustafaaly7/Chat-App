import sendResponse from "../helpers/send-response.js"
import { generateToken } from "../lib/utils.js"
import userModel from "../models/user-model.js"
import { signupSchema } from "../models/validationSchema/auth-scehma.js"
import bcrypt from "bcryptjs"


export const signup = async (req, res) => {

    try {
        // used joi for validation  

        const { error, value } = signupSchema.validate(req.body)

        if (error) return sendResponse(res, 400, true, null, error.message)

        // checking if user already exist or not 

        const existingUser = await userModel.findOne({ email: value.email });
console.log("existing user " , existingUser);

        if (existingUser) return sendResponse(res, 400, true, null, "Email Already Registered")

            // bcrypting password 

const salt = await bcrypt.genSalt(12)
const hashedPassword = await bcrypt.hash(value.password,salt)
value.password = hashedPassword

let registerUser = new userModel(value)

if(!registerUser)return sendResponse(res, 400 , true ,null , "invalid user data") 
    
    //this will store the token on  cookie more secure then on with the  frontend 
    generateToken(registerUser._id ,res)

    await registerUser.save()
    sendResponse(res , 201 , false , registerUser , "user Created Successfully" )


    } catch (error) {
        sendResponse(res, 400, true, null, error.message)

    }



}