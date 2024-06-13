import express from "express";
import { deleteRestaurant, getAllRestos, getRestoById, registerRestaurant, updateRestaurant } from "../controllers/restaurant.controller";
const restoRoute = express.Router();
restoRoute.post("/create", registerRestaurant
    /* #swagger.summary = 'Register new restaurant
     #swagger.security = [{
        "bearerAuth": []
        }] 
    */

)
restoRoute.get("/getAll", getAllRestos
    // #swagger.summary = 'Retrieve all restaurants'
);
restoRoute.get("/:id", getRestoById
    // #swagger.summary = 'Get restaurant  by id'
);
restoRoute.put("/update/:id", updateRestaurant
    /* #swagger.summary = 'Update Restaurant'
     #swagger.security = [{
        "bearerAuth": []
        }] 
    */
)
restoRoute.delete("/delete/:id", deleteRestaurant
    /* #swagger.summary = 'Delete restaurant'
     #swagger.security = [{
        "bearerAuth": []
        }] 
    */
)
export default restoRoute;