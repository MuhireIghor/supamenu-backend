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
        throw new Error(`Role with id ${id} is not found`)
    }
}
export const findAllRoles = async () => {
    try {
        const roles = await prisma.userRole.findMany();
        return roles;
    }
    catch (err) {
        throw new Error(`Error occured in fetching roles ${(err as any)?.message}`)
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
    catch (err: any) {
        throw new Error(`Error occured in updating role ${err.message}`)
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
    catch (err: any) {
        throw new Error(`Error occured in deleting role ${err.message}`)
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
        throw new Error(`Error occured in getting role witht name ${name}`)
    }
}