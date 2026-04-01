import { Router } from "express";
// import * as getRecomendedProduct from "#/controllers/user.controller.js"
// import { recomendedProduct } from "#/models/landingPage.models.js";
import { getRecomendedProductController } from "#/controllers/landingPage.controller.js";

const recomendedProductRoutes = Router()

recomendedProductRoutes.get("/home", getRecomendedProductController)

export default recomendedProductRoutes;
