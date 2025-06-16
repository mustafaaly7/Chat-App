import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

// just making a token of id 
export const generateToken = async (userId, res) => {

    const token = await jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })


    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days (milliseconds)

    httpOnly: true,  // Cookie is inaccessible to JS running in browser (protects from XSS attacks)

    /*
      sameSite: "None" 
      ----------------------------------
      - Allows cookie to be sent in cross-site requests.
      - Necessary because frontend (Vercel) and backend are on different origins.
      - "strict" or "lax" would block cross-site cookies and cause auth failure.
    */
    sameSite: "None",

    /*
      secure: true
      ----------------------------------
      - Cookies with sameSite: "None" must also be secure.
      - Ensures cookie is only sent over HTTPS connections.
      - Prevents sending cookies over insecure HTTP.
      - Since deployed sites use HTTPS, this should always be true in production.
    */
    secure: true,
    path: "/", // Optional but useful to explicitly define
    })

    return token
} 
