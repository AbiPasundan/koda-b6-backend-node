import { Router } from "express";
import userRoutes from "./users/users.routes.js";

const userRouter = Router()

/**
 * @openapi
 * /detailproduct/addcart:
 *   post:
 *     tags:
 *       - User Cart
 *     summary: Add a product to the user's cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               product_id:
 *                 type: integer
 *                 example: 7
 *               quantity:
 *                 type: integer
 *                 example: 3
 *               product_name:
 *                 type: string
 *                 example: "Kapal Api Latte"
 *               base_price:
 *                 type: number
 *                 example: 1000
 *               variant_name:
 *                 type: string
 *                 example: "sweet variant"
 *               size_name:
 *                 type: string
 *                 example: "Regular"
 *     responses:
 *       201:
 *         description: Success Add to cart
 *       400:
 *         description: Failed to add to cart
 */
// still in testing not implement middleware yet
userRouter.use("/", userRoutes)

export default userRouter