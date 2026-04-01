import { Router } from "express";
import userRouter from "#/routes/users.routes.js";
import auth from "../middleware/auth.middleware.js";

const adminRouter = Router()

adminRouter.use("/admin", auth, userRouter)

export default adminRouter