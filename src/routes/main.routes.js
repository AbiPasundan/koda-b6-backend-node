
import publicRouter from "#/routes/public.routes.js"
import adminRouter from "#/routes/admin.routes.js"
import docsRouter from "#/routes/docs.routes.js"
import { Router } from "express"

const mainRouter = Router()

mainRouter.use("", adminRouter)
mainRouter.use("", publicRouter)
mainRouter.use("", docsRouter)

export default mainRouter