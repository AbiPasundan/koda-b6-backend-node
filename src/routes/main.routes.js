
import publicRouter from "#/routes/public.routes.js"
import adminRouter from "#/routes/admin.routes.js"
import docsRouter from "#/routes/docs.routes.js"
import { Router } from "express"
import userRouter from "#/routes/user.routes.js"

const mainRouter = Router()

mainRouter.use("", adminRouter)
mainRouter.use("", publicRouter)
mainRouter.use("", docsRouter)
mainRouter.use("", userRouter)

export default mainRouter