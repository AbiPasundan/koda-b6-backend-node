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
userRouter.use("/", auth("user" || "admin"), userRoutes)

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
 * /update-profile:
 *   patch:
 *     tags:
 *       - User Profile
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Leave empty to keep existing data
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Leave empty to keep existing data
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Leave empty to keep existing data
 *               address:
 *                 type: string
 *                 description: Leave empty to keep existing data
 *               phone:
 *                 type: string
 *                 description: Leave empty to keep existing data
 *               pictures:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture upload. Leave empty to keep existing data
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * /request-forgot-password:
 *   post:
 *     tags:
 *       - User Profile
 *     summary: Request a password reset
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset request sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * /forgot-password:
 *   post:
 *     tags:
 *       - User Profile
 *     summary: Reset forgotten password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - new_password
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               new_password:
 *                 type: string
 *                 format: password
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
userRouter.use("/", auth("user" || "admin"), profileRoutes)

export default userRouter