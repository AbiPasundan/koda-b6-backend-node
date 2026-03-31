
import express from "express"

import publicRouter from "./routes/public.routes.js"
import adminRouter from "./routes/admin.routes.js"

const app = express()

app.use(express.json())
app.use("", adminRouter)
app.use("", publicRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app;

// buat folder dto untuk standar response dan request