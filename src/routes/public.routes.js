import { Router } from "express";
import authRouter from "#/routes/public/auth.routes.js";
import recomendedProductRoutes from "#/routes/public/landingPage.routes.js";
import browseControllerRoutes from "./public/browseProduct.routes.js";
import userRoutes from "./users/users.routes.js";

const publicRouter = Router()

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *                 format: email
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully
*/
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

/**
 * 
 * @openapi
 * /browseproducts:
 *   get:
 *     tags:
 *       - Browse Product
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * /detailproduct/{id}:
 *   get:
 *     tags:
 *       - Browse Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 * 
*/
publicRouter.use("/", browseControllerRoutes)

export default publicRouter