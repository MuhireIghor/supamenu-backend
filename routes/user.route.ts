import express from "express";
import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from "../controllers/user.controller";
const authRoute = express.Router();
authRoute.post("/create", registerUser)
authRoute.get("/getAll", getAllUsers);
authRoute.get("/:id", getUserById);
authRoute.put("/update/:id", updateUser)
authRoute.delete("/delete/:id", deleteUser)
export default authRoute;