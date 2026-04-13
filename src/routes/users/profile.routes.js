import { Router } from "express";

import { getProfile } from "#/controllers/profile.controller.js";
import { requestForgotPasswordController } from "#/controllers/auth.controller.js";

const userRoutes = Router()

userRoutes.get("/profile", getProfile)
userRoutes.post("/forgot-password", requestForgotPasswordController)

export default userRoutes;
