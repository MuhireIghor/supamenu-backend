import { PrismaClient } from "@prisma/client";
import ApiResponse from "../utils/ApiResponse.util";
const prisma = new PrismaClient();
export const findRoleById = async (id: string) => {
    try {
        const role = await prisma.userRole.findUnique({
            where: {
                id
            }
        })
        return role;
    }
    catch (err) {
        return ApiResponse.error("Error occured during operation", null)
    }
}
export const findAllRoles = async () => {
    try {
        const roles = await prisma.userRole.findMany();
        return roles;
    }
    catch (err) {
        return ApiResponse.error("Error occured during operation", null)
    }

}
export const createRole = async (payload: any) => {
    try {
        const role = await prisma.userRole.create({
            data: {

                name: payload
            }
        })
        return role;
    }
    catch (err) {
        return ApiResponse.error("Error occured during operation", null)
    }
}
export const updateRoleById = async (id: string, payload: any) => {
    try {
        const roleToUpdate = await prisma.userRole.findUniqueOrThrow({
            where: {
                id
            }
        });
        if (!roleToUpdate) {
            return ApiResponse.error("role not found", null)
        }
        const updatedRole = await prisma.userRole.update({
            where: {
                id
            },
            data: {

                ...payload

            }
        })
        return updatedRole;

    }
    catch (err) {
        return ApiResponse.error("Error occured during operation", null)

    }
}
export const deleteRoleById = async (id: string) => {
    try {
        const roleToDelete = await prisma.userRole.findUnique({
            where: {
                id
            }
        })
        if (!roleToDelete) {
            return ApiResponse.error("role not found", null)
        }
        const deletedrole = await prisma.userRole.delete({
            where: {
                id
            }
        })
        return deletedrole;

    }
    catch (err) {
        return ApiResponse.error(`Error occured during operation ${(err as unknown as any).message}`, null)
    }
}
export const getRoleByName = async (name: string) => {
    let isRoleExistent: boolean = false;
    try {
        const role = await prisma.userRole.findFirst({
            where: {
                name
            }
        })
        if (role) {
            isRoleExistent = true;

        }
        else {
            isRoleExistent = false
        }

        return isRoleExistent;
    }
    catch (err) {
        return ApiResponse.error(`Error occured during operation ${(err as unknown as any).message}`, null)

    }
}