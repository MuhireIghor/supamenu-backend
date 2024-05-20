import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.util";
import { createRole, deleteRoleById, findAllRoles, findRoleById, getRoleByName, updateRoleById } from "../services/role.service";

export const registerRole = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const isRoleExistent = await getRoleByName(name);
        if (isRoleExistent) {
            return res.status(400).json(ApiResponse.error("Role already exists", isRoleExistent))
        }
        const newRole = await createRole(name);
        return res.status(201).json(ApiResponse.success("Role created Successfully", newRole))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during role creation process", null))
    }
}
export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await findRoleById(id);
        return res.status(201).json(ApiResponse.success("Role found successfully", role))


    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during role retrieval process", null))

    }
}
export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await findAllRoles();
        return res.status(201).json(ApiResponse.success("Roles found successfully", roles))


    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during roles retrieval process", null))

    }
}
export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const updatedRole = await updateRoleById(id, req.body);
        return res.status(200).json(ApiResponse.success("Role updated successfully", updatedRole))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during role updating process", null))

    }
}
export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedRole: any = await deleteRoleById(id);
        if (deletedRole.message) {
            return res.status(500).json(deletedRole)

        }
        return res.status(200).json(ApiResponse.success("Role deleted successfully", deletedRole))

    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Error occured during role deletion process", null))

    }
}