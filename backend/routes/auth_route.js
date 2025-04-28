import express from "express"
import sendResponse from "../helpers/send-response.js"
import { checkAuth, getUser, login, logout, signup, updateProfile } from "../controller/auth-controller.js"
import { authenticateUser } from "../middlewares/auth-middleware.js"

const routes = express.Router()

routes.get("/", (req, res) => {

    sendResponse(res, 200, false, null, "/api/auth working fine")

})

routes.post("/signup", signup)

routes.post("/login", login )

routes.post("/logout", logout)

routes.put("/update-profile" , authenticateUser ,updateProfile)
routes.get("/user-info" , authenticateUser ,getUser)
routes.get("/check-auth" , authenticateUser ,checkAuth)

export default routes
