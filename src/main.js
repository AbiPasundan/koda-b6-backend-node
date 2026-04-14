import cors from "cors";
import express from "express"
import mainRouter from "./routes/main.routes.js"
import corsOptions from "#/middleware/cors.middleware.js"

const app = express()

app.use(express.json())

app.use("", mainRouter)
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app;