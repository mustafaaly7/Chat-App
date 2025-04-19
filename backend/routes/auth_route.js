import express from "express"
import sendResponse from "../helpers/send-response.js"
import { signup } from "../controller/auth-controller.js"

const routes = express.Router()

routes.get("/", (req, res) => {

    sendResponse(res, 200, false, null, "/api/auth working fine")

})

routes.post("/signup", signup)

// routes.post("/login", )


export default routes
