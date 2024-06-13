import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt"
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
    catch (err: any) {
        throw new Error(`Error occured in getting user with id ${id} ${err.message}`)
    }
}
export const findAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            include: {
                role: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return users;
    }
    catch (err: any) {
        throw new Error(`Error occured ${err.message}`)
    }

}
export const createUser = async (payload: any, roleName?: string) => {
    try {
        let role;
        const hashedPassword = hashSync(payload.password, 10);
        if (roleName) {
            role = await prisma.userRole.findFirst({
                where: {
                    name: roleName
                }
            })
            if (!role) {
                throw new Error(`Role with name ${roleName} is not found`)
            }

            const user = await prisma.user.create({
                data: {

                    password: hashedPassword,
                    email: payload.email,
                    phoneNumber: payload.phoneNumber,
                    username: payload.username,
                    role: {
                        connect: {
                            id: role.id
                        }
                    }
                }
            })

            return user;

        }
        const user = await prisma.user.create({
            data: {

                password: hashedPassword,
                email: payload.email,
                phoneNumber: payload.phoneNumber,
                username: payload.username
            }
        })
        return user;
    }
    catch (err: any) {
        throw new Error(`Error occured in user creation process ${err.message}`)
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
            throw new Error(`User with id ${id} is not found`)
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
    catch (err: any) {
        throw new Error(`Error occured in updating user ${err.message}`)
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
            throw new Error(`User with id ${id} is not found`)
        }
        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        })
        return deletedUser;

    }
    catch (err: any) {
        throw new Error(`Error occured during deleting operation ${err.message}`)
    }
}

export const assignRoleToUser = async (userId: string, roleName: string) => {
    try {
        const role = await prisma.userRole.findFirst({ where: { name: roleName } });
        if (!role) {
            throw new Error(`Role with name ${roleName} is not found`)
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                roleId: role.id
            }
        })
        return updatedUser;

    }
    catch (err: any) {
        throw new Error(`Error occured in role assignment operation ${err.message} `)
    }
}

