import { Router } from "express";
import userRouter from "#/routes/admin/users.routes.js";

const adminRouter = Router()

adminRouter.use("/admin", userRouter)

export default adminRouter