import { Router } from "express";
import * as productsController from "#/controllers/products.controllers.js"

const productsRouter = Router()

productsRouter.get("/products", productsController.getAllProducts)
productsRouter.get("/products/:id", productsController.getProductById)
productsRouter.post("/products", productsController.createProduct)

export default productsRouter;

// example
// userRouter.post("/users", userController.createUser)
// userRouter.patch("/users/:id", userController.updateUser)
// userRouter.get("/users/:id", userController.getUserById)
// userRouter.delete("/users/:id", userController.deleteUser)
