import { Router } from "express";
import authRouter from "#/routes/auth.routes.js";

const publicRouter = Router()

publicRouter.use("/auth", authRouter)

export default publicRouter