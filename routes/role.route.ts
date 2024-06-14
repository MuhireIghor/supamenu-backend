import express from "express";
import { deleteRole, getAllRoles, getRoleById, registerRole, updateRole } from "../controllers/role.controller";
import { authMiddleWare } from "../middleware/auth.middleware";
const rolesRoute = express.Router();
rolesRoute.post("/create",
    authMiddleWare(['Admin']), registerRole
    // #swagger.summary = 'Create new Role'

)
rolesRoute.get("/getAll", getAllRoles
    // #swagger.summary = 'Get all roles'
);
rolesRoute.get("/:id", getRoleById
    // #swagger.summary = 'Get role by id'
);
rolesRoute.put("/update/:id", updateRole
    // #swagger.summary = 'update role'
)
rolesRoute.delete("/delete/:id", deleteRole
    // #swagger.summary = 'Delete role'
)
export default rolesRoute;