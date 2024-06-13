import { PrismaClient } from "@prisma/client"
import ApiResponse from "../utils/ApiResponse.util"
import { compareSync } from "bcrypt";
import { config } from "dotenv";
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken")
config()

export const loginUser = async (payload: any) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: payload.email
            },
            select: {
                id: true,
                email: true,
                password: true,
                roleId:true
            }
        })
        if (!user) {
            throw new Error(`User with email ${payload.email} is not found`)
        }
        const isValidPassword = compareSync(payload.password, user.password);
        if (!isValidPassword) {
            throw new Error("Password is not valid")
        }
        const token = jwt.sign({
            email: payload.email,
            id: user.id,
            roleId:user.roleId

        }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        return { token, user };




    }
    catch (err) {
        throw new Error((err as unknown as any)?.message)
    }
}