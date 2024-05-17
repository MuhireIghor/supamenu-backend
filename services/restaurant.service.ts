import { PrismaClient } from "@prisma/client";
import ApiResponse from "../utils/ApiResponse.util";
const prisma = new PrismaClient();
export const createRestaurant = async (payload: any) => {
    try {
        const user = await prisma.restaurant.create({
            data: {
                name: payload.name,
                location: payload.location,
                speciality: payload.speciality
            }
        })
        return user;

    }
    catch (err) {
        return ApiResponse.error(`Error occured during operation ${(err as unknown as any).message}`, null)
    }
}
export const getAllRestaurants = async () => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        return restaurants;

    }
    catch (err) {
        return ApiResponse.error(`Error occured during operation ${(err as unknown as any).message}`, null)

    }
}
export const getRestaurantById = async (id: string) => {
    try {

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id
            }
        })
        if (!restaurant) {
            return ApiResponse.error("Restaurant not found", null)
        }
        return restaurant;
    }
    catch (err) {
        return ApiResponse.error(`Error occured during operation ${(err as unknown as any).message}`, null)

    }
}
export const updateRestaurantById = async (id: string, payload: any) => {
    try {
        const restauranttoUpdate = await getRestaurantById(id);
        if (!restauranttoUpdate) {
            return ApiResponse.error("Restaurant not found", null)

        }
        const updateRestaurant = await prisma.restaurant.update({
            where: {
                id
            },
            data: {
                ...payload
            }
        })
        return updateRestaurant;

    }
    catch (err) {
        return ApiResponse.error(`Error occured during operation ${(err as unknown as any).message}`, null)

    }
}
export const deleteRestaurantById = async (id: string) => {
    try {
        const restaurantToDelete = await getRestaurantById(id);
        if (!restaurantToDelete) {
            return ApiResponse.error("Restaurant not found", null)

        }
        const deletedRestaurant = await prisma.restaurant.delete({
            where: {
                id
            }
        })
        return deletedRestaurant;

    }
    catch (err) {
        return ApiResponse.error(`Error occured during operation ${(err as unknown as any).message}`, null)

    }
}