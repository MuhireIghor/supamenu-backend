import express from "express";
import { deleteRestaurant, getAllRestos, getRestoById, registerRestaurant, updateRestaurant } from "../controllers/restaurant.controller";
const restoRoute = express.Router();
restoRoute.post("/create", registerRestaurant)
restoRoute.get("/getAll", getAllRestos);
restoRoute.get("/:id", getRestoById);
restoRoute.put("/update/:id", updateRestaurant)
restoRoute.delete("/delete/:id", deleteRestaurant)
export default restoRoute;