import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.util";
import { createUser, deleteUserById, findAllUsers, findUserById, updateUserById } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const user = await createUser({ ...payload });
        return res.status(201).json(ApiResponse.success("User created Successfully", user))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during user creation process", null))
    }
}
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        return res.status(201).json(ApiResponse.success("User found successfully", user))


    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during user retrieval process", null))

    }
}
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsers();
        return res.status(201).json(ApiResponse.success("Users found successfully", users))


    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during users retrieval process", null))

    }
}
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const updatedUser = await updateUserById(id, req.body);
        return res.status(200).json(ApiResponse.success("User updated successfully", updatedUser))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during user updating process", null))

    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser: any = await deleteUserById(id);
        if (deletedUser.message) {
            return res.status(500).json(deletedUser)

        }
        return res.status(200).json(ApiResponse.success("User deleted successfully", deletedUser))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during user deleting process", null))

    }
}