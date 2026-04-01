import { Router } from "express";
import authRouter from "#/routes/public/auth.routes.js";
// import adminRouter from "#/routes/admin.routes.js";
import userRouter from "#/routes/admin/users.routes.js";
import recomendedProductRoutes from "#/routes/public/landingPage.routes.js";

const publicRouter = Router()

publicRouter.use("/test", userRouter)
publicRouter.use("/auth", authRouter)
publicRouter.use("/products", recomendedProductRoutes)

export default publicRouter