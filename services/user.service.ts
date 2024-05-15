import { PrismaClient } from "@prisma/client";
import ApiResponse from "../utils/ApiResponse.util";
const prisma = new PrismaClient();
export const findUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user;
    }
    catch (err) {
        return ApiResponse.error("Error occured during operation", null)
    }
}
export const findAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    }
    catch (err) {
        return ApiResponse.error("Error occured during operation", null)
    }

}
export const createUser = async (payload: any) => {
    try {
        const user = await prisma.user.create({
            data: {

                password: payload.password,
                email: payload.email,
                phoneNumber: payload.phoneNumber,
                username: payload.username
            }
        })
        return user;
    }
    catch (err) {
        return ApiResponse.error("Error occured during operation", null)
    }
}
export const updateUserById = async (id: string, payload: any) => {
    try {
        const userToUpdate = await prisma.user.findUniqueOrThrow({
            where: {
                id
            }
        });
        if (!userToUpdate) {
            return ApiResponse.error("User not found", null)
        }
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {

                ...payload

            }
        })
        return updatedUser;

    }
    catch (err) {
        return ApiResponse.error("Error occured during operation", null)

    }
}
export const deleteUserById = async (id: string) => {
    try {
        const userToDelete = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!userToDelete) {
            return ApiResponse.error("User not found", null)
        }
        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        })
        return deletedUser;

    }
    catch (err) {
        return ApiResponse.error(`Error occured during operation ${(err as unknown as any).message}`, null)
    }
}
