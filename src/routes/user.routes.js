import { Router } from "express";
import userRoutes from "./users/users.routes.js";

const userRouter = Router()

// still in testing not implement middleware yet
userRouter.use("/", userRoutes)

export default userRouter