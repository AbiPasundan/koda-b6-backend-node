import { Router } from "express";
import authRouter from "./auth.routes.js";
// import userRouter from "./users.routes.js";

const publicRouter = Router()

publicRouter.use("/auth", authRouter)
// publicRouter.use("/admin", userRouter)

export default publicRouter