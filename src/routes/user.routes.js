import { Router } from "express";
import userRoutes from "./users/users.routes.js";
import profileRoutes from "./users/profile.routes.js";
import auth from "#/middleware/auth.middleware.js";

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
userRouter.use("/", auth(), userRoutes)

/**
 * @openapi
 * /profile:
 *   get:
 *     tags:
 *       - User Profile
 *     summary: Get user profile information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - User Profile
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRouter.use("/", auth(), profileRoutes)

export default userRouter