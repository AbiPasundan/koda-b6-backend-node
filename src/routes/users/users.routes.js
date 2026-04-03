import { Router } from "express";

import { addToCartController, getCartController } from "#/controllers/browseProduct.controller.js";
import { getOrderController } from "#/controllers/order.controller.js";

const userRoutes = Router()

userRoutes.post("/detailproduct/addcart", addToCartController)
userRoutes.get("/detailproduct/addcart/:id", getCartController)
userRoutes.get("/historyorder", getOrderController)

export default userRoutes;
