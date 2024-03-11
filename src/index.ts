import express, { Application, Request, Response } from "express"
import AuthRoutes from "./routes/Auth.routes"
import mongoDBConnection from "./models/mongoDB"

const app: Application = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

mongoDBConnection().catch(error => console.log(error))

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello world")
})

app.use("/auth", AuthRoutes)

app.listen(PORT, () => {
    console.log("Server on port: %s", PORT)
})