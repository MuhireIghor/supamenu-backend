import express, { Request, Response } from "express";
import cors from "cors"
import { config } from "dotenv";
import { ENDPOINT } from "./utils/core.util";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from './swagger/doc/swagger.json';
import ApiResponse from "./utils/ApiResponse.util";

config();
const port = process.env.PORT || 4000;
const app = express();
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(`${ENDPOINT}`, router)
app.get("/", async (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Welcome to supa menu apis"
    })
})
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("*", (req, res) => {
    return ApiResponse.error(res, "Route not found")
})
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
