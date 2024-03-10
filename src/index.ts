import express, { Application, Request, Response } from "express"
import AuthRoutes from "./routes/Auth.routes"

const app: Application = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello world")
})

app.use("/", AuthRoutes)

app.listen(PORT, () => {
    console.log("Server on port: %s", PORT)
})