import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.util";
import { assignRoleToUser, createUser, deleteUserById, findAllUsers, findUserById, updateUserById } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/CreateUserDto"
                    }  
                }
            }
        } 
    */
    try {
        const { username, email, password, phoneNumber, roleName } = req.body

        const user = await createUser({ username, email, password, phoneNumber }, roleName);
        return res.status(201).json(ApiResponse.success("User created Successfully", user))

    }
    catch (err: any) {
        return res.status(500).json(ApiResponse.error(err.message, null))
    }
}
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        return res.status(201).json(ApiResponse.success("User found successfully", user))


    }
    catch (err: any) {
        return res.status(500).json(ApiResponse.error(err.message, null))

    }
}
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsers();
        return res.status(201).json(ApiResponse.success("Users found successfully", users))


    }
    catch (err: any) {
        return res.status(500).json(ApiResponse.error(err.message, null))

    }
}
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const updatedUser = await updateUserById(id, req.body);
        return res.status(200).json(ApiResponse.success("User updated successfully", updatedUser))

    }
    catch (err: any) {
        return res.status(500).json(ApiResponse.error(err.message, null))

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
    catch (err: any) {
        return res.status(500).json(ApiResponse.error(err.message, null))

    }
}
export const assignRole = async (req: Request, res: Response) => {
    const { roleName } = req.body;
    const { id } = req.params
    try {
        const updatedStudent = await assignRoleToUser(id, roleName);
        return res.status(200).json(ApiResponse.success("User role added successfully", updatedStudent))

    }
    catch (err: any) {
        return res.status(500).json(ApiResponse.error(err.message, null))

    }

}