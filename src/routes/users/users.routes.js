import { Router } from "express";

import { addToCartController, getCartController } from "#/controllers/browseProduct.controller.js";
import { checkoutCartController, getOrderController } from "#/controllers/order.controller.js";

const userRoutes = Router()

userRoutes.post("/detailproduct/addcart", addToCartController)
userRoutes.post("/checkout", checkoutCartController)
userRoutes.get("/detailproduct/addcart/:id", getCartController)
userRoutes.get("/historyorder", getOrderController)

export default userRoutes;
