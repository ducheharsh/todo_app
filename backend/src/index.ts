import express from "express";
import mainRouter from "./routes/main"
import { Request } from "express";
import cors from "cors";

const app = express()
app.use(cors<Request>());
app.use(express.json())
app.use("/api/v1", mainRouter)






app.listen(3000)