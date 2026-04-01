import { Router } from "express";

import { getBrowseController, getDetailProductController } from "#/controllers/browseProduct.controller.js";

const browseControllerRoutes = Router()

browseControllerRoutes.get("/browseproducts", getBrowseController)
browseControllerRoutes.get("/detailproduct/:id", getDetailProductController)

export default browseControllerRoutes;
