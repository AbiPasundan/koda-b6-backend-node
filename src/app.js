
import express from "express"

import userRouter from "./routes/users.routes.js"
import authRouter from "./routes/auth.routes.js"
import { db } from "./lib/db.js"

db()

const app = express()
// const conn = await db()

app.use(express.json())
app.use("/users", userRouter)
app.use("/auth", authRouter)



export default app;