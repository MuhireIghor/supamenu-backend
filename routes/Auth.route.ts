import express from "express"
import { handleLogin } from "../controllers/Auth.controller";
const authRoute = express.Router();
authRoute.post("/login", handleLogin)
export default authRoute;

