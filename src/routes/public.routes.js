import { Router } from "express";
import authRouter from "#/routes/public/auth.routes.js";
// import adminRouter from "#/routes/admin.routes.js";
import userRouter from "#/routes/admin/users.routes.js";
import recomendedProductRoutes from "#/routes/public/landingPage.routes.js";
import browseControllerRoutes from "./public/browseProduct.routes.js";

const publicRouter = Router()

publicRouter.use("/test", userRouter)
publicRouter.use("/auth", authRouter)

/**
 * 
 * @openapi
 * /products/home:
 *   get:
 *     tags:
 *       - Landing Page
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * /products/reviews:
 *   get:
 *     tags:
 *       - Landing Page
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
*/
publicRouter.use("/products", recomendedProductRoutes)
publicRouter.use("/", browseControllerRoutes)

export default publicRouter