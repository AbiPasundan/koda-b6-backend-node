
import express from "express"

import userRouter from "./routes/users.routes.js"

const app = express()

app.use(express.json())
app.use("/users", userRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app;