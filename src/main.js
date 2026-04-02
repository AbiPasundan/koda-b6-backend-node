
import express from "express"
import mainRouter from "./routes/main.routes.js"

const app = express()

app.use(express.json())

app.use("", mainRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app;

// buat folder dto untuk standar response dan request