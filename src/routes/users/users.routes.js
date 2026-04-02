import { Router } from "express";

import { addToCartController } from "#/controllers/browseProduct.controller.js";

const userRoutes = Router()

userRoutes.post("/detailproduct/addcart", addToCartController)

export default userRoutes;
