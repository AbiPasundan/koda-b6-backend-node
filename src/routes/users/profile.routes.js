import { Router } from "express";

import { getProfile } from "#/controllers/profile.controller.js";
import { requestForgotPasswordController, resetPasswordController } from "#/controllers/auth.controller.js";

const userRoutes = Router()

userRoutes.get("/profile", getProfile)
userRoutes.post("/request-forgot-password", requestForgotPasswordController)
userRoutes.post("/forgot-password", resetPasswordController)

export default userRoutes;
