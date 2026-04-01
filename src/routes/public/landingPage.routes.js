import { Router } from "express";
// import * as getRecomendedProduct from "#/controllers/user.controller.js"
// import { recomendedProduct } from "#/models/landingPage.models.js";
import { getRecomendedProductController, getTestimoniController } from "#/controllers/landingPage.controller.js";

const recomendedProductRoutes = Router()

recomendedProductRoutes.get("/home", getRecomendedProductController)
recomendedProductRoutes.get("/reviews", getTestimoniController)

export default recomendedProductRoutes;
