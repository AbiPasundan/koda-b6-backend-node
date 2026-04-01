import { Router } from "express";
import * as productsController from "#/controllers/products.controllers.js"

const productsRouter = Router()

productsRouter.get("/products", productsController.getAllProducts)

export default productsRouter;
