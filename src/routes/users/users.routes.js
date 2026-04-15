import { Router } from "express";

import { addToCartController, getCartController } from "#/controllers/browseProduct.controller.js";
import { checkoutCartController, getOrderController } from "#/controllers/order.controller.js";

const userRoutes = Router()

userRoutes.get("/detailproduct/addcart/:id", getCartController)
userRoutes.get("/historyorder", getOrderController)
userRoutes.post("/detailproduct/addcart", addToCartController)
userRoutes.post("/checkout", checkoutCartController)
// userRoutes.post("/checkout", addOrderHandler)

export default userRoutes;
