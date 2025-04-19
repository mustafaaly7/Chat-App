import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken"

// just making a token of id 
export const generateToken = async (userId, res) => {

    const token = await jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })


    res.cookie("Jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // converts 7days into milliseconds cookie expiry time
        httpOnly: true, // Storing the token as an httpOnly cookie makes it less vulnerable to XSS (Cross-Site Scripting) attacks.
        sameSite: "strict", //Prevents the browser from sending this cookie along with cross-site requests.
        secure : process.env.NODE_ENV !== "development"
    })

    return token
} 
