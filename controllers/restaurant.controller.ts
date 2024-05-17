import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.util";
import { createRestaurant, deleteRestaurantById, getAllRestaurants, getRestaurantById, updateRestaurantById } from "../services/restaurant.service";

export const registerRestaurant = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const restaurant = await createRestaurant({ ...payload });
        return res.status(201).json(ApiResponse.success("Restaurant registered Successfully", restaurant))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during restaurant registration process", null))
    }
}
export const getRestoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const restaurant = await getRestaurantById(id);
        return res.status(201).json(ApiResponse.success("Restaurant found successfully", restaurant))


    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during restaurant retrieval process", null))

    }
}
export const getAllRestos = async (req: Request, res: Response) => {
    try {
        const restaurants = await getAllRestaurants();
        return res.status(201).json(ApiResponse.success("Restaurants retrieved successfully", restaurants))


    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during restaurants retrieval process", null))

    }
}
export const updateRestaurant = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const updatedRestaurant:any = await updateRestaurantById(id, req.body);
        if (updatedRestaurant.message) {
            return res.status(500).json(updatedRestaurant)

        }
        return res.status(200).json(ApiResponse.success("Restaurant updated successfully", updatedRestaurant))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during restaurant updating process", null))

    }
}
export const deleteRestaurant = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedRestaurant: any = await deleteRestaurantById(id);
        if (deletedRestaurant.message) {
            return res.status(500).json(deletedRestaurant)

        }
        return res.status(200).json(ApiResponse.success("Restaurant deleted successfully", deletedRestaurant))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during restaurant deleting process", null))

    }
}