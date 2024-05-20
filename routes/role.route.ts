import express from "express";
import { deleteRole, getAllRoles, getRoleById, registerRole, updateRole } from "../controllers/role.controller";
const rolesRoute = express.Router();
rolesRoute.post("/create", registerRole)
rolesRoute.get("/getAll", getAllRoles);
rolesRoute.get("/:id", getRoleById);
rolesRoute.put("/update/:id", updateRole)
rolesRoute.delete("/delete/:id", deleteRole)
export default rolesRoute;