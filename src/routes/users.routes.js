import { Router } from "express";
import * as userController from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.get("/users", userController.getAllUsers)
userRouter.post("/users", userController.createUser)
userRouter.post("/users/:id", userController.createUser)
userRouter.get("/users/:id", userController.getUserById)
userRouter.delete("/users/:id", userController.deleteUser)

// const test = userRouter.get("/:id", userController.getUserById)

// github.com/AbiPasundan/koda-b6-backend-node

export default userRouter;
