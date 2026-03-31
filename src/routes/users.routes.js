import { Router } from "express";
import * as userController from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.get("", userController.getAllUsers)
userRouter.post("", userController.createUser)
userRouter.post("/:id", userController.createUser)
userRouter.get("/:id", userController.getUserById)
userRouter.delete("/:id", userController.deleteUser)

// const test = userRouter.get("/:id", userController.getUserById)

// github.com/AbiPasundan/koda-b6-backend-node

export default userRouter;
