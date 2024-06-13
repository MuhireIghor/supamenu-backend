import express from "express";
import { assignRole, deleteUser, getAllUsers, getUserById, registerUser, updateUser } from "../controllers/user.controller";
import { authMiddleWare } from "../middleware/auth.middleware";
const userRoute = express.Router();
userRoute.post("/create", registerUser
    // #swagger.summary = 'Register new user'
)
userRoute.get("/getAll", authMiddleWare(['Admin']), getAllUsers
    // #swagger.summary = 'Get all registered users'
);
userRoute.get("/:id", getUserById
    // #swagger.summary = 'Get user by id'
);
userRoute.put("/update/:id", updateUser
    // #swagger.summary = 'Update user'
)
userRoute.put("/update/assignRole/:id", authMiddleWare(['Admin']), assignRole
    // #swagger.summary = 'Assign role to user'
)
userRoute.delete("/delete/:id", authMiddleWare(['Admin']), deleteUser
    // #swagger.summary = 'Delete user'

)
export default userRoute;