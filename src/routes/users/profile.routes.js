import { Router } from "express";

import { getProfile } from "#/controllers/profile.controller.js";

const userRoutes = Router()

userRoutes.get("/profile", getProfile)

export default userRoutes;
