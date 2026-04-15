import { Router } from "express";
import * as authController from "#/controllers/auth.controller.js"
import authLimiter from "#/middleware/rateLimit.middleware.js";

const authRouter = Router()

authRouter.post("/login", authLimiter, authController.login)
authRouter.post("/register", authLimiter, authController.register)

export default authRouter;