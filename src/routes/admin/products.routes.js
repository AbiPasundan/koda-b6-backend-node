import { Router } from "express";
import * as productsController from "#/controllers/products.controllers.js"

const productsRouter = Router()

productsRouter.get("/products", productsController.getAllProducts)
productsRouter.get("/products/:id", productsController.getProductById)
productsRouter.post("/products", productsController.createProduct)
productsRouter.delete("/products/:id", productsController.deleteProduct)

export default productsRouter;