import { Router } from "express";

import { addToCartController, getCartController } from "#/controllers/browseProduct.controller.js";

const userRoutes = Router()

userRoutes.post("/detailproduct/addcart", addToCartController)
userRoutes.get("/detailproduct/addcart/:id", getCartController)

export default userRoutes;
