import { Router } from "express";

import { getBrowseController } from "#/controllers/browseProduct.controller.js";

const browseControllerRoutes = Router()

browseControllerRoutes.get("", getBrowseController)

export default browseControllerRoutes;
