import sendResponse from "../helpers/send-response.js"
import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import userModel from "../models/user-model.js"
import { loginSchema, signupSchema } from "../models/validationSchema/auth-scehma.js"
import bcrypt from "bcryptjs"

// signup request function 

export const signup = async (req, res) => {

    try {
        // used joi for validation  

        const { error, value } = signupSchema.validate(req.body)

        if (error) return sendResponse(res, 400, true, null, error.message)

        // checking if user already exist or not 

        const existingUser = await userModel.findOne({ email: value.email });
        // console.log("existing user ", existingUser);

        if (existingUser) return sendResponse(res, 400, true, null, "Email Already Registered")

        // bcrypting password 

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(value.password, salt)
        value.password = hashedPassword

        let registerUser = new userModel(value)

        if (!registerUser) return sendResponse(res, 400, true, null, "invalid user data")

        //this will store the token on  cookie more secure then on with the  frontend 
        generateToken(registerUser._id, res)

        await registerUser.save()
        sendResponse(res, 201, false, registerUser, "user Created Successfully")


    } catch (error) {
        sendResponse(res, 400, true, null, error.message)

    }



}

// login controller 

export const login = async (req, res) => {


    try {

        // used joi for validation  

        const { error, value } = loginSchema.validate(req.body)

        if (error) return sendResponse(res, 400, true, null, error.message)

        // checking if user  exist or not 
        const existingUser = await userModel.findOne({ email: value.email });

        if (!existingUser) return sendResponse(res, 404, true, null, "Invalid Credentials")


        // checking if bcrypted password is correct or not 

        const isPasswordcorrect = await bcrypt.compare(value.password, existingUser.password)
        if (!isPasswordcorrect) return sendResponse(res, 404, true, null, "Invalid Credentials")


        // calling generate token function to store token of user's id in cookie from backend more securely  
        await generateToken(existingUser.id, res)

        // deleting user's password only in req not from backend its still saved as bcrypted password

        const userData = existingUser.toObject(); // to object is a good way to delete it instead of sending values in a seperate object 
        delete userData.password;

        sendResponse(res, 200, false, userData, "User logged in successfully");

    } catch (error) {
        sendResponse(res, 400, true, null, error.message)

    }


}

// logout controller 

export const logout = async (req, res) => {

    try {

        res.cookie("jwt", " ", { maxAge: 0 })

        sendResponse(res, 200, false, null, "Logged out successfully ")
    } catch (error) {
        sendResponse(res, 400, true, null, error.message)

    }

}

// updating pfp  controller 

export const updateProfile = async (req, res) => {

    try {
        const { profilePic } = req.body
        const userId = req.user._id;

        if (!profilePic) return sendResponse(res, 400, true, null, "profile pic required")

        const uploadResponse = await cloudinary.uploader.upload(profilePic) // upload the picture on cloudinary and give the url 

        const updatedUser = await userModel.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true }) // upload the url which is secure in mongodb  after finding user by id 


        sendResponse(res, 200, false, updatedUser, "Profile Picture Updated Successfully")

    } catch (error) {
        sendResponse(res, 400, true, null, error.message)

    }


}

// get user info without password  controller 

export const getUser = async (req,res)=>{

    try {
        
    
const userId = req.user._id;

if(!userId) return sendResponse(res, 400, true, null, "token required")

const userInfo = await userModel.findById(userId)
if(!userInfo) return sendResponse(res, 404, true, null, "User not found")

    const userData = userInfo.toObject()
    delete userData.password
    
sendResponse(res , 200 , false , userData , "User Data Fetched Successfully" )

} catch (error) {
        sendResponse(res, 400, true, null, error.message)
        
}

}

// checking if token is there or not to revalidate  controller 

export const checkAuth = (req,res)=>{
try {
sendResponse(res , 200 , false , req.user , "User Data Fetched Successfully" )
    
} catch (error) {
    sendResponse(res, 400, true, null, error.message)
    
}

}