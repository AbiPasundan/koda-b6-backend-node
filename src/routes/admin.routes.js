import { Router } from "express";
import userRouter from "#/routes/admin/users.routes.js";
import productsRouter from "#/routes/admin/products.routes.js";

const adminRouter = Router()

adminRouter.use("/admin", userRouter)
adminRouter.use("/admin", productsRouter)

export default adminRouter