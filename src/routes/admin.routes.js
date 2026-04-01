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
 *       - Admin Users CRUD
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
 *   post:
 *     tags:
 *       - Admin Users CRUD
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * /admin/users/{id}:
 *   get:
 *     tags:
 *       - Admin Users CRUD
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User Id
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   patch:
 *     tags:
 *       - Admin Users CRUD
 *     summary: Update a user's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             description: User data to update (at least one field is typically provided)
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Admin Users CRUD
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User Id
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
 *       - Admin Product CRUD
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