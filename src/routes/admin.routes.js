import { Router } from "express";
import userRouter from "#/routes/admin/users.routes.js";
import productsRouter from "#/routes/admin/products.routes.js";

const adminRouter = Router()

/**
 * 
 * @openapi
 * /admin/users:
 *   get:
 *     tags:
 *       - admin
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The number of items to return per page
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
*/
adminRouter.use("/admin", userRouter)
/**
 * 
 * @openapi
 * /admin/products:
 *   get:
 *     tags:
 *       - admin
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The number of items to return per page
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
*/
adminRouter.use("/admin", productsRouter)

export default adminRouter