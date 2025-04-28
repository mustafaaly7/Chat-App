import express from "express"
import { authenticateUser } from "../middlewares/auth-middleware.js"
import { getUsersforSidebar } from "../controller/message-controller.js"

const routes = express.Router()


routes.get("/users" , authenticateUser , getUsersforSidebar)





export default routes
