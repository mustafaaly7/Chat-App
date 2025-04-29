import express from "express"
import { authenticateUser } from "../middlewares/auth-middleware.js"
import { getMessages, getUsersforSidebar, sendMessage } from "../controller/message-controller.js"

const routes = express.Router()


routes.get("/users" , authenticateUser , getUsersforSidebar)

routes.get("/:id" , authenticateUser , getMessages)

routes.post("/send/:id" , authenticateUser , sendMessage)

export default routes
