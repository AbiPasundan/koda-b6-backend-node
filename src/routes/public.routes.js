import { Router } from "express";
import authRouter from "#/routes/auth.routes.js";
// import adminRouter from "#/routes/admin.routes.js";
import userRouter from "#/routes/users.routes.js";

const publicRouter = Router()

publicRouter.use("/test", userRouter)
publicRouter.use("/auth", authRouter)

export default publicRouter