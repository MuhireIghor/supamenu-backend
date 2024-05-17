import express, { Request, Response } from "express";
import cors from "cors"
import { config } from "dotenv";
import { ENDPOINT } from "./utils/core.util";
import authRoute from "./routes/user.route";
import restoRoute from "./routes/restaurant.route";
config();
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(`${ENDPOINT}/users`, authRoute)
app.use(`${ENDPOINT}/restaurants`, restoRoute)
app.get("/", async (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Welcome to supa menu apis"
    })
})
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})