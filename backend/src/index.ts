import express from "express";
import mainRouter from "./routes/main"
const app = express()
app.use(express.json())

app.use("/api/v1", mainRouter)

app.listen(3000)